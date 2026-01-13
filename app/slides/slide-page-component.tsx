'use client'

import { useEffect, useState } from 'react'

export function SlidePageComponent() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState<'basique' | 'params' | 'metadata'>('basique')

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const codeExamples = {
    basique: {
      title: 'Page Basique',
      description: 'Le composant le plus simple - une fonction qui retourne du JSX',
      code: `// app/about/page.tsx

export default function AboutPage() {
  return (
    <main>
      <h1>À propos de nous</h1>
      <p>Notre histoire...</p>
    </main>
  )
}

// URL: /about`
    },
    params: {
      title: 'Page avec Paramètres',
      description: 'Accès aux paramètres dynamiques et search params',
      code: `// app/blog/[slug]/page.tsx

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ 
    page?: string 
    sort?: string 
  }>
}

export default async function BlogPost({ 
  params,
  searchParams 
}: Props) {
  const { slug } = await params
  const { page, sort } = await searchParams
  
  return (
    <article>
      <h1>Article: {slug}</h1>
      <p>Page: {page}, Tri: {sort}</p>
    </article>
  )
}

// URL: /blog/mon-article?page=2&sort=date`
    },
    metadata: {
      title: 'Metadata (SEO)',
      description: 'Définition des métadonnées pour le SEO et le partage social',
      code: `// app/blog/[slug]/page.tsx

import { Metadata } from 'next'

// Metadata statique
export const metadata: Metadata = {
  title: 'Mon Blog',
  description: 'Articles passionnants'
}

// OU Metadata dynamique
export async function generateMetadata({
  params
}: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      images: [post.coverImage]
    }
  }
}

export default function BlogPost() {
  // ...
}`
    }
  }

  return (
    <div className="h-full flex items-center justify-center px-8 py-20">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className={`mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white rounded-full text-xs font-mono mb-4">
            04 / Composant Page
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            page.tsx
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl">
            Le composant qui définit l'UI unique pour une route - le seul fichier qui rend une route accessible
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          {/* Key Points */}
          <div className={`md:col-span-2 space-y-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <h3 className="font-semibold text-lg mb-4">Points Clés</h3>
            
            <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-black">
              <h4 className="font-semibold mb-1">Export par défaut</h4>
              <p className="text-sm text-gray-600">
                Toujours <code className="bg-gray-200 px-1 rounded">export default</code> - c'est obligatoire
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-blue-500">
              <h4 className="font-semibold mb-1">Server Component par défaut</h4>
              <p className="text-sm text-gray-600">
                Rendu côté serveur sauf si <code className="bg-gray-200 px-1 rounded">'use client'</code>
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-green-500">
              <h4 className="font-semibold mb-1">Async/Await supporté</h4>
              <p className="text-sm text-gray-600">
                Peut être une fonction async pour fetcher des données
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-purple-500">
              <h4 className="font-semibold mb-1">Props automatiques</h4>
              <p className="text-sm text-gray-600">
                <code className="bg-gray-200 px-1 rounded">params</code> et <code className="bg-gray-200 px-1 rounded">searchParams</code> injectés
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2 mt-6 pt-4 border-t">
              {(['basique', 'params', 'metadata'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab
                      ? 'bg-black text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Code Example */}
          <div className={`md:col-span-3 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="bg-gray-900 rounded-2xl p-6 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-gray-400 text-sm font-mono">
                  {codeExamples[activeTab].title}
                </span>
              </div>
              
              <p className="text-gray-400 text-sm mb-4">
                {codeExamples[activeTab].description}
              </p>
              
              <pre className="text-sm font-mono text-gray-100 overflow-x-auto">
                <code>{codeExamples[activeTab].code}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Route Matching */}
        <div className={`mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="font-semibold mb-4">Correspondance Route → Fichier</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white p-4 rounded-xl">
              <div className="font-mono text-blue-600 mb-2">/</div>
              <div className="text-gray-500">→ app/page.tsx</div>
            </div>
            <div className="bg-white p-4 rounded-xl">
              <div className="font-mono text-blue-600 mb-2">/about</div>
              <div className="text-gray-500">→ app/about/page.tsx</div>
            </div>
            <div className="bg-white p-4 rounded-xl">
              <div className="font-mono text-blue-600 mb-2">/blog/hello-world</div>
              <div className="text-gray-500">→ app/blog/[slug]/page.tsx</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
