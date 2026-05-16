"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { X, Menu, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, CONTACT_WHATSAPP } from "@/lib/constants";

const WA_MSG = encodeURIComponent("Ciao! Vorrei informazioni su un'esperienza con Black Bulls Lab");

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen]);

  return (
    <nav 
      aria-label="Main navigation" 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out",
        scrolled 
          ? "h-20 bg-black-pure/80 backdrop-blur-xl border-b border-white/5" 
          : "h-24 bg-transparent border-b border-transparent"
      )}
    >
      <div className="container-max h-full flex items-center justify-between relative px-6">
        
        {/* LOGO (Left) */}
        <div className="flex-none">
          <Link 
            href="/" 
            aria-label="Black Bulls Lab — Home" 
            className="relative z-110"
            onClick={() => setMenuOpen(false)}
          >
            <Image
              src="/brand/logo-white.svg"
              alt="Black Bulls Lab"
              width={160}
              height={36}
              priority
              className={cn(
                "transition-all duration-700 h-auto",
                scrolled ? "w-[130px]" : "w-[150px]"
              )}
            />
          </Link>
        </div>

        {/* Desktop Links (Right Aligned before CTA) */}
        <ul className="hidden lg:flex items-center gap-12 ml-auto mr-12">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "font-syne text-[10px] uppercase tracking-[0.4em] transition-all duration-700 hover:text-accent-gold relative group",
                  pathname === link.href ? "text-accent-gold" : "text-text-primary/60"
                )}
              >
                {link.label}
                <span className={cn(
                  "absolute -bottom-1 left-0 w-0 h-px bg-accent-gold transition-all duration-700 group-hover:w-full",
                  pathname === link.href && "w-full"
                )} />
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:block flex-none">
          <Link 
            href="/calendario" 
            className="group relative overflow-hidden bg-accent-gold text-black-pure font-syne text-[9px] font-bold uppercase tracking-[0.4em] px-8 py-3.5 transition-all duration-700 hover:bg-text-primary"
          >
            <span className="relative z-10">Prenota esperienza</span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden relative z-110 p-2 text-text-primary hover:text-accent-gold transition-all duration-700"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} strokeWidth={1.2} /> : <Menu size={24} strokeWidth={1.2} />}
        </button>
      </div>

      {/* Cinematic Mobile Menu */}
      <div className={cn(
        "lg:hidden fixed inset-0 z-100 bg-black-pure transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)]",
        menuOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-full"
      )}>
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-gold/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="flex flex-col h-full container-max px-6 pt-32 pb-12 relative z-10">
          <ul className="space-y-6">
            {NAV_LINKS.map((link, i) => (
              <li 
                key={link.href}
                className={cn(
                  "transition-all duration-1000",
                  menuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                )}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <Link 
                  href={link.href} 
                  className={cn(
                    "font-syne text-4xl font-bold uppercase tracking-tighter transition-colors duration-700",
                    pathname === link.href ? "text-accent-gold" : "text-text-primary"
                  )}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className={cn(
            "mt-auto space-y-10 transition-all duration-1000 delay-500",
            menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <div className="space-y-4">
              <Link 
                href="/calendario" 
                onClick={() => setMenuOpen(false)} 
                className="flex items-center justify-between w-full p-8 border border-white/5 bg-black-elevated/20 group"
              >
                <span className="font-syne text-[10px] uppercase tracking-[0.5em] text-accent-gold font-bold">Prenota ora</span>
                <ArrowRight size={20} className="text-accent-gold group-hover:translate-x-2 transition-transform duration-700" />
              </Link>
              
              <a
                href={`https://wa.me/${CONTACT_WHATSAPP}?text=${WA_MSG}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center font-syne text-[9px] uppercase tracking-[0.4em] text-text-secondary py-4"
              >
                WhatsApp Inquiry
              </a>
            </div>

            <div className="flex justify-between items-center pt-8 border-t border-white/5">
              <div className="flex gap-8">
                <a href="#" className="text-[10px] uppercase tracking-widest text-text-secondary hover:text-accent-gold transition-colors">IG</a>
                <a href="#" className="text-[10px] uppercase tracking-widest text-text-secondary hover:text-accent-gold transition-colors">FB</a>
                <a href="#" className="text-[10px] uppercase tracking-widest text-text-secondary hover:text-accent-gold transition-colors">TK</a>
              </div>
              <span className="font-syne text-[8px] uppercase tracking-[0.3em] text-text-secondary/40 italic">
                Experience Studio
              </span>
            </div>
          </div>
        </div>
        
        {/* Cinematic Grain */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('/noise.webp')] mix-blend-overlay" />
      </div>
    </nav>
  );
}
