"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ImmersiveHeader } from "@/components/layout/ImmersiveHeader";
import { EventCard } from "@/components/ui/EventCard";
import { Calendar } from "lucide-react";
import { getEvents, Event } from "@/lib/dataStore";

import { ParallaxImage, StickyTextSection } from "@/components/ui/ParallaxScroll";
import { Sparkles } from "lucide-react";
import { ProjectList } from "@/components/ui/ProjectList";

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        getEvents().then(setEvents);
    }, []);

    return (
        <div className="min-h-screen  pb-24">
            <ImmersiveHeader
                title="I NOSTRI"
                highlight="Eventi"
                subtitle="Ogni serata è un'esperienza unica. Scopri il prossimo evento e vivi qualcosa di straordinario."
                mediaUrl="/images/brand/bg-hero-wide.png"
            />

            <div className="max-w-7xl mx-auto px-6 space-y-20">

                {/* Featured / Intro Section */}
                <section>
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
                                    Non semplici date sul calendario, ma appuntamenti con l'arte,
                                    la musica e la cucina d'autore. Prenota il tuo posto in prima fila.
                                </p>
                            </div>
                        }
                    >
                        <ParallaxImage
                            src="/images/brand/bg-stage-lights.png"
                            alt="Event Crowd"
                            aspectRatio="landscape"
                            speed={0.2}
                            priority
                        />
                    </StickyTextSection>
                </section>

                {/* Status bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-between border border-border bg-bg-card/30 px-5 py-3"
                >
                    <div className="flex items-center gap-3">
                        <Calendar size={14} className="text-rama-accent/50" />
                        <span className="font-outfit text-[11px] text-rama-accent/50 tracking-widest uppercase">
                            {events.length} Eventi Disponibili
                        </span>
                    </div>
                </motion.div>

                {/* Events List Overlay */}
                <ProjectList events={events} />
            </div>
        </div>
    );
}
