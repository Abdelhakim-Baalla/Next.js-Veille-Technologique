'use client'

import { useEffect, useState } from 'react'

export function SlideErrorHandling() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [activeTab, setActiveTab] = useState<'error' | 'global' | 'notfound'>('error')

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const codeExamples = {
    error: {
      title: 'error.tsx',
      code: `// app/dashboard/error.tsx
'use client' // ⚠️ OBLIGATOIRE!

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="error-container">
      <h2>Une erreur est survenue!</h2>
      <p>{error.message}</p>
      
      {/* Bouton pour réessayer */}
      <button onClick={() => reset()}>
        Réessayer
      </button>
    </div>
  )
}

// ⚡ Capture automatiquement les erreurs
// de page.tsx et ses enfants`
    },
    global: {
      title: 'global-error.tsx',
      code: `// app/global-error.tsx
'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    // ⚠️ Doit inclure html et body!
    <html>
      <body>
        <h2>Erreur critique!</h2>
        <button onClick={() => reset()}>
          Réessayer
        </button>
      </body>
    </html>
  )
}

// 🔴 Capture les erreurs du root layout
// Remplace TOUT le contenu de la page`
    },
    notfound: {
      title: 'not-found.tsx',
      code: `// app/not-found.tsx

import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <h2>Page non trouvée</h2>
      <p>
        La page que vous cherchez 
        n'existe pas.
      </p>
      <Link href="/">
        Retour à l'accueil
      </Link>
    </div>
  )
}

// Déclenché par:
// - URL inexistante
// - notFound() appelé manuellement`
    }
  }

  return (
    <div className="h-full flex items-center justify-center px-8 py-20">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className={`mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white rounded-full text-xs font-mono mb-4">
            09 / Error Handling
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Gestion des Erreurs
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl">
            Gérez les erreurs de manière élégante avec des boundaries automatiques
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Interactive Demo */}
          <div className={`transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="bg-gray-100 rounded-2xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-gray-500 font-mono">
                  localhost:3000/dashboard
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 min-h-[220px]">
                {!hasError ? (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Dashboard</h3>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                        En ligne
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">234</div>
                        <div className="text-xs text-gray-500">Utilisateurs</div>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">89%</div>
                        <div className="text-xs text-gray-500">Satisfaction</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setHasError(true)}
                      className="w-full py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
                    >
                      💥 Simuler une erreur
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">⚠️</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-red-600">
                      Oups! Une erreur est survenue
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Error: Failed to fetch dashboard data
                    </p>
                    <button
                      onClick={() => setHasError(false)}
                      className="px-6 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition-colors"
                    >
                      🔄 Réessayer
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Error Hierarchy */}
            <div className="p-4 bg-gray-50 rounded-xl">
              <h4 className="font-semibold mb-3 text-sm">Hiérarchie des Error Boundaries</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 p-2 bg-red-100 rounded-lg">
                  <span className="w-2 h-2 bg-red-500 rounded-full" />
                  <span className="font-mono">global-error.tsx</span>
                  <span className="text-gray-500 ml-auto text-xs">Root level</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-orange-100 rounded-lg ml-4">
                  <span className="w-2 h-2 bg-orange-500 rounded-full" />
                  <span className="font-mono">layout.tsx</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-yellow-100 rounded-lg ml-8">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                  <span className="font-mono">error.tsx</span>
                  <span className="text-gray-500 ml-auto text-xs">Capture les erreurs ↓</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-gray-200 rounded-lg ml-12">
                  <span className="w-2 h-2 bg-gray-500 rounded-full" />
                  <span className="font-mono">page.tsx</span>
                </div>
              </div>
            </div>
          </div>

          {/* Code Examples */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            {/* Tabs */}
            <div className="flex gap-2 mb-4">
              {(['error', 'global', 'notfound'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab
                      ? 'bg-black text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {tab === 'error' ? 'error.tsx' : tab === 'global' ? 'global-error' : 'not-found'}
                </button>
              ))}
            </div>

            <div className="bg-gray-900 rounded-2xl p-6">
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
              
              <pre className="text-xs font-mono text-gray-100 overflow-x-auto whitespace-pre-wrap">
                <code>{codeExamples[activeTab].code}</code>
              </pre>
            </div>

            {/* Key Points */}
            <div className="mt-4 space-y-3">
              <div className="p-3 bg-red-50 rounded-xl border-l-4 border-red-500">
                <p className="text-sm text-red-800">
                  <strong>'use client'</strong> est obligatoire pour error.tsx car il utilise des hooks React
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl border-l-4 border-blue-500">
                <p className="text-sm text-blue-800">
                  <strong>reset()</strong> permet de réessayer le rendu sans rafraîchir la page
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
