"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck, MessageSquare, Loader2, AlertCircle, Heart, Star, Sparkles } from "lucide-react";
import { useGSAP } from "@/hooks/useGSAP";
import { useCinematic } from "@/hooks/useCinematic";
import { useMounted } from "@/hooks/useMounted";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { buildWAUrl, WA_MESSAGES } from "@/lib/whatsapp";
import { submitContactForm } from "@/app/actions/contact";
import gsap from "gsap";

const PARTY_OPTIONS = [
  "Compleanno",
  "Festa di Laurea",
  "Anniversario / Ricorrenza",
  "Altro Evento Privato"
];

const GUEST_OPTIONS = [
  "15 - 30 persone",
  "30 - 60 persone",
  "Oltre 60 persone"
];

const PRIVATE_SERVICES = [
  {
    title: "A Cena Con Il Bugiardo",
    subtitle: "Gioco di Ruolo & Social Deception",
    desc: "Il nostro format più richiesto per compleanni e lauree. Ogni ospite riceve indizi e obiettivi segreti sul proprio smartphone. Chi riuscirà a mentire meglio e a smascherare il bugiardo al tavolo? Un'esperienza interattiva ad alto tasso di risate.",
    highlight: "Risate e intrighi garantiti al tavolo."
  },
  {
    title: "Cena Con Delitto Digitale",
    subtitle: "Giallo Interattivo Moderno",
    desc: "Il classico gioco d'indagine reinventato. Tra le portate, gli attori recitano la scena del crimine e voi al tavolo dovrete analizzare i dossier digitali, esaminare le prove sul cellulare e interrogare i sospettati. Perfetto per gruppi affiatati.",
    highlight: "Diventate detective per una sera."
  },
  {
    title: "Feste Personalizzate",
    subtitle: "Esperienze Bespoke",
    desc: "Vuoi fare una sorpresa unica al festeggiato? Personalizziamo la trama dello spettacolo o del gioco inserendo battute, aneddoti, segreti e riferimenti reali alla sua vita o ai suoi amici. La festa ideale cucita su misura.",
    highlight: "Il festeggiato diventa il protagonista dello show."
  }
];

