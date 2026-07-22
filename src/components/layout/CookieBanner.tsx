"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Shield, ChevronDown, ChevronUp } from "lucide-react";
function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return undefined;
}

function setCookie(name: string, value: string, days = 365) {
  if (typeof document === "undefined") return;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `; expires=${date.toUTCString()}`;
  document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/; SameSite=Lax`;
}

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const handleOpen = () => {
      setIsVisible(true);
      setShowCustomize(true); // Apre direttamente le preferenze per comodità
    };
    window.addEventListener("open-cookie-banner", handleOpen);

    // Controlla se l'utente ha già espresso il consenso
    const consent = getCookie("bbl_cookie_consent");
    if (!consent) {
      // Mostra il banner dopo 1.5 secondi per un effetto premium
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("open-cookie-banner", handleOpen);
      };
    }
    return () => window.removeEventListener("open-cookie-banner", handleOpen);
  }, []);

  const handleAcceptAll = () => {
    const consentValue = { necessary: true, analytics: true, marketing: true };
    setCookie("bbl_cookie_consent", JSON.stringify(consentValue), 365);
    setIsVisible(false);
  };

  const handleDeclineAll = () => {
    const consentValue = { necessary: true, analytics: false, marketing: false };
    setCookie("bbl_cookie_consent", JSON.stringify(consentValue), 365);
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    setCookie("bbl_cookie_consent", JSON.stringify(preferences), 365);
    setIsVisible(false);
  };

  const togglePreference = (key: "analytics" | "marketing") => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-20 left-4 right-4 md:bottom-6 md:left-6 md:right-auto md:max-w-md z-9999 bg-black-pure/95 border border-white/8 backdrop-blur-md p-5 md:p-6 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col gap-4 text-left transition-all duration-700 ease-out animate-in fade-in slide-in-from-bottom-8"
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
    >
      {/* Intestazione */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-accent-gold/10 rounded-md border border-accent-gold/20">
          <Shield className="text-accent-gold w-5 h-5" />
        </div>
        <h3 id="cookie-title" className="font-syne text-sm font-bold uppercase tracking-widest text-white">
          Controllo Privacy
        </h3>
      </div>

      {/* Descrizione */}
      <p id="cookie-desc" className="font-sans text-xs text-gray-400 leading-relaxed">
        Utilizziamo cookie per migliorare la tua esperienza con il nostro Dinner & Show e analizzare il traffico del sito. Cliccando su &quot;Accetta Tutti&quot; acconsenti al loro utilizzo. Leggi la nostra{" "}
        <Link href="/cookie-policy" className="text-accent-gold hover:underline">
          Cookie Policy
        </Link>
        .
      </p>

      {/* Personalizzazione Preferenze */}
      {showCustomize && (
        <div className="space-y-3 pt-3 border-t border-white/5 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-sans text-xs font-semibold text-white">Cookie Necessari</span>
              <span className="font-sans text-[10px] text-gray-500">Essenziali per la Web App.</span>
            </div>
            <input
              type="checkbox"
              checked
              disabled
              className="w-4 h-4 rounded-sm border-gray-800 bg-transparent text-accent-gold focus:ring-accent-gold focus:ring-offset-0 opacity-50 cursor-not-allowed"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-sans text-xs font-semibold text-white">Cookie Analitici</span>
              <span className="font-sans text-[10px] text-gray-500">Statistiche d&apos;uso anonime.</span>
            </div>
            <input
              type="checkbox"
              checked={preferences.analytics}
              onChange={() => togglePreference("analytics")}
              className="w-4 h-4 rounded-sm border-gray-800 bg-transparent text-accent-gold focus:ring-accent-gold focus:ring-offset-0 cursor-pointer accent-accent-gold"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-sans text-xs font-semibold text-white">Cookie di Marketing</span>
              <span className="font-sans text-[10px] text-gray-500">Pixel pubblicitari e retargeting.</span>
            </div>
            <input
              type="checkbox"
              checked={preferences.marketing}
              onChange={() => togglePreference("marketing")}
              className="w-4 h-4 rounded-sm border-gray-800 bg-transparent text-accent-gold focus:ring-accent-gold focus:ring-offset-0 cursor-pointer accent-accent-gold"
            />
          </div>
        </div>
      )}

      {/* Pulsanti Azione */}
      <div className="flex flex-col gap-2 pt-2">
        {showCustomize ? (
          <button
            onClick={handleSavePreferences}
            className="w-full bg-white hover:bg-gray-200 text-black font-syne text-[10px] font-bold uppercase tracking-wider py-3 transition-colors duration-300 rounded-sm"
          >
            Salva Preferenze
          </button>
        ) : (
          <>
            <button
              onClick={handleAcceptAll}
              className="w-full bg-accent-gold hover:bg-accent-gold-light text-black font-syne text-[10px] font-bold uppercase tracking-wider py-3 transition-colors duration-300 rounded-sm"
            >
              Accetta Tutti
            </button>
            <button
              onClick={handleDeclineAll}
              className="w-full border border-white/10 hover:border-white/20 text-white font-syne text-[10px] font-bold uppercase tracking-wider py-3 transition-colors duration-300 rounded-sm"
            >
              Solo Necessari
            </button>
          </>
        )}

        <button
          onClick={() => setShowCustomize(!showCustomize)}
          className="flex items-center justify-center gap-1 font-sans text-[10px] text-gray-500 hover:text-white mt-1 transition-colors py-1 cursor-pointer"
        >
          {showCustomize ? (
            <>
              Riduci Opzioni <ChevronUp className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              Personalizza Cookie <ChevronDown className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>

    </div>
  );
}
