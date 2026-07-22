import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Client for the frontend / public queries (subject to RLS policies)
// Supports NEXT_PUBLIC_SUPABASE_ANON_KEY and legacy SUPABASE_ANON_KEY fallback
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  "placeholder-anon-key";

export const supabase: SupabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey
);

/**
 * Returns a strict Supabase client initialized with SUPABASE_SERVICE_ROLE_KEY.
 * Throws a configuration error if SUPABASE_SERVICE_ROLE_KEY is missing.
 * Must only be used in server-side API routes / server actions.
 */
export function getStrictSupabaseAdmin(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Configurazione Supabase server incompleta. Verificare NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY."
    );
  }

  return createClient(url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

/**
 * Lazy getter for Supabase Admin client to prevent top-level module evaluation failures during Next.js builds.
 */
export function getSupabaseAdmin(): SupabaseClient {
  return getStrictSupabaseAdmin();
}

/**
 * Backward compatible export for existing server modules using proxy getter.
 */
export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, prop: keyof SupabaseClient) {
    const adminClient = getStrictSupabaseAdmin();
    const val = adminClient[prop];
    return typeof val === "function" ? val.bind(adminClient) : val;
  },
});

