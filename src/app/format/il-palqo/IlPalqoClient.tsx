"use client";

import { useRef } from "react";
import { EventConcept } from "@/components/events/EventConcept";
import { Mic2, ArrowLeft, Users, Music } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@/hooks/useGSAP";
import { animateHeroText, animateFade, animateCards } from "@/lib/gsapAnimations";
import { buildWAUrl, WA_MESSAGES } from "@/lib/whatsapp";
import { FormatQuickInfo } from "@/components/events/FormatQuickInfo";

export function IlPalqoClient() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        animateHeroText("#palqo-hero", 0.1);
        animateFade(".palqo-tag", "up", 0.3);
        animateFade(".palqo-desc", "up", 0.4);
        animateFade("#format-title", "left", 0.1);
        animateFade("#format-desc", "up", 0.2);
        animateCards("#format-steps");
    }, { scope: containerRef });

    return (
        <main ref={containerRef} className=" min-h-screen">
            <section className="relative min-h-[60vw] md:min-h-0 md:h-[85vh] w-full overflow-hidden flex items-end">
                <div className="absolute inset-0 z-0">
                    <Image 
                        src="/images/brand/bg-stage-lights.webp" 
                        alt="Il PalQo" 
                        fill 
                        style={{ objectFit: 'cover' }}
                        className="opacity-50"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/40 to-transparent" />
                    <div className="absolute inset-0 bg-[url('/noise.webp')] opacity-20 mix-blend-overlay pointer-events-none" />
                </div>

                <div className="absolute top-20 sm:top-24 left-4 sm:left-6 z-30">
                    <Link
                        href="/format"
                        className="flex items-center gap-2 text-rama-text/70 hover:text-rama-accent transition-colors uppercase text-xs font-bold tracking-widest backdrop-blur-sm bg-black/30 px-3 py-2 sm:px-4 rounded-full border border-white/10"
                    >
                        <ArrowLeft size={14} /> Tutti i format
                    </Link>
                </div>

                <div className="relative z-20 w-full max-w-7xl mx-auto p-6 md:p-12 mb-12">
                    <div id="palqo-hero" className="flex flex-col space-y-6">
                        <div className="palqo-tag flex items-center gap-3 text-rama-accent text-sm font-bold uppercase tracking-[0.2em]">
                            <span className="flex items-center gap-2 bg-rama-accent/10 backdrop-blur-sm px-3 py-1 rounded-full border border-rama-accent/20">
                                <Users size={14} /> Community & Show
                            </span>
                        </div>

                        <h1 className="line text-4xl sm:text-6xl md:text-8xl font-bold text-rama-text tracking-tighter leading-[0.9] drop-shadow-2xl">
                            <span>IL PALQO</span>
                        </h1>

                        <p className="palqo-desc text-base sm:text-xl md:text-3xl text-gray-300 font-light max-w-2xl border-l-4 border-rama-accent pl-4 sm:pl-6">
                            Il palcoscenico dove il talento incontra la tecnologia. Vota le performance in tempo reale via Web App.
                        </p>
                    </div>
                </div>
            </section>

            <FormatQuickInfo 
                duration="3 ore"
                capacity="Showcase Aperto"
                price="Ingresso Libero / Offerta"
                highlight="Digital Voting System"
                highlightLabel="Tecnologia"
            />

            <EventConcept
                description={`Il PalQo è dove le serate live Torino tornano a essere scoperte reali. Una volta al mese, apriamo le porte ad artisti emergenti Torino che hanno scommesso tutto su un’unica esibizione.\n\nCosa succede? Arrivi, ti godi lo show e decidi chi merita di andare avanti votando in tempo reale. È il cuore pulsante dei nostri eventi culturali Torino: uno spazio senza filtri, dove il talento incontra finalmente il suo pubblico.`}
            />

            <section className="py-24 bg-transparent/40 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rama-accent/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
                        <div className="order-2 md:order-1">
                            <h2 id="format-title" className="text-3xl md:text-5xl font-bold text-rama-text mb-6 md:mb-8">
                                IL <span className="text-rama-accent italic">FORMAT INTERATTIVO</span>
                            </h2>

                            <p id="format-desc" className="gsap-fade text-base md:text-lg text-gray-300 leading-relaxed mb-8">
                                Ogni serata de &quot;Il PalQo&quot; è un viaggio in tre atti, dove lo smartphone diventa la connessione tra artista e platea.
                            </p>

                            <ul id="format-steps" className="space-y-6">
                                {[
                                    { icon: <Music size={20} />, title: "Digital Check-In", desc: "Arrivi nel club e accedi alla Web App del PalQo. Scopri chi sono gli artisti della serata e inizia a preparare i tuoi voti." },
                                    { icon: <Mic2 size={20} />, title: "Live & Voto App", desc: "Il cuore della serata. Performance live alternate a momenti di votazione digitale per decretare l'artista più 'bull' della notte." },
                                    { icon: <div className="text-xl font-rock-salt">!</div>, title: "Aftershow & Awards", desc: "I risultati appaiono a schermo. Jam session libera e premiazione dei talenti scelti direttamente da te." }
                                ].map((item, i) => (
                                    <li key={i} className="gsap-card flex gap-4 items-start">
                                        <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0 border border-white/10 text-rama-accent font-bold">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-lg md:text-xl font-bold text-rama-text">{item.title}</h4>
                                            <p className="text-gray-400 text-sm">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="order-1 md:order-2 gsap-fade relative h-[400px] md:h-[600px] border border-white/10 rounded-2xl overflow-hidden group">
                            <Image 
                                src="/images/brand/service-performance.webp" 
                                alt="Candidati" 
                                fill 
                                className="object-cover opacity-20 group-hover:scale-110 transition-transform duration-1000" 
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-bordeaux/20 opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                            <div className="absolute inset-0 flex items-center justify-center text-center p-6 md:p-8">
                                <div>
                                    <Mic2 size={48} className="mx-auto text-rama-text/20 mb-4 md:mb-6" />
                                    <h3 className="text-2xl md:text-3xl font-bold text-rama-text mb-2">Vuoi Esibirti?</h3>
                                    <p className="text-gray-300 text-sm md:text-base mb-6 md:mb-8 max-w-xs mx-auto">La selezione è sempre aperta per nuovi talenti.</p>
                                    <div className="flex flex-col gap-4 justify-center">
                                        <Link
                                            href="/contact"
                                            className="w-full px-8 py-4 bg-rama-accent text-black font-bold uppercase tracking-widest hover:bg-white transition-colors rounded-sm text-sm"
                                        >
                                            Voglio esibirmi con te
                                        </Link>
                                        <a
                                            href={buildWAUrl(WA_MESSAGES.ilPalqo)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full px-8 py-4 border border-rama-accent text-rama-accent font-bold uppercase tracking-widest hover:bg-rama-accent hover:text-black transition-colors rounded-sm flex items-center justify-center gap-2 text-sm"
                                        >
                                            Dimmi quando è la prossima data
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
