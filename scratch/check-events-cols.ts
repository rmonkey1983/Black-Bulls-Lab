import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function checkColumns() {
  const { data, error } = await supabaseAdmin.from('events').select('*').limit(1);
  if (error) {
    console.error("Error fetching events:", error);
    // Try to get column names from an RPC if possible, or just look at the error
  } else {
    console.log("Existing columns in 'events':", Object.keys(data[0] || {}));
  }
}

checkColumns();
