/**
 * BRAND & SITE METADATA
 */
export const SITE_NAME = "Black Bulls Lab";
export const SITE_DESCRIPTION = "Il laboratorio underground dove l'intrattenimento diventa scienza.";
export const SITE_URL = "https://blackbullslab.com";

/**
 * CONTACT INFORMATION
 */
export const CONTACT_EMAIL = "info@blackbullslab.com";
export const CONTACT_PHONE = "+39 334 2010067";
export const CONTACT_WHATSAPP = "393342010067"; // No spaces or symbols for deep links

/**
 * SOCIAL LINKS
 */
export const SOCIAL_LINKS = {
    instagram: "https://instagram.com/blackbullslab",
    facebook: "https://facebook.com/blackbullslab",
    tiktok: "https://tiktok.com/@blackbullslab",
};

/**
 * MAIN NAVIGATION
 */
export const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "Eventi", href: "/events" },
    { name: "I Nostri Format", href: "/format" },
    { name: "Artisti", href: "/talents" },
    { name: "Chi Siamo", href: "/chi-siamo" },
    { name: "Corporate", href: "/eventi-aziendali" },
    { name: "Contact", href: "/contact" },
];

/**
 * EVENT FORMATS (EXPERIMENTAL NIGHTS)
 */
export const EXPERIMENTS = [
    { 
        id: "a-cena-con-il-bugiardo",
        name: "A Cena Con Il Bugiardo", 
        slug: "a-cena-con-il-bugiardo",
        href: "/format/a-cena-con-il-bugiardo", 
        subtitle: "L'inganno è a portata di smartphone.",
        desc: "Web App Interactive Game",
        longDesc: "Il primo dinner show dove la regia del gioco è nel tuo smartphone. Smaschererai l'unico vero bugiardo?",
        image: "/images/brand/service-plating.webp",
        badge: "Digital Experience",
        details: "3 ore · 10-100+ persone · Da 50€/persona",
        price: 50,
        ctaText: "Accedi alla prova",
        ctaHref: `https://wa.me/39${CONTACT_WHATSAPP}?text=Ciao!%20Sono%20interessato%2Fa%20a%20%22A%20Cena%20Con%20Il%20Bugiardo%22.%20Voglio%20saperne%20di%20pi%C3%B9%20sull%27App%21`
    },
    { 
        id: "il-palqo",
        name: "Il PalQo", 
        slug: "il-palqo",
        href: "/format/il-palqo", 
        subtitle: "Social Talent & Digital Voting",
        desc: "Interactive Live Show",
        longDesc: "Il palco dove decidi tu chi merita il plauso, votando in tempo reale tramite la nostra web app.",
        image: "/images/brand/bg-venue-crowd.webp",
        badge: "Social & Live",
        details: "Showcase Aperto · Votazione Live · Ingresso Libero",
        price: 0,
        ctaText: "Voglio partecipare",
        ctaHref: "/events"
    },
    { 
        id: "cena-con-delitto",
        name: "Cena Con Delitto", 
        slug: "cena-con-delitto",
        href: "/format/cena-con-delitto", 
        subtitle: "L'indagine noir diventa digitale.",
        desc: "Investigation Web App",
        longDesc: "Risolvi il mistero analizzando indizi e testimonianze digitali inviate direttamente al tuo smartphone.",
        image: "/images/brand/bg-stage-lights.webp",
        badge: "Tech Noir",
        details: "3 ore · Indagine Digitale · Da 50€/persona",
        price: 50,
        ctaText: "Inizia l'indagine",
        ctaHref: `https://wa.me/39${CONTACT_WHATSAPP}?text=Ciao!%20Vorrei%20organizzare%20una%20Cena%20con%20Delitto%20Digitale.%20Info%3F`
    },
    { 
        id: "the-golden-voice",
        name: "THE GOLDEN VOICE", 
        slug: "the-golden-voice",
        href: "/format/the-golden-voice", 
        subtitle: "Il contest che voti tu dal tavolo.",
        desc: "Live Singing Contest",
        longDesc: "Il grande show canoro dove il pubblico è il quinto giudice grazie all'integrazione digitale.",
        image: "/images/brand/service-performance.webp",
        badge: "Coming Soon",
        details: "Singing contest · Voto del Pubblico · Stay tuned",
        price: 0,
        ctaText: "Candidati ora",
        ctaHref: "/contact"
    }
];

/**
 * ASSETS
 */
export const LOGO_PATH = "/brand/logo-white.svg";
export const FALLBACK_IMAGE = "/lab_menu.webp";
