'use client'

import { useEffect, useState } from 'react'
import { Icons } from './icons'

export function SlideLayoutTemplate() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="slide">
      <div className="slide-content">
        {/* Header */}
        <div className="slide-header">
          <div className={`slide-badge ${isVisible ? 'animate-fadeInDown' : 'opacity-0'}`}>
            03 — Layouts & Templates
          </div>
          <h2 className={`text-display mb-4 ${isVisible ? 'animate-fadeInUp stagger-1' : 'opacity-0'}`}>
            Persistance vs Réinitialisation
          </h2>
          <p className={`text-subtitle max-w-3xl ${isVisible ? 'animate-fadeInUp stagger-2' : 'opacity-0'}`}>
            Comprendre la différence fondamentale entre layout.tsx et template.tsx 
            est essentiel pour optimiser l'expérience utilisateur et les performances.
          </p>
        </div>

        {/* Comparison */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Layout */}
          <div className={`card ${isVisible ? 'animate-fadeInLeft stagger-3' : 'opacity-0'}`}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center">
                <Icons.layout className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">layout.tsx</h3>
                <span className="text-small">État persistant</span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="feature-item !p-4 !gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <Icons.check className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Préserve l'état</h4>
                  <p className="text-xs text-gray-500">Le state React, scroll position, et input values persistent</p>
                </div>
              </div>

              <div className="feature-item !p-4 !gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <Icons.check className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Pas de re-render</h4>
                  <p className="text-xs text-gray-500">Le layout ne se re-render pas lors de la navigation</p>
                </div>
              </div>

              <div className="feature-item !p-4 !gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <Icons.check className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Imbrication</h4>
                  <p className="text-xs text-gray-500">Layouts imbriqués pour créer des UI complexes</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm font-medium mb-2">Cas d'usage idéaux :</p>
              <div className="flex flex-wrap gap-2">
                <span className="tag">Navigation</span>
                <span className="tag">Sidebar</span>
                <span className="tag">Header/Footer</span>
                <span className="tag">Context Providers</span>
              </div>
            </div>
          </div>

          {/* Template */}
          <div className={`card ${isVisible ? 'animate-fadeInRight stagger-4' : 'opacity-0'}`}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center">
                <Icons.copy className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">template.tsx</h3>
                <span className="text-small">Nouvelle instance</span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="feature-item !p-4 !gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Icons.refresh className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Réinitialise l'état</h4>
                  <p className="text-xs text-gray-500">Nouvelle instance créée à chaque navigation</p>
                </div>
              </div>

              <div className="feature-item !p-4 !gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Icons.refresh className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Re-exécute useEffect</h4>
                  <p className="text-xs text-gray-500">Les effets sont relancés à chaque visite de page</p>
                </div>
              </div>

              <div className="feature-item !p-4 !gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Icons.refresh className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Nouveau DOM</h4>
                  <p className="text-xs text-gray-500">Les éléments DOM sont recréés (animations d'entrée)</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm font-medium mb-2">Cas d'usage idéaux :</p>
              <div className="flex flex-wrap gap-2">
                <span className="tag">Animations d'entrée</span>
                <span className="tag">Page analytics</span>
                <span className="tag">Reset de formulaire</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hierarchy */}
        <div className={`mt-8 p-6 card-flat ${isVisible ? 'animate-fadeInUp stagger-5' : 'opacity-0'}`}>
          <h4 className="text-sm font-semibold mb-4">Ordre de rendu (du parent vers l'enfant)</h4>
          <div className="flex items-center justify-center gap-2 flex-wrap font-mono text-sm">
            <span className="px-4 py-2 bg-black text-white rounded-lg">layout.tsx</span>
            <span className="text-gray-400">→</span>
            <span className="px-4 py-2 bg-gray-200 rounded-lg">template.tsx</span>
            <span className="text-gray-400">→</span>
            <span className="px-4 py-2 bg-red-100 text-red-800 rounded-lg">error.tsx</span>
            <span className="text-gray-400">→</span>
            <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg">loading.tsx</span>
            <span className="text-gray-400">→</span>
            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-lg">page.tsx</span>
          </div>
        </div>
      </div>
    </div>
  )
}
