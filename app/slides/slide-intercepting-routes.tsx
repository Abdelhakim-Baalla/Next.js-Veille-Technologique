'use client'

import { useEffect, useState } from 'react'

export function SlideInterceptingRoutes() {
  const [isVisible, setIsVisible] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [activeConvention, setActiveConvention] = useState<string | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const conventions = [
    { syntax: '(.)', desc: 'Même niveau', example: 'photos/(.)photo/[id]' },
    { syntax: '(..)', desc: 'Un niveau au-dessus', example: 'feed/(..)photo/[id]' },
    { syntax: '(..)(..)', desc: 'Deux niveaux', example: 'feed/user/(..)(..)/photo/[id]' },
    { syntax: '(...)', desc: 'Depuis la racine app', example: '(...)photo/[id]' },
  ]

  return (
    <div className="h-full flex items-center justify-center px-8 py-20">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className={`mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white rounded-full text-xs font-mono mb-4">
            07 / Intercepting Routes
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Interception de Routes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl">
            Affichez une route dans le contexte actuel sans changer de page - parfait pour les modals
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Demo Interactive */}
          <div className={`transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="bg-gray-100 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-gray-500 font-mono">
                  {showModal ? 'localhost:3000/photos/3' : 'localhost:3000/photos'}
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 relative min-h-[300px]">
                {/* Photo Grid */}
                <div className="text-sm font-semibold mb-3">Galerie Photos</div>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((id) => (
                    <button
                      key={id}
                      onClick={() => setShowModal(true)}
                      className={`aspect-square bg-gradient-to-br ${
                        id === 3 && showModal
                          ? 'from-blue-400 to-blue-600 ring-2 ring-blue-500'
                          : 'from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400'
                      } rounded-lg transition-all flex items-center justify-center text-white font-bold`}
                    >
                      {id}
                    </button>
                  ))}
                </div>

                {/* Modal Overlay */}
                {showModal && (
                  <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center animate-fadeIn">
                    <div className="bg-white rounded-xl p-4 w-4/5 shadow-xl">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-semibold">Photo #3</span>
                        <button 
                          onClick={() => setShowModal(false)}
                          className="w-6 h-6 bg-gray-100 rounded-full text-xs hover:bg-gray-200"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="aspect-video bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white">
                        <span className="text-2xl font-bold">Photo Modal</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Route interceptée! L'URL change mais la galerie reste visible.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => setShowModal(!showModal)}
              className="mt-3 w-full py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition-colors"
            >
              {showModal ? 'Fermer le modal' : 'Cliquer sur une photo'}
            </button>
          </div>

          {/* Conventions */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <h3 className="font-semibold mb-4">Conventions de nommage</h3>
            
            <div className="space-y-3 mb-6">
              {conventions.map((conv) => (
                <div
                  key={conv.syntax}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    activeConvention === conv.syntax
                      ? 'border-black bg-gray-50'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                  onClick={() => setActiveConvention(activeConvention === conv.syntax ? null : conv.syntax)}
                >
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-black text-white font-mono text-sm rounded">
                      {conv.syntax}
                    </span>
                    <span className="font-medium">{conv.desc}</span>
                  </div>
                  {activeConvention === conv.syntax && (
                    <div className="mt-3 text-sm text-gray-600 font-mono bg-gray-100 p-2 rounded">
                      {conv.example}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Structure Example */}
            <div className="bg-gray-900 rounded-xl p-4">
              <div className="text-gray-400 text-xs font-mono mb-3">Structure pour modal photo</div>
              <pre className="text-xs font-mono text-gray-100">
{`app/
├── photos/
│   ├── page.tsx       ← Liste des photos
│   ├── [id]/
│   │   └── page.tsx   ← Page photo complète
│   └── (.)photo/      ← ⚡ Intercepte photo/[id]
│       └── [id]/
│           └── page.tsx  ← Modal photo`}
              </pre>
            </div>
          </div>
        </div>

        {/* Explanation */}
        <div className={`mt-6 grid md:grid-cols-2 gap-4 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="p-4 bg-blue-50 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🖱️</span>
              <h4 className="font-semibold">Navigation Client</h4>
            </div>
            <p className="text-sm text-gray-600">
              Clic sur une photo → Modal s'ouvre, URL change, mais la galerie reste en arrière-plan
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🔗</span>
              <h4 className="font-semibold">Accès Direct / Refresh</h4>
            </div>
            <p className="text-sm text-gray-600">
              URL directe ou refresh → Affiche la page photo complète (pas le modal)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
