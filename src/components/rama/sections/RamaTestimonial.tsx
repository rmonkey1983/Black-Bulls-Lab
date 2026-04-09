"use client";

import React, { useRef } from "react";
import { Quote, ArrowRight } from "lucide-react";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { useGSAP } from "@/hooks/useGSAP";
import { animateFade } from "@/lib/gsapAnimations";

export function RamaTestimonial() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        animateFade("#testimonial-quote-content", "up", 0.1);
        animateFade("#testimonial-cta-box", "up", 0.2);
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative w-full py-20 sm:py-32 px-4 sm:px-6 md:px-12 bg-transparent flex flex-col items-center justify-center overflow-hidden">
            {/* Subtle Grid Background */}
            <div className="absolute inset-x-0 bottom-0 h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

            <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
                <Quote size={64} className="text-rama-accent/40 mb-12 transform -scale-x-100" />

                <div
                    id="testimonial-quote-content"
                    className="gsap-fade text-center opacity-0"
                >
                    <p className="font-mohave text-2xl md:text-4xl lg:text-5xl font-medium tracking-wide uppercase leading-[1.1] mb-8 text-white">
                        &quot;Cercavo un posto per spezzare la routine del venerdì sera dopo il lavoro. Al <span className="text-rama-accent">Black Bulls Lab</span> ho trovato piatti eccezionali, risate vere e un&apos;energia pazzesca. Sicuramente uno dei locali più originali della città.&quot;
                    </p>

                    <div className="flex flex-col items-center justify-center gap-2 mt-12 mb-24">
                        <div className="h-[1px] w-12 bg-rama-accent/50 mb-4" />
                        <span className="font-outfit text-white font-semibold text-lg uppercase tracking-widest">
                            Marco S.
                        </span>
                        <span className="font-outfit text-rama-muted font-light text-sm tracking-wide">
                            34 anni, Architetto
                        </span>
                    </div>
                </div>

                {/* Final Call To Action */}
                <div
                    id="testimonial-cta-box"
                    className="gsap-fade w-full flex flex-col items-center bg-zinc-900/50 border border-rama-accent/10 p-6 sm:p-10 md:p-16 rounded-xl relative opacity-0"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-rama-accent/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-rama-accent/5 rounded-full blur-3xl" />

                    <h3 className="font-rock-salt text-rama-accent text-lg md:text-2xl lg:text-3xl mb-6 transform -rotate-1 relative z-10 text-center">
                        Il tuo tavolo ti aspetta. Lo spettacolo sta per iniziare.
                    </h3>
                    <p className="text-rama-muted font-outfit text-center max-w-2xl mb-10 text-base md:text-lg relative z-10">
                        I nostri eventi sono a numero chiuso per garantire un&apos;esperienza intima e curata nei minimi dettagli. I posti si esauriscono in fretta.
                    </p>
                    <div className="relative z-10">
                        <PremiumButton href="/events" variant="gold" size="lg">
                            <span className="font-mohave tracking-widest uppercase text-lg">Scegli la tua Esperienza</span>
                            <ArrowRight size={20} className="ml-2" />
                        </PremiumButton>
                    </div>
                </div>
            </div>
        </section>
    );
}
