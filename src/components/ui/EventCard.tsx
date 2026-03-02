"use client";

import Link from "next/link";
import { Calendar, MapPin, FlaskConical } from "lucide-react";

interface EventCardProps {
    id: string;
    slug: string;
    title: string;
    date: string;
    location: string;
    image: string;
    category: string;
}

export function EventCard({ id, slug, title, date, location, image, category }: EventCardProps) {
    return (
        <Link
            href={`/events/${slug}`}
            className="group block relative h-[420px] w-full overflow-hidden bg-lab-card border border-green/10
                transition-all duration-500 hover:border-green/30 hover:shadow-[0_0_30px_rgba(0,255,136,0.08)]"
        >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-green/30 z-20 transition-all duration-500 group-hover:w-6 group-hover:h-6 group-hover:border-green/60" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-green/30 z-20 transition-all duration-500 group-hover:w-6 group-hover:h-6 group-hover:border-green/60" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-green/30 z-20 transition-all duration-500 group-hover:w-6 group-hover:h-6 group-hover:border-green/60" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-green/30 z-20 transition-all duration-500 group-hover:w-6 group-hover:h-6 group-hover:border-green/60" />

            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${image})` }}
            />

            {/* Overlay with lab tint */}
            <div className="absolute inset-0 bg-gradient-to-t from-lab-dark via-lab-dark/70 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />

            {/* Scan line on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
                style={{
                    background: `repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0, 255, 136, 0.02) 3px, rgba(0, 255, 136, 0.02) 6px)`
                }}
            />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end h-full z-10">
                {/* Classification badge */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green/10 border border-green/30 text-green text-[10px] font-bold uppercase tracking-[0.2em] w-max mb-4 data-readout">
                    <FlaskConical size={10} />
                    {category}
                </span>

                <h3 className="text-2xl font-bold text-white mb-3 leading-tight group-hover:text-green transition-colors duration-300">
                    {title}
                </h3>

                <div className="flex items-center gap-5 text-xs data-readout mt-2">
                    <div className="flex items-center gap-1.5 text-cyan/70">
                        <Calendar size={12} />
                        <span>{date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-cyan/70">
                        <MapPin size={12} />
                        <span>{location}</span>
                    </div>
                </div>
            </div>

            {/* Experiment ID */}
            <div className="absolute top-3 right-3 z-20">
                <span className="data-readout text-[9px] text-green/30 tracking-[0.2em]">
                    EXP-{id.toString().padStart(3, "0")}
                </span>
            </div>
        </Link>
    );
}
