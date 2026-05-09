import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const SESSION_ID = 'cs_test_a1iv1lqMnPXBWttbVQBEqrFHemPQcOq4auU3AwRyB0IYLVqFF0yYiCrtLG';

async function simulateCheckout() {
  console.log("🚀 Simulo completamento ordine (Tentativo DISPERATO)...");

  const { data: events } = await supabaseAdmin.from('events').select('id, title, location_name').order('created_at', { ascending: false }).limit(1);
  if (!events || events.length === 0) return;
  const event = events[0];

  const { data: existing } = await supabaseAdmin.from('bookings').select('id').eq('stripe_session_id', SESSION_ID).single();
  const bookingId = existing?.id;

  if (!bookingId) return;

  const tickets = [
    { 
        booking_id: bookingId, 
        event_id: event.id, 
        guest_name: 'Ospite Test',
        buyer_name: 'Cliente Test',
        buyer_email: 'test@example.com',
        stripe_payment_id: SESSION_ID // Colonna richiesta dal tuo DB
    }
  ];

  const { error: tError } = await supabaseAdmin.from('tickets').insert(tickets);

  if (tError) {
    console.error("❌ Ancora un errore:", tError.message);
  } else {
    console.log("✅ CE L'ABBIAMO FATTA! BIGLIETTI CREATI! ✨");
    console.log("Ora ricarica la pagina /success!");
  }
}

simulateCheckout();
