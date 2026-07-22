import { buildFormatMetadata } from "@/lib/metadata";
import { getFormatServiceJsonLd } from "@/lib/jsonld";
import Script from "next/script";
import { CenaConDelittoClient } from "./CenaConDelittoClient";
import { SITE_URL } from "@/lib/constants";
import { FormatBookingCTA } from "@/components/events/FormatBookingCTA";
import { FormatFAQ } from "@/components/sections/FormatFAQ";

export const metadata = buildFormatMetadata({
    title: "Cena Con Delitto",
    description: "Un omicidio. Una cena. Un solo colpevole — se riesci a trovarlo. Dinner show investigativo a Torino.",
    slug: "cena-con-delitto",
    image: "https://blackbullslab.com/images/brand/bg-stage-lights.webp",
    keywords: ["cena con delitto Torino", "dinner show investigativo"],
});

export default function CenaConDelittoPage() {
    const serviceLd = getFormatServiceJsonLd({
        name: "Cena Con Delitto",
        description: "Un giallo interattivo dove ogni ospite è un detective. Usa la nostra Web App per raccogli indizi e risolvere il caso durante la cena.",
        image: `${SITE_URL}/images/brand/bg-venue-crowd.webp`,
        url: `${SITE_URL}/format/cena-con-delitto`,
        price: 50,
    });
    return (
        <>
            <Script
                id="jsonld-event"
                type="application/ld+json"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
            />
            <CenaConDelittoClient />
            
            <FormatFAQ />

            <FormatBookingCTA formatName="Cena con Delitto" />
        </>
    );
}
