'use client'

import { useEffect, useState } from 'react'

export function SlideRouteGroups() {
  const [isVisible, setIsVisible] = useState(false)
  const [showUrls, setShowUrls] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => setShowUrls(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="h-full flex items-center justify-center px-8 py-20">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className={`mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white rounded-full text-xs font-mono mb-4">
            05 / Route Groups
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Groupes de Routes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl">
            Organisez votre code sans affecter l'URL avec la syntaxe <code className="bg-gray-200 px-2 py-1 rounded">(folder)</code>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Structure Exemple */}
          <div className={`transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="bg-gray-900 rounded-2xl p-6 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-gray-400 text-sm font-mono">Structure de dossiers</span>
              </div>

              <div className="font-mono text-sm space-y-1">
                <div className="text-gray-300">app/</div>
                <div className="text-gray-300 ml-4">├── <span className="text-orange-400">(marketing)</span>/</div>
                <div className="text-gray-300 ml-8">│   ├── layout.tsx <span className="text-gray-500">← Layout marketing</span></div>
                <div className="text-gray-300 ml-8">│   ├── page.tsx <span className="text-gray-500">← /</span></div>
                <div className="text-gray-300 ml-8">│   ├── about/</div>
                <div className="text-gray-300 ml-12">│       └── page.tsx <span className="text-gray-500">← /about</span></div>
                <div className="text-gray-300 ml-4">├── <span className="text-blue-400">(dashboard)</span>/</div>
                <div className="text-gray-300 ml-8">│   ├── layout.tsx <span className="text-gray-500">← Layout dashboard</span></div>
                <div className="text-gray-300 ml-8">│   ├── dashboard/</div>
                <div className="text-gray-300 ml-12">│   │   └── page.tsx <span className="text-gray-500">← /dashboard</span></div>
                <div className="text-gray-300 ml-8">│   └── settings/</div>
                <div className="text-gray-300 ml-12">│       └── page.tsx <span className="text-gray-500">← /settings</span></div>
                <div className="text-gray-300 ml-4">└── <span className="text-green-400">(auth)</span>/</div>
                <div className="text-gray-300 ml-8">    ├── layout.tsx <span className="text-gray-500">← Layout auth</span></div>
                <div className="text-gray-300 ml-8">    ├── login/</div>
                <div className="text-gray-300 ml-12">    │   └── page.tsx <span className="text-gray-500">← /login</span></div>
                <div className="text-gray-300 ml-8">    └── register/</div>
                <div className="text-gray-300 ml-12">        └── page.tsx <span className="text-gray-500">← /register</span></div>
              </div>
            </div>
          </div>

          {/* Explications */}
          <div className={`space-y-4 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="p-5 bg-orange-50 rounded-xl border-2 border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-orange-400 text-white text-xs font-mono rounded">(marketing)</span>
              </div>
              <p className="text-sm text-gray-700">
                Pages publiques avec un layout simple (header + footer uniquement)
              </p>
            </div>

            <div className="p-5 bg-blue-50 rounded-xl border-2 border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-blue-400 text-white text-xs font-mono rounded">(dashboard)</span>
              </div>
              <p className="text-sm text-gray-700">
                Pages admin avec sidebar, navigation complexe, authentification requise
              </p>
            </div>

            <div className="p-5 bg-green-50 rounded-xl border-2 border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-green-400 text-white text-xs font-mono rounded">(auth)</span>
              </div>
              <p className="text-sm text-gray-700">
                Pages d'authentification avec layout centré, minimaliste
              </p>
            </div>

            {/* URLs résultantes */}
            <div className={`mt-6 p-5 bg-gray-100 rounded-xl transition-all duration-500 ${showUrls ? 'opacity-100' : 'opacity-0'}`}>
              <h4 className="font-semibold mb-3">URLs résultantes</h4>
              <div className="space-y-2 font-mono text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-400 rounded-full" />
                  <span>/</span>
                  <span className="text-gray-400">← pas de (marketing) dans l'URL!</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-400 rounded-full" />
                  <span>/about</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span>/dashboard</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span>/settings</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full" />
                  <span>/login</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Benefits */}
        <div className={`mt-8 grid md:grid-cols-3 gap-4 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="p-4 bg-gray-50 rounded-xl text-center">
            <div className="text-3xl mb-2">📁</div>
            <h4 className="font-semibold mb-1">Organisation</h4>
            <p className="text-sm text-gray-600">Grouper les routes par fonctionnalité ou équipe</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl text-center">
            <div className="text-3xl mb-2">🎨</div>
            <h4 className="font-semibold mb-1">Layouts Différents</h4>
            <p className="text-sm text-gray-600">Chaque groupe peut avoir son propre layout</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl text-center">
            <div className="text-3xl mb-2">🔗</div>
            <h4 className="font-semibold mb-1">URL Propre</h4>
            <p className="text-sm text-gray-600">Le nom du groupe n'apparaît pas dans l'URL</p>
          </div>
        </div>
      </div>
    </div>
  )
}
