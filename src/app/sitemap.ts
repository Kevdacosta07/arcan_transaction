import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://arcan-transactions.ch';
  
  // Liste des routes statiques de l'application
  const routes = [
    '',
    '/contact',
    '/criteres',
    '/mentions-legales',
    '/procedures-de-vente',
    '/realisations'
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    // Pour chaque route, on génère une entrée pour chaque locale
    for (const locale of routing.locales) {
        // Construction de l'URL pour cette locale
        const url = `${baseUrl}/${locale}${route === '' ? '' : route}`;
        
        // Construction des liens alternatifs (hreflang) pour le sitemap
        const languages: Record<string, string> = {};
        for (const loc of routing.locales) {
            languages[loc] = `${baseUrl}/${loc}${route === '' ? '' : route}`;
        }

        sitemap.push({
            url,
            lastModified: new Date(),
            changeFrequency: route === '' ? 'daily' : 'weekly',
            priority: route === '' ? 1 : 0.8,
            alternates: {
                languages
            }
        });
    }
  }

  return sitemap;
}
