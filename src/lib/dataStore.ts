import { supabase } from "./supabase";

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
    price?: number;
}

export interface GalleryItem {
    id: string;
    src: string;
    alt: string;
    category: string;
    type: "image" | "video";
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

// ===== EVENTS CRUD =====

export async function getEvents(): Promise<Event[]> {
    const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("created_at", { ascending: true });

    if (error) {
        console.error("Error fetching events:", error);
        return [];
    }
    return data.map(mapEvent);
}

export async function getEvent(slug: string): Promise<Event | undefined> {
    const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("slug", slug)
        .single();

    if (error || !data) return undefined;
    return mapEvent(data);
}

export async function saveEvent(event: Event): Promise<void> {
    const row = {
        id: event.id,
        slug: event.slug,
        title: event.title,
        subtitle: event.subtitle,
        date: event.date,
        location: event.location,
        category: event.category,
        image: event.image,
        description: event.description,
        timeline: JSON.stringify(event.timeline),
        price: event.price || null,
    };

    const { error } = await supabase
        .from("events")
        .upsert(row, { onConflict: "id" });

    if (error) {
        console.error("Error saving event:", error);
        throw new Error(error.message || "Errore durante il salvataggio in Supabase.");
    }
}

export async function deleteEvent(id: string): Promise<void> {
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) console.error("Error deleting event:", error);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapEvent(row: any): Event {
    return {
        id: row.id,
        slug: row.slug,
        title: row.title,
        subtitle: row.subtitle || "",
        date: row.date,
        location: row.location,
        category: row.category,
        image: row.image || "",
        description: row.description || "",
        timeline: typeof row.timeline === "string"
            ? JSON.parse(row.timeline)
            : (row.timeline || []),
    };
}

// ===== GALLERY CRUD =====

export async function getGalleryItems(): Promise<GalleryItem[]> {
    const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: true });

    if (error) {
        console.error("Error fetching gallery:", error);
        return [];
    }
    return data.map((row) => ({
        ...row,
        type: row.type || "image",
    })) as GalleryItem[];
}

export async function addGalleryItem(item: GalleryItem): Promise<void> {
    const { error } = await supabase.from("gallery").insert({
        id: item.id,
        src: item.src,
        alt: item.alt,
        category: item.category,
        type: item.type || "image",
    });
    if (error) {
        console.error("Error adding gallery item:", error);
        throw new Error(error.message || "Impossibile salvare nella tabella gallery.");
    }
}

export async function uploadMediaFile(file: File, folder: string = "gallery"): Promise<string | null> {
    const ext = file.name.split(".").pop() || "bin";
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const filePath = `${folder}/${fileName}`;

    const { error } = await supabase.storage
        .from("media")
        .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
        });

    if (error) {
        console.error("Error uploading file:", error);
        throw new Error(error.message || "Impossibile caricare il file nel bucket storage.");
    }

    const { data: urlData } = supabase.storage
        .from("media")
        .getPublicUrl(filePath);

    return urlData.publicUrl;
}

export async function deleteGalleryItem(id: string): Promise<void> {
    const { error } = await supabase.from("gallery").delete().eq("id", id);
    if (error) console.error("Error deleting gallery item:", error);
}

// ===== TALENTS CRUD =====

export async function getTalents(): Promise<Talent[]> {
    const { data, error } = await supabase
        .from("talents")
        .select("*")
        .order("created_at", { ascending: true });

    if (error) {
        console.error("Error fetching talents:", error);
        return [];
    }
    return data as Talent[];
}

export async function saveTalent(talent: Talent): Promise<void> {
    const { error } = await supabase
        .from("talents")
        .upsert({
            id: talent.id,
            name: talent.name,
            role: talent.role,
            image: talent.image,
            code: talent.code,
            bio: talent.bio,
        }, { onConflict: "id" });

    if (error) {
        console.error("Error saving talent:", error);
        throw new Error(error.message || "Impossibile salvare nella tabella talents.");
    }
}

export async function deleteTalent(id: string): Promise<void> {
    const { error } = await supabase.from("talents").delete().eq("id", id);
    if (error) console.error("Error deleting talent:", error);
}

// ===== SETTINGS =====

export async function getSettings(): Promise<SiteSettings> {
    const defaults: SiteSettings = {
        siteTitle: "Black Bulls Lab",
        siteDescription: "Il laboratorio underground dove l'intrattenimento diventa scienza",
        heroSubtitle: "Il laboratorio underground dove l'intrattenimento diventa scienza.",
        contactEmail: "info@blackbullslab.it",
        instagram: "@blackbullslab",
        adminPassword: "admin123",
    };

    const { data, error } = await supabase
        .from("settings")
        .select("*")
        .eq("id", 1)
        .single();

    if (error || !data) return defaults;

    return {
        siteTitle: data.site_title || defaults.siteTitle,
        siteDescription: data.site_description || defaults.siteDescription,
        heroSubtitle: data.hero_subtitle || defaults.heroSubtitle,
        contactEmail: data.contact_email || defaults.contactEmail,
        instagram: data.instagram || defaults.instagram,
        adminPassword: data.admin_password || defaults.adminPassword,
    };
}

export async function saveSettings(settings: SiteSettings): Promise<void> {
    const { error } = await supabase
        .from("settings")
        .upsert({
            id: 1,
            site_title: settings.siteTitle,
            site_description: settings.siteDescription,
            hero_subtitle: settings.heroSubtitle,
            contact_email: settings.contactEmail,
            instagram: settings.instagram,
            admin_password: settings.adminPassword,
            updated_at: new Date().toISOString(),
        }, { onConflict: "id" });

    if (error) {
        console.error("Error saving settings:", error);
        throw new Error(error.message || "Impossibile salvare le impostazioni.");
    }
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
