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
      tierName,
      price,
      customerEmail = '',
    } = body;

    if (!tierName || !price) {
      return NextResponse.json({ error: 'Dati pacchetto mancanti' }, { status: 400 });
    }

    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const host = req.headers.get('host') || 'localhost:3000';
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `${protocol}://${host}`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'link'],
      customer_email: customerEmail || undefined,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Pacchetto Corporate: ${tierName}`,
              description: `Esperienza interattiva Black Bulls Lab per 20-100+ persone.`,
            },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&type=corporate`,
      cancel_url: `${baseUrl}/eventi-aziendali`,
      metadata: {
        type: 'corporate',
        tierName: tierName,
        price: price.toString(),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Errore sconosciuto';
    console.error('Errore Checkout Corporate:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
