"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getFutureEvents, Event } from "@/lib/dataStore";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import clsx from "clsx";

export function RamaNextEvents() {
    const [events, setEvents] = useState<Event[]>([]);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const { ref: sectionRef, inView } = useIntersectionObserver({ threshold: 0.1 });

    useEffect(() => {
        getFutureEvents().then((data) => {
            const fallbackFormats = [
                { id: '1', title: 'Il PalQo', image: '/images/brand/bg-venue-crowd.png', slug: 'il-palqo' },
                { id: '2', title: 'A Cena Con Il Bugiardo', image: '/images/brand/bg-hero-wide.png', slug: 'a-cena-con-il-bugiardo' },
                { id: '3', title: 'Cena Con Delitto', image: '/images/brand/bg-venue-crowd.png', slug: 'cena-con-delitto' },
                { id: '4', title: 'THE GOLDEN VOICE', image: '/images/brand/service-performance.png', slug: 'the-golden-voice' }
            ];
            setEvents(data.length > 0 ? data : (fallbackFormats as Event[]));
        });
    }, []);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -400, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 400, behavior: "smooth" });
        }
    };

    return (
        <section 
            id="prossimi-eventi"
            ref={sectionRef as any} 
            className="w-full py-20 px-4 sm:px-6 md:px-12 bg-transparent relative overflow-hidden"
        >
            <div className={clsx(
                "transition-all duration-1000 transform",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}>
                <div className="max-w-7xl mx-auto flex items-end justify-between mb-10">
                    <div>
                        <h2 className="font-mohave font-bold leading-[0.85] tracking-tighter uppercase text-white mb-2 text-5xl md:text-6xl">
                            Prossimi <span className="text-rama-accent">Eventi</span>
                        </h2>
                        <p className="font-outfit text-rama-muted">Scegli la tua serata magica.</p>
                    </div>
                    {/* Navigation Arrows for Desktop */}
                    <div className="hidden md:flex items-center gap-4">
                        <button 
                            onClick={scrollLeft}
                            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:border-rama-accent hover:text-rama-accent transition-colors"
                            aria-label="Scorri a sinistra"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button 
                            onClick={scrollRight}
                            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:border-rama-accent hover:text-rama-accent transition-colors"
                            aria-label="Scorri a destra"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                {/* Horizontal Carousel */}
                <div 
                    ref={scrollContainerRef}
                    className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 -mx-4 px-4 sm:mx-0 sm:px-0"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {events.map((format, i) => (
                        <Link 
                            href={`/events/${format.slug}`} 
                            key={`${format.id}-${i}`}
                            className="relative w-[300px] sm:w-[350px] aspect-[4/5] flex-shrink-0 snap-start bg-bg-dark rounded-2xl overflow-hidden group transition-transform duration-500 hover:-translate-y-2"
                        >
                            <Image
                                src={(format.slug === 'il-palqo' && format.image?.includes('bull')) ? '/images/brand/bg-venue-crowd.png' : (format.image || "/images/brand/bg-hero-wide.png")}
                                alt={format.title}
                                fill
                                className="object-cover transition-transform duration-[1.5s] group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                sizes="(max-width: 640px) 300px, 350px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                            <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-rama-accent/50 transition-colors duration-500" />
                            
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="text-rama-accent font-rock-salt text-sm mb-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                    Il tuo posto sta aspettando
                                </div>
                                <h3 className="font-mohave text-3xl font-bold uppercase tracking-wide text-white group-hover:text-rama-accent transition-colors">
                                    {format.title}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
