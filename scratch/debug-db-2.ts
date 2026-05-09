import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function check() {
  console.log("Checking event_dates table...");
  const { data, error } = await supabase.from('event_dates').select('*').limit(1);
  
  if (error) {
    console.error("Error fetching from event_dates:", error);
  } else if (data && data.length > 0) {
    console.log("Found record in event_dates:", data[0]);
    console.log("Columns:", Object.keys(data[0]));
  } else {
    console.log("event_dates table is empty or doesn't exist.");
  }
}

check();
