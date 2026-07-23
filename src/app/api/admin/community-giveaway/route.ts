import { NextResponse } from "next/server";
import { getStrictSupabaseAdmin } from "@/lib/supabase";
import { requireAdmin, isValidOrigin } from "@/lib/auth/requireAdmin";

export const dynamic = "force-dynamic";

// Helper per mascherare email
function maskEmail(email: string): string {
  if (!email || !email.includes("@")) return "***@***.com";
  const [name, domain] = email.split("@");
  const maskedName = name.length <= 2 ? name[0] + "*" : name[0] + "***" + name[name.length - 1];
  const [dName, tld] = domain.split(".");
  const maskedDomain = dName.length <= 2 ? dName[0] + "*" : dName[0] + "***" + dName[dName.length - 1];
  return `${maskedName}@${maskedDomain}.${tld || "com"}`;
}

// Helper per mascherare numero di telefono
function maskPhone(phone: string): string {
  if (!phone || phone.length < 6) return "+39 *** *** **00";
  const clean = phone.trim();
  const visiblePrefix = clean.slice(0, 5);
  const visibleSuffix = clean.slice(-2);
  return `${visiblePrefix} *** *** **${visibleSuffix}`;
}

export async function GET(req: Request) {
  const headers = {
    "Cache-Control": "private, no-store, max-age=0, must-revalidate",
    "Content-Type": "application/json",
  };

  // 1. Strict Server Authentication & Authorization
  const auth = await requireAdmin();
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error }, { status: auth.status, headers });
  }

  // 2. Strict Service Role Client Initialization
  let dbClient;
  try {
    dbClient = getStrictSupabaseAdmin();
  } catch {
    return NextResponse.json(
      { error: "Servizio di amministrazione non disponibile. Service role key non configurata." },
      { status: 503, headers }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const unmask = searchParams.get("unmask") === "true";
    const unmaskReason = searchParams.get("reason")?.trim() || "";
    const actorEmail = auth.email;

    if (unmask && !unmaskReason) {
      return NextResponse.json(
        { error: "È richiesta una motivazione valida per lo sblocco dei dati personali." },
        { status: 400, headers }
      );
    }

    // 1. Peschiamo la waitlist e i dati collegati dalla tabella reale
    const { data: waitlistEntries } = await dbClient
      .from("liar_system_waitlist")
      .select("*")
      .order("created_at", { ascending: false });

    const waitlist = waitlistEntries || [];

    // 2. Peschiamo i cicli
    const { data: cyclesData } = await dbClient
      .from("prize_cycles")
      .select("*")
      .order("created_at", { ascending: false });

    const cycles = cyclesData || [];

    // 3. Peschiamo i risultati e le audit log
    const { data: resultsData } = await dbClient
      .from("prize_draw_results")
      .select("*, prize_draws(official_protocol_number, drawn_at)");

    const { data: auditLog } = await dbClient
      .from("prize_audit_log")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    // Se unmask è richiesto, registriamo il log di audit
    if (unmask) {
      await dbClient.from("prize_audit_log").insert([
        {
          actor_id: actorEmail,
          action: "UNMASK_PII_REQUESTED",
          details: {
            reason: unmaskReason,
            timestamp: new Date().toISOString(),
            record_count: waitlist.length,
          },
        },
      ]);
    }

    // Processamento KPI
    const totalRegistrations = waitlist.length;
    const marketingConsentsCount = waitlist.filter((w) => w.marketing_consent).length;
    const eligibleList = waitlist.filter(
      (w) => w.event_updates_consent && w.status !== "withdrawn" && w.status !== "invalid"
    );
    const eligibleCount = eligibleList.length;
    const currentThreshold = 30;
    const missingToThreshold = Math.max(0, currentThreshold - eligibleCount);
    const excludedCount = waitlist.filter((w) => w.status === "invalid" || w.status === "withdrawn").length;
    const qualifiedCyclesCount = cycles.filter((c) => c.status === "qualified" || c.status === "drawn" || c.status === "locked").length;
    const deliveredPrizesCount = resultsData?.filter((r) => r.claimed_status === "accepted").length || 0;

    // Sorgenti principali
    const sourcesMap: Record<string, number> = {};
    waitlist.forEach((w) => {
      const src = w.utm_source || w.source || "Diretto";
      sourcesMap[src] = (sourcesMap[src] || 0) + 1;
    });

    const maskedParticipants = waitlist.map((w) => {
      const rawName = w.full_name || "Utente Anonimo";
      const nameParts = rawName.split(" ");
      const maskedName = nameParts[0] + " " + (nameParts[1]?.[0] || "") + ".";

      return {
        id: w.id,
        name: unmask ? rawName : maskedName,
        email: unmask ? w.email : maskEmail(w.email),
        phone: unmask ? (w.phone_e164 || "") : maskPhone(w.phone_e164 || ""),
        city: w.city || "Torino",
        guests_count: w.party_size || 1,
        event_consent: w.event_updates_consent,
        marketing_consent: w.marketing_consent,
        status: w.status === "withdrawn" ? "withdrawn" : w.status === "invalid" ? "invalid" : "eligible",
        source: w.utm_source || w.source || "Diretto",
        utm_campaign: w.utm_campaign || "-",
        created_at: w.created_at,
      };
    });

    return NextResponse.json(
      {
        kpi: {
          totalRegistrations,
          eligibleCount,
          missingToThreshold,
          excludedCount,
          marketingConsentsCount,
          marketingConsentPercentage: totalRegistrations ? Math.round((marketingConsentsCount / totalRegistrations) * 100) : 0,
          qualifiedCyclesCount,
          deliveredPrizesCount,
          currentThreshold,
        },
        sources: Object.entries(sourcesMap).map(([name, count]) => ({ name, count })),
        participants: maskedParticipants,
        isUnmasked: unmask,
        cycles,
        results: resultsData || [],
        auditLog: auditLog || [],
      },
      { status: 200, headers }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Errore interno server";
    return NextResponse.json({ error: message }, { status: 500, headers });
  }
}

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  if (!isValidOrigin(req)) {
    return NextResponse.json({ error: "Origine richiesta non consentita." }, { status: 403 });
  }

  return NextResponse.json(
    {
      error: "La campagna è archiviata e non dispone di un soggetto promotore.",
      code: "CAMPAIGN_ARCHIVED_NO_PROMOTER",
    },
    { status: 403 }
  );
}

export async function PUT() {
  return new Response(null, { status: 405, headers: { Allow: "GET, POST" } });
}

export async function PATCH() {
  return new Response(null, { status: 405, headers: { Allow: "GET, POST" } });
}

export async function DELETE() {
  return new Response(null, { status: 405, headers: { Allow: "GET, POST" } });
}
