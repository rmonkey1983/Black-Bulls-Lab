import { Metadata } from "next";
import { CorporateClient } from "./CorporateClient";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Eventi Aziendali Torino | Team Building",
    description: "Rafforza il legame tra i tuoi dipendenti con eventi aziendali Torino unici. Soluzioni di team building immersivo da 45€ per un impatto reale e duraturo",
    alternates: { canonical: `${SITE_URL}/eventi-aziendali` },
    openGraph: {
        title: "Eventi Aziendali Torino | Team Building | Black Bulls Lab",
        description: "Rafforza il legame tra i tuoi dipendenti con eventi aziendali Torino unici. Soluzioni di team building immersivo da 45€ per un impatto reale e duraturo",
        url: `${SITE_URL}/eventi-aziendali`,
        images: [{ url: "/images/brand/bg-venue-crowd.webp", width: 1200, height: 630, alt: "Eventi Aziendali | Black Bulls Lab" }],
    },
};

export default function CorporatePage() {
    return <CorporateClient />;
}
