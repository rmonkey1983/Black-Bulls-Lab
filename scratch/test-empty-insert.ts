import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function testEmptyInsert() {
  console.log("Attempting empty insert to check for column constraints...");
  
  const { data, error } = await supabaseAdmin.from('events').insert({}).select();

  if (error) {
    console.error("❌ EMPTY INSERT FAILED:", JSON.stringify(error, null, 2));
  } else {
    console.log("✅ EMPTY INSERT SUCCESSFUL (WTF?):", data);
  }
}

testEmptyInsert();
