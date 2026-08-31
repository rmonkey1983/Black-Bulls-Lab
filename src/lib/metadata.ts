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
    apple: "/brand/bbl-monogram.webp",
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
  title: "Esperienze dal vivo a Torino | Black Bulls Lab",
  description:
    "Format ed esperienze dal vivo a Torino in cui il pubblico è parte attiva: A Cena con il Bugiardo, eventi privati, aziende e location.",
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
    title: "Esperienze dal vivo a Torino | Black Bulls Lab",
    description:
      "Esperienze dal vivo e format proprietari a Torino per pubblico, aziende, eventi privati e location.",
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
  title: "Team building ed eventi aziendali a Torino",
  description:
    "Black Bulls Lab progetta team building ed eventi aziendali a Torino basati su format dal vivo, interazione tra partecipanti, regia e dinamiche sociali.",
  keywords: [
    "team building immersivo",
    "eventi aziendali interattivi",
    "dinner show aziendale",
    "eventi corporate",
    "esperienze immersive per aziende",
    "eventi aziendali Torino",
    "eventi esperienziali",
    "team building Torino",
    "cena aziendale Torino",
    "intrattenimento aziendale Torino",
  ],
  openGraph: {
    ...baseMetadata.openGraph,
    title: "Team building ed eventi aziendali a Torino | Black Bulls Lab",
    description:
      "Format dal vivo per team building, cene aziendali ed eventi interni a Torino.",
    url: `${BASE_URL}/eventi-aziendali`,
    images: [
      {
        url: `${BASE_URL}/images/brand/bg-stage-lights.webp`,
        width: 1200,
        height: 630,
        alt: "Black Bulls Lab — Team Building Immersivo e Eventi Aziendali",
      },
    ],
  },
  twitter: {
    ...baseMetadata.twitter,
    title: "Team building ed eventi aziendali a Torino | Black Bulls Lab",
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
    // Root layout appends the canonical brand template.
    title,
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
