"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/PageHeader";
import { EventCard } from "@/components/ui/EventCard";
import { FlaskConical } from "lucide-react";

const events = [
    {
        id: "1",
        slug: "notte-medievale",
        title: "Notte Medievale: Il Banchetto del Toro",
        date: "15.06.2026",
        location: "Sala dei Cavalieri",
        category: "Dinner Show",
        image: "https://images.unsplash.com/photo-1514362545857-3bc16549766b?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: "2",
        slug: "neon-jazz",
        title: "Neon Jazz Experience",
        date: "22.06.2026",
        location: "Rooftop Lounge",
        category: "Music & Drink",
        image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: "3",
        slug: "comedy-club",
        title: "Comedy Club: Risate al Buio",
        date: "29.06.2026",
        location: "Underground Stage",
        category: "Comedy",
        image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: "4",
        slug: "science-cocktail",
        title: "Science of Cocktails",
        date: "06.07.2026",
        location: "Chemistry Bar",
        category: "Mixology",
        image: "https://images.unsplash.com/photo-1514362545857-3bc16549766b?auto=format&fit=crop&q=80&w=800",
    },
];

export default function EventsPage() {
    return (
        <div className="min-h-screen bg-lab-dark pb-24">
            <PageHeader
                title="CATALOGO"
                highlight="ESPERIMENTI"
                subtitle="Ogni evento è un protocollo unico. Seleziona il tuo prossimo esperimento."
                code="EXP-CAT"
            />

            <div className="max-w-7xl mx-auto px-6 space-y-8">
                {/* Status bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-between border border-green/10 bg-lab-card/30 px-5 py-3"
                >
                    <div className="flex items-center gap-3">
                        <FlaskConical size={14} className="text-green/50" />
                        <span className="data-readout text-[11px] text-green/50 tracking-[0.2em] uppercase">
                            {events.length} Esperimenti Disponibili
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green animate-pulse-glow" />
                        <span className="data-readout text-[10px] text-green/40 tracking-wider">LIVE FEED</span>
                    </div>
                </motion.div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event, i) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <EventCard {...event} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
