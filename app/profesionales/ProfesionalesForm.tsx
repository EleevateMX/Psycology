'use client'

import { useState } from 'react'

const INPUT =
  'w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500'
const LABEL = 'block text-xs font-semibold text-gray-600 mb-1.5'

export default function ProfesionalesForm() {
  const [presencial, setPresencial] = useState(false)
  const [online, setOnline] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [tel, setTel] = useState('')
  const [especialidad, setEspecialidad] = useState('')
  const [cedula, setCedula] = useState('')
  const [ciudad, setCiudad] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    const modalidad: string[] = []
    if (presencial) modalidad.push('Presencial')
    if (online) modalidad.push('Online')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, tel, especialidad, cedula, ciudad, modalidad }),
      })

      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-extrabold text-gray-900 mb-2">¡Solicitud enviada!</h3>
        <p className="text-gray-500 text-sm">
          Recibimos tu información. Nuestro equipo la revisará y te contactará en un plazo de 24–48 horas para completar tu registro.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 sm:p-8 space-y-5"
    >
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          Ocurrió un error al enviar tu solicitud. Por favor intenta de nuevo.
        </div>
      )}

      {/* Nombre completo */}
      <div>
        <label className={LABEL}>Nombre completo</label>
        <input
          type="text"
          placeholder="Ej. María García Rodríguez"
          className={INPUT}
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          required
        />
      </div>

      {/* Correo */}
      <div>
        <label className={LABEL}>Correo electrónico</label>
        <input
          type="email"
          placeholder="tu@correo.com"
          className={INPUT}
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>

      {/* Teléfono */}
      <div>
        <label className={LABEL}>Teléfono</label>
        <input
          type="tel"
          placeholder="+52 999 000-0000"
          className={INPUT}
          value={tel}
          onChange={e => setTel(e.target.value)}
        />
      </div>

      {/* Especialidad */}
      <div>
        <label className={LABEL}>Especialidad principal</label>
        <select
          className={INPUT}
          value={especialidad}
          onChange={e => setEspecialidad(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>Selecciona...</option>
          {[
            'Ansiedad',
            'Depresión',
            'Pareja',
            'Infantil',
            'TDAH',
            'Trauma',
            'Duelo',
            'Alimentación',
            'Organizacional',
            'Sexología',
            'Adicciones',
            'Otra',
          ].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Cédula */}
      <div>
        <label className={LABEL}>Número de cédula</label>
        <input
          type="text"
          placeholder="Ej. 8234567"
          className={INPUT}
          value={cedula}
          onChange={e => setCedula(e.target.value)}
        />
        <p className="text-xs text-gray-400 mt-1">
          La verificaremos en el sistema SEP antes de publicar tu perfil.
        </p>
      </div>

      {/* Ciudad */}
      <div>
        <label className={LABEL}>Ciudad</label>
        <select
          className={INPUT}
          value={ciudad}
          onChange={e => setCiudad(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>Selecciona...</option>
          {['Mérida', 'Cancún', 'CDMX', 'Otra'].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Modalidad */}
      <div>
        <span className={LABEL}>Modalidad</span>
        <div className="flex gap-6 mt-1">
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={presencial}
              onChange={(e) => setPresencial(e.target.checked)}
              className="w-4 h-4 accent-violet-700"
            />
            Presencial
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={online}
              onChange={(e) => setOnline(e.target.checked)}
              className="w-4 h-4 accent-violet-700"
            />
            Online
          </label>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition-colors text-base mt-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === 'loading' ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Enviando...
          </>
        ) : (
          'Solicitar acceso gratis'
        )}
      </button>
    </form>
  )
}
