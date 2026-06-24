import { Search, User, CalendarDays } from 'lucide-react';

const steps = [
  {
    icon: Search,
    number: '1',
    title: 'Busca por especialidad o síntoma',
    description:
      'Filtra por especialidad, ubicación, precio y modalidad de atención. Encuentra al profesional exacto que necesitas.',
  },
  {
    icon: User,
    number: '2',
    title: 'Compara perfiles y lee reseñas reales',
    description:
      'Accede a credenciales verificadas, fotos, tarifas y opiniones auténticas de pacientes para tomar la mejor decisión.',
  },
  {
    icon: CalendarDays,
    number: '3',
    title: 'Agenda tu primera consulta en segundos',
    description:
      'Contáctalo directamente. Citas presenciales u online según prefieras y en el horario que más te acomode.',
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 bg-violet-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-violet-700 font-semibold text-sm uppercase tracking-wider">Proceso simple</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900">¿Cómo funciona Psique?</h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            Encuentra tu psicólogo ideal en 3 simples pasos
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Connecting dotted line — desktop only */}
          <div
            className="hidden md:block absolute top-10 left-[calc(16.67%+2.5rem)] right-[calc(16.67%+2.5rem)] h-0"
            aria-hidden="true"
          >
            <div className="w-full border-t-2 border-dashed border-violet-300" />
          </div>

          {steps.map(({ icon: Icon, number, title, description }) => (
            <div key={number} className="relative text-center group">
              <div className="flex justify-center mb-5">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-white shadow-sm border border-violet-100 flex items-center justify-center group-hover:border-violet-300 transition-colors">
                    <Icon size={32} className="text-violet-700" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-violet-700 text-white text-sm font-extrabold flex items-center justify-center shadow-md">
                    {number}
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
