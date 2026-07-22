import { getStrictSupabaseAdmin, supabase } from '@/lib/supabase';
import { Pencil, FlaskConical } from 'lucide-react';
import DeleteEventButton from '@/components/admin/DeleteEventButton';
import Link from 'next/link';
import EventsFormClient from './EventsFormClient';
import { deleteEventAction } from './actions';

export default async function AdminEventsPage(props: {
    searchParams: Promise<{ edit?: string }>;
}) {
  const searchParams = await props.searchParams;
  const editId = searchParams.edit;

  let dbClient;
  try {
    dbClient = getStrictSupabaseAdmin();
  } catch {
    dbClient = supabase;
  }

  // Peschiamo gli eventi esistenti dal server con permessi admin
  const { data: events } = await dbClient
    .from('events')
    .select('*')
    .order('created_at', { ascending: false });

  const eventToEdit = editId ? events?.find(e => e.id === editId) : null;

  return (
    <div className="p-4 md:p-8 space-y-10">
      <header className="relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-green animate-pulse" />
                <span className="data-readout text-[10px] text-green/60 tracking-[0.3em] uppercase">EVT // Gestore Esperimenti</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
              Gestione <span className="text-green text-glow-green">Eventi</span>
            </h1>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* COLONNA SINISTRA: FORM DI CREAZIONE (CLIENT) */}
        <div className="xl:col-span-4">
          <EventsFormClient eventToEdit={eventToEdit} />
        </div>

        {/* COLONNA DESTRA: LISTA EVENTI (SERVER RENDERED) */}
        <div className="xl:col-span-8">
          <div className="bg-lab-card/20 border border-green/5 rounded-xl overflow-hidden backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-green/5 border-b border-green/10">
                  <tr>
                    <th className="px-6 py-5 data-readout text-[10px] text-green/50 uppercase tracking-widest">Identificativo / Data</th>
                    <th className="px-6 py-5 data-readout text-[10px] text-green/50 uppercase tracking-widest text-center">Status Capacity</th>
                    <th className="px-6 py-5 data-readout text-[10px] text-green/50 uppercase tracking-widest text-right">Comandi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-green/5 text-white">
                  {events?.map(event => {
                    const isSoldOut = event.available_slots === 0;
                    return (
                      <tr key={event.id} className="hover:bg-green/2 group/row transition duration-300">
                        <td className="px-6 py-5">
                          <div className="font-bold text-base group-hover/row:text-green transition-colors">{event.location_name || event.title}</div>
                          <div className="data-readout text-[10px] text-zinc-500 mt-1 tracking-widest uppercase">
                            {new Date(event.event_date || event.date).toLocaleString('it-IT', {
                              weekday: 'short', day: '2-digit', month: 'short', hour: '2-digit', minute:'2-digit'
                            }).toUpperCase()}
                          </div>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <div className="flex flex-col items-center gap-1.5">
                            <span className={`data-readout text-[10px] font-black tracking-[0.2em] px-3 py-1 rounded border ${
                                isSoldOut 
                                ? 'bg-red/10 text-red border-red/20' 
                                : 'bg-green/10 text-green border-green/20'
                            }`}>
                                {event.available_slots ?? 0} / {event.total_slots ?? 0}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link 
                              href={`/admin/events?edit=${event.id}`}
                              className="w-10 h-10 border border-green/10 bg-green/5 flex items-center justify-center text-green/60 hover:text-green hover:border-green/40 hover:bg-green/10 transition rounded-lg"
                              title="Modifica"
                            >
                              <Pencil size={14} />
                            </Link>
                            <DeleteEventButton eventId={event.id} deleteAction={deleteEventAction} />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {(!events || events.length === 0) && (
                    <tr>
                      <td colSpan={3} className="px-6 py-32 text-center">
                        <div className="flex flex-col items-center gap-4 opacity-30">
                            <FlaskConical size={48} className="text-green/40" />
                            <p className="data-readout text-xs tracking-[0.3em] uppercase">Nessun protocollo attivo nel database.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}