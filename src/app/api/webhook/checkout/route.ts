import { supabaseAdmin } from '../../../../lib/supabase';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';
import { TicketEmail } from '../../../../components/emails/TicketEmail';
import * as React from 'react';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apiVersion: '2023-10-16' as any,
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Manca la firma Stripe' }, { status: 400 });
    }

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Firma non valida';
      console.error('❌ Webhook signature error:', msg);
      return NextResponse.json({ error: `Webhook Error: ${msg}` }, { status: 400 });
    }

    // Processiamo solo i pagamenti completati
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const isCorporate = session.metadata?.type === 'corporate';
      const customerEmail = session.customer_details?.email;
      let customerName = session.customer_details?.name || 'Cliente';

      if (isCorporate) {
        console.log('🏢 Elaborazione ordine CORPORATE...');
        const tierName = session.metadata?.tierName || 'Pacchetto Corporate';
        const price = session.metadata?.price || '0';

        if (customerEmail) {
          try {
            await resend.emails.send({
              from: 'Black Bulls Lab <noreply@blackbullslab.com>',
              to: customerEmail,
              subject: `Conferma Pacchetto Corporate: ${tierName}`,
              html: `
                <div style="font-family: sans-serif; background: #000; color: #fff; padding: 40px; border: 1px solid #c8a44e;">
                  <h1 style="color: #c8a44e;">Grazie per l'acquisto!</h1>
                  <p>Gentile ${customerName},</p>
                  <p>Abbiamo ricevuto con successo il pagamento per il pacchetto <strong>${tierName}</strong>.</p>
                  <div style="background: #111; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #333;">
                    <p>📦 <strong>Prodotto:</strong> ${tierName}</p>
                    <p>💰 <strong>Totale:</strong> €${price}</p>
                    <p>🏢 <strong>Stato:</strong> Pagato</p>
                  </div>
                  <p>Il nostro team ti contatterà a breve per pianificare i dettagli del tuo evento aziendale.</p>
                  <p style="margin-top: 40px; font-size: 12px; color: #666;">Black Bulls Lab - Advanced Entertainment</p>
                </div>
              `
            });
            console.log('📧 Email corporate inviata a', customerEmail);
          } catch (e) {
            console.error('❌ Errore invio mail corporate:', e);
          }
        }
        return NextResponse.json({ received: true, type: 'corporate' });
      }
      // --- LOGICA B2C (Esistente) ---
      const eventId = session.metadata?.eventId;
      const customerPhone = session.metadata?.customerPhone || '';
      customerName = session.metadata?.customerName || session.customer_details?.name || 'Ospite 1';

      // Nomi ospiti aggiuntivi (JSON array)
      let guestNames: string[] = [];
      try {
        guestNames = JSON.parse(session.metadata?.guestNames || '[]');
      } catch {
        guestNames = [];
      }

      const allergies = session.metadata?.allergies || '';
      const quantity = parseInt(session.metadata?.quantity || '1', 10);

      if (!eventId || !customerEmail) {
        console.error('❌ Mancano eventId o customerEmail nei metadata');
        return NextResponse.json({ error: 'Metadata incompleti' }, { status: 400 });
      }

      // 1 — Salva la prenotazione (Nota: customer_name/phone rimossi perché colonne mancanti in DB)
      const { data: booking, error: bookingError } = await supabaseAdmin
        .from('bookings')
        .insert([{
          event_id: eventId,
          customer_email: customerEmail,
          stripe_session_id: session.id,
          total_amount: session.amount_total ? session.amount_total / 100 : 0,
        }])
        .select()
        .single();

      if (bookingError) {
        console.error('❌ ERRORE SALVATAGGIO BOOKING:', bookingError.message);
        return NextResponse.json(
          { error: 'Booking Error', details: bookingError.message },
          { status: 500 }
        );
      }

      console.log('✅ Booking creato:', booking.id);

      // 2 — Crea un biglietto per ciascun ospite con il nome individuale
      const allGuestNames: string[] = [customerName];
      for (let i = 0; i < quantity - 1; i++) {
        allGuestNames.push(guestNames[i] || `Ospite ${i + 2}`);
      }

      const ticketsToInsert = allGuestNames.map((name) => ({
        booking_id: booking.id,
        event_id: eventId,
        guest_name: name,
        allergies: allergies,
        buyer_name: customerName,
        buyer_email: customerEmail,
        stripe_payment_id: session.id
      }));

      const { error: ticketsError } = await supabaseAdmin
        .from('tickets')
        .insert(ticketsToInsert);

      if (ticketsError) {
        console.error('⚠️ Errore salvataggio ticket:', ticketsError.message);
      } else {
        console.log(`✅ ${ticketsToInsert.length} biglietti creati`);
      }

      // 3 — Dati evento per la mail di conferma e aggiornamento posti
      const { data: eventData } = await supabaseAdmin
        .from('events')
        .select('*')
        .eq('id', eventId)
        .single();

      if (eventData) {
        // Aggiorna i posti disponibili
        const newAvailableSlots = Math.max(0, (eventData.available_slots || 0) - quantity);
        await supabaseAdmin.from('events').update({ available_slots: newAvailableSlots }).eq('id', eventId);
      }

      // 4 — Invia email con Resend
      if (eventData) {
        try {
          const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

          const { error: emailError } = await resend.emails.send({
            from: 'Black Bulls Lab <onboarding@resend.dev>',
            to: customerEmail,
            subject: `Conferma Prenotazione: ${eventData.title || eventData.location_name}`,
            react: React.createElement(TicketEmail, {
              userName: customerName,
              eventName: eventData.title || eventData.location_name,
              eventDate: new Date(session.created * 1000).toLocaleString('it-IT', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                hour: '2-digit',
                minute: '2-digit',
              }),
              locationName: eventData.location_name || 'Black Bulls Lab',
              ticketCount: quantity,
              successUrl: `${siteUrl}/success?session_id=${session.id}`,
            }),
          } as Parameters<typeof resend.emails.send>[0]);

          if (emailError) {
            console.error('❌ Errore Resend:', emailError);
          } else {
            console.log('📧 Email di conferma inviata a', customerEmail);
          }
        } catch (mailError) {
          console.error('❌ Errore critico invio email:', mailError);
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (globalError) {
    console.error('❌ Errore globale webhook:', globalError);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}