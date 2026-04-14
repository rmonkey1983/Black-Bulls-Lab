"use client";

import React, { useState, useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap } from "gsap";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { CheckCircle, Calendar, Users, Star, MessageSquare, User, AtSign, Phone } from "lucide-react";

export function BookingForm() {
  const formRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    guests: "20-30",
    format: "Dinner & Show",
    message: "",
  });

  useGSAP(() => {
    gsap.from(formRef.current, {
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: formRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  }, { scope: formRef });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking Data Submitted:", formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div 
        ref={formRef}
        className="max-w-4xl mx-auto p-12 md:p-20 bg-zinc-950 border border-yellow-500/30 rounded-3xl text-center space-y-6 shadow-[0_0_50px_rgba(234,179,8,0.05)]"
      >
        <div className="w-20 h-20 bg-yellow-500/10 border border-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle size={40} className="text-yellow-500" />
        </div>
        <h3 className="font-heading text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter">
          Richiesta <span className="text-yellow-500">Inviata!</span>
        </h3>
        <p className="font-sans text-zinc-400 text-lg md:text-xl max-w-md mx-auto leading-relaxed">
          Il tuo esperimento sta iniziando. Julian ti contatterà nelle prossime 24 ore per definire ogni dettaglio.
        </p>
        <div className="pt-8">
          <PrimaryButton onClick={() => setIsSubmitted(false)} size="lg">
            INVIA UN'ALTRA RICHIESTA
          </PrimaryButton>
        </div>
      </div>
    );
  }

  const inputClasses = "w-full bg-zinc-900/40 border border-zinc-800 rounded-xl px-5 py-4 text-white font-sans focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20 outline-none transition-all duration-300 placeholder:text-zinc-400";
  const labelClasses = "block font-heading text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold mb-2 ml-1";

  return (
    <div ref={formRef} className="max-w-4xl mx-auto">
      <form 
        onSubmit={handleSubmit}
        className="bg-black/40 backdrop-blur-md border border-zinc-800 rounded-3xl p-8 md:p-12 space-y-10 shadow-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Nome e Cognome */}
          <div className="space-y-2">
            <label className={labelClasses} htmlFor="name">
              <User size={12} className="inline mr-2 text-yellow-500/50" /> Nome e Cognome
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Inserisci il tuo nome"
              className={inputClasses}
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className={labelClasses} htmlFor="email">
              <AtSign size={12} className="inline mr-2 text-yellow-500/50" /> Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="esempio@email.com"
              className={inputClasses}
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Telefono */}
          <div className="space-y-2">
            <label className={labelClasses} htmlFor="phone">
              <Phone size={12} className="inline mr-2 text-yellow-500/50" /> Telefono
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              placeholder="+39 333 000 0000"
              className={inputClasses}
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          {/* Data */}
          <div className="space-y-2">
            <label className={labelClasses} htmlFor="date">
              <Calendar size={12} className="inline mr-2 text-yellow-500/50" /> Data dell'evento
            </label>
            <input
              type="date"
              id="date"
              name="date"
              required
              className={inputClasses}
              style={{ colorScheme: 'dark' }}
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          {/* Numero di persone */}
          <div className="space-y-2">
            <label className={labelClasses} htmlFor="guests">
              <Users size={12} className="inline mr-2 text-yellow-500/50" /> Numero di persone
            </label>
            <select
              id="guests"
              name="guests"
              className={inputClasses}
              value={formData.guests}
              onChange={handleChange}
            >
              <option value="10-20">10-20 Ospiti</option>
              <option value="20-30">20-30 Ospiti</option>
              <option value="30-50">30-50 Ospiti</option>
              <option value="50+">Oltre 50 Ospiti</option>
            </select>
          </div>

          {/* Tipo di Format */}
          <div className="space-y-2">
            <label className={labelClasses} htmlFor="format">
              <Star size={12} className="inline mr-2 text-yellow-500/50" /> Tipo di Format
            </label>
            <select
              id="format"
              name="format"
              className={inputClasses}
              value={formData.format}
              onChange={handleChange}
            >
              <option value="Dinner & Show">Dinner & Show</option>
              <option value="Corporate Experience">Corporate Experience</option>
              <option value="Format Personalizzato">Format Personalizzato</option>
            </select>
          </div>
        </div>

        {/* Messaggio */}
        <div className="space-y-2">
          <label className={labelClasses} htmlFor="message">
            <MessageSquare size={12} className="inline mr-2 text-yellow-500/50" /> Messaggio / Note aggiuntive
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Raccontaci la tua idea..."
            className={`${inputClasses} resize-none`}
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        <div className="pt-4">
          <PrimaryButton type="submit" size="lg" className="w-full py-6 text-base tracking-[0.3em]">
            INVIA RICHIESTA AL LABORATORIO
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
}
