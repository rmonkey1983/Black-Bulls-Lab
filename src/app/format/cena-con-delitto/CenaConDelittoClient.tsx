"use client";

import { useRef } from "react";
import { Search, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@/hooks/useGSAP";
import { animateHeroText, animateFade, animateCards } from "@/lib/gsapAnimations";
import { FormatQuickInfo } from "@/components/events/FormatQuickInfo";
import { buildWAUrl, WA_MESSAGES } from "@/lib/whatsapp";

export function CenaConDelittoClient() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        animateHeroText("#delitto-hero", 0.1);
        animateFade(".delitto-tag", "up", 0.3);
        animateFade(".delitto-desc", "up", 0.4);
        animateFade("#quick-info-title", "up", 0.1);
        animateCards("#quick-info-grid");
        animateFade("#how-it-works-title", "up", 0.1);
        animateCards("#how-it-works-grid");
        animateFade("#delitto-cta", "up", 0.1);
    }, { scope: containerRef });

    return (
        <main ref={containerRef} className="min-h-screen">
            <section className="relative min-h-[60vw] md:min-h-0 md:h-[85vh] w-full overflow-hidden flex items-end">
                <div className="absolute inset-0 z-0">
                    <Image 
                        src="/images/brand/bg-venue-crowd.webp" 
                        alt="Cena con Delitto" 
                        fill 
                        style={{ objectFit: 'cover' }}
                        className="opacity-40 contrast-125 grayscale"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-black/60 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/50 to-transparent" />
                    <div className="absolute inset-0 bg-[url('/noise.webp')] opacity-20 mix-blend-overlay pointer-events-none" />
                </div>

                <div className="absolute top-20 sm:top-24 left-4 sm:left-6 z-30">
                    <Link
                        href="/format"
                        className="flex items-center gap-2 text-rama-text/70 hover:text-rama-accent transition-colors uppercase text-xs font-bold tracking-widest backdrop-blur-sm bg-black/30 px-3 py-2 sm:px-4 rounded-full border border-white/10"
                    >
                        <ArrowLeft size={14} /> Tutti i format
                    </Link>
                </div>

                <div className="relative z-20 w-full max-w-7xl mx-auto p-6 md:p-12 mb-12">
                    <div id="delitto-hero" className="flex flex-col space-y-6">
                        <div className="delitto-tag flex flex-wrap items-center gap-3 text-rama-accent text-sm font-bold uppercase tracking-[0.2em]">
                            <span className="flex items-center gap-2 bg-rama-accent/10 backdrop-blur-sm px-3 py-1 rounded-full border border-rama-accent/20">
                                <Search size={14} /> Dinner Show & Investigation
                            </span>
                            <span className="flex items-center gap-2 bg-red-900/40 text-red-100 backdrop-blur-sm px-3 py-1 rounded-full border border-red-500/30">
                                Sold out frequente — Prenota in anticipo
                            </span>
                        </div>

                        <h1 className="sr-only">Cena Con Delitto Torino: Noir Experience interattiva</h1>
                        <div aria-hidden="true" className="line text-4xl sm:text-5xl md:text-8xl font-bold text-rama-text tracking-tighter leading-[0.9] drop-shadow-2xl">
                            <span>CENA CON</span><br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rama-accent via-white to-rama-accent">
                                <span>DELITTO</span>
                            </span>
                        </div>

                        <p className="delitto-desc text-base sm:text-xl md:text-3xl text-gray-300 font-light max-w-2xl border-l-4 border-rama-accent pl-4 sm:pl-6 italic">
                            Un omicidio, un cold case e la tua squadra. L&apos;indagine noir ora è completamente digitale.
                        </p>
                    </div>
                </div>
            </section>

            <FormatQuickInfo 
                duration="3 ore circa"
                capacity="20 - 150+ persone"
                price="Da 50€ / pers"
                highlight="Investigation Web App"
                highlightLabel="Tecnologia"
            />

            <section className="py-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 id="how-it-works-title" className="gsap-fade text-4xl md:text-5xl font-bold text-rama-text mb-4">
                            L&apos;INVESTIGAZIONE <span className="text-rama-accent italic">SMART</span>
                        </h2>
                        <div className="w-24 h-1 bg-rama-accent mx-auto" />
                    </div>

                    <div id="how-it-works-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {[
                            {
                                icon: <div className="font-heading text-2xl font-bold">01</div>,
                                title: "Briefing Digitale",
                                desc: "Ogni squadra accede alla Web App dedicata. Riceverai il fascicolo del caso, la lista dei sospettati e il primo set di prove direttamente sul tuo smartphone."
                            },
                            {
                                icon: <div className="font-heading text-2xl font-bold">02</div>,
                                title: "Setaccia il Campo",
                                desc: "Durante la cena raccogli indizi, ascolta le testimonianze e metti alla prova i sospetti. Ogni portata svela qualcosa di nuovo."
                            },
                            {
                                icon: <div className="font-heading text-2xl font-bold">03</div>,
                                title: "Il Verdetto Online",
                                desc: "Arrivati al caffè, dovrai formulare l'accusa. Invia il tuo verdetto tramite l'App identificando colpevole, movente e arma del delitto per vincere."
                            }
                        ].map((step, i) => (
                            <div
                                key={i}
                                className="gsap-card bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl hover:bg-white/10 transition-colors group flex md:flex-col items-center md:text-center gap-6"
                            >
                                <div className="w-12 h-12 md:w-16 md:h-16 bg-rama-accent/10 rounded-full flex items-center justify-center text-rama-accent shrink-0 group-hover:scale-110 transition-transform duration-300 border border-rama-accent/20">
                                    {step.icon}
                                </div>
                                <div className="flex flex-col md:items-center">
                                    <h3 className="text-xl md:text-2xl font-bold text-rama-text mb-2 md:mb-4">{step.title}</h3>
                                    <p className="text-gray-400 text-sm md:text-base leading-relaxed font-sans">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div id="delitto-cta" className="gsap-fade mt-16 md:mt-20 flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center">
                        <a
                            href={buildWAUrl(WA_MESSAGES.cenaConDelitto)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-rama-accent text-black font-extrabold uppercase tracking-widest hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(200,164,78,0.3)] rounded-sm"
                        >
                            Dimmi quando è la prossima data
                        </a>
                        <Link
                            href="/format"
                            className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-white/20 text-white font-bold uppercase tracking-widest hover:border-rama-accent hover:text-rama-accent transition-all duration-300 rounded-sm"
                        >
                            Dal Vivo a Torino
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
