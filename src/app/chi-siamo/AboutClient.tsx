"use client";

import { ImmersiveHeader } from "@/components/layout/ImmersiveHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { Sparkles, Target, Heart, ArrowRight } from "lucide-react";
import { useGSAP } from "@/hooks/useGSAP";
import { animateQuote, animateSteps, animateFade } from "@/lib/gsapAnimations";
import { TeamGrid } from "@/components/ui/TeamGrid";
import { gsap } from "gsap";
import { PreFooterCTA } from "@/components/layout/PreFooterCTA";

const timeline = [
    { year: "2024", title: "L'Ideazione", desc: "Nasce l'idea di Black Bulls Lab. Volevamo garantire al nostro pubblico torinese serate uniche dove l'alta cucina incontra lo spettacolo dal vivo, offrendoti un'esperienza mai vista prima." },
    { year: "2025", title: "Il Primo Format", desc: "Dal concept alla realtà. I nostri primi dinner show immersivi diventano il nuovo punto di riferimento per chi cerca emozioni vibranti e intrattenimento di livello." },
    { year: "Oggi", title: "Oltre l'Evento", desc: "Progettiamo produzioni originali e soluzioni su misura sempre più ambiziose. Il nostro focus rimane uno solo: farti vivere ricordi indimenticabili." },
];

import { usePathname } from "next/navigation";

