"use client";

import React, { useState, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap } from "gsap";

const services = [
    {
        id: "01",
        title: "CREAZIONE DINNER SHOW",
        image: "/images/brand/service-plating.png",
    },
    {
        id: "02",
        title: "FORMAT EVENTI SU MISURA",
        image: "/images/brand/bg-venue-crowd.png",
    },
    {
        id: "03",
        title: "DIREZIONE ARTISTICA",
        image: "/images/brand/service-performance.png",
    }
];

export function RamaServices() {
    const [hoveredService, setHoveredService] = useState<string | null>(services[0].id);
    const bgRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!bgRef.current) return;
        
        // Find existing images and the new image
        const imgs = bgRef.current.querySelectorAll("img");
        
        if (imgs.length > 1) {
            // Fade out the old one(s) and fade in the new one
            gsap.to(imgs[0], { opacity: 0, scale: 1.05, duration: 0.8, ease: "power2.inOut", onComplete: () => imgs[0].remove() });
            gsap.fromTo(imgs[1], 
                { opacity: 0, scale: 1.05 },
                { opacity: 1, scale: 1, duration: 0.8, ease: "power2.inOut" }
            );
        } else if (imgs.length === 1) {
            // Initial load or first swap
            gsap.fromTo(imgs[0], 
                { opacity: 0, scale: 1.05 },
                { opacity: 1, scale: 1, duration: 0.8, ease: "power2.inOut" }
            );
        }
    }, { dependencies: [hoveredService], scope: bgRef });

    return (
        <section ref={containerRef} className="relative w-full min-h-screen bg-transparent flex items-center justify-center py-20 sm:py-32 overflow-hidden px-4 sm:px-6 md:px-12">
            {/* Background Image Viewer */}
            <div ref={bgRef} className="absolute inset-0 z-0 opacity-20 md:opacity-40 transition-opacity duration-1000">
                {hoveredService && (
                    <img
                        key={hoveredService}
                        src={services.find(s => s.id === hoveredService)?.image}
                        className="absolute inset-0 w-full h-full object-cover"
                        alt="Service Background"
                    />
                )}
                <div className="absolute inset-0 bg-transparent/20" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full flex flex-col items-center">
                <div className="font-rock-salt text-rama-accent transform -rotate-2 text-base sm:text-xl mb-8 sm:mb-12">I Nostri Servizi</div>

                <div className="flex flex-col w-full max-w-5xl">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className={`group border-b border-white/10 py-5 sm:py-6 md:py-10 flex flex-col md:flex-row items-start md:items-center cursor-pointer transition-colors duration-500 gap-2 md:gap-0`}
                            onMouseEnter={() => setHoveredService(service.id)}
                        >
                            <span className="text-white/30 text-sm sm:text-lg md:text-2xl font-mohave group-hover:text-rama-accent transition-colors w-10 sm:w-16 md:w-32 flex-shrink-0">
                                ({service.id})
                            </span>
                            <h2
                                className={`font-mohave text-[11vw] sm:text-[10vw] md:text-[8vw] uppercase font-bold tracking-tighter leading-[0.85] transition-all duration-500 min-w-0 overflow-hidden ${hoveredService === service.id ? 'text-white' : 'text-transparent'}`}
                                style={{
                                    WebkitTextStroke: hoveredService === service.id ? '0px transparent' : '1px rgba(255,255,255,0.4)'
                                }}
                            >
                                {service.title}
                            </h2>
                            <div className={`ml-auto opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-20px] group-hover:translate-x-0 hidden md:flex items-center justify-center bg-white text-black rounded-full p-4 flex-shrink-0`}>
                                <ArrowUpRight size={24} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
