import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Psique - Encuentra tu Psicólogo Ideal | Mérida, México',
  description: 'Directorio de psicólogos verificados en Mérida, Yucatán. Encuentra al especialista ideal para ti. Terapia presencial y en línea. Más de 200 psicólogos certificados.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
