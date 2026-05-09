import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function check() {
  const { data: rows, error } = await supabase.from('bookings').select('*').limit(1);
  if (error) {
    console.error("Error:", error.message);
  } else {
    console.log("Bookings columns:", Object.keys(rows[0] || {}));
  }
}

check();
