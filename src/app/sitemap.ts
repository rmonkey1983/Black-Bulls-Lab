import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { getAllPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  
  // Dynamic post URLs
  const postUrls = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Manual static routes
  const staticRoutes = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${SITE_URL}/format`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${SITE_URL}/format/a-cena-con-il-bugiardo`, lastModified: new Date(), priority: 0.8 },
    { url: `${SITE_URL}/format/il-palqo`, lastModified: new Date(), priority: 0.8 },
    { url: `${SITE_URL}/format/cena-con-delitto`, lastModified: new Date(), priority: 0.8 },
    { url: `${SITE_URL}/format/the-golden-voice`, lastModified: new Date(), priority: 0.8 },
    { url: `${SITE_URL}/chi-siamo`, lastModified: new Date(), priority: 0.8 },
    { url: `${SITE_URL}/eventi-aziendali`, lastModified: new Date(), priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), priority: 0.8 },
  ];

  return [...staticRoutes, ...postUrls];
}
