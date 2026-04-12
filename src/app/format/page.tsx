import type { Metadata } from "next";
import { FormatIndexClient } from "./FormatIndexClient";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Format Dinner Show e Team Building | Black Bulls Lab - Torino",
    description: "Scopri i format esclusivi del Black Bulls Lab di Torino. Dalla Cena con Delitto digitale al social deception di A Cena con il Bugiardo. Esperienze uniche per gruppi.",
    alternates: { canonical: `${SITE_URL}/format` },
    openGraph: {
        title: "Format Dinner Show e Team Building | Black Bulls Lab - Torino",
        description: "Scopri i format esclusivi del Black Bulls Lab di Torino. Dalla Cena con Delitto digitale al social deception di A Cena con il Bugiardo. Esperienze uniche per gruppi.",
        url: `${SITE_URL}/format`,
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Format Black Bulls Lab" }],
    },
};

export default function FormatPage() {
    return <FormatIndexClient />;
}
