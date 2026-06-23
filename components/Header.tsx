'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Menu, X, Search, ChevronDown } from 'lucide-react'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profDropdown, setProfDropdown] = useState(false)
  const [specialty, setSpecialty] = useState('')
  const [mobileQuery, setMobileQuery] = useState('')
  const router = useRouter()

  function handleSearch() {
    const params = new URLSearchParams()
    if (specialty) params.set('specialty', specialty)
    router.push(`/psicologos${params.size ? '?' + params.toString() : ''}`)
  }

  function handleMobileSearch() {
    const params = new URLSearchParams()
    if (mobileQuery) params.set('specialty', mobileQuery)
    router.push(`/psicologos${params.size ? '?' + params.toString() : ''}`)
    setMobileOpen(false)
  }

  return (
    <header className="w-full">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-violet-800 to-violet-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl font-black font-serif">ψ</span>
            <span className="text-lg font-bold hidden sm:block">Psique</span>
          </Link>

          {/* Search bar (center) */}
          <div className="flex-1 hidden md:flex items-center bg-white rounded-lg overflow-hidden shadow-sm max-w-2xl mx-auto">
            <select
              value={specialty}
              onChange={e => setSpecialty(e.target.value)}
              className="px-3 py-2.5 text-sm text-gray-700 border-r border-gray-200 bg-white focus:outline-none cursor-pointer"
            >
              <option value="">Especialidad</option>
              <option>Ansiedad</option>
              <option>Depresión</option>
              <option>Pareja</option>
              <option>Infantil</option>
              <option>TDAH</option>
              <option>Trauma</option>
              <option>Duelo</option>
            </select>
            <select className="px-3 py-2.5 text-sm text-gray-700 border-r border-gray-200 bg-white focus:outline-none cursor-pointer">
              <option>Mérida, Yucatán</option>
              <option>Online (todo México)</option>
            </select>
            <button
              onClick={handleSearch}
              className="px-4 py-2.5 bg-violet-700 text-white hover:bg-violet-800 transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <Search size={16} />
              <span className="hidden lg:block">Buscar</span>
            </button>
          </div>

          {/* Right buttons */}
          <div className="ml-auto flex items-center gap-2 shrink-0">
            <Link href="#" className="hidden sm:block text-sm border border-white/40 text-white px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors">
              Iniciar sesión
            </Link>
            <div className="relative">
              <button
                onClick={() => setProfDropdown(!profDropdown)}
                className="hidden sm:flex items-center gap-1 text-sm bg-white text-violet-700 font-semibold px-3 py-1.5 rounded-lg hover:bg-violet-50 transition-colors"
              >
                ¿Eres psicólogo?
                <ChevronDown size={14} />
              </button>
              {profDropdown && (
                <div
                  className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden"
                  onMouseLeave={() => setProfDropdown(false)}
                >
                  <Link href="/unete" onClick={() => setProfDropdown(false)} className="block px-4 py-3 text-sm text-gray-700 hover:bg-violet-50 hover:text-violet-700">
                    Registrarme gratis
                  </Link>
                  <Link href="/unete" onClick={() => setProfDropdown(false)} className="block px-4 py-3 text-sm text-gray-700 hover:bg-violet-50 hover:text-violet-700 border-t border-gray-100">
                    Zona para profesionales
                  </Link>
                  <Link href="/unete" onClick={() => setProfDropdown(false)} className="block px-4 py-3 text-sm text-gray-700 hover:bg-violet-50 hover:text-violet-700 border-t border-gray-100">
                    Precios y planes
                  </Link>
                </div>
              )}
            </div>
            <button className="sm:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Sub-nav */}
      <div className="bg-white border-b border-gray-200 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 overflow-x-auto">
          {[
            { icon: '🎥', label: 'Consulta en línea', href: '/psicologos?online=1' },
            { icon: '📅', label: 'Disponible hoy', href: '/psicologos' },
            { icon: '⚕️', label: 'Certificados', href: '/psicologos' },
            { icon: '📝', label: 'Blog', href: '/blog' },
            { icon: '💼', label: 'Únete', href: '/unete' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-1.5 px-4 py-3 text-sm text-gray-600 hover:text-violet-700 hover:bg-violet-50 whitespace-nowrap transition-colors border-b-2 border-transparent hover:border-violet-700"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col">
          <div className="bg-gradient-to-r from-violet-800 to-violet-700 px-4 py-3 flex items-center justify-between text-white">
            <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
              <span className="text-2xl font-black font-serif">ψ</span>
              <span className="text-lg font-bold">Psique</span>
            </Link>
            <button onClick={() => setMobileOpen(false)}><X size={24} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            <div className="flex gap-2 mb-4">
              <input
                placeholder="Especialidad o nombre..."
                value={mobileQuery}
                onChange={e => setMobileQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleMobileSearch()}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <button onClick={handleMobileSearch} className="bg-violet-700 text-white px-3 py-2 rounded-lg">
                <Search size={18} />
              </button>
            </div>
            {[
              { label: '🎥 Consulta en línea', href: '/psicologos?online=1' },
              { label: '📅 Disponible hoy', href: '/psicologos' },
              { label: '⚕️ Psicólogos certificados', href: '/psicologos' },
              { label: '📝 Blog de salud mental', href: '/blog' },
            ].map(item => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-violet-50 rounded-lg text-sm"
              >
                {item.label}
              </Link>
            ))}
            <hr className="my-2" />
            <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-violet-50 rounded-lg text-sm">Iniciar sesión</button>
            <Link
              href="/unete"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-left px-4 py-3 text-violet-700 font-semibold hover:bg-violet-50 rounded-lg text-sm"
            >
              ¿Eres psicólogo? → Únete gratis
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
