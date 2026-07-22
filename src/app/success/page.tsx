import { getStrictSupabaseAdmin, supabase } from '@/lib/supabase';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import TicketQRCode from '@/components/tickets/TicketQRCode';
import { DownloadTicketButton } from '@/components/tickets/DownloadTicketButton';

interface Ticket {
  id: string;
  guest_name?: string;
  allergies?: string;
}

export const dynamic = 'force-dynamic';

export default async function SuccessPage(props: {
  searchParams: Promise<{ session_id?: string; type?: string }>;
}) {
  const params = await props.searchParams;
  const sessionId = params.session_id;
  const isCorporate = params.type === 'corporate';

  if (!sessionId) {
    redirect('/');
  }

  if (isCorporate) {
    return (
      <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans relative z-50 pt-32 flex flex-col items-center justify-center text-center">
        <style dangerouslySetInnerHTML={{ __html: `#preloader, .preloader, [class*="loader"], [id*="loader"] { display: none !important; visibility: hidden !important; opacity: 0 !important; pointer-events: none !important; } body { overflow: auto !important; }`}} />
        <div className="max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="w-24 h-24 bg-[#FFD700]/10 rounded-full flex items-center justify-center mx-auto border border-[#FFD700]/20">
            <span className="text-5xl">🏢</span>
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold uppercase text-[#FFD700] tracking-tighter">Grazie!</h1>
            <h2 className="text-xl md:text-2xl font-light text-zinc-400">Il tuo ordine corporate è stato confermato.</h2>
          </div>
          <p className="text-zinc-500 leading-relaxed max-w-md mx-auto">
            Riceverai una mail di riepilogo a breve. Il nostro team creativo ti contatterà per definire ogni dettaglio del tuo evento.
          </p>
          <div className="pt-8">
            <Link href="/" className="bg-[#FFD700] text-black px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-white transition">
              Torna alla Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  let supabaseAdmin;
  try {
    supabaseAdmin = getStrictSupabaseAdmin();
  } catch {
    supabaseAdmin = supabase;
  }

  let booking = null;
  let attempts = 0;
  const maxAttempts = 5;
  const delay = 1500;

  while (!booking && attempts < maxAttempts) {
    // Prima cerchiamo il booking e i tickets
    const { data: bookingData, error: bookingError } = await supabaseAdmin
      .from('bookings')
      .select('*, tickets (*)')
      .eq('stripe_session_id', sessionId)
      .single();

    if (bookingData && bookingData.tickets && bookingData.tickets.length > 0) {
      // Se abbiamo il booking e i biglietti, cerchiamo l'evento separatamente
      const { data: eventData } = await supabaseAdmin
        .from('events')
        .select('*')
        .eq('id', bookingData.event_id)
        .single();
      
      booking = { ...bookingData, events: eventData };
      break;
    }

    await new Promise((resolve) => setTimeout(resolve, delay));
    attempts++;
  }

  if (!booking) {
    console.log("Booking non trovato nel DB, tento il recupero tramite Stripe come fallback...");
    try {
      const Stripe = (await import('stripe')).default;
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: '2023-10-16' as any,
      });
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      if (session.payment_status === 'paid') {
        const eventId = session.metadata?.eventId;
        const customerEmail = session.customer_details?.email || session.metadata?.customerEmail;
        const customerName = session.metadata?.customerName || session.customer_details?.name || 'Ospite 1';
        let guestNames: string[] = [];
        try { guestNames = JSON.parse(session.metadata?.guestNames || '[]'); } catch {}
        const allergies = session.metadata?.allergies || '';
        const quantity = parseInt(session.metadata?.quantity || '1', 10);

        if (eventId && customerEmail) {
          // 1. Crea il booking
          const { data: newBooking, error: bError } = await supabaseAdmin.from('bookings').upsert({
            event_id: eventId,
            customer_email: customerEmail,
            stripe_session_id: session.id,
            total_amount: session.amount_total ? session.amount_total / 100 : 0,
            payment_status: 'paid'
          }, { onConflict: 'stripe_session_id' }).select().single();

          if (!bError && newBooking) {
            // 2. Crea i biglietti
            const allGuestNames: string[] = [customerName];
            for (let i = 0; i < quantity - 1; i++) {
              allGuestNames.push(guestNames[i] || `Ospite ${i + 2}`);
            }

            const ticketsToInsert = allGuestNames.map((name) => ({
              booking_id: newBooking.id,
              event_id: eventId,
              guest_name: name,
              allergies: allergies,
              buyer_name: customerName,
              buyer_email: customerEmail,
              stripe_payment_id: session.id
            }));

            const { data: newTickets } = await supabaseAdmin.from('tickets').insert(ticketsToInsert).select();
            
            // 3. Recupera i dati evento e aggiorna i posti disponibili
            const { data: eventData } = await supabaseAdmin.from('events').select('*').eq('id', eventId).single();

            if (eventData) {
              const newAvailableSlots = Math.max(0, (eventData.available_slots || 0) - quantity);
              await supabaseAdmin.from('events').update({ available_slots: newAvailableSlots }).eq('id', eventId);
            }

            booking = { ...newBooking, events: eventData, tickets: newTickets || [] };
          }
        }
      }
    } catch (e) {
      console.error("Errore nel fallback di Stripe:", e);
    }
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white p-4 font-sans relative z-50">
        <style dangerouslySetInnerHTML={{ __html: `#preloader, .preloader, [class*="loader"], [id*="loader"] { display: none !important; visibility: hidden !important; opacity: 0 !important; pointer-events: none !important; } body { overflow: auto !important; }`}} />
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-500 mb-4">Ops!</h1>
          <p>Stiamo elaborando i tuoi biglietti, ma ci sta volendo più del previsto.</p>
          <div className="mt-4 text-xs text-zinc-600">ID Sessione: {sessionId}</div>
          <Link href="/" className="mt-6 inline-block text-zinc-400 hover:text-white underline transition-colors">Torna alla Home</Link>
        </div>
      </div>
    );
  }

  const event = booking.events;
  const tickets = booking.tickets || [];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `#preloader, .preloader, [class*="loader"], [id*="loader"] { display: none !important; visibility: hidden !important; opacity: 0 !important; pointer-events: none !important; } body { overflow: auto !important; }`}} />
      <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans relative z-50 pt-32">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 mt-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 uppercase text-[#FFD700]">Acquisto Confermato</h1>
            <p className="text-zinc-400 text-lg">Posti riservati per <strong>{event.location_name}</strong>.</p>
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold uppercase">I tuoi Biglietti ({tickets.length})</h2>
            {tickets.map((ticket: Ticket, index: number) => (
              <div key={ticket.id} className="flex flex-col gap-2">
                <div id={`ticket-${ticket.id}`} className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex flex-col items-center gap-3 shrink-0">
                    <div className="w-32 h-32 bg-white rounded-lg p-2 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                      <TicketQRCode ticketId={ticket.id} guestName={ticket.guest_name} />
                    </div>
                    {ticket.guest_name && (
                      <span className="text-[10px] text-[#FFD700] font-bold uppercase tracking-widest text-center max-w-[128px] truncate">
                        {ticket.guest_name}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="text-xs text-zinc-500 mb-2 uppercase">Ingresso #{index + 1}</div>
                    {ticket.guest_name && (
                      <div className="text-[#FFD700] font-black text-xl uppercase tracking-wide mb-1">{ticket.guest_name}</div>
                    )}
                    <h3 className="text-xl font-bold text-white mb-2">{event.location_name}</h3>
                    <div className="inline-block bg-black px-4 py-2 mt-2 rounded-lg text-sm border border-zinc-800">
                      <span className="text-zinc-500 mr-2 uppercase">Note menù:</span>
                      <span className="text-zinc-200">{ticket.allergies || 'Nessuna nota'}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <DownloadTicketButton ticketId={ticket.id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}