'use client'

import { useEffect, useState } from 'react'
import { Icons } from './icons'

export function SlideConclusion() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const concepts = [
    { icon: Icons.folder, title: 'App Router', key: 'app/', color: 'bg-blue-50 border-blue-200' },
    { icon: Icons.file, title: 'Fichiers Spéciaux', key: 'page, layout...', color: 'bg-green-50 border-green-200' },
    { icon: Icons.grid, title: 'Route Groups', key: '(folder)', color: 'bg-purple-50 border-purple-200' },
    { icon: Icons.split, title: 'Parallel Routes', key: '@slot', color: 'bg-orange-50 border-orange-200' },
    { icon: Icons.cornerDownRight, title: 'Intercepting', key: '(.)path', color: 'bg-pink-50 border-pink-200' },
    { icon: Icons.loader, title: 'Loading', key: 'Suspense', color: 'bg-cyan-50 border-cyan-200' },
    { icon: Icons.alertTriangle, title: 'Error', key: 'Boundary', color: 'bg-red-50 border-red-200' },
    { icon: Icons.server, title: 'RSC', key: 'Server-first', color: 'bg-indigo-50 border-indigo-200' },
    { icon: Icons.zap, title: 'Actions', key: '"use server"', color: 'bg-yellow-50 border-yellow-200' },
    { icon: Icons.shield, title: 'Middleware', key: 'Edge', color: 'bg-gray-100 border-gray-300' },
  ]

  return (
    <div className="slide">
      <div className="slide-content flex flex-col h-full py-6">
        {/* Compact Header */}
        <div className="mb-4 text-center">
          <div className={`slide-badge mb-1 ${isVisible ? 'animate-fadeInDown' : 'opacity-0'}`}>
            12 — Conclusion
          </div>
          <h2 className={`text-2xl font-bold tracking-tight ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
            Récapitulatif & Ressources
          </h2>
        </div>

        {/* Concepts Grid - 5x2 */}
        <div className={`grid grid-cols-5 gap-2 mb-4 ${isVisible ? 'animate-fadeInUp stagger-1' : 'opacity-0'}`}>
          {concepts.map((concept) => {
            const IconComponent = concept.icon
            return (
              <div 
                key={concept.title}
                className={`group p-3 rounded-lg border transition-all text-center hover:scale-105 ${concept.color}`}
                data-hover
              >
                <IconComponent className="w-5 h-5 mx-auto mb-1.5 text-black/70" />
                <h4 className="font-medium text-xs">{concept.title}</h4>
                <p className="text-[10px] text-black/50 font-mono">{concept.key}</p>
              </div>
            )
          })}
        </div>

        {/* Main 3-Column Layout */}
        <div className="flex gap-4 flex-1">
          {/* Left: Key Takeaways */}
          <div className={`w-1/3 ${isVisible ? 'animate-fadeInLeft stagger-2' : 'opacity-0'}`}>
            <div className="p-4 bg-black text-white rounded-xl h-full">
              <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                <Icons.zap className="w-4 h-4 text-yellow-400" /> Points clés à retenir
              </h3>
              <div className="space-y-2.5">
                <div className="flex items-start gap-2">
                  <span className="px-1.5 py-0.5 bg-white/20 rounded text-[10px] font-mono shrink-0">01</span>
                  <p className="text-xs text-white/80">Le système de fichiers <strong>définit</strong> les routes</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="px-1.5 py-0.5 bg-white/20 rounded text-[10px] font-mono shrink-0">02</span>
                  <p className="text-xs text-white/80"><strong>Server Components</strong> par défaut = moins de JS client</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="px-1.5 py-0.5 bg-white/20 rounded text-[10px] font-mono shrink-0">03</span>
                  <p className="text-xs text-white/80">Layouts <strong>persistent</strong>, templates <strong>recréent</strong></p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="px-1.5 py-0.5 bg-white/20 rounded text-[10px] font-mono shrink-0">04</span>
                  <p className="text-xs text-white/80">Loading/Error = <strong>UX automatique</strong> avec boundaries</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="px-1.5 py-0.5 bg-white/20 rounded text-[10px] font-mono shrink-0">05</span>
                  <p className="text-xs text-white/80">Server Actions = <strong>mutations sécurisées</strong> sans API</p>
                </div>
              </div>
            </div>
          </div>

          {/* Center: Best Practices */}
          <div className={`flex-1 flex flex-col gap-3 ${isVisible ? 'animate-fadeIn stagger-3' : 'opacity-0'}`}>
            <h3 className="font-bold text-sm flex items-center gap-2">
              <Icons.check className="w-4 h-4 text-green-600" /> Bonnes pratiques
            </h3>
            <div className="grid grid-cols-2 gap-2 flex-1">
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-xs font-medium text-green-800 mb-1">'use client' minimisé</p>
                <p className="text-[10px] text-green-600">Uniquement pour interactivité, hooks, browser APIs</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs font-medium text-blue-800 mb-1">Colocation des fichiers</p>
                <p className="text-[10px] text-blue-600">Composants, tests et styles près de leurs routes</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-xs font-medium text-purple-800 mb-1">Route Groups (folder)</p>
                <p className="text-[10px] text-purple-600">Organiser sans impacter l'URL publique</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-xs font-medium text-yellow-800 mb-1">Loading granulaire</p>
                <p className="text-[10px] text-yellow-600">Un loading.tsx par segment critique</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                <p className="text-xs font-medium text-red-800 mb-1">Error boundaries</p>
                <p className="text-[10px] text-red-600">Isoler les erreurs pour ne pas bloquer l'app</p>
              </div>
              <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                <p className="text-xs font-medium text-indigo-800 mb-1">Composition RSC</p>
                <p className="text-[10px] text-indigo-600">Passer Server Components comme children</p>
              </div>
            </div>
          </div>

          {/* Right: Resources */}
          <div className={`w-1/4 flex flex-col gap-3 ${isVisible ? 'animate-fadeInRight stagger-4' : 'opacity-0'}`}>
            <h3 className="font-bold text-sm flex items-center gap-2">
              <Icons.book className="w-4 h-4" /> Ressources
            </h3>
            <div className="space-y-2 flex-1">
              <a 
                href="https://nextjs.org/docs" 
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 border-2 border-gray-200 rounded-lg hover:border-black transition-colors group"
                data-hover
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-xs">Documentation</h4>
                    <p className="text-[10px] text-gray-500">nextjs.org/docs</p>
                  </div>
                  <Icons.arrowRight className="w-3 h-3 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>

              <a 
                href="https://nextjs.org/learn" 
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 border-2 border-gray-200 rounded-lg hover:border-black transition-colors group"
                data-hover
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-xs">Learn Next.js</h4>
                    <p className="text-[10px] text-gray-500">Cours interactif</p>
                  </div>
                  <Icons.arrowRight className="w-3 h-3 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>

              <a 
                href="https://github.com/vercel/next.js/tree/canary/examples" 
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 border-2 border-gray-200 rounded-lg hover:border-black transition-colors group"
                data-hover
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-xs">GitHub Examples</h4>
                    <p className="text-[10px] text-gray-500">Projets officiels</p>
                  </div>
                  <Icons.arrowRight className="w-3 h-3 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>

              <a 
                href="https://react.dev/reference/rsc/server-components" 
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 border-2 border-gray-200 rounded-lg hover:border-black transition-colors group"
                data-hover
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-xs">React RSC Docs</h4>
                    <p className="text-[10px] text-gray-500">react.dev</p>
                  </div>
                  <Icons.arrowRight className="w-3 h-3 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Footer: Thank You */}
        <div className={`mt-4 flex items-center justify-between ${isVisible ? 'animate-fadeInUp stagger-5' : 'opacity-0'}`}>
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-black to-gray-800 text-white rounded-xl">
            <span className="text-xl">🎉</span>
            <div>
              <span className="font-bold text-sm">Merci pour votre attention !</span>
              <p className="text-xs text-white/60">Des questions ?</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-black/40">Next.js App Router</p>
            <p className="text-lg font-bold tracking-tight">Framework du futur</p>
          </div>
        </div>
      </div>
    </div>
  )
}
