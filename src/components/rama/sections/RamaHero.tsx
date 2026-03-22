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
                        text="Dimentica la solita serata."
                        className="font-rock-salt text-rama-accent text-base sm:text-xl md:text-3xl lg:text-4xl mb-4 sm:mb-6 transform -rotate-3"
                    />

                    {/* SEO Optimized H1 - Visually hidden but readable by screen readers and crawlers */}
                    <h1 className="sr-only">Black Bulls Lab | La tua Cena con Spettacolo a Torino</h1>

                    <div className="font-mohave font-bold leading-[0.85] tracking-tighter uppercase text-white flex flex-col text-[14vw] sm:text-[13vw] md:text-[12vw] lg:text-[10vw]">
                        <RamaAnimatedText text="BENVENUTO AL" delay={0.1} className="text-[10vw] sm:text-[9vw] md:text-[8.5vw] lg:text-[7.5vw] text-rama-accent" />
                        <RamaAnimatedText text="BLACK BULLS" delay={0.2} />
                        <RamaAnimatedText text="LAB." delay={0.3} />
                    </div>

                    <div className="mt-6 sm:mt-10 md:mt-16 text-rama-muted font-outfit text-base sm:text-lg md:text-xl lg:text-2xl max-w-xl">
                        <RamaAnimatedText
                            text="Non stai venendo solo a cena. Stai vivendo un'esperienza. Alta gastronomia, stand-up comedy e performance artistiche si fondono nel nuovo laboratorio creativo di Torino."
                            delay={0.4}
                        />
                    </div>

                    <div className="mt-8 sm:mt-10 opacity-0 animate-[fadeIn_1s_ease-out_0.8s_forwards]">
                        <PremiumButton href="/events" variant="gold" size="lg">
                            <span className="font-mohave tracking-widest uppercase text-base sm:text-lg">Scopri gli Eventi e Prenota</span>
                            <ArrowRight size={20} className="ml-2" />
                        </PremiumButton>
                    </div>
                </div>

                {/* Right Content - Abstract Image / 3D Element (hidden on mobile) */}
                <div className="hidden lg:flex relative h-full min-h-[50vh] items-center justify-center opacity-80 z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] max-w-[800px] pointer-events-none">
                        <div className="w-full h-full bg-gradient-to-tr from-rama-bg via-zinc-900 to-zinc-800 rounded-full blur-3xl opacity-50 absolute"></div>
                    </div>
                </div>

            </div>
        </section>
    );
}
