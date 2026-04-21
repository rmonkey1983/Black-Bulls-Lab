import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client for the frontend (subject to RLS policies)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Client for secure backend environments (bypasses RLS)
// Note: STRIPE_WEBHOOK_SECRET and other secrets verify we are in a trusted environment,
// so it's safe to use the service role key here.
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseAdmin = supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  // Fallback to anon if running without service key (but might fail RLS)
  : supabase;
