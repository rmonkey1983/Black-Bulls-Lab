import { buildFormatMetadata } from "@/lib/metadata";
import { getFormatServiceJsonLd } from "@/lib/jsonld";
import Script from "next/script";
import { TheGoldenVoiceClient } from "./TheGoldenVoiceClient";
import { SITE_URL } from "@/lib/constants";
import { FormatBookingCTA } from "@/components/events/FormatBookingCTA";
import { FormatFAQ } from "@/components/sections/FormatFAQ";

export const metadata = buildFormatMetadata({
    title: "The Golden Voice",
    description: "Sali sul palco di The Golden Voice. Partecipa al concorso canoro Torino più ambizioso.",
    slug: "the-golden-voice",
    image: "https://blackbullslab.com/images/brand/service-performance.webp",
    keywords: ["concorso canoro Torino", "talent show Torino", "singing contest Torino"],
});

export default function TheGoldenVoicePage() {
    const serviceLd = getFormatServiceJsonLd({
        name: "The Golden Voice",
        description: "Un contest canoro dove ogni spettatore è un giudice. Vota le performance in tempo reale tramite la nostra Web App dedicata.",
        image: `${SITE_URL}/images/brand/service-performance.webp`,
        url: `${SITE_URL}/format/the-golden-voice`,
        price: 0,
    });
    return (
        <>
            <Script
                id="jsonld-event"
                type="application/ld+json"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
            />
            <TheGoldenVoiceClient />

            <FormatFAQ />

            <FormatBookingCTA formatName="The Golden Voice" />
        </>
    );
}
