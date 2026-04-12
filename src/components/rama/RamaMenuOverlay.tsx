"use client";

import Link from "next/link";
import Image from "next/image";
import { X, ChevronDown } from "lucide-react";
import { useState, useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap } from "gsap";
import { CONTACT_EMAIL } from "@/lib/constants";

interface RamaMenuOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

const experiments = [
    { name: "A Cena Con Il Bugiardo", href: "/format/a-cena-con-il-bugiardo", desc: "Dinner Show & Social Deception" },
    { name: "Il PalQo", href: "/format/il-palqo", desc: "Community & Show" },
    { name: "Cena Con Delitto", href: "/format/cena-con-delitto", desc: "Dinner Show & Investigation" },
    { name: "The Golden Voice", href: "/format/the-golden-voice", desc: "Singing Contest" },
];

export function RamaMenuOverlay({ isOpen, onClose }: RamaMenuOverlayProps) {
    const [experimentsOpen, setExperimentsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);
    const bgImageRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (isOpen) {
            // Opening Animation
            gsap.to(containerRef.current, {
                opacity: 1,
                duration: 0.4,
                ease: "power2.out",
                display: "flex"
            });

            gsap.fromTo(bgImageRef.current, 
                { scale: 1.1 },
                { scale: 1, duration: 1.2, ease: "power2.out" }
            );

            const links = linksRef.current?.querySelectorAll(".nav-link");
            if (links) {
                gsap.fromTo(links, 
                    { opacity: 0, x: 40 },
                    { 
                        opacity: 1, 
                        x: 0, 
                        duration: 0.5, 
                        stagger: 0.08, 
                        ease: "power3.out",
                        delay: 0.2
                    }
                );
            }
        } else {
            // Closing Animation
            gsap.to(containerRef.current, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    if (containerRef.current) containerRef.current.style.display = "none";
                }
            });
        }
    }, { dependencies: [isOpen], scope: containerRef });

    useGSAP(() => {
        if (experimentsOpen) {
            gsap.fromTo(dropdownRef.current, 
                { height: 0, opacity: 0 },
                { height: "auto", opacity: 1, duration: 0.4, ease: "power2.out" }
            );
            const subLinks = dropdownRef.current?.querySelectorAll(".sub-link");
            if (subLinks) {
                gsap.fromTo(subLinks, 
                    { opacity: 0, x: 20 },
                    { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, ease: "power2.out" }
                );
            }
        } else {
            gsap.to(dropdownRef.current, 
                { height: 0, opacity: 0, duration: 0.3, ease: "power2.in" }
            );
        }
    }, { dependencies: [experimentsOpen], scope: containerRef });

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[60] bg-rama-bg hidden opacity-0 text-white flex overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu principale"
            style={{ overscrollBehavior: "contain" }}
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 md:top-8 md:right-12 z-[70] p-4 text-rama-accent hover:rotate-90 transition-transform duration-300"
                aria-label="Close menu"
            >
                <X size={32} strokeWidth={2.5} />
            </button>

            {/* Left Decorative Image (Hidden on very small screens) */}
            <div 
                ref={bgImageRef} 
                className="hidden lg:block w-1/2 relative overflow-hidden cursor-pointer"
                onClick={onClose}
            >
                <div className="absolute inset-0 bg-yellow-600/20">
                    <Image
                        src="/lab_menu.png"
                        alt="Laboratory Aesthetic Menu Background"
                        fill
                        className="object-cover mix-blend-lighten"
                        sizes="50vw"
                    />
                </div>
                {/* Overlay click area indicator for desktop */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20">
                    <span className="font-mohave uppercase tracking-widest text-xs text-white/40">Clicca per chiudere</span>
                </div>
            </div>

            {/* Right Menu Content */}
            <div 
                ref={contentRef} 
                className="w-full lg:w-1/2 flex flex-col justify-center p-8 sm:p-12 md:p-24 overflow-y-auto"
                onClick={onClose}
            >
                <nav 
                    ref={linksRef} 
                    className="flex flex-col gap-3 md:gap-4"
                    onClick={(e) => e.stopPropagation()}
                >
                    
                    {/* HOME */}
                    <div className="nav-link">
                        <Link
                            href="/"
                            onClick={onClose}
                            className="font-mohave text-4xl sm:text-5xl md:text-7xl uppercase font-bold text-rama-text hover:text-rama-accent transition-colors duration-300 block"
                        >
                            Home
                        </Link>
                    </div>

                    {/* ESPERIMENTI */}
                    <div className="nav-link"
                         onMouseEnter={() => setExperimentsOpen(true)}
                         onMouseLeave={() => setExperimentsOpen(false)}
                    >
                        <button
                            type="button"
                            className="flex items-center gap-3 font-mohave text-4xl sm:text-5xl md:text-7xl uppercase font-bold text-rama-text hover:text-rama-accent transition-colors duration-300 w-fit group cursor-pointer select-none bg-transparent border-none p-0"
                            onClick={() => setExperimentsOpen(prev => !prev)}
                            aria-expanded={experimentsOpen}
                            aria-controls="esperimenti-submenu"
                        >
                            Le Nostre Serate
                            <ChevronDown
                                size={28}
                                className={`transition-transform duration-300 text-rama-accent mt-2 flex-shrink-0 ${experimentsOpen ? "rotate-180" : ""}`}
                            />
                        </button>

                        <div id="esperimenti-submenu" ref={dropdownRef} className="overflow-hidden h-0 opacity-0">
                            <div className="flex flex-col gap-1 mt-3 pl-4 border-l-2 border-rama-accent/40">
                                {experiments.map((exp) => (
                                    <div key={exp.href} className="sub-link">
                                        <Link
                                            href={exp.href}
                                            onClick={onClose}
                                            className="flex flex-col py-2.5 group/sub"
                                        >
                                            <span className="font-mohave text-xl sm:text-2xl font-bold uppercase text-white/80 group-hover/sub:text-rama-accent transition-colors tracking-wide">
                                                {exp.name}
                                            </span>
                                            <span className="font-outfit text-xs text-white/30 uppercase tracking-widest">
                                                {exp.desc}
                                            </span>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {[
                        { name: "Artisti", href: "/talents" },
                        { name: "Corporate", href: "/eventi-aziendali" },
                        { name: "Galleria", href: "/gallery" },
                        { name: "Chi Siamo", href: "/chi-siamo" },
                        { name: "Contatti", href: "/contact" },
                    ].map((link) => (
                        <div key={link.name} className="nav-link">
                            <Link
                                href={link.href}
                                onClick={onClose}
                                className="font-mohave text-4xl sm:text-5xl md:text-7xl uppercase font-bold text-rama-text hover:text-rama-accent transition-colors duration-300 block"
                            >
                                {link.name}
                            </Link>
                        </div>
                    ))}

                    {/* MOBILE CTA */}
                    <div className="nav-link mt-4 md:hidden">
                        <Link
                            href="/contact"
                            onClick={onClose}
                            className="inline-flex items-center justify-center w-full bg-rama-accent text-black font-mohave font-bold uppercase tracking-widest text-xl px-10 py-5 hover:bg-white transition-colors duration-300"
                        >
                            Richiedi Info
                        </Link>
                    </div>
                </nav>

                <div 
                    className="mt-12 sm:mt-16 pt-8 border-t border-white/10 grid grid-cols-2 gap-8 font-outfit text-sm text-rama-muted"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div>
                        <h4 className="font-rock-salt text-rama-accent mb-4 transform -rotate-2">Seguici</h4>
                        <div className="flex flex-col gap-2">
                            <a href="https://instagram.com/blackbullslab" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
                            <a href="https://facebook.com/blackbullslab" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a>
                            <a href="https://tiktok.com/@blackbullslab" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TikTok</a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-rock-salt text-rama-accent mb-4 transform -rotate-2">Contattaci</h4>
                        <a href={`mailto:${CONTACT_EMAIL}`} className="text-white hover:text-rama-accent transition-colors text-lg tracking-wider">
                            {CONTACT_EMAIL}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
