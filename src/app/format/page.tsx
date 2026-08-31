import type { Metadata } from "next";
import { FORMAT_FAQS, FormatIndexClient } from "./FormatIndexClient";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Format ed esperienze dal vivo a Torino",
    description: "Scopri le esperienze Black Bulls Lab: format dal vivo per pubblico, aziende, feste private e location a Torino e in Piemonte.",
    alternates: { canonical: `${SITE_URL}/format` },
    openGraph: {
        title: "Format ed esperienze dal vivo a Torino | Black Bulls Lab",
        description: "Format ed esperienze dal vivo per pubblico, aziende, feste private e location a Torino e in Piemonte.",
        url: `${SITE_URL}/format`,
        images: [{ url: "/images/brand/bg-hero-wide.webp", width: 1200, height: 630, alt: "Format | Black Bulls Lab" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Format ed esperienze dal vivo a Torino | Black Bulls Lab",
        description: "Format ed esperienze dal vivo per pubblico, aziende, feste private e location a Torino e in Piemonte.",
        images: ["/images/brand/bg-hero-wide.webp"],
    },
};

export default function FormatPage() {
    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FORMAT_FAQS.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
    };
    const collectionJsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Esperienze Black Bulls Lab",
        description: metadata.description,
        url: `${SITE_URL}/format`,
        about: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "Black Bulls Lab", url: SITE_URL },
        mainEntity: {
            "@type": "ItemList",
            itemListElement: [
                ["A Cena con il Bugiardo", "/format/a-cena-con-il-bugiardo"],
                ["Il PalQo", "/format/il-palqo"],
                ["The Golden Voice", "/format/the-golden-voice"],
                ["Cena con Delitto", "/format/cena-con-delitto"],
            ].map(([name, url], position) => ({ "@type": "ListItem", position: position + 1, name, url: `${SITE_URL}${url}` })),
        },
    };

    return <><script id="format-collection-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} /><script id="format-faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} /><FormatIndexClient /></>;
}
