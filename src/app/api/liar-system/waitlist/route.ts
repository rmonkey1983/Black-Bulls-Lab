import { NextResponse } from "next/server";
import { z } from "zod";
import { getStrictSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// Zod Schema per la validazione del payload di richiesta
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

// Normalizzazione numero di telefono in formato E.164 (^\+[1-9][0-9]{7,14}$)
function normalizeE164Phone(rawPhone: string): string | null {
  if (!rawPhone) return null;
  let cleaned = rawPhone.trim().replace(/[\s\-\(\)]/g, "");

  if (cleaned.startsWith("00")) {
    cleaned = "+" + cleaned.slice(2);
  } else if (!cleaned.startsWith("+")) {
    if (cleaned.startsWith("39") && cleaned.length >= 10) {
      cleaned = "+" + cleaned;
    } else {
      cleaned = "+39" + cleaned;
    }
  }

  const e164Regex = /^\+[1-9][0-9]{7,14}$/;
  if (!e164Regex.test(cleaned)) {
    return null;
  }
  return cleaned;
}

// Verification Cloudflare Turnstile con approccio Fail-Closed (Nessun fallback fail-open!)
async function verifyTurnstile(token: string, secretKey: string, remoteIp?: string): Promise<boolean> {
  if (!secretKey || !token) return false;

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
    return false; // Fail-closed in caso di errore di rete
  }
}

