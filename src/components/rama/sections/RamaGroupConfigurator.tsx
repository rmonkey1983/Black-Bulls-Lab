"use client";

import React, { useState, useRef } from "react";
import { ChevronRight, Sparkles, Star, PartyPopper, Briefcase, Heart, Gift, GraduationCap } from "lucide-react";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap } from "gsap";

const occasions = [
    { id: "team", label: "Team Building Aziendale", icon: Briefcase, formats: ["A Cena Con Il Bugiardo", "Il PalQo", "Cena Con Delitto"], tagline: "Rompete il ghiaccio. Costruite qualcosa di vero." },
    { id: "corporate", label: "Cena di Natale / Gala", icon: Sparkles, formats: ["Cena Con Delitto", "A Cena Con Il Bugiardo", "THE GOLDEN VOICE"], tagline: "Un finale d'anno che resterà nei ricordi." },
    { id: "birthday", label: "Festa di Compleanno", icon: Gift, formats: ["Il PalQo", "A Cena Con Il Bugiardo", "Cena Con Delitto"], tagline: "Un compleanno fuori dagli schemi." },
    { id: "graduation", label: "Festa di Laurea", icon: GraduationCap, formats: ["Il PalQo", "THE GOLDEN VOICE"], tagline: "Festeggiate il traguardo con noi." },
    { id: "private", label: "Evento Privato", icon: Heart, formats: ["A Cena Con Il Bugiardo", "Cena Con Delitto"], tagline: "La tua idea. Il nostro palcoscenico." },
];


const formatDetails: Record<string, { price: string; capacity: string; duration: string; highlight: string }> = { "A Cena Con Il Bugiardo": { price: "A partire da 55€/persona",
        capacity: "Qualsiasi dimensione",
        duration: "~3 ore",
        highlight: "Siete tutti sospettati. Solo uno è il colpevole." },
    "Il PalQo": { price: "A partire da 45€/persona",
        capacity: "Qualsiasi dimensione",
        duration: "~2.5 ore",
        highlight: "I tuoi colleghi diventano le star della serata." },
    "Cena Con Delitto": { price: "A partire da 50€/persona",
        capacity: "Qualsiasi dimensione",
        duration: "~3 ore",
        highlight: "Chi è l'assassino? Vivi un'indagine immersiva tra una portata e l'altra." },
    "THE GOLDEN VOICE": { price: "A partire da 45€/persona",
        capacity: "Qualsiasi dimensione",
        duration: "~3 ore",
        highlight: "Il format dove il talento vocale incontra lo show immersivo." } };

import { buildWAUrl } from "@/lib/whatsapp";

