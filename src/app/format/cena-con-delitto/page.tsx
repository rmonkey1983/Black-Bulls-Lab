import { buildFormatMetadata } from "@/lib/metadata";
import { getFormatServiceJsonLd } from "@/lib/jsonld";
import { CenaConDelittoClient } from "./CenaConDelittoClient";
import { SITE_URL } from "@/lib/constants";
import { FormatFAQ } from "@/components/sections/FormatFAQ";

const CENA_DELITTO_FAQS = [
    { question: "Che cos’è la Cena con Delitto di Black Bulls Lab?", answer: "È una cena con un’indagine: durante la serata segui un caso, raccogli gli indizi e provi a ricostruire l’accaduto." },
    { question: "Qual è l’obiettivo?", answer: "Seguire il caso e ricostruire ciò che è accaduto durante la cena." },
    { question: "In cosa è diversa da A Cena con il Bugiardo?", answer: "Nella Cena con Delitto ricostruisci un caso. In A Cena con il Bugiardo devi capire chi, al tavolo, sta mentendo." },
    { question: "Dove si svolge?", answer: "A Torino e in Piemonte. Location e modalità dipendono dalla singola serata." },
    { question: "Come scopro le prossime date?", answer: "Le date pubbliche vengono pubblicate nel calendario. Puoi anche scriverci su WhatsApp." },
    { question: "Posso organizzarla per un’azienda o una festa privata?", answer: "Puoi chiedere un preventivo: valutiamo insieme gruppo, location e modalità." },
];

export const metadata = buildFormatMetadata({
    title: "Cena con Delitto a Torino",
    description: "Cena con Delitto a Torino con Black Bulls Lab: segui il caso, raccogli gli indizi e ricostruisci l’accaduto durante la cena. Date pubbliche e preventivi.",
    slug: "cena-con-delitto",
    image: "https://blackbullslab.com/images/brand/bg-stage-lights.webp",
    keywords: ["cena con delitto Torino"],
});

export default function CenaConDelittoPage() {
    const serviceLd = getFormatServiceJsonLd({
        name: "Cena con Delitto",
        description: "Una cena con un’indagine in cui i partecipanti seguono il caso e provano a ricostruire ciò che è accaduto.",
        image: `${SITE_URL}/images/brand/bg-venue-crowd.webp`,
        url: `${SITE_URL}/format/cena-con-delitto`,
        serviceType: "Cena con delitto",
    });
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
            <CenaConDelittoClient />
            
            <FormatFAQ items={CENA_DELITTO_FAQS} />
        </>
    );
}
