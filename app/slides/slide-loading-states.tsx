'use client'

import { useEffect, useState } from 'react'

export function SlideLoadingStates() {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'file' | 'suspense' | 'streaming'>('file')

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Simulate loading
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setIsLoading(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  const codeExamples = {
    file: {
      title: 'loading.tsx',
      code: `// app/dashboard/loading.tsx

export default function DashboardLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-4" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
  )
}

// ⚡ Automatiquement affiché pendant 
// le chargement de page.tsx`
    },
    suspense: {
      title: 'Suspense manuel',
      code: `// app/dashboard/page.tsx
import { Suspense } from 'react'
import { UserList } from './user-list'
import { Analytics } from './analytics'

export default function Dashboard() {
  return (
    <main>
      <h1>Dashboard</h1>
      
      {/* Chargement indépendant */}
      <Suspense fallback={<UserSkeleton />}>
        <UserList />  {/* async component */}
      </Suspense>
      
      <Suspense fallback={<ChartSkeleton />}>
        <Analytics /> {/* async component */}
      </Suspense>
    </main>
  )
}`
    },
    streaming: {
      title: 'Streaming SSR',
      code: `// Comment ça fonctionne:

1. Le serveur envoie immédiatement 
   le HTML du layout + loading.tsx

2. Les composants async se chargent 
   en parallèle sur le serveur

3. Quand un composant est prêt, 
   il est "streamé" vers le client

4. React hydrate les parties 
   progressivement

// Résultat: Time to First Byte (TTFB) 
// ultra rapide! ⚡`
    }
  }

  return (
    <div className="h-full flex items-center justify-center px-8 py-20">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className={`mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white rounded-full text-xs font-mono mb-4">
            08 / Loading States
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            États de Chargement
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl">
            Offrez une UX fluide avec le streaming SSR et les indicateurs de chargement automatiques
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

              <div className="bg-white rounded-xl p-4 min-h-[200px]">
                <div className="text-sm font-semibold mb-4">Dashboard</div>
                
                {isLoading ? (
                  <div className="space-y-3 animate-pulse">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full" />
                      <div className="flex-1">
                        <div className="h-3 bg-gray-200 rounded w-1/3 mb-2" />
                        <div className="h-2 bg-gray-200 rounded w-1/2" />
                      </div>
                    </div>
                    <div className="h-24 bg-gray-200 rounded-lg" />
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-16 bg-gray-200 rounded" />
                      <div className="h-16 bg-gray-200 rounded" />
                      <div className="h-16 bg-gray-200 rounded" />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        JD
                      </div>
                      <div>
                        <div className="font-medium text-sm">John Doe</div>
                        <div className="text-xs text-gray-500">Administrateur</div>
                      </div>
                    </div>
                    <div className="h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
                      📊 Graphique chargé!
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-16 bg-green-100 rounded flex items-center justify-center text-green-600 font-bold">
                        +23%
                      </div>
                      <div className="h-16 bg-blue-100 rounded flex items-center justify-center text-blue-600 font-bold">
                        1.2k
                      </div>
                      <div className="h-16 bg-purple-100 rounded flex items-center justify-center text-purple-600 font-bold">
                        89%
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => setIsLoading(true)}
              className="w-full py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition-colors"
            >
              🔄 Recharger pour voir le skeleton
            </button>
          </div>

          {/* Code Examples */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            {/* Tabs */}
            <div className="flex gap-2 mb-4">
              {(['file', 'suspense', 'streaming'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab
                      ? 'bg-black text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {tab === 'file' ? 'loading.tsx' : tab === 'suspense' ? 'Suspense' : 'Streaming'}
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
              
              <pre className="text-sm font-mono text-gray-100 overflow-x-auto whitespace-pre-wrap">
                <code>{codeExamples[activeTab].code}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Key Points */}
        <div className={`mt-6 grid md:grid-cols-3 gap-4 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="p-4 bg-blue-50 rounded-xl">
            <div className="text-2xl mb-2">📁</div>
            <h4 className="font-semibold mb-1">Automatique</h4>
            <p className="text-sm text-gray-600">
              Créez loading.tsx et Next.js l'utilise automatiquement
            </p>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl">
            <div className="text-2xl mb-2">⚡</div>
            <h4 className="font-semibold mb-1">Streaming</h4>
            <p className="text-sm text-gray-600">
              Le contenu arrive progressivement, pas d'attente globale
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-xl">
            <div className="text-2xl mb-2">🎯</div>
            <h4 className="font-semibold mb-1">Granulaire</h4>
            <p className="text-sm text-gray-600">
              Utilisez Suspense pour un contrôle précis des zones de loading
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
