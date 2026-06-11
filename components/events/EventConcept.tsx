"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { animateFade } from "@/lib/gsapAnimations";

interface EventConceptProps {
    description: string;
}

export function EventConcept({ description = "" }: EventConceptProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Safeguard for empty description
    const paragraphs = description ? description.split('\n').filter(p => p.trim() !== '') : [];

    useGSAP(() => {
        animateFade("#concept-title", "left", 0.1);
        animateFade(".concept-paragraph", "up", 0.15);
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-20 md:py-32 px-4 md:px-6 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                <div className="md:col-span-4">
                    <h2
                        id="concept-title"
                        className="gsap-fade text-4xl md:text-5xl font-bold text-white tracking-tighter md:sticky md:top-32"
                    >
                        THE <br />
                        <span className="text-gold italic">CONCEPT</span>
                    </h2>
                </div>

                <div className="md:col-span-8 space-y-6 md:space-y-8">
                    {paragraphs.length > 0 ? paragraphs.map((paragraph, index) => (
                        <p
                            key={index}
                            className="concept-paragraph gsap-fade text-base md:text-lg text-gray-300 leading-relaxed font-light max-w-prose first-letter:text-4xl first-letter:md:text-5xl first-letter:font-bold first-letter:text-white first-letter:mr-3 first-letter:float-left"
                        >
                            {paragraph}
                        </p>
                    )) : (
                        <p className="concept-paragraph gsap-fade text-base md:text-lg text-gray-500 italic">
                            Dettagli dell&apos;esperimento in fase di caricamento...
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
