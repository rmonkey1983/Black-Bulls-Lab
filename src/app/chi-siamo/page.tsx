import { Metadata } from "next";
import { AboutClient } from "./AboutClient";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Chi Siamo | Black Bulls Lab - Team di Produzione Eventi",
    description: "Siamo i Black Bulls Lab. Scopri il team dietro i dinner show più esclusivi di Torino. Dagli architetti dell'intrattenimento all'eccellenza culinaria.",
    alternates: { canonical: `${SITE_URL}/chi-siamo` },
    openGraph: {
        title: "Chi Siamo | Black Bulls Lab - Team di Produzione Eventi",
        description: "Siamo i Black Bulls Lab. Scopri il team dietro i dinner show più esclusivi di Torino. Dagli architetti dell'intrattenimento all'eccellenza culinaria.",
        url: `${SITE_URL}/chi-siamo`,
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Chi Siamo - Black Bulls Lab" }],
    },
};

export default function AboutPage() {
    return <AboutClient />;
}
