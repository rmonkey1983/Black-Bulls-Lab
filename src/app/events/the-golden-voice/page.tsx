"use client";

import { motion } from "framer-motion";
import { EventConcept } from "@/components/events/EventConcept";
import { ArrowLeft, Mic, Trophy, Star, Music2 } from "lucide-react";
import Link from "next/link";

export default function TheGoldenVoicePage() {
    return (
        <main className=" min-h-screen">
            {/* HERO SECTION */}
            <section className="relative h-[85vh] w-full overflow-hidden flex items-end">
                {/* Video Background */}
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-50 grayscale contrast-125"
                    >
                        <source src="/Untitled Project.mp4" type="video/mp4" />
                    </video>
                    {/* Golden Tint Overlay */}
                    <div className="absolute inset-0 bg-rama-accent/10 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/40 to-transparent" />
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" />
                </div>

                {/* Back Button */}
                <div className="absolute top-24 left-6 z-30">
                    <Link
                        href="/events"
                        className="flex items-center gap-2 text-rama-text/70 hover:text-rama-accent transition-colors uppercase text-xs font-bold tracking-widest backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full border border-white/10"
                    >
                        <ArrowLeft size={16} /> Torna agli Eventi
                    </Link>
                </div>

                {/* Content */}
                <div className="relative z-20 w-full max-w-7xl mx-auto p-6 md:p-12 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-3 text-rama-accent text-sm font-bold uppercase tracking-[0.2em]">
                            <span className="flex items-center gap-2 bg-rama-accent/20 backdrop-blur-sm px-3 py-1 rounded-full border border-rama-accent/30 text-rama-accent-light">
                                <Mic size={14} /> Singing Contest
                            </span>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-bold text-rama-text tracking-tighter leading-[0.9] drop-shadow-2xl">
                            THE GOLDEN <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-gold animate-gradient-x bg-[length:200%_auto]">VOICE</span>
                        </h1>

                        <p className="text-xl md:text-3xl text-gray-300 font-light max-w-2xl border-l-4 border-rama-accent pl-6">
                            La tua voce, la tua occasione. Il contest che premia il vero talento.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* DESCRIPTION SECTION */}
            <EventConcept
                description={`The Golden Voice non è il solito talent show. È una competizione seria, intensa e prestigiosa, pensata per chi crede nella pownza della propria voce.\n\nCerchiamo interpreti capaci di emozionare, cantautori originali e performer che sanno dominare il palco. Qui non si cerca solo la tecnica, ma l'anima.\n\nDavanti a una giuria di professionisti del settore discografico e dello spettacolo, avrai l'opportunità di farti notare e di trasformare la tua passione in una carriera.`}
            />

            {/* FORMAT SECTION */}
            <section className="py-24 bg-gradient-to-b from-black to-bg-dark relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold text-rama-text mb-4"
                        >
                            IL PERCORSO
                        </motion.h2>
                        <div className="w-24 h-1 bg-rama-accent mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Music2 size={32} />,
                                title: "Audizioni",
                                desc: "Il primo passo. Porta il tuo cavallo di battaglia e convinci la giuria a darti un posto nel contest."
                            },
                            {
                                icon: <Star size={32} />,
                                title: "Le Sfide",
                                desc: "Scontri diretti e performance a tema. Solo i migliori proseguono il cammino verso la vittoria."
                            },
                            {
                                icon: <Trophy size={32} />,
                                title: "La Finale",
                                desc: "Una serata di gala, un grande palco e un unico vincitore che si aggiudicherà il premio finale."
                            }
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors group text-center"
                            >
                                <div className="w-16 h-16 bg-rama-accent/10 rounded-full flex items-center justify-center text-rama-accent mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 border border-rama-accent/20">
                                    {step.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-rama-text mb-4">{step.title}</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {step.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-20 text-center">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-rama-accent text-rama-accent font-bold uppercase tracking-widest hover:bg-rama-accent hover:text-black transition-all duration-300"
                        >
                            Iscriviti al Casting <ArrowLeft className="rotate-180" size={18} />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
