import { Search } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-white pt-16 pb-20">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-teal-100 rounded-full opacity-40 translate-x-24 -translate-y-12 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-50 rounded-full opacity-60 -translate-x-16 translate-y-8 blur-2xl" />
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-orange-50 rounded-full opacity-30 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-50 border border-teal-100 rounded-full text-teal-700 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            Más de 200 psicólogos verificados en Mérida
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4 text-balance">
            Encuentra al psicólogo{' '}
            <span className="text-teal-600">ideal para ti</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Más de 200 psicólogos verificados en Mérida y toda la República Mexicana.{' '}
            <span className="font-medium text-gray-600">Presencial y online.</span>
          </p>

          {/* Search bar */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-3 flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto mb-6">
            <select className="flex-1 px-4 py-3 text-gray-600 bg-gray-50 rounded-xl border-0 outline-none text-sm font-medium appearance-none cursor-pointer">
              <option value="">Especialidad...</option>
              <option>Ansiedad y Estrés</option>
              <option>Depresión</option>
              <option>Terapia de Pareja</option>
              <option>Psicología Infantil</option>
              <option>TDAH</option>
              <option>Trauma y PTSD</option>
              <option>Duelo y Pérdida</option>
              <option>Trastornos Alimenticios</option>
            </select>
            <select className="flex-1 px-4 py-3 text-gray-600 bg-gray-50 rounded-xl border-0 outline-none text-sm font-medium appearance-none cursor-pointer">
              <option>Mérida, Yucatán</option>
              <option>Online (todo México)</option>
              <option>Ciudad de México</option>
              <option>Monterrey</option>
            </select>
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors whitespace-nowrap">
              <Search size={18} />
              Buscar
            </button>
          </div>

          {/* Popular searches */}
          <p className="text-sm text-gray-400 mb-10">
            <span className="font-medium text-gray-500">Búsquedas populares: </span>
            {['Ansiedad', 'Depresión', 'Terapia de pareja', 'Psicología infantil'].map((term, i, arr) => (
              <span key={term}>
                <a href="#" className="text-teal-600 hover:text-teal-700 hover:underline transition-colors">
                  {term}
                </a>
                {i < arr.length - 1 && <span className="mx-1.5 text-gray-300">·</span>}
              </span>
            ))}
          </p>

          {/* Trust badges */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            {[
              { icon: '✓', text: 'Perfiles verificados' },
              { icon: '✓', text: 'Cédulas profesionales' },
              { icon: '✓', text: 'Reseñas reales' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-xs font-bold">
                  {icon}
                </span>
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
