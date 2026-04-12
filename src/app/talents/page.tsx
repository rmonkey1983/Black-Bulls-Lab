import { Metadata } from "next";
import { TalentsClient } from "./TalentsClient";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Artisti e Performer | Black Bulls Lab - Torino",
    description: "Incontra i talenti del Black Bulls Lab di Torino. Sei un artista, performer o chef? Unisciti al nostro laboratorio e crea con noi eventi indimenticabili.",
    alternates: { canonical: `${SITE_URL}/talents` },
    openGraph: {
        title: "Artisti e Performer | Black Bulls Lab - Torino",
        description: "Incontra i talenti del Black Bulls Lab di Torino. Sei un artista, performer o chef? Unisciti al nostro laboratorio e crea con noi eventi indimenticabili.",
        url: `${SITE_URL}/talents`,
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Artisti Black Bulls Lab" }],
    },
};

export default function TalentsPage() {
    return <TalentsClient />;
}
