"use client";

import React from "react";
import { motion } from "framer-motion";
import { ClipboardList, CalendarCheck, Star } from "lucide-react";

const steps = [
    {
        icon: ClipboardList,
        number: "01",
        title: "Scegli il format",
        description: "Sfoglia i nostri show: Cena con Delitto, Il Palqo, Notte Medievale. Ogni format è progettato per stupire.",
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
        description: "Arrivia, siediti, lasciati trasportare. Il resto lo facciamo noi — cucina, spettacolo, regia, tutto incluso.",
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
};

export function RamaHowItWorks() {
    return (
        <section
            id="come-funziona"
            aria-label="Come funziona prenotare un dinner show con Black Bulls Lab"
            className="w-full py-20 sm:py-32 px-4 sm:px-6 md:px-12 bg-transparent relative overflow-hidden"
        >
            {/* Top accent line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-rama-accent/60 to-transparent" />

            <div className="relative z-10 w-full max-w-6xl mx-auto">
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
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                >
                    {/* Connector line (desktop only) */}
                    <div className="hidden md:block absolute top-10 left-[16.66%] right-[16.66%] h-[1px] bg-gradient-to-r from-transparent via-rama-accent/30 to-transparent z-0" />

                    {steps.map((step) => {
                        const Icon = step.icon;
                        return (
                            <motion.article
                                key={step.number}
                                variants={cardVariants}
                                className="relative flex flex-col items-start gap-5 p-7 lg:p-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:border-rama-accent/30 hover:bg-white/[0.05] transition-all duration-500 z-10"
                            >
                                {/* Step number badge */}
                                <div className="absolute -top-4 -left-2 font-mohave font-bold text-[5rem] leading-none text-white/[0.04] select-none pointer-events-none">
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
                            </motion.article>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
