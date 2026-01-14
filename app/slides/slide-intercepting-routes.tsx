'use client'

import { useEffect, useState } from 'react'
import { Icons } from './icons'

export function SlideInterceptingRoutes() {
  const [isVisible, setIsVisible] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="slide">
      <div className="slide-content">
        {/* Header */}
        <div className="slide-header">
          <div className={`slide-badge ${isVisible ? 'animate-fadeInDown' : 'opacity-0'}`}>
            06 — Intercepting Routes
          </div>
          <h2 className={`text-display mb-4 ${isVisible ? 'animate-fadeInUp stagger-1' : 'opacity-0'}`}>
            Interception de Routes
          </h2>
          <p className={`text-subtitle max-w-3xl ${isVisible ? 'animate-fadeInUp stagger-2' : 'opacity-0'}`}>
            Affichez une route dans un modal tout en gardant le contexte actuel.
            L'URL change, mais le contenu s'affiche en overlay — comme Instagram !
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Conventions */}
          <div className={`${isVisible ? 'animate-fadeInLeft stagger-3' : 'opacity-0'}`}>
            <h3 className="text-title mb-4">Conventions de Nommage</h3>
            
            <div className="space-y-3 mb-6">
              <div className="p-4 border-2 border-gray-200 rounded-xl hover:border-black transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <span className="code-inline text-lg">(.) </span>
                  <span className="font-medium">Même niveau</span>
                </div>
                <p className="text-sm text-gray-600">Intercepte une route au même niveau de dossier</p>
                <code className="text-xs text-gray-500 block mt-2">photos/(.)photo/[id]/page.tsx</code>
              </div>

              <div className="p-4 border-2 border-gray-200 rounded-xl hover:border-black transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <span className="code-inline text-lg">(..)</span>
                  <span className="font-medium">Un niveau au-dessus</span>
                </div>
                <p className="text-sm text-gray-600">Intercepte une route du dossier parent</p>
                <code className="text-xs text-gray-500 block mt-2">feed/(..)photo/[id]/page.tsx</code>
              </div>

              <div className="p-4 border-2 border-gray-200 rounded-xl hover:border-black transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <span className="code-inline text-lg">(..)(..)</span>
                  <span className="font-medium">Deux niveaux au-dessus</span>
                </div>
                <p className="text-sm text-gray-600">Intercepte depuis le grand-parent</p>
              </div>

              <div className="p-4 border-2 border-gray-200 rounded-xl hover:border-black transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <span className="code-inline text-lg">(...)</span>
                  <span className="font-medium">Depuis la racine app</span>
                </div>
                <p className="text-sm text-gray-600">Intercepte depuis la racine de l'application</p>
              </div>
            </div>

            <div className="code-window">
              <div className="code-header">
                <div className="code-dot red" />
                <div className="code-dot yellow" />
                <div className="code-dot green" />
                <span className="code-title">Structure type Modal Photo</span>
              </div>
              <div className="code-body">
                <pre>{`app/
├── @modal/
│   ├── default.tsx    ← null (pas de modal)
│   └── (.)photos/
│       └── [id]/
│           └── page.tsx ← Modal photo
├── photos/
│   ├── page.tsx       ← Grille photos
│   └── [id]/
│       └── page.tsx   ← Page photo pleine
└── layout.tsx         ← Contient {modal}`}</pre>
              </div>
            </div>
          </div>

          {/* Demo Visuelle */}
          <div className={`${isVisible ? 'animate-fadeInRight stagger-4' : 'opacity-0'}`}>
            <h3 className="text-title mb-4">Démonstration Interactive</h3>
            
            {/* Photo Grid */}
            <div className="browser relative">
              <div className="browser-header">
                <div className="browser-dots">
                  <div className="code-dot red" />
                  <div className="code-dot yellow" />
                  <div className="code-dot green" />
                </div>
                <div className="browser-url">
                  {showModal ? 'localhost:3000/photos/1' : 'localhost:3000/photos'}
                </div>
              </div>
              <div className="browser-body !p-4 relative min-h-[300px]">
                {/* Grid */}
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((id) => (
                    <div
                      key={id}
                      className="aspect-square bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300 transition-colors flex items-center justify-center text-gray-400 text-sm"
                      onClick={() => setShowModal(true)}
                      data-hover="true"
                    >
                      <Icons.image className="w-5 h-5" />
                    </div>
                  ))}
                </div>

                {/* Modal Overlay */}
                {showModal && (
                  <div 
                    className="absolute inset-0 bg-black/50 flex items-center justify-center animate-fadeIn"
                    onClick={() => setShowModal(false)}
                  >
                    <div 
                      className="bg-white rounded-2xl p-6 w-4/5 animate-scaleIn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-medium">Photo #1</span>
                        <button 
                          onClick={() => setShowModal(false)}
                          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                          data-hover="true"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                        🖼️ Grande image
                      </div>
                      <p className="text-xs text-gray-500 mt-4 text-center">
                        ⬆️ URL changée mais contexte préservé
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <p className="text-sm text-gray-600 mt-3 text-center">
              Cliquez sur une photo pour voir l'interception
            </p>

            {/* Comportement */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                  <span>🖱️</span> Soft Navigation
                </h4>
                <p className="text-xs text-gray-600">
                  Clic depuis la grille → Route interceptée → Modal affiché
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                  <span>🔗</span> Hard Navigation
                </h4>
                <p className="text-xs text-gray-600">
                  Accès direct URL → Page complète → Pas d'interception
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
