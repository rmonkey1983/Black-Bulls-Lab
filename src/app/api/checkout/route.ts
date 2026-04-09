import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with the secret key from environment variable
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apiVersion: '2023-10-16' as any, // Using stable casting for compatibility
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { eventId, eventTitle, quantity, selectedDate, guest, premium, unitAmount } = body;

    if (!quantity || !guest.email || !guest.name) {
      return NextResponse.json({ error: 'Dati incompleti' }, { status: 400 });
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
