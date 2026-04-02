"use client";

import React, { useEffect, useState } from "react";
import { RamaAnimatedText } from "../RamaAnimatedText";
import Image from "next/image";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { ArrowRight } from "lucide-react";
import { getFutureEvents, Event } from "@/lib/dataStore";
import Link from "next/link";

export function RamaHero() {
    const [events, setEvents] = useState<Event[]>([]);
    
    useEffect(() => {
        getFutureEvents().then(setEvents);
    }, []);

    const fallbackFormats = [
        { id: '1', title: 'Il Palqo', image: '/images/brand/bg-venue-crowd.png', slug: 'il-palqo' },
        { id: '2', title: 'Notte Medievale', image: '/images/brand/bg-hero-wide.png', slug: 'notte-medievale' },
        { id: '3', title: 'Cena con Delitto', image: '/images/brand/bg-venue-crowd.png', slug: 'cena-con-delitto' },
    ];

    const displayFormats = events.length > 0 ? events : fallbackFormats as Event[];
    // Duplicate array to create seamless loop
    const carouselItems = [...displayFormats, ...displayFormats, ...displayFormats];

    return (
        <section className="relative w-full min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-12 pt-32 sm:pt-36 md:pt-28 pb-12 sm:pb-16 overflow-hidden">
            <style>{`
                @keyframes autoScrollVertical {
                    from { transform: translateY(-33.33%); }
                    to { transform: translateY(0%); }
                }
                .animate-infinite-scroll {
                    animation: autoScrollVertical 30s linear infinite;
                }
                .carousel-container:hover .animate-infinite-scroll {
                    animation-play-state: paused;
                }
            `}</style>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full relative z-10 w-full">

                {/* Left Content */}
                <div className="flex flex-col items-start justify-center h-full pt-8 lg:pt-0 z-20 mix-blend-difference overflow-hidden">
                    <RamaAnimatedText
                        text="Oltre il semplice evento."
                        className="font-rock-salt text-rama-accent text-sm sm:text-xl md:text-3xl lg:text-4xl mb-4 sm:mb-6 transform -rotate-3"
                    />

                    {/* SEO Optimized H1 - Visible e indicizzabile da Google e AI */}
                    <h1 className="font-mohave font-bold uppercase tracking-[0.15em] text-[clamp(0.6rem,1.2vw,0.9rem)] text-white/60 border border-white/20 px-3 py-1 rounded-full mb-4 sm:mb-5 backdrop-blur-sm">
                        Black Bulls Lab — Dinner Show &amp; Organizzazione Eventi · Torino
                    </h1>

                    <div className="font-mohave font-bold leading-[0.85] tracking-tighter uppercase text-white flex flex-col text-[13vw] sm:text-[13vw] md:text-[12vw] lg:text-[10vw] w-full overflow-hidden">
                        <RamaAnimatedText text="CREATORI" delay={0.1} />
                        <RamaAnimatedText text="DI EMOZIONI." delay={0.2} className="text-rama-accent" />
                        <RamaAnimatedText text="BLACK BULLS LAB" delay={0.3} className="text-[9.5vw] sm:text-[9vw] md:text-[8.5vw] lg:text-[7.5vw] text-white/50" />
                    </div>

                    <div className="mt-6 sm:mt-10 md:mt-16 text-rama-muted font-outfit text-base sm:text-lg md:text-xl lg:text-2xl max-w-xl">
                        <RamaAnimatedText
                            text="Non ci limitiamo a organizzare serate. Progettiamo dinner show, format immersivi e spettacoli su misura. La nostra passione e professionalità sono al tuo servizio per trasformare la tua visione in realtà."
                            delay={0.4}
                        />
                    </div>

                    <div className="mt-8 sm:mt-10 opacity-0 animate-[fadeIn_1s_ease-out_0.8s_forwards]">
                        <PremiumButton
                            href="/events"
                            variant="gold"
                            size="lg"
                            onClick={(e) => {
                                const target = document.getElementById('esperienze');
                                if (target) {
                                    e.preventDefault();
                                    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
                                }
                            }}
                        >
                            <span className="font-mohave tracking-widest uppercase text-base sm:text-lg">Scopri le Esperienze</span>
                            <ArrowRight size={20} className="ml-2" />
                        </PremiumButton>
                    </div>
                </div>

                {/* Right Content - Premium 3D Vertical Carousel */}
                <div className="hidden lg:flex relative h-[90vh] items-center justify-center z-10 w-full pl-0 md:pl-16 opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards] carousel-container">
                    
                    {/* Shared Wrapper for Labels and Carousel (ensures tight framing) */}
                    <div className="relative w-[85%] xl:w-[80%] h-full flex items-center justify-center" style={{ perspective: "1500px" }}>
                        
                        {/* Left Frame Label */}
                        <div className="absolute -left-12 xl:-left-16 top-1/2 -translate-y-1/2 z-30 pointer-events-none hidden md:flex flex-col items-center gap-6 opacity-100 drop-shadow-[0_0_15px_rgba(200,164,78,0.6)]">
                             <div className="w-[2px] h-24 bg-gradient-to-b from-transparent to-rama-accent/80 rounded-full"></div>
                             <div className="font-mohave uppercase tracking-[0.4em] text-rama-accent text-sm sm:text-base font-bold" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                                  PROSSIMI EVENTI
                             </div>
                             <div className="w-[2px] h-24 bg-gradient-to-t from-transparent to-rama-accent/80 rounded-full"></div>
                        </div>

                        {/* Right Frame Label */}
                        <div className="absolute -right-12 xl:-right-16 top-1/2 -translate-y-1/2 z-30 pointer-events-none hidden md:flex flex-col items-center gap-6 opacity-100 drop-shadow-[0_0_15px_rgba(200,164,78,0.6)]">
                             <div className="w-[2px] h-24 bg-gradient-to-b from-transparent to-rama-accent/80 rounded-full"></div>
                             <div className="font-mohave uppercase tracking-[0.4em] text-rama-accent text-sm sm:text-base font-bold" style={{ writingMode: 'vertical-rl' }}>
                                  PROSSIMI EVENTI
                             </div>
                             <div className="w-[2px] h-24 bg-gradient-to-t from-transparent to-rama-accent/80 rounded-full"></div>
                        </div>

                        {/* Top and Bottom Fade Masks */}
                        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-bg-dark via-bg-dark/80 to-transparent z-20 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg-dark via-bg-dark/80 to-transparent z-20 pointer-events-none" />
                        
                        {/* Inner 3D Scrolling Window */}
                        <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
                            <div 
                                className="flex flex-col gap-10 w-full absolute pt-[50%] animate-infinite-scroll"
                                style={{
                                   transform: "rotateX(15deg) rotateY(-20deg) rotateZ(5deg)",
                                   transformStyle: "preserve-3d"
                                }}
                            >
                                {carouselItems.map((format, i) => (
                                    <Link href={`/events/${format.slug}`} key={`${format.id}-${i}`} 
                                        className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden bg-bg-dark/50 group cursor-pointer flex-shrink-0 transition-transform duration-700 hover:scale-105"
                                        style={{
                                            boxShadow: "-20px 30px 60px rgba(0,0,0,0.8), 0 0 30px rgba(200,164,78,0.15)",
                                            transform: "translateZ(0)",
                                        }}
                                    >
                                        <Image
                                            src={(format.slug === 'il-palqo' && format.image?.includes('bull')) ? '/images/brand/bg-venue-crowd.png' : (format.image || "/images/brand/bg-hero-wide.png")}
                                            alt={format.title}
                                            fill
                                            className="object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 opacity-70 group-hover:opacity-100"
                                            sizes="(max-width: 1024px) 0vw, 50vw"
                                            loading="lazy"
                                            priority={false}
                                            quality={80}
                                        />
                                        
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-700"></div>
                                        <div className="absolute inset-0 border-[1.5px] border-white/10 rounded-[2rem] group-hover:border-gold/40 transition-colors duration-700 z-10" />

                                        {/* Content inside card */}
                                        <div className="absolute bottom-10 left-8 right-8 flex flex-col items-start z-20">
                                             <div className="text-gold font-rock-salt text-base mb-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                                 Scopri il format
                                             </div>
                                             <div className="font-mohave text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tighter text-transparent transform group-hover:translate-x-2 transition-transform duration-500"
                                                  style={{ WebkitTextStroke: "1px rgba(255,255,255,0.6)" }}
                                             >
                                                <span className="block group-hover:text-white transition-colors duration-500 delay-75">
                                                    {format.title}
                                                </span>
                                                <div className="h-[4px] w-0 bg-gold mt-4 group-hover:w-24 transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(200,164,78,0.8)]"></div>
                                             </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
