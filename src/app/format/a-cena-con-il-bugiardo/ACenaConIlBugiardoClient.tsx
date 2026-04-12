"use client";

import { useRef } from "react";
import { EventConcept } from "@/components/events/EventConcept";
import { ArrowLeft, Smile } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@/hooks/useGSAP";
import { animateHeroText, animateFade, animateCards } from "@/lib/gsapAnimations";
import { buildWAUrl, WA_MESSAGES } from "@/lib/whatsapp";
import { FormatQuickInfo } from "@/components/events/FormatQuickInfo";

export function ACenaConIlBugiardoClient() { 
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
            <section className="relative aspect-video md:h-[85vh] w-full overflow-hidden flex items-end">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/brand/bg-hero-wide.webp"
                        alt="A Cena Con Il Bugiardo"
                        width={1920}
                        height={1080}
                        className="w-full h-full object-cover opacity-40 contrast-125"
                        style={{ aspectRatio: '16/9', objectFit: 'cover' }}
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-transparent to-amber-900/20 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/50 to-transparent" />
                    <div className="absolute inset-0 bg-[url('/noise.webp')] opacity-20 mix-blend-overlay pointer-events-none" />
                </div>

                <div className="absolute top-24 left-6 z-30">
                    <Link
                        href="/format"
                        className="flex items-center gap-2 text-rama-text/70 hover:text-rama-accent transition-colors uppercase text-xs font-bold tracking-widest backdrop-blur-sm bg-transparent/20 px-4 py-2 rounded-full border border-white/10"
                    >
                        <ArrowLeft size={16} /> ← Esplora gli altri format
                    </Link>
                </div>

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
                            Dimentica le cene spettacolo passive. L&apos;inganno ora è a portata di smartphone.
                        </p>
                    </div>
                </div>
            </section>

            <FormatQuickInfo
                duration="3 ore circa"
                capacity="10 - 100+ persone"
                price="da 50€ / pers"
                highlight="Web App Integrata"
                highlightLabel="Tecnologia"
            />

            <EventConcept
                description={`Dimentica le classiche cene spettacolo passive: in "A Cena con il Bugiardo" i veri protagonisti sono i commensali e l'intera regia del gioco è gestita da una Web App interattiva. Un format moderno e immersivo dove tutti hanno un ruolo, ma solo una persona nasconde il grande segreto.\n\nUn evento dal ritmo incalzante e altamente scalabile, dove la tecnologia fa da filo conduttore senza mai sovrastare il piacere della cena e della conversazione. Ideale per gruppi e aziende che cercano una serata ad alto tasso di coinvolgimento, dove tutti giocano e nessuno resta a guardare.`}
            />

            <section className="py-24 bg-transparent/40 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-rama-accent/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-bordeaux/10 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 id="how-it-works-title" className="gsap-fade text-4xl md:text-5xl font-bold text-rama-text mb-4">
                            COME <span className="text-rama-accent italic">FUNZIONA IL GIOCO</span>
                        </h2>
                        <div className="w-24 h-1 bg-rama-accent mx-auto" />
                    </div>

                    <div id="how-it-works-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {[
                            {
                                icon: <div className="font-heading text-2xl font-bold">01</div>,
                                title: "Il Login",
                                desc: "Appena seduto al tavolo, inquadra il QR code per accedere alla Web App della serata. Da questo momento, lo smartphone diventa la tua vera plancia di gioco."
                            },
                            {
                                icon: <div className="font-heading text-2xl font-bold">02</div>,
                                title: "La Scelta Segreta",
                                desc: "Uno alla volta, in totale privacy, verrai guidato dal sistema per decidere il tuo ruolo: avrai il coraggio di proporti come Bugiardo? Attenzione, il sistema accetterà un solo Bugiardo. L'app distribuirà poi identità e obiettivi a tutti."
                            },
                            {
                                icon: <div className="font-heading text-2xl font-bold">03</div>,
                                title: "Indagini e Missioni",
                                desc: "Durante la cena, il gioco non si ferma mai. La Web App invierà notifiche personali, indizi preziosi e missioni segrete da portare a termine direttamente al tavolo, mettendo alla prova la furbizia e l'intuito di ognuno."
                            },
                            {
                                icon: <div className="font-heading text-2xl font-bold">04</div>,
                                title: "Il Verdetto",
                                desc: "Arrivati al dessert, le indagini si chiudono. Mettendo insieme i pezzi del puzzle forniti dall'app e analizzando i sospetti, dovrai votare per smascherare l'unico, vero Bugiardo della serata."
                            }
                        ].map((step, i) => (
                            <div
                                key={i}
                                className="gsap-card bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl hover:bg-white/10 transition-colors group flex flex-col items-center text-center gap-6"
                            >
                                <div className="w-12 h-12 md:w-16 md:h-16 bg-rama-accent/10 rounded-full flex items-center justify-center text-rama-accent shrink-0 group-hover:scale-110 transition-transform duration-300 border border-rama-accent/20">
                                    {step.icon}
                                </div>
                                <div className="flex flex-col items-center">
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
                            href={buildWAUrl(WA_MESSAGES.bugiardo)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-rama-accent text-black font-extrabold uppercase tracking-widest hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(200,164,78,0.3)] rounded-sm"
                        >
                            Dimmi quando è la prossima data
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
