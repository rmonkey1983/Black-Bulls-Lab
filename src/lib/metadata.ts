/**
 * lib/metadata.ts
 * Metadata Next.js 14 unificati per BBL.
 * Risolve: Twitter image ≠ OG image, title inconsistenti, og:description con "mockumentary".
 */

import type { Metadata } from "next";
import { SITE_NAME, SITE_URL as BASE_URL } from "./constants";

const OG_IMAGE  = `${BASE_URL}/images/brand/bg-hero-wide.webp`; // unico file per OG + Twitter

// ─── Metadata base (ereditato da tutte le pagine) ────────────────────────────

export const baseMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  authors: [{ name: "Julian Halili", url: BASE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/brand/logo-full.jpg",
  },
  openGraph: {
    siteName: SITE_NAME,
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@blackbullslab",
    creator: "@blackbullslab",
  },
};

// ─── Homepage ────────────────────────────────────────────────────────────────

export const homepageMetadata: Metadata = {
  ...baseMetadata,
  title: "Dinner Show Torino e Eventi Immersivi | Black Bulls Lab",
  description:
    "Scopri Black Bulls Lab a Torino: Dinner Show interattivi, Cena con Delitto e format immersivi unici. Prenota ora la tua serata.",
  keywords: [
    "dinner show Torino",
    "eventi immersivi Torino",
    "cena spettacolo Torino",
    "team building creativo Torino",
    "cena con delitto Torino",
    "A Cena Con Il Bugiardo",
    "Il PalQo",
    "cosa fare a Torino",
    "intrattenimento aziendale Torino",
  ],
  openGraph: {
    ...baseMetadata.openGraph,
    title: "Dinner Show Torino e Eventi Immersivi | Black Bulls Lab",
    description:
      "Esperienze interattive uniche a Torino. Dinner show immersivi, Cena con Delitto e serate che trasformano gli ospiti in protagonisti.",
    url: BASE_URL,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Black Bulls Lab — Dinner Show Torino",
      },
    ],
  },
  twitter: {
    ...baseMetadata.twitter,
    title: "Dinner Show Torino e Eventi Immersivi | Black Bulls Lab",
    description:
      "Esperienze interattive uniche a Torino. Dinner show immersivi e serate indimenticabili.",
    images: [OG_IMAGE], // ← era /images/brand/bg-hero-wide.webp, ora allineato all'OG
  },
  alternates: {
    canonical: BASE_URL,
  },
};

// ─── Pagina Corporate (/eventi-aziendali) ────────────────────────────────────

export const corporateMetadata: Metadata = {
  ...baseMetadata,
  // FIX: era "Area Corporate — Black Bulls Lab" nel <title> e diverso nell'H1
  // Ora title, og:title e H1 sono allineati sulla keyword "team building Torino"
  title: "Team Building e Eventi Aziendali a Torino | Black Bulls Lab",
  description:
    "Organizza il tuo evento aziendale a Torino con Black Bulls Lab. Dinner show, team building esperienziale e serate corporate su misura. Preventivo gratuito.",
  keywords: [
    "team building Torino",
    "eventi aziendali Torino",
    "cena aziendale Torino",
    "dinner show corporate",
    "intrattenimento aziendale Torino",
  ],
  openGraph: {
    ...baseMetadata.openGraph,
    title: "Team Building e Eventi Aziendali a Torino | Black Bulls Lab",
    description:
      "Dinner show e format immersivi per eventi aziendali a Torino. Esperienza chiavi in mano da 45€/persona.",
    url: `${BASE_URL}/eventi-aziendali`,
    images: [
      {
        url: `${BASE_URL}/images/brand/bg-stage-lights.webp`,
        width: 1200,
        height: 630,
        alt: "Black Bulls Lab — Team Building Torino",
      },
    ],
  },
  twitter: {
    ...baseMetadata.twitter,
    title: "Team Building e Eventi Aziendali a Torino | Black Bulls Lab",
    images: [`${BASE_URL}/images/brand/bg-stage-lights.webp`],
  },
  alternates: {
    canonical: `${BASE_URL}/eventi-aziendali`,
  },
};

// ─── Helper generico per pagine format (/format/[slug]) ──────────────────────

interface FormatMetaProps {
  title: string;
  description: string;
  slug: string;
  image?: string;
  keywords?: string[];
}

export function buildFormatMetadata({
  title,
  description,
  slug,
  image = OG_IMAGE,
  keywords = [],
}: FormatMetaProps): Metadata {
  const fullTitle = `${title} | Black Bulls Lab`;
  const url       = `${BASE_URL}/format/${slug}`;
  return {
    ...baseMetadata,
    title: fullTitle,
    description,
    keywords: ["dinner show Torino", "eventi immersivi Torino", ...keywords],
    openGraph: {
      ...baseMetadata.openGraph,
      title: fullTitle,
      description,
      url,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      ...baseMetadata.twitter,
      title: fullTitle,
      description,
      images: [image],
    },
    alternates: { canonical: url },
  };
}

// ─── Utilizzo nelle singole pagine ───────────────────────────────────────────
/*
  // app/page.tsx
  import { homepageMetadata } from "@/lib/metadata";
  export const metadata = homepageMetadata;

  // app/eventi-aziendali/page.tsx
  import { corporateMetadata } from "@/lib/metadata";
  export const metadata = corporateMetadata;
  // RICORDA: allinea anche l'<h1> nella pagina con:
  // <h1>Team Building e Eventi Aziendali a Torino</h1>

  // app/format/cena-con-delitto/page.tsx
  import { buildFormatMetadata } from "@/lib/metadata";
  export const metadata = buildFormatMetadata({
    title: "Cena Con Delitto",
    description: "Un omicidio. Una cena. Un solo colpevole — se riesci a trovarlo. Dinner show investigativo a Torino.",
    slug: "cena-con-delitto",
    image: "https://blackbullslab.com/images/brand/bg-stage-lights.webp",
    keywords: ["cena con delitto Torino", "dinner show investigativo"],
  });

  // app/format/a-cena-con-il-bugiardo/page.tsx
  export const metadata = buildFormatMetadata({
    title: "A Cena Con Il Bugiardo",
    description: "Chi riesce a ingannare tutti vince. Dinner show interattivo a Torino: trova il bugiardo al tavolo.",
    slug: "a-cena-con-il-bugiardo",
    keywords: ["a cena con il bugiardo", "social deception dinner show"],
  });
*/
