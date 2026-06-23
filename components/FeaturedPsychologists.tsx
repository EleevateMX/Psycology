import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PsychologistCard from './PsychologistCard';
import { psychologists } from '@/lib/data';

export default function FeaturedPsychologists() {
  const featured = psychologists.slice(0, 4);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
          <div>
            <span className="text-violet-700 font-semibold text-sm uppercase tracking-wider">Destacados</span>
            <h2 className="mt-1 text-3xl sm:text-4xl font-extrabold text-gray-900">
              Psicólogos destacados en Mérida
            </h2>
          </div>
          <Link
            href="/psicologos"
            className="flex items-center gap-2 text-violet-700 font-semibold hover:text-violet-800 transition-colors text-sm whitespace-nowrap group"
          >
            Ver todos
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="space-y-4">
          {featured.map(p => (
            <PsychologistCard key={p.id} psychologist={p} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/psicologos"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-violet-700 text-white font-semibold rounded-xl hover:bg-violet-800 transition-colors text-sm"
          >
            Ver todos los psicólogos
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
