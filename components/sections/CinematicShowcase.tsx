"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@/hooks/useGSAP";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Shield, Fingerprint, Eye, Share2, Target, ArrowRight } from "lucide-react";
import { useCinematic } from "@/hooks/useCinematic";

export function CinematicShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { softParallax } = useCinematic();

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 65%",
      },
    });

    tl.from(".showcase-content > *", {
      opacity: 0,
      x: -40,
      filter: "blur(16px)",
      duration: 1.4,
      stagger: 0.2,
      ease: "power3.out",
    }).from(
      ".floating-ui",
      {
        opacity: 0,
        scale: 0.92,
        filter: "blur(10px)",
        duration: 1.2,
        stagger: 0.2,
        ease: "back.out(1.2)",
      },
      "-=0.8"
    );
  }, { scope: containerRef });

  softParallax(".showcase-parallax-image", 0.12);

  const features = [
    { icon: Fingerprint, label: "Ruoli Segreti" },
    { icon: Share2, label: "You Decide" },
    { icon: Eye, label: "Indagini Noir" },
    { icon: Target, label: "Obiettivi Nascosti" },
    { icon: Shield, label: "Strategia di Squadra" },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-black-pure flex items-center overflow-hidden border-y border-white/[0.05]"
    >
      {/* Ambient lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute top-1/3 -left-1/4 w-[60vw] h-[60vw] rounded-full opacity-60 blur-[160px]"
          style={{ background: "radial-gradient(circle, rgba(200,169,107,0.04) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/4 -right-1/4 w-[50vw] h-[50vw] rounded-full opacity-40 blur-[160px]"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)" }}
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-32 md:py-40 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10 w-full">

        {/* ── LEFT: Editorial content ── */}
        <div className="showcase-content space-y-12">

          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 border border-accent-gold/20 bg-accent-gold/[0.04] backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse" />
            <span className="font-syne text-[9px] uppercase tracking-[0.55em] text-accent-gold font-bold">
              Interactive Thriller
            </span>
          </div>

          {/* Headline */}
          <div className="space-y-1">
            <h2 className="font-syne text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.88] font-bold uppercase tracking-tighter text-text-primary">
              Ogni tavolo
            </h2>
            <h2 className="font-syne text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.88] font-bold uppercase tracking-tighter text-accent-gold italic">
              nasconde
            </h2>
            <h2 className="font-syne text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.88] font-bold uppercase tracking-tighter text-text-primary">
              una verità.
            </h2>
          </div>

          {/* Description */}
          <p className="font-inter text-base lg:text-lg text-text-secondary max-w-lg leading-relaxed font-light">
            Un&apos;esperienza di social deduction dinner dove ogni giocatore ha
            segreti, alleanze e obiettivi nascosti.{" "}
            <span className="text-text-primary/60">
              Smaschererai il bugiardo o sarai tu a cadere nel Sistema?
            </span>
          </p>

          {/* Features grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8 pt-2">
            {features.map((item, i) => (
              <div key={i} className="space-y-3 group cursor-default">
                <item.icon
                  size={22}
                  strokeWidth={1.2}
                  className="text-accent-gold/60 group-hover:text-accent-gold group-hover:scale-110 transition-all duration-500"
                />
                <p className="font-syne text-[9px] uppercase tracking-[0.3em] text-text-secondary/50 group-hover:text-text-primary/60 transition-colors duration-500">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="pt-4">
            <PrimaryButton
              href="/format/a-cena-con-il-bugiardo"
              size="lg"
              className="w-full sm:w-auto sm:min-w-[300px]"
            >
              ENTRA NEL SISTEMA
            </PrimaryButton>
          </div>
        </div>

        {/* ── RIGHT: Immersive visual ── */}
        <div className="relative">
          {/* Main image — much more visible */}
          <div className="showcase-parallax-image relative aspect-[3/4] overflow-hidden border border-white/[0.06]">
            <Image
              src="/images/brand/background.webp"
              alt="A Cena Con Il Bugiardo Experience"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover opacity-65 transition-all duration-1000 hover:scale-[1.02]"
            />
            {/* Subtle gradient bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black-pure/70 via-transparent to-black-pure/10" />
            {/* Film grain */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.webp')] mix-blend-overlay" />
          </div>

          {/* Floating UI — Status card */}
          <div className="floating-ui absolute top-4 right-4 md:-top-8 md:-right-8 w-48 md:w-56 p-5 bg-black-elevated/90 backdrop-blur-2xl border border-white/[0.08] shadow-[0_40px_80px_rgba(0,0,0,0.9)]">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <span className="font-syne text-[8px] uppercase tracking-[0.4em] text-accent-gold">
                  Live Status
                </span>
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              </div>
              <p className="font-syne text-[10px] uppercase tracking-[0.3em] text-text-primary">
                Tensione in tempo reale
              </p>
              <div className="h-1 bg-white/[0.06] w-full overflow-hidden rounded-full">
                <div className="h-full bg-accent-gold w-[82%] animate-pulse rounded-full" />
              </div>
              <p className="font-inter text-[9px] text-text-secondary/40">
                82% tensione narrativa
              </p>
            </div>
          </div>

          {/* Floating UI — Mission card */}
          <div className="floating-ui absolute bottom-4 left-4 md:-bottom-8 md:-left-8 w-48 md:w-64 p-6 bg-black-elevated/90 backdrop-blur-2xl border border-white/[0.08] shadow-[0_40px_80px_rgba(0,0,0,0.9)]">
            <div className="space-y-4">
              <p className="font-syne text-[8px] uppercase tracking-[0.5em] text-text-secondary/40">
                Your Next Move
              </p>
              <h4 className="font-syne text-sm uppercase tracking-[0.15em] text-text-primary leading-tight">
                Identifica il traditore al tavolo 04
              </h4>
              <div className="flex items-center gap-3 text-accent-gold pt-1">
                <ArrowRight size={14} strokeWidth={1.5} />
                <span className="font-syne text-[8px] uppercase tracking-[0.4em]">
                  Execute Strategy
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background text deco */}
      <div className="absolute -bottom-10 right-0 pointer-events-none select-none overflow-hidden opacity-[0.025]">
        <span className="font-syne font-bold text-[18vw] leading-none text-white uppercase tracking-tighter block whitespace-nowrap">
          SYSTEM FAILURE
        </span>
      </div>
    </section>
  );
}