export async function POST(req: Request) {
  const headers = {
    "Cache-Control": "no-store, no-cache, must-revalidate",
    "Content-Type": "application/json",
  };

  try {
    // 1. Controllo Origin Header per sicurezza
    const origin = req.headers.get("origin");
    if (origin) {
      const allowedOrigins = [
        "https://blackbullslab.com",
        "https://www.blackbullslab.com",
        "http://localhost:3000",
        "http://localhost:3001",
      ];
      const isAllowedOrigin =
        allowedOrigins.includes(origin) ||
        (origin.endsWith(".netlify.app") && origin.includes("blackbullslab"));

      if (!isAllowedOrigin) {
        return NextResponse.json(
          { success: false, error: "Origine della richiesta non autorizzata." },
          { status: 403, headers }
        );
      }
    }

    // 2. Controllo dimensione payload max 50KB
    const contentLength = parseInt(req.headers.get("content-length") || "0", 10);
    if (contentLength > 50000) {
      return NextResponse.json({ success: false, error: "Payload troppo grande." }, { status: 413, headers });
    }

    const rawBody = await req.json().catch(() => null);
    if (!rawBody || typeof rawBody !== "object") {
      return NextResponse.json({ success: false, error: "Formato richiesta non valido." }, { status: 400, headers });
    }

    // 3. Honeypot check per bot
    if (rawBody.website && String(rawBody.website).trim().length > 0) {
      return NextResponse.json(
        { success: true, message: "Iscrizione alla lista d’attesa confermata." },
        { status: 200, headers }
      );
    }

    // 4. Validazione Zod
    const parseResult = waitlistSchema.safeParse(rawBody);
    if (!parseResult.success) {
      const firstIssue = parseResult.error.issues[0]?.message || "Dati inviati non validi";
      return NextResponse.json({ success: false, error: firstIssue }, { status: 400, headers });
    }

    const data = parseResult.data;

    // 5. Cloudflare Turnstile Verification Esplicita (Opzionale tramite WAITLIST_TURNSTILE_ENABLED)
    const turnstileEnabled = process.env.WAITLIST_TURNSTILE_ENABLED === "true";

    if (turnstileEnabled) {
      const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
      if (!turnstileSecret) {
        console.error("[Turnstile Config Error]: WAITLIST_TURNSTILE_ENABLED è true ma TURNSTILE_SECRET_KEY manca.");
        return NextResponse.json(
          { success: false, error: "Configurazione anti-bot non valida sul server." },
          { status: 500, headers }
        );
      }

      if (!data.turnstileToken) {
        return NextResponse.json(
          { success: false, error: "Verifica anti-bot obbligatoria mancante." },
          { status: 400, headers }
        );
      }

      const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0] || undefined;
      const isHuman = await verifyTurnstile(data.turnstileToken, turnstileSecret, clientIp);
      if (!isHuman) {
        return NextResponse.json(
          { success: false, error: "Verifica anti-bot fallita. Riprova." },
          { status: 400, headers }
        );
      }
    }

    // 6. Normalizzazione dati
    const cleanEmail = data.email.trim().toLowerCase();
    const cleanName = data.name.trim();
    const phoneE164 = normalizeE164Phone(data.phone);

    if (!phoneE164) {
      return NextResponse.json(
        { success: false, error: "Numero di telefono non valido. Inserire un numero di telefono corretto." },
        { status: 400, headers }
      );
    }

    // 7. Istanziazione Fail-Closed di Supabase Service Role Admin
    let dbClient;
    try {
      dbClient = getStrictSupabaseAdmin();
    } catch (err) {
      console.error("[Supabase Admin Service Role Missing]:", err);
      return NextResponse.json(
        { success: false, error: "Servizio temporaneamente non disponibile. Riprova più tardi." },
        { status: 503, headers }
      );
    }

    // 8. Controllo esistenza contatto per preservazione consensi e prevenzione duplicati
    const { data: existingUser, error: findError } = await dbClient
      .from("liar_system_waitlist")
      .select("id, marketing_consent, marketing_channels, marketing_consent_at, status")
      .eq("email", cleanEmail)
      .maybeSingle();

    if (findError) {
      console.error("[Waitlist Query Error]:", findError.message);
      return NextResponse.json(
        { success: false, error: "Impossibile completare la registrazione. Riprova a breve." },
        { status: 500, headers }
      );
    }

    const nowIso = new Date().toISOString();
    let finalMarketingConsent = false;
    let finalMarketingChannels: string[] = [];
    let finalMarketingConsentAt: string | null = null;

    if (existingUser) {
      if (existingUser.marketing_consent) {
        finalMarketingConsent = true;
        finalMarketingChannels = existingUser.marketing_channels || ["email", "whatsapp"];
        finalMarketingConsentAt = existingUser.marketing_consent_at || nowIso;
      } else if (data.marketing_consent) {
        finalMarketingConsent = true;
        finalMarketingChannels = ["email", "whatsapp"];
        finalMarketingConsentAt = nowIso;
      } else {
        finalMarketingConsent = false;
        finalMarketingChannels = [];
        finalMarketingConsentAt = null;
      }
    } else {
      if (data.marketing_consent) {
        finalMarketingConsent = true;
        finalMarketingChannels = ["email", "whatsapp"];
        finalMarketingConsentAt = nowIso;
      }
    }

    // Mappatura esatta sulle colonne reali della tabella public.liar_system_waitlist
    const recordPayload = {
      full_name: cleanName,
      email: cleanEmail,
      phone_e164: phoneE164,
      city: data.city || "Torino",
      party_size: data.guests_count || 1,
      event_updates_consent: true,
      event_updates_channels: ["email", "whatsapp"],
      event_updates_consent_at: nowIso,
      marketing_consent: finalMarketingConsent,
      marketing_channels: finalMarketingChannels,
      marketing_consent_at: finalMarketingConsentAt,
      privacy_notice_version: data.privacy_version || "v1.0",
      privacy_acknowledged_at: nowIso,
      source: data.source || "landing_page",
      referrer_url: data.referrer || "",
      landing_path: data.landing_page || "/format/a-cena-con-il-bugiardo",
      utm_source: data.utm_source || "",
      utm_medium: data.utm_medium || "",
      utm_campaign: data.utm_campaign || "",
      utm_content: data.utm_content || "",
      utm_term: data.utm_term || "",
      status: "active",
      updated_at: nowIso,
    };

    if (existingUser) {
      // Aggiornamento del contatto esistente senza duplicazione
      const { error: updateError } = await dbClient
        .from("liar_system_waitlist")
        .update(recordPayload)
        .eq("id", existingUser.id);

      if (updateError) {
        console.error("[Waitlist Update Error]:", updateError.message);
        return NextResponse.json(
          { success: false, error: "Impossibile aggiornare la registrazione. Riprova." },
          { status: 500, headers }
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: "I tuoi dati e la tua presenza in lista d’attesa sono stati aggiornati!",
        },
        { status: 200, headers }
      );
    }

    // Inserimento nuovo contatto
    const { error: insertError } = await dbClient
      .from("liar_system_waitlist")
      .insert([{ ...recordPayload, created_at: nowIso }]);

    if (insertError) {
      if (insertError.code === "23505") {
        return NextResponse.json(
          { success: true, message: "Sei già iscritto alla lista d’attesa di Torino!" },
          { status: 200, headers }
        );
      }
      console.error("[Waitlist Insert Error]:", insertError.message);
      return NextResponse.json(
        { success: false, error: "Si è verificato un errore durante il salvataggio. Riprova a breve." },
        { status: 500, headers }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Iscrizione alla lista d’attesa confermata! Ti ricontatteremo per l'apertura posti.",
      },
      { status: 201, headers }
    );
  } catch (err) {
    console.error("[Waitlist API Exception]:", err);
    return NextResponse.json(
      { success: false, error: "Errore interno durante l'elaborazione della richiesta." },
      { status: 500, headers }
    );
  }
}
