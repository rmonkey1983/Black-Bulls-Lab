/**
 * BRAND & SITE METADATA
 */
export const SITE_NAME = "Black Bulls Lab";
export const FORMAT_ACCENT_OXBLOOD = "#641F2E";
export const SITE_DESCRIPTION = "Format ed esperienze dal vivo a Torino in cui il pubblico è parte attiva: serate pubbliche, eventi privati, aziende e location.";
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
    { label: "Esperienze", href: "/format" },
    { label: "A cena con il bugiardo", href: "/format/a-cena-con-il-bugiardo" },
    { label: "Aziende", href: "/eventi-aziendali" },
    { label: "Locali & Partner", href: "/locali-partner" },
    { label: "Eventi Privati", href: "/eventi-privati" },
    { label: "Chi siamo", href: "/chi-siamo" },
];

/**
 * EVENT FORMATS (EXPERIMENTAL NIGHTS)
 */
export const EXPERIMENTS = [
    { 
        id: "a-cena-con-il-bugiardo",
        name: "A Cena Con Il Bugiardo", 
        href: "/format/a-cena-con-il-bugiardo", 
        subtitle: "Una cena. Un bugiardo. Nessun attore.",
        desc: "Cena interattiva BBL",
        image: "/images/brand/background.webp",
        badge: "Format flagship"
    },
    { 
        id: "il-palqo",
        name: "Il PalQo", 
        href: "/format/il-palqo", 
        subtitle: "Dinner & show live con stand-up e improvvisazione.",
        desc: "Format live con conduzione e interazione del pubblico",
        image: "/images/brand/bg-venue-crowd.webp",
        badge: "Format BBL"
    },
    { 
        id: "cena-con-delitto",
        name: "Cena Con Delitto", 
        href: "/format/cena-con-delitto", 
        subtitle: "Esperienza investigativa classica a Torino.",
        desc: "Cena e indagine dal vivo",
        image: "/images/brand/bg-stage-lights.webp",
        badge: "Esperienza investigativa"
    },
    { 
        id: "the-golden-voice",
        name: "THE GOLDEN VOICE", 
        href: "/format/the-golden-voice", 
        subtitle: "Format musicale live con partecipazione del pubblico.",
        desc: "Format musicale con cantanti e pubblico",
        image: "/images/brand/vibe-live-jazz.webp",
        badge: "Format BBL"
    }
];

/**
 * SERVICE EXPERIENCES
 */
export const SERVICE_EXPERIENCES = [
    {
        id: "date-pubbliche",
        category: "B2C / Privati",
        title: "Date Pubbliche",
        description: "Partecipa alle nostre serate programmate a Torino. Prenota i tuoi biglietti singoli per cene spettacolo e giochi di ruolo interattivi.",
        image: "/images/brand/bg-hero-wide.webp",
        href: "/calendario",
    },
    {
        id: "feste-private",
        category: "B2C / Feste",
        title: "Feste Private",
        description: "Compleanni, feste di laurea ed eventi privati. Organizza una cena spettacolo investigativa o un gioco di ruolo esclusivo solo per te e i tuoi ospiti.",
        image: "/images/brand/bg-stage-lights.webp",
        href: "/eventi-privati",
    },
    {
        id: "corporate-experience",
        category: "B2B / Aziende",
        title: "Eventi Aziendali",
        description: "Team building d'avanguardia ed eventi corporate per brand visionari. Progettiamo il coinvolgimento della cultura aziendale attraverso il gioco.",
        image: "/images/brand/bg-venue-crowd.webp",
        href: "/eventi-aziendali",
    }
];

/**
 * TECHNICAL CONFIG
 */

/**
 * ASSETS
 */
export const LOGO_PATH = "/brand/bbl-logo-horizontal.webp";
export const FALLBACK_IMAGE = "/lab_menu.webp";
