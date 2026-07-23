import { getStrictSupabaseAdmin } from "@/lib/supabase";
import { requireAdmin, isValidOrigin } from "@/lib/auth/requireAdmin";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const headers = {
    "Cache-Control": "private, no-store, max-age=0, must-revalidate",
    "Content-Type": "application/json",
  };

  // 1. Strict Server Authentication & Authorization
  const auth = await requireAdmin();
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error }, { status: auth.status, headers });
  }

  // 2. Origin Verification
  if (!isValidOrigin(req)) {
    return NextResponse.json({ error: "Origine richiesta non consentita." }, { status: 403, headers });
  }

  try {
    const { ticketId } = await req.json();

    if (!ticketId) {
      return NextResponse.json({ error: "ID Biglietto mancante" }, { status: 400, headers });
    }

    let supabaseAdmin;
    try {
      supabaseAdmin = getStrictSupabaseAdmin();
    } catch {
      return NextResponse.json(
        { error: "Servizio di amministrazione non disponibile. Service role key non configurata." },
        { status: 503, headers }
      );
    }

    // 1. Recuperiamo il biglietto e i dati della prenotazione associata
    const { data: ticket, error: ticketError } = await supabaseAdmin
      .from("tickets")
      .select("*, bookings(customer_email)")
      .eq("id", ticketId)
      .single();

    if (ticketError || !ticket) {
      console.error("❌ Ticket not found:", ticketError?.message);
      return NextResponse.json({ error: "Biglietto non trovato o non valido" }, { status: 404, headers });
    }

    // 2. Controllo sicurezza: è già stato usato?
    if (ticket.is_scanned) {
      return NextResponse.json(
        {
          error: "Biglietto già utilizzato!",
          scannedAt: ticket.scanned_at,
        },
        { status: 400, headers }
      );
    }

    // 3. AGGIORNAMENTO: Segna biglietto come scansionato + Crea profilo gioco
    const playerName = ticket.guest_name || "Ospite";
    const playerEmail = (ticket.bookings as Record<string, unknown>)?.customer_email || "";

    const { error: updateError } = await supabaseAdmin
      .from("tickets")
      .update({
        is_scanned: true,
        scanned_at: new Date().toISOString(),
      })
      .eq("id", ticketId);

    if (updateError) {
      console.error("❌ Error updating ticket status:", updateError.message);
      throw updateError;
    }

    const { data: gameProfile, error: gameError } = await supabaseAdmin
      .from("game_profiles")
      .insert([
        {
          ticket_id: ticketId,
          player_name: playerName,
          player_email: playerEmail,
          game_role: "investigatore",
          is_active: true,
        },
      ])
      .select()
      .single();

    if (gameError) {
      console.error("❌ Error creating game profile:", gameError.message);
      return NextResponse.json(
        {
          success: true,
          message: `Check-in completato per ${playerName}.`,
        },
        { status: 200, headers }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `Check-in completato per ${playerName}`,
        profileId: gameProfile.id,
      },
      { status: 200, headers }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Errore interno al server durante lo scan";
    console.error("❌ Errore critico Scan API:", message);
    return NextResponse.json({ error: "Errore interno al server durante lo scan" }, { status: 500, headers });
  }
}

export async function GET() {
  return new Response(null, { status: 405, headers: { Allow: "POST", "Cache-Control": "private, no-store" } });
}

export async function PUT() {
  return new Response(null, { status: 405, headers: { Allow: "POST", "Cache-Control": "private, no-store" } });
}

export async function PATCH() {
  return new Response(null, { status: 405, headers: { Allow: "POST", "Cache-Control": "private, no-store" } });
}

export async function DELETE() {
  return new Response(null, { status: 405, headers: { Allow: "POST", "Cache-Control": "private, no-store" } });
}
