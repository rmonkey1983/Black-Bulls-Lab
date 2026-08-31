"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Importiamo lo scanner in modo dinamico per evitare errori sul server (SSR)
const Scanner = dynamic(() => import('@yudiel/react-qr-scanner').then(mod => mod.Scanner), { 
  ssr: false,
  loading: () => <div className="p-8 text-center text-zinc-500 animate-pulse">Caricamento fotocamera...</div>
});

export default function AdminScanner() {
  const [scannedId, setScannedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'warning' } | null>(null);

  const handleScan = async (rawValue: string) => {
    // Evita doppie scansioni se stiamo già caricando o abbiamo appena scansionato
    if (loading || scannedId === rawValue) return;
    
    // Il valore del QR è nel formato "TICKET:<uuid>|<GuestName>"
    // Dobbiamo estrarre solo l'UUID per l'API
    let ticketId = rawValue;
    if (rawValue.startsWith('TICKET:')) {
        // Rimuove "TICKET:" e taglia dopo il "|"
        ticketId = rawValue.replace('TICKET:', '').split('|')[0];
    }

    setScannedId(rawValue); // Teniamo il raw per il reset check
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/scan', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ticketId: ticketId }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Se il biglietto è già stato scansionato, mostriamo un avviso giallo
        if (res.status === 400 && data.scannedAt) {
          setMessage({ 
            text: `ATTENZIONE: Biglietto già scansionato il ${new Date(data.scannedAt).toLocaleTimeString('it-IT')}`, 
            type: 'warning' 
          });
        } else {
          setMessage({ text: data.error || 'Errore durante la scansione', type: 'error' });
        }
      } else {
        setMessage({ text: data.message || 'Check-in completato!', type: 'success' });
      }
    } catch (error) {
      console.error('Scan error:', error);
      setMessage({ text: 'Errore di connessione al server', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const resetScanner = () => {
    setScannedId(null);
    setMessage(null);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 font-sans">
      <div className="max-w-md mx-auto">
        
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-green animate-pulse" />
            <span className="data-readout text-[10px] text-green/60 tracking-[0.3em] uppercase">SCN // Ingresso Lab</span>
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-white">
            Scanner <span className="text-green text-glow-green">Ingresso</span>
          </h1>
        </div>

        {/* Area Scanner */}
        <div className="bg-lab-card/30 rounded-2xl overflow-hidden border border-green/10 shadow-2xl relative min-h-[300px] flex flex-col items-center justify-center backdrop-blur-md">
          {!scannedId ? (
            <div className="w-full">
                <Scanner 
                  onScan={(result) => {
                    if (result?.[0]?.rawValue) {
                        handleScan(result[0].rawValue);
                    }
                  }}
                  formats={['qr_code']}
                  components={{
                    finder: true,
                  }}
                  styles={{
                    container: { width: '100%' }
                  }}
                />
            </div>
          ) : (
            <div className="h-64 w-full flex items-center justify-center bg-lab-dark/50 p-6 text-center">
              {loading ? (
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-green/20 border-t-green rounded-full animate-spin" />
                    <div className="text-green data-readout text-[10px] font-black uppercase tracking-widest animate-pulse">VERIFICA_IN_CORSO...</div>
                </div>
              ) : (
                <div className="space-y-4">
                  {message?.type === 'success' && (
                    <div className="text-green font-black data-readout text-xl animate-in zoom-in duration-300">
                        <div className="text-4xl mb-4">✓</div>
                        {message.text.toUpperCase()}
                    </div>
                  )}
                  {message?.type === 'warning' && (
                    <div className="text-yellow-500 font-black data-readout text-xl animate-in zoom-in duration-300">
                        <div className="text-4xl mb-4">⚠</div>
                        {message.text.toUpperCase()}
                    </div>
                  )}
                  {message?.type === 'error' && (
                    <div className="text-red font-black data-readout text-xl animate-in zoom-in duration-300">
                        <div className="text-4xl mb-4">✕</div>
                        {message.text.toUpperCase()}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Pulsante Reset */}
        {scannedId && !loading && (
          <button 
            onClick={resetScanner}
            className="w-full mt-6 bg-green text-black font-black uppercase tracking-[0.3em] py-5 rounded-xl hover:bg-white transition transform active:scale-95 shadow-[0_0_30px_rgba(0,255,136,0.2)]"
          >
            PROSSIMO BIGLIETTO
          </button>
        )}

        <div className="mt-12 text-center">
            <p className="data-readout text-[8px] text-zinc-700 uppercase tracking-[0.4em]">
                System Status: <span className="text-green animate-pulse">Online</span> {"//"} Scanner Ready
            </p>
        </div>

      </div>
    </div>
  );
}
