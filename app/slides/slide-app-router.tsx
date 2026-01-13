'use client'

import { useEffect, useState } from 'react'

export function SlideAppRouter() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="h-full flex items-center justify-center px-8 py-20">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className={`mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white rounded-full text-xs font-mono mb-4">
            01 / Concept Fondamental
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            App Router
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl">
            Le nouveau système de routing de Next.js 13+ basé sur le dossier <code className="px-2 py-1 bg-gray-100 rounded font-mono">/app</code>
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Explanation */}
          <div className={`space-y-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="p-6 border border-gray-200 rounded-2xl">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center text-sm">1</span>
                Qu'est-ce que l'App Router ?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                L'App Router est le <strong>nouveau paradigme de routing</strong> introduit dans Next.js 13. 
                Il remplace le traditionnel <code className="px-1.5 py-0.5 bg-gray-100 rounded text-sm">/pages</code> directory 
                par le dossier <code className="px-1.5 py-0.5 bg-gray-100 rounded text-sm">/app</code>.
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-2xl">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center text-sm">2</span>
                Avantages Clés
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-black rounded-full mt-2" />
                  <span><strong>React Server Components</strong> par défaut</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-black rounded-full mt-2" />
                  <span><strong>Layouts imbriqués</strong> qui persistent entre les navigations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-black rounded-full mt-2" />
                  <span><strong>Streaming</strong> et chargement progressif</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-black rounded-full mt-2" />
                  <span><strong>Colocation</strong> des fichiers (tests, styles, composants)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Comparison */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="p-6 bg-gray-50 rounded-2xl h-full">
              <h3 className="text-lg font-semibold mb-4">Pages Router vs App Router</h3>
              
              <div className="space-y-4">
                {/* Old Way */}
                <div className="p-4 bg-white rounded-xl border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded text-xs font-medium">Ancien</span>
                    <span className="font-mono text-sm">/pages</span>
                  </div>
                  <pre className="text-sm font-mono text-gray-600 overflow-x-auto">
{`pages/
├── _app.tsx      // Layout global
├── _document.tsx // HTML document
├── index.tsx     // Route /
├── about.tsx     // Route /about
└── blog/
    ├── index.tsx // Route /blog
    └── [id].tsx  // Route /blog/:id`}
                  </pre>
                </div>

                {/* New Way */}
                <div className="p-4 bg-white rounded-xl border-2 border-black">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 bg-green-100 text-green-600 rounded text-xs font-medium">Nouveau</span>
                    <span className="font-mono text-sm">/app</span>
                  </div>
                  <pre className="text-sm font-mono text-gray-600 overflow-x-auto">
{`app/
├── layout.tsx    // Root layout
├── page.tsx      // Route /
├── about/
│   └── page.tsx  // Route /about
└── blog/
    ├── layout.tsx // Blog layout
    ├── page.tsx   // Route /blog
    └── [id]/
        └── page.tsx // Route /blog/:id`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
