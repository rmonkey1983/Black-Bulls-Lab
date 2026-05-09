import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function testInsert() {
  console.log("Attempting test insert into 'events' table...");
  
  const testEvent = {
    title: "Test Event " + Date.now(),
    slug: "test-event-" + Date.now(),
    date: new Date().toISOString(),
    category: 'Dinner Show',
    location_name: "Test Location",
    location_address: "Test Address",
    event_date: new Date().toISOString(),
    description: "Test Description",
    total_slots: 50,
    available_slots: 50
  };

  const { data, error } = await supabaseAdmin.from('events').insert(testEvent).select();

  if (error) {
    console.error("❌ INSERT FAILED:", error);
  } else {
    console.log("✅ INSERT SUCCESSFUL:", data);
  }
}

testInsert();
