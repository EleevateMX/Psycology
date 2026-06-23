'use client'

import { useState, useMemo } from 'react'
import PsychologistCard from '@/components/PsychologistCard'
import { psychologists } from '@/lib/data'
import { ChevronDown } from 'lucide-react'

const SPECIALTIES = ['Todos', 'Ansiedad', 'Depresión', 'Pareja', 'Infantil', 'TDAH', 'Trauma', 'Duelo', 'Alimentación', 'TCC']

export default function PsicologosPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('Todos')
  const [onlineOnly, setOnlineOnly] = useState(false)
  const [availableToday, setAvailableToday] = useState(false)
  const [highRating, setHighRating] = useState(false)

  const filtered = useMemo(() => {
    return psychologists.filter(p => {
      if (selectedSpecialty !== 'Todos' && !p.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase())) return false
      if (onlineOnly && !p.online) return false
      if (availableToday && (!p.availability?.[0]?.slots?.length)) return false
      if (highRating && p.rating < 4.5) return false
      return true
    })
  }, [selectedSpecialty, onlineOnly, availableToday, highRating])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Specialty chips */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide">
            {SPECIALTIES.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSpecialty(s)}
                className={`shrink-0 px-4 py-1.5 rounded-full border text-sm font-medium transition-colors whitespace-nowrap ${
                  selectedSpecialty === s
                    ? 'bg-violet-700 text-white border-violet-700'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-violet-300 hover:text-violet-700'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Filter pills */}
          <div className="flex items-center gap-2 pb-3 overflow-x-auto scrollbar-hide">
            {[
              { label: '🎥 Consulta en línea', active: onlineOnly, toggle: () => setOnlineOnly(!onlineOnly) },
              { label: '📅 Disponible hoy', active: availableToday, toggle: () => setAvailableToday(!availableToday) },
              { label: '⭐ 4.5+ estrellas', active: highRating, toggle: () => setHighRating(!highRating) },
              { label: '💰 Precio', active: false, toggle: () => {} },
            ].map((f) => (
              <button
                key={f.label}
                onClick={f.toggle}
                className={`shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full border text-sm transition-colors whitespace-nowrap ${
                  f.active
                    ? 'bg-violet-100 text-violet-700 border-violet-300 font-medium'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-violet-200 hover:text-violet-600'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Cards column */}
          <div className="flex-1 min-w-0">
            {/* Count + sort */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600">
                <span className="font-bold text-gray-900">{filtered.length}</span> psicólogos en Mérida
              </p>
              <button className="flex items-center gap-1 text-sm text-gray-700 border border-gray-300 px-3 py-1.5 rounded-lg hover:bg-gray-50">
                Más relevantes <ChevronDown size={14} />
              </button>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <div className="text-4xl mb-4">🔍</div>
                <p className="font-medium">No se encontraron psicólogos con estos filtros</p>
                <button onClick={() => { setSelectedSpecialty('Todos'); setOnlineOnly(false); setAvailableToday(false); setHighRating(false) }} className="mt-4 text-sm text-violet-600 hover:text-violet-700 underline">
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((p) => (
                  <PsychologistCard key={p.id} psychologist={p} />
                ))}
              </div>
            )}
          </div>

          {/* Map column (sticky) */}
          <div className="w-full lg:w-96 xl:w-[420px] shrink-0">
            <div className="sticky top-32">
              <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                <a
                  href="https://www.openstreetmap.org/#map=13/20.97/-89.62"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-3 right-3 z-10 bg-white text-violet-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md hover:bg-violet-50 transition-colors"
                >
                  Ampliar mapa →
                </a>
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-89.75%2C20.87%2C-89.50%2C21.07&layer=mapnik"
                  width="100%"
                  height="600"
                  style={{ border: 'none', display: 'block' }}
                  title="Mapa de psicólogos en Mérida"
                  loading="lazy"
                />
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">
                Mapa de psicólogos en Mérida, Yucatán
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
