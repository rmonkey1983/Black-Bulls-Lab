"use client";

import { Calendar, MapPin, Share2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useGSAP } from "@/hooks/useGSAP";
import { animateFade } from "@/lib/gsapAnimations";

interface EventHeroProps {
    title: string;
    subtitle: string;
    image: string;
    date: string;
    location: string;
}

export function EventHero({ title, subtitle, image, date, location }: EventHeroProps) {
    useGSAP(() => {
        animateFade("#event-hero-content", "up", 0.1);
    });

    return (
        <div className="relative h-[85vh] w-full overflow-hidden flex items-end">
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] ease-linear hover:scale-105"
                style={{ backgroundImage: `url(${image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-[url('/noise.webp')] opacity-20 mix-blend-overlay pointer-events-none" />

            {/* Back Button */}
            <Link
                href="/events"
                className="absolute top-24 left-6 z-30 flex items-center gap-2 text-white/70 hover:text-gold transition-colors uppercase text-xs font-bold tracking-widest"
            >
                <ArrowLeft size={16} /> Torna agli Eventi
            </Link>

            {/* Content */}
            <div className="relative z-20 w-full max-w-7xl mx-auto p-6 md:p-12 mb-12">
                <div
                    id="event-hero-content"
                    className="flex flex-col md:flex-row md:items-end justify-between gap-8"
                >
                    <div className="space-y-6 max-w-4xl">
                        <div className="flex flex-wrap items-center gap-6 text-gold text-sm font-bold uppercase tracking-[0.2em]">
                            <span className="flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                                <Calendar size={14} /> {date}
                            </span>
                            <span className="flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                                <MapPin size={14} /> {location}
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter leading-[0.9] drop-shadow-2xl">
                            {title}
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed border-l-2 border-gold pl-6">
                            {subtitle}
                        </p>
                    </div>

                    <button
                        onClick={() => {
                            if (navigator.share) {
                                navigator.share({
                                    title: title,
                                    text: subtitle,
                                    url: window.location.href,
                                }).catch((error) => console.log('Error sharing', error));
                            } else {
                                navigator.clipboard.writeText(window.location.href);
                                alert("Link copiato negli appunti!");
                            }
                        }}
                        className="flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20 transition-all hover:scale-105 group"
                    >
                        <Share2 size={20} className="group-hover:text-gold transition-colors" />
                        <span className="text-xs font-bold uppercase tracking-widest">Condividi</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
