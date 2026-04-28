import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@13.10.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

/**
 * STRIPE WEBHOOK HANDLER - SUPABASE EDGE FUNCTION
 * 
 * Logic:
 * 1. Verify Stripe Signature.
 * 2. Process 'checkout.session.completed'.
 * 3. Atomic Database update via RPC (Stored Procedure).
 * 4. Confirmation Notification (Placeholder).
 */

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
  apiVersion: "2023-10-16",
  httpClient: Stripe.createFetchHttpClient(),
});

const cryptoProvider = Stripe.createSubtleCryptoProvider();

serve(async (req) => {
  const signature = req.headers.get("stripe-signature");

  // Security: Verify Webhook Signature
  if (!signature) {
    return new Response("Missing signature", { status: 400 });
  }

  try {
    const body = await req.text();
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET") ?? "";
    
    let event;
    try {
      event = await stripe.webhooks.constructEventAsync(
        body,
        signature,
        webhookSecret,
        undefined,
        cryptoProvider
      );
    } catch (err) {
      console.error(`❌ Webhook signature verification failed: ${err.message}`);
      return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    // Only handle checkout.session.completed
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      
      // Extract Metadata (Aligned with api/checkout/route.ts)
      const metadata = session.metadata;
      const event_id = metadata?.eventDateId || metadata?.eventId; // Use eventDateId as primary for the specific instance
      const ticket_quantity = parseInt(metadata?.quantity || "0");
      const allergies = metadata?.allergies || "Nessuna";
      const guest_name = `${metadata?.guestName || ""} ${metadata?.guestSurname || ""}`.trim();
      const customer_email = session.customer_details?.email || metadata?.guestEmail;
      const total_amount = (session.amount_total || 0) / 100; // Stripe is in cents

      if (!event_id || !ticket_quantity || !customer_email) {
        console.error("❌ Missing required metadata in Stripe session. Found:", metadata);
        return new Response(JSON.stringify({ error: "Incomplete metadata", metadata }), { status: 400 });
      }

      // Initialize Supabase Client (Service Role for admin bypass)
      const supabaseAdmin = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
      );

      /**
       * CONCURRENCY MANAGEMENT (ANTI-OVERBOOKING)
       * Atomic transaction via RPC
       */
      const { data, error: rpcError } = await supabaseAdmin.rpc("handle_event_booking", {
        p_event_id: event_id,
        p_customer_email: customer_email,
        p_stripe_session_id: session.id,
        p_total_amount: total_amount,
        p_ticket_quantity: ticket_quantity,
        p_guest_name: guest_name,
        p_allergies: allergies
      });

      if (rpcError) {
        console.error("❌ Database Transaction Error:", rpcError);
        const status = rpcError.message.includes("Insufficient") ? 400 : 500;
        return new Response(JSON.stringify({ error: rpcError.message }), { status });
      }

      // 6. Fetch the newly created tickets to get their IDs for QR codes
      const { data: tickets, error: ticketsError } = await supabaseAdmin
        .from("tickets")
        .select("id, guest_name")
        .eq("booking_id", data.booking_id);

      if (ticketsError) {
        console.error("⚠️ Could not fetch tickets for email:", ticketsError);
      }

      /**
       * NOTIFICATION (Resend Integration)
       */
      const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
      if (RESEND_API_KEY && tickets) {
        try {
          const ticketHtml = tickets.map((t: { id: string; guest_name: string }, i: number) => `
            <div style="border: 2px solid #C8A44E; border-radius: 12px; padding: 20px; margin-bottom: 20px; background-color: #0A0A0A; color: white; font-family: sans-serif;">
              <h3 style="color: #C8A44E; margin-top: 0;">Biglietto #${i + 1}</h3>
              <p><strong>Ospite:</strong> ${t.guest_name}</p>
              <div style="text-align: center; margin: 20px 0;">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${t.id}" alt="QR Code" style="background: white; padding: 10px; border-radius: 8px;" />
              </div>
              <p style="font-size: 12px; color: #666; text-align: center;">ID: ${t.id}</p>
            </div>
          `).join("");

          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
              from: "Black Bulls Lab <prenotazioni@blackbullslab.com>", // Assicurati che il dominio sia verificato su Resend
              to: [customer_email],
              subject: `Conferma Prenotazione: ${metadata?.eventTitle || 'Evento'}`,
              html: `
                <div style="max-width: 600px; margin: 0 auto; background-color: #000; padding: 40px; border-radius: 20px;">
                  <h1 style="color: #C8A44E; text-transform: uppercase; letter-spacing: 2px;">La tua serata è confermata!</h1>
                  <p style="color: #ccc; line-height: 1.6;">Ciao ${guest_name}, preparati per un'esperienza indimenticabile. Ecco i tuoi biglietti digitali da mostrare all'ingresso:</p>
                  
                  ${ticketHtml}

                  <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #333; color: #666; font-size: 14px;">
                    <p>Location: ${metadata?.location || 'Black Bulls Lab'}</p>
                    <p>Data: ${new Date(metadata?.selectedDate || '').toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                    <p>Hai domande? Rispondi a questa email.</p>
                  </div>
                </div>
              `,
            }),
          });

          if (res.ok) {
            console.log("✅ Confirmation email sent to:", customer_email);
          } else {
            const error = await res.json();
            console.error("❌ Resend API Error:", error);
          }
        } catch (emailErr) {
          console.error("⚠️ Failed to send notification email:", emailErr);
        }
      } else {
        console.warn("⚠️ Resend integration skipped: Missing API Key or Ticket data.");
      }

      return new Response(JSON.stringify({ received: true, ...data }), { status: 200 });
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });

  } catch (err) {
    console.error(`❌ Server Error: ${err.message}`);
    return new Response(`Server Error: ${err.message}`, { status: 500 });
  }
});
