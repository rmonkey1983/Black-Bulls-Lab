"use client";

import React from "react";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { ArrowRight } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import clsx from "clsx";

export function RamaCTA() {
    const { ref, inView } = useIntersectionObserver({ threshold: 0.3 });

    return (
        <section 
            ref={ref as any}
            className="w-full py-24 sm:py-32 px-4 sm:px-6 md:px-12 bg-black relative flex flex-col items-center justify-center overflow-hidden border-t border-white/5"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[url('/noise.webp')] opacity-10 mix-blend-overlay" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%] opacity-20" />
            </div>

            {/* Tech Decoration */}
            <div className="absolute top-12 left-12 opacity-5 hidden md:block">
                <div className="font-heading text-[10px] tracking-[0.4em] uppercase">
                    SYSTEM AUTHORIZATION / GRANTED
                </div>
            </div>

            <div className={clsx(
                "relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center transition-all duration-1000 transform",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}>
                <span className="font-rock-salt text-rama-accent text-lg sm:text-2xl md:text-3xl mb-8 transform -rotate-2 drop-shadow-[0_0_10px_rgba(200,164,78,0.3)]">
                    Il Momento è Ora
                </span>
                
                <h2 className="font-heading font-bold leading-[0.85] tracking-tighter uppercase text-white text-[10vw] sm:text-[8vw] md:text-[6vw] mb-8">
                    PRONTO A VIVERE <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-rama-accent via-white to-rama-accent">QUALCOSA DI UNICO?</span>
                </h2>
                
                <p className="font-sans text-gray-500 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
                    Accedi al nostro laboratorio esperienziale. Che tu voglia risolvere un mistero o mettere alla prova il tuo team, abbiamo il posto perfetto per te.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <PremiumButton href="/events" variant="primary" size="lg" className="w-full sm:w-auto px-12 py-5 rounded-sm">
                        <span className="font-heading tracking-[0.2em] uppercase text-lg">Entra nel Laboratorio</span>
                    </PremiumButton>
                </div>
            </div>
        </section>
    );
}

