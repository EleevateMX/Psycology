'use client';
import { useState, useMemo } from 'react';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { PsychologistCard } from '@/components/PsychologistCard';
import { psychologists } from '@/lib/data';

const SPECIALTIES = [
  'Ansiedad y Estrés',
  'Terapia de Pareja',
  'Psicología Infantil',
  'Trauma y PTSD',
  'Trastornos Alimenticios',
  'TDAH y Adolescentes',
  'Duelo y Pérdida',
  'Terapia Familiar',
  'Depresión',
];

type Modalidad = 'all' | 'online' | 'presencial';

export default function PsicologosPage() {
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [modalidad, setModalidad] = useState<Modalidad>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1400);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = useMemo(() => {
    return psychologists.filter(p => {
      if (
        selectedSpecialties.length > 0 &&
        !selectedSpecialties.some(s => p.specialties.includes(s) || p.primarySpecialty === s)
      ) {
        return false;
      }
      if (modalidad === 'online' && !p.offersOnline) return false;
      if (modalidad === 'presencial' && !p.offersInPerson) return false;
      if (p.rating < minRating) return false;
      if (p.pricePerSession > maxPrice) return false;
      return true;
    });
  }, [selectedSpecialties, modalidad, minRating, maxPrice]);

  function toggleSpecialty(s: string) {
    setSelectedSpecialties(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    );
  }

  function clearFilters() {
    setSelectedSpecialties([]);
    setModalidad('all');
    setMinRating(0);
    setMaxPrice(1400);
  }

  const hasFilters =
    selectedSpecialties.length > 0 || modalidad !== 'all' || minRating > 0 || maxPrice < 1400;

  function SidebarContent() {
    return (
      <>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-gray-900 text-lg">Filtros</h2>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-teal-600 font-medium hover:underline flex items-center gap-1"
            >
              <X size={12} /> Limpiar
            </button>
          )}
        </div>

        {/* Especialidades */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 text-sm mb-3">Especialidad</h3>
          <div className="space-y-2">
            {SPECIALTIES.map(s => (
              <label key={s} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedSpecialties.includes(s)}
                  onChange={() => toggleSpecialty(s)}
                  className="w-4 h-4 rounded text-teal-600 border-gray-300 focus:ring-teal-500"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{s}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Modalidad */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 text-sm mb-3">Modalidad</h3>
          <div className="space-y-2">
            {(
              [
                ['all', 'Cualquiera'],
                ['online', 'Online'],
                ['presencial', 'Presencial'],
              ] as [Modalidad, string][]
            ).map(([val, label]) => (
              <label key={val} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="radio"
                  name="modalidad"
                  value={val}
                  checked={modalidad === val}
                  onChange={() => setModalidad(val)}
                  className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Precio máximo */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 text-sm mb-3">Precio máximo por sesión</h3>
          <input
            type="range"
            min={700}
            max={1400}
            step={50}
            value={maxPrice}
            onChange={e => setMaxPrice(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>$700</span>
            <span className="font-semibold text-teal-600">${maxPrice} MXN</span>
            <span>$1,400</span>
          </div>
        </div>

        {/* Calificación mínima */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 text-sm mb-3">Calificación mínima</h3>
          <div className="flex gap-2 flex-wrap">
            {[0, 4, 4.5, 5].map(r => (
              <button
                key={r}
                onClick={() => setMinRating(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  minRating === r
                    ? 'bg-teal-600 text-white border-teal-600'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-teal-300'
                }`}
              >
                {r === 0 ? 'Todas' : `${r}+★`}
              </button>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Psicólogos en Mérida</h1>
          <p className="text-gray-500 mt-1">Encuentra al especialista ideal para ti</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
              <SidebarContent />
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Results header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <button
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-teal-300 transition-colors"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  <SlidersHorizontal size={16} />
                  Filtros
                  {hasFilters && (
                    <span className="w-5 h-5 rounded-full bg-teal-600 text-white text-xs flex items-center justify-center">
                      {selectedSpecialties.length || '!'}
                    </span>
                  )}
                </button>
                <p className="text-gray-600 text-sm">
                  <span className="font-bold text-gray-900">{filtered.length}</span> psicólogos encontrados
                </p>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-500">Ordenar por:</label>
                <div className="relative">
                  <select className="appearance-none pl-3 pr-8 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 outline-none hover:border-teal-300 transition-colors cursor-pointer">
                    <option>Más relevantes</option>
                    <option>Mayor calificación</option>
                    <option>Menor precio</option>
                    <option>Más reseñas</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>
            </div>

            {/* Mobile sidebar drawer */}
            {sidebarOpen && (
              <div className="lg:hidden fixed inset-0 z-50 flex">
                <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
                <div className="relative ml-auto w-80 max-w-full bg-white h-full overflow-y-auto p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-lg">Filtros</span>
                    <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-lg hover:bg-gray-100">
                      <X size={20} />
                    </button>
                  </div>
                  <SidebarContent />
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="w-full mt-4 px-6 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors"
                  >
                    Ver {filtered.length} resultados
                  </button>
                </div>
              </div>
            )}

            {/* Results grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map(p => (
                  <PsychologistCard key={p.id} psychologist={p} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No se encontraron resultados</h3>
                <p className="text-gray-500 mb-6">Intenta ajustar los filtros para ver más psicólogos.</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors text-sm"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
