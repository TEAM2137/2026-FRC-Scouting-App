import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ABACUS',
    short_name: 'ABACUS',
    description: 'Scouting App for FIRST Age - Rebuilt',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/images/ABACUS-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/ABACUS-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}