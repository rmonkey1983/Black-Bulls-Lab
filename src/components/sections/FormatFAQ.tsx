"use client";

import { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useGSAP } from "@/hooks/useGSAP";
import { animateFade } from "@/lib/gsapAnimations";
import { gsap } from "gsap";

const faqs = [
  {
    question: "Serve una location enorme per i vostri format?",
    answer: "Assolutamente no. Il nostro punto di forza sono gli eventi per gruppi di 20-30 persone. Abbiamo ingegnerizzato i nostri format per essere scalabili e adattabili a spazi intimi: ristoranti partner a Torino, loft privati o persino le sale meeting della tua azienda. Se non hai uno spazio, te ne proponiamo uno noi."
  },
  {
    question: "Chi si occupa dell'allestimento tecnico (audio, luci, palco)?",
    answer: "Facciamo tutto noi. Il Black Bulls Lab fornisce soluzioni 'chiavi in mano'. Portiamo la strumentazione necessaria per trasformare la location senza creare cantieri infiniti. Tu devi solo goderti la serata, l'organizzazione logistica è il nostro lavoro."
  },
  {
    question: "Il pubblico è obbligato a partecipare o viene messo in imbarazzo?",
    answer: "Mai. L'interazione è il cuore dei nostri spettacoli, ma i nostri artisti (come Manuel e Maurizio) sanno leggere la sala. Coinvolgiamo il pubblico in modo intelligente e naturale, creando un'atmosfera di complicità, mai di disagio. Chi vuole solo guardare e ridere, può farlo tranquillamente."
  },
  {
    question: "I costi sono proibitivi per una piccola azienda o un gruppo di amici?",
    answer: "No, perché puntiamo sull'ottimizzazione, non sul lusso inutile. Essendo format replicabili e ben collaudati, abbattiamo i costi di progettazione mantenendo un'esperienza premium. Offriamo un prezzo medio accessibile che garantisce la massima qualità artistica senza brutte sorprese sul preventivo finale."
  },
  {
    question: "I format sono personalizzabili per cene aziendali o team building?",
    answer: "Sì. La struttura (il 'Laboratorio') è solida, ma il contenuto viene cucito su misura. Possiamo inserire riferimenti alla tua azienda nello spettacolo di stand-up o adattare i tempi dello show alle esigenze del catering. È la soluzione ideale per team building originali e coinvolgenti."
  }
];

export function FormatFAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Anima il titolo
        animateFade("#faq-title-container", "up", 0.1);
        // Anima le singole card FAQ
        animateFade("#faq-list", "up", 0.1);
    }, { scope: containerRef });

    const toggleFaq = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section ref={containerRef} className="py-24 px-6 bg-transparent relative overflow-hidden">
            <div className="max-w-4xl mx-auto">
                <div id="faq-title-container" className="text-center mb-16 gsap-fade">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 uppercase tracking-tighter">
                        Domande <span className="text-rama-accent italic">Frequenti</span>
                    </h2>
                    <div className="w-24 h-1 bg-rama-accent mx-auto" />
                </div>

                <div id="faq-list" className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isActive = activeIndex === index;
                        return (
                            <div 
                                key={index} 
                                className="faq-item-gsap gsap-fade border border-white/10 bg-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:border-rama-accent/30"
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full py-6 px-8 flex items-center justify-between text-left group"
                                    aria-expanded={isActive}
                                >
                                    <span className={`text-lg md:text-xl font-bold uppercase tracking-tight transition-colors duration-300 ${isActive ? 'text-rama-accent' : 'text-white'}`}>
                                        {faq.question}
                                    </span>
                                    <div className={`transition-transform duration-500 ${isActive ? 'rotate-180 text-rama-accent' : 'text-white/40 group-hover:text-white'}`}>
                                        <ChevronDown size={24} />
                                    </div>
                                </button>
                                
                                <FaqContent isOpen={isActive}>
                                    <div className="px-8 pb-8 text-gray-400 text-lg leading-relaxed border-t border-white/5 pt-4">
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
                    clearProps: "opacity" // Permette al contenuto di essere visibile se ridimensionato
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
