"use client";

import { useRef } from "react";
import { EventConcept } from "@/components/events/EventConcept";
import { ArrowLeft, Eye, Smile, MessageCircleQuestion, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@/hooks/useGSAP";
import { animateHeroText, animateFade, animateCards } from "@/lib/gsapAnimations";
import { buildWAUrl, WA_MESSAGES } from "@/lib/whatsapp";
import { FormatQuickInfo } from "@/components/events/FormatQuickInfo";

export default function ACenaConIlBugiardoPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        animateHeroText("#bugiardo-hero", 0.1);
        animateFade(".bugiardo-tag", "up", 0.3);
        animateFade(".bugiardo-desc", "up", 0.4);
        animateFade("#how-it-works-title", "up", 0.1);
        animateCards("#how-it-works-grid");
        animateFade("#bugiardo-cta", "up", 0.1);
    }, { scope: containerRef });

    return (
        <main ref={containerRef} className="min-h-screen">
            {/* HERO SECTION */}
            <section className="relative aspect-video md:h-[85vh] w-full overflow-hidden flex items-end">
                {/* Background (Video on Desktop, Image on Mobile) */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/brand/bg-hero-wide.png"
                        alt="A Cena Con Il Bugiardo"
                        width={1920}
                        height={1080}
                        className="w-full h-full object-cover opacity-40 contrast-125"
                        style={{ aspectRatio: '16/9', objectFit: 'cover' }}
                        priority
                    />
                    {/* Warm amber-red tint overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-transparent to-amber-900/20 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/50 to-transparent" />
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
                    <div id="bugiardo-hero" className="flex flex-col space-y-6">
                        <div className="bugiardo-tag flex flex-wrap items-center gap-3 text-rama-accent text-sm font-bold uppercase tracking-[0.2em]">
                            <span className="flex items-center gap-2 bg-rama-accent/10 backdrop-blur-sm px-3 py-1 rounded-full border border-rama-accent/20">
                                <Smile size={14} /> Dinner Show & Social Deception
                            </span>
                            <span className="flex items-center gap-2 bg-white/10 text-white backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                                Posti limitati — Max 30 persone
                            </span>
                        </div>

                        <h1 className="line text-5xl md:text-8xl font-bold text-rama-text tracking-tighter leading-[0.9] drop-shadow-2xl">
                            <span>A CENA CON</span><br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rama-accent via-white to-rama-accent">
                                <span>IL BUGIARDO</span>
                            </span>
                        </h1>

                        <p className="bugiardo-desc text-xl md:text-3xl text-gray-300 font-light max-w-2xl border-l-4 border-rama-accent pl-6">
                            Chi riesce a ingannare tutti vince. Ma attenzione — anche la verità ha il suo prezzo.
                        </p>
                    </div>
                </div>
            </section>

            {/* QUICK INFO SECTION */}
            <FormatQuickInfo
                duration="3 ore circa"
                capacity="10 - 200 persone"
                price="da 50€ / pers"
                highlight="Su prenotazione"
                highlightLabel="Disponibilità"
            />

            {/* DESCRIPTION SECTION */}
            <EventConcept
                description={`Un format unico nel suo genere. A Cena Con Il Bugiardo è una serata di alta cucina mescolata con il gioco sociale più antico del mondo: l'arte dell'inganno.\n\nAl tuo tavolo siedono sconosciuti, ma uno di loro ha un segreto. Potrebbe essere un personaggio di finzione, un impostore con una storia falsa, oppure qualcuno che si fa passare per quello che non è. Il tuo compito? Smascherarlo prima del dessert.\n\nTra portate gourmet preparate dall'Executive Chef, indizi nascosti nel menu e performance live degli attori infiltrati, ogni boccone potrebbe rivelarti la verità — o portarti ancora più lontano da essa. Un'esperienza di teatro immersivo e gioco di ruolo, per chi ama mettere alla prova la propria intuizione.`}
            />

            {/* FORMAT SECTION */}
            <section className="py-24 bg-transparent/40 relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-rama-accent/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-bordeaux/10 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 id="how-it-works-title" className="gsap-fade text-4xl md:text-5xl font-bold text-rama-text mb-4">
                            COME <span className="text-rama-accent italic">FUNZIONA</span>
                        </h2>
                        <div className="w-24 h-1 bg-rama-accent mx-auto" />
                    </div>

                    <div id="how-it-works-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {[
                            {
                                icon: <MessageCircleQuestion size={24} />,
                                title: "L'Inizio",
                                desc: "Arrivate, vi siedete, ordinate. Qualcuno al tavolo però non è chi dice di essere. Le portate iniziano ad arrivare, insieme ai primi indizi."
                            },
                            {
                                icon: <Eye size={24} />,
                                title: "L'Indagine",
                                desc: "Durante la cena potete fare domande, studiare le reazioni, confrontarvi con i commensali. Ogni risposta è preziosa — o forse no."
                            },
                            {
                                icon: <Smile size={24} />,
                                title: "La Rivelazione",
                                desc: "Prima del dessert la verità viene a galla. Chi ha smascherato il Bugiardo vince un premio speciale. Chi è stato ingannato... ci riderà su."
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

                    <div id="bugiardo-cta" className="gsap-fade mt-16 md:mt-20 flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center">
                        <Link
                            href="/events"
                            className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-rama-accent text-rama-accent font-bold uppercase tracking-widest hover:bg-rama-accent hover:text-black transition-all duration-300"
                        >
                            Voglio esserci quella sera <ArrowLeft className="rotate-180" size={18} />
                        </Link>
                        <a
                            href={buildWAUrl(WA_MESSAGES.cenaConDelitto)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-rama-accent text-black font-bold uppercase tracking-widest hover:bg-white transition-all duration-300"
                        >
                            Dimmi quando è la prossima data
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
