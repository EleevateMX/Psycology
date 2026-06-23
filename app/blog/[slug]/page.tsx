import { notFound } from 'next/navigation'
import Link from 'next/link'
import { blogPosts } from '@/lib/blog-data'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: `${post.title} | Blog Psique`,
    description: post.excerpt,
  }
}

const CATEGORY_COLORS: Record<string, string> = {
  'Salud Mental': 'bg-violet-100 text-violet-700',
  'Ansiedad': 'bg-orange-100 text-orange-700',
  'TDAH': 'bg-blue-100 text-blue-700',
  'Pareja': 'bg-pink-100 text-pink-700',
  'Duelo': 'bg-green-100 text-green-700',
  'Información': 'bg-gray-100 text-gray-700',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })
}

function renderInline(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>
    }
    return part
  })
}

function renderContent(content: string): ReactNode[] {
  const blocks = content.split('\n\n')
  return blocks.map((block, i) => {
    const trimmed = block.trim()
    if (!trimmed) return null

    if (trimmed.startsWith('## ')) {
      return (
        <h2 key={i} className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          {renderInline(trimmed.slice(3))}
        </h2>
      )
    }
    if (trimmed.startsWith('### ')) {
      return (
        <h3 key={i} className="text-lg font-bold text-gray-900 mt-6 mb-3">
          {renderInline(trimmed.slice(4))}
        </h3>
      )
    }
    if (trimmed.startsWith('- ') || trimmed.includes('\n- ')) {
      const items = trimmed.split('\n').filter((l) => l.startsWith('- ')).map((l) => l.slice(2))
      return (
        <ul key={i} className="list-disc list-outside ml-5 space-y-2 my-4 text-gray-700">
          {items.map((item, j) => (
            <li key={j} className="leading-relaxed">{renderInline(item)}</li>
          ))}
        </ul>
      )
    }
    if (trimmed.match(/^\*\*\d+\./)) {
      const items = trimmed.split('\n').filter(Boolean)
      return (
        <ol key={i} className="list-decimal list-outside ml-5 space-y-2 my-4 text-gray-700">
          {items.map((item, j) => (
            <li key={j} className="leading-relaxed">{renderInline(item.replace(/^\*\*\d+\.\*\*\s*/, ''))}</li>
          ))}
        </ol>
      )
    }
    return (
      <p key={i} className="text-gray-700 leading-relaxed my-4">
        {renderInline(trimmed)}
      </p>
    )
  }).filter(Boolean) as ReactNode[]
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-violet-600 hover:text-violet-700 mb-6">
            ← Blog
          </Link>

          <div className="flex items-start gap-4">
            <span className="text-5xl sm:text-6xl shrink-0 mt-1">{post.coverEmoji}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${CATEGORY_COLORS[post.category] ?? 'bg-gray-100 text-gray-700'}`}>
                  {post.category}
                </span>
                <span className="text-xs text-gray-400">{post.readTime} min de lectura</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
                {post.title}
              </h1>
              <p className="text-gray-500 text-lg leading-relaxed mb-5">{post.excerpt}</p>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center text-violet-700 font-bold text-xs">
                  P
                </div>
                <div>
                  <span className="font-medium text-gray-700">{post.author}</span>
                  <span className="mx-1.5">·</span>
                  <span>{post.authorRole}</span>
                  <span className="mx-1.5">·</span>
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Article body */}
          <article className="flex-1 min-w-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <div className="prose-container">
              {renderContent(post.content)}
            </div>

            {/* Tags */}
            <div className="mt-10 pt-6 border-t border-gray-100 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </article>

          {/* Sidebar */}
          <div className="w-full lg:w-72 shrink-0 space-y-6">
            {/* CTA */}
            <div className="bg-violet-700 rounded-2xl p-6 text-white">
              <div className="text-3xl mb-3">🧠</div>
              <h3 className="font-bold text-lg mb-2">¿Necesitas apoyo?</h3>
              <p className="text-violet-200 text-sm mb-4 leading-relaxed">
                Encuentra psicólogos verificados en Mérida. Citas presenciales y en línea.
              </p>
              <Link
                href="/psicologos"
                className="block text-center bg-white text-violet-700 font-bold px-4 py-2.5 rounded-xl hover:bg-violet-50 transition-colors text-sm"
              >
                Buscar psicólogos
              </Link>
            </div>

            {/* Related */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Artículos relacionados</h3>
              <div className="space-y-4">
                {related.map((r) => (
                  <Link key={r.slug} href={`/blog/${r.slug}`} className="flex gap-3 group">
                    <span className="text-2xl shrink-0">{r.coverEmoji}</span>
                    <span className="text-sm text-gray-700 group-hover:text-violet-700 transition-colors leading-snug font-medium">
                      {r.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
