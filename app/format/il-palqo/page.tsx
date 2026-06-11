import { buildFormatMetadata } from "@/lib/metadata";
import { getFormatServiceJsonLd } from "@/lib/jsonld";
import Script from "next/script";
import { IlPalqoClient } from "./IlPalqoClient";
import { SITE_URL } from "@/lib/constants";
import { FormatBookingCTA } from "@/components/events/FormatBookingCTA";
import { FormatFAQ } from "@/components/sections/FormatFAQ";

export const metadata = buildFormatMetadata({
    title: "Il PalQo",
    description: "Vivi Il PalQo: tre atti di musica e stand-up. Le migliori serate live Torino con artisti emergenti.",
    slug: "il-palqo",
    image: "https://blackbullslab.com/images/brand/vibe-live-jazz.webp",
    keywords: ["serate live Torino", "musica dal vivo Torino", "stand-up comedy Torino"],
});

export default function IlPalqoPage() {
    const serviceLd = getFormatServiceJsonLd({
        name: "Il PalQo",
        description: "Un palcoscenico interattivo dove il pubblico vota le performance live tramite Web App. Musica, teatro e arti performative a Torino.",
        image: `${SITE_URL}/images/brand/bg-stage-lights.webp`,
        url: `${SITE_URL}/format/il-palqo`,
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
            <IlPalqoClient />
            
            <FormatFAQ />

            <FormatBookingCTA formatName="Il Palqo" />
        </>
    );
}
