"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mic, ArrowLeft, Zap, Play, ArrowRight, Star, Trophy, Music2 } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@/hooks/useGSAP";
import { useCinematic } from "@/hooks/useCinematic";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { GoldenVoiceForm } from "@/components/forms/GoldenVoiceForm";
import { buildWAUrl, WA_MESSAGES } from "@/lib/whatsapp";

export function TheGoldenVoiceClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const { revealOnScroll } = useCinematic();

  useGSAP(() => {
    // Spotlight movement - Warm luxury stage light
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
    tl.from(".golden-title span", {
      y: 100,
      opacity: 0,
      filter: "blur(20px)",
      stagger: 0.2,
      duration: 2,
      ease: "expo.out"
    })
    .from(".golden-sub", {
      opacity: 0,
      y: 20,
      duration: 1.5,
      ease: "power2.out"
    }, "-=1");

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, { scope: containerRef });

  revealOnScroll(".reveal-golden");

  return (
    <main ref={containerRef} className="bg-black-pure text-text-primary min-h-screen selection:bg-accent-gold selection:text-black-pure overflow-x-hidden">
      
      {/* 1. CINEMATIC HERO: The Stage Entry */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/brand/service-performance.webp"
            alt="The Golden Voice Experience"
            fill
            sizes="100vw"
            className="object-cover opacity-20 contrast-125 grayscale scale-105"
            priority
          />
          
          {/* Warm Stage Spotlight Effect */}
          <div 
            ref={spotlightRef}
            className="absolute top-0 left-0 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(200, 169, 107, 0.12) 0%, transparent 70%)',
              filter: 'blur(80px)'
            }}
          />

          {/* Cinematic Overlays */}
          <div className="absolute inset-0 bg-linear-to-b from-black-pure/90 via-transparent to-black-pure z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)] z-10" />
          <div className="absolute inset-0 opacity-[0.05] bg-[url('/noise.webp')] mix-blend-overlay z-20" />
        </div>

        {/* Navigation Link */}
        <div className="absolute top-28 left-6 lg:top-12 lg:left-12 z-50">
            <Link
                href="/format"
                className="group flex items-center gap-4 text-text-secondary/30 hover:text-accent-gold transition-colors uppercase text-[10px] font-bold tracking-[0.5em]"
            >
                <ArrowLeft size={14} className="group-hover:-translate-x-2 transition-transform" /> 
                Archivio Format
            </Link>
        </div>

        <div className="relative z-30 container-max px-6 text-center">
            <div className="space-y-12">
                <div className="flex flex-col items-center gap-6">
                    <span className="reveal-golden inline-block px-4 py-1 border border-accent-gold/20 text-accent-gold text-[10px] font-bold uppercase tracking-[0.6em] bg-accent-gold/5 backdrop-blur-md">
                        Premium Stage Universe
                    </span>
                    <h1 className="golden-title font-syne font-bold text-[clamp(3rem,10vw,12rem)] leading-[0.8] tracking-tighter uppercase text-text-primary flex flex-col">
                        <span className="block">Every voice</span>
                        <span className="block text-accent-gold italic">leaves a mark.</span>
                    </h1>
                </div>

                <div className="golden-sub max-w-2xl mx-auto">
                    <p className="font-inter text-lg md:text-2xl text-text-secondary font-light leading-relaxed uppercase tracking-[0.2em] opacity-60">
                        More than a performance. A presence. <br />
                        The contest where the audience decides your fate.
                    </p>
                </div>

                <div className="pt-12 flex flex-col sm:flex-row items-center justify-center gap-8">
                    <PrimaryButton href="#casting-form" size="lg" className="w-full sm:w-auto min-w-[280px]">
                        SALI SUL PALCO
                    </PrimaryButton>
                </div>
            </div>
        </div>

        {/* Tech Decor */}
        <div className="absolute bottom-12 right-12 hidden lg:block">
            <div className="flex items-center gap-4 text-white/10">
                <div className="text-right">
                    <div className="text-[10px] font-bold tracking-[0.4em] uppercase">Live Audience Scoring</div>
                    <div className="text-[9px] tracking-[0.2em] uppercase opacity-50">Protocol: GOLDEN_VOICE</div>
                </div>
                <Star size={20} className="opacity-20" />
            </div>
        </div>
      </section>

      {/* 2. THE STORYTELLING: The Spotlight Tension */}
      <section className="reveal-golden section-padding-huge bg-black-pure border-y border-white/5">
        <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-48 items-center">
            <div className="space-y-16">
                <SectionHeading 
                  title="PRESENZA"
                  highlight="ASSOLUTA"
                  subtitle="L'Evoluzione dello Show"
                />
                <div className="space-y-12 font-inter text-xl md:text-2xl text-text-secondary font-light leading-relaxed opacity-70">
                    <p>
                        Quando il riflettore si accende, non puoi più nasconderti. The Golden Voice non è un concorso canoro, è un momento di verità.
                    </p>
                    <p>
                        Cerchiamo chi vive per esibirsi e non teme il giudizio di un pubblico armato di smartphone e passione. La tua voce è lo strumento, il Lab è il tuo amplificatore.
                    </p>
                </div>
            </div>

            <div className="relative aspect-square">
                <PremiumCard className="h-full">
                    <Image 
                        src="/images/brand/service-performance.webp"
                        alt="Stage Tension"
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-50 transition-[filter,opacity] duration-1000"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black-pure via-transparent to-transparent opacity-90" />
                    <div className="absolute top-12 left-12">
                        <div className="w-16 h-16 rounded-full border border-accent-gold/20 flex items-center justify-center">
                            <Mic size={24} className="text-accent-gold" />
                        </div>
                    </div>
                </PremiumCard>
            </div>
        </div>
      </section>

      {/* 3. EXPERIENCE FLOW: The Path to Glory */}
      <section className="reveal-golden section-padding-huge bg-black-pure">
        <div className="container-max">
            <div className="mb-32">
                <SectionHeading 
                  title="TRE FASI."
                  highlight="UNA VOCE."
                  subtitle="Il Percorso dell'Artista"
                  align="center"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
                {[
                    { title: "Digital Casting", desc: "Il primo passo. Invia la tua candidatura e i tuoi link social. La selezione inizia dallo schermo.", icon: <Music2 size={32} /> },
                    { title: "The Performance", desc: "Performance esplosive davanti a giuria e pubblico. Ogni nota può ribaltare la classifica in app.", icon: <Zap size={32} /> },
                    { title: "The Crescendo", desc: "La serata definitiva. Tensione tecnologica e voti in tempo reale per decretare il vincitore.", icon: <Trophy size={32} /> }
                ].map((act, i) => (
                    <div key={i} className="group space-y-8 p-12 border border-white/5 bg-white/2 hover:border-accent-gold/20 transition-[border-color,background-color] duration-700">
                        <div className="text-accent-gold opacity-30 group-hover:opacity-100 transition-opacity duration-700">
                            {act.icon}
                        </div>
                        <h3 className="font-syne text-3xl font-bold uppercase tracking-tighter text-text-primary">
                            {act.title}
                        </h3>
                        <p className="font-inter text-text-secondary/60 leading-relaxed group-hover:text-text-secondary transition-colors">
                            {act.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* 4. CASTING FORM: The Entry Protocol */}
      <section id="casting-form" className="reveal-golden section-padding-huge bg-black-pure border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-gold/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        
        <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 lg:gap-48 items-center">
                <div className="space-y-16">
                    <div className="space-y-8">
                        <span className="text-accent-gold font-bold text-[10px] uppercase tracking-[0.8em]">Apply to the Lab</span>
                        <h2 className="font-syne font-bold leading-[0.85] tracking-tighter uppercase text-text-primary text-5xl md:text-[5vw]">
                            Invia la tua <br /><span className="text-accent-gold italic">Candidatura.</span>
                        </h2>
                        <p className="text-text-secondary/60 font-inter text-xl leading-relaxed max-w-lg">
                            Il palco è pronto. Il Sistema ti sta aspettando. Dimostra che la tua voce merita lo spotlight.
                        </p>
                    </div>
                    
                    <div className="pt-16 border-t border-white/5 space-y-6">
                        <p className="font-syne text-[10px] uppercase tracking-[0.4em] text-text-secondary opacity-30">Contatto Casting:</p>
                        <a 
                            href={buildWAUrl(WA_MESSAGES.default)}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group flex items-center gap-6 text-accent-gold hover:text-text-primary transition-colors font-syne text-xs font-bold uppercase tracking-[0.6em]"
                        >
                            WHATSAPP CASTING
                            <ArrowRight size={18} className="group-hover:translate-x-3 transition-transform" />
                        </a>
                    </div>
                </div>

                <div className="bg-white/2 p-12 lg:p-16 border border-white/5 backdrop-blur-3xl shadow-2xl">
                    <GoldenVoiceForm />
                </div>
            </div>
        </div>
      </section>

      {/* 5. FINAL ACTION SECTION */}
      <section className="reveal-golden section-padding-huge bg-accent-gold text-black-pure text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/noise.webp')] mix-blend-overlay" />
        </div>
        <div className="container-narrow space-y-16 relative z-10">
          <h2 className="font-syne text-6xl md:text-9xl font-bold uppercase tracking-tighter leading-[0.8]">
            ENTRA <br /> NELLO <span className="bg-black-pure text-accent-gold px-4">SPOTLIGHT.</span>
          </h2>
          <div className="pt-12">
            <Link 
              href="/calendario"
              className="inline-flex items-center gap-8 px-16 py-8 bg-black-pure text-accent-gold text-xl font-black uppercase tracking-widest hover:bg-white hover:text-black-pure transition-[background-color,color] duration-500 rounded-full"
            >
              PRENDI IL TUO POSTO
            </Link>
          </div>
          <p className="font-syne text-[10px] uppercase tracking-[0.6em] font-black opacity-40">
            Selezioni limitate // Solo per talenti puri
          </p>
        </div>
      </section>

    </main>
  );
}
