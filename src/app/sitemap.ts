import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/format',
    '/format/a-cena-con-il-bugiardo',
    '/format/il-palqo',
    '/format/cena-con-delitto',
    '/format/the-golden-voice',
    '/chi-siamo',
    '/eventi-aziendali',
    '/contact',
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}
