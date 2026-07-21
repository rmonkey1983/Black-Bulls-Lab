import { buildFormatMetadata } from "@/lib/metadata";
import { getFormatServiceJsonLd, getCustomFaqJsonLd } from "@/lib/jsonld";
import { ACenaConIlBugiardoClient } from "./ACenaConIlBugiardoClient";
import { SITE_URL } from "@/lib/constants";

export const metadata = buildFormatMetadata({
    title: "A Cena Con Il Bugiardo | Dinner Show",
    description: "Il nuovo Dinner & Show immersivo targato Black Bulls Lab. Entra in lista per smascherare il bugiardo.",
    slug: "a-cena-con-il-bugiardo",
    keywords: ["a cena con il bugiardo", "dinner show", "social deception", "black bulls lab"],
});

const BUGIARDO_FAQS = [
  {
    question: "Ci sono attori professionisti?",
    answer: "No, i protagonisti e gli investigatori siete voi. Tutti i partecipanti al tavolo sono giocatori attivi del Dinner & Show."
  },
  {
    question: "Devo saper recitare?",
    answer: "Assolutamente no. Non c'è alcuna pressione o palcoscenico: devi semplicemente mentire, fare domande o scoprire chi sta dicendo il falso direttamente dal tuo tavolo."
  },
  {
    question: "Cosa mi serve per giocare?",
    answer: "Ti serve solo il tuo smartphone con una connessione internet attiva. Non devi scaricare alcuna applicazione: accederai al sistema inquadrando il QR code al tavolo."
  },
  {
    question: "Come funziona l'estrazione della cena gratuita e il regolamento?",
    answer: "Per partecipare all'estrazione di una cena per 2 persone, devi iscriverti alla White List. L'iniziativa è valida solo per i nuovi utenti: il sistema verificherà che Nome, Cognome ed Email non siano già presenti nel database. L'estrazione avverrà esattamente 1 settimana prima della data dell'evento. Il vincitore sarà contattato tramite i recapiti lasciati nel modulo."
  }
];

export default function ACenaConIlBugiardoPage() {
    const serviceLd = getFormatServiceJsonLd({
        name: "A Cena Con Il Bugiardo",
        description: "Il nuovo Dinner & Show immersivo targato Black Bulls Lab. Entra in lista per smascherare il bugiardo.",
        image: `${SITE_URL}/images/brand/bg-hero-wide.webp`,
        url: `${SITE_URL}/format/a-cena-con-il-bugiardo`,
        price: 50,
    });

    const faqLd = getCustomFaqJsonLd(BUGIARDO_FAQS);

    return (
        <>
            <script
                id="jsonld-event"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
            />
            <script
                id="jsonld-format-faq"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
            />
            <ACenaConIlBugiardoClient />
        </>
    );
}
