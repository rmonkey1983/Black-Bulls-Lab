"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Users, Smartphone, Search, ShieldAlert, ChevronDown, Loader2, CheckCircle2 } from "lucide-react";

export function ACenaConIlBugiardoClient() {
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    data_nascita: "",
    cap: "",
    email: "",
    cellulare: "",
    consenso_privacy: false,
    consenso_marketing: false
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [generatedNumber, setGeneratedNumber] = useState<string>("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.cognome || !formData.data_nascita || !formData.cap || !formData.email || !formData.consenso_privacy) {
      setStatus("error");
      setErrorMessage("Compila tutti i campi obbligatori ed accetta la privacy policy.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/whitelist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(result.error || "Si è verificato un errore durante l'invio. Riprova più tardi.");
        return;
      }

      setGeneratedNumber(result.ticketNumber || "");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage("Si è verificato un errore di connessione. Riprova più tardi.");
    }
  };

  const FAQS = [
    {
      q: "Ci sono attori professionisti?",
      a: "No, i protagonisti e gli investigatori siete voi. Tutti i partecipanti al tavolo sono giocatori attivi del Dinner & Show."
    },
    {
      q: "Devo saper recitare?",
      a: "Assolutamente no. Non c'è alcuna pressione o palcoscenico: devi semplicemente mentire, fare domande o scoprire chi sta dicendo il falso direttamente dal tuo tavolo."
    },
    {
      q: "Cosa mi serve per giocare?",
      a: "Ti serve solo il tuo smartphone con una connessione internet attiva. Non devi scaricare alcuna applicazione: accederai al sistema inquadrando il QR code al tavolo."
    },
    {
      q: "Come funziona l'estrazione della cena gratuita e il regolamento?",
      a: "Per partecipare all'estrazione di una cena per 2 persone, devi iscriverti alla White List. L'iniziativa è valida solo per i nuovi utenti: il sistema verificherà che Nome, Cognome ed Email non siano già presenti nel database. L'estrazione avverrà esattamente 1 settimana prima della data dell'evento. Il vincitore sarà contattato tramite i recapiti lasciati nel modulo."
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-red-600 selection:text-white flex flex-col items-center w-full relative overflow-x-hidden">
      
      {/* CSS overrides to isolate the landing page, hiding site-wide components */}
      <style dangerouslySetInnerHTML={{ __html: `
        nav, footer:not(.landing-footer), [class*="MobileStickyBookButton"], [class*="WhatsAppWidget"], [class*="BackToTop"], #back-to-top, .MobileStickyBookButton, .WhatsAppWidget, .BackToTop {
          display: none !important;
        }
      `}} />

      {/* 1. HEADER */}
      <header className="w-full py-8 text-center border-b border-white/[0.03] select-none">
        <span className="font-syne text-[10px] tracking-[0.5em] text-gray-500 uppercase">
          Black Bulls Lab Presenta
        </span>
      </header>

      {/* 2. HERO SECTION */}
      <section className="min-h-[75vh] flex flex-col justify-center items-center px-6 py-20 text-center max-w-4xl mx-auto w-full select-none">
        <span className="text-red-600 tracking-[0.3em] font-semibold text-xs mb-6 uppercase font-syne">
          Dinner & Show Immersivo
        </span>
        <h1 className="font-syne text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.95] text-white mb-8">
          A Cena Con Il <br className="hidden md:inline" />
          <span className="text-red-600">Bugiardo</span>
        </h1>
        <p className="font-sans text-lg md:text-2xl text-gray-400 font-light max-w-2xl mb-12 leading-relaxed">
          Il nuovo Dinner & Show immersivo. <br />
          Per due ore... nessuno dirà la verità.
        </p>
        <button
          onClick={() => document.getElementById("whitelist-form")?.scrollIntoView({ behavior: "smooth" })}
          className="inline-flex items-center justify-center px-10 py-5 bg-red-600 text-white text-xs font-bold tracking-[0.25em] uppercase hover:bg-white hover:text-red-600 transition-all duration-300 active:scale-95 cursor-pointer shadow-lg"
        >
          Entra Nella White List
        </button>
      </section>

      {/* 3. COME FUNZIONA SECTION */}
      <section className="py-24 md:py-36 px-6 max-w-5xl mx-auto w-full border-t border-white/[0.03]">
        <h2 className="font-syne text-3xl md:text-5xl font-bold tracking-tight uppercase text-center mb-20 text-white">
          Nessun attore. <br className="md:hidden" />
          I protagonisti siete voi.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {[
            {
              num: "01",
              title: "Siediti a tavola",
              desc: "Un gruppo di 20-30 persone, tra amici e sconosciuti, pronti a sfidarsi.",
              icon: <Users className="text-red-600 w-8 h-8 mb-4" />
            },
            {
              num: "02",
              title: "Ricevi indizi",
              desc: "Usa il tuo smartphone per consultare prove segrete e dossier in tempo reale.",
              icon: <Smartphone className="text-red-600 w-8 h-8 mb-4" />
            },
            {
              num: "03",
              title: "Indaga",
              desc: "Fai domande mirate, analizza i comportamenti e scova l'inganno al tavolo.",
              icon: <Search className="text-red-600 w-8 h-8 mb-4" />
            },
            {
              num: "04",
              title: "Vota e smaschera",
              desc: "Esprimi il tuo verdetto prima del dolce. Chi mente meglio vince la serata.",
              icon: <ShieldAlert className="text-red-600 w-8 h-8 mb-4" />
            }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-start space-y-4 border border-white/[0.02] bg-white/[0.01] p-6 hover:bg-white/[0.02] transition-colors duration-300">
              <div className="flex items-center justify-between w-full">
                {item.icon}
                <span className="font-syne text-sm font-semibold text-gray-700 tracking-wider">
                  {item.num}
                </span>
              </div>
              <h3 className="font-syne text-lg font-bold tracking-tight uppercase text-white">
                {item.title}
              </h3>
              <p className="font-sans text-sm text-gray-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FORM SECTION */}
      <section id="whitelist-form" className="py-24 md:py-36 bg-[#050505] w-full border-y border-white/[0.03] flex flex-col items-center">
        <div className="max-w-xl w-full px-6 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="font-syne text-3xl md:text-5xl font-bold tracking-tight uppercase text-white">
              Entra In Lista
            </h2>
            <p className="font-sans text-sm md:text-base text-gray-400 leading-relaxed">
              Registrati per accedere alle prossime date dell&apos;evento. L&apos;iscrizione assegna un numero univoco per l&apos;estrazione di una cena gratuita per 2 persone. L&apos;iniziativa è riservata esclusivamente ai <strong>NUOVI UTENTI</strong> (nuovo Nome, Cognome ed Email).
            </p>
          </div>

          {status === "success" ? (
            <div className="bg-white/[0.02] border border-red-600/30 p-8 text-center space-y-6">
              <CheckCircle2 className="text-red-600 w-16 h-16 mx-auto animate-pulse" />
              <div className="space-y-2">
                <h3 className="font-syne text-2xl font-bold uppercase text-white">Iscrizione completata</h3>
                <p className="font-sans text-gray-400 text-sm">
                  Il tuo numero univoco per l&apos;estrazione è:
                </p>
              </div>
              <div className="inline-block bg-red-600/10 border border-red-600/40 text-red-600 font-mono text-3xl font-bold px-8 py-4 tracking-widest">
                {generatedNumber.startsWith("BGL-") ? generatedNumber : `#${generatedNumber}`}
              </div>
              <p className="font-sans text-xs text-gray-500">
                Conserva questo codice. Abbiamo inviato una copia e i dettagli dell&apos;evento alla tua email.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label htmlFor="nome" className="font-syne text-[10px] tracking-widest text-gray-500 uppercase">
                    Nome *
                  </label>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    required
                    value={formData.nome}
                    onChange={handleInputChange}
                    placeholder="Emanuele"
                    className="block w-full bg-transparent border-b border-gray-800 py-3 text-white focus:outline-none focus:border-red-600 transition-colors placeholder:text-gray-700 text-sm font-light"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="cognome" className="font-syne text-[10px] tracking-widest text-gray-500 uppercase">
                    Cognome *
                  </label>
                  <input
                    id="cognome"
                    name="cognome"
                    type="text"
                    required
                    value={formData.cognome}
                    onChange={handleInputChange}
                    placeholder="Rossi"
                    className="block w-full bg-transparent border-b border-gray-800 py-3 text-white focus:outline-none focus:border-red-600 transition-colors placeholder:text-gray-700 text-sm font-light"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label htmlFor="data_nascita" className="font-syne text-[10px] tracking-widest text-gray-500 uppercase">
                    Data di Nascita *
                  </label>
                  <input
                    id="data_nascita"
                    name="data_nascita"
                    type="date"
                    required
                    value={formData.data_nascita}
                    onChange={handleInputChange}
                    className="block w-full bg-transparent border-b border-gray-800 py-3 text-white focus:outline-none focus:border-red-600 transition-colors text-sm font-light appearance-none"
                    style={{ colorScheme: "dark" }}
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="cap" className="font-syne text-[10px] tracking-widest text-gray-500 uppercase">
                    CAP *
                  </label>
                  <input
                    id="cap"
                    name="cap"
                    type="text"
                    required
                    value={formData.cap}
                    onChange={handleInputChange}
                    placeholder="10100"
                    className="block w-full bg-transparent border-b border-gray-800 py-3 text-white focus:outline-none focus:border-red-600 transition-colors placeholder:text-gray-700 text-sm font-light"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label htmlFor="email" className="font-syne text-[10px] tracking-widest text-gray-500 uppercase">
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="nome@esempio.it"
                    className="block w-full bg-transparent border-b border-gray-800 py-3 text-white focus:outline-none focus:border-red-600 transition-colors placeholder:text-gray-700 text-sm font-light"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="cellulare" className="font-syne text-[10px] tracking-widest text-gray-500 uppercase">
                    Cellulare (Opzionale)
                  </label>
                  <input
                    id="cellulare"
                    name="cellulare"
                    type="tel"
                    value={formData.cellulare}
                    onChange={handleInputChange}
                    placeholder="+39 333 1234567"
                    className="block w-full bg-transparent border-b border-gray-800 py-3 text-white focus:outline-none focus:border-red-600 transition-colors placeholder:text-gray-700 text-sm font-light"
                  />
                </div>
              </div>

              {/* GDPR Checks */}
              <div className="space-y-4 pt-4 border-t border-white/[0.02]">
                <div className="flex items-start gap-4">
                  <input
                    id="consenso_privacy"
                    name="consenso_privacy"
                    type="checkbox"
                    required
                    checked={formData.consenso_privacy}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 rounded-sm border-gray-800 bg-transparent text-red-600 focus:ring-red-600 focus:ring-offset-0 cursor-pointer accent-red-600"
                  />
                  <label htmlFor="consenso_privacy" className="font-sans text-xs text-gray-400 leading-relaxed cursor-pointer select-none">
                    Ho letto l&apos;Informativa sulla Privacy e accetto il trattamento dei dati per l&apos;iscrizione alla White List. *
                  </label>
                </div>
                <div className="flex items-start gap-4">
                  <input
                    id="consenso_marketing"
                    name="consenso_marketing"
                    type="checkbox"
                    checked={formData.consenso_marketing}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 rounded-sm border-gray-800 bg-transparent text-red-600 focus:ring-red-600 focus:ring-offset-0 cursor-pointer accent-red-600"
                  />
                  <label htmlFor="consenso_marketing" className="font-sans text-xs text-gray-400 leading-relaxed cursor-pointer select-none">
                    Voglio ricevere sconti e novità! Accetto di ricevere comunicazioni promozionali via Email o WhatsApp da Black Bulls Lab e partner per eventi e format.
                  </label>
                </div>
              </div>

              {status === "error" && (
                <div className="text-red-500 font-sans text-xs text-center font-medium bg-red-950/20 border border-red-900/30 py-3 px-4">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full py-5 bg-red-600 hover:bg-white hover:text-red-600 text-white font-bold tracking-[0.25em] uppercase text-xs transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Elaborazione...
                  </>
                ) : (
                  "Iscriviti E Ricevi Il Tuo Numero"
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section className="py-24 md:py-36 px-6 max-w-3xl mx-auto w-full">
        <h2 className="font-syne text-3xl md:text-5xl font-bold tracking-tight uppercase text-center mb-16 text-white">
          Domande Frequenti
        </h2>
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="border-b border-white/[0.04] pb-4">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between py-4 text-left group focus:outline-none"
                >
                  <span className="font-syne text-sm md:text-base font-semibold tracking-wider text-gray-300 group-hover:text-white transition-colors uppercase">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 group-hover:text-red-600 transition-transform duration-300 ${
                      isOpen ? "transform rotate-180 text-red-600" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="font-sans text-sm text-gray-400 leading-relaxed pb-4">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="landing-footer w-full py-16 text-center border-t border-white/[0.03] mt-auto">
        <p className="font-sans text-[10px] text-gray-500 uppercase tracking-widest mb-4">
          © {new Date().getFullYear()} Black Bulls Lab. Tutti i diritti riservati.
        </p>
        <div className="flex justify-center gap-6">
          <Link href="/privacy-policy" className="font-sans text-[9px] text-gray-600 hover:text-red-600 transition-colors uppercase tracking-wider">
            Privacy Policy
          </Link>
          <span className="text-gray-800 text-[9px]">/</span>
          <Link href="/cookie-policy" className="font-sans text-[9px] text-gray-600 hover:text-red-600 transition-colors uppercase tracking-wider">
            Cookie Policy
          </Link>
        </div>
      </footer>

    </div>
  );
}
