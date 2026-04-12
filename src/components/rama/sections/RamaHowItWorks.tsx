"use client";

import React from "react";
import { ClipboardList, CalendarCheck, Star } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import clsx from "clsx";

const steps = [
    {
        icon: ClipboardList,
        number: "01",
        title: "Scegli il format",
        description: "Sfoglia i nostri show: A Cena Con Il Bugiardo, Il PalQo, Cena Con Delitto e The Golden Voice. Ogni format è progettato per stupire.",
    },
    {
        icon: CalendarCheck,
        number: "02",
        title: "Prenota o richiedi info",
        description: "Scrivici la data, il numero di persone e l'occasione. Ti rispondiamo entro 24 ore con un preventivo su misura.",
    },
    {
        icon: Star,
        number: "03",
        title: "Vivi la serata",
        description: "Arrivi, ti siedi e sparisci dalla realtà per 3 ore. Cena, spettacolo, sorprese — tutto già organizzato da noi.",
    },
];

export function RamaHowItWorks() {
    const { ref, inView } = useIntersectionObserver({ threshold: 0.1 });

    return (
        <section
            id="come-funziona"
            ref={ref as any}
            aria-label="Come funziona prenotare un dinner show con Black Bulls Lab"
            className="w-full py-20 sm:py-32 px-4 sm:px-6 md:px-12 bg-transparent relative overflow-hidden"
        >
            {/* Top accent line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-rama-accent/60 to-transparent" />

            <div className={clsx(
                "relative z-10 w-full max-w-6xl mx-auto transition-all duration-1000 transform",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}>
                {/* Header */}
                <div className="text-center mb-16 sm:mb-20">
                    <span className="font-rock-salt text-rama-accent text-base sm:text-xl transform -rotate-1 inline-block mb-6">
                        Semplice. Immediato. Indimenticabile.
                    </span>
                    <h2 className="font-mohave font-bold uppercase tracking-tighter text-white text-[12vw] sm:text-[9vw] md:text-[6vw] leading-[0.88]">
                        COME <span className="text-rama-accent">FUNZIONA</span>
                    </h2>
                </div>

                {/* Steps */}
                <div
                    id="how-it-works-steps"
                    className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-12 relative"
                >
                    {/* Connector line (desktop only) */}
                    <div className="hidden md:block absolute top-10 left-[16.66%] right-[16.66%] h-[1px] bg-gradient-to-r from-transparent via-rama-accent/30 to-transparent z-0" />

                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <article
                                key={step.number}
                                className={clsx(
                                    "relative flex flex-col items-start gap-5 p-8 lg:p-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:border-rama-accent/30 hover:bg-white/[0.05] transition-all duration-700 z-10 transform",
                                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                )}
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                {/* Step number badge */}
                                <div className="absolute -top-4 -left-2 font-mohave font-bold text-[6rem] md:text-[5rem] leading-none text-white/[0.04] select-none pointer-events-none">
                                    {step.number}
                                </div>

                                {/* Icon */}
                                <div className="w-12 h-12 rounded-xl border border-rama-accent/30 bg-rama-accent/10 flex items-center justify-center flex-shrink-0">
                                    <Icon size={22} className="text-rama-accent" strokeWidth={1.5} />
                                </div>

                                {/* Content */}
                                <div className="flex flex-col gap-2">
                                    <span className="font-mohave font-bold uppercase tracking-widest text-rama-accent text-xs">
                                        Step {step.number}
                                    </span>
                                    <h3 className="font-mohave font-bold uppercase tracking-wide text-white text-xl lg:text-2xl leading-tight">
                                        {step.title}
                                    </h3>
                                    <p className="font-outfit text-rama-muted text-base leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
