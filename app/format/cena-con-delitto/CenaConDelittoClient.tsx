"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ArrowLeft, Zap, Play, ArrowRight, ShieldCheck, Target } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@/hooks/useGSAP";
import { useCinematic } from "@/hooks/useCinematic";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { buildWAUrl, WA_MESSAGES } from "@/lib/whatsapp";

export function CenaConDelittoClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const { revealOnScroll } = useCinematic();

  useGSAP(() => {
    // Spotlight movement - Cold investigative light
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
    tl.from(".mystery-title span", {
      y: 100,
      opacity: 0,
      filter: "blur(20px)",
      stagger: 0.2,
      duration: 2,
      ease: "expo.out"
    })
    .from(".mystery-sub", {
      opacity: 0,
      y: 20,
      duration: 1.5,
      ease: "power2.out"
    }, "-=1");

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, { scope: containerRef });

  revealOnScroll(".reveal-mystery");

  return (
    <main ref={containerRef} className="bg-black-pure text-text-primary min-h-screen selection:bg-accent-gold selection:text-black-pure overflow-x-hidden">
      
      {/* 1. CINEMATIC HERO: The Investigation Entry */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/brand/bg-venue-crowd.webp"
            alt="Investigation Atmosphere"
            fill
            sizes="100vw"
            className="object-cover opacity-20 contrast-125 grayscale scale-105"
            priority
          />
          
          {/* Cold Spotlight Effect */}
          <div 
            ref={spotlightRef}
            className="absolute top-0 left-0 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(200, 169, 107, 0.08) 0%, transparent 70%)',
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
                    <span className="reveal-mystery inline-block px-4 py-1 border border-accent-gold/20 text-accent-gold text-[10px] font-bold uppercase tracking-[0.6em] bg-accent-gold/5 backdrop-blur-md">
                        Interactive Noir Experience
                    </span>
                    <h1 className="mystery-title font-syne font-bold text-[clamp(3rem,10vw,12rem)] leading-[0.8] tracking-tighter uppercase text-text-primary flex flex-col">
                        <span className="block">Truth is</span>
                        <span className="block text-accent-gold italic">a Shadow.</span>
                    </h1>
                </div>

                <div className="mystery-sub max-w-2xl mx-auto">
                    <p className="font-inter text-lg md:text-2xl text-text-secondary font-light leading-relaxed uppercase tracking-[0.2em] opacity-60">
                        One murder. One cold case. Your team. <br />
                        Noir investigation goes digital.
                    </p>
                </div>

                <div className="pt-12 flex flex-col sm:flex-row items-center justify-center gap-8">
                    <PrimaryButton href="/calendario" size="lg" className="w-full sm:w-auto min-w-[280px]">
                        APRI L&apos;INDAGINE
                    </PrimaryButton>
                </div>
            </div>
        </div>

        {/* Tech Decor */}
        <div className="absolute bottom-12 left-12 hidden lg:block">
            <div className="flex items-center gap-4 text-white/10">
                <Search size={20} className="opacity-20" />
                <div className="text-left">
                    <div className="text-[10px] font-bold tracking-[0.4em] uppercase">Status: Active Investigation</div>
                    <div className="text-[9px] tracking-[0.2em] uppercase opacity-50">Protocol 002 // NOIR_SYSTEM</div>
                </div>
            </div>
        </div>
      </section>

      {/* 2. THE STORYTELLING: Cold Case Hook */}
      <section className="reveal-mystery section-padding-huge bg-black-pure border-y border-white/5">
        <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-48 items-center">
            <div className="space-y-16">
                <SectionHeading 
                  title="OGNI TAVOLO"
                  highlight="UN SOSPETTO"
                  subtitle="Il Delitto è Smart"
                />
                <div className="space-y-12 font-inter text-xl md:text-2xl text-text-secondary font-light leading-relaxed opacity-70">
                    <p>
                        Dimentica le vecchie cene con delitto. Qui non ci sono attori che urlano, ma prove che vibrano nel tuo smartphone.
                    </p>
                    <p>
                        Ricevi il fascicolo, analizza gli indizi digitali e interroga i sospettati. La tecnologia è la tua lente d&apos;ingrandimento.
                    </p>
                </div>
            </div>

            <div className="relative aspect-square">
                <PremiumCard className="h-full">
                    <Image 
                        src="/images/brand/bg-stage-lights.webp"
                        alt="Investigation Details"
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-50 transition-[filter,opacity] duration-1000"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black-pure via-transparent to-transparent opacity-90" />
                    <div className="absolute bottom-12 left-12">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full border border-accent-gold/20 flex items-center justify-center">
                                <Target size={20} className="text-accent-gold" />
                            </div>
                            <span className="font-syne text-xs uppercase tracking-[0.4em] text-accent-gold">Evidence Found</span>
                        </div>
                    </div>
                </PremiumCard>
            </div>
        </div>
      </section>

      {/* 3. INVESTIGATION FLOW: The Three Acts */}
      <section className="reveal-mystery section-padding-huge bg-black-pure">
        <div className="container-max">
            <div className="mb-32">
                <SectionHeading 
                  title="TRE FASI."
                  highlight="UN COLPEVOLE."
                  subtitle="Il Protocollo Investigativo"
                  align="center"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
                {[
                    { title: "Digital Briefing", desc: "Inquadra il QR code. Accedi al network. Ricevi la lista dei sospettati e il primo set di prove.", icon: <ShieldCheck size={32} /> },
                    { title: "The Scene", desc: "Durante la cena raccogli indizi e ascolta le testimonianze. Ogni portata svela un nuovo segreto.", icon: <Search size={32} /> },
                    { title: "The Accusation", desc: "Formula l&apos;accusa. Invia movente e arma del delitto tramite l&apos;App. Vinci la sfida.", icon: <Zap size={32} /> }
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

      {/* 4. CALL TO ACTION: Open the Case */}
      <section className="reveal-mystery section-padding-huge bg-black-pure border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.webp')] opacity-[0.02] mix-blend-overlay" />
        
        <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
                <h2 className="font-syne text-5xl md:text-8xl font-bold uppercase tracking-tighter leading-none text-text-primary">
                    RISOLVI <br />
                    <span className="text-accent-gold italic">IL CASO.</span>
                </h2>
                <p className="font-inter text-xl text-text-secondary/60 leading-relaxed max-w-xl">
                    Sei pronto a mettere alla prova il tuo intuito? Il Sistema è pronto. La tua squadra ti aspetta.
                </p>
                <div className="pt-8">
                    <a
                        href={buildWAUrl(WA_MESSAGES.cenaConDelitto)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-6 px-12 py-6 border border-accent-gold/40 text-accent-gold font-syne font-bold uppercase tracking-[0.4em] hover:bg-accent-gold hover:text-black-pure transition-[background-color,color,border-color] duration-500"
                    >
                        PRENOTA L&apos;INDAGINE
                        <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                    </a>
                </div>
            </div>

            <div className="relative aspect-video lg:aspect-square">
                <PremiumCard className="h-full">
                    <Image 
                        src="/images/brand/bg-hero-wide.webp"
                        alt="Trust is the real risk."
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-40 transition-[filter,opacity] duration-1000"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black-pure via-transparent to-transparent opacity-80" />
                </PremiumCard>
            </div>
        </div>
      </section>

      {/* 5. FINAL ACTION SECTION */}
      <section className="reveal-mystery section-padding-huge bg-accent-gold text-black-pure text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/noise.webp')] mix-blend-overlay" />
        </div>
        <div className="container-narrow space-y-16 relative z-10">
          <h2 className="font-syne text-6xl md:text-9xl font-bold uppercase tracking-tighter leading-[0.8]">
            ENTRA <br /> NEL <span className="bg-black-pure text-accent-gold px-4">MISTERO.</span>
          </h2>
          <div className="pt-12">
            <Link 
              href="/calendario"
              className="inline-flex items-center gap-8 px-16 py-8 bg-black-pure text-accent-gold text-xl font-black uppercase tracking-widest hover:bg-white hover:text-black-pure transition-[background-color,color] duration-500 rounded-full"
            >
              RISERVA IL TUO POSTO
            </Link>
          </div>
          <p className="font-syne text-[10px] uppercase tracking-[0.6em] font-black opacity-40">
            Posti limitati // Prenotazione obbligatoria
          </p>
        </div>
      </section>

    </main>
  );
}
