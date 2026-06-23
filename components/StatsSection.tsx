import { Users, Heart, Star, Stethoscope } from 'lucide-react';

const stats = [
  { icon: Users, value: '200+', label: 'Psicólogos registrados' },
  { icon: Heart, value: '10,000+', label: 'Pacientes atendidos' },
  { icon: Star, value: '4.8★', label: 'Calificación promedio' },
  { icon: Stethoscope, value: '30+', label: 'Especialidades disponibles' },
];

export default function StatsSection() {
  return (
    <section className="bg-teal-700 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center">
              <div className="flex justify-center mb-2">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Icon size={20} className="text-white" />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-white mb-1">{value}</div>
              <div className="text-teal-100 text-sm font-medium">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
