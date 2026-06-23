import Link from 'next/link';

const specialties = [
  { emoji: '😰', name: 'Ansiedad y Estrés', slug: 'ansiedad' },
  { emoji: '😔', name: 'Depresión', slug: 'depresion' },
  { emoji: '💑', name: 'Terapia de Pareja', slug: 'pareja' },
  { emoji: '👶', name: 'Psicología Infantil', slug: 'infantil' },
  { emoji: '🧠', name: 'TCC', slug: 'tcc' },
  { emoji: '👨‍👩‍👧', name: 'Terapia Familiar', slug: 'familiar' },
  { emoji: '💔', name: 'Duelo y Pérdida', slug: 'duelo' },
  { emoji: '⚡', name: 'TDAH', slug: 'tdah' },
];

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
          {specialties.map(({ emoji, name, slug }) => (
            <Link
              key={slug}
              href={`/psicologos?especialidad=${slug}`}
              className="group bg-white rounded-2xl p-5 text-center hover:shadow-md hover:border-violet-300 border border-gray-100 transition-all duration-200"
            >
              <div className="text-4xl mb-3">{emoji}</div>
              <h3 className="font-semibold text-gray-800 text-sm group-hover:text-violet-700 transition-colors">
                {name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
