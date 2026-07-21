"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@/hooks/useGSAP";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { CONTACT_WHATSAPP } from "@/lib/constants";
import { useCinematic } from "@/hooks/useCinematic";
import { MessageCircle } from "lucide-react";

const WA_HREF = `https://wa.me/${CONTACT_WHATSAPP}?text=${encodeURIComponent(
  "Ciao! Vorrei informazioni su una serata Black Bulls Lab."
)}`;

export function FinalCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const { revealOnScroll } = useCinematic();

  useGSAP(() => {
    // Ambient glow pulse
    gsap.to(glowRef.current, {
      opacity: 0.7,
      scale: 1.3,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Line expand on enter
    gsap.fromTo(
      lineRef.current,
      { scaleX: 0, opacity: 0 },
      {
        scaleX: 1,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      }
    );
  }, { scope: containerRef });

  revealOnScroll(".cta-content > *", 0.25);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden flex flex-col items-center justify-center border-t border-white/[0.05]"
      style={{ minHeight: "80vh" }}
    >
      {/* Cinematic ambient lighting */}
      <div
        ref={glowRef}
        className="absolute w-[900px] h-[900px] rounded-full opacity-15 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(200,169,107,0.12) 0%, rgba(200,169,107,0.03) 50%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Gold line — top */}
      <div
        ref={lineRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-48 origin-center"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(200,169,107,0.5), transparent)",
        }}
      />

      {/* Content */}
      <div className="cta-content relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 py-32 md:py-48 text-center space-y-14">

        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-10 bg-accent-gold/40" />
          <span className="font-syne text-[9px] uppercase tracking-[0.7em] text-accent-gold/60 font-bold">
            Black Bulls Lab
          </span>
          <div className="h-px w-10 bg-accent-gold/40" />
        </div>

        {/* Main statement */}
        <div className="space-y-2">
          <h2 className="font-syne text-[clamp(2rem,7vw,5.5rem)] leading-[0.88] font-bold uppercase tracking-tighter text-text-primary">
            Le persone dimenticano una cena.
          </h2>
          <h2 className="font-syne text-[clamp(2rem,7vw,5.5rem)] leading-[0.88] font-bold uppercase tracking-tighter text-accent-gold italic">
            Non dimenticano un&apos;esperienza.
          </h2>
        </div>

        {/* Sub copy */}
        <p className="font-inter text-sm md:text-base text-text-secondary/60 uppercase tracking-[0.2em] max-w-xl mx-auto leading-relaxed">
          Unisciti alle 12.000+ persone che hanno vissuto l&apos;impossibile.
          Prenota la tua serata a Torino.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4">
          <PrimaryButton href="/calendario" size="lg" className="sm:min-w-[240px]">
            PRENOTA ORA
          </PrimaryButton>
          <a
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 border border-white/[0.12] font-syne text-[10px] uppercase tracking-[0.4em] text-text-secondary hover:text-text-primary hover:border-accent-gold/30 transition-all duration-500 sm:min-w-[240px] justify-center"
          >
            <MessageCircle size={14} strokeWidth={1.5} className="text-accent-gold group-hover:scale-110 transition-transform duration-500" />
            Scrivi su WhatsApp
          </a>
        </div>

        {/* Footer micro-copy */}
        <p className="font-syne text-[8px] uppercase tracking-[0.8em] text-text-secondary/25">
          Cinematic Universe · Torino · Italy
        </p>
      </div>

      {/* Background deco text */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none select-none opacity-[0.025] flex justify-center overflow-hidden">
        <span className="font-syne font-bold text-[22vw] leading-none text-white uppercase tracking-tighter translate-y-1/3 block whitespace-nowrap">
          IMMERSIVE
        </span>
      </div>

      {/* Bottom gold line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-32 bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent" />
    </section>
  );
}
