import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: 'Stripe API key non configurata.' }, { status: 500 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      apiVersion: '2023-10-16' as any,
    });

    const body = await req.json();
    const {
      eventId,
      title,
      price,
      quantity = 1,
      customerName = '',
      customerEmail = '',
      customerPhone = '',
      guestNames = [],
      allergies = '',
    } = body;

    if (!eventId) {
      return NextResponse.json({ error: 'Manca ID evento' }, { status: 400 });
    }

    if (!customerEmail || !customerName) {
      return NextResponse.json({ error: 'Nome e Email sono obbligatori' }, { status: 400 });
    }

    if (quantity < 1 || quantity > 10) {
      return NextResponse.json({ error: 'Quantità non valida (1-10)' }, { status: 400 });
    }

    const safeTitle = title || 'Ingresso Evento Black Bulls';
    const safePrice = price || 50;

    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const host = req.headers.get('host') || 'localhost:3000';
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `${protocol}://${host}`;

    // Stripe metadata values must be strings, max 500 chars each
    const guestNamesStr = JSON.stringify(guestNames).slice(0, 490);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'link'],
      customer_email: customerEmail,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: safeTitle,
              description: `Prenotazione per ${quantity} ${quantity === 1 ? 'persona' : 'persone'}`,
            },
            unit_amount: Math.round(safePrice * 100),
          },
          quantity: quantity,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/calendario/${eventId}`,
      metadata: {
        eventId: eventId,
        eventTitle: safeTitle,
        quantity: quantity.toString(),
        customerName: customerName.slice(0, 100),
        customerEmail: customerEmail.slice(0, 200),
        customerPhone: customerPhone.slice(0, 50),
        guestNames: guestNamesStr,
        allergies: (allergies || 'Nessuna').slice(0, 490),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Errore sconosciuto';
    console.error('Errore Checkout:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
