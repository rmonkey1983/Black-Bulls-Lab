"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    highlight?: string;
    code?: string;
}

export function PageHeader({ title, subtitle, highlight }: PageHeaderProps) {
    return (
        <div className="relative pt-36 pb-16 px-6 overflow-hidden">
            {/* Subtle warm glow */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse, rgba(200,164,78,0.04) 0%, transparent 70%)",
                }}
            />

            <div className="max-w-7xl mx-auto text-center relative z-10">
                {/* Gold decorative line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8 }}
                    className="w-12 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent mx-auto mb-8"
                />

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-4xl md:text-7xl font-bold text-white tracking-tighter mb-4"
                >
                    {title}{" "}
                    {highlight && (
                        <span className="text-gold font-serif-display italic">{highlight}</span>
                    )}
                </motion.h1>

                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        {subtitle}
                    </motion.p>
                )}

                {/* Bottom accent */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mt-8 flex items-center justify-center gap-2"
                >
                    <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-gold/20" />
                    <div className="w-1.5 h-1.5 rotate-45 border border-gold/25" />
                    <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-gold/20" />
                </motion.div>
            </div>
        </div>
    );
}
