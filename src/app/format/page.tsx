
"use client";
import { animateHeroText, animateFade, animateCards } from "@/lib/gsapAnimations";
import { useGSAP } from "@/hooks/useGSAP";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { EXPERIMENTS } from "@/lib/constants";

export default function FormatPage() {
    useGSAP(() => {
        animateHeroText("#format-hero", 0.1);
        animateFade("#format-desc", "up", 0.3);
        animateCards("#formats-grid");
    });

    return (
        <main className="min-h-screen pt-32 pb-24 px-4 sm:px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-rama-text/70 hover:text-rama-accent transition-colors uppercase text-xs font-bold tracking-widest mb-8"
                    >
                        <ArrowLeft size={16} /> Torna alla Home
                    </Link>

                    <div id="format-hero" className="flex flex-col">
                        <h1 className="line font-bold text-rama-text font-mohave uppercase tracking-tighter text-5xl md:text-7xl">
                            <span>Scegli la tua <span className="text-rama-accent">serata.</span></span>
                        </h1>
                    </div>
                    <p
                        id="format-desc"
                        className="gsap-fade text-xl text-gray-400 mt-4 max-w-2xl font-light"
                    >
                        Quattro format. Posti limitati ogni sera. Quale fa per te?
                    </p>
                </div>

                <div id="formats-grid" className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 mt-16 border-t border-white/10 pt-16">
                    {EXPERIMENTS.map((format, index) => (
                        <div key={format.id} className="gsap-card flex flex-col group">
                            {/* Image Container */}
                            <Link href={`/format/${format.slug}`} className="relative aspect-video overflow-hidden rounded-2xl mb-6 block border border-white/10">
                                <Image 
                                    src={format.image || FALLBACK_IMAGE} 
                                    alt={format.name} 
                                    fill 
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                
                                {format.badge && (
                                    <div className="absolute top-4 right-4 bg-rama-accent text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg z-10">
                                        {format.badge}
                                    </div>
                                )}
                            </Link>

                            {/* Content */}
                            <div className="flex flex-col flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-sm font-mohave text-rama-accent tracking-widest uppercase">
                                        {format.desc}
                                    </span>
                                    <span className="text-xs font-mohave text-white/40 tracking-widest uppercase">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                </div>
                                
                                <Link href={`/format/${format.slug}`} className="group/title">
                                    <h2 className="text-3xl md:text-4xl font-mohave font-bold text-white uppercase tracking-tight mb-2 group-hover/title:text-rama-accent transition-colors">
                                        {format.name}
                                    </h2>
                                </Link>

                                <p className="text-base text-gray-400 font-outfit mb-4 line-clamp-2">
                                    {format.subtitle}
                                </p>

                                <div className="flex flex-wrap gap-3 mb-8">
                                    {format.details?.split(' · ').map((detail, idx) => (
                                        <span key={idx} className="text-[10px] uppercase font-outfit tracking-widest bg-white/5 border border-white/10 px-3 py-1 rounded-full text-white/70">
                                            {detail}
                                        </span>
                                    ))}
                                </div>

                                {/* CTA Buttons */}
                                <div className="mt-auto flex flex-col sm:flex-row gap-3">
                                    {format.ctaHref && format.ctaText && (
                                        <a 
                                            href={format.ctaHref}
                                            target={format.ctaHref.startsWith('http') ? "_blank" : undefined}
                                            rel={format.ctaHref.startsWith('http') ? "noopener noreferrer" : undefined}
                                            className="w-full sm:flex-1 bg-rama-accent text-black text-center text-xs font-bold uppercase tracking-widest px-6 py-4 rounded-full hover:bg-white transition-all transform active:scale-95 flex items-center justify-center gap-2"
                                        >
                                            {format.ctaText}
                                        </a>
                                    )}
                                    <Link 
                                        href={`/format/${format.slug}`}
                                        className="w-full sm:w-auto border border-white/20 text-white text-center text-xs font-bold uppercase tracking-widest px-6 py-4 rounded-full hover:border-rama-accent hover:text-rama-accent transition-all flex items-center justify-center gap-2"
                                    >
                                        Dettagli <ArrowUpRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
