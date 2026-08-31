import type { Metadata } from "next";
import { LocaliPartnerClient } from "./LocaliPartnerClient";
import { PARTNER_FAQS } from "./partnerContent";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Format ed eventi per ristoranti e locali a Torino",
  description: "Black Bulls Lab collabora con ristoranti, bistrot, hotel e location di Torino e Piemonte per ospitare format ed esperienze dal vivo.",
  alternates: { canonical: `${SITE_URL}/locali-partner` },
  openGraph: { title: "Format ed eventi per ristoranti e locali a Torino | Black Bulls Lab", description: "Ospita un format Black Bulls Lab nel tuo ristorante, bistrot, hotel o location.", url: `${SITE_URL}/locali-partner`, images: [{ url: `${SITE_URL}/images/brand/bg-venue-crowd.webp`, width: 1200, height: 630, alt: "Location partner Black Bulls Lab" }] },
  twitter: { card: "summary_large_image", title: "Format ed eventi per ristoranti e locali a Torino | Black Bulls Lab", description: "Ospita format ed esperienze dal vivo Black Bulls Lab a Torino e in Piemonte.", images: [`${SITE_URL}/images/brand/bg-venue-crowd.webp`] },
};

export default function LocaliPartnerPage() {
  const serviceSchema = { "@context": "https://schema.org", "@type": "Service", name: "Format ed eventi per ristoranti e locali a Torino", description: "Black Bulls Lab collabora con ristoranti, bistrot, hotel e location di Torino e Piemonte per ospitare format ed esperienze dal vivo.", provider: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "Black Bulls Lab", url: SITE_URL }, areaServed: [{ "@type": "City", name: "Torino" }, { "@type": "AdministrativeArea", name: "Piemonte" }], serviceType: "Collaborazione con location per format ed eventi", url: `${SITE_URL}/locali-partner` };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: PARTNER_FAQS.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) };
  return <><LocaliPartnerClient /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /></>;
}
