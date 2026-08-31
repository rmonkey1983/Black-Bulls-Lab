import type { Metadata } from "next";
import { PrivateEventsClient } from "./PrivateEventsClient";
import { PRIVATE_PARTY_FAQS } from "./privateContent";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Feste private a Torino",
  description: "Black Bulls Lab crea format ed esperienze dal vivo per feste private a Torino e in Piemonte, con invitati protagonisti.",
  alternates: { canonical: `${SITE_URL}/eventi-privati` },
  openGraph: {
    title: "Feste private a Torino | Black Bulls Lab",
    description: "Format ed esperienze dal vivo per compleanni, lauree e feste private a Torino.",
    url: `${SITE_URL}/eventi-privati`,
    images: [{ url: `${SITE_URL}/images/brand/bg-hero-wide.webp`, width: 1200, height: 630, alt: "Feste private a Torino — Black Bulls Lab" }],
  },
};

export default function PrivateEventsPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PRIVATE_PARTY_FAQS.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Feste private a Torino",
    description: "Format ed esperienze dal vivo per feste private a Torino e Piemonte.",
    provider: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "Black Bulls Lab", url: SITE_URL },
    areaServed: [{ "@type": "City", name: "Torino" }, { "@type": "AdministrativeArea", name: "Piemonte" }],
    serviceType: "Format ed esperienze dal vivo per feste private",
    url: `${SITE_URL}/eventi-privati`,
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /><PrivateEventsClient /></>;
}
