"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CONTACT_WHATSAPP } from "@/lib/constants";

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
    let ctaHref = `https://wa.me/${CONTACT_WHATSAPP}?text=Ciao!%20Voglio%20prenotare%20una%20serata%20con%20Black%20Bulls%20Lab`;

    if (pathname === "/eventi-aziendali") {
        title = "Il tuo team merita una serata indimenticabile.";
        subtitle = "Parliamo del tuo evento. Preventivo gratuito in 24 ore.";
        ctaText = "Costruiamo insieme la serata";
        ctaHref = "/contact";
    } else if (pathname === "/format/a-cena-con-il-bugiardo") {
        title = "Il tuo tavolo ti sta aspettando.";
        subtitle = "Posti limitati ogni sera. Prenota prima che si esaurisca.";
        ctaText = "Voglio esserci quella sera";
        ctaHref = `https://wa.me/${CONTACT_WHATSAPP}?text=Ciao!%20Sono%20interessato%2Fa%20a%20%22A%20Cena%20Con%20Il%20Bugiardo%22.%20Quando%20posso%20venire%3F`;
    } else if (pathname === "/format/il-palqo") {
        title = "Il palco è pronto. Sei tu?";
        subtitle = "Artisti, performer, creativi — candidati per la prossima serata.";
        ctaText = "Voglio salire sul palco";
        ctaHref = "/contact";
    } else if (pathname === "/format/the-golden-voice") {
        title = "La tua voce merita di essere ascoltata.";
        subtitle = "Le audizioni apriranno presto. Candidati ora per essere tra i primi.";
        ctaText = "Voglio esibirmi";
        ctaHref = "#casting-form-container";
    } else if (pathname === "/chi-siamo") {
        title = "Vieni a scoprirci dal vivo.";
        subtitle = "Le parole fanno poco. Vivi un'esperienza Black Bulls Lab.";
        ctaText = "Scegli la tua serata";
        ctaHref = "/format";
    } else if (pathname === "/blog") {
        title = "Hai vissuto una nostra serata?";
        subtitle = "Raccontacela. Le migliori storie finiscono su questo blog.";
        ctaText = "Scrivici";
        ctaHref = "/contact";
    } else if (pathname.startsWith("/blog/")) {
        title = "Vuoi vivere di persona quello di cui hai letto?";
        subtitle = "Le migliori serate iniziano con una decisione. Scegli la tua.";
        ctaText = "Prenota la tua serata";
        ctaHref = "/format";
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
                        className="group inline-flex items-center gap-3 bg-rama-accent text-black font-heading font-bold uppercase tracking-widest text-sm sm:text-base px-8 py-4 sm:px-12 sm:py-5 rounded-full hover:bg-white transition-all transform active:scale-95 shadow-[0_0_20px_rgba(200,164,78,0.2)]"
                    >
                        {ctaText}
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                ) : (
                    <Link 
                        href={ctaHref}
                        suppressHydrationWarning
                        className="group inline-flex items-center gap-3 bg-rama-accent text-black font-heading font-bold uppercase tracking-widest text-sm sm:text-base px-8 py-4 sm:px-12 sm:py-5 rounded-full hover:bg-white transition-all transform active:scale-95 shadow-[0_0_20px_rgba(200,164,78,0.2)]"
                    >
                        {ctaText}
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                )}
            </div>
        </section>
    );
}
