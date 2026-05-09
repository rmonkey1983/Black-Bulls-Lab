import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function testMinimalInsert() {
  console.log("Attempting minimal insert...");
  
  // Try only columns we are SURE exist or were basic
  const testEvent = {
    title: "Minimal Event " + Date.now(),
    slug: "min-event-" + Date.now(),
    date: new Date().toISOString()
  };

  const { data, error } = await supabaseAdmin.from('events').insert(testEvent).select();

  if (error) {
    console.error("❌ MINIMAL INSERT FAILED:", error);
  } else {
    console.log("✅ MINIMAL INSERT SUCCESSFUL:", data);
  }
}

testMinimalInsert();
