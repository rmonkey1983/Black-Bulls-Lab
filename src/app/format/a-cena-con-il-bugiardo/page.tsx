import { Metadata } from "next";
import { ACenaConIlBugiardoClient } from "./ACenaConIlBugiardoClient";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "A Cena con il Bugiardo | Esperienza sociale a Torino",
  description: "Una cena, un bugiardo e nessun attore. Entra nella lista d'attesa per la prima sessione pilota di A Cena con il Bugiardo a Torino.",
  keywords: [
    "A Cena con il Bugiardo",
    "Liar System",
    "Torino",
    "esperienza sociale Torino",
    "bluff psicologico",
    "Black Bulls Lab",
    "cena interattiva"
  ],
  alternates: {
    canonical: `${SITE_URL}/format/a-cena-con-il-bugiardo`,
  },
  openGraph: {
    title: "A Cena con il Bugiardo | Esperienza sociale a Torino",
    description: "Una cena. Un bugiardo. Nessun attore. Di chi ti fidi? Entra in lista d'attesa per la prima sessione pilota di Torino.",
    url: `${SITE_URL}/format/a-cena-con-il-bugiardo`,
    siteName: "Black Bulls Lab",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/brand/bg-hero-wide.webp`,
        width: 1200,
        height: 630,
        alt: "A Cena con il Bugiardo - Un'esperienza Liar System by Black Bulls Lab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "A Cena con il Bugiardo | Esperienza sociale a Torino",
    description: "Una cena. Un bugiardo. Nessun attore. Entra in lista d'attesa per la sessione pilota di Torino.",
    images: [`${SITE_URL}/images/brand/bg-hero-wide.webp`],
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "A Cena con il Bugiardo",
  "provider": {
    "@type": "Organization",
    "name": "Black Bulls Lab",
    "url": SITE_URL
  },
  "serviceType": "Social Deduction & Immersive Dining Experience",
  "areaServed": {
    "@type": "City",
    "name": "Torino"
  },
  "description": "Esperienza sociale e cena interattiva senza attori basata sulla fiducia, sulla deduzione sociale e sul gioco dal tavolo.",
  "url": `${SITE_URL}/format/a-cena-con-il-bugiardo`,
  "image": `${SITE_URL}/images/brand/bg-hero-wide.webp`
};

export default function ACenaConIlBugiardoPage() {
  return (
    <>
      <script
        id="jsonld-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <ACenaConIlBugiardoClient />
    </>
  );
}
