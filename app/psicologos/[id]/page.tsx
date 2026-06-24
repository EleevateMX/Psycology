import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Video, Building2, BadgeCheck, Shield, Phone, Clock, GraduationCap, Star, AlertTriangle, CheckCircle, ChevronLeft, DollarSign } from 'lucide-react';
import { StarRating } from '@/components/StarRating';
import { ReviewCard } from '@/components/ReviewCard';
import { ShareButton } from '@/components/ShareButton';
import { MessageButton } from '@/components/MessageButton';
import { psychologists } from '@/lib/data';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return psychologists.map(p => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const p = psychologists.find(x => x.id === id);
  if (!p) return {};
  return {
    title: `${p.prefix} ${p.name} — ${p.primarySpecialty} en Mérida`,
    description: `Perfil de ${p.prefix} ${p.name}, especialista en ${p.primarySpecialty} en ${p.neighborhood}, Mérida. ${p.yearsExperience} años de experiencia. ${p.rating.toFixed(1)}★ (${p.reviewCount} reseñas). Cédula ${p.cedula}.`,
  };
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

  // Build services list from psychologist data
  const services = [
    { name: 'Consulta individual', price: p.pricePerSession, duration: '50-60 min', desc: 'Sesión de psicoterapia individual' },
    { name: 'Primera consulta', price: Math.round(p.pricePerSession * 0.8), duration: '60-75 min', desc: 'Evaluación inicial y plan de tratamiento' },
    ...(p.offersOnline ? [{ name: 'Sesión en línea', price: p.pricePerSession, duration: '50 min', desc: 'Videollamada (Zoom o Google Meet)' }] : []),
    ...(p.specialties.some(s => s.toLowerCase().includes('pareja')) ? [{ name: 'Terapia de pareja', price: Math.round(p.pricePerSession * 1.3), duration: '90 min', desc: 'Sesión de terapia para parejas' }] : []),
    ...(p.specialties.some(s => s.toLowerCase().includes('familiar') || s.toLowerCase().includes('familia')) ? [{ name: 'Terapia familiar', price: Math.round(p.pricePerSession * 1.4), duration: '90 min', desc: 'Sesión con todo el grupo familiar' }] : []),
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <Link
            href="/psicologos"
            className="inline-flex items-center gap-1.5 text-sm text-violet-600 hover:text-violet-700 font-medium"
          >
            <ChevronLeft size={15} />
            Psicólogos en Mérida
          </Link>
        </div>
      </div>

      {/* Hero header */}
      <div className="bg-gradient-to-br from-violet-700 to-violet-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl flex items-center justify-center text-white font-bold text-4xl flex-shrink-0 shadow-xl ring-4 ring-white/20"
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
                  <div className="flex items-center gap-1 bg-white/20 px-2.5 py-0.5 rounded-full">
                    <BadgeCheck size={14} className="text-violet-300" />
                    <span className="text-xs text-violet-100 font-semibold">Verificado</span>
                  </div>
                )}
              </div>
              <p className="text-violet-200 font-medium mb-3 text-lg">{p.primarySpecialty}</p>
              <div className="flex items-center gap-3 flex-wrap mb-4">
                <StarRating rating={p.rating} size="md" showNumber count={p.reviewCount} />
              </div>

              {/* Quick stats row */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-1.5 text-violet-100 text-sm">
                  <Clock size={15} className="text-violet-300" />
                  {p.yearsExperience} años de experiencia
                </div>
                <div className="flex items-center gap-1.5 text-violet-100 text-sm">
                  <MapPin size={15} className="text-violet-300" />
                  {p.neighborhood}, Mérida
                </div>
                <div className="flex items-center gap-1.5 text-violet-100 text-sm">
                  <Shield size={15} className="text-violet-300" />
                  Céd. {p.cedula}
                </div>
                {p.offersOnline && (
                  <span className="flex items-center gap-1 text-violet-100 text-sm">
                    <Video size={15} className="text-violet-300" /> Atención en línea
                  </span>
                )}
                {p.offersInPerson && (
                  <span className="flex items-center gap-1 text-violet-100 text-sm">
                    <Building2 size={15} className="text-violet-300" /> Presencial
                  </span>
                )}
              </div>
            </div>

            {/* Mobile CTA */}
            <div className="sm:hidden w-full">
              <Link
                href={`/psicologos/${p.id}/agendar`}
                className="block w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors text-center"
              >
                Agendar cita
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ─── Main content ─── */}
          <div className="flex-1 min-w-0 space-y-6">

            {/* Sobre mí */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Sobre mí</h2>
              <p className="text-gray-600 leading-relaxed">{p.bio}</p>
              {p.languages.length > 0 && (
                <div className="mt-4 flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-gray-700">Idiomas:</span>
                  {p.languages.map(l => (
                    <span key={l} className="px-2.5 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                      {l}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Especialidades */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Especialidades</h2>
              <div className="flex flex-wrap gap-2">
                {p.specialties.map(s => (
                  <span key={s} className="px-3 py-1.5 bg-violet-50 text-violet-700 rounded-full text-sm font-medium border border-violet-100">
                    {s}
                  </span>
                ))}
              </div>
              {p.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map(t => (
                    <span key={t} className="px-2.5 py-1 bg-gray-100 text-gray-500 rounded-full text-xs">
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Servicios y precios */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <DollarSign size={20} className="text-violet-700" />
                Servicios y precios
              </h2>
              <p className="text-sm text-gray-400 mb-5">Todos los precios en pesos mexicanos (MXN)</p>
              <div className="divide-y divide-gray-100">
                {services.map((svc, i) => (
                  <div key={i} className="py-4 flex items-center justify-between gap-4">
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{svc.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{svc.desc}</div>
                      <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                        <Clock size={10} /> {svc.duration}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-bold text-gray-900">${svc.price.toLocaleString()}</div>
                      {i === 1 && (
                        <div className="text-xs text-green-600 font-medium">20% dto.</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-violet-50 rounded-xl">
                <p className="text-xs text-violet-700">
                  <span className="font-semibold">Sin comisiones.</span> El precio indicado es lo que recibes directamente el psicólogo/a. Psique no cobra comisión por cita.
                </p>
              </div>
            </div>

            {/* Formación académica */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                <GraduationCap size={20} className="text-violet-700" />
                Formación académica
              </h2>
              <div className="space-y-1">
                {p.education.map((edu, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-violet-700 mt-1 flex-shrink-0" />
                      {i < p.education.length - 1 && (
                        <div className="w-0.5 flex-1 bg-violet-100 mt-1 mb-0" />
                      )}
                    </div>
                    <div className="pb-5 flex-1">
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
              <div className="flex items-center gap-4 p-4 bg-violet-50 rounded-xl">
                <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0">
                  <Shield size={22} className="text-violet-700" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium">Número de cédula (SEP)</div>
                  <div className="font-bold text-gray-900 text-xl tracking-widest">{p.cedula}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <CheckCircle size={12} className="text-green-600" />
                    <span className="text-xs text-green-700 font-medium">Verificada en el sistema SEP</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reseñas */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Star size={20} className="text-amber-400 fill-amber-400" />
                Opiniones de pacientes
              </h2>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 mb-8 p-5 bg-gray-50 rounded-xl">
                <div className="text-center min-w-[80px]">
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
                        <span className="text-xs text-gray-500 w-3">{star}</span>
                        <Star size={11} className="text-amber-400 fill-amber-400" />
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
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

            {/* Ethics warning */}
            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 leading-relaxed">
                <span className="font-semibold">Aviso importante:</span> Psique es un directorio de psicólogos y no reemplaza los servicios de emergencia. Si estás en una crisis de salud mental o en peligro, llama al <span className="font-semibold">911</span> o a la línea de crisis de Conasama: <span className="font-semibold">800-290-0024</span>.
              </p>
            </div>
          </div>

          {/* ─── Sticky sidebar ─── */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24 space-y-4">

              {/* Price */}
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Precio por sesión</div>
                <div className="text-3xl font-extrabold text-gray-900">
                  ${p.pricePerSession.toLocaleString()}{' '}
                  <span className="text-base font-normal text-gray-400">MXN</span>
                </div>
                <div className="text-xs text-gray-400 mt-0.5">Sin cargos adicionales · Sin comisiones</div>
              </div>

              {/* Next available */}
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl border border-green-100">
                <Clock size={16} className="text-green-600 flex-shrink-0" />
                <div>
                  <div className="text-xs text-gray-500">Próxima disponibilidad</div>
                  <div className="text-sm font-bold text-green-700">{p.nextAvailable}</div>
                </div>
              </div>

              {/* CTA buttons */}
              <Link
                href={`/psicologos/${p.id}/agendar`}
                className="block w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors text-base text-center"
              >
                Agendar cita
              </Link>
              <MessageButton name={`${p.prefix} ${p.name}`} />

              {/* Modality */}
              <div className="flex gap-2 flex-wrap">
                {p.offersOnline && (
                  <span className="flex items-center gap-1 px-3 py-1.5 bg-violet-50 text-violet-700 text-xs font-medium rounded-full border border-violet-200">
                    <Video size={12} /> Online
                  </span>
                )}
                {p.offersInPerson && (
                  <span className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-600 text-xs font-medium rounded-full border border-green-100">
                    <Building2 size={12} /> Presencial
                  </span>
                )}
              </div>

              {/* Contact info */}
              <div className="space-y-3 pt-2 border-t border-gray-100">
                <div className="flex items-start gap-3">
                  <Phone size={15} className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-gray-400 font-medium">Teléfono</div>
                    <div className="text-sm font-semibold text-gray-700">+52 999 ···-····</div>
                    <div className="text-xs text-gray-400">Visible al confirmar cita</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={15} className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-gray-400 font-medium">Dirección</div>
                    <div className="text-sm text-gray-600 leading-relaxed">{p.address}</div>
                  </div>
                </div>
              </div>

              {/* Trust badges */}
              <div className="pt-3 border-t border-gray-100 space-y-2">
                {p.verified && (
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <BadgeCheck size={14} className="text-violet-600" />
                    <span>Perfil verificado por Psique</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Shield size={14} className="text-green-600" />
                  <span>Cédula profesional validada</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <CheckCircle size={14} className="text-blue-500" />
                  <span>Reseñas de pacientes reales</span>
                </div>
              </div>

              {/* Share */}
              <ShareButton title={`${p.prefix} ${p.name} — Psique`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
