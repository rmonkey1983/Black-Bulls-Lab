import { Metadata } from "next";
import { ContactClient } from "./ContactClient";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Contatti e Booking | Black Bulls Lab - Torino",
    description: "Contatta il Black Bulls Lab per prenotare il tuo dinner show a Torino o organizzare un evento aziendale esclusivo. Rispondiamo in tempo reale.",
    alternates: { canonical: `${SITE_URL}/contact` },
    openGraph: {
        title: "Contatti e Booking | Black Bulls Lab - Torino",
        description: "Contatta il Black Bulls Lab per prenotare il tuo dinner show a Torino o organizzare un evento aziendale esclusivo. Rispondiamo in tempo reale.",
        url: `${SITE_URL}/contact`,
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Contatti Black Bulls Lab" }],
    },
};

export default function ContactPage() {
    return <ContactClient />;
}
