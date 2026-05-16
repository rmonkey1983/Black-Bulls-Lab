"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Smartphone, CheckCircle2, AlertTriangle, Building2, PartyPopper, Zap, ArrowLeft } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@/hooks/useGSAP";
import { animateHeroText, animateFade, animateCards } from "@/lib/gsapAnimations";
import { FormatQuickInfo } from "@/components/events/FormatQuickInfo";
import { Anton } from "next/font/google";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

export function ACenaConIlBugiardoClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

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
    tl.from(".liar-title span", {
      y: 100,
      opacity: 0,
      filter: "blur(20px)",
      stagger: 0.2,
      duration: 2,
      ease: "expo.out"
    })
    .from(".liar-quote", {
      opacity: 0,
      x: -30,
      duration: 1.5,
      ease: "power2.out"
    }, "-=1");

    const revealItems = gsap.utils.toArray(".reveal-liar");
    revealItems.forEach((item: any) => {
      gsap.from(item, {
        opacity: 0,
        y: 50,
        filter: "blur(10px)",
        duration: 1.5,
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
    });

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className={`${anton.variable} min-h-screen bg-black-pure text-white font-sans selection:bg-red-600 selection:text-white overflow-x-hidden`}>
      
      {/* 1. CINEMATIC HERO: The Thriller Entry */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/brand/background.webp"
            alt="The Liar Universe"
            fill
            className="object-cover opacity-20 scale-110"
            priority
          />
          
          {/* Red Spotlight Effect */}
          <div 
            ref={spotlightRef}
            className="absolute top-0 left-0 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 opacity-40"
            style={{
              background: 'radial-gradient(circle, rgba(220, 38, 38, 0.15) 0%, transparent 70%)',
              filter: 'blur(60px)'
            }}
          />

          {/* Cinematic Overlays */}
          <div className="absolute inset-0 bg-linear-to-b from-black-pure/90 via-transparent to-black-pure z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-10" />
          <div className="absolute inset-0 opacity-[0.05] bg-[url('/noise.webp')] mix-blend-overlay z-20" />
        </div>

        {/* Back Link */}
        <div className="absolute top-12 left-12 z-50">
            <Link
                href="/format"
                className="group flex items-center gap-4 text-white/30 hover:text-red-600 transition-all uppercase text-[10px] font-bold tracking-[0.5em]"
            >
                <ArrowLeft size={14} className="group-hover:-translate-x-2 transition-transform" /> 
                Esci dal Sistema
            </Link>
        </div>

        <div className="relative z-30 container-max px-6 text-center">
            <div className="space-y-12">
                <div className="flex flex-col items-center gap-6">
                    <span className="reveal-liar inline-block px-4 py-1 border border-red-600/30 text-red-600 text-[10px] font-bold uppercase tracking-[0.6em] bg-red-600/5 backdrop-blur-md">
                        Protocol: Social Deception
                    </span>
                    <h1 className="liar-title font-anton text-[clamp(3rem,12vw,12rem)] leading-[0.8] tracking-tighter uppercase text-white flex flex-col">
                        <span className="block">Nessuno è</span>
                        <span className="block text-red-600 italic">Innocente.</span>
                    </h1>
                </div>

                <div className="liar-quote max-w-2xl mx-auto border-l border-red-600/30 pl-8 text-left">
                    <p className="font-inter text-xl md:text-2xl text-white/60 font-light leading-relaxed italic">
                        &quot;La verità non è ciò che accade, ma ciò che riesci a far credere agli altri.&quot;
                    </p>
                </div>

                <div className="pt-12">
                    <Link 
                      href="/calendario"
                      className="group relative inline-flex items-center gap-6 px-12 py-6 bg-red-600 text-white text-sm font-bold uppercase tracking-[0.4em] hover:bg-white hover:text-red-600 transition-all duration-700 overflow-hidden"
                    >
                      <span className="relative z-10">Inizia la Sfida</span>
                      <Zap size={18} className="relative z-10 group-hover:animate-pulse" />
                      <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                    </Link>
                </div>
            </div>
        </div>

        {/* Framing Decor */}
        <div className="absolute bottom-12 left-12 w-32 h-px bg-white/5" />
        <div className="absolute bottom-12 left-12 w-px h-32 bg-white/5" />
        <div className="absolute top-12 right-12 text-[10px] text-white/10 tracking-[0.5em] uppercase vertical-text">
            Active Session: 004 // TRN_LAB
        </div>
      </section>

      {/* 2. THE PSYCHOLOGICAL HOOK */}
      <section className="py-48 px-6 bg-black-pure relative">
        <div className="container-narrow text-center space-y-16">
          <div className="reveal-liar space-y-8">
            <h2 className="font-anton text-4xl md:text-7xl uppercase tracking-tighter leading-none">
              Il tuo smartphone <br /> è <span className="text-red-600">la tua unica arma.</span>
            </h2>
            <div className="w-20 h-px bg-red-600 mx-auto opacity-30" />
            <p className="font-inter text-lg md:text-xl text-white/40 leading-relaxed max-w-2xl mx-auto">
              Niente attori. Niente copioni. Solo tu, il tuo network e il Sistema che monitora ogni tua mossa. Chi sceglierai di tradire stasera?
            </p>
          </div>
        </div>
      </section>

      {/* 3. RULES OF THE GAME: Dramatic Grid */}
      <section className="py-48 bg-black-pure border-y border-white/5">
        <div className="container-max px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {[
              {
                id: "01",
                title: "Infiltrati",
                desc: "Accedi al Sistema. Ricevi il tuo ruolo segreto. Sei la preda o il predatore?",
                icon: <Smartphone size={32} />
              },
              {
                id: "02",
                title: "Manipola",
                desc: "Usa gli indizi per seminare il dubbio. Baratta segreti per sopravvivere al tavolo.",
                icon: <Zap size={32} />
              },
              {
                id: "03",
                title: "Esegui",
                desc: "Identifica il Bugiardo prima dell&apos;ultima portata. O guarda il Sistema vincere.",
                icon: <CheckCircle2 size={32} />
              }
            ].map((item) => (
              <div key={item.id} className="reveal-liar group p-12 border border-white/5 bg-white/2 hover:bg-red-600/2 hover:border-red-600/20 transition-all duration-1000">
                <div className="text-red-600 font-anton text-6xl opacity-20 group-hover:opacity-100 transition-opacity duration-1000 mb-8">
                  {item.id}
                </div>
                <h3 className="font-anton text-3xl uppercase tracking-tighter text-white mb-6">
                  {item.title}
                </h3>
                <p className="font-inter text-white/40 leading-relaxed group-hover:text-white/70 transition-colors">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. IMMERSIVE QUOTE INTERSTITIAL */}
      <section className="h-[60vh] flex items-center justify-center bg-black-pure relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/brand/bg-venue-crowd.webp')] opacity-5 grayscale scale-125 rotate-3" />
        <div className="container-narrow text-center relative z-10">
          <p className="reveal-liar font-anton text-3xl md:text-6xl uppercase tracking-tighter leading-tight text-white/80 italic">
            &quot;In questo gioco, l&apos;unico errore <br /> è credere di avere amici.&quot;
          </p>
        </div>
      </section>

      {/* 5. THE TARGETS: Darker Tone */}
      <section className="py-48 px-6 bg-black-pure">
        <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="reveal-liar p-16 border border-white/5 bg-white/1 space-y-8">
            <span className="text-red-600 font-bold text-[10px] uppercase tracking-[0.5em]">Corporate Warfare</span>
            <h3 className="font-anton text-5xl uppercase tracking-tighter text-white">Soft skills <br /> sotto pressione.</h3>
            <p className="font-inter text-white/40 text-lg leading-relaxed">
              Negoziazione spietata e deduzione logica. Metti alla prova la vera gerarchia del tuo ufficio.
            </p>
          </div>
          <div className="reveal-liar p-16 border border-white/5 bg-white/1 space-y-8">
            <span className="text-red-600 font-bold text-[10px] uppercase tracking-[0.5em]">Private Social Game</span>
            <h3 className="font-anton text-5xl uppercase tracking-tighter text-white">Niente sarà <br /> come prima.</h3>
            <p className="font-inter text-white/40 text-lg leading-relaxed">
              Scopri chi sono davvero i tuoi amici. Una serata che rimarrà impressa nella memoria collettiva.
            </p>
          </div>
        </div>
      </section>

      {/* 6. FINAL ACTION: Maximum Urgency */}
      <section className="py-64 bg-red-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/noise.webp')] mix-blend-overlay" />
        </div>
        <div className="container-narrow text-center relative z-10 space-y-16">
          <h2 className="font-anton text-6xl md:text-9xl uppercase tracking-tighter leading-[0.8] text-black">
            Accetta il <br /> <span className="bg-black text-red-600 px-4">Rischio.</span>
          </h2>
          <p className="font-syne text-[10px] text-black uppercase tracking-[0.8em] font-black opacity-60">
            Posti limitati // Sessioni esclusive
          </p>
          <div className="pt-8">
            <Link 
              href="/calendario"
              className="inline-flex items-center gap-6 px-16 py-8 bg-black text-red-600 text-xl font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500 rounded-full shadow-2xl"
            >
              RISERVA IL TUO POSTO
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
