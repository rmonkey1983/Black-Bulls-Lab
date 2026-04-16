import { SITE_URL, CONTACT_EMAIL, SITE_NAME, CONTACT_PHONE, SOCIAL_LINKS } from "@/lib/constants";

// ─── Organization Schema ──────────────────────────────────────────────────────

interface OrganizationSchemaProps {
    url?: string;
}

export function OrganizationSchema({ url = SITE_URL }: OrganizationSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        alternateName: "BBL",
        url,
        logo: `${url}/blackbullslab-v2.webp`,
        description:
            "Agenzia specializzata in dinner show e format eventi immersivi a Torino. A Cena Con Il Bugiardo, Il PalQo, Cena Con Delitto e THE GOLDEN VOICE.",
        address: {
            "@type": "PostalAddress",
            addressLocality: "Torino",
            addressCountry: "IT",
        },
        contactPoint: {
            "@type": "ContactPoint",
            telephone: CONTACT_PHONE,
            email: CONTACT_EMAIL,
            contactType: "customer service",
            availableLanguage: "Italian",
        },
        sameAs: ["https://instagram.com/blackbullslab"],
        foundingDate: "2026",
        keywords: "dinner show, eventi immersivi, cucina, intrattenimento, Torino, A Cena Con Il Bugiardo, Il PalQo, Cena Con Delitto, THE GOLDEN VOICE",
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
    maximumAttendeeCapacity?: number;
    performers?: string[];
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
    maximumAttendeeCapacity,
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
        ...(maximumAttendeeCapacity ? { maximumAttendeeCapacity } : {}),
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
        image: image || `${SITE_URL}/og-image.jpg`,
        url,
        organizer: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
        },
        ...(performers.length > 0 && {
            performer: performers.map((p) => ({
                "@type": "PerformingGroup",
                name: p,
            })),
        }),
        offers: {
            "@type": "Offer",
            price: price ? price.toString() : "50.00",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            url,
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// ─── WebSite Schema ───────────────────────────────────────────────────────────

export function WebSiteSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        description: "Dinner show e format eventi immersivi a Torino. A Cena Con Il Bugiardo, Il PalQo, Cena Con Delitto e THE GOLDEN VOICE.",
        inLanguage: "it-IT",
        publisher: {
            "@type": "Organization",
            name: SITE_NAME,
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// ─── Breadcrumb Schema ────────────────────────────────────────────────────────

export interface BreadcrumbItem {
    name: string;
    item: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
    const defaultItems = [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
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

// ─── Person Schema ────────────────────────────────────────────────────────────

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
            name: SITE_NAME,
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// ─── LocalBusiness (EntertainmentBusiness) Schema ─────────────────────────────
// Used on homepage — most impactful for local SEO

export function LocalBusinessSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: SITE_NAME,
        description: "Dinner show e format immersivi a Torino",
        url: SITE_URL,
        telephone: CONTACT_PHONE,
        email: CONTACT_EMAIL,
        image: `${SITE_URL}/og-image.jpg`,
        logo: `${SITE_URL}/brand/logo-white.svg`,
        address: {
            "@type": "PostalAddress",
            addressLocality: "Torino",
            addressRegion: "TO",
            addressCountry: "IT",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: "45.0703",
            longitude: "7.6869",
        },
        priceRange: "€€",
        currenciesAccepted: "EUR",
        paymentAccepted: "Cash, Credit Card",
        openingHoursSpecification: [
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Friday", "Saturday"],
                opens: "19:30",
                closes: "00:00",
            },
        ],
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            bestRating: "5",
            worstRating: "1",
            reviewCount: "80",
        },
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Format Dinner Show",
            itemListElement: [
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Il PalQo",
                        description: "Format immersivo di intrattenimento dove il pubblico diventa protagonista della serata.",
                    },
                    price: "45",
                    priceCurrency: "EUR",
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "A Cena Con Il Bugiardo",
                        description: "Dinner show interattivo dove ogni ospite è sospettato e solo uno è il vero bugiardo.",
                    },
                    price: "55",
                    priceCurrency: "EUR",
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Cena Con Delitto",
                        description: "Dinner show con delitto da risolvere durante la cena. Un giallo interattivo dal vivo.",
                    },
                    price: "50",
                    priceCurrency: "EUR",
                },
            ],
        },
        sameAs: [
            "https://instagram.com/blackbullslab",
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// ─── EntertainmentBusiness + Event Graph Schema ────────────────────────────────

export function EntertainmentBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EntertainmentBusiness",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        telephone: CONTACT_PHONE,
        email: CONTACT_EMAIL,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Torino",
          addressCountry: "IT"
        },
        sameAs: [
          SOCIAL_LINKS.instagram,
          SOCIAL_LINKS.facebook,
          SOCIAL_LINKS.tiktok
        ]
      },
      {
        "@type": "Event",
        "name": `${SITE_NAME} - Dinner Show Immersivo`,
        "location": {
          "@type": "Place",
          "name": `${SITE_NAME} Torino`,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Torino",
            "addressCountry": "IT"
          }
        },
        "organizer": {
          "@id": `${SITE_URL}/#organization`
        },
        "description": "Il laboratorio underground dove l'intrattenimento diventa scienza. Dinner show e format originali a Torino."
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
