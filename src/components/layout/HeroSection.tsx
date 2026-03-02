"use client";

import Link from "next/link";
import { ArrowRight, FlaskConical, Atom } from "lucide-react";
import { motion } from "framer-motion";
import { MoleculeDecoration } from "@/components/lab/MoleculeDecoration";
import { GlowButton } from "@/components/lab/GlowButton";

export function HeroSection() {
    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover opacity-40"
                >
                    <source src="/Untitled Project.mp4" type="video/mp4" />
                </video>
                {/* Dark overlay on video */}
                <div className="absolute inset-0 bg-gradient-to-t from-lab-dark via-lab-dark/70 to-lab-dark/40" />
            </div>

            {/* Hex grid pattern */}
            <div className="absolute inset-0 hex-grid-bg opacity-30 z-[1]" />

            {/* Animated gradient accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full z-[1]"
                style={{
                    background: "radial-gradient(circle, rgba(0,255,136,0.05) 0%, transparent 70%)",
                }}
            />

            {/* Molecule decorations */}
            <MoleculeDecoration className="absolute top-20 right-10 opacity-20" color="cyan" size={250} />
            <MoleculeDecoration className="absolute bottom-40 left-5 opacity-10" color="green" size={180} />

            {/* Content Container */}
            <div className="relative z-20 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center h-full pt-20">

                {/* Left: Huge Typography */}
                <div className="md:col-span-7 flex flex-col justify-center">
                    {/* Lab Classification */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-6"
                    >
                        <span className="data-readout text-[11px] text-green/60 tracking-[0.4em] uppercase flex items-center gap-2">
                            <FlaskConical size={12} />
                            Sezione // 001 — Laboratorio Principale
                        </span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white leading-[0.9] mb-6">
                            BLACK <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">BULLS</span> <br />
                            <span className="text-green text-glow-green italic">LAB</span>
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="border-l-2 border-green/40 pl-6 ml-2"
                    >
                        <p className="text-gray-400 text-lg md:text-xl max-w-xl font-light tracking-wide">
                            Il laboratorio underground dove l&apos;intrattenimento diventa{" "}
                            <span className="text-green font-medium text-glow-green">scienza</span>.
                        </p>
                    </motion.div>

                    {/* Data Readouts */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="flex gap-8 mt-8 data-readout text-xs"
                    >
                        <div className="flex flex-col gap-1">
                            <span className="text-gray-muted text-[9px] tracking-[0.3em] uppercase">Status</span>
                            <span className="text-green flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse-glow" />
                                ATTIVO
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-gray-muted text-[9px] tracking-[0.3em] uppercase">Location</span>
                            <span className="text-cyan">TORINO, IT</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-gray-muted text-[9px] tracking-[0.3em] uppercase">Protocol</span>
                            <span className="text-amber">ESPERIENZA LIVE</span>
                        </div>
                    </motion.div>
                </div>

                {/* Right: Experiment Briefing Card */}
                <div className="md:col-span-5 flex flex-col items-end justify-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="w-full"
                    >
                        <div className="backdrop-blur-md bg-lab-card/80 border border-green/15 p-6 relative overflow-hidden
                            hover:border-green/30 transition-all duration-500 group">

                            {/* Corner accents */}
                            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-green/40" />
                            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-green/40" />
                            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-green/40" />
                            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-green/40" />

                            <div className="flex items-center justify-between mb-4">
                                <span className="data-readout text-[10px] font-bold uppercase tracking-[0.3em] text-green/70 flex items-center gap-2">
                                    <Atom size={12} className="animate-molecule-spin" />
                                    Prossimo Esperimento
                                </span>
                                <div className="animate-pulse w-2 h-2 rounded-full bg-green shadow-[0_0_10px_rgba(0,255,136,0.5)]" />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-green transition-colors duration-300">
                                Notte Medievale
                            </h3>
                            <div className="data-readout text-gray-500 text-xs mb-6 space-y-1">
                                <div>DATA: <span className="text-cyan">15.06.2026</span></div>
                                <div>LUOGO: <span className="text-cyan">Sala dei Cavalieri</span></div>
                            </div>

                            <GlowButton href="/events/notte-medievale" variant="green" size="md" className="w-full">
                                Inizia Esperimento
                            </GlowButton>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        <Link
                            href="/events"
                            className="group flex items-center gap-4 text-gray-400 hover:text-green transition-colors"
                        >
                            <span className="w-12 h-12 border border-green/20 flex items-center justify-center
                                group-hover:border-green/50 group-hover:bg-green/5
                                group-hover:shadow-[0_0_15px_rgba(0,255,136,0.1)]
                                transition-all duration-300">
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                            <span className="data-readout text-xs font-bold uppercase tracking-[0.2em]">
                                Catalogo Esperimenti
                            </span>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator — Pipette */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-green/50 to-transparent" />
                <span className="data-readout text-[9px] uppercase tracking-[0.4em] text-green/40">
                    Scroll ▾
                </span>
            </motion.div>
        </section>
    );
}
