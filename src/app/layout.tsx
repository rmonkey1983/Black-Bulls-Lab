import type { Metadata, Viewport } from "next";
import { Mohave, Rock_Salt, Inter, Syne } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { EntertainmentBusinessSchema, WebSiteSchema } from "@/components/seo/JsonLd";
import { MobileStickyBookButton } from "@/components/layout/MobileStickyBookButton";
import { ClientOnlyWrappers } from "@/components/layout/ClientOnlyWrappers";
import { WhatsAppWidget } from "@/components/layout/WhatsAppWidget";
import { BackToTop } from "@/components/layout/BackToTop";
import { PageTransition } from "@/components/layout/PageTransition";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SITE_KEYWORDS, CONTACT_PHONE, CONTACT_EMAIL } from "@/lib/constants";
import { buildOrganizationSchema, buildLocalBusinessSchema } from "@/lib/schemas";
import "./globals.css";

const mohave = Mohave({
  variable: "--font-mohave",
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

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const DEFAULT_DESCRIPTION = SITE_DESCRIPTION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Creatori di Emozioni e Dinner Show Esclusivi | Black Bulls",
    template: "%s | Black Bulls Lab",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: SITE_KEYWORDS,
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
        url: "/images/brand/bg-hero-wide.webp",
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
    images: ["/images/brand/bg-hero-wide.webp"],
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


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const address = process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || "Torino, Italia";
  const phone = process.env.NEXT_PUBLIC_BUSINESS_PHONE || CONTACT_PHONE;
  const email = process.env.NEXT_PUBLIC_BUSINESS_EMAIL || CONTACT_EMAIL;

  return (
    <html lang="it" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: buildOrganizationSchema() }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: buildLocalBusinessSchema(address, phone, email) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${mohave.variable} ${rockSalt.variable} ${syne.variable} font-sans antialiased text-white min-h-screen relative selection:bg-accent-gold selection:text-black flex flex-col bg-black-pure`}
      >
        <ClientOnlyWrappers />
        <Navbar />
        
        {/* Skip to main content - Accessibilità */}
        <a
          href="#main-content"
          suppressHydrationWarning
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-200 focus:px-6 focus:py-3 focus:bg-rama-accent focus:text-black focus:font-heading focus:font-bold focus:uppercase focus:tracking-widest focus:rounded-sm focus:shadow-lg"
        >
          Salta al contenuto principale
        </a>
        <main id="main-content" className="grow relative z-10 w-full pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">
          <PageTransition>
            {children}
          </PageTransition>
        </main>

        <Footer />
        
        <MobileStickyBookButton />
        <WhatsAppWidget />
        <BackToTop />
        
        <EntertainmentBusinessSchema />
        <WebSiteSchema />
      </body>
    </html>
  );
}
