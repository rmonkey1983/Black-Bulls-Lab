"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { animateFade } from "@/lib/gsapAnimations";

interface EventConceptProps {
    description: string;
}

export function EventConcept({ description }: EventConceptProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        animateFade("#concept-title", "left", 0.1);
        animateFade(".concept-paragraph", "up", 0.15);
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-24 px-6 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-4">
                    <h2
                        id="concept-title"
                        className="gsap-fade text-4xl md:text-5xl font-bold text-white tracking-tighter sticky top-32"
                    >
                        THE <br />
                        <span className="text-gold italic">CONCEPT</span>
                    </h2>
                </div>

                <div className="md:col-span-8 space-y-8">
                    {description.split('\n').map((paragraph, index) => (
                        <p
                            key={index}
                            className="concept-paragraph gsap-fade text-lg md:text-xl text-gray-300 leading-relaxed font-light first-letter:text-5xl first-letter:font-bold first-letter:text-white first-letter:mr-3 first-letter:float-left"
                        >
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>
        </section>
    );
}
