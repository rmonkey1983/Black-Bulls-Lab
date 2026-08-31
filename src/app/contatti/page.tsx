import { Metadata } from "next";
import { ContattiClient } from "./ContattiClient";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Contatti a Torino",
    description: "Contatta Black Bulls Lab a Torino per informazioni su format ed esperienze dal vivo, eventi aziendali, feste private e collaborazioni con location.",
    alternates: { canonical: `${SITE_URL}/contatti` },
    openGraph: {
        title: "Contatti | Black Bulls Lab a Torino",
        description: "Contatta Black Bulls Lab a Torino per informazioni su format ed esperienze dal vivo, eventi aziendali, feste private e collaborazioni con location.",
        url: `${SITE_URL}/contatti`,
        images: [{ url: "/images/brand/bg-hero-wide.webp", width: 1200, height: 630, alt: "Contatti | Black Bulls Lab" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Contatti | Black Bulls Lab a Torino",
        description: "Contatta Black Bulls Lab a Torino per format ed esperienze dal vivo.",
        images: ["/images/brand/bg-hero-wide.webp"],
    },
};

export default function ContattiPage() {
    return <ContattiClient />;
}
