import type { Metadata } from "next";
import { FormatIndexClient } from "./FormatIndexClient";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
    title: "I Nostri Format | Le Serate Immersive",
    description: "Dalla Cena con Delitto al social game interattivo. Esplora i format di intrattenimento a Torino che mettono il tuo gruppo al centro della narrazione",
    alternates: { canonical: `${SITE_URL}/format` },
    openGraph: {
        title: "I Nostri Format | Le Serate Immersive | Black Bulls Lab",
        description: "Dalla Cena con Delitto al social game interattivo. Esplora i format di intrattenimento a Torino che mettono il tuo gruppo al centro della narrazione",
        url: `${SITE_URL}/format`,
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Format | Black Bulls Lab" }],
    },
};

export default function FormatPage() {
    return <FormatIndexClient />;
}
