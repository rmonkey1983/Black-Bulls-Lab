import { createClient } from "@/lib/supabase/server";
import { User } from "@supabase/supabase-js";

export type AuthResult =
  | { authorized: true; user: User; email: string }
  | { authorized: false; status: 401 | 403; error: string };

export async function requireAdmin(): Promise<AuthResult> {
  let supabase;
  try {
    supabase = await createClient();
  } catch {
    return {
      authorized: false,
      status: 401,
      error: "Impossibile verificare la sessione amministrativa.",
    };
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user || !user.email) {
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
    const originHost = originUrl.host;

    if (
      originHost === "blackbullslab.com" ||
      originHost === "www.blackbullslab.com"
    ) {
      return true;
    }

    if (host && originHost === host) {
      return true;
    }

    if (
      process.env.NODE_ENV !== "production" &&
      (originUrl.hostname === "localhost" || originUrl.hostname === "127.0.0.1")
    ) {
      return true;
    }

    if (originUrl.hostname.endsWith(".netlify.app")) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}
