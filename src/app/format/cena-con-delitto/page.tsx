import type { Metadata } from "next";
import { CenaConDelittoClient } from "./CenaConDelittoClient";
import { EventSchema } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/constants";
import { BookingForm } from "@/components/ui/BookingForm";
import { FormatFAQ } from "@/components/sections/FormatFAQ";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
    title: "Cena Con Delitto Torino | Noir Experience e Cena Spettacolo",
    description: "Diventa un vero detective nella nostra iconica cena con delitto a Torino. Un'esperienza noir immersiva e interattiva tra colpi di scena e indizi digitali.",
    alternates: { canonical: `${SITE_URL}/format/cena-con-delitto` },
    openGraph: {
        title: "Cena Con Delitto Torino | Noir Experience e Cena Spettacolo",
        description: "Diventa un vero detective nella nostra iconica cena con delitto a Torino. Un'esperienza noir immersiva e interattiva tra colpi di scena e indizi digitali.",
        url: `${SITE_URL}/format/cena-con-delitto`,
        images: [{ url: "/images/brand/bg-venue-crowd.webp", width: 1200, height: 630, alt: "Cena con Delitto | Black Bulls Lab" }],
    },
};

export default function CenaConDelittoPage() {
    return (
        <>
            <EventSchema 
                name="Cena con Delitto — Noir Digital Experience"
                description="Un giallo interattivo dove ogni ospite è un detective. Usa la nostra Web App per raccogli indizi e risolvere il caso durante la cena."
                date="2026-12-31T20:00:00Z" // Placeholder date for generic format
                location="Black Bulls Lab, Torino"
                url={`${SITE_URL}/format/cena-con-delitto`}
                price={50}
                image={`${SITE_URL}/images/brand/bg-venue-crowd.webp`}
            />
            <CenaConDelittoClient />
            
            <FormatFAQ />

            <section className="py-24 px-6 bg-zinc-950/50">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16">
                        <SectionHeading
                            title="RISOLVI IL"
                            highlight="MISTERO"
                            subtitle="Assicura il tuo posto nel nostro prossimo noir"
                            align="center"
                        />
                    </div>
                    <BookingForm />
                </div>
            </section>
        </>
    );
}
