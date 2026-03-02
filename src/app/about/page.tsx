"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/PageHeader";
import { MoleculeDecoration } from "@/components/lab/MoleculeDecoration";
import { Beaker, Target, Users, Lightbulb, Atom, FlaskConical } from "lucide-react";

const timeline = [
    { year: "2026", title: "Fondazione", desc: "Il laboratorio prende vita nel cuore di Torino." },
    { year: "2026", title: "Primo Esperimento", desc: "Il Banchetto del Toro segna l'inizio di una nuova era." },
    { year: "2026", title: "Espansione", desc: "Nuovi protocolli e collaborazioni entrano in catalogo." },
];

const values = [
    { icon: Beaker, title: "Sperimentazione", desc: "Ogni evento è un esperimento unico, mai replicabile." },
    { icon: Target, title: "Precisione", desc: "Ogni dettaglio è calibrato per massimizzare l'esperienza." },
    { icon: Users, title: "Comunità", desc: "Un network di menti creative e anime libere." },
    { icon: Lightbulb, title: "Innovazione", desc: "Spingiamo i confini dell'intrattenimento convenzionale." },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-lab-dark pb-24 relative">
            {/* Molecule decoration */}
            <MoleculeDecoration className="absolute top-40 right-10 hidden md:block" color="cyan" size={300} />

            <PageHeader
                title="IL NOSTRO"
                highlight="LABORATORIO"
                subtitle="Dove la scienza dell'intrattenimento incontra l'arte dell'esperienza."
                code="LAB-001"
            />

            <div className="max-w-5xl mx-auto px-6 space-y-24 relative z-10">
                {/* Mission */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-green/20" />
                        <Atom size={16} className="text-green/40 animate-molecule-spin" />
                        <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-green/20" />
                    </div>
                    <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto">
                        Black Bulls Lab è il <span className="text-green text-glow-green font-medium">laboratorio underground</span> dove ogni evento è un esperimento.
                        Fondiamo musica, gastronomia, performance e arte in formule uniche che non troverete altrove.
                    </p>
                </motion.section>

                {/* Values Grid */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <FlaskConical size={14} className="text-green/40" />
                        <span className="data-readout text-[10px] text-green/40 tracking-[0.3em] uppercase">
                            Protocolli Fondamentali
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {values.map((v, i) => (
                            <motion.div
                                key={v.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group border border-green/10 bg-lab-card/50 p-6
                                    hover:border-green/25 hover:bg-lab-card/80
                                    hover:shadow-[0_0_20px_rgba(0,255,136,0.05)]
                                    transition-all duration-500 relative"
                            >
                                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-green/20" />
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 border border-green/20 flex items-center justify-center shrink-0
                                        group-hover:border-green/40 group-hover:bg-green/5 transition-all duration-300">
                                        <v.icon size={18} className="text-green/60" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1">{v.title}</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Timeline */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <FlaskConical size={14} className="text-cyan/40" />
                        <span className="data-readout text-[10px] text-cyan/40 tracking-[0.3em] uppercase">
                            Log Cronologico
                        </span>
                    </div>
                    <div className="relative border-l border-green/15 ml-4 space-y-8">
                        {timeline.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                className="relative pl-8"
                            >
                                {/* Timeline dot */}
                                <div className="absolute left-0 top-1 -translate-x-1/2 w-3 h-3 border border-green/40 bg-lab-dark rotate-45" />

                                <span className="data-readout text-[10px] text-cyan tracking-[0.2em]">{item.year}</span>
                                <h3 className="text-xl font-bold text-white mt-1">{item.title}</h3>
                                <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
