import { NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";
import { getCorporateTier, CORPORATE_TIERS } from "@/lib/corporateTiers";

export const dynamic = "force-dynamic";

// Zod schema for Corporate Checkout payload — strictly omits price and custom tier names
const corporateCheckoutSchema = z.object({
  tierId: z.string().min(1, "ID pacchetto obbligatorio"),
  customerEmail: z.string().email("Email non valida").optional().or(z.literal("")),
});

function getBaseUrl(): string {
  if (process.env.SITE_URL) {
    return process.env.SITE_URL.replace(/\/$/, "");
  }
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  return process.env.NODE_ENV === "production"
    ? "https://blackbullslab.com"
    : "http://localhost:3000";
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();

    // 1. Validate payload structure with Zod
    const validationResult = corporateCheckoutSchema.safeParse(rawBody);
    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0]?.message || "Dati inviati non validi.";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { tierId, customerEmail } = validationResult.data;

    // 2. Retrieve corporate tier from server-only catalog
    const tier = getCorporateTier(tierId);
    if (!tier) {
      const validTiers = Object.keys(CORPORATE_TIERS).join(", ");
      return NextResponse.json(
        { error: `Pacchetto corporate non valido. Valori ammessi: ${validTiers}` },
        { status: 400 }
      );
    }

    // 3. Verify Stripe API key configuration
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Stripe API key non configurata." }, { status: 500 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      apiVersion: "2023-10-16" as any,
    });

    const baseUrl = getBaseUrl();

    // 4. Create Stripe Checkout Session using ONLY server catalog tier name and price in cents
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "link"],
      customer_email: customerEmail || undefined,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Pacchetto Corporate: ${tier.name}`,
              description: tier.description,
            },
            unit_amount: tier.unitAmountCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&type=corporate`,
      cancel_url: `${baseUrl}/eventi-aziendali`,
      metadata: {
        type: "corporate",
        tierId: tier.id,
        tierName: tier.name,
        priceCents: String(tier.unitAmountCents),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Errore sconosciuto";
    console.error("Errore Checkout Corporate:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
