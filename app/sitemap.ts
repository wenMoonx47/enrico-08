import type { MetadataRoute } from 'next';
import { projects } from '@/lib/data/projects';

const BASE_URL = 'https://enricoperania.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['es', 'en'];

  const staticRoutes = ['', '/contact', '/playground'];
  const projectRoutes = projects.map(p => `/projects/${p.slug}`);
  const allRoutes = [...staticRoutes, ...projectRoutes];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of allRoutes) {
      entries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : route.startsWith('/projects') ? 0.8 : 0.7,
      });
    }
  }

  return entries;
}
