'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, CheckCircle, Shield, Star, Video } from 'lucide-react'

const QUICK_SPECIALTIES = [
  { label: 'Ansiedad', query: 'Ansiedad', color: 'bg-orange-50 hover:bg-orange-100 text-orange-700 border-orange-200' },
  { label: 'Depresión', query: 'Depresión', color: 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200' },
  { label: 'Terapia de pareja', query: 'Pareja', color: 'bg-pink-50 hover:bg-pink-100 text-pink-700 border-pink-200' },
  { label: 'Psicología infantil', query: 'Infantil', color: 'bg-yellow-50 hover:bg-yellow-100 text-yellow-700 border-yellow-200' },
  { label: 'TDAH', query: 'TDAH', color: 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200' },
  { label: 'Duelo', query: 'Duelo', color: 'bg-green-50 hover:bg-green-100 text-green-700 border-green-200' },
  { label: 'En línea', query: '', color: 'bg-violet-50 hover:bg-violet-100 text-violet-700 border-violet-200', online: true },
]

const TRUST_BADGES = [
  { icon: Shield, text: 'Cédulas verificadas' },
  { icon: Star, text: '4.8★ promedio' },
  { icon: Video, text: 'Atención online' },
  { icon: CheckCircle, text: 'Agenda en minutos' },
]

export default function HeroSection() {
  const [specialty, setSpecialty] = useState('')
  const router = useRouter()

  function handleSearch() {
    const params = new URLSearchParams()
    if (specialty) params.set('specialty', specialty)
    router.push(`/psicologos${params.size ? '?' + params.toString() : ''}`)
  }

  function handleChip(query: string, online?: boolean) {
    const params = new URLSearchParams()
    if (query) params.set('specialty', query)
    if (online) params.set('online', '1')
    router.push(`/psicologos?${params.toString()}`)
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-white pt-14 pb-16">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-100 rounded-full opacity-30 translate-x-32 -translate-y-20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-50 rounded-full opacity-50 -translate-x-20 translate-y-10 blur-2xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-56 h-56 bg-orange-50 rounded-full opacity-25 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Live badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-50 border border-violet-200 rounded-full text-violet-700 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Más de 200 psicólogos verificados en Mérida
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
            Encuentra apoyo psicológico{' '}
            <span className="text-violet-700">confiable en Mérida</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed">
            Psicólogos verificados, reseñas reales y agenda fácil.{' '}
            <span className="font-semibold text-gray-700">Presencial y en línea.</span>
          </p>

          {/* Search bar */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2.5 flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto mb-5">
            <select
              value={specialty}
              onChange={e => setSpecialty(e.target.value)}
              className="flex-1 px-4 py-3 text-gray-600 bg-gray-50 rounded-xl border-0 outline-none text-sm font-medium appearance-none cursor-pointer"
            >
              <option value="">¿Qué tipo de apoyo buscas?</option>
              <option>Ansiedad</option>
              <option>Depresión</option>
              <option>Pareja</option>
              <option>Infantil</option>
              <option>TDAH</option>
              <option>Trauma</option>
              <option>Duelo</option>
              <option>Alimentación</option>
              <option>Organizacional</option>
              <option>Sexología</option>
              <option>Adicciones</option>
            </select>
            <select className="flex-1 px-4 py-3 text-gray-600 bg-gray-50 rounded-xl border-0 outline-none text-sm font-medium appearance-none cursor-pointer">
              <option>Mérida, Yucatán</option>
              <option>Online (todo México)</option>
            </select>
            <button
              onClick={handleSearch}
              className="flex items-center justify-center gap-2 px-7 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors whitespace-nowrap text-sm"
            >
              <Search size={17} />
              Buscar
            </button>
          </div>

          {/* Specialty quick chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {QUICK_SPECIALTIES.map(({ label, query, color, online }) => (
              <button
                key={label}
                onClick={() => handleChip(query, online)}
                className={`px-3.5 py-1.5 rounded-full border text-xs font-semibold transition-colors cursor-pointer ${color}`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {TRUST_BADGES.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5 text-sm text-gray-600">
                <Icon size={15} className="text-violet-600 shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
