import { Search, ClipboardList, CalendarCheck } from 'lucide-react';

const steps = [
  {
    icon: Search,
    number: '1',
    title: 'Busca tu psicólogo',
    description:
      'Filtra por especialidad, ubicación, precio y modalidad de atención para encontrar al profesional ideal.',
  },
  {
    icon: ClipboardList,
    number: '2',
    title: 'Revisa perfiles y reseñas',
    description:
      'Accede a información detallada, credenciales verificadas y opiniones de otros pacientes para tomar la mejor decisión.',
  },
  {
    icon: CalendarCheck,
    number: '3',
    title: 'Agenda tu cita',
    description:
      'Contáctalo directamente. Citas presenciales u online, según prefieras y en el horario que más te acomode.',
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Proceso simple</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900">¿Cómo funciona Psique?</h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            En tres pasos sencillos, encuentra al psicólogo que necesitas y agenda tu primera cita.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line on desktop */}
          <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-teal-200 via-teal-300 to-teal-200" />

          {steps.map(({ icon: Icon, number, title, description }) => (
            <div key={number} className="relative text-center group">
              <div className="flex justify-center mb-5">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-teal-50 flex items-center justify-center group-hover:bg-teal-100 transition-colors">
                    <Icon size={32} className="text-teal-600" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center shadow-md">
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
