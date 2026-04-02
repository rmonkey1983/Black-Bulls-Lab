"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, ChevronRight, Sparkles, Star, PartyPopper, Briefcase, Heart } from "lucide-react";
import Link from "next/link";

const occasions = [
    { id: "team", label: "Team Building Aziendale", icon: Briefcase, formats: ["Cena con Delitto", "Il Palqo"], tagline: "Rompete il ghiaccio. Costruite qualcosa di vero." },
    { id: "corporate", label: "Cena di Natale / Gala", icon: Sparkles, formats: ["Notte Medievale", "Cena con Delitto"], tagline: "Un finale d'anno che resterà nei ricordi." },
    { id: "birthday", label: "Compleanno di Gruppo", icon: PartyPopper, formats: ["Il Palqo", "Cena con Delitto"], tagline: "Festeggia come non hai mai festeggiato." },
    { id: "private", label: "Evento Privato", icon: Heart, formats: ["Cena con Delitto", "Notte Medievale"], tagline: "La tua idea. Il nostro palcoscenico." },
];

const groupSizes = ["10-20", "20-30", "30-50", "50+"];

const formatDetails: Record<string, { price: string; capacity: string; duration: string; highlight: string }> = {
    "Cena con Delitto": {
        price: "A partire da 55€/persona",
        capacity: "20–50 persone",
        duration: "~3 ore",
        highlight: "Siete tutti sospettati. Solo uno è il colpevole.",
    },
    "Il Palqo": {
        price: "A partire da 45€/persona",
        capacity: "20–80 persone",
        duration: "~2.5 ore",
        highlight: "I tuoi colleghi diventano le star della serata.",
    },
    "Notte Medievale": {
        price: "A partire da 65€/persona",
        capacity: "30–100 persone",
        duration: "~4 ore",
        highlight: "Un banchetto immersivo con spettacolo dal vivo.",
    },
};

const slugs: Record<string, string> = {
    "Cena con Delitto": "/esperimenti/a-cena-con-il-bugiardo",
    "Il Palqo": "/esperimenti/il-palqo",
    "Notte Medievale": "/eventi",
};

