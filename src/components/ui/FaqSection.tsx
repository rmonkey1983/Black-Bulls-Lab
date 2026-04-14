"use client";

import { useState, useRef } from "react";
import { ChevronDown, Sparkles, Plus, Minus } from "lucide-react";
import { useGSAP } from "@/hooks/useGSAP";
import { animateFade } from "@/lib/gsapAnimations";
import { gsap } from "gsap";
import { strategicFaqs } from "@/lib/faqs";
import { SectionHeading } from "./SectionHeading";

export default function FaqSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        animateFade("#faq-section-container", "up", 0.1);
        animateFade(".faq-item-animate", "up", 0.05);
    }, { scope: containerRef });

    const toggleFaq = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section 
            id="faq-section-container"
            ref={containerRef} 
            className="py-32 bg-zinc-950 border-t border-white/5 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                    <SectionHeading 
                        title="DOMANDE"
                        highlight="FREQUENTI."
                        subtitle="FAQ"
                        align="left"
                    />
                    <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-yellow-500/20 bg-yellow-500/5 backdrop-blur-sm self-start md:self-auto">
                        <Sparkles size={14} className="text-yellow-500" />
                        <span className="font-heading text-[10px] tracking-[0.3em] text-yellow-500 uppercase font-bold">
                            Tutto quello che devi sapere
                        </span>
                    </div>
                </div>

                <div className="max-w-4xl space-y-4">
                    {strategicFaqs.map((faq, index) => {
                        const isActive = activeIndex === index;
                        return (
                            <div 
                                key={index}
                                className="faq-item-animate group border border-white/5 rounded-2xl bg-zinc-900/30 backdrop-blur-sm hover:border-yellow-500/20 transition-all duration-500"
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                                    aria-label={isActive ? "Chiudi risposta" : "Apri risposta"}
                                >
                                    <h3 className={`font-heading text-lg md:text-2xl font-bold uppercase tracking-widest transition-colors duration-300 ${isActive ? 'text-yellow-500' : 'text-zinc-300 group-hover:text-white'}`}>
                                        {faq.question}
                                    </h3>
                                    <div className={`p-2 rounded-full border transition-all duration-500 ${isActive ? 'bg-yellow-500 border-yellow-500 text-black rotate-180' : 'bg-transparent border-white/10 text-zinc-500 group-hover:border-yellow-500/50 group-hover:text-yellow-500'}`}>
                                        <ChevronDown size={20} />
                                    </div>
                                </button>
                                
                                <FaqWrapper isOpen={isActive}>
                                    <div className="px-6 md:px-8 pb-8">
                                        <div className="pt-2 border-t border-white/5 mt-2 opacity-80">
                                            <p className="font-sans text-zinc-300 text-base md:text-lg leading-relaxed font-light">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </FaqWrapper>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function FaqWrapper({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) {
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!contentRef.current) return;
        
        if (isOpen) {
            gsap.fromTo(contentRef.current, 
                { height: 0, opacity: 0 },
                { height: "auto", opacity: 1, duration: 0.5, ease: "power3.inOut" }
            );
        } else {
            gsap.to(contentRef.current, { 
                height: 0, opacity: 0, duration: 0.4, ease: "power3.inOut" 
            });
        }
    }, { dependencies: [isOpen] });

    return (
        <div ref={contentRef} className="overflow-hidden h-0 opacity-0">
            {children}
        </div>
    );
}
