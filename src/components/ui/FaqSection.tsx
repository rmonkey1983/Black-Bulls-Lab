"use client";

import { useState, useRef } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import { useGSAP } from "@/hooks/useGSAP";
import { animateFade } from "@/lib/gsapAnimations";
import { gsap } from "gsap";
import { strategicFaqs } from "@/lib/faqs";

export default function FaqSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Entrance animation for the entire section
        animateFade("#faq-section-container", "up", 0.1);
    }, { scope: containerRef });

    const toggleFaq = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section 
            id="faq-section" 
            ref={containerRef} 
            className="py-32 px-6 bg-zinc-950/50 border-t border-white/5 relative overflow-hidden"
        >
            {/* Background decorative element */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent" />
            
            <div id="faq-section-container" className="max-w-4xl mx-auto gsap-fade">
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-yellow-500/20 bg-yellow-500/5 mb-6">
                        <Sparkles size={12} className="text-yellow-500" />
                        <span className="text-[10px] tracking-[0.2em] font-bold uppercase text-yellow-500">FAQ</span>
                    </div>
                    <h2 className="font-heading text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter italic">
                        DOMANDE <span className="text-yellow-500">FREQUENTI.</span>
                    </h2>
                    <p className="mt-4 text-zinc-500 font-sans text-lg font-light">
                        Tutto quello che devi sapere sul Laboratorio delle Emozioni.
                    </p>
                </div>

                <div className="space-y-4">
                    {strategicFaqs.map((faq, index) => {
                        const isActive = activeIndex === index;
                        return (
                            <div 
                                key={index} 
                                className={`border transition-all duration-300 rounded-2xl overflow-hidden ${
                                    isActive 
                                    ? 'border-yellow-500/30 bg-white/5 shadow-[0_0_30px_rgba(234,179,8,0.05)]' 
                                    : 'border-white/5 bg-zinc-900/50 hover:border-white/10'
                                }`}
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full py-6 px-8 flex items-center justify-between text-left group"
                                    aria-expanded={isActive}
                                >
                                    <span className={`text-lg md:text-xl font-heading font-bold uppercase tracking-tight transition-colors duration-300 ${
                                        isActive ? 'text-yellow-500' : 'text-white/80 group-hover:text-white'
                                    }`}>
                                        {faq.question}
                                    </span>
                                    <div className={`transition-transform duration-500 ${
                                        isActive ? 'rotate-180 text-yellow-500' : 'text-zinc-600 group-hover:text-white'
                                    }`}>
                                        <ChevronDown size={24} />
                                    </div>
                                </button>
                                
                                <FaqContent isOpen={isActive}>
                                    <div className="px-8 pb-8 text-zinc-400 text-lg leading-relaxed font-sans font-light">
                                        <div className="pt-2 border-t border-white/5 mt-2 overflow-hidden">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </FaqContent>
                            </div>
                        );
                    })}
                </div>
                
                <div className="mt-20 text-center">
                    <p className="text-zinc-500 text-sm uppercase tracking-widest font-medium">
                        Hai altre domande? <a href="/contatti" className="text-yellow-500 hover:text-yellow-400 underline underline-offset-4 transition-colors">Contattaci</a>
                    </p>
                </div>
            </div>
        </section>
    );
}

function FaqContent({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) {
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!contentRef.current) return;
        
        if (isOpen) {
            gsap.fromTo(contentRef.current, 
                { height: 0, opacity: 0 },
                { 
                    height: "auto", 
                    opacity: 1, 
                    duration: 0.5, 
                    ease: "power3.out"
                }
            );
        } else {
            gsap.to(contentRef.current, { 
                height: 0, 
                opacity: 0, 
                duration: 0.3, 
                ease: "power3.in" 
            });
        }
    }, { dependencies: [isOpen] });

    return (
        <div ref={contentRef} className="overflow-hidden h-0 opacity-0">
            {children}
        </div>
    );
}
