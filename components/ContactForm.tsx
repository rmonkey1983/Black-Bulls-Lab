"use client";

import React, { useState } from "react";
import { Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    b_contact_name: "", // honeypot
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    // Honeypot check (Spam prevention)
    if (formData.b_contact_name) {
      setStatus("success"); // fake success for bots
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "", b_contact_name: "" });
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Errore durante l'invio del messaggio. Riprova.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
      setErrorMessage("Errore di rete. Controlla la connessione e riprova.");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-2xl text-center max-w-xl mx-auto animate-in fade-in duration-700">
        <div className="w-20 h-20 bg-accent-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="text-accent-gold w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider font-syne">Messaggio Ricevuto</h3>
        <p className="text-zinc-400 mb-8 text-sm leading-relaxed font-inter">
          Grazie per averci contattato! Il team di Black Bulls Lab ha preso in carico la tua richiesta e ti risponderà al più presto.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="font-syne text-[10px] uppercase tracking-widest text-accent-gold hover:text-white transition-colors py-3 px-8 border border-accent-gold/20 hover:border-white/25 bg-white/2"
        >
          INVIA NUOVO MESSAGGIO
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#0A0A0A] border border-white/5 p-8 md:p-12 rounded-2xl relative overflow-hidden max-w-xl mx-auto">
      {/* Background Gold Ambient Glow */}
      <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-accent-gold/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        {/* Honeypot field (hidden from users, used to catch bots) */}
        <div className="hidden" aria-hidden="true">
          <input
            type="text"
            name="b_contact_name"
            tabIndex={-1}
            autoComplete="off"
            value={formData.b_contact_name}
            onChange={(e) => setFormData({ ...formData, b_contact_name: e.target.value })}
          />
        </div>

        <div className="space-y-2 group">
          <label htmlFor="name" className="block font-syne text-[10px] uppercase tracking-[0.3em] text-accent-gold/50 group-focus-within:text-accent-gold transition-colors duration-300 font-bold">
            Nome Completo
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            autoComplete="name"
            disabled={status === "loading"}
            placeholder="IL TUO NOME"
            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3.5 font-inter text-base text-white placeholder:text-zinc-700 focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/50 transition duration-300 min-h-[48px]"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="space-y-2 group">
          <label htmlFor="email" className="block font-syne text-[10px] uppercase tracking-[0.3em] text-accent-gold/50 group-focus-within:text-accent-gold transition-colors duration-300 font-bold">
            Indirizzo Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            autoComplete="email"
            disabled={status === "loading"}
            placeholder="EMAIL@DOMINIO.COM"
            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3.5 font-inter text-base text-white placeholder:text-zinc-700 focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/50 transition duration-300 min-h-[48px]"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="space-y-2 group">
          <label htmlFor="message" className="block font-syne text-[10px] uppercase tracking-[0.3em] text-accent-gold/50 group-focus-within:text-accent-gold transition-colors duration-300 font-bold">
            Il Tuo Messaggio
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            disabled={status === "loading"}
            placeholder="SCRIVI IL TUO MESSAGGIO QUI..."
            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3.5 font-inter text-base text-white placeholder:text-zinc-700 focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/50 transition duration-300 resize-none leading-relaxed"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
        </div>

        {/* Error notification banner */}
        {status === "error" && (
          <div className="flex items-center gap-3 text-red-400 text-xs p-4 bg-red-400/5 border border-red-400/20 rounded-lg animate-in slide-in-from-top-4 duration-300">
            <AlertCircle size={16} className="shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-accent-gold text-black-pure font-syne font-bold uppercase tracking-[0.4em] px-6 py-4.5 hover:bg-white hover:text-black-pure transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 cursor-pointer text-xs min-h-[48px] rounded-lg"
        >
          {status === "loading" ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              INVIA IL MESSAGGIO
              <Send size={12} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
