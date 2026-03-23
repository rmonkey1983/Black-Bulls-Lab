import type { Metadata, Viewport } from "next";
import { Mohave, Outfit, Rock_Salt } from "next/font/google";
import { RamaHeader } from "@/components/rama/RamaHeader";
import { RamaFooter } from "@/components/rama/RamaFooter";
import { OrganizationSchema, WebSiteSchema, LocalBusinessSchema } from "@/components/seo/JsonLd";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Preloader } from "@/components/layout/Preloader";
import { MobileStickyBookButton } from "@/components/layout/MobileStickyBookButton";
import { BackToTop } from "@/components/layout/BackToTop";
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
  "Siamo un'agenzia specializzata nella creazione di format, dinner show e spettacoli immersivi. Passione e professionalità per trasformare ogni evento in un'esperienza indimenticabile.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Creatori di Emozioni e Dinner Show Esclusivi | Black Bulls Lab",
    template: "%s | Black Bulls Lab",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "agenzia eventi", "creazione dinner show", "format immersivi",
    "eventi aziendali creativi", "organizzazione spettacoli", "intrattenimento su misura",
    "agenzia spettacolo", "dinner show aziendale", "team building esperienziale"
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
    title: "Black Bulls Lab — Creatori di Emozioni e Dinner Show Esclusivi",
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Black Bulls Lab — L'Agenzia che Crea Emozioni",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Black Bulls Lab — Creatori di Emozioni e Dinner Show Esclusivi",
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
        <BackToTop />
        <SmoothScroll />
        <OrganizationSchema />
        <WebSiteSchema />
        <LocalBusinessSchema />
      </body>
    </html>
  );
}
