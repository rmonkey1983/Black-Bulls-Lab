"use client";

import React from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { animateQuote, animateFade } from "@/lib/gsapAnimations";

export function RamaManifesto() {
    useGSAP(() => {
        animateQuote("#manifesto-quote");
        animateFade("#manifesto-content", "up", 0.1);
    });

    return (
        <section className="w-full py-20 sm:py-32 md:py-48 px-4 sm:px-6 md:px-12 bg-transparent relative flex items-center justify-center overflow-hidden">
            {/* Background Texture/Noise could go here */}
            <div className="absolute inset-0 bg-zinc-900/20 z-0"></div>

            <div className="relative z-10 w-full flex flex-col items-center text-center">
                <h2 className="sr-only">Black Bulls Lab: Format Immersivi per Cene Aziendali e Private a Torino</h2>

                <div id="manifesto-header" className="gsap-fade">
                    <span className="font-rock-salt text-rama-accent text-base sm:text-xl md:text-3xl mb-6 sm:mb-8 transform -rotate-2 block">
                        IL NOSTRO APPROCCIO
                    </span>
                </div>

                <div id="manifesto-quote" className="gsap-quote font-mohave font-bold leading-[0.85] tracking-tighter uppercase text-white flex flex-col text-[15vw] sm:text-[14vw] md:text-[10vw] w-full overflow-hidden">
                    <div className="reveal-block"><span className="inner">L&apos;ARTE DI</span></div>
                    <div className="reveal-block"><span className="inner text-rama-accent">STUPIRE</span></div>
                </div>

                <div id="manifesto-content" className="mt-16 w-full max-w-3xl text-center mx-auto text-rama-muted font-outfit text-lg md:text-2xl leading-relaxed space-y-6">
                    <p className="gsap-fade">
                        Black Bulls Lab è un&apos;agenzia di Torino specializzata in dinner show e format immersivi: serate in cui la cena e lo spettacolo diventano un&apos;unica esperienza interattiva, dove il pubblico non guarda — partecipa.
                    </p>
                    <p className="gsap-fade">
                        I nostri format — da A Cena Con Il Bugiardo a Il PalQo passando per Cena Con Il Delitto — sono progettati per funzionare ogni volta: per cene aziendali, team building, compleanni e gruppi privati di qualsiasi dimensione. Format collaudati, replicabili, e sempre originali.
                    </p>
                    <p className="gsap-fade text-white/90">
                        Non organizziamo eventi di lusso inaccessibili. Progettiamo esperienze autentiche a prezzi sostenibili, con cura ossessiva per ogni dettaglio. Per noi, un budget reale non è un limite: è una sfida creativa.
                    </p>
                </div>
            </div>
        </section>
    );
}

