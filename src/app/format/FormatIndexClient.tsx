"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@/hooks/useGSAP";
import { useCinematic } from "@/hooks/useCinematic";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { EXPERIMENTS } from "@/lib/constants";

export function FormatIndexClient() {
    const containerRef = useRef<HTMLDivElement>(null);
    const spotlightRef = useRef<HTMLDivElement>(null);
    const { revealOnScroll, staggerReveal, softParallax } = useCinematic();

    useGSAP(() => {
        // Mouse reactive lighting effect
        const handleMouseMove = (e: MouseEvent) => {
            if (!spotlightRef.current) return;
            const { clientX, clientY } = e;
            gsap.to(spotlightRef.current, {
                x: clientX,
                y: clientY,
                duration: 2,
                ease: "power2.out"
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        // Hero Animation
        const tl = gsap.timeline();
        tl.from(".format-hero-headline span", {
            y: 100,
            opacity: 0,
            filter: "blur(20px)",
            duration: 2,
            stagger: 0.3,
            ease: "expo.out"
        })
        .from(".format-hero-sub", {
            opacity: 0,
            y: 20,
            duration: 1.5,
            ease: "power2.out"
        }, "-=1.5");

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, { scope: containerRef });

    // Apply reveal animations
    revealOnScroll(".reveal-section");
    staggerReveal(".formats-list", ".format-item");

    return (
        <main ref={containerRef} className="bg-black-pure text-text-primary min-h-screen selection:bg-accent-gold selection:text-black-pure overflow-x-hidden">
            {/* 1. HERO SECTION */}
            <section className="relative h-[70vh] min-h-125 flex items-center justify-center overflow-hidden border-b border-white/5">
                {/* Background Layer */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <Image
                        src="/images/brand/bg-hero-wide.webp"
                        alt="Formats Background"
                        fill
                        sizes="100vw"
                        className="object-cover opacity-20 scale-105"
                        priority
                    />
                    
                    {/* Spotlight Effect */}
                    <div 
                        ref={spotlightRef}
                        className="absolute top-0 left-0 w-200 h-200 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 hidden lg:block"
                        style={{
                            background: 'radial-gradient(circle, rgba(200, 169, 107, 0.05) 0%, transparent 70%)',
                            filter: 'blur(80px)'
                        }}
                    />

                    {/* Cinematic Overlays */}
                    <div className="absolute inset-0 bg-linear-to-b from-black-pure/80 via-transparent to-black-pure z-10" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(11,11,11,0.9)_100%)] z-10" />
                    <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.webp')] mix-blend-overlay z-20" />
                </div>

                <div className="relative z-30 container-max px-6">
                    <div className="mb-6 md:mb-12">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-3 text-text-secondary/40 hover:text-accent-gold transition-colors group uppercase text-[10px] font-bold tracking-[0.4em] mb-12"
                        >
                            <ArrowLeft size={14} className="group-hover:-translate-x-2 transition-transform" /> 
                            TORNA ALLA HOME
                        </Link>
                    </div>

                    <div className="max-w-4xl">
                        <h1 className="format-hero-headline flex flex-col">
                            <span className="block font-syne font-bold text-[clamp(2.5rem,8vw,7rem)] leading-[0.85] tracking-tighter uppercase text-text-primary">
                                Scegli la tua
                            </span>
                            <span className="block font-syne font-bold text-[clamp(2.5rem,8vw,7rem)] leading-[0.85] tracking-tighter uppercase text-accent-gold italic">
                                Prossima Realtà.
                            </span>
                        </h1>
                        <p className="format-hero-sub mt-8 font-inter text-text-secondary text-sm md:text-xl leading-relaxed tracking-[0.2em] uppercase opacity-70 max-w-2xl">
                            Dall'ingegneria emotiva alla tua serata. <br className="hidden md:block" />
                            Quattro universi narrativi interattivi pronti da vivere.
                        </p>
                    </div>
                </div>

                {/* Framing Elements */}
                <div className="absolute top-12 left-12 w-12 h-px bg-white/10 hidden lg:block" />
                <div className="absolute top-12 left-12 w-px h-12 bg-white/10 hidden lg:block" />
            </section>

            {/* 2. FORMATS LIST - Editorial Layout */}
            <section className="py-16 md:py-24 lg:py-32 bg-black-pure relative">
                <div className="container-max">
                    <div className="formats-list space-y-12 md:space-y-20 lg:space-y-32">
                        {EXPERIMENTS.map((format, index) => (
                            <div 
                                key={format.id} 
                                className={`format-item reveal-section grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-24 items-center ${
                                    index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
                                }`}
                            >
                                {/* Visual Side */}
                                <div className={`lg:col-span-7 relative group ${
                                    index % 2 !== 0 ? 'lg:order-2' : ''
                                }`}>
                                    <PremiumCard href={format.href} className="aspect-video md:aspect-21/9 lg:aspect-16/10">
                                        <Image
                                            src={format.image}
                                            alt={format.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
                                            className="object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-60 transition-[filter,opacity,transform] duration-1000 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-black-pure via-transparent to-transparent opacity-80" />
                                        
                                        {/* Floating Tech Index */}
                                        <div className="absolute -top-6 -left-4 md:-top-10 md:-left-10 text-white/5 font-syne text-[6rem] md:text-[10rem] lg:text-[15rem] font-bold leading-none select-none pointer-events-none">
                                            {String(index + 1).padStart(2, '0')}
                                        </div>

                                        <div className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-12 md:right-12 flex justify-between items-end">
                                            <div className="space-y-4">
                                                <span className="font-syne text-[10px] text-accent-gold tracking-[0.5em] uppercase border-b border-accent-gold/20 pb-2">
                                                    {format.badge}
                                                </span>
                                                <h3 className="font-syne text-3xl md:text-5xl lg:text-6xl font-bold uppercase text-text-primary tracking-tighter leading-none">
                                                    {format.name}
                                                </h3>
                                            </div>
                                            <div className="hidden md:block">
                                                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent-gold/40 transition-colors duration-500">
                                                    <ArrowRight size={20} className="text-white/40 group-hover:text-accent-gold group-hover:translate-x-1 transition-[color,transform]" />
                                                </div>
                                            </div>
                                        </div>
                                    </PremiumCard>
                                </div>

                                {/* Content Side */}
                                <div className={`lg:col-span-5 space-y-12 ${
                                    index % 2 !== 0 ? 'lg:order-1 lg:text-right' : ''
                                }`}>
                                    <div className={`space-y-6 ${index % 2 !== 0 ? 'lg:items-end flex flex-col' : ''}`}>
                                        <div className="w-12 h-px bg-accent-gold/40" />
                                        <p className="font-syne text-xs text-accent-gold tracking-[0.5em] uppercase font-bold">
                                            {format.desc}
                                        </p>
                                    </div>

                                    <div className="space-y-8">
                                        <h2 className="font-syne text-4xl lg:text-6xl font-bold uppercase tracking-tighter leading-none text-text-primary">
                                            {format.subtitle}
                                        </h2>
                                        <p className="font-inter text-lg lg:text-xl text-text-secondary font-light leading-relaxed opacity-70">
                                            {format.longDesc}
                                        </p>
                                    </div>

                                    <div className={`flex flex-wrap gap-4 pt-4 ${index % 2 !== 0 ? 'lg:justify-end' : ''}`}>
                                        {format.details?.split(' · ').map((detail, idx) => (
                                            <span key={idx} className="text-[10px] uppercase font-syne tracking-[0.3em] border border-white/5 bg-white/3 px-4 py-2 text-text-secondary/60">
                                                {detail}
                                            </span>
                                        ))}
                                    </div>

                                    <div className={`pt-12 flex flex-col sm:flex-row items-center gap-6 ${index % 2 !== 0 ? 'lg:justify-end' : ''}`}>
                                        <PrimaryButton href={format.href} className="w-full sm:w-auto min-w-50">
                                            VIVI IL FORMAT
                                        </PrimaryButton>
                                        <Link 
                                            href={format.ctaHref || "#"} 
                                            className="font-syne text-[10px] uppercase tracking-[0.5em] text-text-secondary hover:text-accent-gold transition-colors py-4 px-6 border border-transparent hover:border-accent-gold/20"
                                        >
                                            UNISCITI AL TAVOLO →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. FINAL EMOTIONAL CTA - Reusing the same from home for consistency */}
            <section className="reveal-section section-padding-huge bg-black-pure border-t border-white/5 text-center">
                <div className="container-narrow space-y-16">
                    <SectionHeading 
                        title="PRONTO A"
                        highlight="SFIDARE IL SISTEMA?"
                        subtitle="La tua esperienza inizia qui"
                        align="center"
                    />
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                        <PrimaryButton href="/calendario" size="lg" className="w-full sm:w-auto min-w-70">
                            VEDI CALENDARIO
                        </PrimaryButton>
                        <Link 
                            href="/eventi-aziendali" 
                            className="font-syne text-xs uppercase tracking-[0.6em] text-accent-gold hover:text-white transition-colors"
                        >
                            PER AZIENDE →
                        </Link>
                    </div>
                </div>
            </section>

            {/* Corner Metadata Decor */}
            <div className="fixed bottom-12 left-12 z-50 opacity-10 hidden lg:block">
                <div className="font-syne text-[10px] tracking-[0.4em] uppercase space-y-2">
                    <div>BLACK BULLS LAB / TRN / ITA</div>
                    <div>PROTOCOLLI ATTIVI: {EXPERIMENTS.length}</div>
                </div>
            </div>
        </main>
    );
}
