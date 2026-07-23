import { createClient } from "@/lib/supabase/server";
import { User } from "@supabase/supabase-js";

export type AuthResult =
  | { authorized: true; user: User; email: string }
  | { authorized: false; status: 401 | 403; error: string };

export async function requireAdmin(): Promise<AuthResult> {
  let supabase;
  try {
    supabase = await createClient();
  } catch (err) {
    console.error("[RequireAdmin Client Error]:", err);
    return {
      authorized: false,
      status: 401,
      error: "Non autenticato. Sessione amministrativa non valida o scaduta.",
    };
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user || !user.email) {
    if (error) console.error("[RequireAdmin Auth Error]:", error.message);
    return {
      authorized: false,
      status: 401,
      error: "Non autenticato. Sessione amministrativa assente, non valida o scaduta.",
    };
  }

  const allowedEmailsRaw = process.env.ADMIN_ALLOWED_EMAILS || "";
  const allowedEmails = allowedEmailsRaw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  const userEmail = user.email.trim().toLowerCase();

  if (allowedEmails.length === 0 || !allowedEmails.includes(userEmail)) {
    return {
      authorized: false,
      status: 403,
      error: "Accesso negato. Utente non autorizzato nella lista amministratori.",
    };
  }

  return {
    authorized: true,
    user,
    email: userEmail,
  };
}

export function isValidOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;

  const host = req.headers.get("host");

  try {
    const originUrl = new URL(origin);
    const originNormalized = originUrl.origin.toLowerCase().trim();

    if (
      originNormalized === "https://blackbullslab.com" ||
      originNormalized === "https://www.blackbullslab.com"
    ) {
      return true;
    }

    if (host) {
      const expectedProtocol = req.headers.get("x-forwarded-proto") || "https";
      const sameHostOrigin = `${expectedProtocol}://${host}`.toLowerCase().trim();
      if (originNormalized === sameHostOrigin || originUrl.host === host) {
        return true;
      }
    }

    if (
      process.env.NODE_ENV !== "production" &&
      (originUrl.hostname === "localhost" || originUrl.hostname === "127.0.0.1")
    ) {
      return true;
    }

    const allowedCustomOriginsRaw = process.env.ADMIN_ALLOWED_ORIGINS || "";
    const allowedCustomOrigins = allowedCustomOriginsRaw
      .split(",")
      .map((o) => {
        try {
          return new URL(o.trim()).origin.toLowerCase();
        } catch {
          return "";
        }
      })
      .filter(Boolean);

    if (allowedCustomOrigins.includes(originNormalized)) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}
