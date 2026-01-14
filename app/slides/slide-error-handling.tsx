'use client'

import { useEffect, useState } from 'react'
import { Icons } from './icons'

export function SlideErrorHandling() {
  const [isVisible, setIsVisible] = useState(false)
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="slide">
      <div className="slide-content">
        {/* Header */}
        <div className="slide-header">
          <div className={`slide-badge ${isVisible ? 'animate-fadeInDown' : 'opacity-0'}`}>
            08 — Error Handling
          </div>
          <h2 className={`text-display mb-4 ${isVisible ? 'animate-fadeInUp stagger-1' : 'opacity-0'}`}>
            Gestion des Erreurs
          </h2>
          <p className={`text-subtitle max-w-3xl ${isVisible ? 'animate-fadeInUp stagger-2' : 'opacity-0'}`}>
            Capturez et gérez les erreurs gracieusement avec <span className="code-inline">error.tsx</span>.
            Isolation par segment — une erreur n'affecte pas toute l'application.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Error Boundary */}
          <div className={`${isVisible ? 'animate-fadeInLeft stagger-3' : 'opacity-0'}`}>
            <h3 className="text-title mb-4">error.tsx — Error Boundary Automatique</h3>
            
            <div className="code-window mb-4">
              <div className="code-header">
                <div className="code-dot red" />
                <div className="code-dot yellow" />
                <div className="code-dot green" />
                <span className="code-title">app/dashboard/error.tsx</span>
              </div>
              <div className="code-body">
                <pre>{`'use client' // ⚠️ Obligatoire !

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void // Re-render le segment
}) {
  useEffect(() => {
    // Log vers service de monitoring
    console.error(error)
  }, [error])

  return (
    <div className="text-center py-12">
      <h2>Une erreur est survenue !</h2>
      <p className="text-gray-600">
        {error.message}
      </p>
      <button
        onClick={() => reset()}
        className="mt-4 px-6 py-2 bg-black 
                   text-white rounded-xl"
      >
        Réessayer
      </button>
    </div>
  )
}`}</pre>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <h4 className="font-medium text-sm mb-3">Hiérarchie des Error Boundaries</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 p-2 bg-white rounded-lg">
                  <span className="font-mono text-xs">app/error.tsx</span>
                  <span className="text-gray-400">→</span>
                  <span className="text-gray-600">Erreurs de l'app (sauf layout racine)</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-white rounded-lg">
                  <span className="font-mono text-xs">app/global-error.tsx</span>
                  <span className="text-gray-400">→</span>
                  <span className="text-gray-600">Erreurs du layout racine</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-white rounded-lg">
                  <span className="font-mono text-xs">segment/error.tsx</span>
                  <span className="text-gray-400">→</span>
                  <span className="text-gray-600">Erreurs isolées au segment</span>
                </div>
              </div>
            </div>
          </div>

          {/* Demo & global-error */}
          <div className={`${isVisible ? 'animate-fadeInRight stagger-4' : 'opacity-0'}`}>
            <h3 className="text-title mb-4">Démo Interactive</h3>
            
            <div className="browser mb-4">
              <div className="browser-header">
                <div className="browser-dots">
                  <div className="code-dot red" />
                  <div className="code-dot yellow" />
                  <div className="code-dot green" />
                </div>
                <div className="browser-url">localhost:3000/dashboard</div>
              </div>
              <div className="browser-body !p-4 min-h-[200px]">
                {!showError ? (
                  <div className="space-y-3">
                    <div className="h-6 bg-gray-100 rounded w-1/2" />
                    <div className="grid grid-cols-2 gap-3">
                      <div className="h-20 bg-gray-100 rounded-xl p-4">
                        <div className="h-3 bg-gray-200 rounded w-2/3" />
                      </div>
                      <button 
                        onClick={() => setShowError(true)}
                        className="h-20 bg-red-50 border-2 border-red-200 rounded-xl flex items-center justify-center text-red-500 text-sm hover:bg-red-100 transition-colors"
                        data-hover="true"
                      >
                        💥 Cliquez pour déclencher une erreur
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 animate-fadeIn">
                    <div className="text-4xl mb-3">⚠️</div>
                    <h4 className="font-medium mb-2">Quelque chose s'est mal passé !</h4>
                    <p className="text-sm text-gray-500 mb-4">Error: Failed to fetch data</p>
                    <button
                      onClick={() => setShowError(false)}
                      className="px-4 py-2 bg-black text-white text-sm rounded-xl hover:bg-gray-800 transition-colors"
                      data-hover="true"
                    >
                      Réessayer
                    </button>
                  </div>
                )}
              </div>
            </div>

            <h3 className="text-title mb-4">global-error.tsx</h3>
            
            <div className="code-window mb-4">
              <div className="code-header">
                <div className="code-dot red" />
                <div className="code-dot yellow" />
                <div className="code-dot green" />
                <span className="code-title">app/global-error.tsx</span>
              </div>
              <div className="code-body">
                <pre>{`'use client'

// Remplace le layout racine en cas d'erreur
// Doit inclure <html> et <body>

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <h2>Erreur critique !</h2>
        <button onClick={() => reset()}>
          Réessayer
        </button>
      </body>
    </html>
  )
}`}</pre>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-gray-50 rounded-xl">
                <div className="text-lg mb-1">🔒</div>
                <h4 className="font-medium text-sm">Isolation</h4>
                <p className="text-xs text-gray-500">Erreur isolée au segment</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <div className="text-lg mb-1">🔄</div>
                <h4 className="font-medium text-sm">reset()</h4>
                <p className="text-xs text-gray-500">Re-render sans refresh</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