export function RamaGroupConfigurator() {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    const occasionObj = occasions.find(o => o.id === selectedOccasion);
    const suggestedFormats = occasionObj?.formats ?? [];

    return (
        <section id="configuratore" className="w-full py-20 sm:py-32 px-4 sm:px-6 md:px-12 bg-transparent relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,164,78,0.05)_0%,transparent_70%)] pointer-events-none" />

            <div className="relative z-10 w-full max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="font-rock-salt text-rama-accent text-base sm:text-xl transform -rotate-1 inline-block mb-4">
                        Trova il tuo format
                    </span>
                    <h2 className="font-mohave font-bold uppercase tracking-tighter text-white text-[10vw] sm:text-[8vw] md:text-[5vw] leading-[0.9]">
                        CONFIGURA <span className="text-rama-accent">IL TUO EVENTO</span>
                    </h2>
                    <p className="text-rama-muted font-outfit text-lg mt-4 max-w-xl mx-auto">
                        In 2 passi ti diciamo quale format fa per te — e quanto costa.
                    </p>
                </div>

                {/* Step Indicator */}
                <div className="flex items-center justify-center gap-3 mb-10">
                    {[1, 2, 3].map(s => (
                        <div key={s} className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-mohave font-bold transition-all duration-300 ${step >= s ? "bg-rama-accent text-black" : "bg-white/10 text-white/40"}`}>
                                {s}
                            </div>
                            {s < 3 && <div className={`w-12 h-[1px] transition-all duration-300 ${step > s ? "bg-rama-accent" : "bg-white/10"}`} />}
                        </div>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {/* Step 1 — Occasion */}
                    {step === 1 && (
                        <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}>
                            <p className="font-mohave uppercase tracking-widest text-white/60 text-sm text-center mb-6">Passo 1 — Che tipo di evento stai organizzando?</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {occasions.map(occ => {
                                    const Icon = occ.icon;
                                    return (
                                        <button
                                            key={occ.id}
                                            onClick={() => { setSelectedOccasion(occ.id); setStep(2); }}
                                            className={`group flex items-center gap-4 p-5 rounded-xl border text-left transition-all duration-300 cursor-pointer ${selectedOccasion === occ.id ? "border-rama-accent bg-rama-accent/10" : "border-white/10 bg-white/[0.03] hover:border-rama-accent/40 hover:bg-white/[0.06]"}`}
                                        >
                                            <div className="w-11 h-11 rounded-lg border border-rama-accent/30 bg-rama-accent/10 flex items-center justify-center flex-shrink-0">
                                                <Icon size={20} className="text-rama-accent" />
                                            </div>
                                            <span className="font-mohave font-bold uppercase tracking-wide text-white text-lg">{occ.label}</span>
                                            <ChevronRight size={18} className="ml-auto text-white/30 group-hover:text-rama-accent transition-colors" />
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2 — Group Size */}
                    {step === 2 && (
                        <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}>
                            <p className="font-mohave uppercase tracking-widest text-white/60 text-sm text-center mb-6">Passo 2 — Quante persone partecipano?</p>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                                {groupSizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => { setSelectedSize(size); setStep(3); }}
                                        className={`flex flex-col items-center gap-2 p-5 rounded-xl border transition-all duration-300 cursor-pointer ${selectedSize === size ? "border-rama-accent bg-rama-accent/10" : "border-white/10 bg-white/[0.03] hover:border-rama-accent/40"}`}
                                    >
                                        <Users size={24} className="text-rama-accent" />
                                        <span className="font-mohave font-bold text-white text-xl">{size}</span>
                                        <span className="font-outfit text-white/50 text-xs">persone</span>
                                    </button>
                                ))}
                            </div>
                            <button onClick={() => { setStep(1); setSelectedOccasion(null); }} className="text-white/40 hover:text-white font-outfit text-sm underline underline-offset-4 transition-colors mx-auto block">
                                ← Torna all&apos;occasione
                            </button>
                        </motion.div>
                    )}

                    {/* Step 3 — Results */}
                    {step === 3 && (
                        <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}>
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center gap-2 bg-rama-accent/10 border border-rama-accent/30 rounded-full px-4 py-2 mb-4">
                                    <Star size={14} className="text-rama-accent" />
                                    <span className="font-mohave uppercase tracking-widest text-rama-accent text-sm font-bold">Perfetti per te</span>
                                </div>
                                <p className="text-rama-muted font-outfit">{occasionObj?.tagline}</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                                {suggestedFormats.map(fmt => {
                                    const d = formatDetails[fmt];
                                    return (
                                        <div key={fmt} className="flex flex-col gap-4 p-6 rounded-xl border border-white/10 bg-white/[0.03] hover:border-rama-accent/30 transition-all duration-300">
                                            <h3 className="font-mohave font-bold uppercase tracking-tight text-white text-2xl">{fmt}</h3>
                                            <p className="font-outfit text-rama-muted text-sm italic">&ldquo;{d.highlight}&rdquo;</p>
                                            <div className="flex flex-wrap gap-2 mt-auto">
                                                <span className="text-xs font-outfit bg-white/5 border border-white/10 rounded-full px-3 py-1 text-white/70">👥 {d.capacity}</span>
                                                <span className="text-xs font-outfit bg-white/5 border border-white/10 rounded-full px-3 py-1 text-white/70">⏱ {d.duration}</span>
                                                <span className="text-xs font-outfit bg-rama-accent/10 border border-rama-accent/30 rounded-full px-3 py-1 text-rama-accent font-bold">💰 {d.price}</span>
                                            </div>
                                            <Link href={`/contact?format=${encodeURIComponent(fmt)}&gruppo=${selectedSize}`}
                                                className="mt-2 w-full text-center bg-rama-accent text-black font-mohave font-bold uppercase tracking-widest text-sm px-6 py-3 rounded-lg hover:bg-white transition-colors duration-300">
                                                Richiedi Preventivo
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>

                            <button onClick={() => { setStep(1); setSelectedOccasion(null); setSelectedSize(null); }} className="text-white/40 hover:text-white font-outfit text-sm underline underline-offset-4 transition-colors mx-auto block">
                                ← Ricomincia la configurazione
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
