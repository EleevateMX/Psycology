'use client'

import { useState } from 'react'

const INPUT =
  'w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500'
const LABEL = 'block text-xs font-semibold text-gray-600 mb-1.5'

export default function ProfesionalesForm() {
  const [presencial, setPresencial] = useState(false)
  const [online, setOnline] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    alert('¡Gracias! Te contactaremos pronto.')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 sm:p-8 space-y-5"
    >
      {/* Nombre completo */}
      <div>
        <label className={LABEL}>Nombre completo</label>
        <input type="text" placeholder="Ej. María García Rodríguez" className={INPUT} />
      </div>

      {/* Correo */}
      <div>
        <label className={LABEL}>Correo electrónico</label>
        <input type="email" placeholder="tu@correo.com" className={INPUT} />
      </div>

      {/* Teléfono */}
      <div>
        <label className={LABEL}>Teléfono</label>
        <input type="tel" placeholder="+52 999 000-0000" className={INPUT} />
      </div>

      {/* Especialidad */}
      <div>
        <label className={LABEL}>Especialidad principal</label>
        <select className={INPUT} defaultValue="">
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
        <input type="text" placeholder="Ej. 8234567" className={INPUT} />
        <p className="text-xs text-gray-400 mt-1">
          La verificaremos en el sistema SEP antes de publicar tu perfil.
        </p>
      </div>

      {/* Ciudad */}
      <div>
        <label className={LABEL}>Ciudad</label>
        <select className={INPUT} defaultValue="">
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
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition-colors text-base mt-2"
      >
        Solicitar acceso gratis
      </button>
    </form>
  )
}
