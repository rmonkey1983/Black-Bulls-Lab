"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Mic2, ArrowLeft, Users, Zap } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@/hooks/useGSAP";
import { useCinematic } from "@/hooks/useCinematic";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { FormatPaths } from "@/components/events/FormatPaths";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { buildWAUrl, WA_MESSAGES } from "@/lib/whatsapp";

export function IlPalqoClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const { revealOnScroll } = useCinematic();

  useGSAP(() => {
    // Spotlight movement
    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current) return;
      gsap.to(spotlightRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 1.5,
        ease: "power2.out"
      });
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Cinematic Reveal
    const tl = gsap.timeline();
    tl.from(".palqo-title span", {
      y: 100,
      opacity: 0,
      filter: "blur(20px)",
      stagger: 0.2,
      duration: 2,
      ease: "expo.out"
    })
    .from(".palqo-sub", {
      opacity: 0,
      y: 20,
      duration: 1.5,
      ease: "power2.out"
    }, "-=1");

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, { scope: containerRef });

  revealOnScroll(".reveal-palqo");

  return (
    <div ref={containerRef} className="bg-black-pure text-text-primary min-h-screen selection:bg-accent-gold selection:text-black-pure overflow-x-hidden">
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative min-h-screen pt-40 pb-20 lg:py-32 w-full overflow-hidden flex items-center justify-center">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/brand/bg-stage-lights.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-30 scale-105"
            priority
          />
          
          {/* Spotlight Effect */}
          <div 
            ref={spotlightRef}
            className="absolute top-0 left-0 w-200 h-200 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(200, 169, 107, 0.1) 0%, transparent 70%)',
              filter: 'blur(80px)'
            }}
          />

          {/* Cinematic Overlays */}
          <div className="absolute inset-0 bg-linear-to-b from-black-pure/90 via-transparent to-black-pure z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-10" />
          <div className="absolute inset-0 opacity-[0.05] bg-[url('/noise.webp')] mix-blend-overlay z-20" />
        </div>

        {/* Navigation Link */}
        <div className="absolute top-28 left-6 lg:left-12 z-50">
            <Link
                href="/format"
                className="group flex items-center gap-4 text-text-secondary/80 hover:text-accent-gold transition-colors uppercase text-[10px] font-bold tracking-[0.5em]"
            >
                <ArrowLeft size={14} className="group-hover:-translate-x-2 transition-transform" /> 
                Tutti i Format
            </Link>
        </div>

        <div className="relative z-30 container-max px-6 text-center">
            <div className="space-y-12">
                <div className="flex flex-col items-center gap-6">
                    <span className="reveal-palqo inline-block px-4 py-1 border border-accent-gold/20 text-accent-gold text-[10px] font-bold uppercase tracking-[0.6em] bg-accent-gold/5 backdrop-blur-md">
                        Dinner &amp; show live
                    </span>
                    <h1 className="palqo-title font-syne font-bold text-[clamp(2.5rem,6vw,6rem)] leading-[0.9] tracking-tighter uppercase text-text-primary flex flex-col">
                        <span className="block">Il PalQo</span>
                        <span className="block text-accent-gold italic">Dinner &amp; show a Torino.</span>
                    </h1>
                </div>

                <div className="palqo-sub max-w-2xl mx-auto">
                    <p className="font-inter text-lg md:text-xl text-zinc-200 leading-relaxed">
                        Stand-up, improvvisazione e conduzione. <br />
                        Il pubblico partecipa a ciò che accade sul palco.
                    </p>
                </div>

                <div className="pt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <PrimaryButton href="/contatti" size="lg" className="w-full sm:w-auto">
                        Richiedi un preventivo
                    </PrimaryButton>
                    <a href={buildWAUrl(WA_MESSAGES.ilPalqo)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 w-full sm:w-auto items-center justify-center border border-white/40 px-8 py-4 font-syne text-xs font-bold uppercase tracking-[.12em] text-white hover:border-accent-gold hover:text-accent-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold">
                        Chiedi le prossime date
                    </a>
                </div>
            </div>
        </div>

        {/* Tech Decor */}
        <div className="absolute bottom-12 right-12 hidden lg:block">
            <div className="flex items-center gap-4 text-white/10">
                <div className="text-right">
                    <div className="text-[10px] font-bold tracking-[0.4em] uppercase">Interazione live</div>
                    <div className="text-[9px] tracking-[0.2em] uppercase opacity-50">Pubblico protagonista</div>
                </div>
                <Zap size={24} className="opacity-20" />
            </div>
        </div>
      </section>

      {/* 2. THE STORYTELLING: Backstage Tension */}
      <section className="reveal-palqo section-padding-huge bg-black-pure border-y border-white/5">
        <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-48 items-center">
            <div className="space-y-16">
                <SectionHeading 
                  title="UNO SHOW"
                  highlight="A CENA"
                  subtitle="Che cos’è"
                />
                <div className="space-y-12 font-inter text-lg md:text-xl text-zinc-300 leading-relaxed">
                    <p>
                        Il PalQo è un dinner &amp; show live con stand-up, improvvisazione, conduzione e interazione con il pubblico.
                    </p>
                    <p>
                        La serata alterna momenti sul palco e coinvolgimento della sala: il pubblico non resta ai margini dello spettacolo.
                    </p>
                </div>
            </div>

            <div className="relative aspect-square">
                <PremiumCard className="h-full">
                    <Image 
                        src="/images/brand/service-performance.webp"
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-60 transition-[filter,opacity] duration-1000"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black-pure via-transparent to-transparent opacity-80" />
                    <div className="absolute top-12 left-12">
                        <div className="w-16 h-16 rounded-full border border-accent-gold/20 flex items-center justify-center animate-pulse">
                            <Play size={24} className="text-accent-gold fill-accent-gold" />
                        </div>
                    </div>
                </PremiumCard>
            </div>
        </div>
      </section>

      {/* 3. EXPERIENCE FLOW: The Three Acts */}
      <section className="reveal-palqo section-padding-huge bg-black-pure">
        <div className="container-max">
            <div className="mb-32">
                <SectionHeading 
                  title="LIVE."
                  highlight="INSIEME."
                  subtitle="Come si vive il format"
                  align="center"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
                {[
                    { title: "Stand-up", desc: "La conduzione apre la serata e porta il pubblico dentro il ritmo dello show.", icon: <Mic2 size={32} /> },
                    { title: "Improvvisazione", desc: "Il palco cambia direzione seguendo ciò che succede in sala.", icon: <Zap size={32} /> },
                    { title: "Interazione", desc: "Il pubblico partecipa e contribuisce all’energia della serata.", icon: <Users size={32} /> }
                ].map((act, i) => (
                    <div key={i} className="group space-y-8 p-12 border border-white/5 bg-white/2 hover:border-accent-gold/20 transition-[border-color,background-color] duration-700">
                        <div className="text-accent-gold opacity-30 group-hover:opacity-100 transition-opacity duration-700">
                            {act.icon}
                        </div>
                        <h3 className="font-syne text-3xl font-bold uppercase tracking-tighter text-text-primary">
                            {act.title}
                        </h3>
                        <p className="font-inter text-text-secondary text-base leading-relaxed">
                            {act.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <FormatPaths
        whatsappHref={buildWAUrl(WA_MESSAGES.ilPalqo)}
        joinText="Le date pubbliche vengono pubblicate nel calendario. Scrivici su WhatsApp e ti diciamo quali sono le prossime."
        organizeText="Raccontaci gruppo, occasione e location: valutiamo insieme come portare Il PalQo al tuo evento o nel tuo locale, a Torino e in Piemonte."
      />

    </div>
  );
}
