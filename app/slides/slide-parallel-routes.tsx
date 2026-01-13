'use client'

import { useEffect, useState } from 'react'

export function SlideParallelRoutes() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSlot, setActiveSlot] = useState<'team' | 'analytics' | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="h-full flex items-center justify-center px-8 py-20">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className={`mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white rounded-full text-xs font-mono mb-4">
            06 / Parallel Routes
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Routes Parallèles
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl">
            Affichez plusieurs pages simultanément avec les slots <code className="bg-gray-200 px-2 py-1 rounded">@folder</code>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Structure */}
          <div className={`transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="bg-gray-900 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-gray-400 text-sm font-mono">Structure</span>
              </div>

              <div className="font-mono text-sm space-y-1">
                <div className="text-gray-300">app/</div>
                <div className="text-gray-300 ml-4">└── dashboard/</div>
                <div className="text-gray-300 ml-8">    ├── layout.tsx</div>
                <div className="text-gray-300 ml-8">    ├── page.tsx</div>
                <div 
                  className={`ml-8 cursor-pointer transition-colors ${activeSlot === 'team' ? 'text-blue-400' : 'text-gray-300 hover:text-blue-300'}`}
                  onClick={() => setActiveSlot(activeSlot === 'team' ? null : 'team')}
                >
                  ├── <span className="text-blue-400">@team</span>/
                </div>
                <div className={`ml-12 transition-colors ${activeSlot === 'team' ? 'text-blue-400' : 'text-gray-300'}`}>
                  │   ├── page.tsx
                </div>
                <div className={`ml-12 transition-colors ${activeSlot === 'team' ? 'text-blue-400' : 'text-gray-300'}`}>
                  │   └── loading.tsx
                </div>
                <div 
                  className={`ml-8 cursor-pointer transition-colors ${activeSlot === 'analytics' ? 'text-purple-400' : 'text-gray-300 hover:text-purple-300'}`}
                  onClick={() => setActiveSlot(activeSlot === 'analytics' ? null : 'analytics')}
                >
                  └── <span className="text-purple-400">@analytics</span>/
                </div>
                <div className={`ml-12 transition-colors ${activeSlot === 'analytics' ? 'text-purple-400' : 'text-gray-300'}`}>
                        ├── page.tsx
                </div>
                <div className={`ml-12 transition-colors ${activeSlot === 'analytics' ? 'text-purple-400' : 'text-gray-300'}`}>
                        └── loading.tsx
                </div>
              </div>
            </div>

            {/* Layout Code */}
            <div className="mt-4 bg-gray-900 rounded-2xl p-6">
              <div className="text-gray-400 text-xs font-mono mb-3">dashboard/layout.tsx</div>
              <pre className="text-sm font-mono text-gray-100 overflow-x-auto">
{`export default function Layout({
  children,
  team,      // ← @team slot
  analytics  // ← @analytics slot
}: {
  children: React.ReactNode
  team: React.ReactNode
  analytics: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-2">
      <div>{team}</div>
      <div>{analytics}</div>
      <div className="col-span-2">
        {children}
      </div>
    </div>
  )
}`}
              </pre>
            </div>
          </div>

          {/* Visual Demo */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            {/* Browser Preview */}
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

              <div className="bg-white rounded-xl p-4">
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className={`p-4 rounded-lg border-2 transition-all ${activeSlot === 'team' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-gray-50'}`}>
                    <div className="text-xs font-mono text-blue-600 mb-1">@team</div>
                    <div className="text-sm font-semibold">Équipe</div>
                    <div className="text-xs text-gray-500 mt-1">5 membres actifs</div>
                  </div>
                  <div className={`p-4 rounded-lg border-2 transition-all ${activeSlot === 'analytics' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 bg-gray-50'}`}>
                    <div className="text-xs font-mono text-purple-600 mb-1">@analytics</div>
                    <div className="text-sm font-semibold">Statistiques</div>
                    <div className="text-xs text-gray-500 mt-1">+23% cette semaine</div>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                  <div className="text-xs font-mono text-gray-600 mb-1">children (page.tsx)</div>
                  <div className="text-sm font-semibold">Contenu principal</div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-3">
              <div className="p-4 bg-blue-50 rounded-xl border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-900 mb-1">Chargement Indépendant</h4>
                <p className="text-sm text-blue-700">
                  Chaque slot a son propre loading.tsx et error.tsx
                </p>
              </div>

              <div className="p-4 bg-purple-50 rounded-xl border-l-4 border-purple-500">
                <h4 className="font-semibold text-purple-900 mb-1">Navigation Partielle</h4>
                <p className="text-sm text-purple-700">
                  Un slot peut changer sans recharger les autres
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded-xl border-l-4 border-green-500">
                <h4 className="font-semibold text-green-900 mb-1">Dashboards Complexes</h4>
                <p className="text-sm text-green-700">
                  Parfait pour les interfaces avec plusieurs widgets
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tip */}
        <div className={`mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-sm text-yellow-800">
            <strong>💡 Astuce:</strong> Utilisez <code className="bg-yellow-200 px-1 rounded">default.tsx</code> pour définir le contenu par défaut d'un slot quand aucune route ne correspond.
          </p>
        </div>
      </div>
    </div>
  )
}
