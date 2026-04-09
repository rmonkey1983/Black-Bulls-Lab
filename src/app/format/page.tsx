import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ProjectList } from "@/components/ui/ProjectList";
import { useGSAP } from "@/hooks/useGSAP";
import { animateHeroText, animateFade, animateCards } from "@/lib/gsapAnimations";

export const metadata: Metadata = {
    title: "Cena con Delitto e Dinner Show a Torino | Format Black Bulls Lab",
    description:
        "Scopri i format immersivi di Black Bulls Lab: Cena con Delitto, Il PalQo e The Golden Voice. Serate uniche a Torino da 50€ a persona.",
    alternates: { canonical: "/format" },
    openGraph: {
        title: "Cena con Delitto e Dinner Show a Torino | Format Black Bulls Lab",
        description:
            "Scopri i format immersivi di Black Bulls Lab: Cena con Delitto, Il PalQo e The Golden Voice. Serate uniche a Torino da 50€ a persona.",
        url: "https://blackbullslab.com/format",
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Format Dinner Show — Black Bulls Lab" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Cena con Delitto e Dinner Show a Torino | Format Black Bulls Lab",
        description:
            "Scopri i format immersivi di Black Bulls Lab: Cena con Delitto, Il PalQo e The Golden Voice. Serate uniche a Torino da 50€ a persona.",
        images: ["/og-image.jpg"],
    },
};

// Local data for the static experiments
const experimentsList = [
    {
        id: "bugiardo", // We map these to their static slugs since ProjectList now uses slug
        slug: "a-cena-con-il-bugiardo",
        title: "A Cena Con Il Bugiardo",
        subtitle: "Dinner Show & Social Deception",
        date: "Sempre Disponibile",
        location: "Black Bulls Lab",
        category: "Dinner Show",
        image: "/images/brand/service-plating.png",
        description: "Chi riesce a ingannare tutti vince.",
        timeline: []
    },
    {
        id: "palqo",
        slug: "il-palqo",
        title: "Il PalQo",
        subtitle: "Community & Show",
        date: "Ogni Mese",
        location: "Black Bulls Lab",
        category: "Showcase",
        image: "/images/brand/bg-venue-crowd.png",
        description: "Il palcoscenico dove il talento incontra l'opportunità.",
        timeline: []
    },
    {
        id: "golden-voice",
        slug: "the-golden-voice",
        title: "The Golden Voice",
        subtitle: "Singing Contest",
        date: "In Arrivo",
        location: "Black Bulls Lab",
        category: "Contest",
        image: "/images/brand/service-performance.png",
        description: "Il primo singing contest di Black Bulls Lab.",
        timeline: []
    }
];

export default function EsperimentiPage() {
    useGSAP(() => {
        animateHeroText("#esperimenti-hero", 0.1);
        animateFade("#esperimenti-desc", "up", 0.3);
        animateCards("#experiments-grid");
    });

    return (
        <main className="min-h-screen pt-32 pb-24 px-4 sm:px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-rama-text/70 hover:text-rama-accent transition-colors uppercase text-xs font-bold tracking-widest mb-8"
                    >
                        <ArrowLeft size={16} /> Torna alla Home
                    </Link>

                    <div id="esperimenti-hero" className="flex flex-col">
                        <h1 className="line font-bold text-rama-text font-mohave uppercase tracking-tighter text-5xl md:text-7xl">
                            <span>I Nostri <span className="text-rama-accent">Esperimenti</span></span>
                        </h1>
                    </div>
                    <p
                        id="esperimenti-desc"
                        className="gsap-fade text-xl text-gray-400 mt-4 max-w-2xl font-light"
                    >
                        Format unici, nati nel laboratorio sotterraneo. Esplora le nostre esperienze esclusive, dove l&apos;intrattenimento si fonde con l&apos;interazione.
                    </p>
                </div>

                {/* Reusing ProjectList for consistency */}
                <div id="experiments-grid" className="border-t border-white/10 pt-8 mt-16">
                    <ProjectList events={experimentsList} basePath="/format" />
                </div>
            </div>
        </main>
    );
}
