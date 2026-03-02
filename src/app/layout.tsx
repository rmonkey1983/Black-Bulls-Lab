import type { Metadata, Viewport } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { CinematicOverlay } from "@/components/polish/CinematicOverlay";
import { LabBackground } from "@/components/lab/LabBackground";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Black Bulls Lab — Laboratorio di Esperienze",
  description: "Il laboratorio underground dove l'intrattenimento diventa scienza",
  manifest: "/manifest.json",
};

export function generateViewport(): Viewport {
  return {
    themeColor: "#0a0e17",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body
        className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased bg-lab-dark text-white`}
      >
        <LabBackground />
        <CinematicOverlay />
        <Header />
        <main className="min-h-screen pb-20 md:pb-0 md:pt-20 relative z-10">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
