"use client";

// ===== TYPE DEFINITIONS =====

export interface TimelineItem {
    time: string;
    title: string;
    description: string;
}

export interface Event {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    date: string;
    location: string;
    category: string;
    image: string;
    description: string;
    timeline: TimelineItem[];
}

export interface GalleryItem {
    id: string;
    src: string;
    alt: string;
    category: string;
}

export interface Talent {
    id: string;
    name: string;
    role: string;
    image: string;
    code: string;
    bio: string;
}

export interface SiteSettings {
    siteTitle: string;
    siteDescription: string;
    heroSubtitle: string;
    contactEmail: string;
    instagram: string;
    adminPassword: string;
}

// ===== DEFAULT DATA =====

const DEFAULT_EVENTS: Event[] = [
    {
        id: "1",
        slug: "notte-medievale",
        title: "Notte Medievale: Il Banchetto del Toro",
        subtitle: "Un viaggio nel 1300 tra spezie, giullari e fuoco",
        date: "15.06.2026",
        location: "Sala dei Cavalieri",
        category: "Dinner Show",
        image: "https://images.unsplash.com/photo-1514362545857-3bc16549766b?auto=format&fit=crop&q=80&w=800",
        description: "Il Banchetto del Toro Nero non è una cena. È un portale temporale.\n\nImmergiti in un'atmosfera unica, dove la luce delle torce danza sulle pareti di pietra.",
        timeline: [
            { time: "20:00", title: "Accoglienza & Idromele", description: "Benvenuto con calice di idromele speziato." },
            { time: "20:45", title: "Primo Servizio", description: "Zuppe di farro e legumi, crostoni al lardo e miele." },
            { time: "21:30", title: "Spettacolo del Fuoco", description: "Performance di giocoleria infuocata." },
            { time: "22:00", title: "Secondo Servizio", description: "Stinco di maiale alla brace." },
            { time: "23:00", title: "Gran Finale", description: "Dolci speziati e danza delle spade." },
        ],
    },
    {
        id: "2",
        slug: "neon-jazz",
        title: "Neon Jazz Experience",
        subtitle: "Jazz, neon e cocktail d'autore",
        date: "22.06.2026",
        location: "Rooftop Lounge",
        category: "Music & Drink",
        image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=800",
        description: "Una serata di musica jazz avvolta da luci neon e cocktail d'autore.",
        timeline: [
            { time: "21:00", title: "Apertura", description: "Welcome drink e dj set d'atmosfera." },
            { time: "22:00", title: "Live Jazz", description: "Performance dal vivo." },
        ],
    },
    {
        id: "3",
        slug: "comedy-club",
        title: "Comedy Club: Risate al Buio",
        subtitle: "Stand-up comedy al buio completo",
        date: "29.06.2026",
        location: "Underground Stage",
        category: "Comedy",
        image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=80&w=800",
        description: "Uno show di stand-up comedy completamente al buio.",
        timeline: [
            { time: "21:30", title: "Apertura", description: "Benvenuto e introduzione." },
            { time: "22:00", title: "Show", description: "Le luci si spengono e le risate iniziano." },
        ],
    },
];

const DEFAULT_GALLERY: GalleryItem[] = [
    { id: "1", src: "https://images.unsplash.com/photo-1514362545857-3bc16549766b?auto=format&fit=crop&q=80&w=800", alt: "Cocktail Art", category: "Bar" },
    { id: "2", src: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=800", alt: "Live Jazz", category: "Music" },
    { id: "3", src: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=80&w=800", alt: "Comedy Night", category: "Stage" },
    { id: "4", src: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=800", alt: "Gourmet Dish", category: "Food" },
    { id: "5", src: "https://images.unsplash.com/photo-1514525253440-b393452e3383?auto=format&fit=crop&q=80&w=800", alt: "Party Vibes", category: "Atmosphere" },
    { id: "6", src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800", alt: "DJ Set", category: "Music" },
];

const DEFAULT_TALENTS: Talent[] = [
    { id: "chef-rubio", name: "Chef Rubio", role: "Direttore Culinario", image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=800", code: "RES-001", bio: "Maestro della cucina creativa." },
    { id: "dj-set", name: "Alex V", role: "Architetto Sonoro", image: "https://images.unsplash.com/photo-1571266028243-371695063ad6?auto=format&fit=crop&q=80&w=800", code: "RES-002", bio: "Sound designer e DJ." },
];

const DEFAULT_SETTINGS: SiteSettings = {
    siteTitle: "Black Bulls Lab",
    siteDescription: "Il laboratorio underground dove l'intrattenimento diventa scienza",
    heroSubtitle: "Il laboratorio underground dove l'intrattenimento diventa scienza.",
    contactEmail: "info@blackbullslab.it",
    instagram: "@blackbullslab",
    adminPassword: "admin123",
};

// ===== STORAGE HELPERS =====

function getStorage<T>(key: string, defaults: T): T {
    if (typeof window === "undefined") return defaults;
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaults;
    } catch {
        return defaults;
    }
}

function setStorage<T>(key: string, data: T): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, JSON.stringify(data));
}

// ===== EVENTS CRUD =====

export function getEvents(): Event[] {
    return getStorage<Event[]>("bbl_events", DEFAULT_EVENTS);
}

export function getEvent(slug: string): Event | undefined {
    return getEvents().find((e) => e.slug === slug);
}

export function saveEvent(event: Event): void {
    const events = getEvents();
    const index = events.findIndex((e) => e.id === event.id);
    if (index >= 0) {
        events[index] = event;
    } else {
        events.push(event);
    }
    setStorage("bbl_events", events);
}

export function deleteEvent(id: string): void {
    const events = getEvents().filter((e) => e.id !== id);
    setStorage("bbl_events", events);
}

// ===== GALLERY CRUD =====

export function getGalleryItems(): GalleryItem[] {
    return getStorage<GalleryItem[]>("bbl_gallery", DEFAULT_GALLERY);
}

export function addGalleryItem(item: GalleryItem): void {
    const items = getGalleryItems();
    items.push(item);
    setStorage("bbl_gallery", items);
}

export function deleteGalleryItem(id: string): void {
    const items = getGalleryItems().filter((i) => i.id !== id);
    setStorage("bbl_gallery", items);
}

// ===== TALENTS CRUD =====

export function getTalents(): Talent[] {
    return getStorage<Talent[]>("bbl_talents", DEFAULT_TALENTS);
}

export function saveTalent(talent: Talent): void {
    const talents = getTalents();
    const index = talents.findIndex((t) => t.id === talent.id);
    if (index >= 0) {
        talents[index] = talent;
    } else {
        talents.push(talent);
    }
    setStorage("bbl_talents", talents);
}

export function deleteTalent(id: string): void {
    const talents = getTalents().filter((t) => t.id !== id);
    setStorage("bbl_talents", talents);
}

// ===== SETTINGS =====

export function getSettings(): SiteSettings {
    return getStorage<SiteSettings>("bbl_settings", DEFAULT_SETTINGS);
}

export function saveSettings(settings: SiteSettings): void {
    setStorage("bbl_settings", settings);
}

// ===== UTILITY =====

export function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[àáâãäå]/g, "a")
        .replace(/[èéêë]/g, "e")
        .replace(/[ìíîï]/g, "i")
        .replace(/[òóôõö]/g, "o")
        .replace(/[ùúûü]/g, "u")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}
