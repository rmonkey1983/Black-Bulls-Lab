"use client";

import React, { useState } from "react";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export function CorporateForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    guests: "20-50",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/corporate/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Errore nell'invio");
      
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-12 space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green/10 border border-green/20 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 size={40} className="text-green" />
        </div>
        <div className="space-y-2">
          <h3 className="font-heading text-3xl font-bold text-white uppercase tracking-tighter">Richiesta Inviata</h3>
          <p className="font-sans text-zinc-400 max-w-md mx-auto">
            Il nostro team creativo analizzerà la tua richiesta e ti risponderà entro 24 ore lavorative.
          </p>
        </div>
        <button 
          onClick={() => setStatus("idle")}
          className="text-rama-accent hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
        >
          Invia un'altra richiesta
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company */}
        <div className="space-y-2">
          <label className="font-heading text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold ml-1">Azienda</label>
          <input
            required
            type="text"
            placeholder="Nome della tua azienda"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-rama-accent/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/50 transition"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
        </div>

        {/* Contact Name */}
        <div className="space-y-2">
          <label className="font-heading text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold ml-1">Referente</label>
          <input
            required
            type="text"
            placeholder="Nome e Cognome"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-rama-accent/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/50 transition"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="font-heading text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold ml-1">Email Aziendale</label>
          <input
            required
            type="email"
            placeholder="email@azienda.com"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-rama-accent/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/50 transition"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label className="font-heading text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold ml-1">Telefono</label>
          <input
            required
            type="tel"
            placeholder="+39 ..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-rama-accent/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/50 transition"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label className="font-heading text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold ml-1">Messaggio / Visione</label>
        <textarea
          required
          rows={4}
          placeholder="Raccontaci che tipo di evento hai in mente..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-rama-accent/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/50 transition resize-none"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 text-red-400 text-sm p-4 bg-red-400/10 border border-red-400/20 rounded-xl">
          <AlertCircle size={16} />
          <span>Si è verificato un errore. Riprova o contattaci su WhatsApp.</span>
        </div>
      )}

      <button
        disabled={status === "loading"}
        type="submit"
        className="w-full bg-rama-accent text-black font-heading font-bold uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-white transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
      >
        {status === "loading" ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <>
            Invia Richiesta <Send size={18} className="group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>
    </form>
  );
}
