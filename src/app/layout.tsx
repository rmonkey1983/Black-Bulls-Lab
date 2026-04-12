import type { Metadata, Viewport } from "next";
import { Mohave, Outfit, Rock_Salt } from "next/font/google";
import { RamaHeader } from "@/components/rama/RamaHeader";
import { RamaFooter } from "@/components/rama/RamaFooter";
import { OrganizationSchema, WebSiteSchema, LocalBusinessSchema, FAQPageSchema } from "@/components/seo/JsonLd";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Preloader } from "@/components/layout/Preloader";
import { MobileStickyBookButton } from "@/components/layout/MobileStickyBookButton";
import { WhatsAppWidget } from "@/components/layout/WhatsAppWidget";
import { BackToTop } from "@/components/layout/BackToTop";
import { GSAPInitializer } from "@/components/layout/GSAPInitializer";
import { PreFooterCTA } from "@/components/layout/PreFooterCTA";
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

const rockSalt = Rock_Salt({
  weight: "400",
  variable: "--font-rock-salt",
  subsets: ["latin"],
});

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
    "agenzia spettacolo", "dinner show aziendale", "team building esperienziale",
    // Keyword geo-locali Torino
    "dinner show Torino", "eventi aziendali Torino", "cena con delitto Torino",
    "organizzazione eventi Torino", "team building Torino", "cena spettacolo Torino",
    "a cena con il bugiardo Torino", "il palqo Torino", "cena con delitto Torino", "the golden voice Torino", "format cena teatro Torino"
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
    colorScheme: "dark",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <head />
      <body
        className={`${mohave.variable} ${outfit.variable} ${rockSalt.variable} font-outfit antialiased text-rama-text min-h-screen relative selection:bg-rama-accent selection:text-black flex flex-col`}
      >
        <GSAPInitializer />
        <RamaHeader />
        {/* Skip to main content — visible on focus for keyboard/screen reader users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-6 focus:py-3 focus:bg-rama-accent focus:text-black focus:font-mohave focus:font-bold focus:uppercase focus:tracking-widest focus:rounded-sm focus:shadow-lg"
        >
          Salta al contenuto principale
        </a>
        <Preloader />
        <main id="main-content" className="flex-grow relative z-10 w-full">
          {children}
        </main>
        <PreFooterCTA />
        <RamaFooter />
        <MobileStickyBookButton />
        <WhatsAppWidget />
        <BackToTop />
        <SmoothScroll />
        <OrganizationSchema />
        <WebSiteSchema />
        <LocalBusinessSchema />
        <FAQPageSchema faqs={[
          { question: "Qual è il dress code per le serate?", answer: "Richiediamo un abbigliamento elegante e curato (Smart Casual / Elegant). Ci riserviamo il diritto di selezione all'ingresso per mantenere l'atmosfera esclusiva del nostro club." },
          { question: "Come funzionano le prenotazioni per la cena spettacolo?", answer: "La prenotazione è fortemente consigliata ed è garantita solo a seguito della nostra conferma. Offriamo sia menu degustazione fissi che soluzioni à-la-carte, a seconda del format della serata." },
          { question: "Posso organizzare un evento privato o aziendale a Torino?", answer: `Certamente. ${SITE_NAME} organizza cene aziendali, team building, dinner show e eventi immersivi a Torino per gruppi di qualsiasi dimensione. I nostri format ufficiali sono A Cena Con Il Bugiardo, Il PalQo, Cena Con Delitto e THE GOLDEN VOICE. Contattaci a ${CONTACT_EMAIL} per un preventivo personalizzato.` },
          { question: "Gestite intolleranze o allergie alimentari?", answer: "Assolutamente sì. Vi chiediamo di comunicare eventuali allergie, intolleranze o scelte dietetiche (vegan/vegetariane) al momento della prenotazione, per permettere al nostro Executive Chef di prepararvi una variante ad hoc." },
          { question: `Quanto costa partecipare a un dinner show di ${SITE_NAME}?`, answer: `I nostri format partono da 50€ a persona, con soluzioni flessibili per gruppi aziendali e privati. Il prezzo include la cena e lo spettacolo immersivo. Contattaci a ${CONTACT_EMAIL} per un preventivo su misura per il tuo gruppo.` },
        ]} />
      </body>
    </html>
  );
}
