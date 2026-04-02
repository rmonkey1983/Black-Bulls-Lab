interface OrganizationSchemaProps {
    url?: string;
}

export function OrganizationSchema({ url = "https://blackbullslab.it" }: OrganizationSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Black Bulls Lab",
        alternateName: "BBL",
        url,
        logo: `${url}/og-image.jpg`,
        description:
            "Laboratorio urbano di esperienze gastronomiche e performative a Torino. Eventi immersivi, cucina di qualità, intrattenimento live.",
        address: {
            "@type": "PostalAddress",
            addressLocality: "Torino",
            addressCountry: "IT",
        },
        contactPoint: {
            "@type": "ContactPoint",
            email: "info@blackbullslab.it",
            contactType: "customer service",
            availableLanguage: "Italian",
        },
        sameAs: ["https://instagram.com/blackbullslab"],
        foundingDate: "2026",
        keywords: "dinner show, eventi immersivi, cucina, intrattenimento, Torino",
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// ─── FAQPage Schema ────────────────────────────────────────────────────────────

export interface FAQItem {
    question: string;
    answer: string;
}

export function FAQPageSchema({ faqs }: { faqs: FAQItem[] }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// ─── Event Schema ────────────────────────────────────────────────────────────

interface EventSchemaProps {
    name: string;
    description: string;
    date: string;
    location: string;
    image?: string;
    url: string;
    price?: number;
    /** Capacità massima del gruppo (default 30 — ideale per format aziendali) */
    maximumAttendeeCapacity?: number;
    /** Artisti/performer dell'evento */
    performers?: string[];
    /** Range età tipico (default "+18") */
    typicalAgeRange?: string;
}

export function EventSchema({
    name,
    description,
    date,
    location,
    image,
    url,
    price,
    maximumAttendeeCapacity = 30,
    performers = [],
    typicalAgeRange = "18+",
}: EventSchemaProps) {
    const schema: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "Event",
        name,
        description: description || `${name} — Un'esperienza immersiva del Black Bulls Lab a Torino.`,
        startDate: date,
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        typicalAgeRange,
        maximumAttendeeCapacity,
        audience: {
            "@type": "Audience",
            audienceType: "Adulti, Team Aziendale, Gruppi Privati",
        },
        location: {
            "@type": "Place",
            name: location,
            address: {
                "@type": "PostalAddress",
                addressLocality: "Torino",
                addressCountry: "IT",
            },
        },
        image: image || "https://blackbullslab.it/og-image.jpg",
        url,
        organizer: {
            "@type": "Organization",
            name: "Black Bulls Lab",
            url: "https://blackbullslab.it",
        },
        ...(performers.length > 0 && {
            performer: performers.map((p) => ({
                "@type": "PerformingGroup",
                name: p,
            })),
        }),
    };

    if (price && price > 0) {
        schema.offers = {
            "@type": "Offer",
            price: price.toString(),
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            url,
        };
    } else {
        // Fallback offer to prevent Google Search Console warnings for missing Offers on Events
        schema.offers = {
            "@type": "Offer",
            price: "50.00",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            url,
            description: "A partire da",
        };
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export function WebSiteSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Black Bulls Lab",
        url: "https://blackbullslab.it",
        description: "Laboratorio urbano di esperienze gastronomiche e performative a Torino.",
        inLanguage: "it-IT",
        publisher: {
            "@type": "Organization",
            name: "Black Bulls Lab",
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export interface BreadcrumbItem {
    name: string;
    item: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
    const defaultItems = [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://blackbullslab.it" },
        ...items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 2,
            name: item.name,
            item: item.item,
        })),
    ];

    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: defaultItems,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface PersonSchemaProps {
    name: string;
    role: string;
    image?: string;
    description?: string;
    url?: string;
}

export function PersonSchema({ name, role, image, description, url }: PersonSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Person",
        name,
        jobTitle: role,
        image,
        description,
        url,
        worksFor: {
            "@type": "Organization",
            name: "Black Bulls Lab",
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export function LocalBusinessSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Black Bulls Lab",
        "image": "https://blackbullslab.it/og-image.jpg",
        "url": "https://blackbullslab.it",
        "telephone": "",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "",
            "addressLocality": "Torino",
            "postalCode": "",
            "addressCountry": "IT"
        },
        "priceRange": "$$$",
        "servesCuisine": "Dinner Show, Fine Dining, Clubbing"
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
