"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CONTACT_WHATSAPP } from "@/lib/constants";

export function PreFooterCTA() {
    const pathname = usePathname();

    // Nascondiamo il pre-footer su pannello admin per non disturbare l'utente
    if (pathname.startsWith("/admin")) {
        return null;
    }

    // Default: Homepage e pagine format
    let title = "Il tuo tavolo ti sta aspettando.";
    let subtitle = "Scopri le esperienze Black Bulls Lab e scegli il percorso adatto a te.";
    let ctaText = "Vedi il Calendario";
    let ctaHref = "/calendario";

    if (pathname === "/eventi-aziendali") {
        title = "Il tuo team merita una serata indimenticabile.";
        subtitle = "Raccontaci il tuo evento: definiremo insieme il percorso più adatto.";
        ctaText = "Costruiamo insieme la serata";
        ctaHref = `https://wa.me/${CONTACT_WHATSAPP}?text=Ciao!%20Voglio%20organizzare%20un%20evento%20aziendale`;
    } else if (pathname === "/format/a-cena-con-il-bugiardo") {
        title = "Smaschera il Bugiardo.";
        subtitle = "Ricevi informazioni su data, location e apertura delle prenotazioni.";
        ctaText = "Prenota ora";
        ctaHref = "/calendario";
    } else if (pathname === "/format/il-palqo") {
        title = "Il palco è pronto. Sei tu?";
        subtitle = "Artisti, performer, creativi — consulta le prossime date.";
        ctaText = "Apri il Calendario";
        ctaHref = "/calendario";
    } else if (pathname === "/format/the-golden-voice") {
        title = "La tua voce merita di essere ascoltata.";
        subtitle = "Guarda le prossime audizioni e dinner show nel calendario.";
        ctaText = "Vedi Date";
        ctaHref = "/calendario";
    } else if (pathname === "/chi-siamo") {
        title = "Vieni a scoprirci dal vivo.";
        subtitle = "Le parole fanno poco. Vivi un'esperienza Black Bulls Lab.";
        ctaText = "Scegli la tua serata";
        ctaHref = "/calendario";
    } else if (pathname === "/blog") {
        title = "Pronto a vivere la tua storia?";
        subtitle = "Non limitarti a leggere. Entra nel Lab.";
        ctaText = "Prenota la tua serata";
        ctaHref = "/calendario";
    } else if (pathname.startsWith("/blog/")) {
        title = "Vuoi vivere quello di cui hai letto?";
        subtitle = "Le migliori serate iniziano con una decisione. Scegli la tua.";
        ctaText = "Vedi il Calendario";
        ctaHref = "/calendario";
    }

    const isExternal = ctaHref.startsWith("http");

    return (
        <section className="w-full py-20 sm:py-28 px-4 sm:px-6 md:px-12 bg-[#050505] border-t border-white/5 relative overflow-hidden flex flex-col items-center justify-center text-center">
            {/* Soft Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(200,164,78,0.04)_0%,transparent_100%)] pointer-events-none" />
            
            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                <h2 className="font-heading font-bold uppercase tracking-tighter text-[9vw] sm:text-[7vw] md:text-6xl text-white mb-6 leading-[0.9]">
                    {title}
                </h2>
                <p className="font-sans text-rama-muted text-lg sm:text-xl font-light max-w-xl mb-12">
                    {subtitle}
                </p>
                
                {isExternal ? (
                    <a 
                        href={ctaHref} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        suppressHydrationWarning
                        className="group inline-flex items-center gap-3 bg-rama-accent text-black font-heading font-bold uppercase tracking-widest text-sm sm:text-base px-8 py-4 sm:px-12 sm:py-5 rounded-full hover:bg-white transition transform active:scale-95 shadow-[0_0_20px_rgba(200,164,78,0.2)]"
                    >
                        {ctaText}
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                ) : (
                    <Link 
                        href={ctaHref}
                        suppressHydrationWarning
                        className="group inline-flex items-center gap-3 bg-rama-accent text-black font-heading font-bold uppercase tracking-widest text-sm sm:text-base px-8 py-4 sm:px-12 sm:py-5 rounded-full hover:bg-white transition transform active:scale-95 shadow-[0_0_20px_rgba(200,164,78,0.2)]"
                    >
                        {ctaText}
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                )}
            </div>
        </section>
    );
}
