"use client";

import { animateHeroText, animateFade, animateCards } from "@/lib/gsapAnimations";
import { useGSAP } from "@/hooks/useGSAP";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { EXPERIMENTS } from "@/lib/constants";

export function FormatIndexClient() {
    useGSAP(() => {
        animateHeroText("#format-hero", 0.1);
        animateFade("#format-desc", "up", 0.3);
        animateCards("#formats-grid");
    });

    return (
        <main className="min-h-screen pt-32 pb-24 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-black">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%] opacity-20" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-12 border-l border-rama-accent/30 pl-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-rama-text/40 hover:text-rama-accent transition-colors uppercase text-[10px] font-bold tracking-[0.3em] mb-12"
                    >
                        <ArrowLeft size={14} /> TORNA ALLA HOME
                    </Link>

                    <div id="format-hero" className="flex flex-col">
                        <h1 className="line font-bold text-rama-text font-mohave uppercase tracking-tighter text-6xl md:text-8xl leading-[0.85]">
                            <span>SCEGLI IL TUO <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-rama-accent via-white to-rama-accent">PROGRAMMA.</span></span>
                        </h1>
                    </div>
                    <p
                        id="format-desc"
                        className="gsap-fade text-xl text-gray-500 mt-6 max-w-2xl font-light leading-relaxed"
                    >
                        Dall&apos;indagine noir al social deception. Ogni format è un&apos;esperienza digitale unica progettata nel nostro laboratorio di Torino.
                    </p>
                </div>

                <div id="formats-grid" className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mt-24">
                    {EXPERIMENTS.map((format, index) => (
                        <div key={format.id} className="gsap-card flex flex-col group relative">
                            {/* Tech index */}
                            <div className="absolute -top-6 -left-4 text-white/5 font-mohave text-[8rem] leading-none font-black select-none pointer-events-none z-0">
                                {String(index + 1).padStart(2, '0')}
                            </div>

                            {/* Image Container */}
                            <Link href={format.href} className="relative aspect-video overflow-hidden rounded-sm mb-8 block border border-white/5 group-hover:border-rama-accent/30 transition-colors z-10 bg-zinc-900">
                                <Image
                                    src={format.image || "/images/brand/bg-venue-crowd.png"}
                                    alt={format.name}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60 grayscale group-hover:grayscale-[0.2] group-hover:opacity-100"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                                
                                {format.badge && (
                                    <div className="absolute top-4 right-4 bg-rama-accent text-black text-[9px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-sm shadow-xl z-20">
                                        {format.badge}
                                    </div>
                                )}
                            </Link>

                            {/* Content */}
                            <div className="flex flex-col flex-1 relative z-10 px-2">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-[10px] font-mohave text-rama-accent font-bold tracking-[0.3em] uppercase opacity-70">
                                        {format.desc}
                                    </span>
                                </div>

                                <Link href={format.href} className="group/title">
                                    <h2 className="text-4xl md:text-5xl font-mohave font-bold text-white uppercase tracking-tighter mb-4 group-hover/title:text-rama-accent transition-colors leading-none">
                                        {format.name}
                                    </h2>
                                </Link>

                                <p className="text-base text-gray-500 font-outfit mb-6 line-clamp-2 leading-relaxed">
                                    {format.subtitle}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-10">
                                    {format.details?.split(' · ').map((detail, idx) => (
                                        <span key={idx} className="text-[9px] uppercase font-mohave tracking-widest bg-white/[0.03] border border-white/10 px-3 py-1.5 rounded-sm text-white/40">
                                            {detail}
                                        </span>
                                    ))}
                                </div>

                                {/* CTA Buttons */}
                                <div className="mt-auto flex flex-col sm:flex-row gap-4">
                                    <Link
                                        href={format.href}
                                        className="w-full sm:flex-1 bg-white text-black text-center text-[10px] font-bold uppercase tracking-[0.2em] px-8 py-5 rounded-sm hover:bg-rama-accent transition-all transform active:scale-95 flex items-center justify-center gap-2"
                                        aria-label={`Accedi al programma ${format.name}`}
                                    >
                                        ACCEDI AL PROGRAMMA <ArrowUpRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Corner Info */}
            <div className="fixed bottom-12 left-12 z-50 opacity-10 hidden lg:block">
                <div className="font-mohave text-[10px] tracking-[0.4em] uppercase space-y-2">
                    <div>BLACK BULLS LAB / TRN / ITA</div>
                    <div>ACTIVE PROTOCOLS: 004</div>
                </div>
            </div>
        </main>
    );
}
