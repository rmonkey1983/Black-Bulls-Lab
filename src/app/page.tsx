import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RamaHero } from "@/components/rama/sections/RamaHero";
import { RamaManifesto } from "@/components/rama/sections/RamaManifesto";
import { RamaHowItWorks } from "@/components/rama/sections/RamaHowItWorks";
import { RamaGroupEvents } from "@/components/rama/sections/RamaGroupEvents";
import { RamaGroupConfigurator } from "@/components/rama/sections/RamaGroupConfigurator";
import { RamaServices } from "@/components/rama/sections/RamaServices";
import { RamaTestimonials } from "@/components/rama/sections/RamaTestimonials";
import { RamaFAQ } from "@/components/rama/sections/RamaFAQ";

/** Contextual divider CTA between sections */
function SectionCTA({ href, label }: { href: string; label: string }) {
    return (
        <div className="flex justify-center py-4 px-4">
            <Link
                href={href}
                className="group inline-flex items-center gap-2 text-white/40 hover:text-rama-accent font-outfit text-sm uppercase tracking-widest transition-colors duration-300"
            >
                {label}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
        </div>
    );
}

export default function RamaHomePage() {
    return (
        <main className="w-full bg-transparent min-h-screen text-white relative z-10 selection:bg-rama-accent selection:text-black">
            <RamaHero />
            <RamaManifesto />
            <SectionCTA href="/chi-siamo" label="Scopri chi siamo →" />
            <RamaHowItWorks />
            <SectionCTA href="/esperimenti" label="Guarda tutti i format →" />
            <RamaGroupEvents />
            <RamaGroupConfigurator />
            <SectionCTA href="/eventi-aziendali" label="Tutte le soluzioni aziendali →" />
            <RamaServices />
            <SectionCTA href="/gallery" label="Guarda la gallery →" />
            <RamaTestimonials />
            <SectionCTA href="/contact" label="Hai ancora dubbi? Scrivici →" />
            <RamaFAQ />
        </main>
    );
}

