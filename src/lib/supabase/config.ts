export function getPublicSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || url.includes("placeholder")) {
    console.error("[Supabase Fail-Closed]: Configurazione mancante: NEXT_PUBLIC_SUPABASE_URL non definita.");
    throw new Error("Configurazione Supabase non valida o incompleta.");
  }

  if (!anonKey || anonKey.includes("placeholder")) {
    console.error("[Supabase Fail-Closed]: Configurazione mancante: NEXT_PUBLIC_SUPABASE_ANON_KEY non definita.");
    throw new Error("Configurazione Supabase non valida o incompleta.");
  }

  return { url, anonKey };
}
