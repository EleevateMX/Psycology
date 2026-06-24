import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Users,
  Calendar,
  Star,
  Search,
  Shield,
  TrendingUp,
  CheckCircle,
} from 'lucide-react'
import ProfesionalesForm from './ProfesionalesForm'
import ProfesionalesFAQ from './ProfesionalesFAQ'

export const metadata: Metadata = {
  title: 'Para Psicólogos | Psique Mérida',
  description:
    'Únete a Psique y haz crecer tu consulta. Crea tu perfil profesional gratis, recibe más pacientes en Mérida y toda México, y gestiona tu agenda en línea.',
  openGraph: {
    title: 'Para Psicólogos | Psique Mérida',
    description:
      'Miles de pacientes en Mérida buscan psicólogos como tú. Crea tu perfil gratis y empieza a recibir citas hoy.',
    type: 'website',
  },
}

// ─── Benefits data ────────────────────────────────────────────────────────────

const BENEFITS = [
  {
    Icon: Users,
    title: 'Mayor visibilidad',
    desc: 'Aparece en búsquedas de pacientes en Mérida y toda México',
  },
  {
    Icon: Calendar,
    title: 'Agenda en línea',
    desc: 'Los pacientes reservan citas directamente en tu perfil',
  },
  {
    Icon: Star,
    title: 'Reseñas verificadas',
    desc: 'Acumula opiniones reales que generan confianza',
  },
  {
    Icon: Search,
    title: 'SEO local',
    desc: 'Tu perfil aparece en Google cuando buscan psicólogos en Mérida',
  },
  {
    Icon: Shield,
    title: 'Perfil verificado',
    desc: 'Mostramos tu cédula profesional y la verificamos',
  },
  {
    Icon: TrendingUp,
    title: 'Panel profesional',
    desc: 'Estadísticas de visitas, citas y crecimiento de tu consulta',
  },
]

// ─── Pricing data ─────────────────────────────────────────────────────────────

const PLANS = [
  {
    name: 'Básico',
    price: 'Gratis',
    period: '',
    badge: null,
    borderClass: 'border-gray-200',
    ctaClass: 'bg-gray-800 hover:bg-gray-900 text-white',
    cta: 'Comenzar gratis',
    features: [
      'Perfil básico',
      '3 fotos',
      'Aparecer en directorio',
      'Citas ilimitadas',
      'Sin comisión',
    ],
  },
  {
    name: 'Profesional',
    price: '$299',
    period: '/mes',
    badge: 'Más popular',
    borderClass: 'border-violet-700 border-2',
    ctaClass: 'bg-violet-700 hover:bg-violet-800 text-white',
    cta: 'Comenzar 14 días gratis',
    features: [
      'Todo lo del plan Básico',
      'Perfil destacado',
      'SEO avanzado',
      'Estadísticas detalladas',
      'Agenda personalizable',
      'Verificación de cédula',
    ],
  },
  {
    name: 'Premium',
    price: '$599',
    period: '/mes',
    badge: null,
    borderClass: 'border-orange-500 border-2',
    ctaClass: 'bg-orange-500 hover:bg-orange-600 text-white',
    cta: 'Contactar ventas',
    features: [
      'Todo lo del plan Profesional',
      'Posición top en búsquedas',
      'Badge "Recomendado"',
      'Acceso prioritario a pacientes',
    ],
  },
]

