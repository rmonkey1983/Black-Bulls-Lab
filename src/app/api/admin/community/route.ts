import { NextResponse } from "next/server";
import { getStrictSupabaseAdmin, supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// Helper mascheramento email
function maskEmail(email: string): string {
  if (!email || !email.includes("@")) return "***@***.com";
  const [name, domain] = email.split("@");
  const maskedName = name.length <= 2 ? name[0] + "*" : name[0] + "***" + name[name.length - 1];
  const [dName, tld] = domain.split(".");
  const maskedDomain = dName.length <= 2 ? dName[0] + "*" : dName[0] + "***" + dName[dName.length - 1];
  return `${maskedName}@${maskedDomain}.${tld || "com"}`;
}

// Helper mascheramento telefono
function maskPhone(phone: string): string {
  if (!phone || phone.trim().length < 6) return "+39 *** *** **00";
  const clean = phone.trim();
  const visiblePrefix = clean.slice(0, 5);
  const visibleSuffix = clean.slice(-2);
  return `${visiblePrefix} *** *** **${visibleSuffix}`;
}

// Neutralizzazione per CSV Injection
function sanitizeCSVCell(val: any): string {
  if (val === null || val === undefined) return "";
  const str = String(val);
  if (/^[=+\-@\t\r]/.test(str)) {
    return `'${str}`;
  }
  return str;
}

export async function GET(req: Request) {
  const headers = {
    "Cache-Control": "no-store, no-cache, must-revalidate",
    "Content-Type": "application/json",
  };

  try {
    let dbClient;
    try {
      dbClient = getStrictSupabaseAdmin();
    } catch {
      dbClient = supabase;
    }

    const { searchParams } = new URL(req.url);
    const period = searchParams.get("period") || "all";
    const statusFilter = searchParams.get("status") || "all";
    const sourceFilter = searchParams.get("source") || "all";
    const marketingConsentFilter = searchParams.get("marketing") || "all";
    const unmask = searchParams.get("unmask") === "true";
    const unmaskReason = searchParams.get("reason") || "Consultazione autorizzata";
    const actor = searchParams.get("actor") || "admin@blackbullslab.com";

    // Peschiamo tutti gli iscritti dalla tabella reale
    const { data: rawWaitlist, error } = await dbClient
      .from("liar_system_waitlist")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    const waitlist = rawWaitlist || [];

    // Audit log se sblocco PII richiesto
    if (unmask) {
      await dbClient.from("prize_audit_log").insert([
        {
          actor_id: actor,
          action: "COMMUNITY_UNMASK_PII_VIEW",
          details: { reason: unmaskReason, timestamp: new Date().toISOString(), total_records: waitlist.length },
        },
      ]);
    }

    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const last7DaysStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const last30DaysStart = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const prev30DaysStart = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

    // KPI Base
    const monthlyTarget = parseInt(process.env.COMMUNITY_MONTHLY_TARGET || "30", 10);
    const totalRegistrations = waitlist.length;
    const activeContacts = waitlist.filter((w) => w.status !== "withdrawn" && w.status !== "excluded").length;
    const withdrawnContacts = waitlist.filter((w) => w.status === "withdrawn").length;

    const newThisMonth = waitlist.filter((w) => new Date(w.created_at) >= currentMonthStart && w.status !== "withdrawn").length;
    const newLast7Days = waitlist.filter((w) => new Date(w.created_at) >= last7DaysStart && w.status !== "withdrawn").length;
    const newLast30Days = waitlist.filter((w) => new Date(w.created_at) >= last30DaysStart && w.status !== "withdrawn").length;
    const newPrev30Days = waitlist.filter((w) => {
      const d = new Date(w.created_at);
      return d >= prev30DaysStart && d < last30DaysStart && w.status !== "withdrawn";
    }).length;

    const progressPercentage = Math.min(100, Math.round((newThisMonth / monthlyTarget) * 100));
    const missingToMonthlyTarget = Math.max(0, monthlyTarget - newThisMonth);

    const marketingConsents = waitlist.filter((w) => w.marketing_consent).length;
    const potentialParticipantsTotal = waitlist.reduce((acc, w) => acc + (w.guests_count || 1), 0);

    // Analisi Gruppi
    const partyDistribution = {
      individual: waitlist.filter((w) => (w.guests_count || 1) === 1).length,
      couples: waitlist.filter((w) => (w.guests_count || 1) === 2).length,
      groups3to4: waitlist.filter((w) => (w.guests_count || 1) >= 3 && (w.guests_count || 1) <= 4).length,
      groups5to6: waitlist.filter((w) => (w.guests_count || 1) >= 5 && (w.guests_count || 1) <= 6).length,
      groupsOver6: waitlist.filter((w) => (w.guests_count || 1) > 6).length,
      averagePartySize: totalRegistrations ? (potentialParticipantsTotal / totalRegistrations).toFixed(1) : "1.0",
    };

    // Analisi Qualità
    const qualityMetrics = {
      emailCompletePct: totalRegistrations ? 100 : 0,
      phonePresentPct: totalRegistrations ? Math.round((waitlist.filter((w) => w.phone && w.phone.trim().length >= 6).length / totalRegistrations) * 100) : 0,
      cityPresentPct: totalRegistrations ? Math.round((waitlist.filter((w) => w.city && w.city.trim().length > 0).length / totalRegistrations) * 100) : 0,
      eventConsentPct: totalRegistrations ? Math.round((waitlist.filter((w) => w.event_consent).length / totalRegistrations) * 100) : 0,
      marketingConsentPct: totalRegistrations ? Math.round((marketingConsents / totalRegistrations) * 100) : 0,
      withdrawnPct: totalRegistrations ? Math.round((withdrawnContacts / totalRegistrations) * 100) : 0,
    };

    // Analisi Sorgenti & Campagne UTM
    const sourcesMap: Record<string, { count: number; potential: number; marketing: number }> = {};
    const campaignMap: Record<string, { name: string; source: string; medium: string; count: number; potential: number; marketing: number }> = {};

    waitlist.forEach((w) => {
      const src = w.utm_source || w.source || "Diretto";
      if (!sourcesMap[src]) {
        sourcesMap[src] = { count: 0, potential: 0, marketing: 0 };
      }
      sourcesMap[src].count++;
      sourcesMap[src].potential += w.guests_count || 1;
      if (w.marketing_consent) sourcesMap[src].marketing++;

      if (w.utm_campaign) {
        const key = `${w.utm_campaign}_${src}_${w.utm_medium || "none"}`;
        if (!campaignMap[key]) {
          campaignMap[key] = {
            name: w.utm_campaign,
            source: src,
            medium: w.utm_medium || "-",
            count: 0,
            potential: 0,
            marketing: 0,
          };
        }
        campaignMap[key].count++;
        campaignMap[key].potential += w.guests_count || 1;
        if (w.marketing_consent) campaignMap[key].marketing++;
      }
    });

    // Applicazione Filtri per l'elenco e l'esportazione
    let filteredList = [...waitlist];

    if (statusFilter !== "all") {
      filteredList = filteredList.filter((w) => w.status === statusFilter);
    }
    if (sourceFilter !== "all") {
      filteredList = filteredList.filter((w) => (w.utm_source || w.source || "Diretto") === sourceFilter);
    }
    if (marketingConsentFilter !== "all") {
      const wantConsent = marketingConsentFilter === "yes";
      filteredList = filteredList.filter((w) => Boolean(w.marketing_consent) === wantConsent);
    }

    if (period === "today") {
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      filteredList = filteredList.filter((w) => new Date(w.created_at) >= todayStart);
    } else if (period === "last7") {
      filteredList = filteredList.filter((w) => new Date(w.created_at) >= last7DaysStart);
    } else if (period === "thisMonth") {
      filteredList = filteredList.filter((w) => new Date(w.created_at) >= currentMonthStart);
    } else if (period === "last30") {
      filteredList = filteredList.filter((w) => new Date(w.created_at) >= last30DaysStart);
    }

    // Elenco partecipanti formattato con Privacy by Design
    const formattedParticipants = filteredList.map((w) => ({
      id: w.id,
      name: unmask ? w.name : w.name.split(" ")[0] + " " + (w.name.split(" ")[1]?.[0] || "") + ".",
      email: unmask ? w.email : maskEmail(w.email),
      phone: unmask ? w.phone : maskPhone(w.phone || ""),
      city: w.city || "Torino",
      guests_count: w.guests_count || 1,
      event_consent: w.event_consent,
      marketing_consent: w.marketing_consent,
      source: w.utm_source || w.source || "Diretto",
      utm_medium: w.utm_medium || "-",
      utm_campaign: w.utm_campaign || "-",
      status: w.status,
      created_at: w.created_at,
    }));

    return NextResponse.json(
      {
        kpi: {
          totalRegistrations,
          activeContacts,
          withdrawnContacts,
          newThisMonth,
          newLast7Days,
          newLast30Days,
          newPrev30Days,
          monthlyTarget,
          progressPercentage,
          missingToMonthlyTarget,
          marketingConsents,
          potentialParticipantsTotal,
        },
        partyDistribution,
        qualityMetrics,
        sources: Object.entries(sourcesMap).map(([name, data]) => ({ name, ...data })),
        campaigns: Object.values(campaignMap),
        participants: formattedParticipants,
        isUnmasked: unmask,
        archivedCampaign: {
          id: "la-prima-bugia-2026",
          title: "La Prima Bugia",
          legal_status: "blocked_no_promoter",
          status: "draft",
          public_enabled: false,
          starts_at: null,
          ends_at: null,
          promoter_name: null,
          note: "Progetto archiviato in bozza: soggetto promotore non disponibile.",
        },
      },
      { status: 200, headers }
    );
  } catch (err: any) {
    console.error("[Community API Exception]:", err);
    return NextResponse.json({ error: err.message || "Errore interno server" }, { status: 500, headers });
  }
}

// Endpoint POST per export CSV sicuro con neutralizzazione CSV Injection
export async function POST(req: Request) {
  try {
    let dbClient;
    try {
      dbClient = getStrictSupabaseAdmin();
    } catch {
      dbClient = supabase;
    }

    const body = await req.json();
    const { action, actor = "admin@blackbullslab.com", reason = "Esportazione report community" } = body;

    if (action === "EXPORT_CSV") {
      const { data: waitlist } = await dbClient
        .from("liar_system_waitlist")
        .select("*")
        .order("created_at", { ascending: false });

      const records = waitlist || [];

      // Log dell'azione nell'audit log
      await dbClient.from("prize_audit_log").insert([
        {
          actor_id: actor,
          action: "COMMUNITY_CSV_EXPORT",
          details: { reason, record_count: records.length, timestamp: new Date().toISOString() },
        },
      ]);

      const headers = [
        "Nome",
        "Email",
        "Telefono",
        "Citta",
        "Party_Size",
        "Source",
        "UTM_Source",
        "UTM_Medium",
        "UTM_Campaign",
        "Status",
        "Event_Updates_Consent",
        "Marketing_Consent",
        "Created_At",
      ];

      const csvRows = records.map((r) => [
        `"${sanitizeCSVCell(r.name)}"`,
        `"${sanitizeCSVCell(r.email)}"`,
        `"${sanitizeCSVCell(r.phone || "")}"`,
        `"${sanitizeCSVCell(r.city || "Torino")}"`,
        r.guests_count || 1,
        `"${sanitizeCSVCell(r.source || "landing_page")}"`,
        `"${sanitizeCSVCell(r.utm_source || "")}"`,
        `"${sanitizeCSVCell(r.utm_medium || "")}"`,
        `"${sanitizeCSVCell(r.utm_campaign || "")}"`,
        `"${sanitizeCSVCell(r.status)}"`,
        r.event_consent ? "TRUE" : "FALSE",
        r.marketing_consent ? "TRUE" : "FALSE",
        r.created_at,
      ]);

      const csvContent = [headers.join(","), ...csvRows.map((row) => row.join(","))].join("\n");

      return new Response(csvContent, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="community_export_${new Date().toISOString().slice(0, 10)}.csv"`,
          "Cache-Control": "no-store",
        },
      });
    }

    return NextResponse.json({ error: "Azione non consentita" }, { status: 400 });
  } catch (err: any) {
    console.error("[Community Export Exception]:", err);
    return NextResponse.json({ error: err.message || "Errore export" }, { status: 500 });
  }
}
