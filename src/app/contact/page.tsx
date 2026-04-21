import { Metadata } from "next";
import { ContactClient } from "./ContactClient";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Contatti | Richiedi Info e Preventivi",
    description: "Hai domande sui nostri dinner show o vuoi organizzare un evento aziendale a Torino? Scrivici per ricevere una proposta su misura per le tue esigenze",
    alternates: { canonical: `${SITE_URL}/contact` },
    openGraph: {
        title: "Contatti | Richiedi Info e Preventivi | Black Bulls Lab",
        description: "Hai domande sui nostri dinner show o vuoi organizzare un evento aziendale a Torino? Scrivici per ricevere una proposta su misura per le tue esigenze",
        url: `${SITE_URL}/contact`,
        images: [{ url: "/images/brand/bg-hero-wide.webp", width: 1200, height: 630, alt: "Contatti | Black Bulls Lab" }],
    },
};

export default function ContactPage() {
    return <ContactClient />;
}
