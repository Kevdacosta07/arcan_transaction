import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Arcan Transactions',
    short_name: 'Arcan Transactions',
    description: "Transactions d'immeubles de rendement en Suisse",
    start_url: '/',
    display: 'standalone',
    background_color: '#FDFBF7',
    theme_color: '#021024',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
