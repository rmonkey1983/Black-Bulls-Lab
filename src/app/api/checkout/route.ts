import { NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";
import { getStrictSupabaseAdmin, supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// Zod schema for B2C Checkout payload — strictly omits financial parameters
const b2cCheckoutSchema = z.object({
  eventId: z.string().min(1, "ID evento obbligatorio").max(100),
  quantity: z.number().int().min(1, "Quantità minima 1").max(10, "Quantità massima 10").default(1),
  customerName: z.string().min(2, "Nome obbligatorio").max(100),
  customerEmail: z.string().email("Email non valida").max(200),
  customerPhone: z.string().max(50).optional().default(""),
  guestNames: z.array(z.string().max(100)).optional().default([]),
  allergies: z.string().max(500).optional().default(""),
});

function getBaseUrl(): string {
  if (process.env.SITE_URL) {
    return process.env.SITE_URL.replace(/\/$/, "");
  }
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  return process.env.NODE_ENV === "production"
    ? "https://blackbullslab.com"
    : "http://localhost:3000";
}

function parseEventDate(dateStr: string | null | undefined): Date | null {
  if (!dateStr) return null;
  // Handles YYYY-MM-DD or DD.MM.YYYY
  if (dateStr.includes(".")) {
    const parts = dateStr.split(".");
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return new Date(Number(year), Number(month) - 1, Number(day), 23, 59, 59);
    }
  }
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? null : d;
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();

    // 1. Validate payload with Zod
    const validationResult = b2cCheckoutSchema.safeParse(rawBody);
    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0]?.message || "Dati inviati non validi.";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const {
      eventId,
      quantity,
      customerName,
      customerEmail,
      customerPhone,
      guestNames,
      allergies,
    } = validationResult.data;

    // 2. Query event directly from Supabase (Database is single source of truth for pricing)
    let dbClient;
    try {
      dbClient = getStrictSupabaseAdmin();
    } catch {
      dbClient = supabase;
    }

    const { data: event, error: dbError } = await dbClient
      .from("events")
      .select("*")
      .or(`id.eq.${eventId},slug.eq.${eventId}`)
      .maybeSingle();

    if (dbError) {
      console.error("Errore query evento Supabase:", dbError);
      return NextResponse.json({ error: "Errore durante il recupero dell'evento." }, { status: 500 });
    }

    // 3. Check event existence
    if (!event) {
      return NextResponse.json({ error: "Evento non trovato." }, { status: 404 });
    }

    // 4. Check if event date has passed
    const eventDate = parseEventDate(event.event_date || event.date);
    if (eventDate && eventDate.getTime() < Date.now()) {
      return NextResponse.json({ error: "L'evento selezionato è già passato." }, { status: 409 });
    }

    // 5. Check slot availability
    const availableSlots = typeof event.available_slots === "number" ? event.available_slots : null;
    if (availableSlots !== null && availableSlots < quantity) {
      return NextResponse.json({ error: "Posti insufficienti per questo evento." }, { status: 409 });
    }

    // 6. Retrieve canonical unit price in cents strictly from Database
    const unitPriceCents: number | null =
      typeof event.unit_price_cents === "number" && event.unit_price_cents > 0
        ? event.unit_price_cents
        : typeof event.price === "number" && event.price > 0
        ? Math.round(event.price * 100)
        : null;

    if (!unitPriceCents || unitPriceCents <= 0) {
      console.error(`Prezzo non configurato nel DB per evento ID: ${eventId}`);
      return NextResponse.json(
        { error: "Prezzo dell'evento non configurato sul server." },
        { status: 500 }
      );
    }

    // 7. Verify Stripe Key configuration
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Stripe API key non configurata." }, { status: 500 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      apiVersion: "2023-10-16" as any,
    });

    // 8. Canonical product details from Database
    const canonicalTitle = event.title || "Ingresso Evento Black Bulls Lab";
    const canonicalDescription = event.subtitle || `Prenotazione per ${quantity} ${quantity === 1 ? "persona" : "persone"}`;
    const baseUrl = getBaseUrl();
    const guestNamesStr = JSON.stringify(guestNames).slice(0, 490);

    // 9. Create Stripe Checkout Session using ONLY server-derived price in cents
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "link"],
      customer_email: customerEmail,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: canonicalTitle,
              description: canonicalDescription,
            },
            unit_amount: unitPriceCents,
          },
          quantity: quantity,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/calendario/${event.id || eventId}`,
      metadata: {
        eventId: String(event.id || eventId),
        eventTitle: canonicalTitle.slice(0, 200),
        quantity: String(quantity),
        customerName: customerName.slice(0, 100),
        customerEmail: customerEmail.slice(0, 200),
        customerPhone: customerPhone.slice(0, 50),
        guestNames: guestNamesStr,
        allergies: (allergies || "Nessuna").slice(0, 490),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Errore sconosciuto";
    console.error("Errore Checkout B2C:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
