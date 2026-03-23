"use client";

import { motion } from "framer-motion";

interface EventConceptProps {
    description: string;
}

export function EventConcept({ description }: EventConceptProps) {
    return (
        <section className="py-24 px-6 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-4">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-white tracking-tighter sticky top-32"
                    >
                        THE <br />
                        <span className="text-gold italic">CONCEPT</span>
                    </motion.h2>
                </div>

                <div className="md:col-span-8 space-y-8">
                    {description.split('\n').map((paragraph, index) => (
                        <motion.p
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-lg md:text-xl text-gray-300 leading-relaxed font-light first-letter:text-5xl first-letter:font-bold first-letter:text-white first-letter:mr-3 first-letter:float-left"
                        >
                            {paragraph}
                        </motion.p>
                    ))}
                </div>
            </div>
        </section>
    );
}
