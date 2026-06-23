import Link from 'next/link';
import { Instagram, Facebook, Twitter, Linkedin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-violet-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl font-black font-serif">ψ</span>
              <span className="text-xl font-bold">Psique</span>
            </div>
            <p className="text-violet-200 text-sm leading-relaxed mb-4">
              Encuentra tu psicólogo ideal en Mérida y toda la República Mexicana.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Linkedin, label: 'LinkedIn' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Para Pacientes */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-violet-300 mb-4">Para Pacientes</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Buscar psicólogo', href: '/psicologos' },
                { label: 'Psicólogos online', href: '/psicologos?online=1' },
                { label: 'Blog de salud mental', href: '/blog' },
                { label: 'Cómo funciona', href: '/#como-funciona' },
                { label: 'Preguntas frecuentes', href: '#' },
              ].map(item => (
                <li key={item.label}>
                  <Link href={item.href} className="text-violet-200 hover:text-white text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Para Psicólogos */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-violet-300 mb-4">Para Psicólogos</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Crear perfil gratuito', href: '/unete' },
                { label: 'Cómo funciona', href: '/#como-funciona' },
                { label: 'Precios y planes', href: '/unete' },
                { label: 'Recursos profesionales', href: '/blog' },
                { label: 'Iniciar sesión', href: '#' },
              ].map(item => (
                <li key={item.label}>
                  <Link href={item.href} className="text-violet-200 hover:text-white text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-violet-300 mb-4">Blog</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Salud mental', href: '/blog' },
                { label: 'Ansiedad y estrés', href: '/blog/ansiedad-en-el-trabajo' },
                { label: 'TDAH en adultos', href: '/blog/tdah-en-adultos' },
                { label: 'Terapia de pareja', href: '/blog/terapia-de-pareja-cuando-buscar-ayuda' },
                { label: 'Todos los artículos', href: '/blog' },
              ].map(item => (
                <li key={item.label}>
                  <Link href={item.href} className="text-violet-200 hover:text-white text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-violet-300 mb-4">Empresa</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Sobre nosotros', href: '#' },
                { label: 'Contacto', href: '#' },
                { label: 'Reportar error', href: '#' },
                { label: 'Privacidad', href: '#' },
                { label: 'Términos de uso', href: '#' },
              ].map(item => (
                <li key={item.label}>
                  <Link href={item.href} className="text-violet-200 hover:text-white text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-violet-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-violet-300 text-sm">© 2025 Psique MX. Todos los derechos reservados.</p>
          <p className="text-violet-300 text-sm flex items-center gap-1">Hecho con <Heart size={13} className="text-red-400 fill-red-400" /> en Mérida, Yucatán</p>
        </div>
      </div>
    </footer>
  );
}
