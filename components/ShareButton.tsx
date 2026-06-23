'use client'

import { useState } from 'react'
import { Share2, Check } from 'lucide-react'

interface Props {
  title: string
}

export function ShareButton({ title }: Props) {
  const [state, setState] = useState<'idle' | 'copied'>('idle')

  async function handleShare() {
    const url = window.location.href
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({ title, url, text: `Mira el perfil de ${title} en Psique` })
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(url)
        setState('copied')
        setTimeout(() => setState('idle'), 2500)
      }
    } catch {}
  }

  return (
    <button
      onClick={handleShare}
      className="w-full flex items-center justify-center gap-2 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors"
    >
      {state === 'copied' ? (
        <>
          <Check size={15} className="text-green-600" />
          <span className="text-green-600">¡Enlace copiado!</span>
        </>
      ) : (
        <>
          <Share2 size={15} />
          Compartir perfil
        </>
      )}
    </button>
  )
}
