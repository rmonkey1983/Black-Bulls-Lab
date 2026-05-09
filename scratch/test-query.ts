import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const SESSION_ID = 'cs_test_a1uSuLbMGw9fANvvJDvPkiHWrKNKOjH9BGT4dltVSgJvIOsCLiw5imb1cOLa';

async function testQuery() {
  console.log("Testing query for session:", SESSION_ID);
  
  const { data, error } = await supabaseAdmin
      .from('bookings')
      .select('*, tickets (*)')
      .eq('stripe_session_id', SESSION_ID)
      .single();

  console.log("Error:", error);
  console.log("Data:", data);
}

testQuery();
