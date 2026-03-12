"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { strategicFaqs } from "@/lib/faqs";

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}

function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
    return (
        <div className="border-b border-gold/10 last:border-0">
            <button
                onClick={onClick}
                className="w-full py-6 flex items-center justify-between text-left group"
            >
                <span className={`text-base md:text-lg font-medium transition-colors duration-300 ${isOpen ? "text-gold" : "text-white group-hover:text-gold/80"}`}>
                    {question}
                </span>
                <span className={`flex-shrink-0 ml-4 p-2 rounded-full border transition-all duration-300 ${isOpen ? "border-gold bg-gold/10 text-gold" : "border-white/10 text-white/50 group-hover:border-gold/30 group-hover:text-gold"}`}>
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-gray-400 leading-relaxed text-sm md:text-base pr-8">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = strategicFaqs;

    return (
        <section className="py-20 md:py-32 px-6 bg-bg-dark relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <span className="text-[10px] md:text-xs text-gold/60 tracking-[0.3em] uppercase block mb-3 font-semibold">
                        Supporto
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
                        Domande <span className="text-gold font-serif-display italic">Frequenti</span>
                    </h2>
                    <div className="w-12 h-[1px] bg-gold/30 mx-auto" />
                </div>

                <div className="divide-y divide-white/5 border-t border-b border-white/5 bg-white/[0.02] px-4 md:px-10 py-4 md:py-6 rounded-2xl backdrop-blur-sm">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
