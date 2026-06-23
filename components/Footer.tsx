import Link from 'next/link';
import { Brain, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-teal-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                <Brain size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold">Psique</span>
            </div>
            <p className="text-teal-100 text-sm leading-relaxed mb-4">
              Encuentra tu psicólogo ideal en Mérida y toda la República Mexicana.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Para Pacientes */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-teal-200 mb-4">Para Pacientes</h3>
            <ul className="space-y-2.5">
              {['Buscar psicólogo', 'Especialidades', 'Psicólogos online', 'Preguntas frecuentes', 'Blog de salud mental'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-teal-100 hover:text-white text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Para Psicólogos */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-teal-200 mb-4">Para Psicólogos</h3>
            <ul className="space-y-2.5">
              {['Crear perfil gratuito', 'Cómo funciona', 'Precios y planes', 'Recursos profesionales', 'Iniciar sesión'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-teal-100 hover:text-white text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-teal-200 mb-4">Empresa</h3>
            <ul className="space-y-2.5">
              {['Sobre nosotros', 'Misión y valores', 'Equipo', 'Prensa', 'Trabaja con nosotros'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-teal-100 hover:text-white text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-teal-200 mb-4">Contacto</h3>
            <ul className="space-y-2.5">
              {['Contacto', 'Soporte', 'Reportar error', 'Privacidad', 'Términos de uso'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-teal-100 hover:text-white text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-teal-200 text-sm">© 2025 Psique MX. Todos los derechos reservados.</p>
          <p className="text-teal-200 text-sm">Hecho con ❤️ en Mérida, Yucatán</p>
        </div>
      </div>
    </footer>
  );
}
