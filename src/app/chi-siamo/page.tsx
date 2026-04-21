import { Metadata } from "next";
import { AboutClient } from "./AboutClient";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Chi Siamo | I Registi dell'Intrattenimento",
    description: "Incontra Julian Halili, Manuel Epifani e il team di Black Bulls Lab. Progettiamo dinner show e eventi immersivi a Torino con un approccio creativo unico",
    alternates: { canonical: `${SITE_URL}/chi-siamo` },
    openGraph: {
        title: "Chi Siamo | I Registi dell'Intrattenimento | Black Bulls Lab",
        description: "Incontra Julian Halili, Manuel Epifani e il team di Black Bulls Lab. Progettiamo dinner show e eventi immersivi a Torino con un approccio creativo unico",
        url: `${SITE_URL}/chi-siamo`,
        images: [{ url: "/images/brand/bg-stage-lights.webp", width: 1200, height: 630, alt: "Chi Siamo | Black Bulls Lab" }],
    },
};

export default function AboutPage() {
    return <AboutClient />;
}
