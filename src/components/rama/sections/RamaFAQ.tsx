"use client";

import { useState, useRef } from "react";
import { Plus, Minus } from "lucide-react";
import { useGSAP } from "@/hooks/useGSAP";
import { animateFade } from "@/lib/gsapAnimations";
import { gsap } from "gsap";
import { CONTACT_EMAIL } from "@/lib/constants";

const faqs = [
    {
        question: "Qual è il dress code per le serate?",
        answer: "Richiediamo un abbigliamento elegante e curato (Smart Casual / Elegant). Ci riserviamo il diritto di selezione all'ingresso per mantenere l'atmosfera esclusiva del nostro club.",
    },
    {
        question: "Come funzionano le prenotazioni per la cena spettacolo?",
        answer: "La prenotazione è fortemente consigliata ed è garantita solo a seguito della nostra conferma. Offriamo sia menu degustazione fissi che soluzioni à-la-carte, a seconda del format della serata.",
    },
    {
        question: "C'è un limite di età per entrare?",
        answer: "L'ingresso è consentito esclusivamente a un pubblico maggiorenne (+18). Per alcune serate speciali in formato Club, l'ingresso potrebbe essere riservato a un pubblico +21.",
    },
    {
        question: "Gestite intolleranze o allergie alimentari?",
        answer: "Assolutamente sì. Vi chiediamo di comunicare eventuali allergie, intolleranze o scelte dietetiche (vegan/vegetariane) al momento della prenotazione, per permettere al nostro Executive Chef di prepararvi una variante ad hoc.",
    },
    {
        question: "Posso organizzare un evento privato o aziendale?",
        answer: `Certamente. Black Bulls Lab dispone di un'Area Corporate per eventi aziendali, team building, lanci prodotto e cene esclusive. Contattaci tramite l'apposita sezione Corporate o scrivici direttamente a ${CONTACT_EMAIL}.`,
    },
];

export function RamaFAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        animateFade("#faq-header", "up", 0.1);
        animateFade(".faq-item-gsap", "up", 0.08);
    }, { scope: containerRef });

    const toggleFaq = (index: number) => {
        const isCurrentlyActive = activeIndex === index;
        setActiveIndex(isCurrentlyActive ? null : index);
    };

    return (
        <section ref={containerRef} className="w-full bg-transparent py-20 sm:py-32 px-4 sm:px-6 md:px-12 flex flex-col items-center">

            <div id="faq-header" className="text-center mb-12 sm:mb-16 md:mb-24">
                <span className="font-rock-salt text-rama-accent text-base sm:text-xl md:text-3xl mb-6 sm:mb-8 transform -rotate-2 block">
                    DOMANDE FREQUENTI
                </span>
                <div className="font-heading font-bold leading-[0.85] tracking-tighter uppercase text-white flex flex-col text-[15vw] sm:text-[14vw] md:text-[10vw] w-full overflow-hidden">
                    <span className="gsap-fade block">TUTTO QUELLO</span>
                    <span className="gsap-fade block">CHE DEVI SAPERE</span>
                </div>
            </div>

            <div id="faq-container" className="w-full max-w-4xl mx-auto flex flex-col">
                {faqs.map((faq, index) => {
                    const isActive = activeIndex === index;

                    return (
                        <div
                            key={index}
                            className="faq-item-gsap gsap-fade border-b border-white/10 group cursor-pointer"
                            onClick={() => toggleFaq(index)}
                        >
                            <div className="py-4 sm:py-6 md:py-8 flex items-center justify-between gap-3 sm:gap-6 transition-colors duration-300 group-hover:bg-white/5 px-3 sm:px-4 rounded-lg">
                                <h3 className={`font-heading text-xl sm:text-2xl md:text-4xl font-bold uppercase tracking-wide transition-colors duration-300 select-none ${isActive ? 'text-rama-accent' : 'text-white'}`}>
                                    {faq.question}
                                </h3>
                                <div className="text-white/50 group-hover:text-rama-accent flex-shrink-0 transition-colors duration-300">
                                    {isActive ? <Minus size={24} /> : <Plus size={24} />}
                                </div>
                            </div>

                            <FaqContent isOpen={isActive}>
                                <div className="pb-8 px-4 text-rama-muted font-sans text-lg md:text-xl leading-relaxed">
                                    {faq.answer}
                                </div>
                            </FaqContent>
                        </div>
                    );
                })}
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
                { height: "auto", opacity: 1, duration: 0.4, ease: "power2.inOut" }
            );
        } else {
            gsap.to(contentRef.current, { 
                height: 0, opacity: 0, duration: 0.3, ease: "power2.inOut" 
            });
        }
    }, { dependencies: [isOpen] });

    return (
        <div ref={contentRef} className="overflow-hidden h-0 opacity-0">
            {children}
        </div>
    );
}
