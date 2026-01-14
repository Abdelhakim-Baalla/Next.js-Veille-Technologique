'use client'

import { useEffect, useState } from 'react'
import { Icons } from './icons'
import { SyntaxHighlighter } from './syntax-highlighter'

export function SlideErrorHandling() {
  const [isVisible, setIsVisible] = useState(false)
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="slide">
      <div className="slide-content flex flex-col h-full py-6">
        {/* Compact Header */}
        <div className="mb-4">
          <div className={`slide-badge mb-1 ${isVisible ? 'animate-fadeInDown' : 'opacity-0'}`}>
            08 — Error Handling
          </div>
          <h2 className={`text-2xl font-bold tracking-tight ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
            Gestion des Erreurs <span className="font-mono text-lg bg-gray-100 px-2 py-0.5 rounded">error.tsx</span>
          </h2>
        </div>

        {/* Main 3-Column Layout */}
        <div className="flex gap-4 flex-1">
          {/* Left: Concept + Hierarchy */}
          <div className={`w-1/4 flex flex-col gap-3 ${isVisible ? 'animate-fadeInLeft stagger-1' : 'opacity-0'}`}>
            {/* Key Concept */}
            <div className="p-4 bg-red-50 rounded-xl border border-red-100">
              <p className="text-xs font-semibold text-red-700 mb-2 flex items-center gap-1.5">
                <Icons.alertTriangle className="w-3.5 h-3.5" /> Concept clé
              </p>
              <p className="text-xs text-red-600/80 leading-relaxed">
                <strong>error.tsx</strong> crée automatiquement un Error Boundary React. Les erreurs sont <strong>isolées par segment</strong> — le reste de l'app continue de fonctionner !
              </p>
            </div>

            {/* Hierarchy */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex-1">
              <p className="text-xs font-medium text-black/40 mb-2">Hiérarchie des boundaries</p>
              <div className="space-y-2">
                {[
                  { file: 'segment/error.tsx', scope: 'Erreurs du segment' },
                  { file: 'app/error.tsx', scope: 'Erreurs globales (sauf layout)' },
                  { file: 'app/global-error.tsx', scope: 'Erreurs du root layout' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <Icons.file className="w-3 h-3 text-red-400" />
                    <span className="font-mono text-black/60">{item.file}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Important Note */}
            <div className="p-3 bg-yellow-50 rounded-xl border border-yellow-200">
              <p className="text-xs text-yellow-800 flex items-start gap-2">
                <Icons.alertTriangle className="w-3.5 h-3.5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>"use client"</strong> est obligatoire car les Error Boundaries utilisent useState et useEffect.
                </span>
              </p>
            </div>
          </div>

          {/* Center: Code + Demo */}
          <div className={`flex-1 flex flex-col gap-3 ${isVisible ? 'animate-fadeIn stagger-2' : 'opacity-0'}`}>
            {/* Code Window */}
            <div className="code-window flex-1 flex flex-col">
              <div className="code-header py-2">
                <div className="code-dot red" />
                <div className="code-dot yellow" />
                <div className="code-dot green" />
                <span className="code-title text-xs">app/dashboard/error.tsx</span>
              </div>
              <div className="code-body !p-4 flex-1">
                <SyntaxHighlighter code={`'use client' // ⚠️ Obligatoire !\n\nimport { useEffect } from 'react'\n\nexport default function Error({\n  error,\n  reset,  // Fonction pour re-render le segment\n}: {\n  error: Error & { digest?: string }\n  reset: () => void\n}) {\n  useEffect(() => {\n    // Log vers service de monitoring (Sentry, etc.)\n    console.error('Error caught:', error)\n  }, [error])\n\n  return (\n    <div className="flex flex-col items-center py-12">\n      <h2 className="text-xl font-bold">Oops!</h2>\n      <p className="text-gray-600 mt-2">{error.message}</p>\n      <button\n        onClick={() => reset()}  {/* Re-render sans refresh */}\n        className="mt-4 px-6 py-2 bg-black text-white rounded-xl"\n      >\n        Réessayer\n      </button>\n    </div>\n  )\n}`} />
              </div>
            </div>

            {/* Interactive Demo */}
            <div className="browser">
              <div className="browser-header">
                <div className="browser-dots">
                  <div className="code-dot red" />
                  <div className="code-dot yellow" />
                  <div className="code-dot green" />
                </div>
                <div className="browser-url text-xs">localhost:3000/dashboard</div>
              </div>
              <div className="browser-body !p-3">
                {!showError ? (
                  <div className="flex gap-2">
                    <div className="flex-1 h-16 bg-gray-100 rounded-lg" />
                    <button 
                      onClick={() => setShowError(true)}
                      data-hover
                      className="flex-1 h-16 bg-red-50 border-2 border-red-200 rounded-lg flex items-center justify-center gap-2 text-red-500 text-xs hover:bg-red-100 transition-all"
                    >
                      <Icons.alertTriangle className="w-4 h-4" /> Déclencher erreur
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-4 animate-fadeIn">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mb-2">
                      <Icons.alertTriangle className="w-5 h-5 text-red-500" />
                    </div>
                    <p className="text-xs font-medium mb-1">Erreur capturée!</p>
                    <p className="text-xs text-gray-400 mb-2">Error: Failed to fetch</p>
                    <button
                      onClick={() => setShowError(false)}
                      data-hover
                      className="px-3 py-1 bg-black text-white text-xs rounded-lg"
                    >
                      reset()
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: global-error + Benefits */}
          <div className={`w-1/3 flex flex-col gap-3 ${isVisible ? 'animate-fadeInRight stagger-3' : 'opacity-0'}`}>
            {/* global-error.tsx */}
            <div className="code-window flex-1 flex flex-col">
              <div className="code-header py-2">
                <div className="code-dot red" />
                <div className="code-dot yellow" />
                <div className="code-dot green" />
                <span className="code-title text-xs">app/global-error.tsx</span>
              </div>
              <div className="code-body !p-3 flex-1">
                <SyntaxHighlighter code={`'use client'\n// Remplace TOUT le layout racine\n// Doit définir <html> et <body>!\n\nexport default function GlobalError({\n  error,\n  reset,\n}) {\n  return (\n    <html>\n      <body>\n        <div className="error-page">\n          <h1>Erreur critique</h1>\n          <button onClick={reset}>\n            Recharger l'app\n          </button>\n        </div>\n      </body>\n    </html>\n  )\n}`} />
              </div>
            </div>

            {/* Benefits */}
            <div className="p-4 bg-black text-white rounded-xl">
              <p className="text-xs font-medium mb-2 flex items-center gap-2">
                <Icons.shield className="w-3.5 h-3.5" /> Pourquoi c'est puissant
              </p>
              <div className="space-y-1.5">
                {[
                  'Isolation: sidebar OK si page échoue',
                  'reset() sans refresh complet',
                  'Log vers Sentry/monitoring',
                  'UX dégradée mais fonctionnelle',
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-white/80">
                    <Icons.check className="w-3 h-3 text-green-400" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Key Insight */}
        <div className={`mt-4 p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-100 
          ${isVisible ? 'animate-fadeInUp stagger-4' : 'opacity-0'}`}>
          <div className="flex items-center gap-3">
            <Icons.lightbulb className="w-5 h-5 text-red-600" />
            <p className="text-xs">
              <strong>Différence clé :</strong> error.tsx ne capture PAS les erreurs du layout parent (car il est rendu à l'intérieur). Pour les erreurs du root layout, utilisez global-error.tsx.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
