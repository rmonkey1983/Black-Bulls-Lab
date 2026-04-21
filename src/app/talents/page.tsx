import { Metadata } from "next";
import { TalentsClient } from "./TalentsClient";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Artisti e Performer | Unisciti al Lab",
    description: "Incontra i talenti di Black Bulls Lab a Torino. Sei un artista o un performer? Unisciti al nostro laboratorio e crea con noi eventi indimenticabili",
    alternates: { canonical: `${SITE_URL}/talents` },
    openGraph: {
        title: "Artisti e Performer | Unisciti al Lab | Black Bulls Lab",
        description: "Incontra i talenti di Black Bulls Lab a Torino. Sei un artista o un performer? Unisciti al nostro laboratorio e crea con noi eventi indimenticabili",
        url: `${SITE_URL}/talents`,
        images: [{ url: "/images/brand/bg-stage-lights.webp", width: 1200, height: 630, alt: "Artisti | Black Bulls Lab" }],
    },
};

export default function TalentsPage() {
    return <TalentsClient />;
}
