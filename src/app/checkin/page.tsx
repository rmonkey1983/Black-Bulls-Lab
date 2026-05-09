"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Importiamo lo scanner in modo dinamico
const Scanner = dynamic(() => import('@yudiel/react-qr-scanner').then(mod => mod.Scanner), { 
  ssr: false,
  loading: () => <div className="p-8 text-center text-zinc-500 animate-pulse">Caricamento fotocamera...</div>
});

export default function StaffCheckin() {
  // Stato per il PIN di sicurezza
  const [pin, setPin] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Stato per lo scanner
  const [scannedId, setScannedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'warning' } | null>(null);

  // --- LOGICA LOGIN STAFF ---
  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '2026') { // PIN per lo staff
      setIsUnlocked(true);
    } else {
      alert('PIN errato. Riprova.');
      setPin('');
    }
  };

  // --- LOGICA SCANNER ---
  const handleScan = async (rawValue: string) => {
    if (loading || scannedId === rawValue) return;

    // Parsing del formato QR "TICKET:<uuid>|<GuestName>"
    let ticketId = rawValue;
    if (rawValue.startsWith('TICKET:')) {
        ticketId = rawValue.replace('TICKET:', '').split('|')[0];
    }

    setScannedId(rawValue);
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketId: ticketId }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 400 && data.scannedAt) {
          setMessage({ 
            text: `GIÀ ENTRATO alle ${new Date(data.scannedAt).toLocaleTimeString('it-IT')}`, 
            type: 'warning' 
          });
        } else {
          setMessage({ text: data.error || 'Errore biglietto', type: 'error' });
        }
      } else {
        setMessage({ text: 'CHECK-IN VALIDO', type: 'success' });
      }
    } catch (error) {
      setMessage({ text: 'Errore di connessione', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const resetScanner = () => {
    setScannedId(null);
    setMessage(null);
  };

  // --- SCHERMATA 1: INSERIMENTO PIN ---
  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 font-sans">
        <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 shadow-2xl max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-[#FFD700]/10 border border-[#FFD700]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">🔐</span>
          </div>
          <h1 className="text-2xl font-bold text-[#FFD700] mb-2 uppercase tracking-tighter">Staff Access</h1>
          <p className="text-zinc-400 mb-8 text-sm uppercase tracking-widest">Inserisci il PIN di sicurezza</p>
          <form onSubmit={handleUnlock} className="space-y-6">
            <input 
              type="password" 
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full bg-black border border-zinc-800 text-white text-center text-3xl py-4 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/50 focus:border-[#FFD700] transition-colors tracking-[0.5em]"
              placeholder="••••"
              maxLength={4}
              autoFocus
            />
            <button type="submit" className="w-full bg-[#FFD700] text-black font-black py-4 rounded-xl hover:bg-white transition uppercase tracking-widest text-sm">
              SBLOCCA SCANNER
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- SCHERMATA 2: LO SCANNER VERO E PROPRIO ---
  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 font-sans">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8 pt-4">
          <div className="inline-block px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full mb-3">
             <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest">● Scanner Attivo</span>
          </div>
          <h1 className="text-3xl font-black text-[#FFD700] uppercase tracking-tighter">Check-in</h1>
          <p className="text-zinc-500 text-xs uppercase tracking-[0.2em] mt-1">Inquadra il QR Code del cliente</p>
        </div>

        <div className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl relative min-h-[300px] flex items-center justify-center">
          {!scannedId ? (
            <div className="w-full">
                <Scanner 
                  onScan={(result) => {
                    if (result?.[0]?.rawValue) {
                        handleScan(result[0].rawValue);
                    }
                  }}
                  formats={['qr_code']}
                  components={{ finder: true }}
                  styles={{ container: { width: '100%' } }}
                />
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center bg-zinc-950 p-6 text-center w-full">
              {loading ? (
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-[#FFD700]/20 border-t-[#FFD700] rounded-full animate-spin" />
                    <div className="text-[#FFD700] font-bold uppercase tracking-widest text-[10px] animate-pulse">Verifica in corso...</div>
                </div>
              ) : (
                <div className="space-y-4 animate-in zoom-in duration-300">
                  {message?.type === 'success' && (
                    <div className="flex flex-col items-center gap-2">
                        <div className="text-5xl mb-2">✅</div>
                        <div className="text-green-500 font-black text-2xl uppercase tracking-tighter">{message.text}</div>
                        <div className="text-zinc-500 text-[10px] uppercase">Biglietto verificato con successo</div>
                    </div>
                  )}
                  {message?.type === 'warning' && (
                    <div className="flex flex-col items-center gap-2 text-yellow-500">
                        <div className="text-5xl mb-2">⚠️</div>
                        <div className="font-bold text-lg uppercase tracking-tight">{message.text}</div>
                    </div>
                  )}
                  {message?.type === 'error' && (
                    <div className="flex flex-col items-center gap-2 text-red-500">
                        <div className="text-5xl mb-2">❌</div>
                        <div className="font-bold text-xl uppercase tracking-tight">{message.text}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {scannedId && !loading && (
          <button 
            onClick={resetScanner} 
            className="w-full mt-8 bg-[#FFD700] text-black font-black py-5 rounded-2xl hover:bg-white transition transform active:scale-95 uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(255,215,0,0.15)]"
          >
            PROSSIMO CLIENTE
          </button>
        )}

        <div className="mt-12 text-center">
            <button 
                onClick={() => setIsUnlocked(false)}
                className="text-zinc-600 text-[10px] uppercase tracking-widest hover:text-red-500 transition-colors"
            >
                Esci dalla sessione staff
            </button>
        </div>
      </div>
    </div>
  );
}
