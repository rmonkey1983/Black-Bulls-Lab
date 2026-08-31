import { buildFormatMetadata } from "@/lib/metadata";
import { getFormatServiceJsonLd } from "@/lib/jsonld";
import { CenaConDelittoClient } from "./CenaConDelittoClient";
import { SITE_URL } from "@/lib/constants";
import { FormatBookingCTA } from "@/components/events/FormatBookingCTA";
import { FormatFAQ } from "@/components/sections/FormatFAQ";

const CENA_DELITTO_FAQS = [
    { question: "Che cos’è Cena con Delitto?", answer: "È un’esperienza investigativa classica separata dai format identitari di Black Bulls Lab." },
    { question: "Qual è l’obiettivo?", answer: "Seguire il caso e ricostruire ciò che è accaduto durante la cena." },
    { question: "È un format BBL?", answer: "È un’esperienza disponibile nell’offerta, distinta dai format proprietari identitari BBL." },
    { question: "Dove si svolge?", answer: "La proposta ha focus su Torino e Piemonte; modalità e location dipendono dalla singola esperienza." },
];

export const metadata = buildFormatMetadata({
    title: "Cena Con Delitto",
    description: "Cena con Delitto è un’esperienza investigativa classica disponibile a Torino, separata dai format identitari Black Bulls Lab.",
    slug: "cena-con-delitto",
    image: "https://blackbullslab.com/images/brand/bg-stage-lights.webp",
    keywords: ["cena con delitto Torino", "dinner show investigativo"],
});

export default function CenaConDelittoPage() {
    const serviceLd = getFormatServiceJsonLd({
        name: "Cena Con Delitto",
        description: "Un’esperienza investigativa classica in cui il pubblico segue il caso e prova a ricostruire ciò che è accaduto durante la cena.",
        image: `${SITE_URL}/images/brand/bg-venue-crowd.webp`,
        url: `${SITE_URL}/format/cena-con-delitto`,
        serviceType: "Esperienza investigativa classica",
    });
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
            <CenaConDelittoClient />
            
            <FormatFAQ items={CENA_DELITTO_FAQS} />

            <FormatBookingCTA formatName="Cena con Delitto" />
        </>
    );
}
