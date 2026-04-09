"use client";

import { useState, useRef } from "react";
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
                {events.map((event, index) => (
                    <Link
                        key={event.id}
                        href={`${basePath}/${event.slug}`}
                        className="gsap-card group block relative overflow-hidden"
                        onMouseEnter={() => setHoveredEvent(event)}
                        onMouseLeave={() => setHoveredEvent(null)}
                    >
                        <div className="border-t border-white/10 py-6 md:py-10 px-0 sm:px-4 flex items-center justify-between transition-all duration-300 md:group-hover:px-8 group-hover:bg-transparent relative z-10">
                            {/* Hover Image Background */}
                            {event.image && (
                                <div 
                                    className="absolute inset-0 opacity-0 group-hover:opacity-15 pointer-events-none transition-opacity duration-700 bg-cover bg-center z-[-1]"
                                    style={{ backgroundImage: `url(${event.image})` }}
                                />
                            )}
                            
                            <div className="flex items-baseline gap-4 md:gap-8 min-w-0 flex-1">
                                <span className="text-sm font-mohave text-white/40 group-hover:text-rama-accent transition-colors shrink-0 tracking-widest mt-1">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <div className="flex flex-col group-hover:translate-x-1 md:group-hover:translate-x-2 transition-transform duration-300 min-w-0">
                                    <h3 className="text-xl sm:text-3xl md:text-5xl font-mohave font-bold text-white tracking-tight uppercase break-words">
                                        {event.title}
                                    </h3>
                                    {event.description && (
                                        <p className="text-xs sm:text-sm text-rama-muted font-outfit mt-1 hidden md:block line-clamp-2">
                                            {event.description}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-4 md:gap-8 shrink-0">
                                <span className="hidden md:block text-xs uppercase tracking-widest text-white/50 group-hover:text-white transition-colors duration-300">
                                    {formatDate(event.date)}
                                </span>
                                <span className="hidden md:block text-xs uppercase font-outfit tracking-widest text-rama-accent/40 group-hover:text-rama-accent transition-colors duration-300">
                                    {event.category}
                                </span>
                                <ArrowUpRight className="text-white/30 group-hover:text-rama-accent group-hover:rotate-45 transition-all duration-500 ease-out" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
