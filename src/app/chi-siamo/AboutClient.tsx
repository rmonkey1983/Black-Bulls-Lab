"use client";

import { ImmersiveHeader } from "@/components/layout/ImmersiveHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { Sparkles, Target, Heart, ArrowRight, Zap, Cpu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGSAP } from "@/hooks/useGSAP";
import { animateQuote } from "@/lib/gsapAnimations";
import { gsap } from "gsap";
import { PreFooterCTA } from "@/components/layout/PreFooterCTA";



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
                            <h3 className="font-heading text-2xl font-bold text-white uppercase mb-4 tracking-wide group-hover:text-yellow-500 transition-colors">
                                FORMAT REPLICABILI
                            </h3>
                            <p className="font-sans text-zinc-300 font-light leading-relaxed">
                                Soluzioni concrete e scalabili per ogni tipologia di spazio, garantendo sempre la massima qualità esecutiva.
                            </p>
                        </PremiumCard>

                        {/* Valore 2 */}
                        <PremiumCard className="value-card p-10 group">
                            <div className="w-16 h-16 rounded-xl border border-yellow-500/20 flex items-center justify-center text-yellow-500 mb-8 group-hover:border-yellow-500 transition-colors">
                                <Heart size={32} />
                            </div>
                            <h3 className="font-heading text-2xl font-bold text-white uppercase mb-4 tracking-wide group-hover:text-yellow-500 transition-colors">
                                COINVOLGIMENTO
                            </h3>
                            <p className="font-sans text-zinc-300 font-light leading-relaxed">
                                L&apos;ospite non è un semplice spettatore, ma il vero protagonista al centro di una narrazione immersiva.
                            </p>
                        </PremiumCard>

                        {/* Valore 3 */}
                        <PremiumCard className="value-card p-10 group">
                            <div className="w-16 h-16 rounded-xl border border-yellow-500/20 flex items-center justify-center text-yellow-500 mb-8 group-hover:border-yellow-500 transition-colors">
                                <Sparkles size={32} />
                            </div>
                            <h3 className="font-heading text-2xl font-bold text-white uppercase mb-4 tracking-wide group-hover:text-yellow-500 transition-colors">
                                ECCELLENZA TECNICA
                            </h3>
                            <p className="font-sans text-zinc-300 font-light leading-relaxed">
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
                        {[
                            { 
                                title: "DESIGN", 
                                desc: "Progettiamo ogni interazione per essere unica e irripetibile.",
                                icon: <Zap size={32} />
                            },
                            { 
                                title: "TECHNOLOGY", 
                                desc: "Utilizziamo web app proprietarie per guidare lo show senza intoppi.",
                                icon: <Cpu size={32} />
                            },
                            { 
                                title: "EMOTION", 
                                desc: "Mettiamo l'uomo al centro, creando legami reali in un mondo digitale.",
                                icon: <Heart size={32} />
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="group p-10 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-rama-accent/[0.03] hover:border-rama-accent/30 transition-all duration-500">
                                <div className="w-16 h-16 rounded-xl border border-rama-accent/20 flex items-center justify-center text-rama-accent mb-8 group-hover:border-rama-accent transition-colors">
                                    {item.icon}
                                </div>
                                <h3 className="font-heading text-2xl font-bold text-white uppercase mb-4 tracking-wide group-hover:text-rama-accent transition-colors">
                                    {item.title}
                                </h3>
                                <p className="font-sans text-rama-muted leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                    </div>
                </section>

                {/* 3. Call to Action */}
                <section className="py-24">
                    <div className="relative bg-zinc-950 border-t-2 border-rama-accent rounded-3xl overflow-hidden p-12 md:p-20 text-center shadow-[0_-20px_50px_rgba(229,182,12,0.05)]">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-rama-accent/[0.03] to-transparent pointer-events-none" />
                        
                        <div className="relative z-10 space-y-8">
                            <h2 className="font-heading font-bold text-4xl md:text-7xl uppercase tracking-tighter text-white">
                                VUOI COLLABORARE <br />
                                <span className="text-rama-accent">AL PROSSIMO ESPERIMENTO?</span>
                            </h2>
                            <p className="font-sans text-rama-muted text-lg md:text-xl max-w-2xl mx-auto">
                                Siamo sempre alla ricerca di nuovi talenti, partner e location per elevare il livello dei nostri format.
                            </p>
                            <div className="flex justify-center pt-4">
                                <Link 
                                    href="/contact"
                                    className="bg-rama-accent text-black font-heading font-bold uppercase tracking-[0.2em] text-xs px-12 py-5 rounded-full hover:bg-white transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(229,182,12,0.2)]"
                                >
                                    Contattaci ora
                                </Link>
                            </div>
                        </div>

                        {/* Decorazioni */}
                        <div className="absolute -bottom-1/2 -right-1/4 w-[500px] h-[500px] bg-rama-accent/5 rounded-full blur-[100px] pointer-events-none" />
                        <div className="absolute -top-1/2 -left-1/4 w-[500px] h-[500px] bg-rama-accent/5 rounded-full blur-[100px] pointer-events-none" />
                    </div>
                </section>

                <PreFooterCTA />
            </div>
        );
    }
