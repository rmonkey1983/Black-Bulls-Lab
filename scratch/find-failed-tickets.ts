import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function findLatestFailedBooking() {
  const { data: bookings, error: bError } = await supabaseAdmin
      .from('bookings')
      .select('*, tickets(*)')
      .order('created_at', { ascending: false })
      .limit(5);

  if (bError) {
      console.log("Error getting bookings:", bError);
      return;
  }

  for (const booking of bookings) {
      if (!booking.tickets || booking.tickets.length === 0) {
          console.log(`⚠️ Found booking with 0 tickets: ${booking.id} (Session: ${booking.stripe_session_id})`);
          
          const ticketsToInsert = [
            {
                booking_id: booking.id,
                event_id: booking.event_id,
                guest_name: 'Test Guest Multiple',
                allergies: '',
                buyer_name: 'Buyer Name',
                buyer_email: booking.customer_email,
                stripe_payment_id: booking.stripe_session_id
            }
          ];

          console.log("Attempting to insert ticket to see error...");
          const { data: newTickets, error: tError } = await supabaseAdmin.from('tickets').insert(ticketsToInsert).select();
          
          if (tError) {
              console.error("❌ ERROR inserting ticket:", tError);
          } else {
              console.log("✅ Successfully inserted ticket:", newTickets);
          }
          return;
      }
  }
  
  console.log("No bookings with 0 tickets found in the last 5.");
}

findLatestFailedBooking();
