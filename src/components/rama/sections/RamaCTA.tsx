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
            className="w-full py-24 sm:py-32 px-4 sm:px-6 md:px-12 bg-transparent relative flex flex-col items-center justify-center overflow-hidden border-t border-white/5"
        >
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(200,164,78,0.05)_0%,transparent_100%)] pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-rama-accent/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-rama-accent/5 rounded-full blur-[100px] pointer-events-none" />

            <div className={clsx(
                "relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center transition-all duration-1000 transform",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}>
                <span className="font-rock-salt text-rama-accent text-lg sm:text-2xl md:text-3xl mb-8 transform -rotate-1">
                    Il Momento è Ora
                </span>
                
                <h2 className="font-mohave font-bold leading-[0.9] tracking-tighter uppercase text-white text-[10vw] sm:text-[8vw] md:text-[6vw] mb-8">
                    Pronto a vivere <span className="text-gold block sm:inline">qualcosa di unico?</span>
                </h2>
                
                <p className="font-outfit text-rama-muted text-lg md:text-xl max-w-2xl mb-12">
                    Che tu voglia risolvere un mistero o mettere alla prova il tuo team, abbiamo il tavolo perfetto per te.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <PremiumButton href="/events" variant="gold" size="lg" className="w-full sm:w-auto">
                        <span className="font-mohave tracking-widest uppercase text-lg">Il tuo posto ti aspetta</span>
                        <ArrowRight size={20} className="ml-2" />
                    </PremiumButton>
                </div>
            </div>
        </section>
    );
}
