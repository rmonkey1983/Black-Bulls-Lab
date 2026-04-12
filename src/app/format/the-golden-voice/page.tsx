import type { Metadata } from "next";
import { TheGoldenVoiceClient } from "./TheGoldenVoiceClient";
import { EventSchema } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/constants";
import { BookingForm } from "@/components/ui/BookingForm";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
    title: "THE GOLDEN VOICE Torino | Black Bulls Lab - Singing Contest",
    description: "La competizione canora più prestigiosa di Torino. Vota il tuo talento preferito tramite Web App o candidati per esibirti sul palco del Black Bulls Lab.",
    alternates: { canonical: `${SITE_URL}/format/the-golden-voice` },
    openGraph: {
        title: "THE GOLDEN VOICE Torino | Black Bulls Lab",
        description: "La competizione canora più prestigiosa di Torino. Vota il tuo talento preferito tramite Web App o candidati per esibirti sul palco del Black Bulls Lab.",
        url: `${SITE_URL}/format/the-golden-voice`,
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "THE GOLDEN VOICE Black Bulls Lab" }],
    },
};

export default function TheGoldenVoicePage() {
    return (
        <>
            <EventSchema 
                name="THE GOLDEN VOICE — Digital Singing Contest"
                description="Un contest canoro dove ogni spettatore è un giudice. Vota le performance in tempo reale tramite la nostra Web App dedicata."
                date="2026-12-31T21:00:00Z"
                location="Black Bulls Lab, Torino"
                url={`${SITE_URL}/format/the-golden-voice`}
                price={0}
                image={`${SITE_URL}/images/brand/service-performance.webp`}
            />
            <TheGoldenVoiceClient />

            <section className="py-24 px-6 bg-zinc-950/50">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16">
                        <SectionHeading
                            title="ISCRIVITI O"
                            highlight="PRENOTA"
                            subtitle="Sali sul palco o goditi lo spettacolo dal tuo tavolo"
                            align="center"
                        />
                    </div>
                    <BookingForm />
                </div>
            </section>
        </>
    );
}
