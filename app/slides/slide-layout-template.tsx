'use client'

import { useEffect, useState } from 'react'

export function SlideLayoutTemplate() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="h-full flex items-center justify-center px-8 py-20">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className={`mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white rounded-full text-xs font-mono mb-4">
            03 / Layouts & Templates
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Layout vs Template
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl">
            Deux façons de partager de l'UI entre les routes, avec des comportements différents
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Layout */}
          <div className={`transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="p-6 border-2 border-blue-500 rounded-2xl h-full">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-4 h-4 rounded bg-blue-500" />
                <h3 className="text-2xl font-bold">layout.tsx</h3>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <h4 className="font-semibold mb-2">Caractéristiques</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5" />
                      <span><strong>Persiste</strong> entre les navigations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5" />
                      <span><strong>État conservé</strong> (formulaires, scroll)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5" />
                      <span><strong>Ne se re-render pas</strong> à chaque navigation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5" />
                      <span>Peut être <strong>imbriqué</strong> (nested layouts)</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-semibold mb-2 text-sm">Exemple</h4>
                  <pre className="text-xs font-mono text-gray-700 overflow-x-auto">
{`// app/dashboard/layout.tsx
export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <Sidebar />
      <main>{children}</main>
    </section>
  )
}`}
                  </pre>
                </div>

                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <h4 className="font-semibold text-green-700 mb-1">Cas d'usage</h4>
                  <p className="text-sm text-green-600">
                    Navigation, sidebar, header/footer partagés, providers de contexte
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Template */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="p-6 border-2 border-purple-500 rounded-2xl h-full">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-4 h-4 rounded bg-purple-500" />
                <h3 className="text-2xl font-bold">template.tsx</h3>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 rounded-xl">
                  <h4 className="font-semibold mb-2">Caractéristiques</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5" />
                      <span><strong>Recréé</strong> à chaque navigation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5" />
                      <span><strong>État réinitialisé</strong> à chaque fois</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5" />
                      <span><strong>useEffect</strong> exécuté à chaque navigation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5" />
                      <span>Nouvelle <strong>instance DOM</strong> créée</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-semibold mb-2 text-sm">Exemple</h4>
                  <pre className="text-xs font-mono text-gray-700 overflow-x-auto">
{`// app/blog/template.tsx
'use client'

export default function BlogTemplate({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="animate-slideIn">
      {children}
    </div>
  )
}`}
                  </pre>
                </div>

                <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <h4 className="font-semibold text-purple-700 mb-1">Cas d'usage</h4>
                  <p className="text-sm text-purple-600">
                    Animations d'entrée/sortie, logging de page views, réinitialisation de formulaires
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Comparison */}
        <div className={`mt-8 p-6 bg-gray-50 rounded-2xl transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="font-semibold mb-4">Visualisation de l'imbrication</h3>
          <div className="flex items-center justify-center gap-2 text-sm font-mono">
            <span className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg border-2 border-blue-500">layout.tsx</span>
            <span className="text-gray-400">{'>'}</span>
            <span className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg border-2 border-purple-500">template.tsx</span>
            <span className="text-gray-400">{'>'}</span>
            <span className="px-3 py-2 bg-red-100 text-red-700 rounded-lg border-2 border-red-500">error.tsx</span>
            <span className="text-gray-400">{'>'}</span>
            <span className="px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg border-2 border-yellow-500">loading.tsx</span>
            <span className="text-gray-400">{'>'}</span>
            <span className="px-3 py-2 bg-green-100 text-green-700 rounded-lg border-2 border-green-500">page.tsx</span>
          </div>
        </div>
      </div>
    </div>
  )
}
