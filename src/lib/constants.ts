/**
 * BRAND & SITE METADATA
 */
export const SITE_NAME = "Black Bulls Lab";
export const SITE_DESCRIPTION = "Agenzia creativa a Torino specializzata in dinner show, format immersivi e team building aziendali. Trasformiamo l'intrattenimento in scienza attraverso esperienze digitali e interattive uniche.";
export const SITE_KEYWORDS = [
    "dinner show Torino",
    "eventi immersivi Torino",
    "cena spettacolo Torino",
    "team building creativo Torino",
    "esperienze interattive",
    "format eventi originali",
    "A Cena Con Il Bugiardo",
    "Il PalQo",
    "Cena Con Delitto Torino",
    "intrattenimento aziendale",
    "cosa fare a Torino",
    "esperienze digitali dal vivo"
];
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
    { name: "Eventi", href: "/format" },
    { name: "I Nostri Format", href: "/format" },
    { name: "Artisti", href: "/talents" },
    { name: "Chi Siamo", href: "/chi-siamo" },
    { name: "Blog", href: "/blog" },
    { name: "Corporate", href: "/eventi-aziendali" },
    { name: "Calendario", href: "/calendario" },
];

/**
 * EVENT FORMATS (EXPERIMENTAL NIGHTS)
 */
export const EXPERIMENTS = [
    { 
        id: "a-cena-con-il-bugiardo",
        name: "LIAR SYSTEM", 
        slug: "a-cena-con-il-bugiardo",
        href: "/format/a-cena-con-il-bugiardo", 
        subtitle: "La fiducia è un difetto. Lo smartphone è la tua arma.",
        desc: "Social Game Experience",
        longDesc: "Il primo dinner show dove il sospetto è l'unica moneta di scambio. Smaschererai il bugiardo o cadrai nel Sistema?",
        image: "/images/brand/liar-system-logo.webp",
        badge: "Social Deception",
        details: "3 ore · 20-100+ persone · Da 50€/persona",
        quickInfo: "da 50€ · 20-100+ pers.",
        price: 50,
        ctaText: "Accedi al Sistema",
        actionLabel: "Voglio sfidare il sistema →",
        ctaHref: `https://wa.me/39${CONTACT_WHATSAPP}?text=Ciao!%20Voglio%20info%20su%20LIAR%20SYSTEM.%20Potete%20dirmi%20di%20pi%C3%B9%20sull%27App%3F`
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
        quickInfo: "Ogni mese · Ingresso libero",
        price: 0,
        ctaText: "Voglio partecipare",
        actionLabel: "Voglio salire sul palco →",
        ctaHref: "/events"
    },
    { 
        id: "cena-con-delitto",
        name: "Cena Con Delitto", 
        slug: "cena-con-delitto",
        href: "/format/cena-con-delitto", 
        subtitle: "L'indagine noir diventa digitale.",
        desc: "Dinner Show & Investigation",
        longDesc: "Risolvi il mistero analizzando indizi e testimonianze digitali inviate direttamente al tuo smartphone.",
        image: "/images/brand/bg-stage-lights.webp",
        badge: "Su prenotazione",
        details: "3 ore · 20-100+ persone · Da 50€/persona",
        quickInfo: "da 50€ · 20-100+ pers.",
        price: 50,
        ctaText: "Inizia l'indagine",
        actionLabel: "Voglio risolvere il caso →",
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
        quickInfo: "In arrivo",
        price: 0,
        ctaText: "Candidati ora",
        actionLabel: "Voglio esibirmi →",
        ctaHref: "/calendario"
    }
];

/**
 * ASSETS
 */
export const LOGO_PATH = "/brand/logo-full.jpg";
export const FALLBACK_IMAGE = "/lab_menu.webp";
