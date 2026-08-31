import { SITE_URL, SITE_NAME, CONTACT_EMAIL, CONTACT_PHONE, SOCIAL_LINKS } from "@/lib/constants";

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

// ─── WebSite Schema ───────────────────────────────────────────────────────────

export function WebSiteSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        description: "Dinner show e format eventi immersivi a Torino. A Cena Con Il Bugiardo, Il PalQo, Cena Con Delitto e THE GOLDEN VOICE.",
        inLanguage: "it-IT",
        publisher: {
            "@type": "Organization",
            "@id": `${SITE_URL}/#organization`,
            name: SITE_NAME,
        },
        potentialAction: {
            "@type": "SearchAction",
            target: `${SITE_URL}/blog?search={search_term_string}`,
            "query-input": "required name=search_term_string",
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
        image: `${SITE_URL}/images/brand/bg-hero-wide.webp`,
        logo: `${SITE_URL}/brand/bbl-logo-horizontal.webp`,
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
        "@id": `${SITE_URL}/#business`,
        name: SITE_NAME,
        url: SITE_URL,
        telephone: CONTACT_PHONE,
        email: CONTACT_EMAIL,
        image: `${SITE_URL}/images/brand/bg-hero-wide.webp`,
        logo: `${SITE_URL}/brand/bbl-logo-horizontal.webp`,
        description: "Black Bulls Lab crea dinner show interattivi, cena con delitto, format immersivi e team building aziendali a Torino.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Torino",
          addressRegion: "Piemonte",
          addressCountry: "IT"
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "45.0703",
          longitude: "7.6869"
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Torino e Piemonte"
        },
        priceRange: "€€",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Format Black Bulls Lab",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "A Cena Con Il Bugiardo",
                description: "Dinner show di social deception con web app interattiva."
              }
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Cena Con Delitto",
                description: "Cena spettacolo investigativa con indizi e attori dal vivo."
              }
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Team building aziendale",
                description: "Eventi corporate immersivi per aziende e gruppi."
              }
            }
          ]
        },
        sameAs: [
          SOCIAL_LINKS.instagram,
          SOCIAL_LINKS.facebook,
          SOCIAL_LINKS.tiktok
        ]
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