export function AboutClient() {
    const pathname = usePathname();
    useGSAP(() => {
        // Hero title reveal
        animateQuote("#hero-title-reveal");

        // Icons stagger in Values section
        gsap.from(".value-card", {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: "#values-grid",
                start: "top 80%"
            }
        });
    }, { dependencies: [pathname] });

    const scrollToVision = (e: React.MouseEvent) => {
        e.preventDefault();
        const visionSection = document.getElementById('vision-section');
        if (visionSection) {
            visionSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen relative bg-transparent overflow-hidden">
            {/* 1. HERO SECTION */}
            <ImmersiveHeader
                id="about-hero"
                title="OLTRE L'EVENTO."
                highlight="OLTRE L'IMMAGINAZIONE."
                subtitle="LA VISIONE. Benvenuto nel laboratorio dove la precisione incontra la magia."
                mediaUrl="/images/brand/bg-venue-crowd.webp"
            />
            
            <div className="flex justify-center mt-[-10vh] mb-20 relative z-20">
                <button 
                    onClick={scrollToVision}
                    className="group flex flex-col items-center gap-4 transition-transform duration-500 hover:scale-105"
                >
                    <span className="font-heading tracking-[0.3em] uppercase text-xs text-rama-muted group-hover:text-yellow-500 transition-colors">
                        Vedi cosa abbiamo creato
                    </span>
                    <div className="w-12 h-12 rounded-full border border-yellow-500/20 flex items-center justify-center bg-black/40 backdrop-blur-sm group-hover:border-yellow-500 transition-all duration-300">
                        <ArrowRight size={20} className="text-yellow-500 rotate-90" />
                    </div>
                </button>
            </div>

            {/* 2. SEZIONE VISIONE (Il Laboratorio) */}
            <section id="vision-section" className="reveal-section py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <SectionHeading 
                            title="IL LABORATORIO DI"
                            highlight="EMOZIONI"
                            subtitle="Il Laboratorio"
                            align="left"
                        />
                        <p className="font-sans text-lg md:text-xl text-zinc-300 font-light leading-relaxed max-w-xl">
                            In Black Bulls Lab, ogni evento è un esperimento di precisione. Julian Halili ha fondato questo progetto con una visione chiara: unire l&apos;organizzazione millimetrica di un laboratorio tecnico alla scintilla creativa dell&apos;intrattenimento dal vivo. Non siamo solo organizzatori, siamo architetti di esperienze che sfidano l&apos;ordinario.
                        </p>
                    </div>
                    <div className="flex justify-center lg:justify-end">
                        <div className="relative w-64 h-64 md:w-96 md:h-96">
                            <div className="absolute inset-0 border-[1px] border-yellow-500/20 rounded-full animate-[spin_20s_linear_infinite]" />
                            <div className="absolute inset-4 border-[1px] border-white/5 rounded-full" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Sparkles size={80} className="text-yellow-500 opacity-40" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. SEZIONE VALORI (Perché noi) */}
            <section id="values-grid" className="reveal-section bg-zinc-950/50 py-32 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <SectionHeading 
                        title="PERCHÉ SCEGLIERE"
                        highlight="IL LAB"
                        align="center"
                        accentPos="bottom"
                        className="mb-20"
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Valore 1 */}
                        <PremiumCard className="value-card p-10 group">
                            <div className="w-16 h-16 rounded-xl border border-yellow-500/20 flex items-center justify-center text-yellow-500 mb-8 group-hover:border-yellow-500 transition-colors">
                                <Target size={32} />
                            </div>
                            <h4 className="font-heading text-2xl font-bold text-white uppercase mb-4 tracking-wide group-hover:text-yellow-500 transition-colors">
                                FORMAT REPLICABILI
                            </h4>
                            <p className="font-sans text-zinc-400 font-light leading-relaxed">
                                Soluzioni concrete e scalabili per ogni tipologia di spazio, garantendo sempre la massima qualità esecutiva.
                            </p>
                        </PremiumCard>

                        {/* Valore 2 */}
                        <PremiumCard className="value-card p-10 group">
                            <div className="w-16 h-16 rounded-xl border border-yellow-500/20 flex items-center justify-center text-yellow-500 mb-8 group-hover:border-yellow-500 transition-colors">
                                <Heart size={32} />
                            </div>
                            <h4 className="font-heading text-2xl font-bold text-white uppercase mb-4 tracking-wide group-hover:text-yellow-500 transition-colors">
                                COINVOLGIMENTO
                            </h4>
                            <p className="font-sans text-zinc-400 font-light leading-relaxed">
                                L&apos;ospite non è un semplice spettatore, ma il vero protagonista al centro di una narrazione immersiva.
                            </p>
                        </PremiumCard>

                        {/* Valore 3 */}
                        <PremiumCard className="value-card p-10 group">
                            <div className="w-16 h-16 rounded-xl border border-yellow-500/20 flex items-center justify-center text-yellow-500 mb-8 group-hover:border-yellow-500 transition-colors">
                                <Sparkles size={32} />
                            </div>
                            <h4 className="font-heading text-2xl font-bold text-white uppercase mb-4 tracking-wide group-hover:text-yellow-500 transition-colors">
                                ECCELLENZA TECNICA
                            </h4>
                            <p className="font-sans text-zinc-400 font-light leading-relaxed">
                                Nulla è lasciato al caso. Ogni dettaglio audio, video e logistico è orchestrato con perfezione millimetrica.
                            </p>
                        </PremiumCard>
                    </div>
                </div>
            </section>

            {/* 4. SEZIONE TEAM (L'anima del progetto) */}
            <section className="reveal-section py-32 mt-24 bg-transparent">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 px-6">
                        <SectionHeading 
                            title="LE MENTI"
                            highlight="DIETRO AL LAB"
                            subtitle="Creators"
                            align="center"
                        />
                    </div>
                    <TeamGrid />
                </div>
            </section>

            {/* 5. CALL TO ACTION (Chiusura) */}
            <section className="reveal-section px-6 pb-24">
                <div className="max-w-7xl mx-auto">
                    <div className="relative bg-zinc-950 border-t-2 border-yellow-500 rounded-3xl overflow-hidden p-12 md:p-20 text-center shadow-[0_-20px_50px_rgba(234,179,8,0.05)]">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-yellow-500/[0.03] to-transparent pointer-events-none" />
                        
                        <div className="relative z-10 max-w-3xl mx-auto space-y-10">
                            <SectionHeading 
                                title="PRONTO A TRASFORMARE IL TUO PROSSIMO"
                                highlight="EVENTO?"
                                align="center"
                                level="h2"
                            />
                            <p className="font-sans text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed">
                                Entra nel laboratorio. Raccontaci la tua idea e lasciati guidare dalla visione di Black Bulls Lab per creare qualcosa di irripetibile.
                            </p>
                            <div className="pt-6">
                                <PrimaryButton href="/contact" size="lg">
                                    CONTATTACI ORA
                                </PrimaryButton>
                            </div>
                        </div>

                        {/* Decorative Background Elements */}
                        <div className="absolute -bottom-1/2 -right-1/4 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none" />
                        <div className="absolute -top-1/2 -left-1/4 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none" />
                    </div>
                </div>
            </section>

            <PreFooterCTA />
        </div>
    );
}
