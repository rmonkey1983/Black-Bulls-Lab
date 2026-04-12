"use client";
import React, {   } from "react";
import Image from "next/image";
import { RamaAnimatedText } from "../RamaAnimatedText";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@/hooks/useGSAP";
import { animateHeroText } from "@/lib/gsapAnimations";

export function RamaHero() {
    useGSAP(() => {
        animateHeroText("#hero-content", 0.5);
    });
    
    return (
        <section className="relative w-full h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 overflow-hidden text-center bg-black">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/brand/bg-hero-wide.webp"
                    alt="Black Bulls Lab Hero"
                    fill
                    className="object-cover opacity-30 grayscale contrast-125"
                    priority
                    fetchPriority="high"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-[url('/noise.webp')] opacity-20 mix-blend-overlay pointer-events-none" />
            </div>

            {/* Scanline / Grid Effect */}
            <div className="absolute inset-0 pointer-events-none z-10 opacity-30">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
            </div>

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
                @keyframes tech-lines {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100%); }
                }
            `}</style>

            <div id="hero-content" className="flex flex-col items-center justify-center max-w-5xl mx-auto h-full relative z-20 overflow-hidden py-24">
                    <RamaAnimatedText
                        text="Torino. Ogni weekend. Posti limitati."
                        className="font-rock-salt text-yellow-500 text-sm sm:text-xl md:text-3xl lg:text-4xl mb-6 transform -rotate-3 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]"
                    />

                    <h1 className="font-heading font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs md:text-sm text-yellow-500/80 border border-yellow-500/30 px-6 py-2 rounded-full mb-8 backdrop-blur-md shadow-[0_0_30px_rgba(234,179,8,0.1)] leading-tight bg-white/5">
                        L&apos;INTRATTENIMENTO E&apos; DIVENTATO SCIENZA
                    </h1>

                    <div className="font-heading font-bold leading-[0.82] tracking-tighter uppercase text-white flex flex-col items-center text-[18vw] sm:text-[15vw] md:text-[12vw] lg:text-[10vw] w-full">
                        <span className="line opacity-0 transform translate-y-10 group-inview:opacity-100 group-inview:translate-y-0 transition-all duration-700">
                            CREATORI
                        </span>
                        <span className="line">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-white to-yellow-500">DI EMOZIONI.</span>
                        </span>
                    </div>

                    <div className="mt-10 sm:mt-12 md:mt-14 text-gray-400 font-sans text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl px-4">
                        <p className="gsap-fade leading-relaxed">
                            Dinner show interattivi, indagini noir e social deception. <br className="hidden md:block"/>
                            <span className="text-white">Il nuovo standard dell&apos;intrattenimento interattivo a Torino.</span>
                        </p>
                    </div>

                    <div className="mt-12 sm:mt-16 w-full sm:w-auto opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">
                        <PremiumButton
                            href="#prossimi-eventi"
                            variant="primary"
                            size="lg"
                            className="w-full sm:w-auto py-5 px-12 rounded-sm"
                            onClick={(e) => {
                                const target = document.getElementById('prossimi-eventi');
                                if (target) {
                                    e.preventDefault();
                                    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
                                }
                            }}
                        >
                            <span className="font-heading tracking-widest uppercase text-lg">Entra nel laboratorio →</span>
                        </PremiumButton>
                    </div>
                </div>

                {/* Bottom decorative corner */}
                <div className="absolute bottom-8 right-8 z-30 opacity-20 hidden md:block">
                    <div className="text-right font-heading text-[10px] tracking-[0.3em] uppercase space-y-1">
                        <div>LAT 45.0703 N / LONG 7.6869 E</div>
                        <div>SYSTEM STATUS: ONLINE</div>
                    </div>
                </div>
        </section>
    );
}
