"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck, MessageSquare, Loader2, AlertCircle, Heart, Star } from "lucide-react";
import { useGSAP } from "@/hooks/useGSAP";
import { useCinematic } from "@/hooks/useCinematic";
import { useMounted } from "@/hooks/useMounted";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { buildWAUrl, WA_MESSAGES } from "@/lib/whatsapp";
import { submitContactForm } from "@/app/actions/contact";
import gsap from "gsap";

const GUEST_OPTIONS = [
  "Fino a 50 persone",
  "50 - 150 persone",
  "Oltre 150 persone"
];

const CORPORATE_SERVICES = [
  {
    title: "Team Building Immersivo",
    subtitle: "Ingegneria Sociale e Deception",
    desc: "Format ad altissimo coinvolgimento (come *A Cena Con Il Bugiardo*) in cui le barriere gerarchiche si dissolvono. I colleghi negoziano, si alleano e competono, rivelando dinamiche di leadership spontanee lontano dall'ufficio.",
    highlight: "Più efficace di 10 meeting."
  },
  {
    title: "Dinner Show Aziendali",
    subtitle: "Spettacolo e Alta Cucina",
    desc: "Cene spettacolo raffinate ed elettrizzanti (come *Cena Con Delitto*) dove il team non è semplice spettatore, ma protagonista attivo di una trama teatrale mozzafiato. Il connubio perfetto tra cibo eccellente e suspance.",
    highlight: "Adrenalina servita al tavolo."
  },
  {
    title: "Format Personalizzati",
    subtitle: "Bespoke Brand Universe",
    desc: "Progettiamo universi narrativi unici cuciti sulla storia, sui valori o sul lancio di un prodotto del vostro brand. Script teatrali dedicati, web-app personalizzate per l'interazione, regie high-end e allestimenti immersivi completi.",
    highlight: "La tua azienda sul palco."
  }
];

