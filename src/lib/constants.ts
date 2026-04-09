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
    { name: "Ricercatori", href: "/talents" },
    { name: "Chi Siamo", href: "/chi-siamo" },
    { name: "Corporate", href: "/eventi-aziendali" },
    { name: "Contact", href: "/contact" },
];

/**
 * EVENT FORMATS (EXPERIMENTAL NIGHTS)
 */
export const EXPERIMENTS = [
    { 
        id: "il-palqo",
        name: "Il PalQo", 
        href: "/format/il-palqo", 
        desc: "Community & Show",
        longDesc: "Il format dove il pubblico diventa protagonista del palco."
    },
    { 
        id: "the-golden-voice",
        name: "The Golden Voice", 
        href: "/format/the-golden-voice", 
        desc: "Singing Contest",
        longDesc: "La sfida canora più esclusiva e coinvolgente."
    },
    { 
        id: "a-cena-con-il-bugiardo",
        name: "A Cena Con Il Bugiardo", 
        href: "/format/a-cena-con-il-bugiardo", 
        desc: "Dinner Show & Social Deception",
        longDesc: "Un'esperienza gastronomica immersa nel mistero e nel bluff."
    },
    { 
        id: "cena-con-il-delitto",
        name: "Cena Con Il Delitto", 
        href: "/format/cena-con-il-delitto", 
        desc: "Interactive Mystery Dinner",
        longDesc: "Risolvi il caso tra una portata e l'altra."
    }
];

/**
 * ASSETS
 */
export const LOGO_PATH = "/blackbullslab-v2.png";
export const FALLBACK_IMAGE = "/lab_menu.png";
