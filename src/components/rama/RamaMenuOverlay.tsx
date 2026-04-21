"use client";

import Link from "next/link";
import Image from "next/image";
import { X, ChevronDown, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap } from "gsap";
import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/lib/constants";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { usePathname } from "next/navigation";

interface RamaMenuOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

const experiments = [
    { name: "A Cena Con Il Bugiardo", href: "/format/a-cena-con-il-bugiardo", desc: "Dinner Show & Social Deception" },
    { name: "Il PalQo", href: "/format/il-palqo", desc: "Community & Show" },
    { name: "Cena Con Delitto", href: "/format/cena-con-delitto", desc: "Dinner Show & Investigation" },
    { name: "THE GOLDEN VOICE", href: "/format/the-golden-voice", desc: "Singing Contest" },
];

export function RamaMenuOverlay({ isOpen, onClose }: RamaMenuOverlayProps) {
    const pathname = usePathname();
    const [experimentsOpen, setExperimentsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);
    const bgImageRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

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
            className="fixed top-0 left-0 w-full h-[100dvh] z-[200] bg-black hidden opacity-0 text-white flex overflow-hidden lg:pb-0 pb-[env(safe-area-inset-bottom)]"
            role="dialog"
            aria-modal="true"
            aria-label="Menu principale"
            style={{ overscrollBehavior: "contain" }}
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 md:top-8 md:right-12 z-[70] p-4 text-yellow-500 hover:rotate-90 transition-transform duration-300"
                aria-label="Chiudi menu"
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
                        src="/lab_menu.webp"
                        alt="Laboratory Aesthetic Menu Background"
                        fill
                        className="object-cover mix-blend-lighten"
                        sizes="50vw"
                    />
                </div>
                {/* Overlay click area indicator for desktop */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20">
                    <span className="font-heading uppercase tracking-widest text-xs text-white/40">Clicca per chiudere</span>
                </div>
            </div>

            {/* Right Menu Content */}
            <div 
                ref={contentRef} 
                className="w-full lg:w-1/2 flex flex-col justify-center p-8 sm:p-12 md:p-24 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <nav ref={linksRef} className="flex flex-col gap-6 md:gap-8">
                    <Link
                        href="/"
                        onClick={onClose}
                        className={`nav-link font-heading text-4xl sm:text-5xl md:text-7xl uppercase font-bold transition-colors duration-300 block ${pathname === "/" ? "text-rama-accent" : "text-white hover:text-rama-accent"}`}
                    >
                        Home
                    </Link>

                    {/* Format with Sub-menu */}
                    <div className="nav-link flex flex-col">
                        <button
                            onClick={() => setExperimentsOpen(!experimentsOpen)}
                            className="flex items-center gap-4 text-left group focus:outline-none"
                        >
                            <span className="font-heading font-bold text-4xl sm:text-5xl md:text-7xl uppercase tracking-tighter text-white hover:text-rama-accent transition-colors">
                                Le Nostre Serate
                            </span>
                            <ChevronRight className={`transition-transform duration-500 text-rama-accent ${experimentsOpen ? 'rotate-90' : ''}`} size={32} />
                        </button>
                        
                        <div 
                            ref={dropdownRef}
                            className="overflow-hidden"
                            style={{ height: 0, opacity: 0 }}
                        >
                            <div className="py-6 flex flex-col gap-4 pl-4 border-l border-rama-accent/20">
                                {experiments.map((exp) => (
                                    <Link
                                        key={exp.href}
                                        href={exp.href}
                                        onClick={onClose}
                                        className="sub-link group flex flex-col"
                                    >
                                        <span className="font-heading text-2xl uppercase font-bold text-white/70 group-hover:text-rama-accent transition-colors">
                                            {exp.name}
                                        </span>
                                        <span className="font-sans text-xs text-rama-muted uppercase tracking-widest">
                                            {exp.desc}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {[
                        { name: "Artisti", href: "/talents" },
                        { name: "Corporate", href: "/eventi-aziendali" },
                        { name: "Gallery", href: "/gallery" },
                        { name: "Chi Siamo", href: "/chi-siamo" },
                        { name: "Blog", href: "/blog" },
                        { name: "Contatti", href: "/contact" },
                    ].map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={onClose}
                            className={`nav-link font-heading text-4xl sm:text-5xl md:text-7xl uppercase font-bold transition-colors duration-300 block ${pathname === link.href ? "text-rama-accent" : "text-white hover:text-rama-accent"}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Footer Info */}
                <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 gap-8 font-sans text-sm text-rama-muted">
                    <div>
                        <h4 className="text-rama-accent mb-4 uppercase tracking-[0.2em] text-[10px] font-bold">Social</h4>
                        <div className="flex flex-col gap-2">
                            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
                            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a>
                            <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TikTok</a>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-rama-accent mb-4 uppercase tracking-[0.2em] text-[10px] font-bold">Contattaci</h4>
                        <a href={`mailto:${CONTACT_EMAIL}`} className="text-white hover:text-rama-accent transition-colors text-lg">
                            {CONTACT_EMAIL}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
