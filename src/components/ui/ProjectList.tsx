"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Event } from "@/lib/dataStore";

interface ProjectListProps {
    events: Event[];
}

export function ProjectList({ events }: ProjectListProps) {
    const [hoveredEvent, setHoveredEvent] = useState<Event | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const listRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        // Calculate mouse position relative to the viewport or list
        // Using clientX/Y for fixed positioning of the image
        setMousePosition({
            x: e.clientX,
            y: e.clientY
        });
    };

    return (
        <div
            className="relative py-10"
            ref={listRef}
            onMouseMove={handleMouseMove}
        >
            {/* List Items */}
            <div className="space-y-0">
                {events.map((event) => (
                    <Link
                        key={event.id}
                        href={`/events/${event.id}`}
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

            {/* Floating Image Overlay */}
            <motion.div
                className="pointer-events-none fixed top-0 left-0 z-50 w-[300px] h-[400px] hidden md:block mix-blend-difference"
                animate={{
                    x: mousePosition.x - 150, // Center on cursor
                    y: mousePosition.y - 200,
                    opacity: hoveredEvent ? 1 : 0,
                    scale: hoveredEvent ? 1 : 0.8,
                    rotate: hoveredEvent ? Math.random() * 10 - 5 : 0 // Slight random rotation
                }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    mass: 0.5
                }}
            >
                {hoveredEvent && (
                    <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="w-full h-full overflow-hidden rounded-lg shadow-2xl relative"
                    >
                        <motion.img
                            key={hoveredEvent.id}
                            src={hoveredEvent.image}
                            alt={hoveredEvent.title}
                            className="w-full h-full object-cover"
                            animate={{
                                x: (mousePosition.x - 500) * -0.05,
                                y: (mousePosition.y - 400) * -0.05,
                            }}
                            transition={{ type: "tween", ease: "linear", duration: 0 }}
                        />
                        {/* Overlay to ensure text readability if we ever put text here, or just style */}
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                    </motion.div>
                )}
            </motion.div>
        </div>
    );

    // Calculate parallax offset based on mouse position relative to screen center
    // This is a simplified version; for true parallax we'd need window dimensions
    // But since we center on cursor, we can just use a subtle opposite move
}
