import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function check() {
  console.log("Fetching column names for 'events' table...");
  const { data, error } = await supabase.rpc('get_table_columns', { table_name: 'events' });
  
  if (error) {
    console.error("Error with RPC:", error.message);
    // Fallback: try to select a row and look at keys
    const { data: rows } = await supabase.from('events').select('*').limit(1);
    if (rows && rows.length > 0) {
        console.log("Columns from row:", Object.keys(rows[0]));
    } else {
        console.log("Could not determine columns.");
    }
  } else {
    console.log("Columns from RPC:", data);
  }
}

check();
