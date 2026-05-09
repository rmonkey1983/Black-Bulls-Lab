import type { Metadata } from "next";
import { TheGoldenVoiceClient } from "./TheGoldenVoiceClient";
import { EventSchema } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/constants";
import { FormatBookingCTA } from "@/components/events/FormatBookingCTA";
import { FormatFAQ } from "@/components/sections/FormatFAQ";

export const metadata: Metadata = {
    title: "The Golden Voice | Concorso Canoro Torino",
    description: "Sali sul palco di The Golden Voice. Partecipa al concorso canoro Torino più ambizioso. Un talent show Torino epico e un singing contest per il tuo talento",
    alternates: { canonical: `${SITE_URL}/format/the-golden-voice` },
    openGraph: {
        title: "The Golden Voice | Dinner Show Torino | Black Bulls Lab",
        description: "Il dinner show a Torino dove la musica è protagonista. Prenota il tuo tavolo per una serata di grande intrattenimento sonoro e cucina d'eccellenza",
        url: `${SITE_URL}/format/the-golden-voice`,
        images: [{ url: "/images/brand/service-performance.webp", width: 1200, height: 630, alt: "The Golden Voice | Black Bulls Lab" }],
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

            <FormatFAQ />

            <FormatBookingCTA formatName="The Golden Voice" />
        </>
    );
}
