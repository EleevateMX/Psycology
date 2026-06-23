import Link from 'next/link';
import { MapPin, Clock, Video, Building2, BadgeCheck } from 'lucide-react';
import { StarRating } from './StarRating';
import type { Psychologist } from '@/lib/types';

interface PsychologistCardProps {
  psychologist: Psychologist;
}

export function PsychologistCard({ psychologist }: PsychologistCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col">
      {/* Card header */}
      <div className="p-5 pb-4">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
            style={{ backgroundColor: psychologist.avatarColor }}
          >
            {psychologist.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div>
              <h3 className="font-bold text-gray-900 text-base leading-tight">
                {psychologist.prefix} {psychologist.name}
              </h3>
              {psychologist.verified && (
                <div className="flex items-center gap-1 mt-0.5">
                  <BadgeCheck size={13} className="text-teal-600" />
                  <span className="text-xs text-teal-600 font-medium">Verificado</span>
                </div>
              )}
            </div>
            <span className="inline-block mt-1.5 px-2.5 py-0.5 bg-teal-50 text-teal-700 text-xs font-medium rounded-full">
              {psychologist.primarySpecialty}
            </span>
          </div>
        </div>

        {/* Rating */}
        <div className="mt-3 flex items-center gap-2">
          <StarRating rating={psychologist.rating} size="sm" showNumber count={psychologist.reviewCount} />
        </div>

        {/* Info rows */}
        <div className="mt-3 space-y-1.5">
          <div className="flex items-center gap-1.5 text-gray-500 text-xs">
            <MapPin size={13} className="text-gray-400 flex-shrink-0" />
            <span>{psychologist.neighborhood}, Mérida</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500 text-xs">
            <Clock size={13} className="text-gray-400 flex-shrink-0" />
            <span>{psychologist.yearsExperience} años de experiencia</span>
          </div>
        </div>

        {/* Modality badges */}
        <div className="mt-3 flex items-center gap-2">
          {psychologist.offersOnline && (
            <span className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
              <Video size={11} />
              Online
            </span>
          )}
          {psychologist.offersInPerson && (
            <span className="flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-600 text-xs font-medium rounded-full">
              <Building2 size={11} />
              Presencial
            </span>
          )}
        </div>
      </div>

      {/* Card footer */}
      <div className="mt-auto border-t border-gray-50 p-4 bg-gray-50/50">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xs text-gray-400">Desde</span>
            <div className="font-bold text-gray-900 text-base">
              ${psychologist.pricePerSession.toLocaleString()} MXN
            </div>
            <span className="text-xs text-gray-400">por sesión</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-400">Próxima cita</span>
            <div className="text-xs font-semibold text-green-600 mt-0.5">{psychologist.nextAvailable}</div>
          </div>
        </div>

        <div className="flex gap-2">
          <Link
            href={`/psicologos/${psychologist.id}`}
            className="flex-1 text-center px-3 py-2 text-sm font-medium text-teal-600 border border-teal-200 rounded-lg hover:bg-teal-50 transition-colors"
          >
            Ver perfil
          </Link>
          <button className="flex-1 px-3 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors">
            Agendar cita
          </button>
        </div>
      </div>
    </div>
  );
}
