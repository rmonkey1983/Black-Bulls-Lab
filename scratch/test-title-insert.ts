import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function testTitleInsert() {
  console.log("Attempting insert with only title...");
  
  const testEvent = {
    title: "Only Title Event " + Date.now()
  };

  const { data, error } = await supabaseAdmin.from('events').insert(testEvent).select();

  if (error) {
    console.error("❌ TITLE INSERT FAILED:", JSON.stringify(error, null, 2));
  } else {
    console.log("✅ TITLE INSERT SUCCESSFUL:", data);
  }
}

testTitleInsert();
