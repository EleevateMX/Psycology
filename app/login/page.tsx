'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setStatus('error')
      setErrorMsg('Correo o contraseña incorrectos. Verifica tus datos.')
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  const inputClass = 'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-gray-50'

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="text-3xl font-black text-violet-700 font-serif">ψ</span>
            <span className="text-2xl font-bold text-gray-900">Psique</span>
          </Link>
          <p className="text-gray-500 text-sm mt-2">Panel profesional</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-xl font-extrabold text-gray-900 mb-1">Iniciar sesión</h1>
          <p className="text-sm text-gray-500 mb-6">Accede a tu panel de psicólogo</p>

          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Correo electrónico
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Tu contraseña"
                  className={`${inputClass} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full flex items-center justify-center gap-2 py-3 bg-violet-700 hover:bg-violet-800 text-white font-bold rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <LogIn size={16} />
              )}
              {status === 'loading' ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center text-sm text-gray-500">
            ¿No tienes cuenta?{' '}
            <Link href="/unete" className="text-violet-700 font-semibold hover:underline">
              Regístrate gratis
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          ¿Eres paciente?{' '}
          <Link href="/psicologos" className="text-violet-600 hover:underline">
            Busca tu psicólogo
          </Link>
        </p>
      </div>
    </div>
  )
}
