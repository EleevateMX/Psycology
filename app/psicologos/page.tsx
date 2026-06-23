'use client'

import { useState, useMemo, useRef, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import PsychologistCard from '@/components/PsychologistCard'
import { psychologists } from '@/lib/data'
import { Video, CalendarDays, Star, DollarSign, ChevronDown, Search, Check } from 'lucide-react'

const SPECIALTIES = ['Todos', 'Ansiedad', 'Depresión', 'Pareja', 'Infantil', 'TDAH', 'Trauma', 'Duelo', 'Alimentación', 'TCC']

const PRICE_RANGES = [
  { label: 'Cualquier precio', min: 0, max: Infinity },
  { label: 'Menos de $600', min: 0, max: 600 },
  { label: '$600 – $900', min: 600, max: 900 },
  { label: '$900 – $1,200', min: 900, max: 1200 },
  { label: 'Más de $1,200', min: 1200, max: Infinity },
]

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Más relevantes' },
  { value: 'rating', label: 'Mejor calificados' },
  { value: 'reviews', label: 'Más reseñas' },
  { value: 'price-asc', label: 'Menor precio' },
  { value: 'price-desc', label: 'Mayor precio' },
]

function PsicologosContent() {
  const searchParams = useSearchParams()

  const [selectedSpecialty, setSelectedSpecialty] = useState(() => {
    const sp = searchParams.get('specialty') ?? ''
    return SPECIALTIES.find(s => s.toLowerCase() === sp.toLowerCase() ||
      sp.toLowerCase().includes(s.toLowerCase())) ?? 'Todos'
  })
  const [onlineOnly, setOnlineOnly] = useState(() => searchParams.get('online') === '1')
  const [availableToday, setAvailableToday] = useState(false)
  const [highRating, setHighRating] = useState(false)
  const [priceRangeIdx, setPriceRangeIdx] = useState(0)
  const [priceDropdown, setPriceDropdown] = useState(false)
  const [sortBy, setSortBy] = useState('relevance')
  const priceRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (priceRef.current && !priceRef.current.contains(e.target as Node)) {
        setPriceDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const { min: priceMin, max: priceMax } = PRICE_RANGES[priceRangeIdx]
  const priceActive = priceRangeIdx > 0

  const filtered = useMemo(() => {
    const arr = psychologists.filter(p => {
      if (selectedSpecialty !== 'Todos' && !p.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase())) return false
      if (onlineOnly && !p.online) return false
      if (availableToday && !p.availability?.[0]?.slots?.length) return false
      if (highRating && p.rating < 4.5) return false
      if (priceActive && (p.price < priceMin || p.price >= priceMax)) return false
      return true
    })

    switch (sortBy) {
      case 'rating': return [...arr].sort((a, b) => b.rating - a.rating)
      case 'reviews': return [...arr].sort((a, b) => b.reviewCount - a.reviewCount)
      case 'price-asc': return [...arr].sort((a, b) => a.price - b.price)
      case 'price-desc': return [...arr].sort((a, b) => b.price - a.price)
      default: return arr
    }
  }, [selectedSpecialty, onlineOnly, availableToday, highRating, priceRangeIdx, sortBy, priceMin, priceMax, priceActive])

  function clearAll() {
    setSelectedSpecialty('Todos')
    setOnlineOnly(false)
    setAvailableToday(false)
    setHighRating(false)
    setPriceRangeIdx(0)
    setSortBy('relevance')
  }

  const hasFilters = selectedSpecialty !== 'Todos' || onlineOnly || availableToday || highRating || priceActive

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
            <button
              onClick={() => setOnlineOnly(!onlineOnly)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm transition-colors whitespace-nowrap ${
                onlineOnly ? 'bg-violet-100 text-violet-700 border-violet-300 font-medium' : 'bg-white text-gray-600 border-gray-300 hover:border-violet-200 hover:text-violet-600'
              }`}
            >
              <Video size={13} />
              Consulta en línea
            </button>
            <button
              onClick={() => setAvailableToday(!availableToday)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm transition-colors whitespace-nowrap ${
                availableToday ? 'bg-violet-100 text-violet-700 border-violet-300 font-medium' : 'bg-white text-gray-600 border-gray-300 hover:border-violet-200 hover:text-violet-600'
              }`}
            >
              <CalendarDays size={13} />
              Disponible hoy
            </button>
            <button
              onClick={() => setHighRating(!highRating)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm transition-colors whitespace-nowrap ${
                highRating ? 'bg-violet-100 text-violet-700 border-violet-300 font-medium' : 'bg-white text-gray-600 border-gray-300 hover:border-violet-200 hover:text-violet-600'
              }`}
            >
              <Star size={13} />
              4.5+ estrellas
            </button>

            {/* Price dropdown */}
            <div ref={priceRef} className="relative shrink-0">
              <button
                onClick={() => setPriceDropdown(!priceDropdown)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm transition-colors whitespace-nowrap ${
                  priceActive ? 'bg-violet-100 text-violet-700 border-violet-300 font-medium' : 'bg-white text-gray-600 border-gray-300 hover:border-violet-200 hover:text-violet-600'
                }`}
              >
                <DollarSign size={13} />
                {priceActive ? PRICE_RANGES[priceRangeIdx].label : 'Precio'}
                <ChevronDown size={13} className={`transition-transform ${priceDropdown ? 'rotate-180' : ''}`} />
              </button>
              {priceDropdown && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl border border-gray-100 shadow-xl z-30 overflow-hidden">
                  {PRICE_RANGES.map((range, idx) => (
                    <button
                      key={range.label}
                      onClick={() => { setPriceRangeIdx(idx); setPriceDropdown(false) }}
                      className={`w-full flex items-center justify-between px-4 py-3 text-sm text-left transition-colors ${
                        priceRangeIdx === idx ? 'bg-violet-50 text-violet-700 font-medium' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {range.label}
                      {priceRangeIdx === idx && <Check size={14} />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {hasFilters && (
              <button
                onClick={clearAll}
                className="shrink-0 px-3 py-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors whitespace-nowrap underline"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Cards column */}
          <div className="flex-1 min-w-0">
            {/* Count + sort */}
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <p className="text-sm text-gray-600">
                <span className="font-bold text-gray-900">{filtered.length}</span> psicólogos en Mérida
                {selectedSpecialty !== 'Todos' && (
                  <span className="ml-1 text-violet-700">· {selectedSpecialty}</span>
                )}
              </p>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="text-sm text-gray-700 border border-gray-300 px-3 py-1.5 rounded-lg hover:bg-gray-50 bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={28} className="text-gray-300" />
                </div>
                <p className="font-medium">No se encontraron psicólogos con estos filtros</p>
                <button
                  onClick={clearAll}
                  className="mt-4 text-sm text-violet-600 hover:text-violet-700 underline"
                >
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

export default function PsicologosPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-violet-700 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <PsicologosContent />
    </Suspense>
  )
}