export function CorporateClient() {
  const mounted = useMounted();
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const { revealOnScroll } = useCinematic();

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    guests: "50 - 150 persone",
    experience: "Team Building Immersivo",
    message: "",
    b_contact_name: "", // honeypot
  });

  useGSAP(() => {
    if (!mounted) return;

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

    // Hero timeline entry
    const tl = gsap.timeline();
    tl.from(".corp-title span", {
      y: 80,
      opacity: 0,
      filter: "blur(12px)",
      stagger: 0.12,
      duration: 1.5,
      ease: "expo.out"
    })
    .from(".corp-sub", {
      opacity: 0,
      y: 15,
      duration: 1,
      ease: "power2.out"
    }, "-=1")
    .from(".corp-cta", {
      opacity: 0,
      y: 10,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.7");

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, { scope: containerRef, dependencies: [mounted] });

  // Triggers scroll reveal animations beautifully on inner elements
  revealOnScroll(".reveal-corp");

  const handleScrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const formSection = document.getElementById("corporate-form-section");
    formSection?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const mappedData = {
        name: formData.name,
        email: formData.email,
        experience: `${formData.experience} (${formData.guests})`,
        message: formData.message,
        b_contact_name: formData.b_contact_name
      };

      const res = await submitContactForm(mappedData);
      if (res.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(res.error || "Errore durante l'invio.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage("Errore di connessione. Contattaci direttamente via WhatsApp.");
    }
  };

  if (!mounted) {
    return (
      <div className="bg-black-pure min-h-screen flex items-center justify-center">
        <Loader2 size={32} className="text-accent-gold animate-spin" />
      </div>
    );
  }

  return (
    <main ref={containerRef} className="bg-black-pure text-text-primary min-h-screen selection:bg-accent-gold selection:text-black-pure overflow-x-hidden relative">
      
      {/* Immersive Whole-Page Spotlight (Floating light tracking the cursor) */}
      <div 
        ref={spotlightRef}
        className="fixed top-0 left-0 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 opacity-30 mix-blend-screen hidden lg:block"
        style={{
          background: 'radial-gradient(circle, rgba(200, 169, 107, 0.08) 0%, transparent 70%)',
          filter: 'blur(80px)'
        }}
      />

      {/* 1. CINEMATIC HERO */}
      <section className="relative h-[90vh] w-full overflow-hidden flex items-center justify-center pt-24 border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/brand/bg-venue-crowd.webp"
            alt="Esperienze aziendali e team building immersivo"
            fill
            sizes="100vw"
            className="object-cover opacity-20 scale-102 contrast-110"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-black-pure/95 via-transparent to-black-pure z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.95)_100%)] z-10" />
          <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.webp')] mix-blend-overlay z-20" />
        </div>

        {/* Back Link */}
        <div className="absolute top-24 left-6 md:top-12 md:left-12 z-50">
          <Link
            href="/"
            className="group flex items-center gap-4 text-text-secondary/30 hover:text-accent-gold transition-colors uppercase text-[10px] font-bold tracking-[0.5em]"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-2 transition-transform" /> 
            Back to Home
          </Link>
        </div>

        <div className="relative z-30 container-max px-6 text-center space-y-10">
          <div className="space-y-6 max-w-5xl mx-auto">
            <span className="inline-block px-4 py-1 border border-accent-gold/20 text-accent-gold text-[10px] font-bold uppercase tracking-[0.6em] bg-accent-gold/5 backdrop-blur-md">
              Human Connection Protocols // Aziende
            </span>
            <h1 className="corp-title font-syne font-bold text-[clamp(2rem,6vw,7rem)] leading-[0.95] tracking-tighter uppercase text-text-primary flex flex-col items-center">
              <span>Esperienze</span>
              <span className="text-accent-gold italic">immersive</span>
              <span>per aziende che vogliono</span>
              <span>lasciare il segno.</span>
            </h1>
            <p className="corp-sub font-inter text-text-secondary text-xs md:text-lg leading-relaxed tracking-[0.2em] uppercase opacity-75 max-w-3xl mx-auto">
              Dinner show interattivi, team building immersivi ed eventi aziendali progettati per creare coinvolgimento reale.
            </p>
          </div>

          <div className="corp-cta pt-6 flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8">
            <PrimaryButton onClick={handleScrollToForm} href="#corporate-form-section" size="lg" className="w-full sm:w-auto min-w-[280px]">
              PROGETTA IL TUO EVENTO
            </PrimaryButton>
            <a 
              href={buildWAUrl(WA_MESSAGES.corporate)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto py-5 px-10 border border-white/10 text-white font-syne text-[10px] font-bold tracking-[0.3em] uppercase hover:border-accent-gold hover:text-accent-gold transition-all duration-500 bg-white/2 backdrop-blur-md text-center flex items-center justify-center gap-3 cursor-pointer"
            >
              <MessageSquare size={14} />
              PARLA CON IL TEAM
            </a>
          </div>
        </div>

        {/* Small aesthetic corner spec */}
        <div className="absolute bottom-12 left-12 hidden lg:block">
          <div className="flex items-center gap-4 text-white/10">
            <Heart size={20} className="opacity-20 animate-pulse" />
            <div className="text-left">
              <div className="text-[10px] font-bold tracking-[0.4em] uppercase">Human Connection Design</div>
              <div className="text-[9px] tracking-[0.2em] uppercase opacity-50">Impact Factor: Real Memories</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-black-pure border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,169,107,0.012)_0%,transparent_75%)] pointer-events-none" />
        <div className="container-max grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-7 space-y-10">
            <div className="reveal-corp">
              <SectionHeading 
                title="TEAM BUILDING"
                highlight="COINVOLGENTE."
                subtitle="Esperienze reali che uniscono il gruppo"
              />
            </div>
            <h3 className="reveal-corp font-syne font-bold text-2xl md:text-4xl uppercase tracking-tight text-text-primary leading-tight">
              I team non si costruiscono con <br />
              <span className="text-accent-gold italic">eventi dimenticabili.</span>
            </h3>
            <div className="reveal-corp space-y-6 font-inter text-sm md:text-base text-text-secondary leading-relaxed opacity-75 max-w-2xl">
              <p>
                I soliti buffet formali o i giochi di ruolo standardizzati che promettono &ldquo;unione aziendale&rdquo; spesso creano solo imbarazzo o noia. Non abbattono le distanze: le congelano, lasciando intatti i soliti silos comunicativi del giorno prima.
              </p>
              <p>
                La fiducia e l&apos;affiatamento nascono unicamente da <strong>esperienze vissute insieme ad alto tasso emotivo</strong>. Noi di Black Bulls Lab eliminiamo i PowerPoint e le teorie sul team building per gettare il vostro gruppo all&apos;interno di sfide reali. Quando ridiamo sinceri, negoziamo con astuzia e risolviamo enigmi gomito a gomito, la gerarchia svanisce. Nasce una connessione autentica.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-square w-full max-w-md mx-auto reveal-corp">
            <PremiumCard className="h-full border border-white/5">
              <Image 
                src="/images/brand/service-plating.webp"
                alt="Esperienze e connessioni reali"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover grayscale opacity-25 group-hover:grayscale-0 group-hover:opacity-60 transition-[filter,opacity] duration-1000"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black-pure via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-8 left-8 right-8 space-y-2">
                <span className="text-accent-gold font-syne text-xs uppercase tracking-[0.3em] font-bold block">
                  Cena Aziendale e Format
                </span>
                <p className="font-inter text-[10px] text-text-secondary/50 uppercase tracking-[0.2em]">
                  Torino // Milano // Italia
                </p>
              </div>
            </PremiumCard>
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-black-pure border-b border-white/5">
        <div className="container-max space-y-16">
          <div className="text-center reveal-corp">
            <SectionHeading 
              title="FORMAT"
              highlight="AZIENDALI"
              subtitle="L'Intrattenimento Esperienziale"
              align="center"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {CORPORATE_SERVICES.map((srv, index) => (
              <div key={srv.title} className="reveal-corp">
                <PremiumCard 
                  className="p-10 bg-white/2 border border-white/5 hover:border-accent-gold/25 hover:shadow-[0_0_60px_rgba(200,169,107,0.05)] transition-all duration-700 flex flex-col justify-between items-start h-full group"
                >
                  <div className="space-y-6">
                    <span className="font-syne text-[10px] text-accent-gold/40 group-hover:text-accent-gold tracking-[0.5em] uppercase font-bold block transition-colors duration-500">
                      0{index + 1}{" // "}{srv.subtitle}
                    </span>
                    <div className="space-y-3">
                      <h3 className="font-syne font-bold uppercase text-xl md:text-2xl tracking-tight text-text-primary group-hover:text-accent-gold transition-colors duration-500">
                        {srv.title}
                      </h3>
                      <p className="font-inter text-xs md:text-sm text-text-secondary leading-relaxed opacity-70">
                        {srv.desc}
                      </p>
                    </div>
                  </div>
                  <div className="pt-10 font-syne text-[9px] uppercase tracking-[0.3em] text-accent-gold font-bold flex items-center gap-2 group-hover:text-white transition-colors duration-500">
                    {srv.highlight} <ArrowRight size={10} className="group-hover:translate-x-2 transition-transform duration-500" />
                  </div>
                </PremiumCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SOCIAL PROOF & TESTIMONIALS */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-black-pure border-b border-white/5 relative overflow-hidden">
        <div className="container-max space-y-20">
          <div className="text-center space-y-4 reveal-corp">
            <span className="inline-block font-syne text-[10px] text-accent-gold tracking-[0.6em] uppercase font-bold">
              Trusted by Top Brands
            </span>
            <h2 className="font-syne font-bold text-2xl md:text-5xl text-text-primary uppercase tracking-tighter">
              LEADER CHE SI SONO MESSI IN GIOCO
            </h2>
            <p className="font-inter text-text-secondary text-xs md:text-sm max-w-xl mx-auto leading-relaxed opacity-60">
              Hanno collaborato con noi leader nazionali e multinazionali nei settori tech, fashion, consulting e automotive per i loro eventi corporate a Torino, Milano e Roma.
            </p>
          </div>

          {/* Testimonial cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto pt-6 reveal-corp">
            {[
              {
                quote: "Cercavamo qualcosa di totalmente differente dalla solita cena aziendale. Black Bulls Lab ha progettato un'esperienza interattiva ad altissimo tasso di adrenalina. In ufficio non si parlava d'altro il giorno successivo. Spettacolare.",
                author: "HR Director",
                company: "Multinazionale Tech (Milano)",
                stars: 5
              },
              {
                quote: "Un format cucito su misura per noi. L'integrazione narrativa del nostro brand all'interno del gioco sociale ha superato ogni aspettativa. Ha svelato lati e capacità relazionali del nostro team che non avevamo mai visto.",
                author: "CEO & Founder",
                company: "Digital Consulting Agency (Torino)",
                stars: 5
              }
            ].map((tst, i) => (
              <div 
                key={i}
                className="bg-white/1 border border-white/5 p-10 space-y-6 hover:border-white/10 transition-colors duration-500 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex gap-1">
                    {[...Array(tst.stars)].map((_, idx) => (
                      <Star key={idx} size={12} className="fill-accent-gold text-accent-gold" />
                    ))}
                  </div>
                  <p className="font-inter text-xs md:text-sm italic text-text-secondary leading-relaxed opacity-85">
                    &ldquo;{tst.quote}&rdquo;
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-syne font-bold uppercase text-[11px] tracking-wider text-text-primary">
                    {tst.author}
                  </h4>
                  <p className="font-inter text-[9px] uppercase tracking-widest text-accent-gold font-semibold">
                    {tst.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. IMMERSIVE CONTACT FORM SECTION */}
      <section id="corporate-form-section" className="py-20 md:py-28 px-6 md:px-12 bg-black-pure relative z-30">
        <div className="container-max max-w-4xl px-6">
          <div className="space-y-12">
            <div className="text-center space-y-4 reveal-corp">
              <SectionHeading 
                title="RICHIEDI UN"
                highlight="PREVENTIVO"
                subtitle="Nessuna fuffa. Ricevi una proposta dettagliata entro 24 ore."
                align="center"
              />
            </div>

            {status === "success" ? (
              <div className="text-center py-16 space-y-8 animate-in fade-in duration-1000 reveal-corp">
                <div className="w-20 h-20 rounded-full border border-accent-gold/20 bg-accent-gold/5 flex items-center justify-center mx-auto animate-pulse">
                  <ShieldCheck size={36} className="text-accent-gold" />
                </div>
                <div className="space-y-3">
                  <span className="font-syne text-[10px] text-accent-gold tracking-[0.5em] uppercase font-bold">
                    Richiesta Inviata
                  </span>
                  <h3 className="font-syne text-3xl md:text-5xl font-bold text-text-primary uppercase tracking-tighter">
                    RICEVUTA CON SUCCESSO
                  </h3>
                  <p className="font-inter text-text-secondary text-xs md:text-sm max-w-md mx-auto leading-relaxed opacity-60">
                    Grazie per averci contattato. Il nostro team analizzerà le tue esigenze e ti invierà un preventivo gratuito e una proposta di format personalizzata entro 24 ore lavorative.
                  </p>
                </div>
                <button 
                  onClick={() => {
                    setStatus("idle");
                    setFormData({ name: "", email: "", guests: "50 - 150 persone", experience: "Team Building Immersivo", message: "", b_contact_name: "" });
                  }}
                  className="font-syne text-[10px] uppercase tracking-[0.4em] text-accent-gold hover:text-white transition-colors duration-500 py-3 px-8 border border-accent-gold/20 hover:border-white/25 bg-white/2"
                >
                  INVIA UN'ALTRA RICHIESTA
                </button>
              </div>
            ) : (
              <div className="reveal-corp">
                <form onSubmit={handleSubmit} className="space-y-12 p-8 md:p-12 border border-white/5 bg-white/1 backdrop-blur-md rounded-2xl relative overflow-hidden">
                  
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
                        Referente Aziendale
                      </label>
                      <input
                        type="text"
                        name="name"
                        autoComplete="name"
                        required
                        placeholder="NOME E COGNOME"
                        className="w-full bg-transparent border-b border-white/10 group-focus-within:border-accent-gold/50 px-0 py-3 font-inter text-xs md:text-sm text-text-primary placeholder:text-white/10 focus:outline-none transition-colors duration-500 uppercase tracking-wider"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    {/* Email Input */}
                    <div className="relative z-10 space-y-2 group">
                      <label className="font-syne text-[10px] uppercase tracking-[0.3em] text-accent-gold/40 group-focus-within:text-accent-gold transition-colors duration-500 font-bold">
                        Email Aziendale
                      </label>
                      <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        spellCheck={false}
                        required
                        placeholder="EMAIL@AZIENDA.COM"
                        className="w-full bg-transparent border-b border-white/10 group-focus-within:border-accent-gold/50 px-0 py-3 font-inter text-xs md:text-sm text-text-primary placeholder:text-white/10 focus:outline-none transition-colors duration-500 uppercase tracking-wider"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Guest Size Selection Badges */}
                  <div className="relative z-10 space-y-4">
                    <label className="font-syne text-[10px] uppercase tracking-[0.3em] text-accent-gold/40 font-bold block">
                      Numero di Partecipanti
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {GUEST_OPTIONS.map((g) => {
                        const isSelected = formData.guests === g;
                        return (
                          <button
                            key={g}
                            type="button"
                            onClick={() => setFormData({ ...formData, guests: g })}
                            className={`px-4 py-2.5 border font-syne text-[9px] uppercase tracking-[0.2em] transition-all duration-500 cursor-pointer ${
                              isSelected
                                ? "bg-accent-gold text-black-pure border-accent-gold font-bold"
                                : "bg-white/2 border-white/5 text-text-secondary hover:border-accent-gold/30 hover:text-text-primary"
                            }`}
                          >
                            {g}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Format / Experience Selection Badges */}
                  <div className="relative z-10 space-y-4">
                    <label className="font-syne text-[10px] uppercase tracking-[0.3em] text-accent-gold/40 font-bold block">
                      Tipo di Esperienza Richiesta
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {["Team Building Immersivo", "Dinner Show Aziendale", "Format Customizzato"].map((exp) => {
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
                      La Tua Visione / Obiettivi del Team
                    </label>
                    <textarea
                      required
                      rows={4}
                      name="message"
                      autoComplete="off"
                      placeholder="DESCRIVI COSA VORRESTI OTTENERE E SE HAI OBIETTIVI SPECIFICI PER IL GRUPPO…"
                      className="w-full bg-transparent border-b border-white/10 group-focus-within:border-accent-gold/50 px-0 py-3 font-inter text-xs md:text-sm text-text-primary placeholder:text-white/10 focus:outline-none transition-colors duration-500 resize-none uppercase tracking-wider leading-relaxed"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  {/* Strategic WA Contact helper */}
                  <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-white/5 relative z-10">
                    <div className="space-y-1">
                      <span className="font-syne text-[9px] uppercase tracking-[0.2em] text-text-secondary/40 font-bold block">
                        Preferisci un contatto istantaneo?
                      </span>
                      <a 
                        href={buildWAUrl(WA_MESSAGES.corporate)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-syne text-[9px] uppercase tracking-[0.3em] text-accent-gold hover:text-white transition-colors duration-500 font-bold"
                      >
                        SCRIVICI DIRETTAMENTE SU WHATSAPP
                      </a>
                    </div>
                  </div>

                  {/* Error Banner */}
                  {status === "error" && (
                    <div className="flex items-center gap-3 text-red-400 text-xs p-4 bg-red-400/5 border border-red-400/20 rounded-xl relative z-10">
                      <AlertCircle size={16} />
                      <span>{errorMessage || "Si è verificato un errore durante l'invio. Riprova."}</span>
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
                          RICHIEDI PREVENTIVO GRATUITO
                          <ArrowRight size={14} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. EMOTIONAL CLOSE */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-black-pure border-t border-white/5 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,169,107,0.025)_0%,transparent_80%)] pointer-events-none" />
        <div className="container-narrow space-y-10 relative z-10 reveal-corp">
          <h2 className="font-syne text-4xl md:text-7xl font-bold uppercase tracking-tighter leading-none text-text-primary">
            OGNI TEAM HA BISOGNO DI <br />
            <span className="text-accent-gold italic drop-shadow-[0_0_35px_rgba(200,169,107,0.2)]">VIVERE QUALCOSA DI REALE.</span>
          </h2>
          <p className="font-inter text-text-secondary/50 text-[10px] md:text-xs uppercase tracking-[0.4em] max-w-2xl mx-auto leading-relaxed">
            Nessuna presentazione PowerPoint aziendale. <br /> Solo dinamiche umane che creano un legame che resiste al tempo.
          </p>
          <div className="pt-4">
            <button 
              onClick={handleScrollToForm}
              className="font-syne text-[10px] uppercase tracking-[0.4em] text-accent-gold hover:text-white transition-colors duration-500 py-3.5 px-8 border border-accent-gold/20 hover:border-white/25 bg-white/2 cursor-pointer"
            >
              RICHIEDI UN PREVENTIVO
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}
