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
          ? "h-16 lg:h-20 bg-black-pure/85 backdrop-blur-xl border-b border-white/[0.06]"
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

      <div className="max-w-[1440px] mx-auto h-full flex items-center justify-between px-6 md:px-10 relative">

        {/* LOGO */}
        <div className="flex-none">
          <Link
            href="/"
            aria-label="Black Bulls Lab — Home"
            className="relative z-[110]"
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
                scrolled ? "w-[100px] lg:w-[120px]" : "w-[120px] lg:w-[145px]"
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
            className="relative overflow-hidden group font-syne text-[9px] font-bold uppercase tracking-[0.45em] px-7 py-3.5 bg-accent-gold text-black-pure transition-all duration-500 hover:bg-accent-gold-light"
          >
            <span className="relative z-10" suppressHydrationWarning>
              Calendario Date
            </span>
            {/* Sheen on hover */}
            <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-[-20deg]" />
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
          "lg:hidden fixed inset-0 z-[100] bg-black-pure transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] overscroll-contain overflow-y-auto no-scrollbar",
          menuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-full"
        )}
      >
        {/* Ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(200,169,107,0.04) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        <div className="flex flex-col min-h-full container-max px-8 pt-28 pb-12 relative z-10">

          {/* Nav links */}
          <ul className="space-y-1 mb-auto">
            {NAV_LINKS.map((link, i) => (
              <li
                key={link.href}
                className={cn(
                  "border-b border-white/[0.05] transition-all duration-700",
                  menuOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-8"
                )}
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "block font-syne text-3xl font-bold uppercase tracking-tighter py-5 transition-colors duration-500",
                    pathname === link.href
                      ? "text-accent-gold"
                      : "text-text-primary hover:text-accent-gold"
                  )}
                  onClick={() => setMenuOpen(false)}
                  suppressHydrationWarning
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Bottom actions */}
          <div
            className={cn(
              "mt-10 space-y-4 transition-all duration-700 delay-500",
              menuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
          >
            <Link
              href="/calendario"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between w-full py-5 px-6 bg-accent-gold text-black-pure group"
              suppressHydrationWarning
            >
              <span className="font-syne text-[10px] uppercase tracking-[0.5em] font-bold">
                Vedi Calendario Date
              </span>
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform duration-500"
              />
            </Link>

            <a
              href={`https://wa.me/${CONTACT_WHATSAPP}?text=${WA_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center font-syne text-[9px] uppercase tracking-[0.4em] text-text-secondary/50 hover:text-accent-gold transition-colors duration-500 py-3 border border-white/[0.06]"
              suppressHydrationWarning
            >
              Richiedi Info su WhatsApp
            </a>

            {/* Socials */}
            <div className="flex items-center justify-between pt-6 border-t border-white/[0.06]">
              <div className="flex gap-6">
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
