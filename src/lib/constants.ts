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
    { label: "Home", href: "/" },
    { label: "Format", href: "/format" },
    { label: "Il Bugiardo", href: "/format/a-cena-con-il-bugiardo" },
    { label: "Aziende", href: "/eventi-aziendali" },
    { label: "Chi siamo", href: "/chi-siamo" },
    { label: "Contatti", href: "/contatti" },
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
        subtitle: "La fiducia è un difetto. Lo smartphone è la tua arma.",
        desc: "Social Game Experience",
        longDesc: "Il primo dinner show dove il sospetto è l'unica moneta di scambio. Smaschererai il bugiardo o cadrai nel Sistema?",
        image: "/images/brand/background.webp",
        badge: "Limited Access",
        details: "3 ore · Sessione Esclusiva · Da 50€/persona",
        quickInfo: "Posti limitati · Ogni serata è unica",
        price: 50,
        ctaText: "Accetta la Sfida",
        actionLabel: "Scopri chi sta mentendo →",
        ctaHref: `https://wa.me/39${CONTACT_WHATSAPP}?text=Ciao!%20Voglio%20info%20su%20A%20Cena%20Con%20Il%20Bugiardo.%20Potete%20dirmi%20di%20pi%C3%B9%20sull%27App%3F`
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
        badge: "Unique Event",
        details: "Showcase Aperto · Votazione Live · Accesso Selezionato",
        quickInfo: "Evento mensile · Disponibilità limitata",
        price: 0,
        ctaText: "Prendi il Comando",
        actionLabel: "Sali sul Palco →",
        ctaHref: "/calendario"
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
        badge: "Sold Out Risk",
        details: "3 ore · Indagine Live · Solo su Prenotazione",
        quickInfo: "Posti limitati · Prenotazione obbligatoria",
        price: 50,
        ctaText: "Risolvi il Caso",
        actionLabel: "Entra nell'Indagine →",
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
        ctaText: "Diventa Giudice",
        actionLabel: "Vivi il Talento →",
        ctaHref: "/calendario"
    }
];

/**
 * SERVICE EXPERIENCES
 */
export const SERVICE_EXPERIENCES = [
    {
        id: "dinner-show",
        category: "Entertainment",
        title: "Dinner Show",
        description: "L'alta cucina incontra la narrazione immersiva. Spettacoli dal vivo dove il confine tra attore e spettatore svanisce.",
        image: "/images/brand/bg-hero-wide.webp",
        href: "/format",
    },
    {
        id: "game-experience",
        category: "Interactive",
        title: "Game Experience",
        description: "Social deception, sfide digitali e giochi psicologici. Trasforma la tua serata in una competizione ad alto impatto.",
        image: "/images/brand/bg-stage-lights.webp",
        href: "/format/a-cena-con-il-bugiardo",
    },
    {
        id: "corporate-experience",
        category: "Business",
        title: "Corporate Experience",
        description: "Team building d'avanguardia per brand visionari. Progettiamo il futuro della cultura aziendale attraverso il gioco.",
        image: "/images/brand/bg-venue-crowd.webp",
        href: "/eventi-aziendali",
    }
];

/**
 * SOCIAL PROOF & TESTIMONIALS
 */
export const SOCIAL_PROOF = [
    {
        id: "rev-1",
        type: "reaction",
        title: "Live Reaction",
        author: "Marco R.",
        content: "Non è una cena. È un glitch nella realtà. Incredibile.",
        image: "/images/brand/bg-venue-crowd.webp",
        videoUrl: "#", // Placeholder for tiktok-style
    },
    {
        id: "rev-2",
        type: "atmosphere",
        title: "The Vibe",
        author: "Sarah L.",
        content: "Atmosfera pazzesca. Ogni dettaglio è curato maniacalmente.",
        image: "/images/brand/bg-stage-lights.webp",
        videoUrl: "#",
    },
    {
        id: "rev-3",
        type: "corporate",
        title: "HR Director @ TechCo",
        author: "Alessandro G.",
        content: "Il miglior team building di sempre. Engagement al 100%.",
        image: "/images/brand/service-performance.webp",
        videoUrl: "#",
    },
    {
        id: "rev-4",
        type: "moment",
        title: "Magic Moment",
        author: "Elena V.",
        content: "Ancora cerco di capire come abbiano fatto a sapere il mio segreto.",
        image: "/images/brand/bull-hero.jpg",
        videoUrl: "#",
    }
];

/**
 * TECHNICAL CONFIG
 */

/**
 * ASSETS
 */
export const LOGO_PATH = "/brand/logo-full.jpg";
export const FALLBACK_IMAGE = "/lab_menu.webp";
