import type { Metadata } from 'next'
import Link from 'next/link'
import { Heart, CheckCircle, Briefcase } from 'lucide-react'
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import HowItWorks from '@/components/HowItWorks';
import SpecialtiesSection from '@/components/SpecialtiesSection';
import FeaturedPsychologists from '@/components/FeaturedPsychologists';
import JoinSection from '@/components/JoinSection'
import BlogPreview from '@/components/BlogPreview'
import TestimonialsSection from '@/components/TestimonialsSection';

export const metadata: Metadata = {
  title: 'Psicólogos en Mérida — Encuentra y Agenda Online | Psique',
  description: 'Directorio de más de 200 psicólogos verificados en Mérida, Yucatán. Compara perfiles, lee reseñas y agenda citas presenciales u online. Especialidades: ansiedad, depresión, pareja, TDAH y más.',
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <HowItWorks />
      <SpecialtiesSection />
      <FeaturedPsychologists />
      <BlogPreview />

      {/* Sección dual: pacientes y psicólogos */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Para pacientes */}
            <div className="bg-violet-50 rounded-3xl p-8 border border-violet-100">
              <div className="w-14 h-14 bg-violet-100 rounded-2xl flex items-center justify-center mb-5">
                <Heart size={26} className="text-violet-600" />
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-3">Para pacientes</h3>
              <p className="text-gray-500 mb-6 leading-relaxed">Encuentra el psicólogo ideal para ti. Compara perfiles, lee reseñas reales y agenda tu cita en minutos, presencial o en línea.</p>
              <ul className="space-y-2.5 mb-6">
                {['Perfiles verificados con cédula profesional', 'Reseñas auténticas de pacientes reales', 'Disponibilidad en tiempo real', 'Atención presencial y online'].map(b => (
                  <li key={b} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle size={15} className="text-violet-600 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <Link href="/psicologos" className="inline-block bg-violet-700 text-white font-bold px-6 py-3 rounded-xl hover:bg-violet-800 transition-colors text-sm">
                Buscar psicólogo →
              </Link>
            </div>

            {/* Para psicólogos */}
            <div className="bg-orange-50 rounded-3xl p-8 border border-orange-100">
              <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-5">
                <Briefcase size={26} className="text-orange-600" />
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-3">Para psicólogos</h3>
              <p className="text-gray-500 mb-6 leading-relaxed">Haz crecer tu consulta con Psique. Crea tu perfil profesional, recibe pacientes nuevos y gestiona tu agenda desde un solo lugar.</p>
              <ul className="space-y-2.5 mb-6">
                {['Perfil profesional gratuito', 'Visibilidad en búsquedas de Google', 'Agenda en línea integrada', 'Panel de estadísticas de tu consulta'].map(b => (
                  <li key={b} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle size={15} className="text-orange-500 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <Link href="/profesionales" className="inline-block bg-orange-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors text-sm">
                Registrar mi perfil →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <JoinSection />
    </>
  );
}
