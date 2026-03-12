"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { getEvents, Event } from "@/lib/dataStore";
import Link from "next/link";

export function RamaWorks() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        getEvents().then(setEvents);
    }, []);

    // If no events from DB yet, we can optionally show a fallback or just empty.
    const displayEvents = events.length > 0 ? events.slice(0, 3) : [];

    return (
        <section ref={containerRef} className="w-full relative px-6 md:px-12 bg-black py-32 flex flex-col lg:flex-row gap-12 lg:gap-0">
            {/* Left Sticky Sidebar */}
            <div className="lg:w-1/3 relative z-10">
                <div className="lg:sticky lg:top-40 flex flex-col">
                    <div className="flex justify-between items-center mb-12">
                        <div className="font-rock-salt text-rama-accent transform -rotate-2 text-xl">Prossimi Eventi</div>
                        <a href="/events" className="flex items-center gap-2 text-rama-accent font-outfit uppercase tracking-widest text-sm hover:text-white transition-colors">
                            Tutti gli Eventi <ArrowUpRight size={16} />
                        </a>
                    </div>

                    <div className="flex flex-col gap-2 font-mohave text-4xl md:text-6xl uppercase font-bold text-white/50 tracking-tighter">
                        {displayEvents.map((p, i) => (
                            <Link href={`/events/${p.slug}`} key={p.id} className="cursor-pointer hover:text-white transition-colors duration-300">
                                {i === 0 && <span className="inline-block w-4 h-[6px] bg-rama-accent mr-4 align-middle mb-2"></span>}
                                {p.title}
                            </Link>
                        ))}
                        {displayEvents.length === 0 && (
                            <div className="text-xl text-gray-600">Nessun evento in programma.</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Scrollable Content */}
            <div className="lg:w-2/3 flex flex-col gap-32">
                {displayEvents.map((event, index) => (
                    <ProjectCard key={event.id} event={event} index={index} />
                ))}
            </div>
        </section>
    );
}

function ProjectCard({ event, index }: { event: Event; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-8 w-full"
        >
            {/* Card Graphic */}
            <Link href={`/events/${event.slug}`} className="w-full aspect-[4/3] rounded-2xl overflow-hidden relative group block cursor-pointer">
                <img
                    src={event.image || "/images/brand/bg-hero-wide.png"}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </Link>

            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
                <div className="md:col-span-8 flex flex-col gap-4">
                    <Link href={`/events/${event.slug}`}>
                        <h3 className="font-mohave text-3xl md:text-5xl font-bold leading-tight uppercase text-white tracking-tighter hover:text-rama-accent transition-colors">
                            {event.title}
                        </h3>
                    </Link>
                    {event.subtitle && (
                        <p className="text-gray-400 font-outfit text-lg">{event.subtitle}</p>
                    )}
                </div>

                <div className="md:col-span-4 flex flex-col gap-4 text-rama-muted font-outfit text-sm">
                    <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-4">
                        <span className="font-rock-salt text-white mt-1">Data</span>
                        <span className="text-lg">{event.date}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-4">
                        <span className="font-rock-salt text-white mt-1">Location</span>
                        <span className="text-lg">{event.location}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-4">
                        <span className="font-rock-salt text-white mt-1">Categoria</span>
                        <div className="flex flex-wrap gap-2">
                             <span className="px-3 py-1 border border-white/20 rounded-full text-xs text-white">
                                 {event.category}
                             </span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
