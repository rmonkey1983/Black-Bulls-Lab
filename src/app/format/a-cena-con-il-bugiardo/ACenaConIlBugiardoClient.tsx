"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Smartphone,
  Search,
  ShieldCheck,
  ArrowLeft,
  XCircle,
  CheckCircle2,
  Loader2,
  Calendar,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldAlert
} from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";

export function ACenaConIlBugiardoClient() {
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "Torino",
    guests_count: 1,
    event_consent: true,
    marketing_consent: false,
    website: "", // Honeypot
  });

  const [utmParams, setUtmParams] = useState({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
    referrer: "",
  });

  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Capture UTM parameters & Referrer on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      setUtmParams({
        utm_source: urlParams.get("utm_source") || "",
        utm_medium: urlParams.get("utm_medium") || "",
        utm_campaign: urlParams.get("utm_campaign") || "",
        utm_term: urlParams.get("utm_term") || "",
        utm_content: urlParams.get("utm_content") || "",
        referrer: document.referrer || "",
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    // Client side checks
    if (!formData.name.trim()) {
      setErrorMsg("Inserisci il tuo nome e cognome.");
      return;
    }

    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMsg("Inserisci un indirizzo email valido.");
      return;
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 6) {
      setErrorMsg("Inserisci un numero di telefono / WhatsApp valido.");
      return;
    }

    if (!formData.event_consent) {
      setErrorMsg("È necessario accettare l'informativa privacy ed i termini dell'evento per procedere.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        city: formData.city.trim() || "Torino",
        guests_count: Number(formData.guests_count) || 1,
        event_consent: formData.event_consent,
        marketing_consent: formData.marketing_consent,
        source: "landing_page",
        landing_page: "/format/a-cena-con-il-bugiardo",
        referrer: utmParams.referrer,
        utm_source: utmParams.utm_source,
        utm_medium: utmParams.utm_medium,
        utm_campaign: utmParams.utm_campaign,
        utm_term: utmParams.utm_term,
        utm_content: utmParams.utm_content,
        privacy_version: "v1.0",
        turnstileToken,
        website: formData.website, // Honeypot
      };

      const res = await fetch("/api/liar-system/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Errore durante l'invio. Riprova tra poco.");
      } else {
        setSuccessMsg(data.message || "Iscrizione completata con successo! Ti ricontatteremo in anteprima.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          city: "Torino",
          guests_count: 1,
          event_consent: true,
          marketing_consent: false,
          website: "",
        });
      }
    } catch (err) {
      console.error("Waitlist submit error:", err);
      setErrorMsg("Errore di connessione. Verificare la rete e riprovare.");
    } finally {
      setLoading(false);
    }
  };

  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  return (
    <main className="bg-[#050505] text-[#E5E5E5] min-h-screen font-sans selection:bg-[#990000] selection:text-white overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] w-full flex items-center justify-center pt-24 pb-16 px-4 md:px-8 border-b border-white/5 overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/brand/bg-hero-wide.webp"
            alt="A Cena Con Il Bugiardo - Atmosphere"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-20 contrast-125 scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-b from-[#050505]/90 via-[#050505]/70 to-[#050505] z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(153,0,0,0.12)_0%,transparent_70%)] z-10" />
        </div>

        {/* Top Back Navigation */}
        <div className="absolute top-28 left-6 md:top-12 md:left-12 z-40">
          <Link
            href="/format"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors uppercase tracking-widest"
          >
            <ArrowLeft size={14} /> Tutti i Format
          </Link>
        </div>

        {/* Hero Content */}
        <div className="relative z-30 max-w-4xl mx-auto text-center space-y-8">
          
          {/* Brand Hierarchy Header */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-[11px] md:text-xs font-bold uppercase tracking-[0.4em] text-accent-gold">
              BLACK BULLS LAB PRESENTA
            </span>
            <span className="inline-block px-4 py-1.5 border border-[#990000]/40 bg-[#990000]/10 text-red-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] rounded-full">
              UN’ESPERIENZA LIAR SYSTEM
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-heading font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight text-white leading-[0.95]">
            A CENA CON IL <br />
            <span className="text-[#990000] italic drop-shadow-[0_0_25px_rgba(153,0,0,0.5)]">
              BUGIARDO
            </span>
          </h1>

          {/* Subheading Claim & Question */}
          <div className="space-y-4 max-w-2xl mx-auto">
            <p className="text-base md:text-xl font-bold uppercase tracking-widest text-zinc-200">
              UNA CENA. UN BUGIARDO. NESSUN ATTORE.
            </p>
            <p className="text-xl md:text-3xl font-heading font-bold text-accent-gold italic tracking-wide">
              &ldquo;DI CHI TI FIDI?&rdquo;
            </p>
          </div>

          {/* Confirmed Pilot Information Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-4 text-left">
            <div className="p-3 bg-zinc-900/60 border border-white/10 rounded-xl backdrop-blur-md">
              <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
                <MapPin size={14} className="text-[#990000]" /> Città
              </div>
              <p className="text-sm font-bold text-white uppercase">Torino</p>
            </div>

            <div className="p-3 bg-zinc-900/60 border border-white/10 rounded-xl backdrop-blur-md">
              <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
                <Calendar size={14} className="text-[#990000]" /> Periodo
              </div>
              <p className="text-sm font-bold text-white uppercase">Fine Settembre 2026</p>
            </div>

            <div className="p-3 bg-zinc-900/60 border border-white/10 rounded-xl backdrop-blur-md">
              <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
                <Sparkles size={14} className="text-[#990000]" /> Edizione
              </div>
              <p className="text-sm font-bold text-white uppercase">Sessione Pilota</p>
            </div>

            <div className="p-3 bg-zinc-900/60 border border-white/10 rounded-xl backdrop-blur-md">
              <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
                <Users size={14} className="text-[#990000]" /> Capienza
              </div>
              <p className="text-sm font-bold text-white uppercase">30–40 Partecipanti</p>
            </div>
          </div>

          {/* Hero CTAs */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#lista-attesa"
              className="w-full sm:w-auto px-8 py-4 bg-[#990000] hover:bg-[#B30000] text-white font-heading font-bold uppercase tracking-widest text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(153,0,0,0.4)] text-center cursor-pointer"
            >
              Entra nella lista d&apos;attesa
            </a>
            <a
              href="#cos-e"
              className="w-full sm:w-auto px-8 py-4 bg-zinc-900/80 hover:bg-zinc-800 border border-white/15 text-zinc-200 font-heading font-bold uppercase tracking-widest text-sm rounded-xl transition-all text-center cursor-pointer"
            >
              Scopri l&apos;esperienza
            </a>
          </div>
        </div>
      </section>

      {/* 2. COS'È */}
      <section id="cos-e" className="py-20 px-6 md:px-12 max-w-6xl mx-auto border-b border-white/5">
        <div className="space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-[#990000]">
              IL FORMAT SOCIALE
            </h2>
            <h3 className="font-heading text-3xl md:text-5xl font-extrabold uppercase text-white tracking-tight">
              COS&apos;È A CENA CON IL BUGIARDO
            </h3>
            <p className="text-base md:text-xl text-zinc-300 leading-relaxed font-light pt-2">
              <strong className="text-white font-semibold">A Cena con il Bugiardo</strong> è un’esperienza sociale costruita attorno alla fiducia. Durante la cena ricevi informazioni, osservi le persone e scegli che cosa condividere.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
            
            <div className="p-6 bg-zinc-900/40 border border-white/10 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#990000]/10 border border-[#990000]/30 flex items-center justify-center text-[#990000]">
                <Users size={24} />
              </div>
              <h4 className="font-heading text-lg font-bold text-white uppercase">Nessun Attore</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Tutti i presenti al tavolo sono giocatori reali. Nessun personaggio pagato recita una parte: le dinamiche nascono unicamente da chi è seduto con te.
              </p>
            </div>

            <div className="p-6 bg-zinc-900/40 border border-white/10 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#990000]/10 border border-[#990000]/30 flex items-center justify-center text-[#990000]">
                <ShieldCheck size={24} />
              </div>
              <h4 className="font-heading text-lg font-bold text-white uppercase">Nessun Obbligo</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Non serve saper recitare o salire sul palco. Mantieni la tua personalità, valuta le informazioni e decidi liberamente come condurre il gioco.
              </p>
            </div>

            <div className="p-6 bg-zinc-900/40 border border-white/10 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#990000]/10 border border-[#990000]/30 flex items-center justify-center text-[#990000]">
                <Search size={24} />
              </div>
              <h4 className="font-heading text-lg font-bold text-white uppercase">Tutti Partecipano</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Il gioco accade principalmente al tavolo tra una portata e l&apos;altra. Ogni conversazione e ogni sguardo possono fare la differenza.
              </p>
            </div>

            <div className="p-6 bg-zinc-900/40 border border-white/10 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#990000]/10 border border-[#990000]/30 flex items-center justify-center text-[#990000]">
                <Smartphone size={24} />
              </div>
              <h4 className="font-heading text-lg font-bold text-white uppercase">Smartphone Discreto</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Il telefono serve solo per ricevere in riservatezza brevi istruzioni, indizi, missioni ed esprimere il voto prima del reveal finale.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. COME FUNZIONA */}
      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto border-b border-white/5">
        <div className="space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-accent-gold">
              LE DINAMICHE
            </h2>
            <h3 className="font-heading text-3xl md:text-5xl font-extrabold uppercase text-white tracking-tight">
              COME FUNZIONA LA SERATA
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="relative p-8 bg-zinc-950 border border-white/10 rounded-2xl space-y-4">
              <span className="text-4xl font-heading font-extrabold text-[#990000]/40">01</span>
              <h4 className="font-heading text-xl font-bold uppercase text-white">Ricevi il tuo ruolo</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                All&apos;inizio della serata ricevi sul tuo smartphone le tue credenziali riservate ed il tuo obiettivo segreto.
              </p>
            </div>

            <div className="relative p-8 bg-zinc-950 border border-white/10 rounded-2xl space-y-4">
              <span className="text-4xl font-heading font-extrabold text-[#990000]/40">02</span>
              <h4 className="font-heading text-xl font-bold uppercase text-white">Parla e osserva</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Durante la cena dialoga con gli altri commensali. Ascolta chi racconta, chi devia le domande e chi esita.
              </p>
            </div>

            <div className="relative p-8 bg-zinc-950 border border-white/10 rounded-2xl space-y-4">
              <span className="text-4xl font-heading font-extrabold text-[#990000]/40">03</span>
              <h4 className="font-heading text-xl font-bold uppercase text-white">Raccogli gli indizi</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Analizza gli elementi inviati al tuo tavolo, le incongruenze nelle storie ed i comportamenti sospetti.
              </p>
            </div>

            <div className="relative p-8 bg-zinc-950 border border-white/10 rounded-2xl space-y-4">
              <span className="text-4xl font-heading font-extrabold text-[#990000]/40">04</span>
              <h4 className="font-heading text-xl font-bold uppercase text-white">Decidi di chi fidarti</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Prima del dolce esprimi il tuo verdetto. Smaschera il Bugiardo o proteggi la tua vera identità.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. QUELLO CHE NON È */}
      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto border-b border-white/5">
        <div className="space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-red-500">
              CHIAREZZA ED ASPETTATIVE
            </h2>
            <h3 className="font-heading text-3xl md:text-5xl font-extrabold uppercase text-white tracking-tight">
              QUELLO CHE NON È
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="p-6 bg-zinc-900/30 border border-red-950/50 rounded-2xl flex items-start gap-4">
              <XCircle className="text-[#990000] shrink-0 mt-0.5" size={22} />
              <div>
                <h4 className="font-heading text-sm font-bold uppercase text-white">Non è una cena con delitto</h4>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Nessun omicidio da investigare o indizi polizieschi tradizionali. È una cena incentrata sulla deduzione sociale e sulla psicologia della fiducia.
                </p>
              </div>
            </div>

            <div className="p-6 bg-zinc-900/30 border border-red-950/50 rounded-2xl flex items-start gap-4">
              <XCircle className="text-[#990000] shrink-0 mt-0.5" size={22} />
              <div>
                <h4 className="font-heading text-sm font-bold uppercase text-white">Non è teatro</h4>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Non ci sono attori in costume che recitano uno copione preconfezionato. Siete tutti invitati attivi dello stesso tavolo.
                </p>
              </div>
            </div>

            <div className="p-6 bg-zinc-900/30 border border-red-950/50 rounded-2xl flex items-start gap-4">
              <XCircle className="text-[#990000] shrink-0 mt-0.5" size={22} />
              <div>
                <h4 className="font-heading text-sm font-bold uppercase text-white">Non devi recitare</h4>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Nessuna battuta da memorizzare o performance richiesta. Puoi essere del tutto te stesso o scegliere quanta verità rivelare.
                </p>
              </div>
            </div>

            <div className="p-6 bg-zinc-900/30 border border-red-950/50 rounded-2xl flex items-start gap-4">
              <XCircle className="text-[#990000] shrink-0 mt-0.5" size={22} />
              <div>
                <h4 className="font-heading text-sm font-bold uppercase text-white">Non devi conoscere gli altri</h4>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Puoi partecipare da solo, in coppia o con amici. Il format è pensato per favorire il dialogo sia tra conoscenti che tra sconosciuti.
                </p>
              </div>
            </div>

            <div className="p-6 bg-zinc-900/30 border border-red-950/50 rounded-2xl flex items-start gap-4">
              <XCircle className="text-[#990000] shrink-0 mt-0.5" size={22} />
              <div>
                <h4 className="font-heading text-sm font-bold uppercase text-white">Non stai sempre sul telefono</h4>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Il cellulare si consulta solo in brevi momenti specifici per leggere gli aggiornamenti. Il gioco vero accade negli sguardi al tavolo.
                </p>
              </div>
            </div>

            <div className="p-6 bg-zinc-900/30 border border-red-950/50 rounded-2xl flex items-start gap-4">
              <XCircle className="text-[#990000] shrink-0 mt-0.5" size={22} />
              <div>
                <h4 className="font-heading text-sm font-bold uppercase text-white">Non sei uno spettatore passivo</h4>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Non guardi uno show da lontano. Le tue scelte, le tue domande ed il tuo voto influenzano direttamente l&apos;esito della serata.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. MOMENTO EMOTIVO */}
      <section className="py-24 px-6 relative bg-linear-to-b from-[#050505] via-[#120303] to-[#050505] border-b border-white/5 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
          <span className="text-xs font-bold uppercase tracking-[0.5em] text-accent-gold">
            ESPERIMENTO SOCIALE
          </span>
          <blockquote className="font-heading text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase text-white leading-tight tracking-tight">
            &ldquo;Il momento più importante non è quando scopri il Bugiardo. <br className="hidden sm:inline" />
            <span className="text-[#990000] italic">È quando smetti di credere agli altri.&rdquo;</span>
          </blockquote>
          <p className="text-xs md:text-sm text-zinc-400 tracking-widest uppercase font-semibold">
            — Liar System · Black Bulls Lab
          </p>
        </div>
      </section>

      {/* 6. LISTA D'ATTESA FORM */}
      <section id="lista-attesa" className="py-24 px-4 md:px-8 max-w-3xl mx-auto scroll-mt-12">
        <div className="bg-zinc-950 border border-white/10 rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl space-y-8 relative overflow-hidden">
          
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-[#990000] via-accent-gold to-[#990000]" />

          <div className="text-center space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-[#990000]">
              SESSIONE PILOTA · TORINO
            </h2>
            <h3 className="font-heading text-3xl sm:text-4xl font-extrabold uppercase text-white">
              ENTRA NELLA LISTA
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed max-w-xl mx-auto">
              Riceverai in anteprima data, locale e apertura delle prenotazioni della prima sessione pilota di Torino.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs font-medium text-zinc-400">
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={14} className="text-[#990000]" /> Nessun pagamento ora</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={14} className="text-[#990000]" /> Da soli, in coppia o in gruppo</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={14} className="text-[#990000]" /> Posti limitati (30–40)</span>
            </div>
          </div>

          {/* Feedback Messages */}
          {errorMsg && (
            <div className="p-4 bg-red-950/80 border border-red-500/50 rounded-xl text-red-200 text-sm flex items-start gap-3">
              <ShieldAlert className="shrink-0 text-red-400 mt-0.5" size={18} />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg ? (
            <div className="p-8 bg-zinc-900 border border-[#990000]/50 rounded-2xl text-center space-y-4">
              <div className="w-16 h-16 bg-[#990000]/20 text-red-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={36} />
              </div>
              <h4 className="font-heading text-2xl font-bold text-white uppercase">ISCRIZIONE CONFERMATA</h4>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {successMsg}
              </p>
              <p className="text-xs text-zinc-400">
                Ti invieremo un messaggio riservato appena verrà ufficializzata la location ed aperta la finestra di prenotazione.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Honeypot field for bot suppression */}
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Nome e Cognome */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-zinc-300">
                    Nome e Cognome <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Mario Rossi"
                    autoComplete="name"
                    className="w-full px-4 py-3.5 bg-zinc-900/90 border border-white/15 rounded-xl text-white text-sm focus:outline-hidden focus:border-[#990000] focus:ring-1 focus:ring-[#990000] transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-zinc-300">
                    Indirizzo Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="mario.rossi@example.com"
                    autoComplete="email"
                    className="w-full px-4 py-3.5 bg-zinc-900/90 border border-white/15 rounded-xl text-white text-sm focus:outline-hidden focus:border-[#990000] focus:ring-1 focus:ring-[#990000] transition-colors"
                  />
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                {/* Numero WhatsApp */}
                <div className="sm:col-span-2 space-y-2">
                  <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-zinc-300">
                    Numero WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+39 333 1234567"
                    autoComplete="tel"
                    className="w-full px-4 py-3.5 bg-zinc-900/90 border border-white/15 rounded-xl text-white text-sm focus:outline-hidden focus:border-[#990000] focus:ring-1 focus:ring-[#990000] transition-colors"
                  />
                </div>

                {/* Numero Partecipanti */}
                <div className="space-y-2">
                  <label htmlFor="guests_count" className="block text-xs font-bold uppercase tracking-wider text-zinc-300">
                    Partecipanti <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="guests_count"
                    name="guests_count"
                    value={formData.guests_count}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 bg-zinc-900/90 border border-white/15 rounded-xl text-white text-sm focus:outline-hidden focus:border-[#990000] focus:ring-1 focus:ring-[#990000] transition-colors"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num} className="bg-zinc-900 text-white">
                        {num} {num === 1 ? "Persona" : "Persone"}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Città */}
              <div className="space-y-2">
                <label htmlFor="city" className="block text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Città di Riferimento
                </label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Torino"
                  className="w-full px-4 py-3.5 bg-zinc-900/90 border border-white/15 rounded-xl text-white text-sm focus:outline-hidden focus:border-[#990000] focus:ring-1 focus:ring-[#990000] transition-colors"
                />
              </div>

              {/* Consensi Privacy & Marketing */}
              <div className="space-y-4 pt-2">
                
                {/* Consenso Evento (Obbligatorio) */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="event_consent"
                    checked={formData.event_consent}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 rounded-sm border-white/20 bg-zinc-900 text-[#990000] focus:ring-[#990000]"
                  />
                  <span className="text-xs text-zinc-400 leading-relaxed">
                    Accetto l&apos;informativa della <Link href="/privacy-policy" target="_blank" className="text-white underline hover:text-accent-gold">Privacy Policy</Link> e acconsento a ricevere comunicazioni via Email/WhatsApp strettamente inerenti alla sessione pilota ed all&apos;apertura delle prenotazioni per <em>A Cena con il Bugiardo</em>. <span className="text-red-500">*</span>
                  </span>
                </label>

                {/* Consenso Marketing (Facoltativo) */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="marketing_consent"
                    checked={formData.marketing_consent}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 rounded-sm border-white/20 bg-zinc-900 text-[#990000] focus:ring-[#990000]"
                  />
                  <span className="text-xs text-zinc-400 leading-relaxed">
                    (Facoltativo) Desidero ricevere inviti ed anteprime anche per gli altri format esperienziali ed eventi futuri targati Black Bulls Lab.
                  </span>
                </label>

              </div>

              {/* Cloudflare Turnstile integration */}
              {turnstileSiteKey && (
                <div className="pt-2 flex justify-center">
                  <Turnstile
                    siteKey={turnstileSiteKey}
                    onSuccess={(token) => setTurnstileToken(token)}
                    options={{ action: "liar_waitlist" }}
                  />
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 bg-[#990000] hover:bg-[#B30000] text-white font-heading font-bold uppercase tracking-widest text-sm rounded-xl transition-all shadow-[0_0_25px_rgba(153,0,0,0.5)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Registrazione in corso...
                  </>
                ) : (
                  <>
                    Entra nella lista d&apos;attesa <ArrowRight size={16} />
                  </>
                )}
              </button>

            </form>
          )}

        </div>
      </section>

      {/* 7. CHIUSURA & BRAND FOOTER LINK */}
      <footer className="py-16 px-6 text-center border-t border-white/5 space-y-6">
        <p className="font-heading text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-zinc-400">
          A CENA CON IL BUGIARDO · UN’ESPERIENZA LIAR SYSTEM · BY BLACK BULLS LAB
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500 uppercase tracking-widest pt-2">
          <Link href="/format" className="hover:text-white transition-colors">Tutti i Format</Link>
          <span>·</span>
          <Link href="/eventi-privati" className="hover:text-white transition-colors">Feste Private</Link>
          <span>·</span>
          <Link href="/eventi-aziendali" className="hover:text-white transition-colors">Eventi Aziendali</Link>
          <span>·</span>
          <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
        </div>
      </footer>

    </main>
  );
}
