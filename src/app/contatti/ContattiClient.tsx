"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Mail, Instagram, MessageSquare, Loader2, ShieldCheck, AlertCircle } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@/hooks/useGSAP";
import { useCinematic } from "@/hooks/useCinematic";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { buildWAUrl, WA_MESSAGES } from "@/lib/whatsapp";
import { submitContactForm } from "@/app/actions/contact";
import { trackLead } from "@/lib/analytics";

const EXPERIENCE_OPTIONS = [
  "A Cena Con Il Bugiardo",
  "Cena Con Delitto",
  "Il PalQo",
  "The Golden Voice",
  "Evento Aziendale / Privato"
];

export function ContattiClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const { revealOnScroll } = useCinematic();

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    experience: "A Cena Con Il Bugiardo",
    message: "",
    b_contact_name: "", // honeypot
  });

  useGSAP(() => {
    // Smooth whole-page spotlight mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current) return;
      gsap.to(spotlightRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 1.2,
        ease: "power2.out"
      });
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Hero Entry Animation
    const tl = gsap.timeline();
    tl.from(".reveal-title span", {
      y: 80,
      opacity: 0,
      filter: "blur(15px)",
      stagger: 0.15,
      duration: 1.8,
      ease: "expo.out"
    })
    .from(".reveal-sub", {
      opacity: 0,
      y: 20,
      duration: 1.2,
      ease: "power2.out"
    }, "-=1.2")
    .from(".reveal-cards", {
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 1.2,
      ease: "power2.out"
    }, "-=0.8");

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, { scope: containerRef, dependencies: [] });

  revealOnScroll(".reveal-scroll");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await submitContactForm({ ...formData, leadType: "contact" });
      if (res.success) {
        setStatus("success");
        trackLead("contact");
      } else {
        setStatus("error");
        setErrorMessage(res.error || "Errore sconosciuto.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage("Errore di connessione. Riprova più tardi.");
    }
  };

  return (
    <div ref={containerRef} className="bg-black-pure text-text-primary min-h-screen selection:bg-accent-gold selection:text-black-pure overflow-x-hidden relative">
      
      {/* Immersive Whole-Page Spotlight (Floating gold light tracking mouse) */}
      <div 
        ref={spotlightRef}
        className="fixed top-0 left-0 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 opacity-30 mix-blend-screen hidden lg:block"
        style={{
          background: 'radial-gradient(circle, rgba(200, 169, 107, 0.08) 0%, transparent 70%)',
          filter: 'blur(80px)'
        }}
      />

      {/* 1. CINEMATIC HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden border-b border-white/5">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/brand/bg-hero-wide.webp"
            alt="Cinematic Experience Space"
            fill
            sizes="100vw"
            className="object-cover opacity-20 contrast-125 scale-102"
            priority
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-linear-to-b from-black-pure/90 via-transparent to-black-pure z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.95)_100%)] z-10" />
          <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.webp')] mix-blend-overlay z-20" />
        </div>

        {/* Back Link */}
        <div className="absolute top-12 left-12 z-50">
          <Link
            href="/"
            className="group flex items-center gap-4 text-text-secondary/30 hover:text-accent-gold transition-colors uppercase text-[10px] font-bold tracking-[0.5em]"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-2 transition-transform" /> 
            Torna alla Home
          </Link>
        </div>

        <div className="relative z-30 container-max px-6 text-center space-y-14">
          <div className="space-y-6 max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1 border border-accent-gold/20 text-accent-gold text-[10px] font-bold uppercase tracking-[0.6em] bg-accent-gold/5 backdrop-blur-md">
              Black Bulls Lab · Torino
            </span>
            <h1 className="reveal-title font-syne font-bold text-[clamp(2.5rem,7vw,8rem)] leading-[0.9] tracking-tighter uppercase text-text-primary flex flex-col items-center">
              <span>La prossima</span>
              <span className="text-accent-gold italic">esperienza</span>
              <span>inizia da qui.</span>
            </h1>
            <p className="reveal-sub font-inter text-text-secondary text-xs md:text-lg leading-relaxed tracking-[0.2em] uppercase opacity-75 max-w-3xl mx-auto">
              Format ed esperienze dal vivo per pubblico, aziende, privati e location. Scrivici per capire quale percorso è adatto al tuo progetto.
            </p>
          </div>

          {/* 2. ELEGANT CONTACT METHOD CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto pt-10">
            {[
              {
                title: "WhatsApp",
                desc: "Scrivici direttamente",
                actionText: "SCRIVICI SU WHATSAPP",
                href: buildWAUrl(WA_MESSAGES.default),
                icon: <MessageSquare size={24} />,
                external: true
              },
              {
                title: "Email",
                desc: "info@blackbullslab.com",
                actionText: "PARLA CON IL TEAM",
                href: "mailto:info@blackbullslab.com",
                icon: <Mail size={24} />,
                external: false
              },
              {
                title: "Instagram",
                desc: "@blackbullslab",
                actionText: "SCRIVICI SU INSTAGRAM",
                href: "https://instagram.com/blackbullslab",
                icon: <Instagram size={24} />,
                external: true
              }
            ].map((method) => (
              <PremiumCard 
                key={method.title} 
                href={method.href}
                className="reveal-cards p-8 bg-white/2 border border-white/5 hover:border-accent-gold/20 hover:shadow-[0_0_50px_rgba(200,169,107,0.04)] transition-all duration-700 text-center flex flex-col justify-between items-center h-full group"
              >
                <div className="space-y-4 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center text-text-secondary group-hover:text-accent-gold group-hover:border-accent-gold/20 transition-all duration-500">
                    {method.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-syne font-bold uppercase text-xl tracking-tight text-text-primary">
                      {method.title}
                    </h3>
                    <p className="font-inter text-[11px] text-text-secondary/50 tracking-wider">
                      {method.desc}
                    </p>
                  </div>
                </div>
                <div className="pt-8 flex items-center gap-3 font-syne text-[10px] font-bold text-accent-gold tracking-[0.3em] uppercase group-hover:text-white transition-colors duration-500">
                  {method.actionText} <ArrowRight size={12} className="group-hover:translate-x-2 transition-transform duration-500" />
                </div>
              </PremiumCard>
            ))}
          </div>
        </div>
      </section>

      <nav aria-label="Percorsi Black Bulls Lab" className="px-6 py-10 md:px-12">
        <div className="container-max mx-auto flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs uppercase tracking-[0.12em] text-text-secondary">
          <Link className="hover:text-accent-gold" href="/format">Esperienze</Link>
          <Link className="hover:text-accent-gold" href="/eventi-aziendali">Eventi aziendali</Link>
          <Link className="hover:text-accent-gold" href="/eventi-privati">Eventi privati</Link>
          <Link className="hover:text-accent-gold" href="/locali-partner">Locali &amp; Partner</Link>
        </div>
      </nav>

      {/* 3. IMMERSIVE MINIMALIST FORM */}
      <section className="reveal-scroll py-16 md:py-24 px-6 md:px-12 bg-black-pure relative z-30">
        <div className="container-max max-w-4xl px-6">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <SectionHeading 
                title="SCRIVI IL"
                highlight="PROTOCOLLO"
                subtitle="Nessun modulo standard, solo la tua visione"
                align="center"
              />
            </div>

            {status === "success" ? (
              <div className="text-center py-16 space-y-8 animate-in fade-in duration-1000">
                <div className="w-20 h-20 rounded-full border border-accent-gold/20 bg-accent-gold/5 flex items-center justify-center mx-auto animate-pulse">
                  <ShieldCheck size={36} className="text-accent-gold" />
                </div>
                <div className="space-y-3">
                  <span className="font-syne text-[10px] text-accent-gold tracking-[0.5em] uppercase font-bold">
                    Protocollo Iniziato
                  </span>
                  <h3 className="font-syne text-3xl md:text-5xl font-bold text-text-primary uppercase tracking-tighter">
                    CONNESSI CON IL LAB
                  </h3>
                  <p className="font-inter text-text-secondary text-xs md:text-sm max-w-md mx-auto leading-relaxed opacity-60">
                    Abbiamo ricevuto la tua richiesta. Ti ricontatteremo usando i recapiti indicati.
                  </p>
                </div>
                <button 
                  onClick={() => {
                    setStatus("idle");
                    setFormData({ name: "", email: "", experience: "A Cena Con Il Bugiardo", message: "", b_contact_name: "" });
                  }}
                  className="font-syne text-[10px] uppercase tracking-[0.4em] text-accent-gold hover:text-white transition-colors duration-500 py-3 px-8 border border-accent-gold/20 hover:border-white/25 bg-white/2"
                >
                  INVIA NUOVO PROTOCOLLO
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-12 p-8 md:p-12 border border-white/5 bg-white/1 backdrop-blur-md rounded-2xl relative overflow-hidden group">
                
                {/* Honeypot field */}
                <div className="hidden">
                  <input
                    type="text"
                    name="b_contact_name"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.b_contact_name}
                    onChange={(e) => setFormData({ ...formData, b_contact_name: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Name Input */}
                  <div className="relative z-10 space-y-2 group">
                    <label className="font-syne text-[10px] uppercase tracking-[0.3em] text-accent-gold/40 group-focus-within:text-accent-gold transition-colors duration-500 font-bold">
                      Il Tuo Nome
                    </label>
                    <input
                      type="text"
                      name="name"
                      autoComplete="name"
                      required
                      placeholder="NOME COMPLETO"
                      className="w-full bg-transparent border-b border-white/10 group-focus-within:border-accent-gold/50 px-0 py-3 font-inter text-xs md:text-sm text-text-primary placeholder:text-white/10 focus:outline-none transition-colors duration-500 uppercase tracking-wider"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  {/* Email Input */}
                  <div className="relative z-10 space-y-2 group">
                    <label className="font-syne text-[10px] uppercase tracking-[0.3em] text-accent-gold/40 group-focus-within:text-accent-gold transition-colors duration-500 font-bold">
                      Indirizzo Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      spellCheck={false}
                      required
                      placeholder="EMAIL@DOMINIO.COM"
                      className="w-full bg-transparent border-b border-white/10 group-focus-within:border-accent-gold/50 px-0 py-3 font-inter text-xs md:text-sm text-text-primary placeholder:text-white/10 focus:outline-none transition-colors duration-500 uppercase tracking-wider"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                {/* Experience Selection Badges */}
                <div className="relative z-10 space-y-4">
                  <label className="font-syne text-[10px] uppercase tracking-[0.3em] text-accent-gold/40 font-bold block">
                    Tipo di Esperienza
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {EXPERIENCE_OPTIONS.map((exp) => {
                      const isSelected = formData.experience === exp;
                      return (
                        <button
                          key={exp}
                          type="button"
                          onClick={() => setFormData({ ...formData, experience: exp })}
                          className={`px-4 py-2.5 border font-syne text-[9px] uppercase tracking-[0.2em] transition-all duration-500 cursor-pointer ${
                            isSelected
                              ? "bg-accent-gold text-black-pure border-accent-gold font-bold"
                              : "bg-white/2 border-white/5 text-text-secondary hover:border-accent-gold/30 hover:text-text-primary"
                          }`}
                        >
                          {exp}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message Input */}
                <div className="relative z-10 space-y-2 group">
                  <label className="font-syne text-[10px] uppercase tracking-[0.3em] text-accent-gold/40 group-focus-within:text-accent-gold transition-colors duration-500 font-bold">
                    La Tua Visione / Messaggio
                  </label>
                  <textarea
                    required
                    rows={4}
                    name="message"
                    autoComplete="off"
                    placeholder="RACCONTACI COSA VUOI PROGETTARE…"
                    className="w-full bg-transparent border-b border-white/10 group-focus-within:border-accent-gold/50 px-0 py-3 font-inter text-xs md:text-sm text-text-primary placeholder:text-white/10 focus:outline-none transition-colors duration-500 resize-none uppercase tracking-wider leading-relaxed"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                {/* Error Banner */}
                {status === "error" && (
                  <div className="flex items-center gap-3 text-red-400 text-xs p-4 bg-red-400/5 border border-red-400/20 rounded-xl relative z-10 animate-in slide-in-from-top-4 duration-500">
                    <AlertCircle size={16} />
                    <span>{errorMessage || "Si è verificato un errore nell'invio della richiesta. Riprova."}</span>
                  </div>
                )}

                {/* Submit Action */}
                <div className="relative z-10 pt-4">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-accent-gold text-black-pure font-syne font-bold uppercase tracking-[0.5em] px-6 py-4.5 hover:bg-white hover:text-black-pure transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 cursor-pointer text-xs"
                  >
                    {status === "loading" ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <>
                        INVIA L&apos;ESPERIENZA
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 4. EMOTIONAL FINAL FOOTER */}
      <section className="reveal-scroll py-20 md:py-32 px-6 md:px-12 bg-black-pure border-t border-white/5 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,169,107,0.02)_0%,transparent_80%)] pointer-events-none" />
        <div className="container-narrow space-y-10 relative z-10">
          <h2 className="font-syne text-4xl md:text-7xl font-bold uppercase tracking-tighter leading-none text-text-primary">
            OGNI ESPERIENZA <br />
            <span className="text-accent-gold italic drop-shadow-[0_0_30px_rgba(200,169,107,0.15)]">INIZIA CON UNA SCELTA.</span>
          </h2>
          <p className="font-inter text-text-secondary/50 text-[10px] md:text-xs uppercase tracking-[0.4em] max-w-xl mx-auto leading-relaxed">
            Alcune serate non si dimenticano. <br /> Il Lab è pronto. La scelta è tua.
          </p>
        </div>
      </section>

    </div>
  );
}
