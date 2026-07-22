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
    { label: "A cena con il bugiardo", href: "/format/a-cena-con-il-bugiardo" },
    { label: "Feste Private", href: "/eventi-privati" },
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
        subtitle: "Cena con gioco di ruolo e social deception. Scopri chi mente.",
        desc: "Cena con Delitto Psicologica",
        longDesc: "Una cena spettacolo in cui collabori e competi con gli altri tavoli. Usa il tuo smartphone per analizzare gli indizi e smascherare il bugiardo.",
        image: "/images/brand/background.webp",
        badge: "Accesso Limitato",
        details: "3 ore · Sessione Esclusiva · Da 50€/persona",
        quickInfo: "Posti limitati · Ogni serata è unica",
        price: 50,
        ctaText: "Info su WhatsApp",
        actionLabel: "Contattaci per informazioni →",
        ctaHref: `https://wa.me/39${CONTACT_WHATSAPP}?text=Ciao!%20Voglio%20info%20su%20A%20Cena%20Con%20Il%20Bugiardo.%20Potete%20dirmi%20di%20pi%C3%B9%20sull%27App%3F`
    },
    { 
        id: "il-palqo",
        name: "Il PalQo", 
        slug: "il-palqo",
        href: "/format/il-palqo", 
        subtitle: "Spettacolo live interattivo. Vota i talenti dal tavolo.",
        desc: "Showcase con Votazione Live",
        longDesc: "Assisti alle esibizioni degli artisti sul palco e decidi chi merita di vincere, votando in tempo reale tramite la nostra web app.",
        image: "/images/brand/bg-venue-crowd.webp",
        badge: "Evento Unico",
        details: "Showcase Aperto · Votazione Live · Accesso Selezionato",
        quickInfo: "Evento mensile · Disponibilità limitata",
        price: 0,
        ctaText: "Vedi il Calendario",
        actionLabel: "Scopri le date dell'evento →",
        ctaHref: "/calendario"
    },
    { 
        id: "cena-con-delitto",
        name: "Cena Con Delitto", 
        slug: "cena-con-delitto",
        href: "/format/cena-con-delitto", 
        subtitle: "Cena con delitto a Torino. Un giallo classico in chiave moderna.",
        desc: "Cena Spettacolo Investigativa",
        longDesc: "Diventa un detective per una sera. Analizza le prove inviate direttamente al tuo smartphone e interroga gli attori tra una portata e l'altra.",
        image: "/images/brand/bg-stage-lights.webp",
        badge: "Rischio Sold Out",
        details: "3 ore · Indagine Live · Solo su Prenotazione",
        quickInfo: "Posti limitati · Prenotazione obbligatoria",
        price: 50,
        ctaText: "Info su WhatsApp",
        actionLabel: "Contattaci per dettagli →",
        ctaHref: `https://wa.me/39${CONTACT_WHATSAPP}?text=Ciao!%20Vorrei%20organizzare%20una%20Cena%20con%20Delitto%20Digitale.%20Info%3F`
    },
    { 
        id: "the-golden-voice",
        name: "THE GOLDEN VOICE", 
        slug: "the-golden-voice",
        href: "/format/the-golden-voice", 
        subtitle: "Show musicale dal vivo. Tu sei il giudice.",
        desc: "Contest Canoro Interattivo",
        longDesc: "Ascolta i cantanti esibirsi live e usa la nostra web app per votare la voce migliore direttamente dal tuo tavolo.",
        image: "/images/brand/service-performance.webp",
        badge: "In Arrivo",
        details: "Contest canoro · Voto del Pubblico · In arrivo",
        quickInfo: "In arrivo",
        price: 0,
        ctaText: "Vedi le Date",
        actionLabel: "Controlla il calendario →",
        ctaHref: "/calendario"
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
 * SOCIAL PROOF & TESTIMONIALS
 */
export const SOCIAL_PROOF = [
    {
        id: "rev-1",
        type: "reaction",
        title: "Real-time Impact",
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
