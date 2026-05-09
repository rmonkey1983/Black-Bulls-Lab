import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function check() {
  console.log("Listing all tables...");
  const { data, error } = await supabase.rpc('get_tables'); // This might not work if RPC is not defined
  
  if (error) {
    // Try to query information_schema directly
    const { data: tables, error: schemaError } = await supabase.from('pg_tables').select('tablename').eq('schemaname', 'public');
    // Wait, Supabase client might not allow direct access to pg_tables
    // Let's try to query a few likely names
    const tableNames = ['events', 'event_dates', 'bookings', 'tickets', 'talents', 'gallery', 'settings', 'newsletter'];
    for (const name of tableNames) {
        const { error: tError } = await supabase.from(name).select('count', { count: 'exact', head: true });
        if (tError) {
            console.log(`Table '${name}' NOT found or error:`, tError.message);
        } else {
            console.log(`Table '${name}' exists.`);
        }
    }
  } else {
    console.log("Tables:", data);
  }
}

check();
