import { buildFormatMetadata } from "@/lib/metadata";
import { getFormatServiceJsonLd } from "@/lib/jsonld";
import Script from "next/script";
import { ACenaConIlBugiardoClient } from "./ACenaConIlBugiardoClient";
import { SITE_URL } from "@/lib/constants";

export const metadata = buildFormatMetadata({
    title: "A Cena Con Il Bugiardo",
    description: "Chi riesce a ingannare tutti vince. Dinner show interattivo a Torino: trova il bugiardo al tavolo.",
    slug: "a-cena-con-il-bugiardo",
    keywords: ["a cena con il bugiardo", "social deception dinner show"],
});

export default function ACenaConIlBugiardoPage() {
    const serviceLd = getFormatServiceJsonLd({
        name: "A Cena Con Il Bugiardo",
        description: "Un gioco di inganni e deduzioni durante la cena. Usa la Web App per ricevere indizi segreti e smascherare il bugiardo al tuo tavolo.",
        image: `${SITE_URL}/images/brand/bg-hero-wide.webp`,
        url: `${SITE_URL}/format/a-cena-con-il-bugiardo`,
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
            <ACenaConIlBugiardoClient />
        </>
    );
}
