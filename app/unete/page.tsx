'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, ChevronRight, ChevronLeft, User, GraduationCap, MapPin, Clock } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const SPECIALTIES = [
  'Ansiedad y Estrés', 'Depresión', 'Terapia de Pareja', 'Psicología Infantil',
  'TDAH', 'Trauma y PTSD', 'Duelo y Pérdida', 'Trastornos Alimenticios',
  'TCC', 'Terapia Familiar', 'Adicciones', 'Sexología',
  'Neuropsicología', 'Tanatología', 'Orientación Vocacional', 'Otro',
]

const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
const SHIFTS = ['Mañana (7–12 h)', 'Tarde (12–18 h)', 'Noche (18–21 h)']

interface FormData {
  prefix: string; name: string; email: string; phone: string
  cedula: string; primarySpecialty: string; otherSpecialties: string[]
  experience: string; university: string; degree: string; bio: string
  inPerson: boolean; neighborhood: string; online: boolean
  price: string; languages: string
  days: string[]; shifts: string[]
  password: string; confirmPassword: string
}

const INITIAL: FormData = {
  prefix: 'Lic.', name: '', email: '', phone: '',
  cedula: '', primarySpecialty: '', otherSpecialties: [],
  experience: '', university: '', degree: 'Licenciatura en Psicología', bio: '',
  inPerson: true, neighborhood: '', online: false,
  price: '', languages: 'Español',
  days: [], shifts: [],
  password: '', confirmPassword: '',
}

const STEPS = [
  { label: 'Personal', icon: User },
  { label: 'Profesional', icon: GraduationCap },
  { label: 'Modalidad', icon: MapPin },
  { label: 'Disponibilidad', icon: Clock },
]

