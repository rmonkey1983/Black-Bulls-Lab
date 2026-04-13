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
import Image from "next/image";
import { BookingForm } from "@/components/ui/BookingForm";
import { SectionHeading } from "@/components/ui/SectionHeading";

import FaqSection from "@/components/ui/FaqSection";

export function EventsClient() {
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
        <main className="min-h-screen pb-24 bg-black relative uppercase">
            <ImmersiveHeader
                id="events-hero"
                title="I NOSTRI"
                highlight="Eventi"
                subtitle="Ogni serata è un'esperienza unica. Scopri il prossimo evento e vivi qualcosa di straordinario."
                mediaUrl="/images/brand/bg-venue-crowd.webp"
            />

            <div className="flex justify-center -mt-12 md:-mt-24 mb-16 md:mb-24 relative z-20">
                <button 
                    onClick={() => {
                        const target = document.getElementById('events-list');
                        if (target) {
                            const offset = 100;
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
                <section id="events-intro">
                    <StickyTextSection
                        content={
                            <div className="space-y-6">
                                <span className="font-rock-salt text-rama-accent transform -rotate-2 text-xl block">
                                    <Sparkles size={14} className="inline mr-2" /> Prossimamente
                                </span>
                                <h2 className="font-heading font-bold leading-[0.8] tracking-tighter uppercase text-white flex flex-col text-5xl sm:text-7xl md:text-[6vw]">
                                    <span className="text-white">Il Palco è</span>
                                    <span className="text-rama-accent">Pronto.</span>
                                </h2>
                                <p className="text-rama-muted font-sans text-lg leading-relaxed mt-6">
                                    Non semplici date sul calendario, ma appuntamenti con l&apos;arte,
                                    la musica e la cucina d&apos;autore. Prenota il tuo posto in prima fila.
                                </p>
                            </div>
                        }
                    >
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mt-8">
                            <div className="aspect-[4/5] rounded-lg overflow-hidden relative group">
                                <Image 
                                    src="/images/brand/bg-venue-crowd.webp" 
                                    alt="Crowd" 
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                />
                            </div>
                            <div className="aspect-[4/5] rounded-lg overflow-hidden relative group translate-y-4 md:translate-y-8">
                                <Image 
                                    src="/images/brand/service-performance.webp" 
                                    alt="Performance" 
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                />
                            </div>
                            <div className="aspect-[4/5] rounded-lg overflow-hidden relative group hidden md:block">
                                <Image 
                                    src="/images/brand/bg-stage-lights.webp" 
                                    alt="Stage Lights" 
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                                    sizes="(max-width: 1024px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                />
                            </div>
                        </div>
                    </StickyTextSection>
                </section>

                <div id="events-list-container" className="pt-12 scroll-m-24">
                {events.length > 0 ? (
                    <>
                        <div
                            className="flex items-center justify-between border border-border bg-bg-card/30 px-5 py-3"
                        >
                            <div className="flex items-center gap-3">
                                <Calendar size={14} className="text-rama-accent/50" />
                                <span className="font-sans text-[11px] text-rama-accent/50 tracking-widest uppercase">
                                    {events.length} {events.length === 1 ? "Evento Disponibile" : "Eventi Disponibili"}
                                </span>
                            </div>
                        </div>
                        <ProjectList events={events} />
                    </>
                ) : (
                    <NoEventsNewsletter />
                )}
                </div>
                
                <div id="events-cta" className="mt-32">
                    <div className="mb-16">
                        <SectionHeading
                            title="ORGANIZZA IL TUO"
                            highlight="EVENTO"
                            subtitle="Vuoi un format esclusivo per la tua azienda o un tavolo per il prossimo show?"
                            align="center"
                        />
                    </div>
                    <BookingForm />
                </div>

                <FaqSection />
            </div>
        </main>
    );
}
