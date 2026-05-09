import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const SESSION_ID = 'cs_test_a1scHxHGhnFeAtLtniKHm4bdFUtC7ZKh4tUoL5QzQry5CXcFnxbNJbj2RJ';

async function testTicketInsert() {
  console.log("🔍 Checking booking for session:", SESSION_ID);

  const { data: booking, error: bError } = await supabaseAdmin
      .from('bookings')
      .select('*')
      .eq('stripe_session_id', SESSION_ID)
      .single();

  if (bError) {
      console.log("Error getting booking:", bError.message);
      return;
  }

  console.log("Booking found:", booking.id, "Event ID:", booking.event_id);

  const ticketsToInsert = [
      {
          booking_id: booking.id,
          event_id: booking.event_id,
          guest_name: 'Test Guest 1',
          allergies: '',
          buyer_name: 'Buyer Name',
          buyer_email: booking.customer_email,
          stripe_payment_id: SESSION_ID
      }
  ];

  console.log("Attempting to insert ticket:", ticketsToInsert);

  const { data: newTickets, error: tError } = await supabaseAdmin.from('tickets').insert(ticketsToInsert).select();

  if (tError) {
      console.error("❌ Error inserting ticket:", tError);
  } else {
      console.log("✅ Ticket inserted successfully:", newTickets);
  }
}

testTicketInsert();
