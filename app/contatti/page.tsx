import { Metadata } from "next";
import { ContattiClient } from "./ContattiClient";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Contatti | La Tua Prossima Esperienza Inizia Qui",
    description: "Entra nel Sistema. Dinner show immersivi, giochi interattivi e format live progettati per lasciare il segno. Parla con il team di Black Bulls Lab Torino.",
    alternates: { canonical: `${SITE_URL}/contatti` },
    openGraph: {
        title: "Contatti | Black Bulls Lab",
        description: "Entra nel Sistema. Dinner show immersivi, giochi interattivi e format live progettati per lasciare il segno. Parla con il team di Black Bulls Lab Torino.",
        url: `${SITE_URL}/contatti`,
        images: [{ url: "/images/brand/bg-hero-wide.webp", width: 1200, height: 630, alt: "Contatti | Black Bulls Lab" }],
    },
};

export default function ContattiPage() {
    return <ContattiClient />;
}
