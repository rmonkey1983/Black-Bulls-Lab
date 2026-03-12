import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://blackbullslab.it";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticRoutes: MetadataRoute.Sitemap = [
        { url: `${BASE_URL}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1.0 },
        { url: `${BASE_URL}/events`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
        { url: `${BASE_URL}/talents`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
        { url: `${BASE_URL}/gallery`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
        { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
        { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
        { url: `${BASE_URL}/corporate`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    ];

    try {
        // Fetch Events
        const { data: events } = await supabase.from('events').select('slug, updated_at');
        const eventRoutes: MetadataRoute.Sitemap = (events || []).map((event) => ({
            url: `${BASE_URL}/events/${event.slug}`,
            lastModified: event.updated_at ? new Date(event.updated_at) : new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }));

        // Fetch Talents
        const { data: talents } = await supabase.from('talents').select('slug, updated_at');
        const talentRoutes: MetadataRoute.Sitemap = (talents || []).map((talent) => ({
            url: `${BASE_URL}/talents/${talent.slug}`,
            lastModified: talent.updated_at ? new Date(talent.updated_at) : new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }));

        return [...staticRoutes, ...eventRoutes, ...talentRoutes];
    } catch (error) {
        console.error("Failed to generate dynamic sitemap routes:", error);
        return staticRoutes;
    }
}
