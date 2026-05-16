/**
 * lib/jsonld.ts
 * Schema JSON-LD pronti per BBL.
 * Uso: importa la funzione, passa il risultato in <Script> con strategy="beforeInteractive"
 * oppure inseriscilo nel <head> via generateMetadata o layout.tsx
 */

// ─── 1. HOMEPAGE: LocalBusiness + AggregateRating ────────────────────────────

export function getHomepageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EntertainmentBusiness",
        "@id": "https://blackbullslab.com/#business",
        name: "Black Bulls Lab",
        url: "https://blackbullslab.com",
        logo: "https://blackbullslab.com/brand/logo-white.svg",
        image: "https://blackbullslab.com/images/brand/bg-hero-wide.webp",
        description:
          "Dinner Show interattivi, Cena con Delitto e format immersivi unici a Torino.",
        telephone: "+393342010067",
        email: "info@blackbullslab.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Torino",
          addressRegion: "TO",
          addressCountry: "IT",
        },
        sameAs: [
          "https://instagram.com/blackbullslab",
          "https://facebook.com/blackbullslab",
          "https://tiktok.com/@blackbullslab",
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "80",
          bestRating: "5",
          worstRating: "1",
        },
      },
    ],
  };
}

// ─── 2. FAQ PAGE (sezione FAQ homepage) ───────────────────────────────────────

export function getFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Come funziona una serata Black Bulls Lab?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Arrivi, ti siedi, e diventi parte dello show. I nostri format immersivi coinvolgono ogni ospite direttamente — non sei spettatore, sei protagonista. Ogni serata dura circa 3 ore tra cena e spettacolo.",
        },
      },
      {
        "@type": "Question",
        name: "Quante persone partecipano a ogni serata?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Max 20-30 persone per serata. La dimensione ridotta è parte del format: garantisce coinvolgimento totale e un'atmosfera unica che i grandi eventi non possono replicare.",
        },
      },
      {
        "@type": "Question",
        name: "Dove si svolgono le serate?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A Torino, in location selezionate in base al format. La sede viene comunicata al momento della prenotazione.",
        },
      },
      {
        "@type": "Question",
        name: "Come prenoto una serata?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Controlla le prossime date nel calendario su blackbullslab.com/calendario e prenota direttamente online. I posti sono limitati a 20-30 persone.",
        },
      },
      {
        "@type": "Question",
        name: "Organizzate eventi aziendali o privati?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sì. Tutti i format sono replicabili per eventi corporate, team building, feste private. Scrivici su WhatsApp per un preventivo personalizzato.",
        },
      },
      {
        "@type": "Question",
        name: "Qual è il prezzo a persona?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Il prezzo varia in base al format ed è indicato chiaramente nel calendario per ogni singola data. Lavoriamo con prezzi trasparenti tutto incluso.",
        },
      },
    ],
  };
}

// ─── 3. SINGOLO FORMAT: Event schema ─────────────────────────────────────────
// Chiama questa funzione nelle singole pagine /format/[slug]
// Passa i dati reali dall'evento (data, prezzo, posti)

interface EventJsonLdProps {
  name: string;
  description: string;
  image: string;
  url: string;
  startDate: string;       // ISO 8601: "2025-07-20T20:00:00+02:00"
  endDate?: string;
  locationName?: string;
  price: number;
  currency?: string;
  availability?: "InStock" | "SoldOut" | "PreOrder";
  totalSeats?: number;
}

export function getEventJsonLd({
  name,
  description,
  image,
  url,
  startDate,
  endDate,
  locationName = "Torino (location comunicata in fase di prenotazione)",
  price,
  currency = "EUR",
  availability = "InStock",
  totalSeats = 25,
}: EventJsonLdProps) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name,
    description,
    image,
    url,
    startDate,
    ...(endDate ? { endDate } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: locationName,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Torino",
        addressRegion: "TO",
        addressCountry: "IT",
      },
    },
    organizer: {
      "@type": "Organization",
      "@id": "https://blackbullslab.com/#business",
      name: "Black Bulls Lab",
      url: "https://blackbullslab.com",
    },
    offers: {
      "@type": "Offer",
      price: price.toString(),
      priceCurrency: currency,
      availability: `https://schema.org/${availability}`,
      url,
      validFrom: new Date().toISOString(),
    },
    maximumAttendeeCapacity: totalSeats,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "80",
      bestRating: "5",
    },
  };
}

interface FormatServiceJsonLdProps {
  name: string;
  description: string;
  image: string;
  url: string;
  price?: number;
  audience?: string;
}

export function getFormatServiceJsonLd({
  name,
  description,
  image,
  url,
  price,
  audience = "Adulti, gruppi privati e team aziendali",
}: FormatServiceJsonLdProps) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    image,
    url,
    serviceType: "Dinner show immersivo",
    areaServed: {
      "@type": "City",
      name: "Torino",
      addressCountry: "IT",
    },
    audience: {
      "@type": "Audience",
      audienceType: audience,
    },
    provider: {
      "@type": "EntertainmentBusiness",
      "@id": "https://blackbullslab.com/#business",
      name: "Black Bulls Lab",
      url: "https://blackbullslab.com",
    },
    ...(typeof price === "number"
      ? {
          offers: {
            "@type": "Offer",
            price: price.toString(),
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            url,
          },
        }
      : {}),
  };
}

// ─── 4. UTILIZZO in layout.tsx / page.tsx ─────────────────────────────────────
/*
  // In app/page.tsx (homepage):
  import { getHomepageJsonLd, getFaqJsonLd } from "@/lib/jsonld";

  export default function Home() {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getHomepageJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqJsonLd()) }}
        />
        // ... resto del JSX
      </>
    );
  }

  // In app/format/cena-con-delitto/page.tsx (esempio con data reale):
  import { getEventJsonLd } from "@/lib/jsonld";

  export default function CenaConDelittoPage() {
    const eventLd = getEventJsonLd({
      name: "Cena Con Delitto — Black Bulls Lab",
      description: "Un omicidio. Una cena. Un solo colpevole — se riesci a trovarlo. Format investigativo immersivo a Torino.",
      image: "https://blackbullslab.com/images/brand/bg-stage-lights.webp",
      url: "https://blackbullslab.com/format/cena-con-delitto",
      startDate: "2025-07-20T20:00:00+02:00",
      price: 50,
      totalSeats: 25,
    });
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventLd) }}
        />
        // ... resto del JSX
      </>
    );
  }
*/
