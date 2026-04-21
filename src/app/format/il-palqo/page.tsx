import type { Metadata } from "next";
import { IlPalqoClient } from "./IlPalqoClient";
import { EventSchema } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/constants";
import { BookingForm } from "@/components/ui/BookingForm";
import { FormatFAQ } from "@/components/sections/FormatFAQ";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
    title: "Il PalQo | Serate Live e Talenti a Torino",
    description: "Vivi Il PalQo: tre atti di musica e stand-up. Le migliori serate live Torino con artisti emergenti tra i più originali eventi culturali Torino del momento",
    alternates: { canonical: `${SITE_URL}/format/il-palqo` },
    openGraph: {
        title: "Il Palqo | Dinner Show & Performance | Black Bulls Lab",
        description: "Un'esperienza gastronomica che incontra la performance dal vivo. Scopri Il Palqo, il format dove il cibo e l'arte si fondono in un dinner show unico a Torino",
        url: `${SITE_URL}/format/il-palqo`,
        images: [{ url: "/images/brand/vibe-live-jazz.webp", width: 1200, height: 630, alt: "Il Palqo | Black Bulls Lab" }],
    },
};

export default function IlPalqoPage() {
    return (
        <>
            <EventSchema 
                name="Il PalQo — Hybrid Showcase"
                description="Un palcoscenico interattivo dove il pubblico vota le performance live tramite Web App. Musica, teatro e arti performative a Torino."
                date="2026-12-31T21:00:00Z"
                location="Black Bulls Lab, Torino"
                url={`${SITE_URL}/format/il-palqo`}
                price={0}
                image={`${SITE_URL}/images/brand/bg-stage-lights.webp`}
            />
            <IlPalqoClient />
            
            <FormatFAQ />

            <section className="py-24 px-6 bg-zinc-950/50">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16">
                        <SectionHeading
                            title="PRENOTA IL TUO"
                            highlight="PALQO"
                            subtitle="Sali sul palco o prenota un tavolo esclusivo"
                            align="center"
                        />
                    </div>
                    <BookingForm />
                </div>
            </section>
        </>
    );
}
