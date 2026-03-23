"use client";

import React from "react";
import { RamaAnimatedText } from "../RamaAnimatedText";
import Image from "next/image";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { ArrowRight } from "lucide-react";

export function RamaHero() {
    return (
        <section className="relative w-full min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-12 pt-28 sm:pt-32 pb-12 sm:pb-16 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full relative z-10 w-full">

                {/* Left Content */}
                <div className="flex flex-col items-start justify-center h-full pt-8 lg:pt-0 z-20 mix-blend-difference">
                    <RamaAnimatedText
                        text="Oltre il semplice evento."
                        className="font-rock-salt text-rama-accent text-base sm:text-xl md:text-3xl lg:text-4xl mb-4 sm:mb-6 transform -rotate-3"
                    />

                    {/* SEO Optimized H1 - Visually hidden but readable by screen readers and crawlers */}
                    <h1 className="sr-only">Black Bulls Lab | Creatori di Emozioni e Dinner Show Esclusivi</h1>

                    <div className="font-mohave font-bold leading-[0.85] tracking-tighter uppercase text-white flex flex-col text-[14vw] sm:text-[13vw] md:text-[12vw] lg:text-[10vw]">
                        <RamaAnimatedText text="CREATORI" delay={0.1} />
                        <RamaAnimatedText text="DI EMOZIONI." delay={0.2} className="text-rama-accent" />
                        <RamaAnimatedText text="BLACK BULLS LAB" delay={0.3} className="text-[10vw] sm:text-[9vw] md:text-[8.5vw] lg:text-[7.5vw] text-white/50" />
                    </div>

                    <div className="mt-6 sm:mt-10 md:mt-16 text-rama-muted font-outfit text-base sm:text-lg md:text-xl lg:text-2xl max-w-xl">
                        <RamaAnimatedText
                            text="Non ci limitiamo a organizzare serate. Progettiamo dinner show, format immersivi e spettacoli su misura. La nostra passione e professionalità sono al tuo servizio per trasformare la tua visione in realtà."
                            delay={0.4}
                        />
                    </div>

                    <div className="mt-8 sm:mt-10 opacity-0 animate-[fadeIn_1s_ease-out_0.8s_forwards]">
                        <button 
                            onClick={() => {
                                const target = document.getElementById('esperienze');
                                if (target) {
                                    window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 100, behavior: 'smooth' });
                                } else {
                                    window.location.href = "/events";
                                }
                            }}
                        >
                            <PremiumButton href="#" variant="gold" size="lg">
                                <span className="font-mohave tracking-widest uppercase text-base sm:text-lg">Scopri le Esperienze</span>
                                <ArrowRight size={20} className="ml-2" />
                            </PremiumButton>
                        </button>
                    </div>
                </div>

                {/* Right Content - Evocative Image (hidden on mobile) */}
                <div className="hidden lg:flex relative h-[80%] items-center justify-center z-10 w-full pl-12 opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards]">
                    <div className="relative w-full h-[70vh] rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(200,164,78,0.1)] group">
                        <Image
                            src="/images/brand/bg-venue-crowd.png"
                            alt="Black Bulls Lab Dinner Show Experience"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-1000"
                            priority
                            sizes="(max-width: 1024px) 0vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-bg-dark/20 to-transparent"></div>
                        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                             <div className="font-mohave text-3xl font-bold uppercase tracking-tighter text-white">
                                Emozioni in <span className="text-rama-accent">Scena</span>
                             </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
