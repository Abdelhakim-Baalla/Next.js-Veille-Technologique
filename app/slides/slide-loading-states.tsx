'use client'

import { useEffect, useState } from 'react'
import { Icons } from './icons'

export function SlideLoadingStates() {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setIsLoading((prev) => !prev)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="slide">
      <div className="slide-content">
        {/* Header */}
        <div className="slide-header">
          <div className={`slide-badge ${isVisible ? 'animate-fadeInDown' : 'opacity-0'}`}>
            07 — Loading States
          </div>
          <h2 className={`text-display mb-4 ${isVisible ? 'animate-fadeInUp stagger-1' : 'opacity-0'}`}>
            États de Chargement
          </h2>
          <p className={`text-subtitle max-w-3xl ${isVisible ? 'animate-fadeInUp stagger-2' : 'opacity-0'}`}>
            Créez des expériences de chargement fluides avec <span className="code-inline">loading.tsx</span>, 
            React Suspense, et le Streaming SSR de Next.js.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* loading.tsx */}
          <div className={`${isVisible ? 'animate-fadeInLeft stagger-3' : 'opacity-0'}`}>
            <h3 className="text-title mb-4">loading.tsx — Fichier Magique</h3>
            
            <div className="code-window mb-4">
              <div className="code-header">
                <div className="code-dot red" />
                <div className="code-dot yellow" />
                <div className="code-dot green" />
                <span className="code-title">app/dashboard/loading.tsx</span>
              </div>
              <div className="code-body">
                <pre>{`// S'affiche automatiquement pendant
// le chargement de page.tsx

export default function Loading() {
  return (
    <div className="flex items-center gap-3">
      <div className="animate-spin rounded-full 
                      h-8 w-8 border-2 border-black 
                      border-t-transparent" />
      <span>Chargement...</span>
    </div>
  )
}`}</pre>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl mb-4">
              <h4 className="font-medium text-sm mb-3">Comment ça marche ?</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-lg">1️⃣</span>
                  <p className="text-gray-600">Next.js enveloppe <code>page.tsx</code> dans un <code>&lt;Suspense&gt;</code></p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-lg">2️⃣</span>
                  <p className="text-gray-600">Le fallback = contenu de <code>loading.tsx</code></p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-lg">3️⃣</span>
                  <p className="text-gray-600">Streaming SSR envoie le HTML progressivement</p>
                </div>
              </div>
            </div>

            <div className="code-window">
              <div className="code-header">
                <div className="code-dot red" />
                <div className="code-dot yellow" />
                <div className="code-dot green" />
                <span className="code-title">Équivalent React</span>
              </div>
              <div className="code-body">
                <pre>{`// Ce que Next.js fait automatiquement :
<Layout>
  <Suspense fallback={<Loading />}>
    <Page />
  </Suspense>
</Layout>`}</pre>
              </div>
            </div>
          </div>

          {/* Demo & Suspense avancé */}
          <div className={`${isVisible ? 'animate-fadeInRight stagger-4' : 'opacity-0'}`}>
            <h3 className="text-title mb-4">Démo en temps réel</h3>
            
            <div className="browser mb-6">
              <div className="browser-header">
                <div className="browser-dots">
                  <div className="code-dot red" />
                  <div className="code-dot yellow" />
                  <div className="code-dot green" />
                </div>
                <div className="browser-url">localhost:3000/dashboard</div>
              </div>
              <div className="browser-body !p-4">
                {/* Simulated loading state */}
                <div className="space-y-4">
                  <div className="h-8 bg-gray-100 rounded w-1/3" />
                  
                  {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="flex items-center gap-3">
                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-black border-t-transparent" />
                        <span className="text-sm text-gray-600">Chargement...</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 animate-fadeIn">
                      <div className="h-20 bg-gray-100 rounded-xl p-4">
                        <div className="h-3 bg-gray-200 rounded w-2/3 mb-2" />
                        <div className="h-3 bg-gray-200 rounded w-1/2" />
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="h-16 bg-gray-100 rounded-xl" />
                        <div className="h-16 bg-gray-100 rounded-xl" />
                        <div className="h-16 bg-gray-100 rounded-xl" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <h3 className="text-title mb-4">Suspense Granulaire</h3>
            
            <div className="code-window mb-4">
              <div className="code-header">
                <div className="code-dot red" />
                <div className="code-dot yellow" />
                <div className="code-dot green" />
                <span className="code-title">Chargement par composant</span>
              </div>
              <div className="code-body">
                <pre>{`import { Suspense } from 'react'

export default function Page() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Chaque section charge indépendamment */}
      <Suspense fallback={<CardSkeleton />}>
        <UserProfile />
      </Suspense>
      
      <Suspense fallback={<ChartSkeleton />}>
        <Analytics />
      </Suspense>
      
      <Suspense fallback={<ListSkeleton />}>
        <RecentActivity />
      </Suspense>
    </div>
  )
}`}</pre>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center mb-2">
                  <Icons.zap className="w-4 h-4" />
                </div>
                <h4 className="font-medium text-sm">Streaming SSR</h4>
                <p className="text-xs text-gray-500">HTML envoyé progressivement</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center mb-2">
                  <Icons.target className="w-4 h-4" />
                </div>
                <h4 className="font-medium text-sm">Granularité</h4>
                <p className="text-xs text-gray-500">Loading par composant</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
