import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

const benefits = [
  'Perfil profesional gratuito',
  'Visibilidad ante miles de pacientes',
  'Agenda en línea integrada',
  'Reseñas verificadas de pacientes',
  'Panel estadístico de tu consulta',
]

const statCards = [
  { value: '200+', label: 'psicólogos' },
  { value: '10k+', label: 'pacientes/mes' },
  { value: 'Gratis', label: 'siempre' },
]

export default function JoinSection() {
  return (
    <section id="para-psicologos" className="py-20 bg-gradient-to-br from-violet-800 to-violet-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left content */}
          <div className="flex-1 text-white">
            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium text-violet-100 mb-4">
              Para profesionales
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">
              ¿Eres psicólogo? Llega a más pacientes
            </h2>
            <p className="text-violet-100 text-lg mb-8 max-w-md leading-relaxed">
              Únete a la red de psicólogos verificados más grande de Mérida
            </p>

            <ul className="space-y-3 mb-10">
              {benefits.map(benefit => (
                <li key={benefit} className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-violet-300 flex-shrink-0" />
                  <span className="text-violet-50 text-sm font-medium">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Stat cards */}
            <div className="flex flex-wrap gap-4">
              {statCards.map(({ value, label }) => (
                <div key={label} className="bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-center min-w-[100px]">
                  <div className="text-2xl font-extrabold text-white">{value}</div>
                  <div className="text-violet-200 text-xs mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right CTA */}
          <div className="flex-shrink-0 w-full lg:w-auto">
            <div className="bg-white/10 border border-white/20 rounded-2xl p-8 max-w-sm mx-auto text-center backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-2">Empieza gratis hoy</h3>
              <p className="text-violet-200 text-sm mb-8 leading-relaxed">
                En menos de 10 minutos tendrás tu perfil profesional listo para recibir pacientes.
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  href="/profesionales"
                  className="block w-full px-6 py-3.5 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors text-sm text-center"
                >
                  Crear perfil gratis
                </Link>
                <Link
                  href="/profesionales#planes"
                  className="block w-full px-6 py-3 border border-white text-white font-medium rounded-xl hover:bg-white/10 transition-colors text-sm text-center"
                >
                  Conocer planes
                </Link>
              </div>
              <p className="text-xs text-violet-300 mt-5">Sin tarjeta de crédito · Siempre gratis</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
