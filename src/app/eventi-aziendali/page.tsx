import { Metadata } from "next";
import { CorporateClient } from "./CorporateClient";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Eventi Aziendali Originali Torino | Team Building Immersivo",
    description: "Crea un impatto reale con eventi aziendali originali ed esperienze interattive. Esclusive soluzioni di team building e dinner show privati a Torino.",
    alternates: { canonical: `${SITE_URL}/eventi-aziendali` },
    openGraph: {
        title: "Eventi Aziendali Originali Torino | Team Building Immersivo",
        description: "Crea un impatto reale con eventi aziendali originali ed esperienze interattive. Esclusive soluzioni di team building e dinner show privati a Torino.",
        url: `${SITE_URL}/eventi-aziendali`,
        images: [{ url: "/images/brand/bg-venue-crowd.webp", width: 1200, height: 630, alt: "Eventi Aziendali Originali | Black Bulls Lab" }],
    },
};

export default function CorporatePage() {
    return <CorporateClient />;
}
