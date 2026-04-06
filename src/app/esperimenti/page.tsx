"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ProjectList } from "@/components/ui/ProjectList";

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

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold text-rama-text font-mohave uppercase tracking-tighter"
                    >
                        I Nostri <span className="text-rama-accent">Esperimenti</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-400 mt-4 max-w-2xl font-light"
                    >
                        Format unici, nati nel laboratorio sotterraneo. Esplora le nostre esperienze esclusive, dove l&apos;intrattenimento si fonde con l&apos;interazione.
                    </motion.p>
                </div>

                {/* Reusing ProjectList for consistency */}
                <div className="border-t border-white/10 pt-8 mt-16">
                    <ProjectList events={experimentsList} basePath="/esperimenti" />
                </div>
            </div>
        </main>
    );
}
