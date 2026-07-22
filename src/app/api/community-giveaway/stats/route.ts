import { NextResponse } from "next/server";
import { getStrictSupabaseAdmin, supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  const headers = {
    "Cache-Control": "no-store, no-cache, must-revalidate",
    "Content-Type": "application/json",
  };

  const isPublicEnabled = process.env.PRIZE_CAMPAIGN_PUBLIC_ENABLED === "true";

  if (!isPublicEnabled) {
    return NextResponse.json(
      {
        public_enabled: false,
        cycle_label: "",
        eligible_count: 0,
        threshold: 30,
        remaining: 30,
        status: "disabled",
        starts_at: null,
        ends_at: null,
        regulation_url: "/privacy-policy",
      },
      { status: 200, headers }
    );
  }

  try {
    let dbClient;
    try {
      dbClient = getStrictSupabaseAdmin();
    } catch {
      dbClient = supabase;
    }

    // Peschiamo il ciclo attivo o corrente
    const { data: currentCycle } = await dbClient
      .from("prize_cycles")
      .select("*")
      .in("status", ["collecting", "qualified", "locked"])
      .order("created_at", { ascending: false })
      .maybeSingle();

    if (!currentCycle) {
      return NextResponse.json(
        {
          public_enabled: true,
          cycle_label: "Ciclo in arrivo",
          eligible_count: 0,
          threshold: 30,
          remaining: 30,
          status: "collecting",
          starts_at: null,
          ends_at: null,
          regulation_url: "/privacy-policy",
        },
        { status: 200, headers }
      );
    }

    // Conteggio idonei (eligibility_status = 'eligible') nel ciclo corrente
    const { count: eligibleCount } = await dbClient
      .from("prize_entries")
      .select("id", { count: "exact", head: true })
      .eq("cycle_id", currentCycle.id)
      .eq("eligibility_status", "eligible");

    const count = eligibleCount || 0;
    const threshold = currentCycle.threshold || 30;
    const remaining = Math.max(0, threshold - count);

    return NextResponse.json(
      {
        public_enabled: true,
        cycle_label: currentCycle.cycle_label,
        eligible_count: count,
        threshold: threshold,
        remaining: remaining,
        status: currentCycle.status,
        starts_at: currentCycle.starts_at,
        ends_at: currentCycle.ends_at,
        regulation_url: currentCycle.regulation_url || "/privacy-policy",
      },
      { status: 200, headers }
    );
  } catch (error) {
    console.error("[Community Giveaway Stats Error]:", error);
    return NextResponse.json(
      {
        public_enabled: false,
        error: "Impossibile recuperare le statistiche della campagna.",
      },
      { status: 500, headers }
    );
  }
}
