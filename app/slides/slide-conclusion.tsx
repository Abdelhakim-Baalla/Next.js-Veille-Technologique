'use client'

import { useEffect, useState } from 'react'

export function SlideConclusion() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const concepts = [
    { icon: '📁', title: 'File-based Routing', desc: 'Structure intuitive' },
    { icon: '🎨', title: 'Layouts & Templates', desc: 'UI partagée' },
    { icon: '📄', title: 'page.tsx', desc: 'Composant de route' },
    { icon: '📦', title: 'Route Groups', desc: 'Organisation sans URL' },
    { icon: '⚡', title: 'Parallel Routes', desc: 'Rendu simultané' },
    { icon: '🔀', title: 'Intercepting Routes', desc: 'Modals & overlays' },
    { icon: '⏳', title: 'Loading States', desc: 'Streaming SSR' },
    { icon: '🛡️', title: 'Error Handling', desc: 'Boundaries automatiques' },
    { icon: '🖥️', title: 'Server Components', desc: 'Par défaut, 0 JS' },
    { icon: '💻', title: 'Client Components', desc: 'Interactivité' },
    { icon: '🔧', title: 'Server Actions', desc: 'Mutations sans API' },
    { icon: '🚦', title: 'Middleware', desc: 'Intercept & transform' },
  ]

  return (
    <div className="h-full flex items-center justify-center px-8 py-20">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white rounded-full text-xs font-mono mb-4">
            13 / Conclusion
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Récapitulatif
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Vous maîtrisez maintenant les fondamentaux du routing Next.js App Router
          </p>
        </div>

        {/* Concepts Grid */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {concepts.map((concept, index) => (
            <div
              key={concept.title}
              className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all hover:scale-105 cursor-default"
              style={{
                animationDelay: `${index * 50}ms`,
                animation: isVisible ? 'fadeIn 0.5s ease forwards' : 'none',
                opacity: 0
              }}
            >
              <div className="text-2xl mb-2">{concept.icon}</div>
              <h4 className="font-semibold text-sm mb-1">{concept.title}</h4>
              <p className="text-xs text-gray-500">{concept.desc}</p>
            </div>
          ))}
        </div>

        {/* Key Takeaways */}
        <div className={`grid md:grid-cols-3 gap-4 mb-10 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl text-white">
            <h3 className="text-lg font-bold mb-2">🎯 Simplicité</h3>
            <p className="text-sm text-blue-100">
              Le système de fichiers définit vos routes. Pas de configuration complexe.
            </p>
          </div>
          <div className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl text-white">
            <h3 className="text-lg font-bold mb-2">⚡ Performance</h3>
            <p className="text-sm text-purple-100">
              Server Components par défaut. Streaming SSR. Minimal JavaScript.
            </p>
          </div>
          <div className="p-6 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl text-white">
            <h3 className="text-lg font-bold mb-2">🛠️ DX</h3>
            <p className="text-sm text-green-100">
              TypeScript natif. Hot reload. Error overlays. Conventions claires.
            </p>
          </div>
        </div>

        {/* Resources */}
        <div className={`p-6 bg-gray-900 rounded-2xl text-white transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="font-bold mb-4 text-lg">📚 Pour aller plus loin</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">📖</span>
              <div>
                <div className="font-medium">Documentation officielle</div>
                <div className="text-gray-400">nextjs.org/docs</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">🎓</span>
              <div>
                <div className="font-medium">Learn Next.js</div>
                <div className="text-gray-400">nextjs.org/learn</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">💻</span>
              <div>
                <div className="font-medium">Examples</div>
                <div className="text-gray-400">github.com/vercel/next.js/examples</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">🎥</span>
              <div>
                <div className="font-medium">Vercel YouTube</div>
                <div className="text-gray-400">youtube.com/@vercel</div>
              </div>
            </div>
          </div>
        </div>

        {/* Thank You */}
        <div className={`text-center mt-10 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-4xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold mb-2">Merci pour votre attention!</h3>
          <p className="text-gray-500">Des questions?</p>
        </div>
      </div>
    </div>
  )
}
