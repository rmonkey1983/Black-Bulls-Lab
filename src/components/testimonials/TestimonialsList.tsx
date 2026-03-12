"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";

interface Testimonial {
    id: number;
    name: string;
    role: string;
    content: string;
    image?: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Marco Rossi",
        role: "Event Manager",
        content: "Un'esperienza incredibile. Il cibo, lo spettacolo, l'atmosfera... tutto curato nei minimi dettagli. Black Bulls Lab ha portato qualcosa di unico a Torino.",
        image: "/images/brand/bg-venue-crowd.png"
    },
    {
        id: 2,
        name: "Giulia Bianchi",
        role: "Art Director",
        content: "La fusione tra arte performativa e gastronomia è perfetta. Non è solo una cena, è un viaggio sensoriale completo. Consigliatissimo.",
        image: "/images/brand/service-plating.png"
    },
    {
        id: 3,
        name: "Luca Verdi",
        role: "Musicista",
        content: "Suonare al Black Bulls Lab è stato magico. Il pubblico è attento e l'acustica è ottima. Un luogo dove l'arte viene davvero valorizzata.",
        image: "/images/brand/service-performance.png"
    },
    {
        id: 4,
        name: "Elena Neri",
        role: "Food Blogger",
        content: "Ho provato molti dinner show, ma questo ha una marcia in più. L'attenzione alla qualità delle materie prime è evidente, così come la bravura degli artisti.",
        image: "/images/brand/service-mixology.png"
    }
];

export function TestimonialsList() {
    return (
        <section className="py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {testimonials.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/5 border border-white/10 p-8 rounded-2xl relative group hover:bg-white/10 transition-colors duration-300"
                    >
                        <Quote className="absolute top-8 right-8 text-gold/20 w-12 h-12 group-hover:text-gold/40 transition-colors" />

                        <p className="text-gray-300 text-lg mb-8 italic relative z-10 leading-relaxed">
                            "{item.content}"
                        </p>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden border border-gold/30">
                                {item.image ? (
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={48}
                                        height={48}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gold/20 flex items-center justify-center text-gold font-bold">
                                        {item.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <div>
                                <h4 className="text-white font-bold">{item.name}</h4>
                                <span className="text-gold text-xs uppercase tracking-wider">{item.role}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
