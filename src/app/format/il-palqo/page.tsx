import { Metadata } from "next";
import { IlPalqoClient } from "./IlPalqoClient";
import { EventSchema } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/constants";
import { BookingForm } from "@/components/ui/BookingForm";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
    title: "Il PalQo Torino | Black Bulls Lab - Open Stage & Community",
    description: "Il format del Black Bulls Lab dove il talento incontra la tecnologia. Esibisciti o vota le performance live a Torino tramite la nostra Web App. Ingresso libero.",
    alternates: { canonical: `${SITE_URL}/format/il-palqo` },
    openGraph: {
        title: "Il PalQo Torino | Black Bulls Lab",
        description: "Il format del Black Bulls Lab dove il talento incontra la tecnologia. Esibisciti o vota le performance live a Torino tramite la nostra Web App.",
        url: `${SITE_URL}/format/il-palqo`,
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Il PalQo Black Bulls Lab" }],
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