export function RamaGroupConfigurator() { const [step, setStep] = useState<1 | 2 | 3>(1);
    const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
    const [numPeople, setNumPeople] = useState<number>(25);
    const [preferredDate, setPreferredDate] = useState<string>("");
    const stepContainerRef = useRef<HTMLDivElement>(null);

    const occasionObj = occasions.find(o => o.id === selectedOccasion);
    const suggestedFormats = occasionObj?.formats ?? [];

    useGSAP(() => { if (stepContainerRef.current) { gsap.fromTo(stepContainerRef.current,
                { opacity: 0, x: 30 },
                { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" }
            );
        }
    }, { dependencies: [step], scope: stepContainerRef });

    const handleWhatsAppRedirect = (formatName: string) => { const buildMsg = (tipo: string, persone: number, data: string) => { return `Ciao! Vorrei organizzare un ${tipo} (${formatName}) per ${persone} persone` +
                (data ? ` il ${data}` : '') +
                `. Potete inviarmi un preventivo?`;
        };
        const url = buildWAUrl(buildMsg(occasionObj?.label || "Evento", numPeople, preferredDate));
        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <section id="configuratore" className="w-full py-20 sm:py-32 px-4 sm:px-6 md:px-12 bg-transparent relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,164,78,0.05)_0%,transparent_70%)] pointer-events-none" />

            <div className="relative z-10 w-full max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="font-rock-salt text-rama-accent text-base sm:text-xl transform -rotate-1 inline-block mb-4 text-center">
                        Trova il tuo format
                    </span>
                    <h2 className="font-heading font-bold uppercase tracking-tighter text-white text-[10vw] sm:text-[8vw] md:text-[5vw] leading-[0.9] text-center">
                        CONFIGURA <span className="text-rama-accent text-center">IL TUO EVENTO</span>
                    </h2>
                    <p className="text-rama-muted font-sans text-base md:text-lg mt-4 max-w-xl mx-auto text-center px-4">
                        In 3 passi ti diciamo quale format fa per te — e ricevi il preventivo su WhatsApp.
                    </p>
                </div>

                {/* Step Indicator */}
                <div className="flex items-center justify-center gap-3 mb-10">
                    {[1, 2, 3].map(s => (
                        <div key={s} className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-heading font-bold transition-all duration-300 ${step >= s ? "bg-rama-accent text-black" : "bg-white/10 text-white/40"}`}>
                                {s}
                            </div>
                            {s < 3 && <div className={`w-12 h-[1px] transition-all duration-300 ${step > s ? "bg-rama-accent" : "bg-white/10"}`} />}
                        </div>
                    ))}
                </div>

                <div ref={stepContainerRef} className="relative">
                    {/* Step 1 — Occasion */}
                    {step === 1 && (
                        <div key="step1">
                            <p className="font-heading uppercase tracking-widest text-white/60 text-sm text-center mb-6">Passo 1 — Che tipo di evento stai organizzando?</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 px-2 sm:px-0">
                                {occasions.map(occ => { const Icon = occ.icon;
                                    return (
                                        <button
                                            key={occ.id}
                                            onClick={() => { setSelectedOccasion(occ.id); setStep(2); }}
                                            className={`group flex items-center gap-4 p-4 sm:p-5 rounded-xl border text-left transition-all duration-300 cursor-pointer ${selectedOccasion === occ.id ? "border-rama-accent bg-rama-accent/10" : "border-white/10 bg-white/[0.03] hover:border-rama-accent/40 hover:bg-white/[0.06]"}`}
                                        >
                                            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg border border-rama-accent/30 bg-rama-accent/10 flex items-center justify-center flex-shrink-0">
                                                <Icon size={18} className="text-rama-accent" />
                                            </div>
                                            <span className="font-heading font-bold uppercase tracking-wide text-white text-base sm:text-lg">{occ.label}</span>
                                            <ChevronRight size={16} className="ml-auto text-white/30 group-hover:text-rama-accent transition-colors" />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Step 2 — Details */}
                    {step === 2 && (
                        <div key="step2" className="max-w-md mx-auto space-y-8">
                            <div>
                                <p className="font-heading uppercase tracking-widest text-white/60 text-sm text-center mb-6">Passo 2 — Quante persone partecipano e quando?</p>
                                
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <label className="font-heading uppercase text-white text-sm tracking-widest">Numero Persone</label>
                                        <span className="text-rama-accent font-heading font-bold text-3xl">{numPeople}</span>
                                    </div>
                                    <input 
                                        type="range" 
                                        min="10" 
                                        max="100" 
                                        step="1"
                                        value={numPeople}
                                        onChange={(e) => setNumPeople(parseInt(e.target.value))}
                                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-rama-accent"
                                    />
                                    <div className="flex justify-between text-[10px] font-sans text-white/30 uppercase tracking-widest">
                                        <span>Min 10</span>
                                        <span>Max 100</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="font-heading uppercase text-white text-sm tracking-widest block">Data Preferita (Opzionale)</label>
                                <input 
                                    type="date" 
                                    value={preferredDate}
                                    onChange={(e) => setPreferredDate(e.target.value)}
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg p-4 font-sans text-white focus:border-rama-accent/50 outline-none transition-colors [color-scheme:dark]"
                                />
                            </div>

                            <div className="flex flex-col gap-4 mt-10">
                                <button 
                                    onClick={() => setStep(3)}
                                    className="w-full bg-rama-accent text-black font-heading font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl hover:bg-white transition-all duration-300 shadow-[0_4px_20px_rgba(200,164,78,0.2)]"
                                >
                                    Scopri i Format →
                                </button>
                                <button onClick={() => { setStep(1); setSelectedOccasion(null); }} className="text-white/40 hover:text-white font-sans text-sm underline underline-offset-4 transition-colors mx-auto block">
                                    ← Torna all&apos;occasione
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3 — Results */}
                    {step === 3 && (
                        <div key="step3">
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center gap-2 bg-rama-accent/10 border border-rama-accent/30 rounded-full px-4 py-2 mb-4">
                                    <Star size={14} className="text-rama-accent" />
                                    <span className="font-heading uppercase tracking-widest text-rama-accent text-sm font-bold">Perfetti per te</span>
                                </div>
                                <p className="text-rama-muted font-sans text-center max-w-lg mx-auto">{occasionObj?.tagline}</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-8 px-2 sm:px-0">
                                {suggestedFormats.map(fmt => { const d = formatDetails[fmt];
                                    return (
                                        <div key={fmt} className="flex flex-col gap-4 p-5 sm:p-6 rounded-xl border border-white/10 bg-white/[0.03] hover:border-rama-accent/30 transition-all duration-300">
                                            <h3 className="font-heading font-bold uppercase tracking-tight text-white text-xl sm:text-2xl">{fmt}</h3>
                                            <p className="font-sans text-rama-muted text-xs sm:text-sm italic">&ldquo;{d.highlight}&rdquo;</p>
                                            <div className="flex flex-wrap gap-2 mt-auto mb-4">
                                                <span className="text-[10px] sm:text-xs font-sans bg-white/5 border border-white/10 rounded-full px-2.5 py-1 text-white/70">👥 {d.capacity}</span>
                                                <span className="text-[10px] sm:text-xs font-sans bg-white/5 border border-white/10 rounded-full px-2.5 py-1 text-white/70">⏱ {d.duration}</span>
                                                <span className="text-[10px] sm:text-xs font-sans bg-rama-accent/10 border border-rama-accent/30 rounded-full px-2.5 py-1 text-rama-accent font-bold">💰 {d.price}</span>
                                            </div>
                                            <button 
                                                onClick={() => handleWhatsAppRedirect(fmt)}
                                                className="w-full text-center bg-rama-accent text-black font-heading font-bold uppercase tracking-widest text-xs sm:text-sm px-6 py-4 rounded-xl hover:bg-white transition-all duration-300 shadow-[0_4px_15px_rgba(200,164,78,0.15)] flex items-center justify-center gap-2">
                                                <PartyPopper size={16} />
                                                Preventivo su WhatsApp
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>

                            <button onClick={() => { setStep(1); setSelectedOccasion(null); setNumPeople(25); setPreferredDate(""); }} className="text-white/40 hover:text-white font-sans text-sm underline underline-offset-4 transition-colors mx-auto block">
                                ← Ricomincia la configurazione
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
