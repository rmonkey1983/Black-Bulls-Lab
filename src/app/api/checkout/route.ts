import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { checkCapacity } from '@/lib/dataStore';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    // Initialize Stripe inside the handler to prevent build-time crashes due to missing env vars
    if (!process.env.STRIPE_SECRET_KEY) {
        return NextResponse.json({ error: 'Stripe API key is not configured.' }, { status: 500 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      apiVersion: '2023-10-16' as any,
    });

    const body = await req.json();
    const { eventId, eventTitle, eventDateId, quantity, selectedDate, guest, premium, unitAmount } = body;

    if (!quantity || !guest.email || !guest.name || !eventDateId) {
      return NextResponse.json({ error: 'Dati incompleti' }, { status: 400 });
    }

    if (quantity < 1 || quantity > 10) {
      return NextResponse.json({ error: 'Quantità non valida (1-10)' }, { status: 400 });
    }

    const bookingDate = new Date(selectedDate);
    if (bookingDate < new Date()) {
      return NextResponse.json({ error: 'Data non valida' }, { status: 400 });
    }

    // Capacity Check
    const hasCapacity = await checkCapacity(eventDateId, quantity);
    if (!hasCapacity) {
      return NextResponse.json({ error: 'Posti esauriti o non sufficienti per questa data.' }, { status: 400 });
    }

    // Determine the base URL for redirects
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const host = req.headers.get('host') || 'localhost:3000';
    const baseUrl = `${protocol}://${host}`;

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: guest.email,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Prenotazione: ${eventTitle || 'Evento Black Bulls Lab'}`,
              description: `Prenotazione per ${quantity} ospiti il ${new Date(selectedDate).toLocaleDateString('it-IT')}`,
            },
            unit_amount: unitAmount || 2000, // Defalut to €20.00 deposit if not provided
          },
          quantity: quantity,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout/cancel?eventId=${eventId}`,
      metadata: {
        eventId: eventId,
        eventTitle: eventTitle,
        eventDateId: eventDateId,
        quantity: quantity.toString(),
        selectedDate: selectedDate,
        guestName: guest.name,
        guestSurname: guest.surname,
        guestEmail: guest.email,
        guestPhone: guest.phone,
        allergies: premium?.allergies || 'Nessuna',
        occasion: premium?.occasion || 'Nessuna',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe Checkout Error:', error);
    return NextResponse.json(
      { error: 'Impossibile creare la sessione di pagamento.' },
      { status: 500 }
    );
  }
}
