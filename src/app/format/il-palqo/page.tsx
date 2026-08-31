import { buildFormatMetadata } from "@/lib/metadata";
import { getFormatServiceJsonLd } from "@/lib/jsonld";
import { IlPalqoClient } from "./IlPalqoClient";
import { SITE_URL } from "@/lib/constants";
import { FormatBookingCTA } from "@/components/events/FormatBookingCTA";
import { FormatFAQ } from "@/components/sections/FormatFAQ";

const PALQO_FAQS = [
    { question: "Che cos’è Il PalQo?", answer: "È un dinner & show live con stand-up, improvvisazione, conduzione e interazione con il pubblico." },
    { question: "Il pubblico partecipa?", answer: "Sì. L’interazione con il pubblico fa parte del format e della serata." },
    { question: "Come partecipa il pubblico?", answer: "L’interazione con il pubblico fa parte del format; modalità e dettagli dipendono dalla serata." },
    { question: "Dove si svolge?", answer: "Il PalQo è un format di Black Bulls Lab con focus su Torino e Piemonte." },
];

export const metadata = buildFormatMetadata({
    title: "Il PalQo",
    description: "Il PalQo è un dinner & show live con stand-up, improvvisazione, conduzione e interazione con il pubblico a Torino.",
    slug: "il-palqo",
    image: "https://blackbullslab.com/images/brand/vibe-live-jazz.webp",
    keywords: ["serate live Torino", "musica dal vivo Torino", "stand-up comedy Torino"],
});

export default function IlPalqoPage() {
    const serviceLd = getFormatServiceJsonLd({
        name: "Il PalQo",
        description: "Un dinner & show live con stand-up, improvvisazione, conduzione e interazione con il pubblico a Torino.",
        image: `${SITE_URL}/images/brand/bg-stage-lights.webp`,
        url: `${SITE_URL}/format/il-palqo`,
        serviceType: "Dinner & show live",
    });
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
            <IlPalqoClient />
            
            <FormatFAQ items={PALQO_FAQS} />

            <FormatBookingCTA formatName="Il Palqo" />
        </>
    );
}
