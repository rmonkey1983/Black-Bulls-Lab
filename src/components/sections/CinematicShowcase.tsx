"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@/hooks/useGSAP";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Shield, Fingerprint, Eye, Share2, Target, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

import { useCinematic } from "@/hooks/useCinematic";

export function CinematicShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const { softParallax } = useCinematic();

  useGSAP(() => {
    // Reveal animations on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
      }
    });

    tl.from(".showcase-content > *", {
      opacity: 0,
      x: -50,
      filter: "blur(20px)",
      duration: 1.5,
      stagger: 0.3,
      ease: "power3.out"
    })
    .from(".floating-ui", {
      opacity: 0,
      scale: 0.9,
      filter: "blur(10px)",
      duration: 1.5,
      stagger: 0.2,
      ease: "back.out(1.2)"
    }, "-=1");
  }, { scope: containerRef });

  softParallax(imageRef, 0.15);

  const features = [
    { icon: Fingerprint, label: "Ruoli Segreti" },
    { icon: Share2, label: "Live Voting" },
    { icon: Eye, label: "Indagini Noir" },
    { icon: Target, label: "Obiettivi Nascosti" },
    { icon: Shield, label: "Strategia di Squadra" },
  ];

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen bg-black-pure flex items-center overflow-hidden border-y border-white/5 section-padding-huge"
    >
      {/* Dynamic Lighting Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-accent-gold/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-white/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-40 items-center relative z-10">
        
        {/* Left: Editorial Content */}
        <div className="showcase-content space-y-16 lg:space-y-24">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-4 px-6 py-2 border border-accent-gold/20 bg-accent-gold/5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
              <span className="font-syne text-[10px] uppercase tracking-[0.5em] text-accent-gold">Interactive Thriller</span>
            </div>
            
            <h2 className="font-syne text-[clamp(2.5rem,8vw,6rem)] leading-[0.85] font-bold uppercase tracking-tighter text-text-primary">
              Ogni tavolo <br />
              <span className="text-accent-gold italic">nasconde</span> <br />
              una verità.
            </h2>
            
            <p className="font-inter text-lg lg:text-xl text-text-secondary max-w-lg leading-relaxed font-light">
              Un&apos;esperienza di social deduction dinner dove ogni giocatore ha segreti, alleanze e obiettivi nascosti. 
              Smaschererai il bugiardo o sarai tu a cadere nel Sistema?
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
            {features.map((item, i) => (
              <div key={i} className="space-y-4 group cursor-default">
                <item.icon size={24} strokeWidth={1.2} className="text-accent-gold group-hover:scale-110 transition-transform duration-700" />
                <p className="font-syne text-[10px] uppercase tracking-[0.3em] text-text-secondary group-hover:text-text-primary transition-colors duration-700 opacity-60 group-hover:opacity-100">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-12">
            <PrimaryButton href="/format/a-cena-con-il-bugiardo" size="lg" className="min-w-[320px]">
                ENTRA NEL SISTEMA
            </PrimaryButton>
          </div>
        </div>

        {/* Right: Immersive Visuals with Floating UI */}
        <div className="relative aspect-square">
          <div 
            ref={imageRef}
            className="absolute inset-0 overflow-hidden border border-white/5"
          >
            <Image 
              src="/images/brand/background.webp" 
              alt="A Cena Con Il Bugiardo Experience"
              fill
              className="object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105 opacity-40 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black-pure via-transparent to-black-pure/20" />
          </div>

          {/* Floating UI Elements (Netflix Style) */}
          <div className="floating-ui absolute -top-12 -right-12 w-64 p-6 bg-black-elevated/90 backdrop-blur-3xl border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.8)] hidden md:block">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="font-syne text-[10px] uppercase tracking-[0.4em] text-accent-gold">Status</span>
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              </div>
              <p className="font-syne text-[11px] uppercase tracking-[0.3em] text-text-primary">Tensione in tempo reale</p>
              <div className="h-1 bg-white/10 w-full overflow-hidden">
                <div className="h-full bg-accent-gold w-[85%] animate-pulse" />
              </div>
            </div>
          </div>

          <div className="floating-ui absolute -bottom-12 -left-12 w-72 p-8 bg-black-elevated/90 backdrop-blur-3xl border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.8)] hidden md:block">
            <div className="space-y-6">
              <p className="font-syne text-[10px] uppercase tracking-[0.5em] text-text-secondary opacity-40">Next Objective</p>
              <h4 className="font-syne text-sm uppercase tracking-[0.2em] text-text-primary leading-tight">
                Identifica il traditore al tavolo 04
              </h4>
              <div className="flex items-center gap-3 text-accent-gold pt-2">
                <ArrowRight size={16} />
                <span className="font-syne text-[10px] uppercase tracking-[0.4em]">Execute Strategy</span>
              </div>
            </div>
          </div>

          {/* Cinematic Details */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('/noise.webp')] mix-blend-overlay z-30" />
        </div>
      </div>

      {/* Background Text Deco */}
      <div className="absolute -bottom-20 right-20 pointer-events-none select-none overflow-hidden opacity-[0.03]">
        <span className="font-syne font-bold text-[20vw] leading-none text-white uppercase tracking-tighter block whitespace-nowrap">
          SYSTEM FAILURE
        </span>
      </div>
    </section>
  );
}
