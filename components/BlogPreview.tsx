import Link from 'next/link'
import { ArrowRight, Brain, Briefcase, Zap, Heart, Leaf, Microscope } from 'lucide-react'
import { blogPosts } from '@/lib/blog-data'
import type { LucideIcon } from 'lucide-react'

const ICONS: Record<string, LucideIcon> = {
  brain: Brain, briefcase: Briefcase, zap: Zap,
  heart: Heart, leaf: Leaf, microscope: Microscope,
}

const CAT_COLORS: Record<string, { badge: string; bg: string; icon: string }> = {
  'Salud Mental': { badge: 'bg-violet-100 text-violet-700', bg: 'bg-violet-50', icon: 'text-violet-500' },
  'Ansiedad':    { badge: 'bg-orange-100 text-orange-700', bg: 'bg-orange-50',  icon: 'text-orange-500' },
  'TDAH':        { badge: 'bg-blue-100 text-blue-700',     bg: 'bg-blue-50',    icon: 'text-blue-500' },
  'Pareja':      { badge: 'bg-pink-100 text-pink-700',     bg: 'bg-pink-50',    icon: 'text-pink-500' },
  'Duelo':       { badge: 'bg-green-100 text-green-700',   bg: 'bg-green-50',   icon: 'text-green-600' },
  'Información': { badge: 'bg-gray-100 text-gray-700',     bg: 'bg-gray-50',    icon: 'text-gray-400' },
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('es-MX', { month: 'short', day: 'numeric' })
}

export default function BlogPreview() {
  const posts = blogPosts.slice(0, 3)

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
          <div>
            <span className="text-violet-700 font-semibold text-sm uppercase tracking-wider">Blog Psique</span>
            <h2 className="mt-1 text-3xl sm:text-4xl font-extrabold text-gray-900">
              Recursos de salud mental
            </h2>
            <p className="mt-2 text-gray-500 max-w-md">
              Artículos prácticos escritos por especialistas para ayudarte a entender tu mente.
            </p>
          </div>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-violet-700 font-semibold hover:text-violet-800 transition-colors text-sm whitespace-nowrap group"
          >
            Ver todos los artículos
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map(post => {
            const Icon = ICONS[post.coverIcon] ?? Brain
            const c = CAT_COLORS[post.category] ?? CAT_COLORS['Información']
            return (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <article className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all h-full flex flex-col overflow-hidden">
                  <div className={`${c.bg} flex items-center justify-center h-40`}>
                    <Icon size={48} className={c.icon} strokeWidth={1.5} />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${c.badge}`}>
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-400">{post.readTime} min</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-violet-700 transition-colors leading-snug flex-1 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400 mt-auto">
                      <span>{formatDate(post.publishedAt)}</span>
                      <span className="text-violet-600 font-medium group-hover:underline">Leer →</span>
                    </div>
                  </div>
                </article>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
