import { buildFormatMetadata } from "@/lib/metadata";
import { TheGoldenVoiceClient } from "./TheGoldenVoiceClient";
import { FormatFAQ } from "@/components/sections/FormatFAQ";

const GOLDEN_VOICE_FAQS = [
    { question: "Che cos’è The Golden Voice?", answer: "È un concorso canoro di Black Bulls Lab, ancora in fase di creazione." },
    { question: "Quando si svolge?", answer: "Le date non sono ancora definite. Saranno comunicate insieme a sede e regolamento." },
    { question: "Come posso partecipare?", answer: "Se canti, puoi lasciare i tuoi dati e un brano con il modulo in questa pagina. Requisiti e modalità di selezione saranno comunicati quando saranno definiti." },
    { question: "Dove si svolgerà?", answer: "Il focus di Black Bulls Lab è Torino e Piemonte. La sede non è ancora definita." },
];

export const metadata = buildFormatMetadata({
    title: "The Golden Voice: concorso canoro a Torino",
    description: "The Golden Voice è il concorso canoro di Black Bulls Lab, in preparazione a Torino. Se canti, lascia il tuo interesse: date e regolamento sono in definizione.",
    slug: "the-golden-voice",
    image: "https://blackbullslab.it/images/brand/service-performance.webp",
    keywords: ["concorso canoro Torino"],
});

export default function TheGoldenVoicePage() {
    return (
        <>
            <TheGoldenVoiceClient />

            <FormatFAQ items={GOLDEN_VOICE_FAQS} />
        </>
    );
}
