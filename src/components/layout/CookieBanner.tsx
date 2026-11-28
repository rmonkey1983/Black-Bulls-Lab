"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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

function notifyConsentChange() {
  window.dispatchEvent(new Event("bbl-consent-updated"));
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
      try {
        const saved = JSON.parse(decodeURIComponent(getCookie("bbl_cookie_consent") || "{}"));
        setPreferences({ necessary: true, analytics: saved.analytics === true, marketing: saved.marketing === true });
      } catch {
        setPreferences({ necessary: true, analytics: false, marketing: false });
      }
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
    notifyConsentChange();
    setIsVisible(false);
  };

  const handleDeclineAll = () => {
    const consentValue = { necessary: true, analytics: false, marketing: false };
    setCookie("bbl_cookie_consent", JSON.stringify(consentValue), 365);
    notifyConsentChange();
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    setCookie("bbl_cookie_consent", JSON.stringify(preferences), 365);
    notifyConsentChange();
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
      className="fixed bottom-[4.25rem] left-3 right-3 md:bottom-6 md:left-6 md:right-auto md:max-w-sm z-45 bg-black-pure border border-white/20 p-4 md:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col gap-3 text-left max-h-[calc(100dvh-7rem)] overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-300"
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
    >
      <div>
        <p id="cookie-title" className="font-inter text-sm font-semibold text-white">Cookie e privacy</p>
        <p id="cookie-desc" className="mt-1 font-inter text-sm text-zinc-300 leading-snug">
          Usiamo cookie necessari e, con il tuo consenso, statistiche di visita.{" "}
          <Link href="/cookie-policy" className="text-accent-gold underline">Cookie Policy</Link>
          {" · "}
          <button type="button" aria-expanded={showCustomize} onClick={() => setShowCustomize(!showCustomize)} className="text-accent-gold underline hover:text-white">
            {showCustomize ? "Riduci opzioni" : "Personalizza"}
          </button>
        </p>
      </div>

      {/* Personalizzazione Preferenze */}
      {showCustomize && (
        <div className="space-y-3 pt-3 border-t border-white/5 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-inter text-sm font-semibold text-white">Cookie Necessari</span>
              <span className="font-inter text-xs text-zinc-400">Essenziali per il funzionamento del sito.</span>
            </div>
            <input
              type="checkbox"
              aria-label="Cookie Necessari"
              checked
              disabled
              className="w-4 h-4 rounded-sm border-gray-800 bg-transparent text-accent-gold focus:ring-accent-gold focus:ring-offset-0 opacity-50 cursor-not-allowed"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-inter text-sm font-semibold text-white">Cookie Analitici</span>
              <span className="font-inter text-xs text-zinc-400">Statistiche d&apos;uso anonime.</span>
            </div>
            <input
              type="checkbox"
              aria-label="Cookie Analitici"
              checked={preferences.analytics}
              onChange={() => togglePreference("analytics")}
              className="w-4 h-4 rounded-sm border-gray-800 bg-transparent text-accent-gold focus:ring-accent-gold focus:ring-offset-0 cursor-pointer accent-accent-gold"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-inter text-sm font-semibold text-white">Cookie di Marketing</span>
              <span className="font-inter text-xs text-zinc-400">Pixel pubblicitari e retargeting.</span>
            </div>
            <input
              type="checkbox"
              aria-label="Cookie di Marketing"
              checked={preferences.marketing}
              onChange={() => togglePreference("marketing")}
              className="w-4 h-4 rounded-sm border-gray-800 bg-transparent text-accent-gold focus:ring-accent-gold focus:ring-offset-0 cursor-pointer accent-accent-gold"
            />
          </div>
        </div>
      )}

      {showCustomize ? (
        <button type="button" onClick={handleSavePreferences} className="w-full bg-white text-black hover:bg-zinc-200 min-h-11 px-3 font-inter text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold">
          Salva preferenze
        </button>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          <button type="button" onClick={handleDeclineAll} className="bg-white text-black hover:bg-zinc-200 min-h-11 px-3 font-inter text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold">
            Solo necessari
          </button>
          <button type="button" onClick={handleAcceptAll} className="bg-white text-black hover:bg-zinc-200 min-h-11 px-3 font-inter text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold">
            Accetta tutti
          </button>
        </div>
      )}


    </div>
  );
}
