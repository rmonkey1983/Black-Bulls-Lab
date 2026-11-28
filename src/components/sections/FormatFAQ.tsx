"use client";

import { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useGSAP } from "@/hooks/useGSAP";
import { animateFade } from "@/lib/gsapAnimations";
import { gsap } from "gsap";
import { buildFAQSchema } from "@/lib/schemas";

interface FaqItem {
  question: string;
  answer: string;
}

interface FormatFAQProps {
  items: FaqItem[];
}

export function FormatFAQ({ items }: FormatFAQProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const displayFaqs = items;

    useGSAP(() => {
        // Anima il titolo
        animateFade("#faq-title-container", "up", 0.1);
        // Anima le singole card FAQ
        animateFade("#faq-list", "up", 0.1);
    }, { scope: containerRef });

    const toggleFaq = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqSchema = buildFAQSchema(displayFaqs.map((faq) => ({ q: faq.question, a: faq.answer })));

    return (
        <section ref={containerRef} className="py-24 px-6 bg-transparent relative overflow-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: faqSchema }}
            />
            <div className="max-w-4xl mx-auto">
                <div id="faq-title-container" className="text-center mb-16">
                    <h2 className="font-serif normal-case tracking-[-0.02em] text-4xl md:text-5xl leading-[1.05] text-text-primary mb-4">
                        Domande <span className="text-accent-gold italic">frequenti</span>
                    </h2>
                    <div className="w-24 h-px bg-accent-gold mx-auto" />
                </div>

                <div id="faq-list" className="space-y-4">
                    {displayFaqs.map((faq, index) => {
                        const isActive = activeIndex === index;
                        return (
                            <div 
                                key={index} 
                                className="faq-item-gsap gsap-fade border-b border-white/10 overflow-hidden transition duration-300"
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full py-5 md:py-6 flex items-center justify-between gap-6 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
                                    aria-expanded={isActive}
                                >
                                    <span className={`font-serif text-xl md:text-2xl leading-snug transition-colors duration-300 ${isActive ? 'text-accent-gold' : 'text-text-primary'}`}>
                                        {faq.question}
                                    </span>
                                    <div className={`transition-transform duration-500 ${isActive ? 'rotate-180 text-accent-gold' : 'text-text-secondary group-hover:text-text-primary'}`}>
                                        <ChevronDown size={24} />
                                    </div>
                                </button>
                                
                                <FaqContent isOpen={isActive}>
                                    <div className="pb-6 pt-1 md:pb-8 text-text-secondary text-base md:text-lg leading-relaxed max-w-3xl">
                                        {faq.answer}
                                    </div>
                                </FaqContent>
                            </div>
                        );
                    })}
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
                    ease: "power3.out",
                    clearProps: "height,opacity" // Permette al contenuto di essere visibile se ridimensionato
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
        <div 
            ref={contentRef} 
            className={`overflow-hidden ${isOpen ? "h-auto opacity-100" : "h-0 opacity-0"}`}
        >
            {children}
        </div>
    );
}
