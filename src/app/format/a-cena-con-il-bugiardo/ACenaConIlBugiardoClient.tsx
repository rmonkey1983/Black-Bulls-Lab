"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, Smartphone, Search, ShieldAlert, ArrowLeft, Zap, Play, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@/hooks/useGSAP";
import { useCinematic } from "@/hooks/useCinematic";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { buildWAUrl, WA_MESSAGES } from "@/lib/whatsapp";

export function ACenaConIlBugiardoClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const { revealOnScroll } = useCinematic();

  useGSAP(() => {
    // Spotlight movement - Intense crimson spotlight for tension
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
    tl.from(".bugiardo-title span", {
      y: 100,
      opacity: 0,
      filter: "blur(20px)",
      stagger: 0.2,
      duration: 2,
      ease: "expo.out"
    })
    .from(".bugiardo-sub", {
      opacity: 0,
      y: 20,
      duration: 1.5,
      ease: "power2.out"
    }, "-=1");

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, { scope: containerRef });

  revealOnScroll(".reveal-bugiardo");

  return (
    <main ref={containerRef} className="bg-black-pure text-text-primary min-h-screen selection:bg-accent-gold selection:text-black-pure overflow-x-hidden">
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/brand/bg-hero-wide.webp"
            alt="A Cena Con Il Bugiardo"
            fill
            sizes="100vw"
            className="object-cover opacity-25 contrast-125 scale-105"
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
              <span className="inline-block px-5 py-2 border border-accent-gold/20 text-accent-gold text-[10px] font-bold uppercase tracking-[0.6em] bg-accent-gold/5 backdrop-blur-md">
                Dinner Show Immersivo // Social Deduction
              </span>
            </div>

            <h1 className="bugiardo-title font-syne font-bold text-[clamp(2.8rem,7.5vw,7.5rem)] leading-[0.9] tracking-tighter uppercase text-text-primary flex flex-col items-center">
              <span>A Cena Con Il</span>
              <span className="text-accent-gold italic">Bugiardo.</span>
            </h1>

            <p className="bugiardo-sub font-inter text-text-secondary text-sm md:text-xl leading-relaxed tracking-[0.2em] uppercase opacity-75 max-w-3xl mx-auto">
              Per due ore... nessuno dirà la verità. <br className="hidden md:block" />
              Un esperimento di psicologia sociale, inganno e complicità al tavolo.
            </p>

            <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
              <PrimaryButton href="/calendario" size="lg" className="w-full sm:w-auto min-w-70">
                PRENOTA IL TUO TAVOLO
              </PrimaryButton>
              <a
                href={buildWAUrl(WA_MESSAGES.bugiardo)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-5 px-10 border border-white/10 text-white font-syne text-[10px] font-bold tracking-[0.3em] uppercase hover:border-accent-gold hover:text-accent-gold transition-all duration-500 bg-white/2 backdrop-blur-md text-center cursor-pointer"
              >
                RICHIEDI INFO EVENTO
              </a>
            </div>
          </div>
        </div>

        {/* Ambient Corner specs */}
        <div className="absolute bottom-12 left-12 hidden lg:block">
          <p className="font-syne text-[9px] text-text-secondary/20 uppercase tracking-[0.5em]">
            Format Code // BBL-BUG-001
          </p>
        </div>
        <div className="absolute bottom-12 right-12 hidden lg:block">
          <p className="font-syne text-[9px] text-accent-gold/40 uppercase tracking-[0.5em]">
            Status // Live Experience
          </p>
        </div>
      </section>

      {/* 2. THE MECHANICS */}
      <section className="reveal-bugiardo section-padding-huge bg-black-pure relative border-t border-white/5">
        <div className="container-max space-y-24">
          <SectionHeading
            title="NESSUN ATTORE."
            highlight="PROTAGONISTI SIETE VOI."
            subtitle="Le Regole del Gioco"
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                num: "01",
                title: "Siediti a Tavola",
                desc: "Gruppi da 20-30 persone, amici e sconosciuti, seduti insieme per un'esperienza gastronomica e sociale unica.",
                icon: Users
              },
              {
                num: "02",
                title: "Ricevi Dossier",
                desc: "Accedi alle tue istruzioni riservate dal tuo smartphone. Nessun download necessario, basta inquadrare il QR Code.",
                icon: Smartphone
              },
              {
                num: "03",
                title: "Indaga & Menti",
                desc: "Poni domande mirate, interpreta le micro-espressioni dei tuoi vicini e difendi la tua vera identità.",
                icon: Search
              },
              {
                num: "04",
                title: "Vota e Smaschera",
                desc: "Esprimi il tuo verdetto finale prima del dolce. Chi sa mentire con la massima naturalezza vince la serata.",
                icon: ShieldAlert
              }
            ].map((step, idx) => (
              <PremiumCard key={idx} className="p-8 space-y-6 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <step.icon className="text-accent-gold w-8 h-8" />
                    <span className="font-syne text-xs font-bold text-accent-gold/40 tracking-[0.3em]">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="font-syne text-xl font-bold uppercase text-text-primary tracking-tight">
                    {step.title}
                  </h3>
                  <p className="font-inter text-xs text-text-secondary leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>
              </PremiumCard>
            ))}
          </div>
        </div>
      </section>

      {/* 3. EXPERIENCE HIGHLIGHTS */}
      <section className="reveal-bugiardo section-padding-huge bg-black-elevated/20 relative border-t border-white/5">
        <div className="container-max grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 space-y-10">
            <SectionHeading
              title="INGEGNERIA"
              highlight="EMOTIVA LIVE."
              subtitle="Perché A Cena Con Il Bugiardo funziona"
              align="left"
            />
            
            <p className="font-inter text-base lg:text-lg text-text-secondary leading-relaxed font-light">
              Non si tratta di una classica cena con delitto dove si assiste a una recita. In <strong className="text-text-primary font-semibold">A Cena Con Il Bugiardo</strong>, l&apos;imprevisto nasce dalle interazioni reali tra le persone al tavolo.
            </p>

            <ul className="space-y-6 pt-4">
              {[
                { title: "Zero Palcoscenico", desc: "Nessuna pressione di dover recitare: il gioco scorre fluido durante la cena." },
                { title: "Social Deduction Pura", desc: "Sviluppato secondo le dinamiche dei migliori giochi di bluff psicologico." },
                { title: "Coinvolgimento Garantito", desc: "Perfetto sia per gruppi di amici che per chi vuole fare nuove conoscenze." }
              ].map((item, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <span className="w-2 h-2 rounded-full bg-accent-gold mt-2 shrink-0" />
                  <div>
                    <h4 className="font-syne text-sm font-bold uppercase text-text-primary tracking-wider">{item.title}</h4>
                    <p className="font-inter text-xs text-text-secondary/70 mt-1">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6 relative aspect-4/3 rounded-sm overflow-hidden border border-white/10">
            <Image
              src="/images/brand/bg-venue-crowd.webp"
              alt="Atmosfera Cena con il Bugiardo"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover contrast-110 opacity-60"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black-pure via-transparent to-transparent opacity-80" />
          </div>
        </div>
      </section>

      {/* 4. FINAL CTA */}
      <section className="reveal-bugiardo section-padding-huge bg-black-pure text-center border-t border-white/5">
        <div className="container-narrow space-y-12">
          <SectionHeading
            title="SEI PRONTO A"
            highlight="SMASCHERARE IL BUGIARDO?"
            subtitle="Partecipa al prossimo evento"
            align="center"
          />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <PrimaryButton href="/calendario" size="lg" className="w-full sm:w-auto min-w-70">
              VEDI CALENDARIO DATE
            </PrimaryButton>
            <Link
              href="/eventi-privati"
              className="font-syne text-xs uppercase tracking-[0.5em] text-accent-gold hover:text-white transition-colors"
            >
              ORGANIZZA UN EVENTO PRIVATO →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
