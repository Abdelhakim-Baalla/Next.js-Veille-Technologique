'use client'

import { useEffect, useState } from 'react'

export function SlideFileHierarchy() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFile, setActiveFile] = useState<string | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const files = [
    {
      name: 'layout.tsx',
      color: 'bg-blue-500',
      description: 'Layout partagé entre les routes. Persiste lors de la navigation.',
      required: true,
    },
    {
      name: 'template.tsx',
      color: 'bg-purple-500',
      description: 'Similaire au layout mais recréé à chaque navigation. Utile pour les animations.',
      required: false,
    },
    {
      name: 'page.tsx',
      color: 'bg-green-500',
      description: 'UI unique de la route. Rend la route accessible publiquement.',
      required: true,
    },
    {
      name: 'loading.tsx',
      color: 'bg-yellow-500',
      description: 'UI de chargement. Affichée automatiquement pendant le chargement.',
      required: false,
    },
    {
      name: 'error.tsx',
      color: 'bg-red-500',
      description: 'Error Boundary. Capture les erreurs et affiche une UI de fallback.',
      required: false,
    },
    {
      name: 'not-found.tsx',
      color: 'bg-orange-500',
      description: 'UI affichée quand notFound() est appelé ou route inexistante.',
      required: false,
    },
  ]

  return (
    <div className="h-full flex items-center justify-center px-8 py-20">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className={`mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white rounded-full text-xs font-mono mb-4">
            02 / Fichiers Spéciaux
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Hiérarchie des Fichiers
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl">
            Chaque fichier a un rôle spécifique dans le système de routing
          </p>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* File Tree Visualization */}
          <div className={`transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="p-6 bg-gray-50 rounded-2xl">
              <h3 className="text-lg font-semibold mb-4">Structure d'un segment de route</h3>
              
              <div className="space-y-2">
                {files.map((file, index) => (
                  <button
                    key={file.name}
                    onClick={() => setActiveFile(activeFile === file.name ? null : file.name)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                      activeFile === file.name 
                        ? 'bg-black text-white' 
                        : 'bg-white border border-gray-200 hover:border-black'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className={`w-3 h-3 rounded ${file.color}`} />
                    <span className="font-mono text-sm flex-1 text-left">{file.name}</span>
                    {file.required && (
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        activeFile === file.name ? 'bg-white/20' : 'bg-gray-100'
                      }`}>
                        requis
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Execution Order */}
              <div className="mt-6 p-4 bg-white rounded-xl border border-gray-200">
                <h4 className="text-sm font-semibold mb-3">Ordre de rendu (imbrication)</h4>
                <div className="flex items-center gap-2 text-xs font-mono flex-wrap">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">layout</span>
                  <span className="text-gray-400">→</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">template</span>
                  <span className="text-gray-400">→</span>
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded">error</span>
                  <span className="text-gray-400">→</span>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded">loading</span>
                  <span className="text-gray-400">→</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded">page</span>
                </div>
              </div>
            </div>
          </div>

          {/* File Details */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="p-6 border border-gray-200 rounded-2xl h-full">
              {activeFile ? (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`w-4 h-4 rounded ${files.find(f => f.name === activeFile)?.color}`} />
                    <h3 className="text-2xl font-bold font-mono">{activeFile}</h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    {files.find(f => f.name === activeFile)?.description}
                  </p>
                  
                  {/* Code Example */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <pre className="text-sm font-mono text-gray-700 overflow-x-auto">
                      {getCodeExample(activeFile)}
                    </pre>
                  </div>
                </>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  <p>Cliquez sur un fichier pour voir les détails</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function getCodeExample(fileName: string): string {
  const examples: Record<string, string> = {
    'layout.tsx': `// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        <nav>...</nav>
        {children}
        <footer>...</footer>
      </body>
    </html>
  )
}`,
    'template.tsx': `// app/template.tsx
'use client'

export default function Template({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="animate-fadeIn">
      {children}
    </div>
  )
}`,
    'page.tsx': `// app/about/page.tsx
export default function AboutPage() {
  return (
    <main>
      <h1>À propos</h1>
      <p>Contenu de la page...</p>
    </main>
  )
}`,
    'loading.tsx': `// app/dashboard/loading.tsx
export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded" />
      <div className="h-4 bg-gray-200 rounded" />
    </div>
  )
}`,
    'error.tsx': `// app/dashboard/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div>
      <h2>Une erreur est survenue</h2>
      <button onClick={reset}>Réessayer</button>
    </div>
  )
}`,
    'not-found.tsx': `// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <h2>Page non trouvée</h2>
      <Link href="/">Retour à l'accueil</Link>
    </div>
  )
}`,
  }
  return examples[fileName] || ''
}
