import type { Metadata, Viewport } from "next";
import { Mohave, Outfit, Rock_Salt, Inter } from "next/font/google";
import { RamaHeader } from "@/components/rama/RamaHeader";
import { RamaFooter } from "@/components/rama/RamaFooter";
import { EntertainmentBusinessSchema, WebSiteSchema, FAQPageSchema } from "@/components/seo/JsonLd";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Preloader } from "@/components/layout/Preloader";
import { MobileStickyBookButton } from "@/components/layout/MobileStickyBookButton";
import { WhatsAppWidget } from "@/components/layout/WhatsAppWidget";
import { BackToTop } from "@/components/layout/BackToTop";
import { GSAPInitializer } from "@/components/layout/GSAPInitializer";
import { PageTransition } from "@/components/layout/PageTransition";
import { CONTACT_EMAIL, SITE_URL, SITE_NAME } from "@/lib/constants";
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

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const rockSalt = Rock_Salt({
  weight: "400",
  variable: "--font-rock-salt",
  subsets: ["latin"],
});

const DEFAULT_DESCRIPTION =
  "Siamo l'agenzia Black Bulls Lab: format immersivi, cena spettacolo e team building aziendale. Eventi indimenticabili dove il vero protagonista sei tu.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Creatori di Emozioni e Dinner Show Esclusivi | Black Bulls",
    template: "%s | Black Bulls Lab",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "agenzia eventi", "creazione dinner show", "format immersivi",
    "eventi aziendali creativi", "organizzazione spettacoli", "intrattenimento su misura",
    "agenzia spettacolo", "dinner show aziendale", "team building esperienziale",
    // Keyword geo-locali Torino
    "dinner show Torino", "eventi aziendali Torino", "cena con delitto Torino",
    "organizzazione eventi Torino", "team building Torino", "cena spettacolo Torino",
    "a cena con il bugiardo Torino", "il palqo Torino", "the golden voice Torino", "format cena teatro Torino", "esperienze interattive"
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
    title: "Creatori di Emozioni e Dinner Show Esclusivi | Black Bulls",
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Black Bulls Lab | Creatori di Emozioni",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Creatori di Emozioni e Dinner Show Esclusivi | Black Bulls",
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
    icon: "/brand/logo-white.svg",
    apple: "/brand/logo-full.jpg",
  },
  category: "entertainment",
};

export function generateViewport(): Viewport {
  return {
    themeColor: "#0A0A0A",
    colorScheme: "dark",
  };
}

import { BackgroundWrapper } from "@/components/layout/BackgroundWrapper";

import { CustomCursor } from "@/components/layout/CustomCursor";
import { ScrollProgress } from "@/components/layout/ScrollProgress";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <head />
      <body
        className={`${outfit.variable} ${inter.variable} ${mohave.variable} ${rockSalt.variable} font-sans antialiased text-white min-h-screen relative selection:bg-rama-accent selection:text-black flex flex-col bg-zinc-950`}
      >
        <CustomCursor />
        <ScrollProgress />
        <GSAPInitializer />
        <BackgroundWrapper />
        <RamaHeader />
        
        {/* Skip to main content */}
        <a
          href="#main-content"
          suppressHydrationWarning
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-6 focus:py-3 focus:bg-rama-accent focus:text-black focus:font-heading focus:font-bold focus:uppercase focus:tracking-widest focus:rounded-sm focus:shadow-lg"
        >
          Salta al contenuto principale
        </a>
        
        <Preloader />
        
        <main id="main-content" className="flex-grow relative z-10 w-full">
          <PageTransition>
            {children}
          </PageTransition>
        </main>

        <RamaFooter />
        
        <MobileStickyBookButton />
        <WhatsAppWidget />
        <BackToTop />
        <SmoothScroll />
        
        <EntertainmentBusinessSchema />
        <WebSiteSchema />
        <FAQPageSchema faqs={[
          { question: "Come funziona una serata Black Bulls Lab?", answer: "Arrivi, ti siedi, e diventi parte dello show. I nostri format immersivi coinvolgono ogni ospite direttamente — non sei spettatore, sei protagonista. Ogni serata dura circa 3 ore tra cena e spettacolo." },
          { question: "Quante persone partecipano a ogni serata?", answer: "Max 20-30 persone per serata. La dimensione ridotta è parte del format: garantisce coinvolgimento totale e un'atmosfera unica che i grandi eventi non possono replicare." },
          { question: "Dove si svolgono le serate?", answer: "A Torino, in location selezionate in base al format. La sede viene comunicata al momento della prenotazione." },
          { question: "Come prenoto una serata?", answer: "Compila il form su /contact oppure scrivici su WhatsApp. Risposta garantita entro 24h. I posti sono limitati: prima prenoti, meglio è." },
          { question: "Organizzate eventi aziendali o privati?", answer: "Sì. Tutti i format sono replicabili per eventi corporate, team building, feste private. Contattaci per un preventivo personalizzato." },
          { question: "Qual è il prezzo a persona?", answer: "Dipende dal format e dalla location. Contattaci per il dettaglio — lavoriamo sempre su preventivo trasparente senza sorprese." },
          { question: "Devo avere esperienze teatrali o particolari abilità?", answer: "Zero. I nostri format sono progettati per funzionare con chiunque — timidi inclusi. Ci pensiamo noi a tirarti in ballo." },
        ]} />
      </body>
    </html>
  );
}
