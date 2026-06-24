import { Users, Star, Building2, Globe } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '200+',
    label: 'Psicólogos',
    description: 'Profesionales verificados con cédula',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    icon: Star,
    value: '10,000+',
    label: 'Pacientes atendidos',
    description: 'Personas que encontraron su psicólogo',
    color: 'text-yellow-500',
    bg: 'bg-yellow-50',
  },
  {
    icon: Building2,
    value: '4.8★',
    label: 'Calificación promedio',
    description: 'Basada en reseñas verificadas',
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
  {
    icon: Globe,
    value: '32',
    label: 'Especialidades disponibles',
    description: 'Desde ansiedad hasta TDAH y más',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
];

export default function StatsSection() {
  return (
    <section className="bg-white border-t border-b border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ icon: Icon, value, label, description, color, bg }) => (
            <div key={label} className="text-center">
              <div className="flex justify-center mb-3">
                <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center`}>
                  <Icon size={22} className={color} />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-violet-700 mb-1">{value}</div>
              <div className="text-gray-900 font-semibold text-sm mb-1">{label}</div>
              <div className="text-gray-500 text-xs leading-relaxed">{description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
