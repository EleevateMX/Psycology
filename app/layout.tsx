import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const viewport: Viewport = {
  themeColor: '#6D28D9',
};

export const metadata: Metadata = {
  title: {
    default: 'Psique — Psicólogos Verificados en Mérida y México',
    template: '%s | Psique Mérida',
  },
  description: 'Encuentra psicólogos verificados en Mérida, Yucatán. Perfiles reales, reseñas de pacientes, citas en línea y presenciales. Especialidades: ansiedad, depresión, pareja, infantil, TDAH y más.',
  keywords: ['psicólogos Mérida', 'psicólogo online México', 'terapia psicológica Mérida', 'terapia de pareja Mérida', 'psicólogo infantil Mérida', 'ansiedad Mérida', 'salud mental Yucatán', 'psique psicólogos'],
  authors: [{ name: 'Psique MX' }],
  creator: 'Psique MX',
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://psique.mx',
    siteName: 'Psique',
    title: 'Psique — Psicólogos Verificados en Mérida y México',
    description: 'Encuentra psicólogos verificados en Mérida. Agenda citas presenciales y en línea.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Psique — Psicólogos en Mérida' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Psique — Psicólogos Verificados en Mérida',
    description: 'Encuentra psicólogos verificados en Mérida. Citas presenciales y en línea.',
  },
  robots: { index: true, follow: true },
  manifest: '/manifest.webmanifest',
  appleWebApp: { capable: true, statusBarStyle: 'default', title: 'Psique' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalOrganization',
  name: 'Psique',
  description: 'Directorio de psicólogos verificados en Mérida, Yucatán.',
  url: 'https://psique.mx',
  areaServed: { '@type': 'City', name: 'Mérida', containedIn: 'Yucatán, México' },
  specialty: 'Psicología y Salud Mental',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta name="theme-color" content="#6D28D9" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Psique" />
        <script
          dangerouslySetInnerHTML={{
            __html: "if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(()=>{}))}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
