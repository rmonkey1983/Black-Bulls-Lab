import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const SESSION_ID = 'cs_test_a1lVGdM01cOz7f5rE6AUExfHgEiortnWTPWDvyEqAK5NrWAQfpaMUOyh9j';

async function activateSession() {
  console.log("🚀 Attivazione specifica per sessione:", SESSION_ID);

  const { data: event } = await supabaseAdmin.from('events').select('id, title').order('created_at', { ascending: false }).limit(1).single();
  if (!event) return;

  // 1. Creo il booking se manca
  const { data: booking, error: bError } = await supabaseAdmin.from('bookings').upsert({
      event_id: event.id,
      customer_email: 'test@blackbullslab.com',
      stripe_session_id: SESSION_ID,
      total_amount: 50.00,
      payment_status: 'paid'
  }, { onConflict: 'stripe_session_id' }).select().single();

  if (bError) { console.error(bError); return; }

  // 2. Creo i biglietti
  await supabaseAdmin.from('tickets').insert([
    { 
        booking_id: booking.id, 
        event_id: event.id, 
        guest_name: 'Ospite Test',
        buyer_name: 'Cliente Black Bulls',
        buyer_email: 'test@example.com',
        stripe_payment_id: SESSION_ID
    }
  ]);

  console.log("✨ Sessione ATTIVATA! Ricarica la pagina ora.");
}

activateSession();
