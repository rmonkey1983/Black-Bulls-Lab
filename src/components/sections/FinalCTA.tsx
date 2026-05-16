"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@/hooks/useGSAP";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

import { useCinematic } from "@/hooks/useCinematic";

export function FinalCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const { revealOnScroll } = useCinematic();

  useGSAP(() => {
    // Ambient glow pulse
    gsap.to(glowRef.current, {
      opacity: 0.6,
      scale: 1.2,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, { scope: containerRef });

  revealOnScroll(".cta-content > *", 0.3);

  return (
    <section 
      ref={containerRef} 
      className="relative section-padding-huge bg-black-pure overflow-hidden flex items-center justify-center border-t border-white/5"
    >
      {/* Cinematic Ambient Lighting */}
      <div 
        ref={glowRef}
        className="absolute w-[800px] h-[800px] bg-accent-gold/5 blur-[160px] rounded-full opacity-20 pointer-events-none z-0"
      />

      <div className="cta-content relative z-10 container-max text-center space-y-16 lg:space-y-32">
        <div className="space-y-8">
          <h2 className="font-syne text-[clamp(2rem,8vw,6rem)] leading-[0.85] font-bold uppercase tracking-tighter text-text-primary">
            Le persone dimenticano una cena. <br />
            <span className="text-accent-gold italic">Non dimenticano</span> un’esperienza.
          </h2>
        </div>

        <div className="flex flex-col items-center gap-12">
          <PrimaryButton href="/calendario" size="lg" className="min-w-[320px]">
            PRENOTA ORA
          </PrimaryButton>
          
          <p className="font-syne text-[10px] uppercase tracking-[0.8em] text-text-secondary opacity-40">
            Black Bulls Lab — Experience Studio
          </p>
        </div>
      </div>

      {/* Background Deco Text */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none select-none opacity-[0.03] flex justify-center overflow-hidden">
        <span className="font-syne font-bold text-[25vw] leading-none text-white uppercase tracking-tighter translate-y-1/2 block whitespace-nowrap">
          IMMERSIVE
        </span>
      </div>
    </section>
  );
}
