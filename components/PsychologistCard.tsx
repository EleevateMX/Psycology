'use client'

import { useState } from 'react'
import { Star, MapPin, CheckCircle, Video, Clock, Phone, X, Shield, CalendarDays, Building2 } from 'lucide-react'
import type { Psychologist } from '@/lib/types'
import Link from 'next/link'

interface Props {
  psychologist: Psychologist
}

const COLORS = ['bg-violet-500', 'bg-purple-500', 'bg-indigo-500', 'bg-fuchsia-500', 'bg-pink-500']

function getColor(name: string) {
  return COLORS[name.charCodeAt(0) % COLORS.length]
}

function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
}

export default function PsychologistCard({ psychologist }: Props) {
  const [showContact, setShowContact] = useState(false)
  const { name, specialty, rating, reviewCount, location, price, verified, online, availability, cedula, yearsExperience } = psychologist

  const hasAvailabilityToday = (availability?.[0]?.slots?.length ?? 0) > 0
  const nextSlots = availability
    ?.flatMap(d => d.slots.slice(0, 2).map(s => ({ day: d.label.split(' ')[0], slot: s })))
    .slice(0, 4) ?? []

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden">
      <div className="p-5">
        <div className="flex gap-4">
          {/* Avatar */}
          <div className="shrink-0">
            <div className={`w-16 h-16 rounded-2xl ${getColor(name)} flex items-center justify-center text-white text-xl font-bold shadow-sm`}>
              {getInitials(name)}
            </div>
            {online && (
              <div className="flex items-center justify-center gap-1 mt-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-green-600 font-medium">Online</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                {/* Name + badges */}
                <div className="flex items-center gap-2 flex-wrap">
                  <Link
                    href={`/psicologos/${psychologist.id}`}
                    className="font-bold text-gray-900 hover:text-violet-700 transition-colors text-lg leading-tight"
                  >
                    {name}
                  </Link>
                  {verified && (
                    <span className="inline-flex items-center gap-1 text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-medium shrink-0">
                      <CheckCircle size={10} /> Verificado
                    </span>
                  )}
                  {hasAvailabilityToday && (
                    <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium shrink-0">
                      <CalendarDays size={10} /> Disponible hoy
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-0.5">{specialty}</p>
              </div>

              {/* Price (top right) */}
              <div className="text-right shrink-0">
                <div className="text-xl font-extrabold text-gray-900">${price.toLocaleString()}</div>
                <div className="text-xs text-gray-400">por sesión</div>
              </div>
            </div>

            {/* Stars + experience */}
            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} className={i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'} />
                ))}
              </div>
              <span className="text-sm font-bold text-gray-800">{rating.toFixed(1)}</span>
              <span className="text-xs text-gray-500">({reviewCount} opiniones)</span>
              <span className="text-xs text-gray-300 mx-0.5">·</span>
              <span className="text-xs text-gray-500">{yearsExperience} años de exp.</span>
            </div>

            {/* Location + cédula */}
            <div className="flex items-center gap-4 mt-2 flex-wrap">
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <MapPin size={12} className="text-gray-400 shrink-0" />
                {location}
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <Shield size={12} className="text-gray-300 shrink-0" />
                Céd. {cedula}
              </span>
            </div>

            {/* Modality badges */}
            <div className="flex items-center gap-2 mt-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                <Building2 size={11} /> Presencial
              </span>
              {online && (
                <span className="inline-flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded-full border border-green-100">
                  <Video size={11} /> En línea
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Availability slots */}
        {nextSlots.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-1.5 mb-2">
              <Clock size={12} className="text-violet-600" />
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Próximos horarios</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {nextSlots.map(({ day, slot }) => (
                <span
                  key={`${day}-${slot}`}
                  className="text-xs bg-violet-50 text-violet-700 border border-violet-200 px-2.5 py-1 rounded-lg font-medium"
                >
                  {day} {slot}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTAs */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2 flex-wrap">
          <Link
            href={`/psicologos/${psychologist.id}/agendar`}
            className="text-sm bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-bold transition-colors"
          >
            Agendar cita
          </Link>
          <Link
            href={`/psicologos/${psychologist.id}`}
            className="text-sm border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Ver perfil
          </Link>

          {/* Contact */}
          <div className="relative ml-auto">
            <button
              onClick={() => setShowContact(!showContact)}
              className="flex items-center gap-1.5 text-sm border border-violet-200 text-violet-700 hover:bg-violet-50 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Phone size={13} />
              Contactar
            </button>
            {showContact && (
              <div className="absolute bottom-full right-0 mb-2 w-64 bg-white rounded-xl border border-gray-200 shadow-xl z-20 p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Datos de contacto</span>
                  <button onClick={() => setShowContact(false)} className="text-gray-400 hover:text-gray-600">
                    <X size={14} />
                  </button>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Phone size={14} className="text-violet-600 shrink-0" />
                  <span className="text-sm font-semibold text-gray-800">{psychologist.phone}</span>
                </div>
                <Link
                  href={`/psicologos/${psychologist.id}/agendar`}
                  className="block w-full text-center text-xs bg-violet-700 text-white px-3 py-2 rounded-lg font-medium hover:bg-violet-800 transition-colors"
                >
                  Agendar cita online →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
