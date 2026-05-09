import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function checkData() {
  console.log("🔍 Verifico ultimi record nel database...");

  const { data: bookings } = await supabaseAdmin.from('bookings').select('id, stripe_session_id, created_at').order('created_at', { ascending: false }).limit(5);
  console.log("\n--- ULTIMI 5 BOOKINGS ---");
  console.table(bookings);

  const { data: tickets } = await supabaseAdmin.from('tickets').select('id, booking_id, guest_name, created_at').order('created_at', { ascending: false }).limit(5);
  console.log("\n--- ULTIMI 5 TICKETS ---");
  console.table(tickets);
}

checkData();
