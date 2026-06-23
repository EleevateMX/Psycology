import { CheckCircle } from 'lucide-react';

const benefits = [
  'Aumenta tu visibilidad online',
  'Gestiona tus citas fácilmente',
  'Recibe reseñas verificadas',
  'Perfil profesional gratuito',
  'Llega a miles de pacientes potenciales',
];

export default function JoinSection() {
  return (
    <section id="para-psicologos" className="py-20 bg-gradient-to-br from-teal-700 to-teal-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left content */}
          <div className="flex-1 text-white">
            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium text-teal-100 mb-4">
              Para profesionales
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              ¿Eres psicólogo?{' '}
              <span className="text-teal-300">Únete a Psique</span>
            </h2>
            <p className="text-teal-100 text-lg mb-8 max-w-md leading-relaxed">
              Forma parte del directorio líder de psicólogos en Mérida y conecta con pacientes que te necesitan.
            </p>
            <ul className="space-y-3 mb-8">
              {benefits.map(benefit => (
                <li key={benefit} className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-teal-300 flex-shrink-0" />
                  <span className="text-teal-50 text-sm font-medium">{benefit}</span>
                </li>
              ))}
            </ul>
            <p className="text-teal-200 text-sm">Ya somos más de 200 psicólogos en Mérida y México</p>
          </div>

          {/* Right CTA card */}
          <div className="flex-shrink-0 w-full lg:w-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm mx-auto text-center">
              <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🧠</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Crea tu perfil gratis</h3>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                En menos de 10 minutos tendrás tu perfil profesional listo para recibir pacientes.
              </p>
              <button className="w-full px-6 py-3.5 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors text-sm mb-3">
                Crear mi perfil gratis
              </button>
              <button className="w-full px-6 py-3 border border-gray-200 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-colors text-sm">
                Conocer más
              </button>
              <p className="text-xs text-gray-400 mt-4">Sin tarjeta de crédito · Siempre gratis</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
