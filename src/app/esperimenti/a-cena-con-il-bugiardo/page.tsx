"use client";

import { motion } from "framer-motion";
import { EventConcept } from "@/components/events/EventConcept";
import { ArrowLeft, Eye, Smile, MessageCircleQuestion } from "lucide-react";
import Link from "next/link";

export default function ACenaConIlBugiardoPage() {
    return (
        <main className="min-h-screen">
            {/* HERO SECTION */}
            <section className="relative h-[85vh] w-full overflow-hidden flex items-end">
                {/* Video Background */}
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-40 contrast-125"
                    >
                        <source src="/Untitled Project.mp4" type="video/mp4" />
                    </video>
                    {/* Warm amber-red tint overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-transparent to-amber-900/20 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/50 to-transparent" />
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" />
                </div>

                {/* Back Button */}
                <div className="absolute top-24 left-6 z-30">
                    <Link
                        href="/esperimenti"
                        className="flex items-center gap-2 text-rama-text/70 hover:text-rama-accent transition-colors uppercase text-xs font-bold tracking-widest backdrop-blur-sm bg-transparent/20 px-4 py-2 rounded-full border border-white/10"
                    >
                        <ArrowLeft size={16} /> Torna agli Esperimenti
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
                            <span className="flex items-center gap-2 bg-rama-accent/10 backdrop-blur-sm px-3 py-1 rounded-full border border-rama-accent/20">
                                <Smile size={14} /> Dinner Show & Social Deception
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-8xl font-bold text-rama-text tracking-tighter leading-[0.9] drop-shadow-2xl">
                            A CENA CON<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rama-accent via-white to-rama-accent">
                                IL BUGIARDO
                            </span>
                        </h1>

                        <p className="text-xl md:text-3xl text-gray-300 font-light max-w-2xl border-l-4 border-rama-accent pl-6">
                            Chi riesce a ingannare tutti vince. Ma attenzione — anche la verità ha il suo prezzo.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* DESCRIPTION SECTION */}
            <EventConcept
                description={`Un format unico nel suo genere. A Cena Con Il Bugiardo è una serata di alta cucina mescolata con il gioco sociale più antico del mondo: l'arte dell'inganno.\n\nAl tuo tavolo siedono sconosciuti, ma uno di loro ha un segreto. Potrebbe essere un personaggio di finzione, un impostore con una storia falsa, oppure qualcuno che si fa passare per quello che non è. Il tuo compito? Smascherarlo prima del dessert.\n\nTra portate gourmet preparate dall'Executive Chef, indizi nascosti nel menu e performance live degli attori infiltrati, ogni boccone potrebbe rivelarti la verità — o portarti ancora più lontano da essa. Un'esperienza di teatro immersivo e gioco di ruolo, per chi ama mettere alla prova la propria intuizione.`}
            />

            {/* FORMAT SECTION */}
            <section className="py-24 bg-transparent/40 relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-rama-accent/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-bordeaux/10 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold text-rama-text mb-4"
                        >
                            COME <span className="text-rama-accent italic">FUNZIONA</span>
                        </motion.h2>
                        <div className="w-24 h-1 bg-rama-accent mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <MessageCircleQuestion size={32} />,
                                title: "L'Inizio",
                                desc: "Arrivate, vi siedete, ordinate. Qualcuno al tavolo però non è chi dice di essere. Le portate iniziano ad arrivare, insieme ai primi indizi."
                            },
                            {
                                icon: <Eye size={32} />,
                                title: "L'Indagine",
                                desc: "Durante la cena potete fare domande, studiare le reazioni, confrontarvi con i commensali. Ogni risposta è preziosa — o forse no."
                            },
                            {
                                icon: <Smile size={32} />,
                                title: "La Rivelazione",
                                desc: "Prima del dessert la verità viene a galla. Chi ha smascherato il Bugiardo vince un premio speciale. Chi è stato ingannato... ci riderà su."
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
                            href="/events"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-rama-accent text-rama-accent font-bold uppercase tracking-widest hover:bg-rama-accent hover:text-black transition-all duration-300"
                        >
                            Prenota il tuo Posto <ArrowLeft className="rotate-180" size={18} />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
