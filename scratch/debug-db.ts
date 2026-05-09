import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function check() {
  console.log("Checking events table...");
  const { data, error } = await supabase.from('events').select('*').limit(1);
  
  if (error) {
    console.error("Error fetching from events:", error);
  } else if (data && data.length > 0) {
    console.log("Found record in events:", data[0]);
    console.log("Columns:", Object.keys(data[0]));
  } else {
    console.log("Events table is empty or doesn't exist.");
    // Try to list tables
    const { data: tables, error: tableError } = await supabase.rpc('get_tables');
    if (tableError) {
        console.error("Error listing tables:", tableError);
    } else {
        console.log("Tables:", tables);
    }
  }
}

check();
