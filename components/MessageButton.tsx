'use client'

import { MessageSquare } from 'lucide-react'

interface Props {
  name: string
}

export function MessageButton({ name }: Props) {
  return (
    <button
      onClick={() => alert(`Para contactar a ${name}, agenda tu cita o llama directamente. El sistema de mensajería estará disponible próximamente.`)}
      className="w-full flex items-center justify-center gap-2 py-2.5 border border-violet-200 text-violet-700 text-sm font-medium rounded-xl hover:bg-violet-50 transition-colors"
    >
      <MessageSquare size={15} />
      Enviar mensaje
    </button>
  )
}
