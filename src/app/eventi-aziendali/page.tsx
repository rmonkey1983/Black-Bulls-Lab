import { CorporateClient } from "./CorporateClient";
import { CORPORATE_FAQS } from "./corporateContent";
import { SITE_URL } from "@/lib/constants";

import { corporateMetadata } from "@/lib/metadata";
export const metadata = corporateMetadata;

export default function CorporatePage() {
    const serviceSchema = { "@context": "https://schema.org", "@type": "Service", name: "Team building ed eventi aziendali a Torino", description: "Black Bulls Lab progetta team building ed eventi aziendali a Torino basati su format dal vivo, interazione tra partecipanti, regia e dinamiche sociali.", provider: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "Black Bulls Lab", url: SITE_URL }, areaServed: { "@type": "City", name: "Torino", containedInPlace: { "@type": "AdministrativeArea", name: "Piemonte" } }, serviceType: "Team building ed eventi aziendali", url: `${SITE_URL}/eventi-aziendali` };
    const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: CORPORATE_FAQS.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) };
    return <><CorporateClient /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /></>;
}
