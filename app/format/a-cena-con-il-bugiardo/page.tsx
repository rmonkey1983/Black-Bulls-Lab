import { buildFormatMetadata } from "@/lib/metadata";
import { getFormatServiceJsonLd, getCustomFaqJsonLd } from "@/lib/jsonld";
import Script from "next/script";
import { ACenaConIlBugiardoClient } from "./ACenaConIlBugiardoClient";
import { SITE_URL } from "@/lib/constants";
import { FormatFAQ } from "@/components/sections/FormatFAQ";

export const metadata = buildFormatMetadata({
    title: "A Cena Con Il Bugiardo",
    description: "Chi riesce a ingannare tutti vince. Dinner show interattivo a Torino: trova il bugiardo al tavolo.",
    slug: "a-cena-con-il-bugiardo",
    keywords: ["a cena con il bugiardo", "social deception dinner show", "dinner show torino"],
});

const BUGIARDO_FAQS = [
  {
    question: "Come funziona l'interazione? Devo alzarmi, parlare in pubblico o recitare?",
    answer: "Assolutamente no. Non c'è alcun obbligo di recitazione e nessuno ti metterà in imbarazzo davanti alla sala. Il gioco si svolge interamente seduto al tuo tavolo e tramite il tuo smartphone. Sei libero di interagire, sospettare e allearti con i tuoi amici o vicini di tavolo in modo del tutto spontaneo e informale."
  },
  {
    question: "Devo scaricare o installare un'applicazione sul mio telefono?",
    answer: "No. Non serve installare alcuna app dallo store e non occupi memoria sul telefono. Ti basterà inquadrare con la fotocamera il codice QR che troverai al tuo tavolo per accedere in un attimo alla nostra web app protetta direttamente dal tuo browser di navigazione."
  },
  {
    question: "Il gioco disturba la cena? Riuscirò a mangiare in tranquillità?",
    answer: "Il format è stato progettato e testato per integrarsi perfettamente con i tempi della cena e del locale. Il gioco e l'invio degli indizi avvengono durante gli intervalli tra una portata e l'altra. Quando arrivano i piatti caldi, il gioco si ferma per lasciarti assaporare il cibo e chiacchierare in tutta serenità."
  },
  {
    question: "Posso partecipare da solo o in coppia, oppure serve un gruppo numeroso?",
    answer: "Puoi partecipare tranquillamente da solo o in coppia. In questi casi, verrai unito ad altri partecipanti per formare un tavolo di gioco. È un'ottima opportunità per socializzare, stringere alleanze e divertirsi insieme fin da subito."
  },
  {
    question: "Che differenza c'è con una classica Cena con Delitto?",
    answer: "Nelle cene con delitto classiche ci sono attori che recitano una storia e tu assisti come spettatore passivo. In 'A Cena con il Bugiardo' sei tu il protagonista attivo. Non ci sono attori: le indagini, i sospetti e gli intrighi si sviluppano in tempo reale direttamente tra voi commensali al tavolo."
  },
  {
    question: "Cosa è incluso nel prezzo del biglietto?",
    answer: "Il prezzo del biglietto indicato nel calendario è tutto incluso: comprende sia la cena completa (con menù e bevande indicati nella data specifica) sia l'accesso completo alla piattaforma web di gioco per tutta la durata dell'esperienza."
  }
];

export default function ACenaConIlBugiardoPage() {
    const serviceLd = getFormatServiceJsonLd({
        name: "A Cena Con Il Bugiardo",
        description: "Un gioco di inganni e deduzioni durante la cena. Usa la Web App per ricevere indizi segreti e smascherare il bugiardo al tuo tavolo.",
        image: `${SITE_URL}/images/brand/bg-hero-wide.webp`,
        url: `${SITE_URL}/format/a-cena-con-il-bugiardo`,
        price: 50,
    });

    const faqLd = getCustomFaqJsonLd(BUGIARDO_FAQS);

    return (
        <>
            <Script
                id="jsonld-event"
                type="application/ld+json"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
            />
            <Script
                id="jsonld-format-faq"
                type="application/ld+json"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
            />
            <ACenaConIlBugiardoClient />
            <FormatFAQ items={BUGIARDO_FAQS} />
        </>
    );
}
