"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mic, Utensils, GlassWater, Zap, ArrowLeft, Users, Star } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@/hooks/useGSAP";
import { useCinematic } from "@/hooks/useCinematic";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { PremiumCard } from "@/components/ui/PremiumCard";

export function TalentsClient() {
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

        // Hero Reveal
        const tl = gsap.timeline();
        tl.from(".talent-title span", {
            y: 100,
            opacity: 0,
            filter: "blur(20px)",
            stagger: 0.2,
            duration: 2,
            ease: "expo.out"
        })
        .from(".talent-sub", {
            opacity: 0,
            y: 20,
            duration: 1.5,
            ease: "power2.out"
        }, "-=1");

        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, { scope: containerRef });

    revealOnScroll(".reveal-talent");

    return (
        <main ref={containerRef} className="bg-black-pure text-text-primary min-h-screen selection:bg-accent-gold selection:text-black-pure overflow-x-hidden">
            
            {/* 1. CINEMATIC HERO */}
            <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/brand/service-performance.webp"
                        alt="Join the Lab Cast"
                        fill
                        className="object-cover opacity-20 scale-105"
                        priority
                    />
                    
                    <div 
                        ref={spotlightRef}
                        className="absolute top-0 left-0 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 opacity-30"
                        style={{
                            background: 'radial-gradient(circle, rgba(200, 169, 107, 0.08) 0%, transparent 70%)',
                            filter: 'blur(80px)'
                        }}
                    />

                    <div className="absolute inset-0 bg-linear-to-b from-black-pure/90 via-transparent to-black-pure z-10" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)] z-10" />
                    <div className="absolute inset-0 opacity-[0.05] bg-[url('/noise.webp')] mix-blend-overlay z-20" />
                </div>

                {/* Navigation Link */}
                <div className="absolute top-12 left-12 z-50">
                    <Link
                        href="/"
                        className="group flex items-center gap-4 text-text-secondary/30 hover:text-accent-gold transition-all uppercase text-[10px] font-bold tracking-[0.5em]"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-2 transition-transform" /> 
                        Torna alla Home
                    </Link>
                </div>

                <div className="relative z-30 container-max px-6 text-center">
                    <div className="space-y-12">
                        <div className="flex flex-col items-center gap-6">
                            <span className="reveal-talent inline-block px-4 py-1 border border-accent-gold/20 text-accent-gold text-[10px] font-bold uppercase tracking-[0.6em] bg-accent-gold/5 backdrop-blur-md">
                                Recruitment Protocol
                            </span>
                            <h1 className="talent-title font-syne font-bold text-[clamp(3rem,10vw,12rem)] leading-[0.8] tracking-tighter uppercase text-text-primary flex flex-col">
                                <span className="block">Entra nel</span>
                                <span className="block text-accent-gold italic">Cast.</span>
                            </h1>
                        </div>

                        <div className="talent-sub max-w-2xl mx-auto">
                            <p className="font-inter text-lg md:text-2xl text-text-secondary font-light leading-relaxed uppercase tracking-[0.2em] opacity-60">
                                Non cerchiamo semplici esecutori. <br />
                                Cerchiamo chi non ha paura di rompere gli schemi.
                            </p>
                        </div>

                        <div className="pt-12 flex flex-col sm:flex-row items-center justify-center gap-8">
                            <PrimaryButton href="#roles-grid" size="lg" className="w-full sm:w-auto min-w-[280px]">
                                SCOPRI LE POSIZIONI
                            </PrimaryButton>
                        </div>
                    </div>
                </div>

                {/* Tech Decor */}
                <div className="absolute bottom-12 right-12 hidden lg:block">
                    <div className="flex items-center gap-4 text-white/10">
                        <Star size={20} className="opacity-20" />
                        <div className="text-right">
                            <div className="text-[10px] font-bold tracking-[0.4em] uppercase">Talent Division</div>
                            <div className="text-[9px] tracking-[0.2em] uppercase opacity-50">Protocol: JOIN_THE_LAB</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. THE PHILOSOPHY */}
            <section className="reveal-talent section-padding-huge bg-black-pure border-y border-white/5">
                <div className="container-narrow text-center space-y-16">
                    <SectionHeading 
                        title="SFIDA"
                        highlight="IL SISTEMA"
                        subtitle="La Nostra Filosofia"
                        align="center"
                    />
                    <p className="font-inter text-xl md:text-3xl text-text-secondary/60 font-light leading-relaxed italic">
                        &quot;L&apos;intrattenimento è un&apos;arma di coinvolgimento di massa. Il nostro cast è il cuore pulsante di questa rivoluzione.&quot;
                    </p>
                </div>
            </section>

            {/* 3. ROLES GRID */}
            <section id="roles-grid" className="reveal-talent section-padding-huge bg-black-pure">
                <div className="container-max">
                    <div className="mb-32 text-center">
                        <SectionHeading 
                          title="POSIZIONI"
                          highlight="APERTE"
                          subtitle="Selezioniamo Eccellenze"
                          align="center"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                        {[
                            { role: "Performer", icon: Mic, desc: "Cantanti, attori, performer immersivi." },
                            { role: "Chef", icon: Utensils, desc: "Cucina sperimentale e dinner show." },
                            { role: "Bartender", icon: GlassWater, desc: "Mixology, Alchimia & Servizio Premium." },
                            { role: "Technician", icon: Zap, desc: "Regia Luci, Audio & Show Control." },
                        ].map((item) => (
                            <PremiumCard key={item.role} className="p-12 border border-white/5 bg-white/[0.01] hover:border-accent-gold/20 transition-all duration-700 text-center flex flex-col items-center gap-8">
                                <div className="w-16 h-16 rounded-full border border-accent-gold/10 flex items-center justify-center text-accent-gold group-hover:scale-110 transition-transform duration-700">
                                    <item.icon size={32} />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="font-syne font-bold text-text-primary uppercase tracking-wider text-2xl">{item.role}</h3>
                                    <p className="font-inter text-[10px] text-text-secondary/40 uppercase tracking-widest leading-relaxed">{item.desc}</p>
                                </div>
                            </PremiumCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. FINAL CTA */}
            <section className="reveal-talent section-padding-huge bg-accent-gold text-black-pure text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[url('/noise.webp')] mix-blend-overlay" />
                </div>
                <div className="container-narrow space-y-16 relative z-10">
                    <h2 className="font-syne text-6xl md:text-9xl font-bold uppercase tracking-tighter leading-[0.8]">
                        DIVENTA <br /> <span className="bg-black-pure text-accent-gold px-4">L&apos;IMPATTO.</span>
                    </h2>
                    <div className="pt-12">
                        <Link 
                            href="/calendario"
                            className="inline-flex items-center gap-8 px-16 py-8 bg-black-pure text-accent-gold text-xl font-black uppercase tracking-widest hover:bg-white hover:text-black-pure transition-all duration-500 rounded-full"
                        >
                            PRENDI IL TUO POSTO
                        </Link>
                    </div>
                    <p className="font-syne text-[10px] uppercase tracking-[0.6em] font-black opacity-40">
                        Selezioni limitate // Solo per menti creative
                    </p>
                </div>
            </section>

        </main>
    );
}
