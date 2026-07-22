"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { X, Menu, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, CONTACT_WHATSAPP, SOCIAL_LINKS } from "@/lib/constants";

const WA_MSG = encodeURIComponent(
  "Ciao! Vorrei informazioni su un'esperienza con Black Bulls Lab"
);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
  }, [menuOpen]);

  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out",
        scrolled
          ? "h-16 lg:h-20 bg-black-pure/85 backdrop-blur-xl border-b border-white/6"
          : "h-20 lg:h-24 bg-transparent border-b border-transparent"
      )}
    >
      {/* Gold accent line at very top */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-px transition-opacity duration-700",
          scrolled ? "opacity-100" : "opacity-0"
        )}
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(200,169,107,0.3) 30%, rgba(200,169,107,0.3) 70%, transparent)",
        }}
      />

      <div className="max-w-360 mx-auto h-full flex items-center justify-between px-6 md:px-10 relative">

        {/* LOGO */}
        <div className="flex-none">
          <Link
            href="/"
            aria-label="Black Bulls Lab — Home"
            className="relative z-110"
            onClick={() => setMenuOpen(false)}
            suppressHydrationWarning
          >
            <Image
              src="/brand/logo-white.svg"
              alt="Black Bulls Lab"
              width={160}
              height={36}
              priority
              style={{ width: "auto", height: "auto" }}
              className={cn(
                "transition-all duration-700 h-auto",
                scrolled ? "w-25 lg:w-30" : "w-30 lg:w-36.25"
              )}
            />
          </Link>
        </div>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-10 ml-auto mr-10">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                suppressHydrationWarning
                className={cn(
                  "font-syne text-[9px] uppercase tracking-[0.45em] transition-colors duration-500 hover:text-accent-gold relative group",
                  pathname === link.href
                    ? "text-accent-gold"
                    : "text-text-primary/50"
                )}
              >
                {link.label}
                <span
                  suppressHydrationWarning
                  className={cn(
                    "absolute -bottom-1 left-0 h-px bg-accent-gold transition-all duration-500 group-hover:w-full",
                    pathname === link.href ? "w-full" : "w-0"
                  )}
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:block flex-none">
          <Link
            href="/calendario"
            suppressHydrationWarning
            className="relative px-8 py-3.5 bg-accent-gold text-black-pure font-syne text-[11px] font-extrabold uppercase tracking-[0.25em] overflow-hidden transition-all duration-500 group hover:shadow-[0_0_35px_rgba(200,169,107,0.4)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Prenota Ora <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden relative z-[110] p-2 text-text-primary hover:text-accent-gold transition-colors duration-500"
          aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <X size={22} strokeWidth={1.5} />
          ) : (
            <Menu size={22} strokeWidth={1.5} />
          )}
        </button>
      </div>

      {/* ── MOBILE MENU ── */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-[100] bg-black-pure transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]",
          menuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-full"
        )}
      >
        <div className="fixed inset-0 bg-black-pure z-[100] flex flex-col justify-between p-8 md:p-16 pt-32 pb-12 overflow-y-auto">

          {/* Background Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-gold/5 rounded-full blur-[150px] pointer-events-none" />

          {/* Navigation Links */}
          <div className="relative z-10 flex flex-col space-y-6 md:space-y-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-baseline justify-between border-b border-white/5 pb-4"
                >
                  <span className={cn(
                    "font-syne text-3xl font-bold uppercase tracking-tighter transition-colors duration-500",
                    isActive ? "text-accent-gold" : "text-text-primary group-hover:text-accent-gold"
                  )}>
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Socials & WhatsApp Footer */}
          <div className="relative z-10 space-y-8 pt-8 border-t border-white/6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <p className="font-syne text-[9px] uppercase tracking-[0.4em] text-text-secondary/40 mb-2">
                  Diretto / WhatsApp
                </p>
                <a
                  href={`https://wa.me/${CONTACT_WHATSAPP}?text=${WA_MSG}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-syne text-lg md:text-xl font-bold text-accent-gold hover:underline"
                >
                  +{CONTACT_WHATSAPP.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})$/, "$1 $2 $3 $4")}
                </a>
              </div>

              <div className="flex items-center gap-6 border-t md:border-t-0 pt-6 md:pt-0 border-white/6">
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-syne text-[9px] uppercase tracking-widest text-text-secondary/40 hover:text-accent-gold transition-colors duration-500"
                  suppressHydrationWarning
                >
                  Instagram
                </a>
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-syne text-[9px] uppercase tracking-widest text-text-secondary/40 hover:text-accent-gold transition-colors duration-500"
                  suppressHydrationWarning
                >
                  Facebook
                </a>
                <a
                  href={SOCIAL_LINKS.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-syne text-[9px] uppercase tracking-widest text-text-secondary/40 hover:text-accent-gold transition-colors duration-500"
                  suppressHydrationWarning
                >
                  TikTok
                </a>
              </div>
              <span className="font-syne text-[8px] uppercase tracking-[0.3em] text-text-secondary/25 italic">
                Cinematic Universe
              </span>
            </div>
          </div>
        </div>

        {/* Film grain */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('/noise.webp')] mix-blend-overlay" />
      </div>
    </nav>
  );
}
