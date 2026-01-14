'use client'

import { useEffect, useState } from 'react'
import { Icons } from './icons'

export function SlideFileConventions() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFile, setActiveFile] = useState<string | null>('layout.tsx')

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const files = [
    {
      name: 'layout.tsx',
      icon: Icons.layout,
      description: 'Définit l\'UI partagée entre plusieurs routes. Le layout enveloppe ses enfants et persiste lors de la navigation — l\'état React est conservé.',
      required: true,
      details: [
        'Obligatoire dans app/ (root layout)',
        'Reçoit { children } comme prop',
        'Peut être imbriqué (nested layouts)',
        'Ne se re-render pas lors de la navigation',
        'Peut fetch des données (async component)',
      ],
      code: `// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <nav>Dashboard Navigation</nav>
      <main>{children}</main>
    </section>
  )
}`
    },
    {
      name: 'page.tsx',
      icon: Icons.file,
      description: 'Le composant qui rend une route accessible. C\'est l\'UI unique pour ce segment de route. Sans page.tsx, la route n\'est pas publiquement accessible.',
      required: true,
      details: [
        'Requis pour rendre une route accessible',
        'Export default obligatoire',
        'Peut être async pour fetch des données',
        'Reçoit params et searchParams comme props',
        'Server Component par défaut',
      ],
      code: `// app/blog/[slug]/page.tsx
type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ sort?: string }>
}

export default async function BlogPost({
  params,
  searchParams
}: Props) {
  const { slug } = await params
  const post = await getPost(slug)
  
  return <article>{post.content}</article>
}`
    },
    {
      name: 'template.tsx',
      icon: Icons.copy,
      description: 'Similaire au layout mais crée une nouvelle instance à chaque navigation. L\'état est réinitialisé et les effets sont re-exécutés.',
      required: false,
      details: [
        'Nouvelle instance créée à chaque navigation',
        'État React réinitialisé',
        'useEffect re-exécuté',
        'Parfait pour animations d\'entrée',
        'Utilisé pour tracking de page views',
      ],
      code: `// app/blog/template.tsx
'use client'

import { useEffect } from 'react'

export default function BlogTemplate({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Exécuté à CHAQUE navigation
    analytics.track('page_view')
  }, [])
  
  return <div className="animate-in">{children}</div>
}`
    },
    {
      name: 'loading.tsx',
      icon: Icons.loader,
      description: 'Affiche un UI de chargement instantané pendant que le contenu de la page se charge. Utilise React Suspense sous le capot.',
      required: false,
      details: [
        'Affiché immédiatement lors de la navigation',
        'Utilise React Suspense automatiquement',
        'Streaming SSR pour une réponse rapide',
        'Peut être personnalisé par route',
        'Remplacé par page.tsx une fois chargé',
      ],
      code: `// app/dashboard/loading.tsx
export default function DashboardLoading() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 rounded w-1/4" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
  )
}

// Équivalent à :
// <Suspense fallback={<DashboardLoading />}>
//   <DashboardPage />
// </Suspense>`
    },
    {
      name: 'error.tsx',
      icon: '🛡️',
      description: 'Capture les erreurs JavaScript de ses enfants et affiche une UI de fallback. Permet de récupérer d\'une erreur sans recharger.',
      required: false,
      details: [
        'Doit être un Client Component ("use client")',
        'Reçoit error et reset() comme props',
        'Ne capture pas les erreurs du layout parent',
        'reset() permet de réessayer le rendu',
        'Isolé par segment de route',
      ],
      code: `// app/dashboard/error.tsx
'use client' // Obligatoire!

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="error-container">
      <h2>Une erreur est survenue</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>
        Réessayer
      </button>
    </div>
  )
}`
    },
    {
      name: 'not-found.tsx',
      icon: '🔍',
      description: 'UI affichée quand la fonction notFound() est appelée ou quand aucune route ne correspond.',
      required: false,
      details: [
        'Déclenché par notFound() ou URL inexistante',
        'Peut être personnalisé par segment',
        'Server Component par défaut',
        'Affiche HTTP 404 automatiquement',
        'Peut inclure des liens de navigation',
      ],
      code: `// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h2 className="text-4xl font-bold">404</h2>
      <p className="text-gray-600 mt-2">
        Page non trouvée
      </p>
      <Link 
        href="/" 
        className="mt-4 inline-block underline"
      >
        Retour à l'accueil
      </Link>
    </div>
  )
}`
    },
  ]

  const activeFileData = files.find(f => f.name === activeFile)

  return (
    <div className="slide">
      <div className="slide-content">
        {/* Header */}
        <div className="slide-header">
          <div className={`slide-badge ${isVisible ? 'animate-fadeInDown' : 'opacity-0'}`}>
            02 — Conventions de Fichiers
          </div>
          <h2 className={`text-display mb-4 ${isVisible ? 'animate-fadeInUp stagger-1' : 'opacity-0'}`}>
            Fichiers Spéciaux
          </h2>
          <p className={`text-subtitle max-w-3xl ${isVisible ? 'animate-fadeInUp stagger-2' : 'opacity-0'}`}>
            L'App Router utilise des conventions de nommage pour créer automatiquement 
            l'UI avec des comportements spéciaux : layouts, loading states, error handling...
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-5 gap-6">
          {/* File List */}
          <div className={`md:col-span-2 space-y-2 ${isVisible ? 'animate-fadeInLeft stagger-3' : 'opacity-0'}`}>
            {files.map((file) => {
              const FileIcon = file.icon
              return (
                <button
                  key={file.name}
                  onClick={() => setActiveFile(file.name)}
                  data-hover="true"
                  className={`w-full file-tree-item ${activeFile === file.name ? 'active' : ''}`}
                >
                  <FileIcon className="w-5 h-5" />
                  <span className="font-medium">{file.name}</span>
                  {file.required && (
                    <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                      activeFile === file.name ? 'bg-white/20' : 'bg-black text-white'
                    }`}>
                      requis
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* File Details */}
          <div className={`md:col-span-3 ${isVisible ? 'animate-fadeInRight stagger-4' : 'opacity-0'}`}>
            {activeFileData && (() => {
              const ActiveIcon = activeFileData.icon
              return (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center">
                      <ActiveIcon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold font-mono">{activeFileData.name}</h3>
                  </div>

                  <p className="text-body">{activeFileData.description}</p>

                  <ul className="space-y-2 mb-4">
                    {activeFileData.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-gray-400 mt-1">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="code-window">
                    <div className="code-header">
                      <div className="code-dot red" />
                      <div className="code-dot yellow" />
                      <div className="code-dot green" />
                      <span className="code-title">{activeFileData.name}</span>
                    </div>
                    <div className="code-body max-h-[200px] overflow-y-auto">
                      <pre className="text-xs">{activeFileData.code}</pre>
                    </div>
                  </div>
                </div>
              )
            })()}
          </div>
        </div>
      </div>
    </div>
  )
}
