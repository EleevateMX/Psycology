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
    lang: 'es',
    icons: [
      {
        src: '/icon',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/apple-icon',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}
