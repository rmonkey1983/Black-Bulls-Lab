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
                            suppressHydrationWarning
                            className={`font-heading text-4xl sm:text-5xl md:text-7xl uppercase font-bold transition-colors duration-300 block ${pathname === "/" ? "text-yellow-500" : "text-white hover:text-yellow-500"}`}
                        >
                            Home
                        </Link>
                    </div>

                    {/* ESPERIMENTI */}
                    {/* FORMAT */}
                    <div className="nav-link space-y-4"
                         onMouseEnter={() => setExperimentsOpen(true)}
                         onMouseLeave={() => setExperimentsOpen(false)}
                    >
                        <button
                            type="button"
                            onClick={() => setExperimentsOpen(!experimentsOpen)}
                            className="w-full flex justify-between items-center text-left"
                            aria-expanded={experimentsOpen}
                            aria-controls="format-submenu"
                        >
                            <span className="font-heading font-bold text-4xl sm:text-5xl md:text-7xl uppercase tracking-tighter text-white hover:text-yellow-500 transition-colors">
                                I Format
                            </span>
                            <ChevronRight className={`transition-transform duration-500 text-yellow-500 ${experimentsOpen ? 'rotate-90' : ''}`} size={32} />
                        </button>
                        
                        <div id="format-submenu" ref={dropdownRef} className="overflow-hidden h-0 opacity-0">
                            <div className="flex flex-col gap-1 mt-3 pl-4 border-l-2 border-yellow-500/40">
                                {experiments.map((exp) => (
                                    <div key={exp.href} className="sub-link">
                                        <Link
                                            href={exp.href}
                                            onClick={onClose}
                                            suppressHydrationWarning
                                            className="flex flex-col py-2.5 group/sub"
                                        >
                                            <span className="font-heading text-xl sm:text-2xl font-bold uppercase text-white/80 group-hover/sub:text-yellow-500 transition-colors tracking-wide">
                                                {exp.name}
                                            </span>
                                            <span className="font-sans text-xs text-white/30 uppercase tracking-widest">
                                                {exp.desc}
                                            </span>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* VOCI PRIMARIE — stesso ordine del desktop nav */}
                    {[
                        { name: "Chi Siamo", href: "/chi-siamo" },
                        { name: "Blog", href: "/blog" },
                        { name: "Contatti", href: "/contact" },
                    ].map((link) => (
                        <div key={link.name} className="nav-link">
                            <Link
                                href={link.href}
                                onClick={onClose}
                                suppressHydrationWarning
                                className={`font-heading text-4xl sm:text-5xl md:text-7xl uppercase font-bold transition-colors duration-300 block ${pathname === link.href ? "text-yellow-500" : "text-white hover:text-yellow-500"}`}
                            >
                                {link.name}
                            </Link>
                        </div>
                    ))}

                    {/* VOCI SECONDARIE — pagine extra rispetto al desktop */}
                    <div className="nav-link border-t border-white/5 pt-4 mt-2">
                        <div className="flex flex-col gap-3">
                            {[
                                { name: "Artisti", href: "/talents" },
                                { name: "Corporate", href: "/eventi-aziendali" },
                                { name: "Galleria", href: "/gallery" },
                            ].map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={onClose}
                                    suppressHydrationWarning
                                    className={`font-heading text-2xl sm:text-3xl uppercase font-bold transition-colors duration-300 block ${pathname === link.href ? "text-yellow-500" : "text-zinc-500 hover:text-white"}`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* MOBILE CTA */}
                    <div className="nav-link mt-8 md:hidden">
                        <PrimaryButton
                            href="/contact"
                            onClick={onClose}
                            size="lg"
                            className="w-full text-xl py-6"
                        >
                            Richiedi Info
                        </PrimaryButton>
                    </div>
                </nav>

                <div 
                    className="mt-12 sm:mt-16 pt-8 border-t border-white/10 grid grid-cols-2 gap-8 font-sans text-sm text-rama-muted"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div>
                        <h4 className="font-rock-salt text-yellow-500 mb-4 transform -rotate-2">Seguici</h4>
                        <div className="flex flex-col gap-2">
                            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" suppressHydrationWarning className="hover:text-white transition-colors" aria-label="Seguici su Instagram">Instagram</a>
                            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" suppressHydrationWarning className="hover:text-white transition-colors" aria-label="Seguici su Facebook">Facebook</a>
                            <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" suppressHydrationWarning className="hover:text-white transition-colors" aria-label="Seguici su TikTok">TikTok</a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-rock-salt text-yellow-500 mb-4 transform -rotate-2">Contattaci</h4>
                        <a href={`mailto:${CONTACT_EMAIL}`} suppressHydrationWarning className="text-white hover:text-yellow-500 transition-colors text-lg tracking-wider">
                            {CONTACT_EMAIL}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
