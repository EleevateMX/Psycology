'use client'

import { Star, MapPin, CheckCircle, Video, Clock } from 'lucide-react'
import type { Psychologist } from '@/lib/types'
import Link from 'next/link'

interface Props {
  psychologist: Psychologist
}

const COLORS = ['bg-violet-500', 'bg-purple-500', 'bg-indigo-500', 'bg-fuchsia-500', 'bg-pink-500']

function getColor(name: string) {
  const idx = name.charCodeAt(0) % COLORS.length
  return COLORS[idx]
}

function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
}

export default function PsychologistCard({ psychologist }: Props) {
  const { name, specialty, rating, reviewCount, location, price, verified, online, availability } = psychologist

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-gray-100">

        {/* LEFT: Profile info (3 cols) */}
        <div className="md:col-span-3 p-5">
          <div className="flex gap-4">
            {/* Avatar */}
            <div className="shrink-0">
              <div className={`w-16 h-16 rounded-full ${getColor(name)} flex items-center justify-center text-white text-xl font-bold`}>
                {getInitials(name)}
              </div>
              {online && (
                <div className="flex items-center gap-1 mt-1.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-xs text-green-600">En línea</span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Link href={`/psicologos/${psychologist.id}`} className="font-bold text-gray-900 hover:text-violet-700 transition-colors text-lg leading-tight">
                  {name}
                </Link>
                {verified && (
                  <span className="inline-flex items-center gap-1 text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-medium">
                    <CheckCircle size={10} /> Verificado
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-0.5">{specialty}</p>

              {/* Stars */}
              <div className="flex items-center gap-1.5 mt-1.5">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} className={i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-800">{rating.toFixed(1)}</span>
                <span className="text-xs text-gray-500">({reviewCount} opiniones)</span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-1 mt-2 text-sm text-gray-500">
                <MapPin size={13} className="text-gray-400 shrink-0" />
                <span className="truncate">{location}</span>
              </div>

              {/* Modality tabs */}
              <div className="flex items-center gap-2 mt-3">
                <span className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                  <MapPin size={11} /> Presencial
                </span>
                {online && (
                  <span className="inline-flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded-full">
                    <Video size={11} /> En línea
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="mt-3">
                <span className="text-base font-bold text-gray-900">${price}</span>
                <span className="text-xs text-gray-400 ml-1">/ sesión</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-4 flex items-center gap-2">
            <Link
              href={`/psicologos/${psychologist.id}`}
              className="text-sm bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Ver perfil
            </Link>
            <Link
              href={`/psicologos/${psychologist.id}`}
              className="text-sm border border-violet-200 text-violet-700 hover:bg-violet-50 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Contactar
            </Link>
          </div>
        </div>

        {/* RIGHT: Availability (2 cols) */}
        <div className="md:col-span-2 p-5 bg-gray-50">
          <div className="flex items-center gap-1.5 mb-3">
            <Clock size={13} className="text-violet-600" />
            <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Disponibilidad</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {availability?.map((day) => (
              <div key={day.label} className="bg-white rounded-xl border border-gray-200 p-2.5">
                <div className="text-xs font-semibold text-gray-700 mb-1.5 truncate">{day.label}</div>
                {day.slots.length > 0 ? (
                  <div className="flex flex-col gap-1">
                    {day.slots.slice(0, 2).map((slot) => (
                      <button
                        key={slot}
                        className="w-full text-center text-xs font-medium bg-violet-100 hover:bg-violet-200 text-violet-700 py-1 rounded-lg transition-colors"
                      >
                        {slot}
                      </button>
                    ))}
                    {day.slots.length > 2 && (
                      <span className="text-xs text-gray-400 text-center">+{day.slots.length - 2} más</span>
                    )}
                  </div>
                ) : (
                  <div className="text-xs text-gray-400 text-center py-1">—</div>
                )}
              </div>
            ))}
          </div>

          {availability?.some(d => d.slots.length > 0) && (
            <Link href={`/psicologos/${psychologist.id}`} className="block mt-3 text-xs text-violet-600 hover:text-violet-700 font-medium text-right">
              Ver más disponibilidad →
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
