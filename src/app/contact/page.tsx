"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/PageHeader";
import { GlowButton } from "@/components/lab/GlowButton";
import { Send, Terminal, Radio } from "lucide-react";

export default function ContactPage() {
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSent(true);
    };

    return (
        <div className="min-h-screen bg-lab-dark pb-24">
            <PageHeader
                title="TERMINALE DI"
                highlight="COMUNICAZIONE"
                subtitle="Stabilisci una connessione diretta con il laboratorio."
                code="TRM-COM"
            />

            <div className="max-w-3xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-green/15 bg-lab-card/50 relative"
                >
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-green/30" />
                    <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-green/30" />
                    <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-green/30" />
                    <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-green/30" />

                    {/* Header bar */}
                    <div className="flex items-center justify-between px-6 py-3 border-b border-green/10 bg-green/[0.02]">
                        <div className="flex items-center gap-2">
                            <Terminal size={12} className="text-green/50" />
                            <span className="data-readout text-[10px] text-green/50 tracking-[0.3em] uppercase">
                                Input Terminal
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Radio size={10} className="text-green/40" />
                            <span className="data-readout text-[9px] text-green/30 tracking-wider">CONNESSO</span>
                        </div>
                    </div>

                    {sent ? (
                        <div className="p-12 text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-16 h-16 border border-green/30 mx-auto flex items-center justify-center mb-6"
                            >
                                <Send size={24} className="text-green" />
                            </motion.div>
                            <h3 className="text-2xl font-bold text-green text-glow-green mb-2">Trasmissione Completata</h3>
                            <p className="text-gray-400 data-readout text-sm">
                                Il tuo messaggio è stato ricevuto dal laboratorio.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            {/* Name */}
                            <div>
                                <label className="data-readout text-[10px] text-green/40 tracking-[0.3em] uppercase block mb-2">
                                    Identificativo Soggetto
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Inserisci il tuo nome..."
                                    className="w-full bg-lab-dark/80 border border-green/15 px-4 py-3 text-white text-sm data-readout
                                        placeholder:text-gray-600
                                        focus:outline-none focus:border-green/40 focus:shadow-[0_0_15px_rgba(0,255,136,0.05)]
                                        transition-all duration-300"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="data-readout text-[10px] text-green/40 tracking-[0.3em] uppercase block mb-2">
                                    Canale di Risposta
                                </label>
                                <input
                                    type="email"
                                    required
                                    placeholder="la-tua@email.com"
                                    className="w-full bg-lab-dark/80 border border-green/15 px-4 py-3 text-white text-sm data-readout
                                        placeholder:text-gray-600
                                        focus:outline-none focus:border-green/40 focus:shadow-[0_0_15px_rgba(0,255,136,0.05)]
                                        transition-all duration-300"
                                />
                            </div>

                            {/* Subject */}
                            <div>
                                <label className="data-readout text-[10px] text-green/40 tracking-[0.3em] uppercase block mb-2">
                                    Protocollo
                                </label>
                                <select
                                    className="w-full bg-lab-dark/80 border border-green/15 px-4 py-3 text-white text-sm data-readout
                                        focus:outline-none focus:border-green/40 focus:shadow-[0_0_15px_rgba(0,255,136,0.05)]
                                        transition-all duration-300"
                                >
                                    <option value="">Seleziona tipo di comunicazione...</option>
                                    <option value="event">Informazioni Esperimento</option>
                                    <option value="booking">Prenotazione</option>
                                    <option value="corporate">Collaborazione Corporate</option>
                                    <option value="talent">Candidatura Ricercatore</option>
                                    <option value="other">Altro</option>
                                </select>
                            </div>

                            {/* Message */}
                            <div>
                                <label className="data-readout text-[10px] text-green/40 tracking-[0.3em] uppercase block mb-2">
                                    Corpo del Messaggio
                                </label>
                                <textarea
                                    required
                                    rows={5}
                                    placeholder="Digita il tuo messaggio..."
                                    className="w-full bg-lab-dark/80 border border-green/15 px-4 py-3 text-white text-sm data-readout
                                        placeholder:text-gray-600 resize-none
                                        focus:outline-none focus:border-green/40 focus:shadow-[0_0_15px_rgba(0,255,136,0.05)]
                                        transition-all duration-300"
                                />
                            </div>

                            <GlowButton type="submit" variant="green" size="lg" className="w-full">
                                <Send size={14} /> Trasmetti Messaggio
                            </GlowButton>
                        </form>
                    )}
                </motion.div>

                {/* Info blocks */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    {[
                        { label: "Coordinate", value: "Torino, Italia", color: "text-cyan" },
                        { label: "Frequenza", value: "info@blackbullslab.it", color: "text-green" },
                        { label: "Canale Social", value: "@blackbullslab", color: "text-amber" },
                    ].map((info, i) => (
                        <motion.div
                            key={info.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className="border border-green/10 bg-lab-card/30 p-4 text-center"
                        >
                            <span className="data-readout text-[9px] text-gray-muted tracking-[0.3em] uppercase block mb-1">
                                {info.label}
                            </span>
                            <span className={`data-readout text-xs ${info.color}`}>{info.value}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
