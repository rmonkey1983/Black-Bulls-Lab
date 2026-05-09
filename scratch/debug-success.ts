import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const SESSION_ID = 'cs_test_a1hZMJ6zANp8UX1kTjIyoYgyYNcmznnSe6S5Eo8EbeaPUizTXSh0GbJuF';

async function debugSuccessQuery() {
  console.log("🚀 Debugging query per sessione:", SESSION_ID);

  // 1. Prima attiviamo la sessione (creiamo booking e ticket)
  const { data: event } = await supabaseAdmin.from('events').select('id').order('created_at', { ascending: false }).limit(1).single();
  if (!event) return;

  await supabaseAdmin.from('bookings').upsert({
      event_id: event.id,
      customer_email: 'debug@test.com',
      stripe_session_id: SESSION_ID,
      total_amount: 50.00,
      payment_status: 'paid'
  }, { onConflict: 'stripe_session_id' });

  await supabaseAdmin.from('tickets').insert([{ 
      booking_id: (await supabaseAdmin.from('bookings').select('id').eq('stripe_session_id', SESSION_ID).single()).data?.id,
      event_id: event.id,
      guest_name: 'Ospite Debug',
      buyer_name: 'Debug',
      buyer_email: 'debug@test.com',
      stripe_payment_id: SESSION_ID
  }]);

  // 2. ORA FACCIAMO LA QUERY DELLA PAGINA SUCCESS
  console.log("🔍 Eseguo query SuccessPage...");
  const { data, error } = await supabaseAdmin
      .from('bookings')
      .select('*, events (*), tickets (*)')
      .eq('stripe_session_id', SESSION_ID)
      .single();

  if (error) {
    console.error("❌ ERRORE NELLA QUERY DI SUCCESS PAGE:", error.message);
    if (error.message.includes('relationship')) {
        console.log("💡 Il problema è una relazione mancante o errata tra bookings e events.");
    }
  } else {
    console.log("✅ Dati recuperati con successo dal DB!");
    console.log("Booking ID:", data.id);
    console.log("Event Title:", data.events?.title);
    console.log("Tickets found:", data.tickets?.length);
  }
}

debugSuccessQuery();
