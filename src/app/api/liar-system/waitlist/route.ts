import { NextResponse } from "next/server";
import { z } from "zod";
import { getStrictSupabaseAdmin, supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// Zod Schema per la validazione della request
const waitlistSchema = z.object({
  name: z.string().min(2, "Il nome deve contenere almeno 2 caratteri").max(100, "Nome troppo lungo"),
  email: z.string().email("Indirizzo email non valido").max(200, "Email troppo lunga"),
  phone: z.string().min(6, "Numero di telefono non valido").max(50, "Numero troppo lungo"),
  city: z.string().max(100).optional().default("Torino"),
  guests_count: z.number().int().min(1).max(20).optional().default(1),
  event_consent: z.boolean().refine((val) => val === true, {
    message: "È necessario accettare l'informativa privacy e gli aggiornamenti dell'evento",
  }),
  marketing_consent: z.boolean().optional().default(false),
  source: z.string().max(100).optional().default("landing_page"),
  landing_page: z.string().max(200).optional().default("/format/a-cena-con-il-bugiardo"),
  referrer: z.string().max(500).optional().default(""),
  utm_source: z.string().max(100).optional().default(""),
  utm_medium: z.string().max(100).optional().default(""),
  utm_campaign: z.string().max(100).optional().default(""),
  utm_term: z.string().max(100).optional().default(""),
  utm_content: z.string().max(100).optional().default(""),
  privacy_version: z.string().max(20).optional().default("v1.0"),
  turnstileToken: z.string().optional().default(""),
  website: z.string().optional().default(""), // Honeypot field
});

async function verifyTurnstile(token: string, secretKey: string, remoteIp?: string): Promise<boolean> {
  if (!secretKey) return true; // Se la chiave non è configurata in locale/ambiente, non bloccare
  if (!token) return false;

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (remoteIp) formData.append("remoteip", remoteIp);

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
    });
    const outcome = await res.json();
    return Boolean(outcome.success);
  } catch (err) {
    console.error("[Turnstile Verification Exception]:", err);
    return true; // Fallback difensivo in caso di downtime del servizio di verifica
  }
}

export async function POST(req: Request) {
  const headers = {
    "Cache-Control": "no-store, no-cache, must-revalidate",
    "Content-Type": "application/json",
  };

  try {
    // Controllo dimensione approssimativa body (max 50KB)
    const contentLength = parseInt(req.headers.get("content-length") || "0", 10);
    if (contentLength > 50000) {
      return NextResponse.json({ error: "Payload troppo grande" }, { status: 413, headers });
    }

    const rawBody = await req.json().catch(() => null);
    if (!rawBody || typeof rawBody !== "object") {
      return NextResponse.json({ error: "Formato richiesta non valido" }, { status: 400, headers });
    }

    // Honeypot check
    if (rawBody.website && String(rawBody.website).trim().length > 0) {
      // Simula successo per i bot
      return NextResponse.json(
        { success: true, message: "Iscrizione completata con successo." },
        { status: 200, headers }
      );
    }

    // Validazione Zod
    const parseResult = waitlistSchema.safeParse(rawBody);
    if (!parseResult.success) {
      const firstIssue = parseResult.error.issues[0]?.message || "Dati inviati non validi";
      return NextResponse.json({ error: firstIssue }, { status: 400, headers });
    }

    const data = parseResult.data;

    // Cloudflare Turnstile verification
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret && data.turnstileToken) {
      const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0] || undefined;
      const isHuman = await verifyTurnstile(data.turnstileToken, turnstileSecret, clientIp);
      if (!isHuman) {
        return NextResponse.json({ error: "Verifica anti-bot fallita. Riprova." }, { status: 400, headers });
      }
    }

    // Normalizzazione dati
    const cleanEmail = data.email.trim().toLowerCase();
    const cleanPhone = data.phone.trim().replace(/\s+/g, " ");
    const cleanName = data.name.trim();

    // Selezione Supabase client sicuro
    let dbClient;
    try {
      dbClient = getStrictSupabaseAdmin();
    } catch {
      dbClient = supabase;
    }

    // Controllo se l'utente esiste già per preservare consensi precedenti (es. marketing_consent già true)
    const { data: existingUser } = await dbClient
      .from("liar_system_waitlist")
      .select("id, marketing_consent")
      .eq("email", cleanEmail)
      .maybeSingle();

    const finalMarketingConsent = existingUser
      ? existingUser.marketing_consent || data.marketing_consent
      : data.marketing_consent;

    const payloadToSave = {
      email: cleanEmail,
      name: cleanName,
      phone: cleanPhone,
      city: data.city,
      guests_count: data.guests_count,
      event_consent: true,
      marketing_consent: finalMarketingConsent,
      source: data.source,
      landing_page: data.landing_page,
      referrer: data.referrer,
      utm_source: data.utm_source,
      utm_medium: data.utm_medium,
      utm_campaign: data.utm_campaign,
      utm_term: data.utm_term,
      utm_content: data.utm_content,
      privacy_version: data.privacy_version,
      consent_timestamp: new Date().toISOString(),
      status: "pending",
      updated_at: new Date().toISOString(),
    };

    if (existingUser) {
      // Aggiornamento contatto esistente
      const { error: updateError } = await dbClient
        .from("liar_system_waitlist")
        .update(payloadToSave)
        .eq("id", existingUser.id);

      if (updateError) {
        console.error("[Waitlist Update Error]:", updateError.message);
        return NextResponse.json(
          { error: "Impossibile aggiornare la registrazione. Riprova." },
          { status: 500, headers }
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: "I tuoi dati e la tua presenza in lista d'attesa sono stati aggiornati!",
        },
        { status: 200, headers }
      );
    }

    // Inserimento nuovo contatto
    const { error: insertError } = await dbClient
      .from("liar_system_waitlist")
      .insert([{ ...payloadToSave, created_at: new Date().toISOString() }]);

    if (insertError) {
      if (insertError.code === "23505") {
        return NextResponse.json(
          { success: true, message: "Sei già iscritto alla lista d'attesa di Torino!" },
          { status: 200, headers }
        );
      }
      console.error("[Waitlist Insert Error]:", insertError.message);
      return NextResponse.json(
        { error: "Si è verificato un errore durante il salvataggio. Riprova a breve." },
        { status: 500, headers }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Iscrizione alla lista d'attesa confermata! Ti ricontatteremo per l'apertura posti.",
      },
      { status: 201, headers }
    );
  } catch (err) {
    console.error("[Waitlist API Exception]:", err);
    return NextResponse.json({ error: "Errore interno del server." }, { status: 500, headers });
  }
}
