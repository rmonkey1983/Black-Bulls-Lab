"use client";

import React, { useState, useRef } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { RamaAnimatedText } from "../RamaAnimatedText";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap } from "gsap";

const testimonials = [
    {
        name: "Francesca M.",
        role: "HR Manager",
        company: "Azienda Tech, Torino",
        stars: 5,
        format: "Cena con Delitto",
        text: "Avevamo bisogno di qualcosa di diverso per la cena aziendale di fine anno. Black Bulls Lab ha superato ogni aspettativa: organizzazione perfetta, cena ottima e un'atmosfera che ha fatto ridere e interagire anche i colleghi più timidi. Lo faremmo ogni anno.",
    },
    {
        name: "Marco R.",
        role: "Festeggiato",
        company: "Compleanno 40 anni",
        stars: 5,
        format: "Il Palqo",
        text: "Per i miei 40 anni volevo qualcosa di memorabile, non l'ennesima cena al ristorante. Il Palqo è stato assolutamente incredibile: siamo diventati noi i protagonisti della serata. I miei amici me ne parlano ancora.",
    },
    {
        name: "Laura B.",
        role: "Event Planner",
        company: "Agenzia Comunicazione",
        stars: 5,
        format: "A Cena Con Il Bugiardo",
        text: "Ho organizzato eventi per anni e posso dirlo senza riserve: la professionalità di Black Bulls Lab è un livello sopra. Dalla prima richiesta di preventivo all'ultima portata, tutto perfetto. I clienti erano entusiasti.",
    },
    {
        name: "Gianluca P.",
        role: "Team Leader, Gruppo di 25",
        company: "Multinazionale, Sede Torino",
        stars: 5,
        format: "Cena con Delitto",
        text: "Il budget era limitato ma le aspettative alte. Ci hanno trovato la soluzione perfetta senza farci sentire a disagio per il prezzo. Risultato: 25 persone che non vedono l'ora di tornare. Valore enorme.",
    },
];

export function RamaTestimonials() {
    const [current, setCurrent] = useState(0);
    const cardRef = useRef<HTMLDivElement>(null);

    const prev = () => setCurrent(i => (i - 1 + testimonials.length) % testimonials.length);
    const next = () => setCurrent(i => (i + 1) % testimonials.length);

    const t = testimonials[current];

    useGSAP(() => {
        if (cardRef.current) {
            gsap.fromTo(cardRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
            );
        }
    }, { dependencies: [current], scope: cardRef });

    return (
        <section
            id="recensioni"
            aria-label="Recensioni ed esperienze dei nostri clienti"
            className="w-full py-20 sm:py-32 px-4 sm:px-6 md:px-12 bg-transparent relative overflow-hidden"
        >
            {/* Background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(200,164,78,0.07)_0%,transparent_70%)] pointer-events-none" />

            <div className="relative z-10 w-full max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 sm:mb-16">
                    <RamaAnimatedText
                        text="COSA DICONO DI NOI"
                        className="font-rock-salt text-rama-accent text-base sm:text-xl md:text-2xl mb-6 transform -rotate-1"
                    />
                    <div className="font-mohave font-bold uppercase tracking-tighter text-white text-[12vw] sm:text-[9vw] md:text-[6vw] leading-[0.88] overflow-hidden">
                        <RamaAnimatedText text="ESPERIENZE" delay={0.1} />
                        <RamaAnimatedText text="REALI" delay={0.2} className="text-rama-accent" />
                    </div>
                </div>

                {/* Testimonial Card */}
                <div className="relative">
                    <div
                        ref={cardRef}
                        className="relative p-8 md:p-12 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden"
                    >
                        {/* Background quote mark */}
                        <Quote className="absolute top-6 right-6 md:top-10 md:right-10 text-white/[0.04]" size={80} />

                        {/* Format tag */}
                        <div className="inline-flex items-center gap-2 bg-rama-accent/10 border border-rama-accent/30 rounded-full px-4 py-1.5 mb-6">
                            <span className="font-mohave uppercase tracking-widest text-rama-accent text-xs font-bold">
                                {t.format}
                            </span>
                        </div>

                        {/* Stars */}
                        <div className="flex gap-1 mb-6">
                            {Array.from({ length: t.stars }).map((_, i) => (
                                <Star key={i} size={18} className="text-rama-accent fill-rama-accent" />
                            ))}
                        </div>

                        {/* Text */}
                        <blockquote className="font-outfit text-white/90 text-lg md:text-xl leading-relaxed mb-8 italic">
                            &ldquo;{t.text}&rdquo;
                        </blockquote>

                        {/* Author */}
                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-full bg-rama-accent/20 border border-rama-accent/30 flex items-center justify-center font-mohave font-bold text-rama-accent text-lg">
                                {t.name.charAt(0)}
                            </div>
                            <div>
                                <div className="font-mohave font-bold uppercase text-white tracking-wide">{t.name}</div>
                                <div className="font-outfit text-rama-muted text-sm">{t.role} · {t.company}</div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between mt-6">
                        {/* Dots */}
                        <div className="flex gap-2">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrent(i)}
                                    aria-label={`Vai alla recensione ${i + 1}`}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-rama-accent" : "w-2 bg-white/20 hover:bg-white/40"}`}
                                />
                            ))}
                        </div>

                        {/* Arrows */}
                        <div className="flex gap-3">
                            <button
                                onClick={prev}
                                aria-label="Recensione precedente"
                                className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-rama-accent hover:text-rama-accent transition-all duration-300"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                onClick={next}
                                aria-label="Recensione successiva"
                                className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-rama-accent hover:text-rama-accent transition-all duration-300"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Rating summary */}
                <div className="mt-10 flex items-center justify-center gap-4 text-center">
                    <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} size={16} className="text-rama-accent fill-rama-accent" />
                        ))}
                    </div>
                    <span className="font-mohave font-bold text-white text-xl">4.9/5</span>
                    <span className="font-outfit text-rama-muted text-sm">· Basato su oltre 80 recensioni verificate</span>
                </div>
            </div>
        </section>
    );
}
