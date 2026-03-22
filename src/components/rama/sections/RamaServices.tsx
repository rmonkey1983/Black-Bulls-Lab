"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const services = [
    {
        id: "01",
        title: "DINNER SHOW IMMERSIVI",
        image: "/images/brand/service-plating.png",
    },
    {
        id: "02",
        title: "STAND-UP COMEDY",
        image: "/images/brand/bg-venue-crowd.png",
    },
    {
        id: "03",
        title: "PERFORMANCE ARTISTICHE",
        image: "/images/brand/service-performance.png",
    }
];

export function RamaServices() {
    const [hoveredService, setHoveredService] = useState<string | null>(services[0].id);

    return (
        <section className="relative w-full min-h-screen bg-transparent flex items-center justify-center py-20 sm:py-32 overflow-hidden px-4 sm:px-6 md:px-12">
            {/* Background Image Viewer */}
            <div className="absolute inset-0 z-0 opacity-20 md:opacity-40 transition-opacity duration-1000">
                <AnimatePresence mode="wait">
                    {hoveredService && (
                        <motion.img
                            key={hoveredService}
                            src={services.find(s => s.id === hoveredService)?.image}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="w-full h-full object-cover"
                        />
                    )}
                </AnimatePresence>
                <div className="absolute inset-0 bg-transparent/20" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full flex flex-col items-center">
                <div className="font-rock-salt text-rama-accent transform -rotate-2 text-base sm:text-xl mb-8 sm:mb-12">I Nostri Servizi</div>

                <div className="flex flex-col w-full max-w-5xl">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className={`group border-b border-white/10 py-5 sm:py-6 md:py-10 flex flex-col md:flex-row items-start md:items-center cursor-pointer transition-colors duration-500`}
                            onMouseEnter={() => setHoveredService(service.id)}
                        >
                            <span className="text-white/30 text-base sm:text-lg md:text-2xl font-mohave group-hover:text-rama-accent transition-colors w-12 sm:w-16 md:w-32">
                                ({service.id})
                            </span>
                            <h2
                                className={`font-mohave text-[11vw] sm:text-[10vw] md:text-[8vw] uppercase font-bold tracking-tighter leading-[0.85] transition-all duration-500 ${hoveredService === service.id ? 'text-white' : 'text-transparent'}`}
                                style={{
                                    WebkitTextStroke: hoveredService === service.id ? '0px transparent' : '1px rgba(255,255,255,0.4)'
                                }}
                            >
                                {service.title}
                            </h2>
                            <div className={`ml-auto opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-20px] group-hover:translate-x-0 hidden md:flex items-center justify-center bg-white text-black rounded-full p-4`}>
                                <ArrowUpRight size={24} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
