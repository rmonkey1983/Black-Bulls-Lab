import type { Metadata } from "next";
import { ACenaConIlBugiardoClient } from "./ACenaConIlBugiardoClient";
import { EventSchema } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
    title: "LIAR SYSTEM | Social Game Experience & Dinner Show Torino",
    description: "La fiducia è un difetto. Entra nel LIAR SYSTEM: il primo dinner show di social deception a Torino dove lo smartphone è la tua arma e ogni ospite è un sospettato.",
    alternates: { canonical: `${SITE_URL}/format/a-cena-con-il-bugiardo` },
    openGraph: {
        title: "LIAR SYSTEM | Social Game Experience & Dinner Show Torino",
        description: "La fiducia è un difetto. Entra nel LIAR SYSTEM: il primo dinner show di social deception a Torino dove lo smartphone è la tua arma e ogni ospite è un sospettato.",
        url: `${SITE_URL}/format/a-cena-con-il-bugiardo`,
        images: [{ url: "/images/brand/liar-system-logo.webp", width: 1200, height: 630, alt: "LIAR SYSTEM | Black Bulls Lab" }],
    },
};

export default function ACenaConIlBugiardoPage() {
    return (
        <>
            <EventSchema 
                name="A Cena con il Bugiardo — Social Deception Experience"
                description="Un gioco di inganni e deduzioni durante la cena. Usa l'app per ricevere indizi segreti e smascherare il bugiardo al tuo tavolo."
                date="2026-12-31T20:30:00Z"
                location="Black Bulls Lab, Torino"
                url={`${SITE_URL}/format/a-cena-con-il-bugiardo`}
                price={50}
                image={`${SITE_URL}/images/brand/bg-hero-wide.webp`}
            />
            <ACenaConIlBugiardoClient />
        </>
    );
}
