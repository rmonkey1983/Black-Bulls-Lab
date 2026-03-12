"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function HeroSection() {
    return (
        <section className="relative h-[100dvh] w-full overflow-hidden bg-black">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-60"
                >
                    <source src="/Untitled Project.mp4" type="video/mp4" />
                </video>
                {/* Grain/Texture Overlay */}
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" />
                {/* Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
            </div>

            {/* Content - Bottom Aligned & Minimal */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end pb-20 md:pb-24 px-4 md:px-6 max-w-7xl mx-auto pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.2, duration: 1, ease: "easeOut" }}
                    className="pointer-events-auto"
                >
                    <div className="relative h-16 sm:h-24 md:h-32 lg:h-48 w-full max-w-[12rem] sm:max-w-xs md:max-w-md lg:max-w-2xl mb-4 md:mb-2">
                        <Image
                            src="/logo.png"
                            alt="Black Bulls Lab Logo"
                            fill
                            className="object-contain object-left filter drop-shadow-2xl"
                            priority
                        />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.8, duration: 1 }}
                    className="mt-4 md:mt-8 flex justify-between items-end border-t border-white/20 pt-4 md:pt-6 pointer-events-auto"
                >
                    <p className="text-xs md:text-sm lg:text-base text-gray-200 max-w-[250px] md:max-w-sm uppercase tracking-widest leading-relaxed font-semibold drop-shadow-md">
                        Il Palcoscenico dei Sensi <br />
                        Dove la cucina incontra lo spettacolo.
                    </p>

                    <div className="hidden md:block text-right">
                        <span className="block text-[10px] text-gray-300 mb-1 font-bold">SCROLL TO EXPLORE</span>
                        <div className="w-[1px] h-12 bg-white/80 mx-auto animate-pulse" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
