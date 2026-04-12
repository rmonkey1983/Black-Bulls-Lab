"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function PreFooterCTA() {
    const pathname = usePathname();

    // Nascondiamo il pre-footer su pannello admin e pagina di checkout per non disturbare l'utente
    if (pathname.startsWith("/admin") || pathname.startsWith("/checkout")) {
        return null;
    }

    // Default: Homepage e pagine format
    let title = "Il tuo tavolo ti sta aspettando.";
    let subtitle = "Ogni serata ha un numero limitato di posti. Non aspettare.";
    let ctaText = "Scrivici su WhatsApp";
    let ctaHref = "https://wa.me/393342010067?text=Ciao!%20Voglio%20prenotare%20una%20serata%20con%20Black%20Bulls%20Lab";

    if (pathname === "/eventi-aziendali") {
        title = "Il tuo team merita una serata indimenticabile.";
        subtitle = "Parliamo del tuo evento. Preventivo gratuito in 24 ore.";
        ctaText = "Costruiamo insieme la serata";
        ctaHref = "/contact";
    } else if (pathname === "/chi-siamo") {
        title = "Vieni a scoprirci dal vivo.";
        subtitle = "Le parole fanno poco. Vivi un'esperienza Black Bulls Lab.";
        ctaText = "Scegli la tua serata";
        ctaHref = "/format";
    }

    const isExternal = ctaHref.startsWith("http");

    return (
        <section className="w-full py-20 sm:py-28 px-4 sm:px-6 md:px-12 bg-[#050505] border-t border-white/5 relative overflow-hidden flex flex-col items-center justify-center text-center">
            {/* Soft Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(200,164,78,0.04)_0%,transparent_100%)] pointer-events-none" />
            
            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                <h2 className="font-mohave font-bold uppercase tracking-tighter text-[9vw] sm:text-[7vw] md:text-6xl text-white mb-6 leading-[0.9]">
                    {title}
                </h2>
                <p className="font-outfit text-rama-muted text-lg sm:text-xl font-light max-w-xl mb-12">
                    {subtitle}
                </p>
                
                {isExternal ? (
                    <a 
                        href={ctaHref} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 bg-rama-accent text-black font-mohave font-bold uppercase tracking-widest text-sm sm:text-base px-8 py-4 sm:px-12 sm:py-5 rounded-full hover:bg-white transition-all transform active:scale-95 shadow-[0_0_20px_rgba(200,164,78,0.2)]"
                    >
                        {ctaText}
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                ) : (
                    <Link 
                        href={ctaHref}
                        className="group inline-flex items-center gap-3 bg-rama-accent text-black font-mohave font-bold uppercase tracking-widest text-sm sm:text-base px-8 py-4 sm:px-12 sm:py-5 rounded-full hover:bg-white transition-all transform active:scale-95 shadow-[0_0_20px_rgba(200,164,78,0.2)]"
                    >
                        {ctaText}
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                )}
            </div>
        </section>
    );
}
