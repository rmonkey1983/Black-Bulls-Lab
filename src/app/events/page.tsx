import { Metadata } from "next";
import { EventsClient } from "./EventsClient";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Calendario Prossimi Eventi | Black Bulls Lab - Torino",
    description: "Stiamo preparando le prossime date. Iscriviti alla waitlist per ricevere l'accesso prioritario ai dinner show del Black Bulls Lab a Torino.",
    alternates: { canonical: `${SITE_URL}/events` },
    openGraph: {
        title: "Calendario Prossimi Eventi | Black Bulls Lab - Torino",
        description: "Stiamo preparando le prossime date. Iscriviti alla waitlist per ricevere l'accesso prioritario ai dinner show del Black Bulls Lab a Torino.",
        url: `${SITE_URL}/events`,
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Eventi Black Bulls Lab" }],
    },
};

export default function EventsPage() {
    return <EventsClient />;
}
