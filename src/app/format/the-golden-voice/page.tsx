"use client";

import { useRef } from "react";
import { EventConcept } from "@/components/events/EventConcept";
import { Mic, Trophy, Star, Music2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { GoldenVoiceForm } from "@/components/forms/GoldenVoiceForm";
import { useGSAP } from "@/hooks/useGSAP";
import { animateHeroText, animateFade, animateCards } from "@/lib/gsapAnimations";
import { FormatQuickInfo } from "@/components/events/FormatQuickInfo";
import { buildWAUrl, WA_MESSAGES } from "@/lib/whatsapp";

export default function TheGoldenVoicePage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        animateHeroText("#golden-hero", 0.1);
        animateFade(".golden-tag", "up", 0.3);
        animateFade(".golden-desc", "up", 0.4);
        animateFade("#percorso-title", "up", 0.1);
        animateCards("#percorso-grid");
        animateFade("#casting-form-container", "up", 0.1);
    }, { scope: containerRef });

    return (
        <main ref={containerRef} className=" min-h-screen">
            {/* HERO SECTION */}
            <section className="relative aspect-video md:h-[85vh] w-full overflow-hidden flex items-end">
                {/* Background (Video on Desktop, Image on Mobile) */}
                <div className="absolute inset-0 z-0">
                    <Image 
                        src="/images/brand/service-performance.png" 
                        alt="The Golden Voice" 
                        width={1920}
                        height={1080}
                        className="w-full h-full object-cover opacity-50 grayscale contrast-125"
                        style={{ aspectRatio: '16/9', objectFit: 'cover' }}
                        priority
                    />
                    {/* Golden Tint Overlay */}
                    <div className="absolute inset-0 bg-rama-accent/10 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/40 to-transparent" />
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" />
                </div>

                {/* Back Button */}
                <div className="absolute top-24 left-6 z-30">
                    <Link
                        href="/format"
                        className="flex items-center gap-2 text-rama-text/70 hover:text-rama-accent transition-colors uppercase text-xs font-bold tracking-widest backdrop-blur-sm bg-transparent/20 px-4 py-2 rounded-full border border-white/10"
                    >
                        <ArrowLeft size={16} /> ← Esplora gli altri format
                    </Link>
                </div>

                {/* Content */}
                <div className="relative z-20 w-full max-w-7xl mx-auto p-6 md:p-12 mb-12">
                    <div id="golden-hero" className="flex flex-col space-y-6">
                        <div className="golden-tag flex items-center gap-3 text-rama-accent text-sm font-bold uppercase tracking-[0.2em]">
                            <span className="flex items-center gap-2 bg-rama-accent/20 backdrop-blur-sm px-3 py-1 rounded-full border border-rama-accent/30 text-rama-accent-light">
                                <Mic size={14} /> Singing Contest
                            </span>
                        </div>

                        <h1 className="line text-6xl md:text-8xl font-bold text-rama-text tracking-tighter leading-[0.9] drop-shadow-2xl">
                            <span>THE GOLDEN</span> <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-gold animate-gradient-x bg-[length:200%_auto]">
                                <span>VOICE</span>
                            </span>
                        </h1>

                        <p className="golden-desc text-xl md:text-3xl text-gray-300 font-light max-w-2xl border-l-4 border-rama-accent pl-6">
                            La tua voce, la tua occasione. Il contest che premia il vero talento.
                        </p>
                    </div>
                </div>
            </section>

            {/* QUICK INFO SECTION */}
            <FormatQuickInfo 
                duration="3 ore circa"
                capacity="Aperto a tutti"
                price="Iscrizione gratuita"
                highlight="La Tua Voce, La Tua Occasione"
            />

            {/* DESCRIPTION SECTION */}
            <EventConcept
                description={`The Golden Voice non è il solito talent show. È una competizione seria, intensa e prestigiosa, pensata per chi crede nella potenza della propria voce.\n\nCerchiamo interpreti capaci di emozionare, cantautori originali e performer che sanno dominare il palco. Qui non si cerca solo la tecnica, ma l'anima.\n\nDavanti a una giuria di professionisti del settore discografico e dello spettacolo, avrai l'opportunità di farti notare e di trasformare la tua passione in una carriera.`}
            />

            {/* FORMAT SECTION */}
            <section className="py-24 bg-gradient-to-b from-black to-bg-dark relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 id="percorso-title" className="gsap-fade text-4xl md:text-5xl font-bold text-rama-text mb-4">
                            IL PERCORSO
                        </h2>
                        <div className="w-24 h-1 bg-rama-accent mx-auto" />
                    </div>

                    <div id="percorso-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {[
                            {
                                icon: <Music2 size={24} />,
                                title: "Audizioni",
                                desc: "Il primo passo. Porta il tuo cavallo di battaglia e convinci la giuria a darti un posto nel contest."
                            },
                            {
                                icon: <Star size={24} />,
                                title: "Le Sfide",
                                desc: "Scontri diretti e performance a tema. Solo i migliori proseguono il cammino verso la vittoria."
                            },
                            {
                                icon: <Trophy size={24} />,
                                title: "La Finale",
                                desc: "Una serata di gala, un grande palco e un unico vincitore che si aggiudicherà il premio finale."
                            }
                        ].map((step, i) => (
                            <div
                                key={i}
                                className="gsap-card bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl hover:bg-white/10 transition-colors group flex md:flex-col items-center md:text-center gap-6"
                            >
                                <div className="w-12 h-12 md:w-16 md:h-16 bg-rama-accent/10 rounded-full flex items-center justify-center text-rama-accent shrink-0 group-hover:scale-110 transition-transform duration-300 border border-rama-accent/20">
                                    {step.icon}
                                </div>
                                <div className="flex flex-col md:items-center">
                                    <h3 className="text-xl md:text-2xl font-bold text-rama-text mb-2 md:mb-4">{step.title}</h3>
                                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div id="casting-form-container" className="gsap-fade mt-24 max-w-4xl mx-auto flex flex-col items-center gap-6">
                        <GoldenVoiceForm />
                        
                        <div className="flex flex-col items-center gap-4 mt-8">
                            <p className="text-gray-400 text-sm font-outfit uppercase tracking-widest">Oppure chiedi info date</p>
                            <a
                                href={buildWAUrl(WA_MESSAGES.default)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-8 py-4 border border-rama-accent text-rama-accent font-bold uppercase tracking-widest hover:bg-rama-accent hover:text-black transition-all duration-300 rounded-sm"
                            >
                                <Mic size={18} /> Dimmi quando è la prossima data
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
