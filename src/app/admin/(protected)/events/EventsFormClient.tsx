'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { saveEventAction } from './actions';
import { useRouter } from 'next/navigation';

export default function EventsFormClient({ eventToEdit }: { eventToEdit: any }) {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const imageFile = formData.get('image_file') as File;

    try {
      let imageUrl = eventToEdit?.image || '';

      // Upload image if selected
      if (imageFile && imageFile.size > 0) {
        const ext = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;
        const filePath = `events/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('media')
          .upload(filePath, imageFile);

        if (!uploadError) {
          const { data: urlData } = supabase.storage
            .from('media')
            .getPublicUrl(filePath);
          imageUrl = urlData.publicUrl;
        } else {
          console.error("Upload error:", uploadError);
        }
      }

      // Add imageUrl to formData for the server action
      formData.append('imageUrl', imageUrl);

      // Call Server Action
      await saveEventAction(formData);

      setStatus({ 
        type: 'success', 
        message: eventToEdit ? 'Protocollo aggiornato correttamente.' : 'Evento inizializzato con successo.' 
      });
      
      if (!eventToEdit) {
        (e.target as HTMLFormElement).reset();
      }
      
      router.refresh();
      if (eventToEdit) {
        setTimeout(() => router.push('/admin/events'), 1500);
      }
    } catch (err: any) {
      console.error("Submit error:", err);
      setStatus({ 
        type: 'error', 
        message: `Errore: ${err.message || 'Impossibile salvare i dati.'}` 
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-lab-card/30 border border-green/10 p-6 rounded-xl backdrop-blur-md relative overflow-hidden group">
      {/* Corner Deco */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-green/5 blur-3xl rounded-full" />
      
      {status && (
        <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 ${
          status.type === 'success' ? 'bg-green/10 border border-green/20 text-green' : 'bg-red/10 border border-red/20 text-red'
        }`}>
          {status.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span className="text-[10px] font-black uppercase tracking-widest">{status.message}</span>
        </div>
      )}

      <h2 className="data-readout text-xs font-bold text-white mb-8 uppercase tracking-[0.2em] flex items-center gap-2">
        <span className="w-4 h-px bg-green/40" />
        {eventToEdit ? 'Modifica Protocollo' : 'Crea Nuovo Protocollo'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {eventToEdit && (
          <>
            <input type="hidden" name="id" value={eventToEdit.id} />
            <input type="hidden" name="current_image" value={eventToEdit.image || ''} />
          </>
        )}
        
        <div className="space-y-4">
          <div>
          <label htmlFor="image_file" className="data-readout text-[10px] text-green/40 uppercase tracking-[0.2em] block mb-2">Media Immersivo</label>
            {eventToEdit?.image && (
              <div className="mb-4 relative rounded-lg overflow-hidden border border-green/20 h-32">
                <Image 
                  src={eventToEdit.image} 
                  alt="Preview evento" 
                  fill
                  className="object-cover grayscale opacity-60"
                />
              </div>
            )}
            <input 
              id="image_file"
              type="file" 
              name="image_file" 
              accept="image/*"
              className="w-full bg-lab-dark/50 border border-green/10 rounded-lg px-4 py-3 text-[10px] text-zinc-500 file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-[9px] file:font-black file:uppercase file:bg-green file:text-black hover:file:bg-white transition-colors cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="location_name" className="data-readout text-[10px] text-green/40 uppercase tracking-[0.2em] block mb-2">Identificativo / Location</label>
              <input 
                id="location_name"
                type="text" 
                name="location_name" 
                required 
                defaultValue={eventToEdit?.location_name || ''}
                placeholder="Es. Lab #01 - Torino…" 
                className="w-full bg-lab-dark/50 border border-green/10 rounded-lg px-4 py-3 text-sm text-white focus:border-green focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/50 transition-colors placeholder:text-zinc-700 font-sans"
              />
            </div>
            
            <div>
              <label htmlFor="location_address" className="data-readout text-[10px] text-green/40 uppercase tracking-[0.2em] block mb-2">Coordinate Geografiche</label>
              <input 
                id="location_address"
                type="text" 
                name="location_address" 
                required 
                defaultValue={eventToEdit?.location_address || ''}
                placeholder="Es. Corso Regina Margherita, 1…" 
                className="w-full bg-lab-dark/50 border border-green/10 rounded-lg px-4 py-3 text-sm text-white focus:border-green focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/50 transition-colors placeholder:text-zinc-700 font-sans"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="data-readout text-[10px] text-green/40 uppercase tracking-[0.2em] block mb-2">Dettagli Esperimento</label>
            <textarea 
              id="description"
              name="description" 
              rows={3}
              defaultValue={eventToEdit?.description || ''}
              placeholder="Briefing dell'evento…" 
              className="w-full bg-lab-dark/50 border border-green/10 rounded-lg px-4 py-3 text-sm text-white focus:border-green focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/50 transition-colors resize-none placeholder:text-zinc-700 font-sans"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="event_date" className="data-readout text-[10px] text-green/40 uppercase tracking-[0.2em] block mb-2">Time Stamp</label>
              <input 
                id="event_date"
                type="datetime-local" 
                name="event_date" 
                required 
                defaultValue={eventToEdit?.event_date || ''}
                className="w-full bg-lab-dark/50 border border-green/10 rounded-lg px-4 py-3 text-xs focus:border-green focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/50 transition-colors text-white"
                style={{ colorScheme: 'dark' }}
              />
            </div>

            <div>
              <label htmlFor="slots" className="data-readout text-[10px] text-green/40 uppercase tracking-[0.2em] block mb-2">Unit Capacity</label>
              <input 
                id="slots"
                type="number" 
                name="slots" 
                required 
                min="1"
                defaultValue={eventToEdit?.total_slots || ''}
                placeholder="30…" 
                className="w-full bg-lab-dark/50 border border-green/10 rounded-lg px-4 py-3 text-sm text-white focus:border-green focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/50 transition-colors"
              />
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={submitting}
          className="w-full bg-green text-black text-xs font-black uppercase tracking-[0.3em] py-5 rounded-lg mt-8 hover:bg-white transition-[background-color] transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              ELABORAZIONE...
            </>
          ) : (
            eventToEdit ? 'Aggiorna Protocollo' : 'Inizializza Evento'
          )}
        </button>
        
        {eventToEdit && (
          <button 
            type="button"
            onClick={() => router.push('/admin/events')}
            className="w-full block text-center data-readout text-[9px] text-zinc-600 hover:text-white mt-4 uppercase tracking-widest transition-colors"
          >
            Annulla Procedura
          </button>
        )}
      </form>
    </div>
  );
}
