"use client";

import { useState } from "react";
import { Minus, Plus, User, Mail, Phone, UtensilsCrossed, Users, Loader2, ShieldCheck } from "lucide-react";

interface EventDetailBookingFormProps {
  eventId: string;
  eventTitle: string;
  eventPrice: number;
  availableSlots: number;
}

export function EventDetailBookingForm({
  eventId,
  eventTitle,
  eventPrice,
  availableSlots,
}: EventDetailBookingFormProps) {
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [guestNames, setGuestNames] = useState<string[]>([]);
  const [allergies, setAllergies] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [dataConsent, setDataConsent] = useState(false);

  const maxSlots = Math.min(availableSlots, 10);
  const totalPrice = quantity * eventPrice;
  const isSoldOut = availableSlots === 0;

  const handleQuantityChange = (delta: number) => {
    const next = Math.max(1, Math.min(maxSlots, quantity + delta));
    setQuantity(next);
    // Sync guest names array length to quantity - 1
    setGuestNames((prev) => {
      const updated = [...prev];
      if (next - 1 > updated.length) {
        while (updated.length < next - 1) updated.push("");
      } else {
        updated.length = next - 1;
      }
      return updated;
    });
  };

  const handleGuestName = (index: number, value: string) => {
    setGuestNames((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!dataConsent) {
      setError("Devi accettare l'informativa sulla privacy per procedere.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          title: eventTitle,
          price: eventPrice,
          quantity,
          customerName,
          customerEmail,
          customerPhone,
          guestNames: guestNames.filter(Boolean),
          allergies,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || "Si è verificato un errore. Riprova.");
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setError("Errore di rete. Controlla la connessione e riprova.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/50 focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700]/20 transition duration-200 text-sm";
  const labelClass =
    "block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-1.5";

  if (isSoldOut) {
    return (
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users size={28} className="text-red-400" />
        </div>
        <h3 className="text-xl font-bold text-white uppercase tracking-widest mb-2">
          Sold Out
        </h3>
        <p className="text-zinc-500 text-sm">
          Tutti i posti per questa serata sono stati prenotati.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Ticket Counter */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
        <p className={labelClass}>Numero di biglietti</p>
        <div className="flex items-center gap-4 mt-1">
          <button
            type="button"
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
            className="w-11 h-11 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-300 hover:border-[#FFD700] hover:text-[#FFD700] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Minus size={16} />
          </button>
          <span className="text-4xl font-bold text-white w-10 text-center tabular-nums">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= maxSlots}
            className="w-11 h-11 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-300 hover:border-[#FFD700] hover:text-[#FFD700] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Plus size={16} />
          </button>
          <span className="text-xs text-zinc-600 ml-2">
            (max {maxSlots} disponibili)
          </span>
        </div>

        {/* Price Summary */}
        <div className="mt-5 pt-5 border-t border-zinc-800 flex items-center justify-between">
          <span className="text-xs text-zinc-500 uppercase tracking-wider">
            Totale
          </span>
          <div className="text-right">
            <span className="text-3xl font-bold text-[#FFD700]">
              €{totalPrice}
            </span>
            {quantity > 1 && (
              <span className="block text-[10px] text-zinc-600 mt-0.5">
                €{eventPrice} × {quantity} persone
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Guest Details */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#FFD700] mb-4 flex items-center gap-2">
          <User size={14} /> Dati Acquirente Principale
        </h3>

        <div>
          <label htmlFor="customerName" className={labelClass}>
            Nome e Cognome *
          </label>
          <input
            id="customerName"
            type="text"
            required
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Mario Rossi"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="customerEmail" className={labelClass}>
            Email *
          </label>
          <div className="relative">
            <Mail
              size={14}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
            />
            <input
              id="customerEmail"
              type="email"
              required
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="mario@example.com"
              className={`${inputClass} pl-10`}
            />
          </div>
        </div>

        <div>
          <label htmlFor="customerPhone" className={labelClass}>
            Cellulare *
          </label>
          <div className="relative">
            <Phone
              size={14}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
            />
            <input
              id="customerPhone"
              type="tel"
              required
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="+39 333 000 0000"
              className={`${inputClass} pl-10`}
            />
          </div>
        </div>
      </div>

      {/* Additional Guests — appear dynamically when quantity > 1 */}
      {quantity > 1 && (
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#FFD700] mb-4 flex items-center gap-2">
            <Users size={14} /> Nomi degli Altri Ospiti
          </h3>
          {Array.from({ length: quantity - 1 }).map((_, i) => (
            <div key={i}>
              <label htmlFor={`guest-${i}`} className={labelClass}>
                Ospite {i + 2}
              </label>
              <input
                id={`guest-${i}`}
                type="text"
                value={guestNames[i] || ""}
                onChange={(e) => handleGuestName(i, e.target.value)}
                placeholder={`Nome e Cognome Ospite ${i + 2}`}
                className={inputClass}
              />
            </div>
          ))}
        </div>
      )}

      {/* Allergies */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
        <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#FFD700] mb-4 flex items-center gap-2">
          <UtensilsCrossed size={14} /> Allergie &amp; Note Chef
        </h3>
        <label htmlFor="allergies" className={labelClass}>
          Intolleranze, allergie o richieste particolari
        </label>
        <textarea
          id="allergies"
          rows={3}
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
          placeholder="Es. Celiachia, intolleranza al lattosio, vegetariano..."
          className={`${inputClass} resize-none`}
        />
        <p className="text-[10px] text-zinc-700 mt-2">
          Opzionale — il nostro chef prenderà nota di ogni esigenza.
        </p>
      </div>

      {/* Data Consent */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 flex items-start gap-3">
        <input 
          type="checkbox" 
          id="dataConsent" 
          checked={dataConsent}
          onChange={(e) => setDataConsent(e.target.checked)}
          className="mt-1 w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-[#FFD700] focus:ring-[#FFD700] focus:ring-offset-black cursor-pointer"
        />
        <label htmlFor="dataConsent" className="text-xs text-zinc-400 leading-relaxed cursor-pointer select-none">
          Acconsento al trattamento dei miei dati personali per la gestione della prenotazione e per ricevere comunicazioni relative all'evento, nel rispetto della <a href="/privacy" target="_blank" className="text-[#FFD700] hover:underline">Privacy Policy</a>. *
        </label>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm font-medium">
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading || !dataConsent}

        className="w-full py-5 bg-[#FFD700] text-black font-bold text-sm uppercase tracking-[0.25em] rounded-xl hover:bg-white transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg shadow-[#FFD700]/10"
      >
        {isLoading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Reindirizzamento...
          </>
        ) : (
          <>
            <ShieldCheck size={18} />
            Procedi al Pagamento — €{totalPrice}
          </>
        )}
      </button>

      <p className="text-center text-[10px] text-zinc-700 uppercase tracking-wider">
        Pagamento sicuro con Stripe · SSL Encrypted
      </p>
    </form>
  );
}
