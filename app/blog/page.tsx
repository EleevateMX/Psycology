import Link from 'next/link'
import { blogPosts } from '@/lib/blog-data'
import { Brain, Briefcase, Zap, Heart, Leaf, Microscope } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog de Salud Mental | Psique Mérida',
  description: 'Artículos sobre psicología, salud mental y bienestar emocional. Guías prácticas escritas por especialistas en Mérida, Yucatán.',
}

const COVER_ICONS: Record<string, LucideIcon> = {
  brain: Brain,
  briefcase: Briefcase,
  zap: Zap,
  heart: Heart,
  leaf: Leaf,
  microscope: Microscope,
}

const CATEGORY_COLORS: Record<string, string> = {
  'Salud Mental': 'bg-violet-100 text-violet-700',
  'Ansiedad': 'bg-orange-100 text-orange-700',
  'TDAH': 'bg-blue-100 text-blue-700',
  'Pareja': 'bg-pink-100 text-pink-700',
  'Duelo': 'bg-green-100 text-green-700',
  'Información': 'bg-gray-100 text-gray-700',
}

const CATEGORY_BG: Record<string, string> = {
  'Salud Mental': 'bg-gradient-to-br from-violet-50 to-violet-100',
  'Ansiedad': 'bg-gradient-to-br from-orange-50 to-orange-100',
  'TDAH': 'bg-gradient-to-br from-blue-50 to-blue-100',
  'Pareja': 'bg-gradient-to-br from-pink-50 to-pink-100',
  'Duelo': 'bg-gradient-to-br from-green-50 to-green-100',
  'Información': 'bg-gradient-to-br from-gray-50 to-gray-100',
}

const CATEGORY_ICON_COLOR: Record<string, string> = {
  'Salud Mental': 'text-violet-500',
  'Ansiedad': 'text-orange-500',
  'TDAH': 'text-blue-500',
  'Pareja': 'text-pink-500',
  'Duelo': 'text-green-600',
  'Información': 'text-gray-400',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function BlogPage() {
  const [featured, ...rest] = blogPosts

  const FeaturedIcon = COVER_ICONS[featured.coverIcon] ?? Brain
  const featuredBg = CATEGORY_BG[featured.category] ?? 'bg-gradient-to-br from-gray-50 to-gray-100'
  const featuredIconColor = CATEGORY_ICON_COLOR[featured.category] ?? 'text-gray-500'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-violet-700 to-violet-800 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-white/20 text-violet-100 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            Recursos de salud mental
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
            Blog Psique
          </h1>
          <p className="text-violet-200 text-lg max-w-2xl mx-auto">
            Artículos prácticos sobre psicología y bienestar emocional, escritos para ayudarte a entender tu mente y tomar mejores decisiones de salud.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured post */}
        <Link href={`/blog/${featured.slug}`} className="group block mb-12">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              <div className={`lg:w-72 xl:w-80 ${featuredBg} flex items-center justify-center py-16 lg:py-0 shrink-0`}>
                <FeaturedIcon size={72} className={featuredIconColor} strokeWidth={1.5} />
              </div>
              <div className="flex-1 p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${CATEGORY_COLORS[featured.category] ?? 'bg-gray-100 text-gray-700'}`}>
                    {featured.category}
                  </span>
                  <span className="text-xs text-gray-400">Artículo destacado</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 group-hover:text-violet-700 transition-colors leading-tight">
                  {featured.title}
                </h2>
                <p className="text-gray-500 mb-6 leading-relaxed">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>{featured.author}</span>
                  <span>·</span>
                  <span>{featured.readTime} min de lectura</span>
                  <span>·</span>
                  <span>{formatDate(featured.publishedAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Article grid */}
        <h2 className="text-xl font-bold text-gray-900 mb-6">Más artículos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => {
            const Icon = COVER_ICONS[post.coverIcon] ?? Brain
            const bg = CATEGORY_BG[post.category] ?? 'bg-gradient-to-br from-gray-50 to-gray-100'
            const iconColor = CATEGORY_ICON_COLOR[post.category] ?? 'text-gray-500'
            return (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <article className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col overflow-hidden">
                  <div className={`${bg} flex items-center justify-center h-44`}>
                    <Icon size={52} className={iconColor} strokeWidth={1.5} />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[post.category] ?? 'bg-gray-100 text-gray-700'}`}>
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-400">{post.readTime} min</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-violet-700 transition-colors leading-snug flex-1">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-3 mb-4 leading-relaxed">{post.excerpt}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-auto">
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                  </div>
                </article>
              </Link>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-violet-700 rounded-3xl p-8 sm:p-12 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">¿Listo para dar el primer paso?</h2>
          <p className="text-violet-200 mb-6 max-w-xl mx-auto">
            Encuentra al psicólogo ideal para ti en Mérida. Perfiles verificados, reseñas reales y citas en línea.
          </p>
          <Link
            href="/psicologos"
            className="inline-block bg-white text-violet-700 font-bold px-8 py-3.5 rounded-xl hover:bg-violet-50 transition-colors"
          >
            Buscar psicólogos →
          </Link>
        </div>
      </div>
    </div>
  )
}
