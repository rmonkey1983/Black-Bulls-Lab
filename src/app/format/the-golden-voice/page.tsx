import { buildFormatMetadata } from "@/lib/metadata";
import { getFormatServiceJsonLd } from "@/lib/jsonld";
import { TheGoldenVoiceClient } from "./TheGoldenVoiceClient";
import { SITE_URL } from "@/lib/constants";
import { FormatBookingCTA } from "@/components/events/FormatBookingCTA";
import { FormatFAQ } from "@/components/sections/FormatFAQ";

const GOLDEN_VOICE_FAQS = [
    { question: "Che cos’è The Golden Voice?", answer: "È un format musicale live con cantanti e partecipazione del pubblico alla valutazione." },
    { question: "Il pubblico partecipa?", answer: "Sì. Il pubblico partecipa alla valutazione delle performance durante l’esperienza." },
    { question: "Chi può partecipare?", answer: "Il format coinvolge cantanti e pubblico; modalità e requisiti vengono comunicati per ogni esperienza." },
    { question: "Dove si svolge?", answer: "The Golden Voice è un format di Black Bulls Lab con focus su Torino e Piemonte." },
];

export const metadata = buildFormatMetadata({
    title: "The Golden Voice",
    description: "The Golden Voice è un format musicale live con cantanti e partecipazione del pubblico alla valutazione a Torino.",
    slug: "the-golden-voice",
    image: "https://blackbullslab.com/images/brand/service-performance.webp",
    keywords: ["concorso canoro Torino", "talent show Torino", "singing contest Torino"],
});

export default function TheGoldenVoicePage() {
    const serviceLd = getFormatServiceJsonLd({
        name: "The Golden Voice",
        description: "Un format musicale live con cantanti e partecipazione del pubblico alla valutazione a Torino.",
        image: `${SITE_URL}/images/brand/service-performance.webp`,
        url: `${SITE_URL}/format/the-golden-voice`,
        serviceType: "Format musicale live",
    });
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
            <TheGoldenVoiceClient />

            <FormatFAQ items={GOLDEN_VOICE_FAQS} />

            <FormatBookingCTA formatName="The Golden Voice" />
        </>
    );
}
