'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Brain, Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center group-hover:bg-teal-700 transition-colors">
              <Brain size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-teal-600 group-hover:text-teal-700 transition-colors">Psique</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/psicologos" className="text-gray-600 hover:text-teal-600 font-medium transition-colors text-sm">
              Psicólogos
            </Link>
            <a href="#como-funciona" className="text-gray-600 hover:text-teal-600 font-medium transition-colors text-sm">
              Cómo funciona
            </a>
            <a href="#para-psicologos" className="text-gray-600 hover:text-teal-600 font-medium transition-colors text-sm">
              Para psicólogos
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button className="px-4 py-2 text-sm font-medium text-teal-600 border border-teal-200 rounded-lg hover:bg-teal-50 transition-colors">
              Iniciar sesión
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors">
              Registrarme
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          <Link
            href="/psicologos"
            className="block py-2 text-gray-700 font-medium hover:text-teal-600"
            onClick={() => setMobileOpen(false)}
          >
            Psicólogos
          </Link>
          <a
            href="#como-funciona"
            className="block py-2 text-gray-700 font-medium hover:text-teal-600"
            onClick={() => setMobileOpen(false)}
          >
            Cómo funciona
          </a>
          <a
            href="#para-psicologos"
            className="block py-2 text-gray-700 font-medium hover:text-teal-600"
            onClick={() => setMobileOpen(false)}
          >
            Para psicólogos
          </a>
          <div className="pt-3 space-y-2 border-t border-gray-100">
            <button className="w-full px-4 py-2.5 text-sm font-medium text-teal-600 border border-teal-200 rounded-lg hover:bg-teal-50 transition-colors">
              Iniciar sesión
            </button>
            <button className="w-full px-4 py-2.5 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors">
              Registrarme
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
