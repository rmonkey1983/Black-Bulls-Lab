
import { strategicFaqs } from "@/lib/faqs";

export function FAQSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": strategicFaqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
