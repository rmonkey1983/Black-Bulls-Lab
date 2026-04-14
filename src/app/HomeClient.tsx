"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@/hooks/useGSAP";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { EXPERIMENTS, LOGO_PATH, SOCIAL_LINKS } from "@/lib/constants";
import { teamMembers } from "@/lib/teamData";
import { 
  ArrowRight, 
  Sparkles, 
  Instagram, 
  ChevronDown,
  Target,
  Heart
} from "lucide-react";

import FaqSection from "@/components/ui/FaqSection";

export function HomeClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. HERO ANIMATIONS
    const heroTl = gsap.timeline();
    heroTl.from(".hero-content > *", {
      y: 40,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power4.out"
    });

    // 2. CIRCUIT SVG ANIMATION (DRAW EFFECT)
    gsap.from(".circuit-path", {
      strokeDashoffset: 1000,
      strokeDasharray: 1000,
      duration: 2.5,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ".metodo-section",
        start: "top 70%"
      }
    });

    // 4. FORMAT CARDS STAGGER
    gsap.from(".format-card", {
      opacity: 0,
       scale: 0.95,
      y: 40,
      duration: 0.8,
      stagger: 0.15,
      ease: "back.out(1.4)",
      scrollTrigger: {
        trigger: ".format-grid",
        start: "top 75%"
      }
    });
  }, { scope: containerRef });

  const scrollToNext = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('metodo');
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="bg-zinc-950 text-white min-h-screen selection:bg-yellow-500 selection:text-black overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/brand/bg-hero-wide.webp"
            alt="Black Bulls Lab"
            fill
            className="object-cover opacity-40 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/60 to-zinc-950" />
        </div>

        {/* Content */}
        <div className="hero-content relative z-10 max-w-6xl mx-auto px-6 text-center space-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-500/20 bg-yellow-500/5 backdrop-blur-sm">
            <Sparkles size={14} className="text-yellow-500" />
            <span className="font-heading text-[10px] sm:text-xs tracking-[0.3em] text-yellow-500 uppercase font-bold">
                Advanced Entertainment Lab
            </span>
          </div>
          
          <h1 className="font-heading font-bold text-5xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tighter uppercase max-w-5xl mx-auto italic transform -skew-x-2">
            DINNER SHOW <span className="text-yellow-500">A TORINO.</span>
          </h1>
          
          <div className="space-y-4">
             <h2 className="font-heading text-xl md:text-3xl text-zinc-400 uppercase tracking-widest font-light">
                L&apos;intrattenimento diventa <span className="text-white font-medium">scienza.</span>
             </h2>
             <p className="font-sans text-zinc-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
                Benvenuto nel Laboratorio delle Emozioni. Creiamo esperienze originali, <br className="hidden md:block" /> scalabili e indimenticabili per chi non si accontenta dell&apos;ordinario.
             </p>
          </div>

          <div className="pt-8 flex flex-col items-center gap-12">
            <PrimaryButton href="#format" size="lg" className="px-12 py-6">
                SCOPRI I FORMAT
            </PrimaryButton>
            
            <button onClick={scrollToNext} className="animate-bounce p-3 border border-white/5 rounded-full bg-white/5 hover:border-yellow-500/30 transition-colors" aria-label="Vai alla prossima sezione">
                <ChevronDown size={24} className="text-zinc-400" />
            </button>
          </div>
        </div>

        {/* Technical Deco Elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-px h-1/2 bg-gradient-to-b from-transparent via-yellow-500/20 to-transparent" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-px h-1/2 bg-gradient-to-b from-transparent via-yellow-500/20 to-transparent" />
      </section>

      {/* 2. SEZIONE 'IL METODO' (La Visione) */}
      <section id="metodo" className="metodo-section py-32 md:py-48 px-6 bg-transparent">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
                <SectionHeading 
                  title="L'APPROCCIO"
                  highlight="PRACTICAL."
                  subtitle="La Nostra Visione"
                  align="left"
                />
                <div className="space-y-6 font-sans text-lg text-zinc-400 font-light leading-relaxed max-w-xl">
                    <p>
                        Julian Halili ha fondato Black Bulls Lab per rispondere a una domanda semplice: come si crea un evento che rimanga nel cuore degli ospiti senza i costi proibitivi dei grandi stage?
                    </p>
                    <p>
                        La risposta è il nostro <strong>Metodo Lab</strong>: soluzioni replicabili, costi sostenibili e un coinvolgimento psicologico studiato per mettere l&apos;ospite al centro di ogni scena. Non siamo semplici organizzatori, siamo ingegneri dell&apos;emozione.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-8 pt-6">
                    <div className="space-y-2">
                        <span className="text-yellow-500 font-heading text-2xl font-bold">100%</span>
                        <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">Engagement Rate</p>
                    </div>
                    <div className="space-y-2">
                        <span className="text-yellow-500 font-heading text-2xl font-bold">24H</span>
                        <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">Response Time</p>
                    </div>
                </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
                <svg width="400" height="400" viewBox="0 0 400 400" fill="none" className="w-full max-w-[400px] h-auto opacity-30">
                    <path className="circuit-path" d="M200 50V350M50 200H350M100 100L300 300M300 100L100 300" stroke="#EAB308" strokeWidth="1" strokeDasharray="10 10" />
                    <circle cx="200" cy="200" r="100" stroke="#EAB308" strokeWidth="0.5" />
                    <circle cx="200" cy="200" r="150" stroke="#EAB308" strokeWidth="0.2" strokeDasharray="5 5" />
                    <rect x="150" y="150" width="100" height="100" stroke="#EAB308" strokeOpacity="0.5" strokeWidth="0.5" transform="rotate(45 200 200)" />
                </svg>
                {/* Visual Glow */}
                <div className="absolute inset-0 bg-yellow-500/5 blur-[100px] rounded-full pointer-events-none" />
            </div>
        </div>
      </section>

      {/* 3. PREVIEW FORMAT (Dinner & Show) */}
      <section id="format" className="reveal-section py-32 bg-zinc-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                <SectionHeading 
                  title="GLI"
                  highlight="I FORMAT."
                  align="left"
                  accentPos="top"
                />
                <p className="font-sans text-zinc-400 max-w-sm text-right font-light italic">
                    Format testati e pronti per essere installati nel tuo locale o per il tuo evento privato.
                </p>
            </div>

            <div className="format-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {EXPERIMENTS.map((exp) => (
                    <PremiumCard key={exp.id} href={exp.href} className="group">
                        <div className="relative aspect-[4/5] overflow-hidden">
                            <Image 
                                src={exp.image}
                                alt={exp.name}
                                fill
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                            
                            <div className="absolute bottom-0 left-0 w-full p-8 space-y-2">
                                <span className="font-heading text-[10px] text-yellow-500 tracking-[0.3em] font-bold uppercase">
                                    {exp.badge}
                                </span>
                                <h3 className="font-heading text-3xl font-bold uppercase text-white tracking-widest leading-none">
                                    {exp.name}
                                </h3>
                            </div>
                        </div>
                    </PremiumCard>
                ))}
            </div>
        </div>
      </section>

      {/* 4. SOCIAL PROOF / TEAM (Le Facce) */}
      <section className="reveal-section py-32 bg-transparent">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                <div className="lg:col-span-4 space-y-8">
                    <SectionHeading 
                        title="LE MENTI"
                        highlight="CREATIVE."
                        subtitle="The Faces"
                        align="left"
                    />
                    <p className="font-sans text-zinc-400 font-light leading-relaxed">
                        Dietro ogni esperimento riuscito c&apos;è una squadra di esperti ossessionata dai dettagli. Incontra le persone che trasformano il Lab in realtà ogni sera.
                    </p>
                    <div className="pt-4">
                        <SecondaryButton href="/chi-siamo" size="lg">
                            CONOSCI IL TEAM
                        </SecondaryButton>
                    </div>
                </div>

                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {teamMembers.filter(m => ['manuel', 'maurizio'].includes(m.id)).map((member) => (
                        <PremiumCard key={member.id} href={`/team/${member.id}`} className="group p-6">
                            <div className="space-y-6">
                                <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-white/5 bg-zinc-900 shadow-2xl transition-all duration-500">
                                    <Image
                                        src={member.imageUrl}
                                        alt={member.name}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-heading text-2xl font-bold uppercase text-white group-hover:text-yellow-500 transition-colors">
                                        {member.name}
                                    </h3>
                                    <p className="font-heading text-xs text-yellow-500 uppercase tracking-widest font-bold">
                                        {member.role}
                                    </p>
                                </div>
                            </div>
                        </PremiumCard>
                    ))}
                </div>
            </div>
        </div>
      </section>

      <FaqSection />
    </div>
  );
}
