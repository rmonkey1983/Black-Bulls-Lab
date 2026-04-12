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
export const CONTACT_WHATSAPP = "3342010067"; // No spaces or symbols for deep links

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
        subtitle: "Dinner Show & Social Deception",
        desc: "Dinner Show & Social Deception",
        longDesc: "Un'esperienza gastronomica immersa nel mistero e nel bluff.",
        image: "/images/brand/service-plating.png",
        badge: "Sempre Disponibile",
        details: "2-3 ore · Max 30 persone · Da 50€/persona",
        price: 50,
        ctaText: "Voglio smascherarlo",
        ctaHref: `https://wa.me/39${CONTACT_WHATSAPP}?text=Ciao!%20Sono%20interessato%2Fa%20a%20%22A%20Cena%20Con%20Il%20Bugiardo%22.%20Quando%20%C3%A8%20la%20prossima%20data%3F`
    },
    { 
        id: "il-palqo",
        name: "Il PalQo", 
        slug: "il-palqo",
        href: "/format/il-palqo", 
        subtitle: "Community & Show",
        desc: "Community & Show",
        longDesc: "Il format dove il pubblico diventa protagonista del palco.",
        image: "/images/brand/bg-venue-crowd.png",
        badge: "Ogni Mese",
        details: "3 ore · Showcase aperto · Ingresso libero",
        price: 0,
        ctaText: "Voglio salire sul palco",
        ctaHref: "/events"
    },
    { 
        id: "cena-con-delitto",
        name: "Cena Con Delitto", 
        slug: "cena-con-delitto",
        href: "/format/cena-con-delitto", 
        subtitle: "Un omicidio da risolvere, una cena da non dimenticare.",
        desc: "Dinner Show & Investigation",
        longDesc: "Risolvi il mistero tra una portata e l'altra in questo noir interattivo.",
        image: "/images/brand/bg-stage-lights.png",
        badge: "Su Prenotazione",
        details: "3 ore · 15-40 persone · Da 50€/persona",
        price: 50,
        ctaText: "Voglio risolvere il caso",
        ctaHref: `https://wa.me/39${CONTACT_WHATSAPP}?text=Ciao!%20Sono%20interessato%2Fa%20alla%20Cena%20Con%20Delitto.%20Potete%20darmi%20info%20su%20date%20e%20prezzi%3F`
    },
    { 
        id: "the-golden-voice",
        name: "The Golden Voice", 
        slug: "the-golden-voice",
        href: "/format/the-golden-voice", 
        subtitle: "Singing Contest",
        desc: "Singing Contest",
        longDesc: "La voce che premia il talento. La sfida canora più esclusiva di Torino.",
        image: "/images/brand/service-performance.png",
        badge: "In Arrivo",
        details: "Singing contest · Aperto a tutti · Stay tuned",
        price: 0,
        ctaText: "Voglio esibirmi",
        ctaHref: "/contact"
    }
];

/**
 * ASSETS
 */
export const LOGO_PATH = "/blackbullslab-v2.png";
export const FALLBACK_IMAGE = "/lab_menu.png";
