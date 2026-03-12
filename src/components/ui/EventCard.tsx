"use client";

import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Tilt3DCard } from "./Tilt3DCard";

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
        <Tilt3DCard tiltMax={8} tiltSpeed={300}>
            <Link
                href={`/events/${slug}`}
                className="group block relative h-[420px] w-full overflow-hidden bg-bg-card
                    border border-border transition-all duration-500
                    hover:border-gold/25 hover:shadow-[0_0_40px_rgba(200,164,78,0.15)]"
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${image})`, transform: "translateZ(-20px)" }}
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" style={{ transform: "translateZ(0px)" }} />

                {/* Gold shine on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-gold/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ transform: "translateZ(10px)" }} />

                {/* Content - popped out */}
                <div
                    className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end h-full z-10 duration-300"
                    style={{ transform: "translateZ(50px)" }}
                >
                    {/* Category badge */}
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-bordeaux/20 border border-bordeaux/30 text-bordeaux-light text-[10px] font-bold uppercase tracking-widest w-max mb-4">
                        {category}
                    </span>

                    <h3 className="text-2xl font-bold text-white mb-3 leading-tight group-hover:text-gold transition-colors duration-300">
                        {title}
                    </h3>

                    <div className="flex items-center gap-5 text-xs">
                        <div className="flex items-center gap-1.5 text-gray-300">
                            <Calendar size={12} className="text-gold/50" />
                            <span>{date}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-300">
                            <MapPin size={12} className="text-gold/50" />
                            <span>{location}</span>
                        </div>
                    </div>

                    {/* View CTA on hover */}
                    <div className="flex items-center gap-2 text-gold text-sm font-medium mt-4
                        opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        Scopri di più <ArrowRight size={14} />
                    </div>
                </div>

                {/* Corner accent - popped out further */}
                <div
                    className="absolute top-0 right-0 w-12 h-12 z-20"
                    style={{ transform: "translateZ(60px)" }}
                >
                    <div className="absolute top-0 right-0 w-[1px] h-8 bg-gradient-to-b from-gold/20 to-transparent group-hover:from-gold/50 transition-all duration-500" />
                    <div className="absolute top-0 right-0 h-[1px] w-8 bg-gradient-to-l from-gold/20 to-transparent group-hover:from-gold/50 transition-all duration-500" />
                </div>
            </Link>
        </Tilt3DCard>
    );
}