// ─── Testimonials data ────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    name: 'Dra. Sofía Ramírez',
    specialty: 'Psicóloga clínica · Ansiedad y Depresión',
    initials: 'SR',
    quote:
      'Desde que me uní a Psique, mi agenda está llena los lunes. Antes tardaba semanas en conseguir nuevos pacientes; ahora los recibo directamente sin esfuerzo.',
  },
  {
    name: 'Lic. Carlos Mendoza',
    specialty: 'Psicólogo · Terapia de Pareja',
    initials: 'CM',
    quote:
      'El perfil verificado me da credibilidad y los pacientes llegan con confianza. Las reseñas reales hacen toda la diferencia. Totalmente recomendado.',
  },
  {
    name: 'Mtra. Laura Vega',
    specialty: 'Psicóloga infantil · TDAH y Familia',
    initials: 'LV',
    quote:
      'Con el plan Profesional duplicé mis consultas en dos meses. El panel de estadísticas me ayuda a entender qué funciona y seguir creciendo.',
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProfesionalesPage() {
  return (
    <main>
      {/* ── 1. Hero ── */}
      <section className="bg-gradient-to-br from-violet-800 to-violet-900 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-violet-700 border border-violet-600 text-violet-200 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
            Para profesionales de la salud mental
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6">
            Haz crecer tu consulta con Psique
          </h1>
          <p className="text-violet-200 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            Miles de pacientes en Mérida buscan psicólogos como tú. Crea tu perfil gratis y empieza a recibir citas hoy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <Link
              href="/unete"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-xl transition-colors text-base"
            >
              Crear perfil gratis
            </Link>
            <a
              href="#planes"
              className="inline-block border-2 border-white text-white hover:bg-white hover:text-violet-900 font-bold px-8 py-3.5 rounded-xl transition-colors text-base"
            >
              Ver planes
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center divide-y sm:divide-y-0 sm:divide-x divide-violet-700">
            {[
              { value: '200+', label: 'psicólogos activos' },
              { value: '10,000+', label: 'pacientes/mes' },
              { value: '4.8 ★', label: 'rating promedio' },
            ].map(({ value, label }) => (
              <div key={label} className="sm:px-10 py-2 sm:py-0">
                <p className="text-3xl font-extrabold">{value}</p>
                <p className="text-violet-300 text-sm mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. Beneficios ── */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-4">
            ¿Por qué unirse a Psique?
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">
            Todo lo que necesitas para hacer crecer tu práctica profesional en un solo lugar.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="bg-gray-50 rounded-2xl p-7 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mb-5">
                  <Icon size={22} className="text-violet-700" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Cómo funciona ── */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-4">
            Es muy fácil empezar
          </h2>
          <p className="text-gray-500 text-center mb-14 max-w-xl mx-auto">
            En menos de 10 minutos tu perfil puede estar listo para recibir pacientes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Crea tu perfil',
                desc: 'Completa tu información profesional, especialidades y horarios',
                note: '5 min',
              },
              {
                step: '2',
                title: 'Recibe pacientes',
                desc: 'Los pacientes te encuentran y agendan citas directamente',
                note: 'Sin intermediarios',
              },
              {
                step: '3',
                title: 'Haz crecer tu consulta',
                desc: 'Acumula reseñas y aumenta tu visibilidad mes a mes',
                note: 'Resultados reales',
              },
            ].map(({ step, title, desc, note }) => (
              <div key={step} className="text-center">
                <div className="w-14 h-14 bg-violet-700 text-white rounded-2xl flex items-center justify-center text-2xl font-extrabold mx-auto mb-5">
                  {step}
                </div>
                <h3 className="font-bold text-gray-900 text-xl mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-3">{desc}</p>
                <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full">
                  {note}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Planes de precios ── */}
      <section id="planes" className="bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-4">
            Planes para cada etapa
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">
            Empieza gratis y escala según tus necesidades. Sin permanencias ni sorpresas.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white rounded-2xl border ${plan.borderClass} p-8 flex flex-col shadow-sm hover:shadow-md transition-shadow`}
              >
                {plan.badge && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-violet-700 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                    {plan.badge}
                  </span>
                )}
                <div className="mb-6">
                  <h3 className="font-extrabold text-gray-900 text-xl mb-3">{plan.name}</h3>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                    {plan.period && (
                      <span className="text-gray-400 text-sm mb-1">{plan.period}</span>
                    )}
                  </div>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/unete"
                  className={`block w-full text-center font-bold py-3 rounded-xl transition-colors ${plan.ctaClass}`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Testimonios ── */}
      <section className="bg-violet-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-12">
            Lo que dicen nuestros profesionales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ name, specialty, initials, quote }) => (
              <div key={name} className="bg-white rounded-2xl p-7 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-full bg-violet-700 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    {initials}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{name}</p>
                    <p className="text-gray-400 text-xs leading-snug">{specialty}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">&ldquo;{quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Formulario de registro ── */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-3">
            Registra tu perfil gratis
          </h2>
          <p className="text-gray-500 text-center mb-10">
            Completa el formulario y nuestro equipo te contactará en menos de 24 horas.
          </p>
          <ProfesionalesForm />
        </div>
      </section>

      {/* ── 7. FAQ ── */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-12">
            Preguntas frecuentes
          </h2>
          <ProfesionalesFAQ />
        </div>
      </section>

      {/* ── 8. CTA final ── */}
      <section className="bg-gradient-to-br from-violet-700 to-violet-800 py-20 px-4 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-5">
            ¿Listo para recibir más pacientes?
          </h2>
          <p className="text-violet-200 text-lg mb-10">
            Únete a más de 200 psicólogos que ya confían en Psique para hacer crecer su consulta.
          </p>
          <Link
            href="/unete"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-10 py-4 rounded-xl transition-colors text-lg"
          >
            Crear mi perfil gratis
          </Link>
        </div>
      </section>
    </main>
  )
}
