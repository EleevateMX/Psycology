'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  {
    q: '¿Es realmente gratis?',
    a: 'Sí. El plan Básico es completamente gratuito y sin límite de tiempo. Puedes crear tu perfil, aparecer en el directorio y recibir citas sin pagar nada. Solo pagas si decides subir a un plan de pago para obtener más visibilidad y funciones.',
  },
  {
    q: '¿Cuánto tiempo tarda en activarse mi perfil?',
    a: 'Nuestro equipo revisa cada solicitud en un plazo de 24 a 48 horas hábiles. Recibirás un correo de confirmación cuando tu perfil esté publicado y listo para recibir pacientes.',
  },
  {
    q: '¿Cómo verifican mi cédula profesional?',
    a: 'Consultamos directamente el sistema de verificación de la Secretaría de Educación Pública (SEP) usando el número de cédula que nos proporcionas. El proceso es automático y no requiere que nos envíes documentos escaneados.',
  },
  {
    q: '¿Puedo cancelar cuando quiera?',
    a: 'Absolutamente. Los planes de pago se cobran mes a mes sin permanencia forzosa. Puedes cancelar en cualquier momento desde tu panel profesional y tu perfil pasará automáticamente al plan Básico gratuito.',
  },
  {
    q: '¿Psique cobra comisión por cita?',
    a: 'No. A diferencia de otras plataformas, Psique no cobra comisión sobre tus consultas. El pago entre tú y el paciente es directo y 100% tuyo. Solo pagas la mensualidad del plan que elijas.',
  },
]

export default function ProfesionalesFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function toggle(i: number) {
    setOpenIndex((prev) => (prev === i ? null : i))
  }

  return (
    <div className="space-y-3">
      {FAQS.map(({ q, a }, i) => {
        const isOpen = openIndex === i
        return (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden"
          >
            <button
              type="button"
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-semibold text-gray-900 text-sm sm:text-base">{q}</span>
              <ChevronDown
                size={18}
                className={`text-violet-700 shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-6 pb-5">
                <p className="text-gray-500 text-sm leading-relaxed">{a}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
