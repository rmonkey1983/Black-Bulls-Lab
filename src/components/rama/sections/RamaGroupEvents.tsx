"use client";

import React from "react";
import { Users, Zap, BadgeEuro, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useGSAP } from "@/hooks/useGSAP";
import { animateCards, animateFade } from "@/lib/gsapAnimations";

const valueProps = [
    {
        icon: Users,
        label: "Per Piccoli e Grandi Gruppi",
        description:
            "Format progettati su misura per team aziendali, compleanni, addii al celibato e cene esclusive. Che siate in pochi o un grande gruppo, adattiamo l'esperienza: parliamo la lingua delle persone reali.",
    },
    {
        icon: Zap,
        label: "Alto coinvolgimento garantito",
        description:
            "Non siete spettatori: siete i protagonisti. I nostri format — da A Cena Con Il Bugiardo a THE GOLDEN VOICE, passando per Il PalQo e Cena Con Delitto — trasformano ogni tavolo in un palcoscenico. Il coinvolgimento non è un'opzione, è il prodotto.",
    },
    {
        icon: BadgeEuro,
        label: "Soluzioni accessibili e chiare",
        description:
            "Tutto incluso, nessuna sorpresa. Cena + spettacolo a partire da 50€ a persona. Pacchetti personalizzabili per aziende con preventivo trasparente. L'esperienza premium, senza il prezzo proibitivo.",
    },
];

export function RamaGroupEvents() {
    useGSAP(() => {
        animateCards("#group-events-grid");
        animateFade("#group-events-header", "up", 0.1);
    });

    return (
        <section
            id="gruppi-aziende"
            aria-label="Dinner Show per Gruppi e Aziende a Torino"
            className="w-full py-20 sm:py-32 px-4 sm:px-6 md:px-12 bg-transparent relative overflow-hidden"
        >
            {/* Subtle gold radial glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-rama-accent/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-7xl mx-auto">

                {/* Section Header */}
                <div id="group-events-header" className="text-center mb-12 sm:mb-20">
                    <span className="gsap-fade font-rock-salt text-rama-accent text-base sm:text-xl md:text-2xl mb-6 transform -rotate-1 block">
                        PER GRUPPI & AZIENDE
                    </span>
                    <h2 className="font-heading font-bold leading-[0.85] tracking-tighter uppercase text-white text-[12vw] sm:text-[10vw] md:text-[7vw] lg:text-[6vw] overflow-hidden mb-6">
                        <span className="gsap-fade block">FORMAT COLLAUDATI</span>
                        <span className="gsap-fade block text-rama-accent">E REPLICABILI</span>
                    </h2>
                    <p className="gsap-fade font-sans text-rama-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Cerchi qualcosa di originale per la tua cena aziendale a Torino?
                        I nostri format funzionano già — e funzionano per gruppi come il tuo.
                    </p>
                </div>

                {/* Value Props Grid / Slider on Mobile */}
                <div className="relative group/slider mb-14">
                    <div 
                        id="group-events-grid" 
                        className="flex md:grid md:grid-cols-3 gap-6 lg:gap-8 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory scrollbar-hide pb-8 md:pb-0 px-2 md:px-0"
                    >
                        {valueProps.map((prop, i) => {
                            const Icon = prop.icon;
                            return (
                                <article
                                    key={i}
                                    className="gsap-card group relative flex flex-col gap-4 p-7 lg:p-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:border-rama-accent/40 hover:bg-white/[0.06] transition-all duration-500 cursor-default min-w-[85vw] md:min-w-0 snap-center"
                                >
                                    {/* Corner glow on hover */}
                                    <div className="absolute top-0 left-0 w-16 h-16 bg-rama-accent/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                    {/* Icon */}
                                    <div className="w-12 h-12 rounded-xl border border-rama-accent/30 bg-rama-accent/10 flex items-center justify-center flex-shrink-0 group-hover:border-rama-accent/60 transition-colors duration-300">
                                        <Icon size={22} className="text-rama-accent" strokeWidth={1.5} />
                                    </div>

                                    {/* Text */}
                                    <h3 className="font-heading font-bold uppercase tracking-wide text-xl lg:text-2xl text-white leading-tight">
                                        {prop.label}
                                    </h3>
                                    <p className="font-sans text-rama-muted text-base leading-relaxed flex-grow">
                                        {prop.description}
                                    </p>
                                </article>
                            );
                        })}
                    </div>

                    {/* Mobile Scroll Indicator (Dots) */}
                    <div className="flex md:hidden justify-center gap-2 mt-2">
                        {valueProps.map((_, i) => (
                            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20 first:bg-rama-accent" />
                        ))}
                    </div>
                </div>

                {/* CTA Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/eventi-aziendali"
                        className="group inline-flex items-center gap-3 bg-rama-accent text-black font-heading font-bold uppercase tracking-widest text-base px-8 py-4 rounded-full hover:bg-white transition-colors duration-300"
                    >
                        Trasforma la tua prossima cena aziendale
                        <ArrowRight size={18} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 border border-white/20 text-white font-heading font-bold uppercase tracking-widest text-base px-8 py-4 rounded-full hover:border-rama-accent/60 hover:text-rama-accent transition-colors duration-300"
                    >
                        Parla con noi — è gratuito
                    </Link>
                </div>
            </div>
        </section>
    );
}
