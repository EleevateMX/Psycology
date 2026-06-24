import { Star, Quote } from 'lucide-react'

const TESTIMONIALS = [
  {
    name: 'Mariana C.',
    location: 'Mérida, Yucatán',
    initials: 'MC',
    color: 'bg-violet-600',
    rating: 5,
    text: 'Encontré a mi psicóloga en Psique en menos de 10 minutos. El proceso fue sencillo, el perfil tenía toda la información que necesitaba y la primera sesión superó mis expectativas.',
    specialty: 'Ansiedad',
  },
  {
    name: 'Rodrigo E.',
    location: 'Mérida, Yucatán',
    initials: 'RE',
    color: 'bg-orange-500',
    rating: 5,
    text: 'Llevaba meses pensando en buscar apoyo psicológico pero no sabía por dónde empezar. Psique me facilitó todo: leí reseñas reales, comparé especialidades y agendé desde mi celular.',
    specialty: 'Estrés laboral',
  },
  {
    name: 'Valeria A.',
    location: 'Mérida, Yucatán',
    initials: 'VA',
    color: 'bg-pink-500',
    rating: 5,
    text: 'Mi esposo y yo empezamos terapia de pareja a través de Psique. El Dr. que encontramos aquí es increíble. La plataforma te da confianza desde antes de la primera sesión.',
    specialty: 'Terapia de pareja',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-violet-700 font-semibold text-sm uppercase tracking-wider">Testimonios</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900">
            Lo que dicen nuestros pacientes
          </h2>
          <p className="mt-3 text-gray-500 max-w-lg mx-auto">
            Miles de personas en Mérida han encontrado el apoyo que buscaban a través de Psique.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(({ name, location, initials, color, rating, text, specialty }) => (
            <div key={name} className="bg-gray-50 rounded-2xl p-7 border border-gray-100 relative">
              <Quote size={32} className="text-violet-200 absolute top-6 right-6" />
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-11 h-11 ${color} rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                  {initials}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{name}</p>
                  <p className="text-gray-400 text-xs">{location}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star key={i} size={13} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">&ldquo;{text}&rdquo;</p>
              <span className="inline-block bg-violet-100 text-violet-700 text-xs font-semibold px-3 py-1 rounded-full">
                {specialty}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
