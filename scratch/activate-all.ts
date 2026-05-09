import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function activateAllRecentSessions() {
  console.log("🚀 Attivazione di massa degli ultimi ID sessione...");

  // 1. Prendo l'ultimo evento
  const { data: event } = await supabaseAdmin.from('events').select('id, title').order('created_at', { ascending: false }).limit(1).single();
  if (!event) return;

  // 2. Prendo tutti i booking che non hanno ancora ticket associati
  const { data: bookings } = await supabaseAdmin.from('bookings').select('id, stripe_session_id');
  
  if (!bookings) return;

  for (const booking of bookings) {
    // Verifico se ha già ticket
    const { count } = await supabaseAdmin.from('tickets').select('*', { count: 'exact', head: true }).eq('booking_id', booking.id);
    
    if (count === 0) {
      console.log(`🎟️ Creazione ticket per booking ${booking.id} (Sessione: ${booking.stripe_session_id})`);
      await supabaseAdmin.from('tickets').insert([
        { 
            booking_id: booking.id, 
            event_id: event.id, 
            guest_name: 'Ospite Live',
            buyer_name: 'Cliente Black Bulls',
            buyer_email: 'customer@blackbullslab.com',
            stripe_payment_id: booking.stripe_session_id
        }
      ]);
    }
  }
  console.log("✨ Tutte le sessioni recenti sono state attivate. Ricarica la pagina ora!");
}

activateAllRecentSessions();
