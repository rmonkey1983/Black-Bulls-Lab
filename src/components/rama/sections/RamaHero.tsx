"use client";
import React, { useEffect, useState } from "react";
import { RamaAnimatedText } from "../RamaAnimatedText";
import Image from "next/image";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@/hooks/useGSAP";
import { animateHeroText } from "@/lib/gsapAnimations";

export function RamaHero() {
    useGSAP(() => {
        animateHeroText("#hero-content", 0.5);
    });
    
    return (
        <section className="relative w-full h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 overflow-hidden text-center">
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

            <div className="flex flex-col items-center justify-center max-w-5xl mx-auto h-full relative z-20 mix-blend-difference overflow-hidden">
                    <RamaAnimatedText
                        text="Torino. Ogni weekend. Posti limitati."
                        className="font-rock-salt text-rama-accent text-sm sm:text-xl md:text-3xl lg:text-4xl mb-4 sm:mb-6 transform -rotate-3"
                    />

                    <h1 className="font-mohave font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] text-sm sm:text-lg md:text-xl text-white/90 border border-white/20 px-4 py-2 rounded-2xl mb-8 backdrop-blur-sm shadow-2xl leading-tight">
                        Black Bulls Lab — Dinner Show &amp; Organizzazione Eventi · Torino
                    </h1>

                    <div className="font-mohave font-bold leading-[0.85] tracking-tighter uppercase text-white flex flex-col items-center text-[18vw] sm:text-[15vw] md:text-[12vw] lg:text-[10vw] w-full overflow-hidden">
                        <span className="line"><span>CREATORI</span></span>
                        <span className="line"><span className="text-gold">DI EMOZIONI.</span></span>
                    </div>

                    <div className="mt-8 sm:mt-10 md:mt-12 text-rama-muted font-outfit text-base sm:text-lg md:text-xl lg:text-2xl max-w-xl">
                        <p className="gsap-fade">
                            Dinner show, cena con delitto e format immersivi. Il tuo posto è quasi esaurito.
                        </p>
                    </div>

                    <div className="mt-10 sm:mt-12 w-full sm:w-auto opacity-0 animate-[fadeIn_1s_ease-out_0.8s_forwards]">
                        <PremiumButton
                            href="#prossimi-eventi"
                            variant="gold"
                            size="lg"
                            className="w-full sm:w-auto flex justify-center py-5 sm:py-4 px-10"
                            onClick={(e) => {
                                const target = document.getElementById('prossimi-eventi');
                                if (target) {
                                    e.preventDefault();
                                    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
                                }
                            }}
                        >
                            <span className="font-mohave tracking-widest uppercase text-base sm:text-lg">Il tuo posto sta aspettando →</span>
                            <ArrowRight size={20} className="ml-2" />
                        </PremiumButton>
                    </div>
                </div>
        </section>
    );
}
