"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@/hooks/useGSAP";
import { animateFade } from "@/lib/gsapAnimations";
import { Event } from "@/lib/dataStore";

interface ProjectListProps {
    events: Event[];
    basePath?: string;
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

export function ProjectList({ events, basePath = "/events" }: ProjectListProps) {
    const [hoveredEvent, setHoveredEvent] = useState<Event | null>(null);
    const listRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        animateFade(".gsap-card", "up", 0.1);
    }, { scope: listRef });

    return (
        <div
            className="relative py-10"
            ref={listRef}
        >
            {/* List Items */}
            <div className="space-y-0">
                {events.map((event, index) => {
                    const isExternal = event.ctaHref?.startsWith('http');
                    const CtaLink = isExternal ? 'a' : Link;
                    const ctaProps = isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};

                    return (
                        <div
                            key={event.id}
                            className={`gsap-card group relative border-t border-white/10 ${index === events.length - 1 ? 'pb-24 md:pb-0' : ''}`}
                            onMouseEnter={() => setHoveredEvent(event)}
                            onMouseLeave={() => setHoveredEvent(null)}
                        >
                            {/* Hover Image Background */}
                            {event.image && (
                                <Image 
                                    src={event.image}
                                    alt={event.title}
                                    fill
                                    className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-700 object-cover z-0"
                                    sizes="100vw"
                                />
                            )}
                            
                            <div className="relative z-10 py-8 md:py-10 px-4 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8 transition-all duration-300 md:group-hover:px-8 cursor-default overflow-hidden md:overflow-visible">
                                
                                <div className="flex items-start gap-4 md:gap-8 min-w-0 flex-1">
                                    <span className="text-xs sm:text-sm font-mohave text-white/40 group-hover:text-rama-accent transition-colors shrink-0 tracking-widest mt-1.5 pt-1">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    
                                    <div className="flex flex-col gap-1 min-w-0 flex-1">
                                        <Link 
                                            href={`${basePath}/${event.slug}`}
                                            className="group/title block w-full"
                                        >
                                            <h3 className="text-2xl sm:text-4xl md:text-5xl font-mohave font-bold text-white tracking-tight uppercase leading-[0.9] sm:leading-none group-hover/title:text-rama-accent transition-colors break-words overflow-visible">
                                                {event.title}
                                            </h3>
                                        </Link>

                                        {event.description && (
                                            <p className="text-sm text-rama-muted font-outfit line-clamp-3 md:line-clamp-2 max-w-2xl mt-2 md:mt-1">
                                                {event.description}
                                            </p>
                                        )}

                                        {event.details && (
                                            <p className="text-[10px] sm:text-xs text-rama-accent/60 font-outfit uppercase tracking-widest mt-3 md:mt-1 font-semibold">
                                                {event.details}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-row md:items-center justify-between md:justify-end gap-4 md:gap-8 w-full md:w-auto pt-4 md:pt-0 border-t border-white/5 md:border-none">
                                    <div className="flex flex-col items-start md:items-end gap-1">
                                        {event.badge && (
                                            <span className="text-[10px] font-bold text-rama-accent border border-rama-accent/30 px-2 py-0.5 rounded-sm uppercase tracking-tighter bg-rama-accent/5">
                                                {event.badge}
                                            </span>
                                        )}
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] uppercase tracking-widest text-white/40 md:group-hover:text-white transition-colors duration-300">
                                                {formatDate(event.date)}
                                            </span>
                                            <span className="text-[10px] uppercase font-outfit tracking-widest text-rama-muted/60">
                                                {event.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        {event.ctaHref && event.ctaText && (
                                            //@ts-ignore
                                            <CtaLink
                                                href={event.ctaHref}
                                                {...ctaProps}
                                                className="bg-rama-accent text-black text-[10px] md:text-xs font-bold uppercase tracking-widest px-5 md:px-6 py-3 rounded-full hover:bg-white transition-all transform md:hover:scale-105 active:scale-95 flex items-center gap-2 whitespace-nowrap shadow-lg shadow-rama-accent/10"
                                            >
                                                {event.ctaText}
                                            </CtaLink>
                                        )}
                                        
                                        <Link 
                                            href={`${basePath}/${event.slug}`}
                                            className="text-white/30 hover:text-rama-accent transition-colors p-2 hidden md:block"
                                        >
                                            <ArrowUpRight className="group-hover:rotate-45 transition-transform duration-500 ease-out" size={20} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
