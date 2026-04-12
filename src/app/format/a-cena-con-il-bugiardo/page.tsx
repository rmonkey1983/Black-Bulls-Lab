import type { Metadata } from "next";
import { ACenaConIlBugiardoClient } from "./ACenaConIlBugiardoClient";
import { EventSchema } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/constants";
import { BookingForm } from "@/components/ui/BookingForm";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
    title: "A Cena con il Bugiardo Torino | Black Bulls Lab - Social Deception",
    description: "Il dinner show dell'inganno a Torino. Chi è il bugiardo al tavolo? Scoprilo con la nostra Web App interattiva e indizi segreti. Posti limitati, prenota ora.",
    alternates: { canonical: `${SITE_URL}/format/a-cena-con-il-bugiardo` },
    openGraph: {
        title: "A Cena con il Bugiardo Torino | Black Bulls Lab",
        description: "Il dinner show dell'inganno a Torino. Chi è il bugiardo al tavolo? Scoprilo con la nostra Web App interattiva e indizi segreti.",
        url: `${SITE_URL}/format/a-cena-con-il-bugiardo`,
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "A Cena con il Bugiardo Black Bulls Lab" }],
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

            <section className="py-24 px-6 bg-zinc-950/50">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16">
                        <SectionHeading
                            title="SCOPRI IL"
                            highlight="BUGIARDO"
                            subtitle="Prenota il tuo tavolo per la sfida dell'inganno"
                            align="center"
                        />
                    </div>
                    <BookingForm />
                </div>
            </section>
        </>
    );
}
