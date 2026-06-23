import { notFound } from 'next/navigation';
import { MapPin, Video, Building2, BadgeCheck, Shield, Phone, Share2, Clock, GraduationCap, Star } from 'lucide-react';
import { StarRating } from '@/components/StarRating';
import { ReviewCard } from '@/components/ReviewCard';
import { psychologists } from '@/lib/data';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return psychologists.map(p => ({ id: p.id }));
}

export default async function PsychologistProfilePage({ params }: Props) {
  const { id } = await params;
  const p = psychologists.find(x => x.id === id);

  if (!p) notFound();

  const ratingBreakdown: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  p.reviews.forEach(r => {
    const rounded = Math.round(r.rating);
    ratingBreakdown[rounded] = (ratingBreakdown[rounded] ?? 0) + 1;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero header */}
      <div className="bg-gradient-to-br from-violet-700 to-violet-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div
              className="w-28 h-28 rounded-3xl flex items-center justify-center text-white font-bold text-4xl flex-shrink-0 shadow-lg"
              style={{ backgroundColor: p.avatarColor }}
            >
              {p.initials}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold">
                  {p.prefix} {p.name}
                </h1>
                {p.verified && (
                  <div className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full">
                    <BadgeCheck size={14} className="text-violet-300" />
                    <span className="text-xs text-violet-100 font-medium">Verificado</span>
                  </div>
                )}
              </div>
              <p className="text-violet-200 font-medium mb-3">{p.primarySpecialty}</p>
              <div className="flex items-center gap-3 flex-wrap">
                <StarRating rating={p.rating} size="md" showNumber count={p.reviewCount} />
              </div>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center gap-1.5 text-violet-100 text-sm">
                  <Clock size={15} className="text-violet-300" />
                  {p.yearsExperience} años de experiencia
                </div>
                <div className="flex items-center gap-1.5 text-violet-100 text-sm">
                  <MapPin size={15} className="text-violet-300" />
                  {p.neighborhood}, Mérida
                </div>
                {p.offersOnline && (
                  <span className="flex items-center gap-1 text-violet-100 text-sm">
                    <Video size={15} className="text-violet-300" /> Online
                  </span>
                )}
                {p.offersInPerson && (
                  <span className="flex items-center gap-1 text-violet-100 text-sm">
                    <Building2 size={15} className="text-violet-300" /> Presencial
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1 min-w-0 space-y-8">
            {/* Sobre mí */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Sobre mí</h2>
              <p className="text-gray-600 leading-relaxed text-sm">{p.bio}</p>
              {p.languages.length > 0 && (
                <div className="mt-4 flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-gray-700">Idiomas:</span>
                  {p.languages.map(l => (
                    <span
                      key={l}
                      className="px-2.5 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium"
                    >
                      {l}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Formación */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <GraduationCap size={20} className="text-violet-700" />
                Formación académica
              </h2>
              <div className="space-y-4">
                {p.education.map((edu, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-violet-700 mt-1 flex-shrink-0" />
                      {i < p.education.length - 1 && (
                        <div className="w-0.5 flex-1 bg-violet-100 mt-1" />
                      )}
                    </div>
                    <div className="pb-4 flex-1">
                      <div className="font-semibold text-gray-900 text-sm">{edu.degree}</div>
                      <div className="text-gray-500 text-xs mt-0.5">{edu.institution}</div>
                      <div className="text-violet-700 text-xs font-medium mt-0.5">{edu.year}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cédula profesional */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Shield size={20} className="text-violet-700" />
                Cédula profesional
              </h2>
              <div className="flex items-center gap-3 p-4 bg-violet-50 rounded-xl">
                <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0">
                  <Shield size={18} className="text-violet-700" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium">Número de cédula (SEP)</div>
                  <div className="font-bold text-gray-900 text-lg tracking-wide">{p.cedula}</div>
                  <div className="text-xs text-violet-700 font-medium mt-0.5">Verificada en el sistema SEP</div>
                </div>
              </div>
            </div>

            {/* Especialidades */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Especialidades</h2>
              <div className="flex flex-wrap gap-2">
                {p.specialties.map(s => (
                  <span
                    key={s}
                    className="px-3 py-1.5 bg-violet-50 text-violet-700 rounded-full text-sm font-medium border border-violet-100"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Reseñas */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Star size={20} className="text-amber-400 fill-amber-400" />
                Reseñas de pacientes
              </h2>

              {/* Rating summary */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 mb-8 p-5 bg-gray-50 rounded-xl">
                <div className="text-center">
                  <div className="text-5xl font-extrabold text-gray-900">{p.rating.toFixed(1)}</div>
                  <StarRating rating={p.rating} size="lg" />
                  <div className="text-xs text-gray-400 mt-1">{p.reviewCount} reseñas</div>
                </div>
                <div className="flex-1 w-full space-y-1.5">
                  {[5, 4, 3, 2, 1].map(star => {
                    const count = ratingBreakdown[star] ?? 0;
                    const pct = p.reviews.length > 0 ? (count / p.reviews.length) * 100 : 0;
                    return (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 w-4">{star}</span>
                        <Star size={11} className="text-amber-400 fill-amber-400" />
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-400 rounded-full transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-400 w-4">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4">
                {p.reviews.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </div>
          </div>

          {/* Sticky sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24 space-y-5">
              {/* Price */}
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">
                  Precio por sesión
                </div>
                <div className="text-3xl font-extrabold text-gray-900">
                  ${p.pricePerSession.toLocaleString()}{' '}
                  <span className="text-base font-normal text-gray-400">MXN</span>
                </div>
              </div>

              {/* Next available */}
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl">
                <Clock size={16} className="text-green-600 flex-shrink-0" />
                <div>
                  <div className="text-xs text-gray-500">Próxima disponibilidad</div>
                  <div className="text-sm font-semibold text-green-700">{p.nextAvailable}</div>
                </div>
              </div>

              {/* CTA button */}
              <button className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors text-base">
                Agendar cita
              </button>

              {/* Contact info */}
              <div className="space-y-3 pt-2 border-t border-gray-100">
                <div className="flex items-start gap-3">
                  <Phone size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-gray-400 font-medium">Teléfono</div>
                    <div className="text-sm font-semibold text-gray-700">+52 999 ***-****</div>
                    <div className="text-xs text-gray-400">(visible al agendar)</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-gray-400 font-medium">Dirección</div>
                    <div className="text-sm text-gray-600 leading-relaxed">{p.address}</div>
                  </div>
                </div>
              </div>

              {/* Modality */}
              <div className="flex gap-2 pt-1 flex-wrap">
                {p.offersOnline && (
                  <span className="flex items-center gap-1 px-3 py-1.5 bg-violet-50 text-violet-700 text-xs font-medium rounded-full border border-violet-200">
                    <Video size={12} /> Online
                  </span>
                )}
                {p.offersInPerson && (
                  <span className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-600 text-xs font-medium rounded-full">
                    <Building2 size={12} /> Presencial
                  </span>
                )}
              </div>

              {/* Share */}
              <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors">
                <Share2 size={15} />
                Compartir perfil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
