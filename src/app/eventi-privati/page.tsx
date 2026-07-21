import { PrivateEventsClient } from "./PrivateEventsClient";
import { baseMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { getCustomFaqJsonLd } from "@/lib/jsonld";
import Script from "next/script";
import { FormatFAQ } from "@/components/sections/FormatFAQ";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Feste Private, Compleanni e Lauree Torino | Black Bulls Lab",
  description: "Organizza una festa privata indimenticabile a Torino. Cene con delitto, giochi di ruolo interattivi per compleanni, feste di laurea ed eventi privati originali.",
  keywords: [
    "feste private torino",
    "organizzare compleanno torino",
    "idee festa di laurea torino",
    "cena con delitto privata torino",
    "feste di compleanno originali torino",
    "eventi privati torino",
    "festa a tema torino",
    "locali per feste private torino"
  ],
  alternates: {
    canonical: "https://blackbullslab.com/eventi-privati",
  },
};

const PRIVATE_PARTY_FAQS = [
  {
    question: "Come funziona l'organizzazione di una festa privata (compleanno, laurea)?",
    answer: "Scegli il format che preferisci (es. A Cena con il Bugiardo o Cena con Delitto) e la data. Ci occupiamo noi dell'allestimento di gioco, della tecnologia e dell'intrattenimento. Se hai già una location (ristorante, sala, casa) veniamo noi, altrimenti possiamo consigliarti uno dei nostri locali partner a Torino."
  },
  {
    question: "Qual è il numero minimo di invitati per organizzare una festa privata?",
    answer: "I nostri format per eventi privati sono ideati per gruppi a partire da 15 partecipanti. Non c'è un limite massimo: possiamo gestire feste intime così come grandi eventi con oltre 100 invitati adattando la logica di gioco."
  },
  {
    question: "È possibile personalizzare l'esperienza per il festeggiato o il laureato?",
    answer: "Sì, questo è il nostro punto di forza. Possiamo inserire all'interno della trama del gioco o dello spettacolo dettagli reali, aneddoti divertenti, passioni e segreti del festeggiato o del laureato, rendendolo il vero protagonista dell'evento a sua insaputa!"
  },
  {
    question: "Quanto costa organizzare una festa privata con Black Bulls Lab?",
    answer: "Il costo dipende dal numero di partecipanti, dalla location e dal livello di personalizzazione richiesto. Offriamo preventivi trasparenti e modulari senza costi nascosti. Richiedi un preventivo gratuito e ti risponderemo con una proposta dettagliata entro 24 ore."
  },
  {
    question: "Dobbiamo occuparci noi degli aspetti tecnologici del gioco?",
    answer: "Assolutamente no. Il nostro staff gestisce tutta la regia tecnica dell'evento (audio, luci e attivazione della piattaforma web di gioco). Ai tuoi invitati servirà solo il proprio smartphone con connessione internet per inquadrare il QR code al tavolo e iniziare a giocare."
  }
];

export default function PrivateEventsPage() {
  const faqLd = getCustomFaqJsonLd(PRIVATE_PARTY_FAQS);
  return (
    <>
      <Script
        id="jsonld-private-faq"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <PrivateEventsClient />
      <FormatFAQ items={PRIVATE_PARTY_FAQS} />
    </>
  );
}
