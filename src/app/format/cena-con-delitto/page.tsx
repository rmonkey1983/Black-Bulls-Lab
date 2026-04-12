import { Metadata } from "next";
import { CenaConDelittoClient } from "./CenaConDelittoClient";
import { EventSchema } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Cena con Delitto Torino | Black Bulls Lab - Noir Experience",
    description: "Risolvi il mistero con la Cena con Delitto del Black Bulls Lab a Torino. Un'esperienza noir interattiva con Web App dedicata, indizi digitali e colpi di scena. Da 50€.",
    alternates: { canonical: `${SITE_URL}/format/cena-con-delitto` },
    openGraph: {
        title: "Cena con Delitto Torino | Black Bulls Lab",
        description: "Risolvi il mistero con la Cena con Delitto del Black Bulls Lab a Torino. Un'esperienza noir interattiva con Web App dedicata e indizi digitali. Da 50€.",
        url: `${SITE_URL}/format/cena-con-delitto`,
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Cena con Delitto Black Bulls Lab" }],
    },
};

export default function CenaConDelittoPage() {
    return (
        <>
            <EventSchema 
                name="Cena con Delitto — Noir Digital Experience"
                description="Un giallo interattivo dove ogni ospite è un detective. Usa la nostra Web App per raccogli indizi e risolvere il caso durante la cena."
                date="2026-12-31T20:00:00Z" // Placeholder date for generic format
                location="Black Bulls Lab, Torino"
                url={`${SITE_URL}/format/cena-con-delitto`}
                price={50}
                image={`${SITE_URL}/images/brand/bg-venue-crowd.png`}
            />
            <CenaConDelittoClient />
        </>
    );
}
