import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Dinner Show a Torino | Black Bulls Lab — Cena Con Delitto e Format Immersivi",
    description:
        "Organizza una serata indimenticabile a Torino con Black Bulls Lab. Dinner show, cena con delitto e team building da 50€/persona. Gruppi da 20 a 100 persone. Risposta in 24 ore.",
    alternates: { canonical: "/" },
    openGraph: {
        title: "Dinner Show a Torino | Black Bulls Lab — Cena Con Delitto e Format Immersivi",
        description:
            "Organizza una serata indimenticabile a Torino con Black Bulls Lab. Dinner show, cena con delitto e team building da 50€/persona. Gruppi da 20 a 100 persone. Risposta in 24 ore.",
        url: "https://blackbullslab.com",
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Black Bulls Lab — Dinner Show a Torino" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Dinner Show a Torino | Black Bulls Lab — Cena con Delitto e Format Immersivi",
        description:
            "Organizza una serata indimenticabile a Torino con Black Bulls Lab. Dinner show, cena con delitto e team building da 50€/persona.",
        images: ["/og-image.jpg"],
    },
};
import { RamaHero } from "@/components/rama/sections/RamaHero";
import { RamaNextEvents } from "@/components/rama/sections/RamaNextEvents";
import { RamaManifesto } from "@/components/rama/sections/RamaManifesto";
import { RamaHowItWorks } from "@/components/rama/sections/RamaHowItWorks";
import { RamaGroupEvents } from "@/components/rama/sections/RamaGroupEvents";
import { RamaGroupConfigurator } from "@/components/rama/sections/RamaGroupConfigurator";
import { RamaServices } from "@/components/rama/sections/RamaServices";
import { RamaTestimonials } from "@/components/rama/sections/RamaTestimonials";
import { RamaCTA } from "@/components/rama/sections/RamaCTA";
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
            <RamaNextEvents />
            <RamaManifesto />
            <SectionCTA href="/chi-siamo" label="Scopri chi si nasconde dietro la magia →" />
            <RamaHowItWorks />
            <SectionCTA href="/format" label="Scegli la tua serata →" />
            <RamaGroupEvents />
            <RamaGroupConfigurator />
            <SectionCTA href="/eventi-aziendali" label="Il tuo team merita di meglio →" />
            <RamaServices />
            <SectionCTA href="/gallery" label="Guarda cosa ti aspetta →" />
            <RamaTestimonials />
            <RamaCTA />
            <RamaFAQ />
        </main>
    );
}

