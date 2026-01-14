'use client'

import { useEffect, useState } from 'react'
import { Icons } from './icons'

export function SlideConclusion() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const concepts = [
    { icon: Icons.folder, title: 'App Router', desc: 'Routing fichiers' },
    { icon: Icons.file, title: 'Fichiers Spéciaux', desc: 'layout, page, template' },
    { icon: Icons.grid, title: 'Route Groups', desc: 'Organisation (folder)' },
    { icon: Icons.split, title: 'Parallel Routes', desc: 'Slots @folder' },
    { icon: Icons.cornerDownRight, title: 'Intercepting', desc: 'Modals (.)' },
    { icon: Icons.loader, title: 'Loading States', desc: 'Streaming SSR' },
    { icon: Icons.alertTriangle, title: 'Error Handling', desc: 'Error boundaries' },
    { icon: Icons.server, title: 'Server/Client', desc: 'Rendu hybride' },
    { icon: Icons.zap, title: 'Server Actions', desc: 'Mutations directes' },
    { icon: Icons.shield, title: 'Middleware', desc: 'Edge Runtime' },
  ]

  return (
    <div className="slide">
      <div className="slide-content">
        {/* Header */}
        <div className="slide-header">
          <div className={`slide-badge ${isVisible ? 'animate-fadeInDown' : 'opacity-0'}`}>
            12 — Conclusion
          </div>
          <h2 className={`text-display mb-4 ${isVisible ? 'animate-fadeInUp stagger-1' : 'opacity-0'}`}>
            Récapitulatif
          </h2>
          <p className={`text-subtitle max-w-3xl ${isVisible ? 'animate-fadeInUp stagger-2' : 'opacity-0'}`}>
            Next.js App Router transforme la façon dont nous construisons des applications web.
            Voici ce que nous avons appris.
          </p>
        </div>

        {/* Concepts Grid */}
        <div className={`grid grid-cols-2 md:grid-cols-5 gap-3 mb-8 ${isVisible ? 'animate-fadeInUp stagger-3' : 'opacity-0'}`}>
          {concepts.map((concept) => {
            const IconComponent = concept.icon
            return (
              <div 
                key={concept.title}
                className="group p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-300 hover:bg-white transition-all text-center"
                data-hover
              >
                <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-white border border-gray-200 flex items-center justify-center group-hover:bg-black group-hover:border-black group-hover:text-white transition-all">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h4 className="font-medium text-sm mb-1">{concept.title}</h4>
                <p className="text-xs text-gray-500">{concept.desc}</p>
              </div>
            )
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Ressources */}
          <div className={`${isVisible ? 'animate-fadeInLeft stagger-4' : 'opacity-0'}`}>
            <h3 className="text-title mb-4 flex items-center gap-2">
              <Icons.book className="w-6 h-6" />
              Ressources
            </h3>
            
            <div className="space-y-3">
              <a 
                href="https://nextjs.org/docs" 
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 border-2 border-gray-200 rounded-xl hover:border-black transition-colors group"
                data-hover="true"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Documentation Next.js</h4>
                    <p className="text-sm text-gray-500">nextjs.org/docs</p>
                  </div>
                  <span className="text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </a>

              <a 
                href="https://nextjs.org/learn" 
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 border-2 border-gray-200 rounded-xl hover:border-black transition-colors group"
                data-hover="true"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Learn Next.js</h4>
                    <p className="text-sm text-gray-500">Cours interactif officiel</p>
                  </div>
                  <span className="text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </a>

              <a 
                href="https://github.com/vercel/next.js/tree/canary/examples" 
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 border-2 border-gray-200 rounded-xl hover:border-black transition-colors group"
                data-hover="true"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Examples GitHub</h4>
                    <p className="text-sm text-gray-500">Exemples officiels</p>
                  </div>
                  <span className="text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </a>
            </div>
          </div>

          {/* Bonnes Pratiques */}
          <div className={`${isVisible ? 'animate-fadeInRight stagger-5' : 'opacity-0'}`}>
            <h3 className="text-title mb-4">✅ Bonnes Pratiques</h3>
            
            <div className="space-y-3">
              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <h4 className="font-medium text-sm text-green-800 mb-2">Server Components par défaut</h4>
                <p className="text-xs text-green-700">
                  Utilisez 'use client' uniquement quand nécessaire (interactivité, hooks, browser APIs).
                </p>
              </div>

              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <h4 className="font-medium text-sm text-blue-800 mb-2">Colocation des fichiers</h4>
                <p className="text-xs text-blue-700">
                  Placez les composants, styles, et tests près des routes qui les utilisent.
                </p>
              </div>

              <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                <h4 className="font-medium text-sm text-purple-800 mb-2">Route Groups pour l'organisation</h4>
                <p className="text-xs text-purple-700">
                  Utilisez (folder) pour grouper sans affecter l'URL.
                </p>
              </div>

              <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <h4 className="font-medium text-sm text-yellow-800 mb-2">Loading et Error granulaires</h4>
                <p className="text-xs text-yellow-700">
                  Ajoutez loading.tsx et error.tsx à chaque segment important.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`text-center mt-8 ${isVisible ? 'animate-fadeInUp stagger-6' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full">
            <span className="text-lg">🎉</span>
            <span className="font-medium">Merci pour votre attention !</span>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Des questions ?
          </p>
        </div>
      </div>
    </div>
  )
}