export default function UnetePage() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<FormData>(INITIAL)
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  function set<K extends keyof FormData>(key: K, val: FormData[K]) {
    setData((prev) => ({ ...prev, [key]: val }))
  }

  async function handleSubmit() {
    if (data.password !== data.confirmPassword) {
      alert('Las contraseñas no coinciden.')
      return
    }
    setLoading(true)
    const supabase = createClient()

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          nombre: data.name,
          especialidad: data.primarySpecialty,
        },
      },
    })

    if (authError) {
      alert('Error al crear cuenta: ' + authError.message)
      setLoading(false)
      return
    }

    if (authData.user) {
      await supabase.from('psique_psychologist_profiles').insert({
        user_id: authData.user.id,
        nombre: data.name || '',
        apellido: '',
        email: data.email,
        telefono: data.phone || '',
        especialidad: data.primarySpecialty || '',
        cedula: data.cedula || '',
        ciudad: 'Mérida',
        modalidad: [data.inPerson && 'Presencial', data.online && 'En línea'].filter(Boolean),
      })
    }

    setLoading(false)
    setDone(true)
  }

  function toggleArray(key: 'otherSpecialties' | 'days' | 'shifts', val: string) {
    setData((prev) => {
      const arr = prev[key] as string[]
      return { ...prev, [key]: arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val] }
    })
  }

  if (done) {
    return (
      <div className="min-h-screen bg-violet-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-3">¡Revisa tu correo!</h2>
          <p className="text-gray-500 mb-2">
            Gracias, <span className="font-semibold text-gray-700">{data.prefix} {data.name}</span>.
          </p>
          <p className="text-gray-500 mb-8 text-sm leading-relaxed">
            Te enviamos un link de confirmación a <strong>{data.email}</strong>. Una vez que confirmes, podrás acceder a tu panel y tu perfil será revisado por nuestro equipo en <strong>24–48 horas</strong>.
          </p>
          <div className="space-y-3">
            <Link
              href="/psicologos"
              className="block w-full py-3 bg-violet-700 hover:bg-violet-800 text-white font-bold rounded-xl transition-colors"
            >
              Ver directorio de psicólogos
            </Link>
            <Link href="/" className="block text-sm text-gray-400 hover:text-gray-600 transition-colors">
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-800 to-violet-700 text-white py-10">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <span className="text-3xl mb-3 block">ψ</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">Únete a Psique</h1>
          <p className="text-violet-200 text-sm">
            Crea tu perfil profesional y llega a miles de pacientes en Mérida y toda la República.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Stepper */}
        <div className="flex items-center justify-between mb-8">
          {STEPS.map((s, i) => {
            const Icon = s.icon
            const active = i === step
            const done_step = i < step
            return (
              <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  done_step ? 'bg-green-500 text-white' : active ? 'bg-violet-700 text-white' : 'bg-gray-100 text-gray-400'
                }`}>
                  {done_step ? <CheckCircle size={18} /> : <Icon size={18} />}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${active ? 'text-violet-700' : 'text-gray-400'}`}>
                  {s.label}
                </span>
                {i < STEPS.length - 1 && (
                  <div className="absolute hidden" />
                )}
              </div>
            )
          })}
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          {/* Step 0: Datos personales */}
          {step === 0 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Datos personales</h2>
              <div className="flex gap-3">
                <div className="w-28">
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Prefijo</label>
                  <select
                    value={data.prefix}
                    onChange={e => set('prefix', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                  >
                    <option>Lic.</option>
                    <option>Mtro.</option>
                    <option>Mtra.</option>
                    <option>Dr.</option>
                    <option>Dra.</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Nombre completo *</label>
                  <input
                    type="text"
                    placeholder="Ej. María García Rodríguez"
                    value={data.name}
                    onChange={e => set('name', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Correo electrónico *</label>
                <input
                  type="email"
                  placeholder="tu@correo.com"
                  value={data.email}
                  onChange={e => set('email', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Contraseña *</label>
                <input
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={data.password}
                  onChange={e => set('password', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Confirmar contraseña *</label>
                <input
                  type="password"
                  placeholder="Repite tu contraseña"
                  value={data.confirmPassword}
                  onChange={e => set('confirmPassword', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                {data.confirmPassword && data.password !== data.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">Las contraseñas no coinciden.</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Teléfono *</label>
                <input
                  type="tel"
                  placeholder="+52 999 000-0000"
                  value={data.phone}
                  onChange={e => set('phone', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
            </div>
          )}

          {/* Step 1: Info profesional */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Información profesional</h2>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Número de cédula SEP *</label>
                <input
                  type="text"
                  placeholder="Ej. 8234567"
                  value={data.cedula}
                  onChange={e => set('cedula', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <p className="text-xs text-gray-400 mt-1">La verificaremos en el sistema SEP antes de publicar tu perfil.</p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Especialidad principal *</label>
                <select
                  value={data.primarySpecialty}
                  onChange={e => set('primarySpecialty', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  <option value="">Selecciona...</option>
                  {SPECIALTIES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2">Otras especialidades</label>
                <div className="flex flex-wrap gap-2">
                  {SPECIALTIES.map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleArray('otherSpecialties', s)}
                      className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-colors ${
                        data.otherSpecialties.includes(s)
                          ? 'bg-violet-700 text-white border-violet-700'
                          : 'bg-white text-gray-600 border-gray-300 hover:border-violet-300'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Años de experiencia *</label>
                <input
                  type="number"
                  min="0"
                  max="60"
                  placeholder="Ej. 10"
                  value={data.experience}
                  onChange={e => set('experience', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Universidad de grado *</label>
                <input
                  type="text"
                  placeholder="Ej. Universidad Autónoma de Yucatán (UADY)"
                  value={data.university}
                  onChange={e => set('university', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Presentación personal</label>
                <textarea
                  rows={4}
                  placeholder="Cuéntale a los pacientes quién eres, tu enfoque terapéutico y con quién trabajas..."
                  value={data.bio}
                  onChange={e => set('bio', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                />
                <p className="text-xs text-gray-400 mt-1">{data.bio.length}/500 caracteres recomendados</p>
              </div>
            </div>
          )}

          {/* Step 2: Modalidad y precios */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Modalidad y precios</h2>

              <div className="space-y-3">
                <label className="flex items-start gap-3 p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={data.inPerson}
                    onChange={e => set('inPerson', e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-violet-700"
                  />
                  <div>
                    <div className="font-semibold text-sm text-gray-900">Consulta presencial</div>
                    <div className="text-xs text-gray-500">Atiendes en consultorio físico en Mérida</div>
                  </div>
                </label>
                {data.inPerson && (
                  <div className="ml-7">
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Colonia / zona del consultorio</label>
                    <input
                      type="text"
                      placeholder="Ej. Altabrisa, García Ginerés..."
                      value={data.neighborhood}
                      onChange={e => set('neighborhood', e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                )}

                <label className="flex items-start gap-3 p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={data.online}
                    onChange={e => set('online', e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-violet-700"
                  />
                  <div>
                    <div className="font-semibold text-sm text-gray-900">Consulta en línea</div>
                    <div className="text-xs text-gray-500">Atiendes por videollamada (Zoom, Google Meet, etc.)</div>
                  </div>
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Precio por sesión (MXN) *</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">$</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="Ej. 900"
                    value={data.price}
                    onChange={e => set('price', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg pl-7 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Idiomas de atención</label>
                <input
                  type="text"
                  placeholder="Ej. Español, Inglés"
                  value={data.languages}
                  onChange={e => set('languages', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
            </div>
          )}

          {/* Step 3: Disponibilidad */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Disponibilidad general</h2>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-3">Días disponibles</label>
                <div className="flex flex-wrap gap-2">
                  {DAYS.map(day => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleArray('days', day)}
                      className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                        data.days.includes(day)
                          ? 'bg-violet-700 text-white border-violet-700'
                          : 'bg-white text-gray-600 border-gray-300 hover:border-violet-300'
                      }`}
                    >
                      {day.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-3">Horario habitual</label>
                <div className="space-y-2">
                  {SHIFTS.map(shift => (
                    <label key={shift} className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={data.shifts.includes(shift)}
                        onChange={() => toggleArray('shifts', shift)}
                        className="w-4 h-4 accent-violet-700"
                      />
                      <span className="text-sm text-gray-700">{shift}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-violet-50 rounded-xl p-5 space-y-2 mt-4">
                <h3 className="text-sm font-bold text-violet-900 mb-3">Resumen de tu solicitud</h3>
                <p className="text-sm text-gray-700"><span className="font-medium">Nombre:</span> {data.prefix} {data.name}</p>
                <p className="text-sm text-gray-700"><span className="font-medium">Email:</span> {data.email}</p>
                <p className="text-sm text-gray-700"><span className="font-medium">Especialidad:</span> {data.primarySpecialty}</p>
                <p className="text-sm text-gray-700"><span className="font-medium">Experiencia:</span> {data.experience} años</p>
                <p className="text-sm text-gray-700"><span className="font-medium">Precio:</span> ${data.price} MXN/sesión</p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Modalidad:</span>{' '}
                  {[data.inPerson && 'Presencial', data.online && 'En línea'].filter(Boolean).join(' y ')}
                </p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setStep(s => s - 1)}
              disabled={step === 0}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={16} />
              Anterior
            </button>

            {step < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={() => setStep(s => s + 1)}
                className="flex items-center gap-2 px-6 py-2.5 bg-violet-700 hover:bg-violet-800 text-white text-sm font-bold rounded-lg transition-colors"
              >
                Siguiente
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <CheckCircle size={16} />
                )}
                {loading ? 'Creando cuenta...' : 'Enviar solicitud'}
              </button>
            )}
          </div>
        </div>

        {/* Trust note */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Tu perfil será revisado por nuestro equipo antes de publicarse. Proceso gratuito y sin compromisos.
        </p>
      </div>
    </div>
  )
}
