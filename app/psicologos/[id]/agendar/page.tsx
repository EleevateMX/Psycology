'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Clock, Video, Building2, CalendarDays } from 'lucide-react'
import { psychologists } from '@/lib/data'

interface PatientInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  reason: string
  modality: 'presencial' | 'online'
}

const CONFIRMATION_ID = () => 'PSQ-' + Math.random().toString(36).slice(2, 8).toUpperCase()

export default function AgendarPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const p = psychologists.find(x => x.id === id)

  const [step, setStep] = useState<0 | 1 | 2>(0)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [patient, setPatient] = useState<PatientInfo>({
    firstName: '', lastName: '', email: '', phone: '', reason: '',
    modality: 'presencial',
  })
  const [confirmId] = useState(() => CONFIRMATION_ID())

  if (!p) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Psicólogo no encontrado.</p>
          <Link href="/psicologos" className="text-violet-700 underline">Ver directorio</Link>
        </div>
      </div>
    )
  }

  const hasSlots = p.availability?.some(d => d.slots.length > 0)
  const selectedDayData = selectedDay !== null ? p.availability?.[selectedDay] : null

  function setPatientField<K extends keyof PatientInfo>(key: K, val: PatientInfo[K]) {
    setPatient(prev => ({ ...prev, [key]: val }))
  }

  const canProceedStep0 = selectedDay !== null && selectedSlot !== null
  const canProceedStep1 = patient.firstName && patient.lastName && patient.email && patient.phone

  const labelClass = 'block text-xs font-semibold text-gray-600 mb-1.5'
  const inputClass = 'w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => (step > 0 ? setStep((s) => (s - 1) as 0 | 1 | 2) : router.back())}
            className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={16} />
            {step === 0 ? 'Volver al perfil' : 'Anterior'}
          </button>
          <span className="text-gray-300">|</span>
          <span className="text-sm text-gray-500">
            {step < 2 ? `Paso ${step + 1} de 2` : 'Confirmación'}
          </span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Doctor summary */}
          <div className="w-full lg:w-72 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-20">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg shrink-0"
                  style={{ backgroundColor: p.avatarColor }}
                >
                  {p.initials}
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm leading-snug">{p.prefix} {p.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{p.primarySpecialty}</div>
                </div>
              </div>
              <div className="space-y-2 pt-4 border-t border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Sesión</span>
                  <span className="font-bold text-gray-900">${p.pricePerSession.toLocaleString()} MXN</span>
                </div>
                {selectedDayData && selectedSlot && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Fecha</span>
                      <span className="font-medium text-gray-700">{selectedDayData.label}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Hora</span>
                      <span className="font-medium text-gray-700">{selectedSlot}</span>
                    </div>
                  </>
                )}
                {step >= 1 && patient.modality && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Modalidad</span>
                    <span className="font-medium text-gray-700 flex items-center gap-1">
                      {patient.modality === 'online'
                        ? <><Video size={13} /> En línea</>
                        : <><Building2 size={13} /> Presencial</>
                      }
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {step === 2 ? (
              /* Success */
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} className="text-green-600" />
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900 mb-2">¡Cita confirmada!</h2>
                <p className="text-gray-500 mb-6">
                  Te hemos enviado un resumen a <strong>{patient.email}</strong>.
                </p>

                <div className="bg-violet-50 rounded-xl p-5 text-left space-y-3 mb-8">
                  <div className="flex items-center gap-2 text-violet-700 font-bold text-sm mb-2">
                    <CalendarDays size={16} />
                    Detalles de tu cita
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-500">Psicólogo</div>
                    <div className="font-medium text-gray-900">{p.prefix} {p.name}</div>
                    <div className="text-gray-500">Fecha</div>
                    <div className="font-medium text-gray-900">{selectedDayData?.label}</div>
                    <div className="text-gray-500">Hora</div>
                    <div className="font-medium text-gray-900">{selectedSlot}</div>
                    <div className="text-gray-500">Modalidad</div>
                    <div className="font-medium text-gray-900 flex items-center gap-1">
                      {patient.modality === 'online'
                        ? <><Video size={13} /> En línea</>
                        : <><Building2 size={13} /> Presencial</>
                      }
                    </div>
                    <div className="text-gray-500">Paciente</div>
                    <div className="font-medium text-gray-900">{patient.firstName} {patient.lastName}</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl px-4 py-3 mb-8 inline-block">
                  <span className="text-xs text-gray-500">Número de confirmación</span>
                  <div className="text-lg font-mono font-bold text-violet-700">{confirmId}</div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href={`/psicologos/${p.id}`}
                    className="px-6 py-3 border border-violet-200 text-violet-700 font-medium rounded-xl hover:bg-violet-50 transition-colors text-sm"
                  >
                    Volver al perfil
                  </Link>
                  <Link
                    href="/psicologos"
                    className="px-6 py-3 bg-violet-700 text-white font-bold rounded-xl hover:bg-violet-800 transition-colors text-sm"
                  >
                    Ver más psicólogos
                  </Link>
                </div>
              </div>
            ) : step === 0 ? (
              /* Step 0: Select date & time */
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Selecciona fecha y hora</h2>
                <p className="text-sm text-gray-500 mb-6">Elige el día y horario que más te convenga.</p>

                {!hasSlots ? (
                  <div className="text-center py-10 text-gray-400">
                    <Clock size={36} className="mx-auto mb-3 opacity-40" />
                    <p>Sin disponibilidad inmediata.</p>
                    <p className="text-sm mt-1">Contacta directamente al psicólogo.</p>
                  </div>
                ) : (
                  <>
                    {/* Day selector */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                      {p.availability?.map((day, i) => (
                        <button
                          key={i}
                          type="button"
                          disabled={day.slots.length === 0}
                          onClick={() => { setSelectedDay(i); setSelectedSlot(null) }}
                          className={`p-3 rounded-xl border text-sm text-center transition-colors ${
                            day.slots.length === 0
                              ? 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed'
                              : selectedDay === i
                              ? 'border-violet-700 bg-violet-700 text-white'
                              : 'border-gray-200 hover:border-violet-300 hover:text-violet-700 text-gray-700'
                          }`}
                        >
                          <div className="font-semibold leading-tight">{day.label.split(' ').slice(0, -1).join(' ')}</div>
                          <div className="text-xs opacity-70 mt-0.5">
                            {day.slots.length === 0 ? 'Sin horario' : `${day.slots.length} horario${day.slots.length > 1 ? 's' : ''}`}
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Time slots */}
                    {selectedDay !== null && (
                      <>
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">
                          Horarios disponibles — {selectedDayData?.label}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {selectedDayData?.slots.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedSlot(slot)}
                              className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                                selectedSlot === slot
                                  ? 'bg-violet-700 text-white border-violet-700'
                                  : 'bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100'
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </>
                )}

                <div className="flex justify-end pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    disabled={!canProceedStep0}
                    onClick={() => setStep(1)}
                    className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Continuar →
                  </button>
                </div>
              </div>
            ) : (
              /* Step 1: Patient info */
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Tus datos</h2>
                <p className="text-sm text-gray-500 mb-6">Esta información será compartida únicamente con el psicólogo.</p>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Nombre *</label>
                      <input
                        type="text"
                        placeholder="Tu nombre"
                        value={patient.firstName}
                        onChange={e => setPatientField('firstName', e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Apellido *</label>
                      <input
                        type="text"
                        placeholder="Tu apellido"
                        value={patient.lastName}
                        onChange={e => setPatientField('lastName', e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Correo electrónico *</label>
                    <input
                      type="email"
                      placeholder="tu@correo.com"
                      value={patient.email}
                      onChange={e => setPatientField('email', e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Teléfono *</label>
                    <input
                      type="tel"
                      placeholder="+52 999 000-0000"
                      value={patient.phone}
                      onChange={e => setPatientField('phone', e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Modalidad preferida</label>
                    <div className="flex gap-3">
                      {([
                        { val: 'presencial', label: 'Presencial', icon: Building2, disabled: !p.offersInPerson },
                        { val: 'online', label: 'En línea', icon: Video, disabled: !p.offersOnline },
                      ] as const).map(({ val, label, icon: Icon, disabled }) => (
                        <button
                          key={val}
                          type="button"
                          disabled={disabled}
                          onClick={() => setPatientField('modality', val)}
                          className={`flex-1 flex items-center justify-center gap-2 py-3 border rounded-xl text-sm font-medium transition-colors ${
                            disabled
                              ? 'opacity-30 cursor-not-allowed bg-gray-50'
                              : patient.modality === val
                              ? 'border-violet-700 bg-violet-50 text-violet-700'
                              : 'border-gray-200 text-gray-600 hover:border-violet-200'
                          }`}
                        >
                          <Icon size={15} />
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Motivo de consulta (opcional)</label>
                    <textarea
                      rows={3}
                      placeholder="Describe brevemente lo que te trae a consulta..."
                      value={patient.reason}
                      onChange={e => setPatientField('reason', e.target.value)}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-gray-100 mt-6">
                  <button
                    type="button"
                    disabled={!canProceedStep1}
                    onClick={() => setStep(2)}
                    className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Confirmar cita →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
