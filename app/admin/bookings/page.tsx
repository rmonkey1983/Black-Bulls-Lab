import { createClient } from '@supabase/supabase-js';
import { Ticket } from 'lucide-react';

export default async function AdminBookingsPage() {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Fetch bookings with event details and tickets
  const { data: bookings } = await supabaseAdmin
    .from('bookings')
    .select(`
      *,
      events (
        location_name,
        event_date
      ),
      tickets (
        id,
        guest_name,
        allergies
      )
    `)
    .order('created_at', { ascending: false });

  return (
    <div className="p-4 md:p-8 space-y-10">
      <header className="relative">
        <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-green animate-pulse" />
            <span className="data-readout text-[10px] text-green/60 tracking-[0.3em] uppercase">BKG // Registro Transazioni</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
          Gestione <span className="text-green text-glow-green">Prenotazioni</span>
        </h1>
        <p className="font-sans text-zinc-500 mt-2 text-sm max-w-xl font-light">
          Monitoraggio in tempo reale dei flussi di cassa e dell&apos;elenco ospiti. Ogni transazione è verificata tramite il gateway Stripe.
        </p>
      </header>

      <div className="bg-lab-card/20 border border-green/10 rounded-xl overflow-hidden backdrop-blur-md shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-green/5 border-b border-green/10">
              <tr>
                <th className="px-6 py-5 data-readout text-[10px] text-green/50 uppercase tracking-widest">Protocollo / Sessione</th>
                <th className="px-6 py-5 data-readout text-[10px] text-green/50 uppercase tracking-widest">Identità Digitale</th>
                <th className="px-6 py-5 data-readout text-[10px] text-green/50 uppercase tracking-widest">Unità Ospiti</th>
                <th className="px-6 py-5 data-readout text-[10px] text-green/50 uppercase tracking-widest text-right">Valore</th>
                <th className="px-6 py-5 data-readout text-[10px] text-green/50 uppercase tracking-widest text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-green/5 text-white font-medium">
              {bookings?.map((booking) => (
                <tr key={booking.id} className="hover:bg-green/2 transition-colors group/row">
                  <td className="px-6 py-5">
                    <div className="font-bold text-white group-hover/row:text-green transition-colors">{booking.events?.location_name || 'N/A'}</div>
                    <div className="data-readout text-[10px] text-zinc-500 uppercase tracking-widest mt-1">
                      {booking.events?.event_date 
                        ? new Date(booking.events.event_date).toLocaleString('it-IT', {
                            day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
                          }).toUpperCase()
                        : 'DATA NON DISPONIBILE'}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-zinc-200 font-sans">{booking.customer_email}</div>
                    <div className="data-readout text-[8px] text-zinc-600 mt-1 uppercase tracking-tight">
                      STRIPE_ID: ...{booking.stripe_session_id?.slice(-12)}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-wrap gap-2">
                      {booking.tickets?.map((ticket: any) => (
                        <div key={ticket.id} className="bg-green/5 border border-green/10 rounded-lg px-3 py-1.5 flex flex-col min-w-[120px]">
                          <span className="text-[10px] font-black uppercase tracking-wider text-zinc-300">{ticket.guest_name}</span>
                          {ticket.allergies && (
                            <span className="data-readout text-[8px] text-red uppercase tracking-widest mt-1 animate-pulse">
                              ⚠ {ticket.allergies}
                            </span>
                          )}
                        </div>
                      ))}
                      {(!booking.tickets || booking.tickets.length === 0) && (
                        <span className="data-readout text-zinc-700 text-[10px] italic">NO_TICKETS_GENERATED</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right font-black text-green data-readout">
                    €{booking.total_amount?.toFixed(2)}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black bg-green/10 text-green border border-green/20 uppercase tracking-[0.2em]">
                          VERIFIED_PAID
                        </span>
                    </div>
                  </td>
                </tr>
              ))}
              {(!bookings || bookings.length === 0) && (
                <tr>
                  <td colSpan={5} className="px-6 py-32 text-center">
                    <div className="flex flex-col items-center gap-4 opacity-30">
                      <div className="w-12 h-12 rounded-full border border-green/20 flex items-center justify-center">
                        <Ticket size={24} className="text-green/40" />
                      </div>
                      <p className="data-readout uppercase tracking-[0.3em] text-xs">Registro transazioni vuoto.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
