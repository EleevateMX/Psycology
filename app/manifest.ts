import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Psique — Psicólogos en Mérida',
    short_name: 'Psique',
    description: 'Encuentra tu psicólogo ideal en Mérida y México. Directorio verificado.',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#F5F3FF',
    theme_color: '#6D28D9',
    categories: ['health', 'medical'],
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    screenshots: [],
  }
}
