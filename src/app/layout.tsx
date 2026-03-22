import type { Metadata, Viewport } from "next";
import { Mohave, Outfit, Rock_Salt } from "next/font/google";
import { RamaHeader } from "@/components/rama/RamaHeader";
import { RamaFooter } from "@/components/rama/RamaFooter";
import { OrganizationSchema, WebSiteSchema, LocalBusinessSchema } from "@/components/seo/JsonLd";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Preloader } from "@/components/layout/Preloader";
import { MobileStickyBookButton } from "@/components/layout/MobileStickyBookButton";
import "./globals.css";

// Force rebuild: ESE Redesign active

const mohave = Mohave({
  variable: "--font-mohave",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const rockSalt = Rock_Salt({
  weight: "400",
  variable: "--font-rock-salt",
  subsets: ["latin"],
});

const SITE_URL = "https://blackbullslab.it";
const SITE_NAME = "Black Bulls Lab";
const DEFAULT_DESCRIPTION =
  "Stanco dei soliti locali a Torino? Scopri Black Bulls Lab: un'esperienza immersiva tra gastronomia, spettacolo dal vivo e socialità. Prenota la tua serata.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dinner Show & Cena con Spettacolo a Torino | Black Bulls Lab",
    template: "%s | Black Bulls Lab",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "cena con spettacolo torino", "dinner show torino", "locali particolari torino",
    "eventi aziendali torino", "location team building torino", "cena aziendale divertente torino",
    "cosa fare di diverso a torino la sera", "idee regalo cena torino", "stand up comedy torino"
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  manifest: "/manifest.json",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Black Bulls Lab — Esperienze tra Cucina e Spettacolo",
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Black Bulls Lab — Esperienze Immersive a Torino",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Black Bulls Lab — Esperienze tra Cucina e Spettacolo",
    description: DEFAULT_DESCRIPTION,
    images: ["/og-image.jpg"],
  },
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
    apple: "/apple-touch-icon.png",
  },
  category: "entertainment",
};

export function generateViewport(): Viewport {
  return {
    themeColor: "#0A0A0A",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <head>
      </head>
      <body
        className={`${mohave.variable} ${outfit.variable} ${rockSalt.variable} font-outfit antialiased text-rama-text min-h-screen relative selection:bg-rama-accent selection:text-black flex flex-col`}
      >
        <RamaHeader />
        <Preloader />
        <main className="flex-grow relative z-10 w-full">
          {children}
        </main>
        <RamaFooter />
        <MobileStickyBookButton />
        <SmoothScroll />
        <OrganizationSchema />
        <WebSiteSchema />
        <LocalBusinessSchema />
      </body>
    </html>
  );
}
