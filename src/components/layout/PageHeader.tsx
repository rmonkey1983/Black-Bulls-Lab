"use client";

import { motion } from "framer-motion";
import { FlaskConical } from "lucide-react";

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    highlight?: string;
    code?: string;
}

export function PageHeader({ title, subtitle, highlight, code = "SEC-001" }: PageHeaderProps) {
    return (
        <div className="relative pt-40 pb-20 px-6 overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 hex-grid-bg opacity-20 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px]"
                style={{ background: "radial-gradient(ellipse, rgba(0,255,136,0.03) 0%, transparent 70%)" }}
            />

            <div className="max-w-7xl mx-auto text-center relative z-10">
                {/* Classification code */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6 flex items-center justify-center gap-3"
                >
                    <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-green/30" />
                    <span className="data-readout text-[10px] text-green/50 tracking-[0.4em] uppercase flex items-center gap-2">
                        <FlaskConical size={10} />
                        {code}
                    </span>
                    <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-green/30" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-5xl md:text-8xl font-bold text-white tracking-tighter mb-6"
                >
                    {title} <br />
                    {highlight && <span className="text-green text-glow-green italic">{highlight}</span>}
                </motion.h1>

                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        {subtitle}
                    </motion.p>
                )}

                {/* Molecular dot decoration */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mt-10 flex items-center justify-center gap-2"
                >
                    <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-green/20" />
                    <div className="w-1.5 h-1.5 rounded-full bg-green/30" />
                    <div className="w-2 h-2 rounded-full bg-green/50 shadow-[0_0_6px_rgba(0,255,136,0.3)]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-green/30" />
                    <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-green/20" />
                </motion.div>
            </div>
        </div>
    );
}