export function PrivateEventsClient() {
  const mounted = useMounted();
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const { revealOnScroll } = useCinematic();

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    partyType: "Compleanno",
    guests: "15 - 30 persone",
    experience: "A Cena Con Il Bugiardo",
    message: "",
    b_contact_name: "", // honeypot
  });

  useGSAP(() => {
    if (!mounted) return;

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

    const tl = gsap.timeline();
    tl.from(".priv-title span", {
      y: 80,
      opacity: 0,
      filter: "blur(12px)",
      stagger: 0.12,
      duration: 1.5,
      ease: "expo.out"
    })
    .from(".priv-sub", {
      opacity: 0,
      y: 15,
      duration: 1,
      ease: "power2.out"
    }, "-=1")
    .from(".priv-cta", {
      opacity: 0,
      y: 10,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.7");

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, { scope: containerRef, dependencies: [mounted] });

  revealOnScroll(".reveal-priv");

  const handleScrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const formSection = document.getElementById("private-form-section");
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
        experience: `FESTA PRIVATA: ${formData.partyType} (${formData.experience} per ${formData.guests})`,
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

      {/* 1. HERO SECTION */}
      <section className="relative h-[90vh] w-full overflow-hidden flex items-center justify-center pt-24 border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/brand/bg-hero-wide.webp"
            alt="Compleanni, lauree e feste private originali a Torino"
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
        <div className="absolute top-12 left-12 z-50">
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
              Esperienze Immersive // Feste Private
            </span>
            <h1 className="priv-title font-syne font-bold text-[clamp(2rem,6vw,7rem)] leading-[0.95] tracking-tighter uppercase text-text-primary flex flex-col items-center">
              <span>Feste di</span>
              <span className="text-accent-gold italic">compleanno</span>
              <span>e lauree fuori</span>
              <span>dagli schemi.</span>
            </h1>
            <p className="priv-sub font-inter text-text-secondary text-xs md:text-lg leading-relaxed tracking-[0.2em] uppercase opacity-75 max-w-3xl mx-auto">
              Basta con le solite feste. Festeggia il tuo compleanno o la tua laurea con giochi di ruolo, indagini interattive ed emozioni reali a Torino.
            </p>
          </div>

          <div className="priv-cta pt-6 flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8">
            <PrimaryButton onClick={handleScrollToForm} href="#private-form-section" size="lg" className="w-full sm:w-auto min-w-[280px]">
              PROGETTA LA TUA FESTA
            </PrimaryButton>
            <a 
              href={`https://wa.me/393342010067?text=${encodeURIComponent("Ciao! Vorrei organizzare una festa privata (compleanno/laurea) con voi. Mi date qualche info?")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto py-5 px-10 border border-white/10 text-white font-syne text-[10px] font-bold tracking-[0.3em] uppercase hover:border-accent-gold hover:text-accent-gold transition-all duration-500 bg-white/2 backdrop-blur-md text-center flex items-center justify-center gap-3 cursor-pointer"
            >
              <MessageSquare size={14} />
              SCRIVICI SU WHATSAPP
            </a>
          </div>
        </div>
      </section>

      {/* 2. WHY CHOOSE US */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-black-pure border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,169,107,0.012)_0%,transparent_75%)] pointer-events-none" />
        <div className="container-max grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-7 space-y-10">
            <div className="reveal-priv">
              <SectionHeading 
                title="DIVERTIMENTO"
                highlight="REALE."
                subtitle="Coinvolgi tutti i tuoi amici"
              />
            </div>
            <h3 className="reveal-priv font-syne font-bold text-2xl md:text-4xl uppercase tracking-tight text-text-primary leading-tight">
              Una festa di cui tutti <br />
              <span className="text-accent-gold italic">continueranno a parlare.</span>
            </h3>
            <div className="reveal-priv space-y-6 font-inter text-sm md:text-base text-text-secondary leading-relaxed opacity-75 max-w-2xl">
              <p>
                Organizzare una festa privata (che sia per i 30 anni, i 40 anni, o il traguardo della Laurea) significa voler riunire le persone a cui si vuole bene per vivere un momento felice. Ma spesso le solite cene sedute o i locali affollati non creano vera interazione: ci si divide in gruppetti e si finisce per fare le solite conversazioni.
              </p>
              <p>
                I format immersivi di Black Bulls Lab rompono il ghiaccio fin dal primo minuto. Grazie al sistema interattivo dello smartphone, i tuoi amici collaborano, ridono, indagano e competono insieme. Nessun imbarazzo, nessun attore invadente: sarete voi a creare le dinamiche della serata in modo del tutto spontaneo.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-square w-full max-w-md mx-auto reveal-priv">
            <PremiumCard className="h-full border border-white/5">
              <Image 
                src="/images/brand/background.webp"
                alt="Compleanni ed eventi privati Torino"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover grayscale opacity-25 group-hover:grayscale-0 group-hover:opacity-60 transition-[filter,opacity] duration-1000"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black-pure via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-8 left-8 right-8 space-y-2">
                <span className="text-accent-gold font-syne text-xs uppercase tracking-[0.3em] font-bold block">
                  Compleanni // Lauree // Feste
                </span>
                <p className="font-inter text-[10px] text-text-secondary/50 uppercase tracking-[0.2em]">
                  Torino // Piemonte
                </p>
              </div>
            </PremiumCard>
          </div>
        </div>
      </section>

      {/* 3. AVAILABLE FORMATS */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-black-pure border-b border-white/5">
        <div className="container-max space-y-16">
          <div className="text-center reveal-priv">
            <SectionHeading 
              title="FORMAT"
              highlight="PER PRIVATI"
              subtitle="Scegli l'esperienza per la tua festa"
              align="center"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {PRIVATE_SERVICES.map((srv, index) => (
              <div key={srv.title} className="reveal-priv">
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

      {/* 4. REVIEWS */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-black-pure border-b border-white/5 relative overflow-hidden">
        <div className="container-max space-y-20">
          <div className="text-center space-y-4 reveal-priv">
            <span className="inline-block font-syne text-[10px] text-accent-gold tracking-[0.6em] uppercase font-bold">
              Testimonianze
            </span>
            <h2 className="font-syne font-bold text-2xl md:text-5xl text-text-primary uppercase tracking-tighter">
              CHI HA FESTEGGIATO CON NOI
            </h2>
            <p className="font-inter text-text-secondary text-xs md:text-sm max-w-xl mx-auto leading-relaxed opacity-60">
              Ecco cosa dicono i festeggiati e i loro amici dopo aver vissuto una delle nostre cene spettacolo o serate interattive private.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto pt-6 reveal-priv">
            {[
              {
                quote: "Per i miei 30 anni volevo qualcosa di totalmente diverso dalla solita cena. Abbiamo organizzato A Cena con il Bugiardo in un locale a Torino e i miei amici sono rimasti entusiasti. Nessun imbarazzo, risate continue e una competizione pazzesca tra i tavoli!",
                author: "Chiara F. (Festeggiata)",
                company: "Festa di Compleanno (30 Anni)",
                stars: 5
              },
              {
                quote: "Abbiamo organizzato la Cena con Delitto per la festa di laurea di mia sorella. Essendo tutti ragazzi universitari volevamo interazione e divertimento e il sistema con lo smartphone è stato perfetto. Straconsigliato per eventi privati di gruppo!",
                author: "Gabriele T. (Organizzatore)",
                company: "Festa di Laurea",
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

      {/* 5. CONTACT FORM */}
      <section id="private-form-section" className="py-20 md:py-28 px-6 md:px-12 bg-black-pure relative z-30">
        <div className="container-max max-w-4xl px-6">
          <div className="space-y-12">
            <div className="text-center space-y-4 reveal-priv">
              <SectionHeading 
                title="PROGETTA LA"
                highlight="TUA FESTA"
                subtitle="Scrivici le tue idee. Proposta e preventivo gratis in 24 ore."
                align="center"
              />
            </div>

            {status === "success" ? (
              <div className="text-center py-16 space-y-8 animate-in fade-in duration-1000 reveal-priv">
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
                    Grazie per averci scelto. Il nostro team ti contatterà al più presto inviandoti una proposta di format personalizzata ed il preventivo per la tua festa privata entro 24 ore lavorative.
                  </p>
                </div>
                <button 
                  onClick={() => {
                    setStatus("idle");
                    setFormData({ name: "", email: "", partyType: "Compleanno", guests: "15 - 30 persone", experience: "A Cena Con Il Bugiardo", message: "", b_contact_name: "" });
                  }}
                  className="font-syne text-[10px] uppercase tracking-[0.4em] text-accent-gold hover:text-white transition-colors duration-500 py-3 px-8 border border-accent-gold/20 hover:border-white/25 bg-white/2"
                >
                  INVIA UN'ALTRA RICHIESTA
                </button>
              </div>
            ) : (
              <div className="reveal-priv">
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
                        Nome e Cognome dell'Organizzatore
                      </label>
                      <input
                        type="text"
                        name="name"
                        autoComplete="name"
                        required
                        placeholder="IL TUO NOME"
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
                        placeholder="NOME@EMAIL.COM"
                        className="w-full bg-transparent border-b border-white/10 group-focus-within:border-accent-gold/50 px-0 py-3 font-inter text-xs md:text-sm text-text-primary placeholder:text-white/10 focus:outline-none transition-colors duration-500 uppercase tracking-wider"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Party Type Badges */}
                  <div className="relative z-10 space-y-4">
                    <label className="font-syne text-[10px] uppercase tracking-[0.3em] text-accent-gold/40 font-bold block">
                      Tipo di Festa / Ricorrenza
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {PARTY_OPTIONS.map((type) => {
                        const isSelected = formData.partyType === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setFormData({ ...formData, partyType: type })}
                            className={`px-4 py-2.5 border font-syne text-[9px] uppercase tracking-[0.2em] transition-all duration-500 cursor-pointer ${
                              isSelected
                                ? "bg-accent-gold text-black-pure border-accent-gold font-bold"
                                : "bg-white/2 border-white/5 text-text-secondary hover:border-accent-gold/30 hover:text-text-primary"
                            }`}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Guest Size Selection Badges */}
                  <div className="relative z-10 space-y-4">
                    <label className="font-syne text-[10px] uppercase tracking-[0.3em] text-accent-gold/40 font-bold block">
                      Numero Previsto di Invitati
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
                      Esperienza Preferita
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {["A Cena Con Il Bugiardo", "Cena Con Delitto", "Format Customizzato / Altro"].map((exp) => {
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
                      Raccontaci i dettagli (data indicativa, location desiderata, sorprese...)
                    </label>
                    <textarea
                      required
                      rows={4}
                      name="message"
                      autoComplete="off"
                      placeholder="DESCRIVI IL TIPO DI FESTA E SE HAI RICHIESTE PARTICOLARI PER IL FESTEGGIATO…"
                      className="w-full bg-transparent border-b border-white/10 group-focus-within:border-accent-gold/50 px-0 py-3 font-inter text-xs md:text-sm text-text-primary placeholder:text-white/10 focus:outline-none transition-colors duration-500 resize-none uppercase tracking-wider leading-relaxed"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  {/* Strategic WA Contact helper */}
                  <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-white/5 relative z-10">
                    <div className="space-y-1">
                      <span className="font-syne text-[9px] uppercase tracking-[0.2em] text-text-secondary/40 font-bold block">
                        Vuoi parlare subito con noi?
                      </span>
                      <a 
                        href={`https://wa.me/393342010067?text=${encodeURIComponent("Ciao! Sto compilando il modulo sul sito e vorrei info veloci per una festa privata.")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-syne text-[9px] uppercase tracking-[0.3em] text-accent-gold hover:text-white transition-colors duration-500 font-bold"
                      >
                        CONTATTACI SU WHATSAPP
                      </a>
                    </div>
                  </div>

                  {/* Error Banner */}
                  {status === "error" && (
                    <div className="flex items-center gap-3 text-red-400 text-xs p-4 bg-red-400/5 border border-red-400/20 rounded-xl relative z-10">
                      <AlertCircle size={16} />
                      <span>{errorMessage || "Si è verificato un errore. Riprova o scrivici direttamente."}</span>
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
                          RICHIEDI PREVENTIVO FESTA
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
        <div className="container-narrow space-y-10 relative z-10 reveal-priv">
          <h2 className="font-syne text-4xl md:text-7xl font-bold uppercase tracking-tighter leading-none text-text-primary">
            RENDI LA TUA FESTA <br />
            <span className="text-accent-gold italic drop-shadow-[0_0_35px_rgba(200,169,107,0.2)]">VERAMENTE ORIGINALE.</span>
          </h2>
          <p className="font-inter text-text-secondary/50 text-[10px] md:text-xs uppercase tracking-[0.4em] max-w-2xl mx-auto leading-relaxed">
            Compleanni memorabili, lauree indimenticabili ed eventi privati di classe. <br /> Non organizziamo semplici feste: creiamo ricordi che durano.
          </p>
          <div className="pt-4">
            <button 
              onClick={handleScrollToForm}
              className="font-syne text-[10px] uppercase tracking-[0.4em] text-accent-gold hover:text-white transition-colors duration-500 py-3.5 px-8 border border-accent-gold/20 hover:border-white/25 bg-white/2 cursor-pointer"
            >
              RICHIEDI UN PREVENTIVO GRATUITO
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}
