"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Event } from "@/lib/dataStore";

interface ProjectListProps {
    events: Event[];
    basePath?: string;
}

export function ProjectList({ events, basePath = "/events" }: ProjectListProps) {
    const [hoveredEvent, setHoveredEvent] = useState<Event | null>(null);
    const listRef = useRef<HTMLDivElement>(null);

    return (
        <div
            className="relative py-10"
            ref={listRef}
        >
            {/* List Items */}
            <div className="space-y-0">
                {events.map((event) => (
                    <Link
                        key={event.id}
                        href={`${basePath}/${event.slug}`}
                        className="group block"
                        onMouseEnter={() => setHoveredEvent(event)}
                        onMouseLeave={() => setHoveredEvent(null)}
                    >
                        <div className="border-t border-white/10 py-6 md:py-10 px-0 sm:px-4 flex items-center justify-between transition-all duration-300 md:group-hover:px-8 group-hover:bg-white/5">
                            <div className="flex items-baseline gap-4 md:gap-12 w-[60%] sm:w-auto">
                                <span className="text-xs font-outfit text-gray-500 group-hover:text-rama-accent transition-colors shrink-0">0{event.id}</span>
                                <h3 className="text-xl sm:text-3xl md:text-5xl font-mohave font-bold text-white tracking-tight group-hover:translate-x-1 md:group-hover:translate-x-2 transition-transform duration-300 uppercase truncate md:whitespace-nowrap sm:whitespace-normal">
                                    {event.title}
                                </h3>
                            </div>

                            <div className="flex items-center justify-end gap-4 md:gap-8 shrink-0">
                                <span className="hidden md:block text-xs uppercase tracking-widest text-gray-500 group-hover:text-gray-300 transition-colors duration-300">
                                    {event.date}
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
