"use client";

import { useEffect, useState } from "react";
import { ImmersiveHeader } from "@/components/layout/ImmersiveHeader";
import { Calendar, Sparkles } from "lucide-react";
import { getEvents, Event } from "@/lib/dataStore";
import { StickyTextSection } from "@/components/ui/ParallaxScroll";
import { ProjectList } from "@/components/ui/ProjectList";
import { NoEventsNewsletter } from "@/components/events/NoEventsNewsletter";
import { useGSAP } from "@/hooks/useGSAP";
import { animateCards, animateFade } from "@/lib/gsapAnimations";

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);

    useGSAP(() => {
        animateCards("#events-list-container");
        animateFade("#events-intro", "up", 0.1);
        animateFade("#events-cta", "up", 0.1);
    });

    useEffect(() => {
        getEvents().then(setEvents);
    }, []);

    return (
        <div className="min-h-screen  pb-24">
            <ImmersiveHeader
                id="events-hero"
                title="I NOSTRI"
                highlight="Eventi"
                subtitle="Ogni serata è un'esperienza unica. Scopri il prossimo evento e vivi qualcosa di straordinario."
            />

            {/* Anchor Button */}
            <div className="flex justify-center -mt-16 md:-mt-24 mb-24 relative z-20">
                <button 
                    onClick={() => {
                        const target = document.getElementById('events-list');
                        if (target) {
                            const offset = 100; // adjust for sticky header
                            const elementPosition = target.getBoundingClientRect().top;
                            const offsetPosition = elementPosition + window.pageYOffset - offset;
                            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                        }
                    }} 
                    className="border border-rama-accent/50 text-rama-accent px-8 py-4 uppercase tracking-widest text-sm hover:bg-rama-accent hover:text-black transition-colors rounded-full font-semibold backdrop-blur-sm bg-black/20"
                >
                    Vedi le Date Disponibili
                </button>
            </div>

            <div className="max-w-7xl mx-auto px-6 space-y-20">

                {/* Featured / Intro Section */}
                <section id="events-intro">
                    <StickyTextSection
                        content={
                            <div className="space-y-6">
                                <span className="font-rock-salt text-rama-accent transform -rotate-2 text-xl block">
                                    <Sparkles size={14} className="inline mr-2" /> Prossimamente
                                </span>
                                <h2 className="font-mohave font-bold leading-[0.8] tracking-tighter uppercase text-white flex flex-col text-[10vw] md:text-[6vw]">
                                    <span className="text-white">Il Palco è</span>
                                    <span className="text-rama-accent">Pronto.</span>
                                </h2>
                                <p className="text-rama-muted font-outfit text-lg leading-relaxed mt-6">
                                    Non semplici date sul calendario, ma appuntamenti con l&apos;arte,
                                    la musica e la cucina d&apos;autore. Prenota il tuo posto in prima fila.
                                </p>
                            </div>
                        }
                    >
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mt-8">
                            <div className="aspect-[4/5] rounded-lg overflow-hidden relative group">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/images/brand/bg-venue-crowd.png" alt="Crowd" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                            <div className="aspect-[4/5] rounded-lg overflow-hidden relative group translate-y-4 md:translate-y-8">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/images/brand/service-performance.png" alt="Performance" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                            <div className="aspect-[4/5] rounded-lg overflow-hidden relative group hidden md:block">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/images/brand/bg-stage-lights.png" alt="Stage Lights" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                        </div>
                    </StickyTextSection>
                </section>

                <div id="events-list-container" className="pt-12 scroll-m-24">
                {events.length > 0 ? (
                    <>
                        {/* Status bar */}
                        <div
                            className="flex items-center justify-between border border-border bg-bg-card/30 px-5 py-3"
                        >
                            <div className="flex items-center gap-3">
                                <Calendar size={14} className="text-rama-accent/50" />
                                <span className="font-outfit text-[11px] text-rama-accent/50 tracking-widest uppercase">
                                    {events.length} {events.length === 1 ? "Evento Disponibile" : "Eventi Disponibili"}
                                </span>
                            </div>
                        </div>
                        {/* Events List */}
                        <ProjectList events={events} />
                    </>
                ) : (
                    <NoEventsNewsletter />
                )}
                </div>
                
                {/* Alternative Final CTA */}
                <div id="events-cta" className="border border-white/10 bg-[#0c0c0c] p-8 md:p-16 text-center mt-32 rounded-lg flex flex-col items-center justify-center space-y-6">
                    <h3 className="font-mohave text-3xl md:text-5xl font-bold uppercase text-white">Eventi Corporate & <span className="text-rama-accent">B2B</span></h3>
                    <p className="text-rama-muted font-outfit max-w-xl text-base md:text-lg">
                        Vuoi organizzare un format esclusivo per la tua azienda? Dalla creatività all&apos;esecuzione, progettiamo esperienze uniche e indimenticabili.
                    </p>
                    <a href="/contact" className="inline-block border border-rama-accent bg-rama-accent/10 hover:bg-rama-accent text-rama-accent hover:text-black transition-colors px-8 py-3 uppercase tracking-widest text-sm font-semibold rounded-sm mt-4">
                        Contattaci Ora
                    </a>
                </div>

            </div>
        </div>
    );
}
