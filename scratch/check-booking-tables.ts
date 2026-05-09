import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function checkTables() {
  for (const table of ['bookings', 'tickets']) {
    console.log(`\n--- Checking Table: ${table} ---`);
    const { data, error } = await supabaseAdmin.from(table).select('*').limit(1);
    if (error) {
      console.error(`❌ Error fetching from ${table}:`, error.message);
    } else {
      console.log(`✅ Table ${table} exists. Columns:`, data.length > 0 ? Object.keys(data[0]) : "No rows to determine columns");
      
      // Try to get columns even if empty by trying to select a non-existent column
      const { error: colError } = await supabaseAdmin.from(table).select('non_existent_column_to_trigger_list').limit(0);
      if (colError && colError.message.includes('column')) {
          console.log(`Schema hint from error: ${colError.message}`);
      }
    }
  }
}

checkTables();
