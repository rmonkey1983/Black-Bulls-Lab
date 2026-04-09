"use client";

import React, { useRef, useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { getFutureEvents, Event } from "@/lib/dataStore";
import Link from "next/link";
import { useGSAP } from "@/hooks/useGSAP";
import { animateCards, animateFade } from "@/lib/gsapAnimations";

export function RamaWorks() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        getFutureEvents().then(setEvents);
    }, []);

    const displayEvents = events.length > 0 ? events.slice(0, 3) : [];

    useGSAP(() => {
        animateFade(".works-sidebar", "left", 0.1);
        animateCards("#works-grid");
    }, { scope: containerRef });

    return (
        <section id="esperienze" ref={containerRef} className="w-full relative px-4 sm:px-6 md:px-12 bg-transparent py-20 sm:py-32 flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-0">
            {/* Left Sidebar */}
            <div className="works-sidebar lg:w-1/3 relative z-0">
                <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-8 sm:mb-12">
                        <div className="font-rock-salt text-rama-accent transform -rotate-2 text-base sm:text-xl">Prossimi Eventi</div>
                        <Link href="/events" className="flex items-center gap-2 text-rama-accent font-outfit uppercase tracking-widest text-xs sm:text-sm hover:text-white transition-colors">
                            Tutti gli Eventi <ArrowUpRight size={16} />
                        </Link>
                    </div>

                    <div className="flex flex-col gap-2 font-mohave text-2xl sm:text-4xl md:text-6xl uppercase font-bold text-white/50 tracking-tighter overflow-hidden">
                        {displayEvents.map((p, i) => (
                            <Link href={`/events/${p.slug}`} key={p.id} className="cursor-pointer hover:text-white transition-colors duration-300">
                                {i === 0 && <span className="inline-block w-4 h-[6px] bg-rama-accent mr-4 align-middle mb-2"></span>}
                                {p.title}
                            </Link>
                        ))}
                        {displayEvents.length === 0 && (
                            <div className="text-sm sm:text-lg font-outfit text-white/50 italic normal-case tracking-normal mt-4 leading-relaxed">
                                Il laboratorio sta preparando nuove date.<br/>
                                <a href="#newsletter" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); }} className="underline hover:text-white transition-colors">Iscriviti alla newsletter</a> per scoprirle in anteprima.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Scrollable Content */}
            <div id="works-grid" className="lg:w-2/3 flex flex-col gap-32">
                {displayEvents.map((event) => (
                    <ProjectCard key={event.id} event={event} />
                ))}
            </div>
        </section>
    );
}

const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    try {
        let normalized = dateStr.replace(/\./g, '-');
        const parts = normalized.split('-');
        if (parts.length === 3 && parts[2].length === 4) {
             normalized = `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
        const date = new Date(normalized);
        if (isNaN(date.getTime())) return dateStr;
        return new Intl.DateTimeFormat('it-IT', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
    } catch {
        return dateStr;
    }
};

function ProjectCard({ event }: { event: Event }) {
    return (
        <div className="gsap-card flex flex-col gap-8 w-full opacity-0">
            {/* Card Graphic */}
            <Link href={`/events/${event.slug}`} className="w-full aspect-[4/3] rounded-2xl overflow-hidden relative group block cursor-pointer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={(event.slug === 'il-palqo' && event.image?.includes('bull')) ? '/images/brand/bg-venue-crowd.png' : (event.image || "/images/brand/bg-hero-wide.png")}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out"
                />
                <div className="absolute inset-0 bg-transparent/20 group-hover:bg-transparent transition-colors duration-500" />
            </Link>

            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
                <div className="md:col-span-8 flex flex-col gap-4">
                    <Link href={`/events/${event.slug}`}>
                        <h3 className="font-mohave text-3xl md:text-5xl font-bold leading-tight uppercase text-white tracking-tighter hover:text-rama-accent transition-colors">
                            {event.title}
                        </h3>
                    </Link>
                    {event.description && (
                         <p className="text-gray-400 font-outfit text-lg line-clamp-3 overflow-hidden">{event.description}</p>
                    )}
                </div>

                <div className="md:col-span-4 flex flex-col gap-4 text-rama-muted font-outfit text-sm">
                    <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-4">
                        <span className="font-rock-salt text-white mt-1">Data</span>
                        <span className="text-lg">{formatDate(event.date)}</span>
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
        </div>
    );
}
