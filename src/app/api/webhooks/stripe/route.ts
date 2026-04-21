import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';
import { BookingConfirmationEmail } from '@/components/emails/BookingConfirmationEmail';
import * as React from 'react';
import { supabaseAdmin } from '@/lib/supabase';
import { insertBooking } from '@/lib/dataStore';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  // Initialize SDKs inside the handler to prevent build-time crashes due to missing env vars
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: 'Stripe API key is not configured.' }, { status: 500 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2023-10-16' as any,
  });

  const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    if (!signature || !webhookSecret || webhookSecret.includes('placeholder')) {
        const missing = !signature ? 'signature' : !webhookSecret ? 'secret' : 'correct secret (placeholder detected)';
        throw new Error(`Mancano configurazioni critiche: ${missing}`);
    }
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`❌ Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ 
        error: "Signature verification failed", 
        detail: "Verifica STRIPE_WEBHOOK_SECRET nel file .env" 
    }, { status: 400 });
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata;

    if (!metadata) {
        console.error('❌ No metadata found in Stripe session');
        return NextResponse.json({ received: true });
    }

    try {
      const quantity = parseInt(metadata.quantity || '1', 10);
      
      // 1. Insert Booking via DataStore function
      try {
          await insertBooking({
              event_date_id: metadata.eventDateId,
              guest_name: metadata.guestName || '',
              guest_surname: metadata.guestSurname || '',
              guest_email: metadata.guestEmail || '',
              guest_phone: metadata.guestPhone || '',
              quantity: quantity,
              allergies: metadata.allergies || '',
              occasion: metadata.occasion || '',
              stripe_session_id: session.id,
              payment_status: 'paid',
              amount_paid: (session.amount_total || 0) / 100
          }, supabaseAdmin);
          console.log(`✅ Booking saved to Database for ${metadata.guestEmail}`);
      } catch (err) {
          console.error("Failed to insert booking, might already exist via duplicate webhook:", err);
      }

      // 2. Atomically increment capacity
      const { error: rpcError } = await supabaseAdmin.rpc('increment_booked_seats', {
          target_date_id: metadata.eventDateId,
          seats_to_add: quantity
      });

      if (rpcError) {
          console.error("❌ RPC increment_booked_seats failed:", rpcError);
      }

      // Send Confirmation Email
      await resend.emails.send({
        from: 'Black Bulls Lab <info@blackbullslab.com>',
        to: [metadata.guestEmail],
        subject: `Prenotazione Confermata: ${metadata.eventTitle}`,
        react: BookingConfirmationEmail({
          guestName: `${metadata.guestName} ${metadata.guestSurname}`,
          eventTitle: metadata.eventTitle,
          quantity: metadata.quantity,
          selectedDate: metadata.selectedDate,
          location: 'Black Bulls Lab - Torino',
        }) as React.ReactElement,
      });

      console.log(`✅ Email sent successfully to ${metadata.guestEmail}`);
    } catch (emailError) {
      console.error('❌ Error sending confirmation email:', emailError);
      // We still return 200 to Stripe to avoid retries if the email fail is permanent
    }
  }

  return NextResponse.json({ received: true });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
