import { Metadata } from "next";
import { EventsClient } from "./EventsClient";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Calendario Prossimi Eventi | Black Bulls Lab - Torino",
    description: "Scopri le prossime date dei dinner show del Black Bulls Lab a Torino. Prenota il tuo posto per Cena con Delitto, Il PalQo e molto altro.",
    alternates: { canonical: `${SITE_URL}/events` },
    openGraph: {
        title: "Calendario Prossimi Eventi | Black Bulls Lab - Torino",
        description: "Scopri le prossime date dei dinner show del Black Bulls Lab a Torino. Prenota il tuo posto per Cena con Delitto, Il PalQo e molto altro.",
        url: `${SITE_URL}/events`,
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Eventi Black Bulls Lab" }],
    },
};

export default function EventsPage() {
    return <EventsClient />;
}
