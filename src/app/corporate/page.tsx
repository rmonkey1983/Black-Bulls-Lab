"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/PageHeader";
import { GlowButton } from "@/components/lab/GlowButton";
import { MoleculeDecoration } from "@/components/lab/MoleculeDecoration";
import { Building2, Users, Sparkles, BarChart3, ArrowRight } from "lucide-react";

const services = [
    {
        icon: Building2,
        title: "Team Building Sperimentale",
        desc: "Protocolli di coesione aziendale basati su esperienze immersive e interattive.",
        code: "TB-001",
    },
    {
        icon: Sparkles,
        title: "Eventi Corporate Esclusivi",
        desc: "Cene, spettacoli e format su misura per il tuo brand.",
        code: "EC-002",
    },
    {
        icon: Users,
        title: "Networking Molecolare",
        desc: "Crea connessioni autentiche in ambienti unici e stimolanti.",
        code: "NW-003",
    },
    {
        icon: BarChart3,
        title: "Brand Experience",
        desc: "Trasforma il tuo messaggio in un'esperienza multisensoriale.",
        code: "BX-004",
    },
];

const stats = [
    { value: "50+", label: "Esperimenti Completati" },
    { value: "2000+", label: "Soggetti Coinvolti" },
    { value: "98%", label: "Tasso di Soddisfazione" },
    { value: "15+", label: "Partner Corporate" },
];

export default function CorporatePage() {
    return (
        <div className="min-h-screen bg-lab-dark pb-24 relative">
            <MoleculeDecoration className="absolute top-60 left-5 hidden md:block" color="amber" size={250} />

            <PageHeader
                title="RICERCA &"
                highlight="COLLABORAZIONE"
                subtitle="Il laboratorio è aperto alle partnership. Portiamo la scienza dell'esperienza nel tuo business."
                code="CRP-RND"
            />

            <div className="max-w-6xl mx-auto px-6 space-y-20 relative z-10">
                {/* Stats Readout */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                    {stats.map((stat, i) => (
                        <div
                            key={stat.label}
                            className="border border-green/10 bg-lab-card/30 p-5 text-center
                                hover:border-green/25 transition-all duration-300"
                        >
                            <div className="text-3xl md:text-4xl font-bold text-green text-glow-green mb-1">
                                {stat.value}
                            </div>
                            <span className="data-readout text-[10px] text-gray-500 tracking-[0.15em] uppercase">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </motion.div>

                {/* Services */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-1.5 h-6 bg-amber/50" />
                        <span className="data-readout text-[10px] text-amber/60 tracking-[0.3em] uppercase">
                            Moduli Disponibili
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {services.map((service, i) => (
                            <motion.div
                                key={service.code}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group border border-green/10 bg-lab-card/40 p-6 relative
                                    hover:border-cyan/25 hover:shadow-[0_0_25px_rgba(0,212,255,0.05)]
                                    transition-all duration-500"
                            >
                                <div className="absolute top-3 right-3">
                                    <span className="data-readout text-[9px] text-gray-muted/40 tracking-wider">{service.code}</span>
                                </div>

                                <div className="w-10 h-10 border border-cyan/20 flex items-center justify-center mb-4
                                    group-hover:border-cyan/40 group-hover:bg-cyan/5 transition-all duration-300">
                                    <service.icon size={18} className="text-cyan/60" />
                                </div>

                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center border border-green/10 bg-lab-card/30 p-12 relative"
                >
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan/30" />
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan/30" />

                    <h3 className="text-3xl font-bold text-white mb-4">
                        Inizia la tua <span className="text-cyan text-glow-cyan">Ricerca</span>
                    </h3>
                    <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                        Contattaci per progettare insieme il tuo prossimo esperimento corporate.
                    </p>
                    <GlowButton href="/contact" variant="cyan" size="lg">
                        <ArrowRight size={16} /> Contatta il Laboratorio
                    </GlowButton>
                </motion.div>
            </div>
        </div>
    );
}
