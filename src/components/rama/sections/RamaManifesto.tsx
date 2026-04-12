"use client";

import React from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import clsx from "clsx";

export function RamaManifesto() {
    const { ref, inView } = useIntersectionObserver({ threshold: 0.1 });

    return (
        <section ref={ref as any} className="w-full py-20 sm:py-32 md:py-48 px-4 sm:px-6 md:px-12 bg-transparent relative flex flex-col items-center justify-center overflow-hidden">
            {/* Elegant visual separator */}
            <div className="w-px h-24 bg-gradient-to-b from-transparent via-rama-accent/50 to-transparent mb-16 mx-auto"></div>
            {/* Background Texture/Noise could go here */}
            <div className="absolute inset-0 bg-zinc-900/20 z-0"></div>

            <div className="relative z-10 w-full flex flex-col items-center text-center">
                <h2 className="sr-only">Black Bulls Lab: Format Immersivi per Cene Aziendali e Private a Torino</h2>

                <div className={clsx(
                    "transition-all duration-1000 transform",
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}>
                    <span className="font-rock-salt text-rama-accent text-base sm:text-xl md:text-3xl mb-6 sm:mb-8 transform -rotate-2 block">
                        IL NOSTRO APPROCCIO
                    </span>
                </div>

                <div className={clsx(
                    "font-mohave font-bold leading-[0.85] tracking-tighter uppercase text-white flex flex-col text-[15vw] sm:text-[14vw] md:text-[10vw] w-full transition-all duration-1000 delay-200 transform",
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}>
                    <div><span>L&apos;ARTE DI</span></div>
                    <div><span className="text-rama-accent">STUPIRE</span></div>
                </div>

                <div className={clsx(
                    "mt-16 w-full max-w-3xl text-center mx-auto text-rama-muted font-outfit text-lg md:text-2xl leading-relaxed space-y-6 transition-all duration-1000 delay-500 transform",
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}>
                    <p>
                        Black Bulls Lab è un&apos;agenzia di Torino specializzata in dinner show e format immersivi: serate in cui la cena e lo spettacolo diventano un&apos;unica esperienza interattiva, dove il pubblico non guarda — partecipa.
                    </p>
                    <p>
                        I nostri format — A Cena Con Il Bugiardo, Il PalQo, Cena Con Delitto e THE GOLDEN VOICE — sono progettati per funzionare ogni volta: per cene aziendali, team building, compleanni e gruppi privati di qualsiasi dimensione. Format collaudati, replicabili, e sempre originali.
                    </p>
                    <p className="text-white/90">
                        Non organizziamo eventi di lusso inaccessibili. Progettiamo esperienze autentiche a prezzi sostenibili, con cura ossessiva per ogni dettaglio. Per noi, un budget reale non è un limite: è una sfida creativa.
                    </p>
                </div>
            </div>
        </section>
    );
}

