import { ACenaConIlBugiardoClient } from "./ACenaConIlBugiardoClient";
import { buildFormatMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/constants";

export const metadata = buildFormatMetadata({
  title: "A Cena con il Bugiardo",
  description: "Una cena. Un bugiardo. Nessun attore. Entra nella lista d’attesa per la sessione pilota a Torino.",
  slug: "a-cena-con-il-bugiardo",
  keywords: ["A Cena con il Bugiardo", "esperienza sociale Torino", "cena interattiva"],
});

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "A Cena con il Bugiardo",
  "provider": {
    "@type": "Organization",
    "name": "Black Bulls Lab",
    "url": SITE_URL
  },
  "serviceType": "Cena interattiva",
  "areaServed": {
    "@type": "City",
    "name": "Torino"
  },
  "description": "Esperienza sociale e cena interattiva senza attori basata sulla fiducia, sulla deduzione sociale e sul gioco dal tavolo.",
  "url": `${SITE_URL}/format/a-cena-con-il-bugiardo`,
  "image": `${SITE_URL}/images/brand/bg-hero-wide.webp`
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    ["Cos’è A Cena con il Bugiardo?", "È una cena interattiva creata da Black Bulls Lab a Torino. Ricevi informazioni riservate, interagisci al tavolo e provi a capire chi sta mentendo."],
    ["È una cena con delitto?", "No. Non devi risolvere un omicidio: devi capire chi sta mentendo."],
    ["Ci sono attori?", "No. Il format non usa attori."],
    ["Devo recitare?", "No. Non servono esperienza, costumi o battute: devi parlare, ascoltare e decidere."],
    ["Posso venire da solo?", "Sì. Puoi partecipare da solo, in coppia o con un gruppo."],
    ["Quanto dura?", "La durata non è ancora confermata per la sessione pilota. Sarà comunicata insieme a data e location."],
    ["Quante persone partecipano?", "La sessione pilota è prevista per 30–40 partecipanti."],
    ["Posso usare lo smartphone?", "Non sono state ancora comunicate regole definitive sull’uso dello smartphone."],
    ["Come funziona la lista d’attesa?", "Non paghi ora. Ti comunicheremo successivamente data, location e apertura delle prenotazioni."],
  ].map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

export default function ACenaConIlBugiardoPage() {
  return (
    <>
      <script
        id="jsonld-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        id="jsonld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ACenaConIlBugiardoClient />
    </>
  );
}
