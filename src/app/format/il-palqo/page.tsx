import { buildFormatMetadata } from "@/lib/metadata";
import { getFormatServiceJsonLd } from "@/lib/jsonld";
import { IlPalqoClient } from "./IlPalqoClient";
import { SITE_URL } from "@/lib/constants";
import { FormatFAQ } from "@/components/sections/FormatFAQ";

const PALQO_FAQS = [
    { question: "Che cos’è Il PalQo?", answer: "È un dinner & show live con stand-up, improvvisazione, conduzione e interazione con il pubblico." },
    { question: "Il pubblico partecipa?", answer: "Sì. L’interazione con il pubblico fa parte del format; modalità e dettagli dipendono dalla serata." },
    { question: "Dove si svolge?", answer: "A Torino e in Piemonte. La location dipende dalla singola serata." },
    { question: "Come scopro le prossime date?", answer: "Le date pubbliche vengono pubblicate nel calendario. Puoi anche scriverci su WhatsApp." },
    { question: "Posso portare Il PalQo a un evento o nel mio locale?", answer: "Puoi chiedere un preventivo: valutiamo insieme gruppo, spazio e modalità." },
];

export const metadata = buildFormatMetadata({
    title: "Il PalQo: dinner & show a Torino",
    description: "Il PalQo è un dinner & show live con stand-up, improvvisazione, conduzione e interazione con il pubblico a Torino.",
    slug: "il-palqo",
    image: "https://blackbullslab.it/images/brand/vibe-live-jazz.webp",
    keywords: ["stand-up comedy Torino", "dinner show Torino"],
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
        </>
    );
}
