import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';

// Questa riga dice a Next.js di non salvare la pagina in cache,
// garantendo che i posti disponibili siano sempre aggiornati al secondo.
export const revalidate = 0; 

export default async function CalendarioPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Preleviamo gli eventi da oggi in poi, ordinati per data
  const now = new Date().toISOString();
  const { data: events, error } = await supabase
    .from('events')
    .select('*')
    .gte('event_date', now)
    .order('event_date', { ascending: true });

  if (error) {
    console.error("Errore recupero eventi calendario:", error);
    return <div className="text-center text-red-500 py-20 font-bold">Errore di connessione al database.</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans pt-32 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        <header className="mb-16 text-center md:text-left border-b border-zinc-900 pb-8">
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-widest text-white mb-4">
            Prossime <span className="text-[#FFD700]">Date</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl">
            Scopri il calendario dei nostri format immersivi. I posti sono rigorosamente limitati per garantire l&apos;esclusività dell&apos;esperienza.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events?.map((event) => {
            const isSoldOut = event.available_slots === 0;
            const eventDate = new Date(event.event_date);
            
            return (
              <div key={event.id} className="bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden hover:border-zinc-700 transition-colors flex flex-col group relative">
                
                {/* Linea superiore che cambia colore se è Sold Out */}
                <div className={`h-1 w-full transition-colors ${isSoldOut ? 'bg-red-600' : 'bg-[#FFD700]'}`} />

                <div className="p-8 flex flex-col grow">
                  {/* Intestazione Card: Calendario e Badge Posti */}
                  <div className="flex justify-between items-start mb-8">
                    <div className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-4 py-2 rounded-xl text-center min-w-[70px] shadow-inner">
                      <div className="text-[10px] uppercase text-[#FFD700] font-bold tracking-widest">{eventDate.toLocaleString('it-IT', { month: 'short' })}</div>
                      <div className="text-3xl font-bold text-white mt-1">{eventDate.getDate()}</div>
                    </div>
                    
                    <div className={`text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full border ${
                      isSoldOut 
                        ? 'bg-red-500/10 text-red-500 border-red-500/20' 
                        : 'bg-green-500/10 text-green-500 border-green-500/20'
                    }`}>
                      {isSoldOut ? 'Sold Out' : `${event.available_slots} Posti Liberi`}
                    </div>
                  </div>

                  {/* Info Evento */}
                  <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-[#FFD700] transition-colors uppercase tracking-wide">
                    {event.location_name}
                  </h3>
                  
                  <div className="space-y-4 text-sm text-zinc-400 mb-10 grow">
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="text-[#FFD700]/50 shrink-0 mt-0.5" />
                      <span>{event.location_address}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar size={18} className="text-[#FFD700]/50 shrink-0 mt-0.5" />
                      <span className="capitalize">{eventDate.toLocaleString('it-IT', { weekday: 'long', hour: '2-digit', minute:'2-digit' })}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users size={18} className="text-[#FFD700]/50 shrink-0 mt-0.5" />
                      <span>Capienza limitata a {event.total_slots} ospiti</span>
                    </div>
                  </div>

                  {/* Zona Acquisto */}
                  <div className="mt-auto pt-6 border-t border-zinc-900">
                    {isSoldOut ? (
                      <div className="w-full py-4 bg-zinc-900 text-zinc-500 text-center text-sm font-bold uppercase tracking-widest rounded-full border border-zinc-800">
                        Lista d&apos;attesa chiusa
                      </div>
                    ) : (
                      <Link
                        href={`/calendario/${event.id}`}
                        className="flex items-center justify-center gap-2 w-full py-4 bg-[#FFD700] text-black font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-white transition duration-200 group"
                      >
                        Prenota il Posto
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Messaggio se non ci sono date in programma */}
        {(!events || events.length === 0) && (
          <div className="text-center py-32 border border-dashed border-zinc-800 rounded-2xl bg-zinc-950/50">
            <p className="text-zinc-500 text-lg uppercase tracking-widest font-bold">Il calendario è in aggiornamento.</p>
            <p className="text-zinc-600 mt-4">Iscriviti alla newsletter per avere la priorità sulle prossime date segrete.</p>
          </div>
        )}
        
      </div>
    </div>
  );
}