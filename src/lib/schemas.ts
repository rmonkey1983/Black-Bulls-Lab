import { SITE_URL, SITE_NAME, CONTACT_PHONE, CONTACT_EMAIL, SOCIAL_LINKS } from "./constants";

/**
 * ============================================================================
 * JSON-LD SCHEMA BUILDERS FOR BLACK BULLS LAB (blackbullslab.com)
 * ============================================================================
 * 
 * These helper functions build compliant, valid JSON-LD schemas.
 * Validation target: Google Rich Results Test (https://search.google.com/test/rich-results)
 */

/**
 * Canonical organization schema.
 * Creates an Organization schema.
 * Impact: General brand identification.
 * 
 * @returns Valid JSON-LD string
 */
export function buildOrganizationSchema(): string {
    // Validation constraint: Must contain brand URL and name.
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        "name": SITE_NAME,
        "alternateName": "BBL",
        "url": SITE_URL,
        "logo": `${SITE_URL}/brand/bbl-logo-horizontal.webp`,
        "description": "Black Bulls Lab è un laboratorio di Torino che progetta format ed esperienze dal vivo per pubblico, aziende, privati e location.",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": CONTACT_PHONE,
            "email": CONTACT_EMAIL,
            "contactType": "customer service",
            "availableLanguage": "Italian"
        },
        "sameAs": [
            SOCIAL_LINKS.instagram,
            SOCIAL_LINKS.facebook,
            SOCIAL_LINKS.tiktok
        ]
    };
    return JSON.stringify(schema, null, 2);
}

/**
 * 3. buildEventSchema
 * Creates an Event schema.
 * Impact: Event details show up in Google search carousel.
 * 
 * @param date - Start date/time ISO string (e.g. 2026-06-20T19:30:00+02:00)
 * @param title - Name of the event format
 * @param price - Ticket price in Euros
 * @param slots - Max capacity (optional)
 * @returns Valid JSON-LD string
 */
export function buildEventSchema(
    date: string,
    title: string,
    price: number,
    slots?: number
): string {
    // Validation constraint: Google requires event attendance mode, status, and offers for tickets.
    const schema = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": title,
        "description": `${title} — Un'esperienza immersiva di Black Bulls Lab a Torino.`,
        "startDate": date,
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "eventStatus": "https://schema.org/EventScheduled",
        "typicalAgeRange": "18+",
        "location": {
            "@type": "Place",
            "name": "Black Bulls Lab - Torino",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Torino",
                "addressRegion": "TO",
                "postalCode": "10100",
                "addressCountry": "IT"
            }
        },
        "image": `${SITE_URL}/images/brand/bg-hero-wide.webp`,
        "url": `${SITE_URL}/format/${title.toLowerCase().replace(/\s+/g, "-")}`,
        "organizer": {
            "@type": "Organization",
            "name": SITE_NAME,
            "url": SITE_URL
        },
        "offers": {
            "@type": "Offer",
            "price": price > 0 ? price.toString() : "50.00",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock",
            "url": `${SITE_URL}/calendario`
        },
        ...(slots ? { "maximumAttendeeCapacity": slots } : {})
    };
    return JSON.stringify(schema, null, 2);
}

/**
 * 4. buildFAQSchema
 * Creates an FAQPage schema.
 * Impact: FAQ toggle Accordion displays in search results.
 * 
 * @param questions - Array of questions and answers
 * @returns Valid JSON-LD string
 */
export function buildFAQSchema(
    questions: Array<{ q: string; a: string }>
): string {
    // Validation constraint: Must contain Question elements with acceptedAnswer inside.
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": questions.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.a
            }
        }))
    };
    return JSON.stringify(schema, null, 2);
}

/**
 * 5. buildArticleSchema
 * Creates an Article schema (BlogPosting).
 * Impact: News, blogs, and articles carousel formatting.
 * 
 * @param title - Article headline
 * @param author - Author name
 * @param publishDate - Published date (YYYY-MM-DD)
 * @param content - Full text of the article
 * @returns Valid JSON-LD string
 */
export function buildArticleSchema(
    title: string,
    author: string,
    publishDate: string,
    content: string
): string {
    // Validation constraint: Must contain author (Person/Org) and publisher info.
    const plainTextBody = content
        .replace(/<[^>]*>/g, "") // remove simple HTML
        .replace(/[#*`[\]()]/g, "") // remove Markdown symbols
        .trim();

    const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": title,
        "datePublished": publishDate,
        "dateModified": publishDate,
        "author": {
            "@type": "Person",
            "name": author,
            "url": author === "Julian Halili" ? "https://instagram.com/blackbullslab" : SITE_URL
        },
        "publisher": {
            "@type": "Organization",
            "name": SITE_NAME,
            "url": SITE_URL,
            "logo": {
                "@type": "ImageObject",
                "url": `${SITE_URL}/brand/bbl-logo-horizontal.webp`
            }
        },
        "image": `${SITE_URL}/images/brand/bg-hero-wide.webp`,
        "articleBody": plainTextBody,
        "keywords": "Dinner Show, Eventi Immersivi, Torino, Intrattenimento"
    };
    return JSON.stringify(schema, null, 2);
}

/**
 * 6. buildReviewSchema
 * Creates a Review schema.
 * Impact: Star rating stars displayed in search snippets.
 * 
 * @param author - Reviewer's name
 * @param rating - Numeric rating (1-5)
 * @param text - Review description text
 * @returns Valid JSON-LD string
 */
export function buildReviewSchema(
    author: string,
    rating: number,
    text: string
): string {
    // Validation constraint: Must contain itemReviewed and rating bounds.
    const schema = {
        "@context": "https://schema.org",
        "@type": "Review",
        "author": {
            "@type": "Person",
            "name": author
        },
        "reviewRating": {
            "@type": "Rating",
            "ratingValue": rating.toString(),
            "bestRating": "5",
            "worstRating": "1"
        },
        "reviewBody": text,
        "itemReviewed": {
            "@type": "EntertainmentBusiness",
            "name": SITE_NAME,
            "image": `${SITE_URL}/images/brand/bg-hero-wide.webp`,
            "telephone": CONTACT_PHONE,
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Torino",
                "addressCountry": "IT"
            }
        }
    };
    return JSON.stringify(schema, null, 2);
}
