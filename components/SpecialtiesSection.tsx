import Link from 'next/link'
import { Wind, CloudRain, Heart, Baby, Brain, Users, HeartCrack, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Specialty {
  icon: LucideIcon
  iconBg: string
  iconColor: string
  name: string
  slug: string
}

const specialties: Specialty[] = [
  { icon: Wind, iconBg: 'bg-orange-50', iconColor: 'text-orange-500', name: 'Ansiedad y Estrés', slug: 'Ansiedad' },
  { icon: CloudRain, iconBg: 'bg-blue-50', iconColor: 'text-blue-500', name: 'Depresión', slug: 'Depresión' },
  { icon: Heart, iconBg: 'bg-pink-50', iconColor: 'text-pink-500', name: 'Terapia de Pareja', slug: 'Pareja' },
  { icon: Baby, iconBg: 'bg-yellow-50', iconColor: 'text-yellow-600', name: 'Psicología Infantil', slug: 'Infantil' },
  { icon: Brain, iconBg: 'bg-violet-50', iconColor: 'text-violet-600', name: 'TCC', slug: 'TCC' },
  { icon: Users, iconBg: 'bg-green-50', iconColor: 'text-green-600', name: 'Terapia Familiar', slug: 'Familia' },
  { icon: HeartCrack, iconBg: 'bg-gray-50', iconColor: 'text-gray-500', name: 'Duelo y Pérdida', slug: 'Duelo' },
  { icon: Zap, iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600', name: 'TDAH', slug: 'TDAH' },
]

export default function SpecialtiesSection() {
  return (
    <section className="py-20 bg-violet-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-violet-700 font-semibold text-sm uppercase tracking-wider">Especialidades</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900">
            Encuentra especialistas en lo que necesitas
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            Contamos con expertos en más de 30 áreas de la psicología clínica para atender tus necesidades específicas.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {specialties.map(({ icon: Icon, iconBg, iconColor, name, slug }) => (
            <Link
              key={slug}
              href={`/psicologos?specialty=${encodeURIComponent(slug)}`}
              className="group bg-white rounded-2xl p-5 text-center hover:shadow-md hover:border-violet-300 border border-gray-100 transition-all duration-200"
            >
              <div className={`w-14 h-14 ${iconBg} rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform`}>
                <Icon size={26} className={iconColor} />
              </div>
              <h3 className="font-semibold text-gray-800 text-sm group-hover:text-violet-700 transition-colors">
                {name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
