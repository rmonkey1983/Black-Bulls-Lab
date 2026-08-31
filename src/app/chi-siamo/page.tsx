import type { Metadata } from "next";
import { AboutClient, ABOUT_FAQS } from "./AboutClient";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Chi siamo, format ed esperienze dal vivo a Torino",
  description: "Black Bulls Lab è il laboratorio creativo di Torino che progetta format ed esperienze dal vivo per pubblico, aziende, privati e location.",
  alternates: { canonical: `${SITE_URL}/chi-siamo` },
  openGraph: {
    title: "Chi siamo | Black Bulls Lab, format ed esperienze dal vivo a Torino",
    description: "Scopri Black Bulls Lab: format, partecipazione e regia per esperienze dal vivo a Torino e in Piemonte.",
    url: `${SITE_URL}/chi-siamo`,
    images: [{ url: "/images/brand/bg-stage-lights.webp", width: 1200, height: 630, alt: "Black Bulls Lab" }],
  },
};

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SITE_URL}/chi-siamo#about`,
    url: `${SITE_URL}/chi-siamo`,
    name: "Chi siamo | Black Bulls Lab",
    description: "Black Bulls Lab è un laboratorio creativo di Torino che progetta format ed esperienze dal vivo.",
    about: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntity: { "@id": `${SITE_URL}/#organization` },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ABOUT_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <AboutClient />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
