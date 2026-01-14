'use client'

import { useEffect, useState } from 'react'
import { Icons } from './icons'

export function SlideLayoutTemplate() {
  const [isVisible, setIsVisible] = useState(false)
  const [showLayout, setShowLayout] = useState(true)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="slide">
      <div className="slide-content flex flex-col h-full py-6">
        {/* Compact Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className={`slide-badge mb-1 ${isVisible ? 'animate-fadeInDown' : 'opacity-0'}`}>
              03 — Layouts & Templates
            </div>
            <h2 className={`text-2xl font-bold tracking-tight ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
              Persistance vs Réinitialisation
            </h2>
          </div>
          {/* Toggle Switch */}
          <div className={`flex items-center gap-2 ${isVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
            <button
              onClick={() => setShowLayout(true)}
              data-hover
              className={`px-3 py-1.5 rounded-l-lg text-xs font-medium transition-all
                ${showLayout ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'}`}
            >
              Layout
            </button>
            <button
              onClick={() => setShowLayout(false)}
              data-hover
              className={`px-3 py-1.5 rounded-r-lg text-xs font-medium transition-all
                ${!showLayout ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'}`}
            >
              Template
            </button>
          </div>
        </div>

        {/* Main 3-Column Layout */}
        <div className="flex gap-4 flex-1">
          {/* Left: Visual Diagram */}
          <div className={`w-1/3 flex flex-col gap-3 ${isVisible ? 'animate-fadeInLeft stagger-1' : 'opacity-0'}`}>
            {/* Behavior Diagram */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex-1">
              <p className="text-xs font-medium text-black/40 mb-3">Comportement lors de navigation</p>
              
              <div className="space-y-3">
                {/* Page A to B visualization */}
                <div className="flex items-center gap-2 text-xs">
                  <div className="px-2 py-1 bg-blue-100 rounded text-blue-700">Page A</div>
                  <Icons.arrowRight className="w-3 h-3 text-gray-400" />
                  <div className="px-2 py-1 bg-green-100 rounded text-green-700">Page B</div>
                </div>
                
                {showLayout ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-black flex items-center justify-center">
                        <Icons.check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs">État React conservé</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-black flex items-center justify-center">
                        <Icons.check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs">Position scroll gardée</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-black flex items-center justify-center">
                        <Icons.check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs">Pas de re-render</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-black flex items-center justify-center">
                        <Icons.check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs">useEffect pas relancé</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-red-500 flex items-center justify-center">
                        <Icons.refresh className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs">État React réinitialisé</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-red-500 flex items-center justify-center">
                        <Icons.refresh className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs">DOM recréé entièrement</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-red-500 flex items-center justify-center">
                        <Icons.refresh className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs">Re-render complet</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-red-500 flex items-center justify-center">
                        <Icons.refresh className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs">useEffect re-exécuté</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Use Cases */}
            <div className="p-3 bg-black text-white rounded-xl">
              <p className="text-xs font-medium mb-2 flex items-center gap-2">
                <Icons.lightbulb className="w-3.5 h-3.5" />
                Cas d'usage
              </p>
              <div className="flex flex-wrap gap-1.5">
                {showLayout 
                  ? ['Navigation', 'Sidebar', 'Header', 'Providers'].map(t => (
                      <span key={t} className="px-2 py-0.5 bg-white/10 rounded text-xs">{t}</span>
                    ))
                  : ['Animations', 'Analytics', 'Reset form', 'Page view'].map(t => (
                      <span key={t} className="px-2 py-0.5 bg-white/10 rounded text-xs">{t}</span>
                    ))
                }
              </div>
            </div>
          </div>

          {/* Center: Code Example */}
          <div className={`flex-1 flex flex-col ${isVisible ? 'animate-fadeIn stagger-2' : 'opacity-0'}`}>
            <div className="code-window flex-1 flex flex-col">
              <div className="code-header py-2">
                <div className="code-dot red" />
                <div className="code-dot yellow" />
                <div className="code-dot green" />
                <span className="code-title text-xs">
                  app/dashboard/{showLayout ? 'layout.tsx' : 'template.tsx'}
                </span>
              </div>
              <div className="code-body flex-1 !p-4">
                <pre className="text-xs leading-relaxed">{showLayout 
? `// Layout : l'état persiste entre navigations
export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  // Ce state survit aux changements de page
  const [sidebarOpen, setSidebarOpen] = useState(true)
  
  return (
    <div className="flex">
      <Sidebar isOpen={sidebarOpen} />
      <main className="flex-1">
        {children}  {/* Page change, layout reste */}
      </main>
    </div>
  )
}`
: `'use client' // Obligatoire pour useEffect
// Template : nouvelle instance à chaque navigation
export default function DashboardTemplate({
  children
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // S'exécute à CHAQUE navigation
    analytics.track('page_view')
    console.log('Template remonté!')
  }, [])
  
  return (
    <div className="animate-fadeIn">
      {children}  {/* Animation d'entrée à chaque page */}
    </div>
  )
}`}</pre>
              </div>
            </div>
          </div>

          {/* Right: Key Differences */}
          <div className={`w-1/4 flex flex-col gap-3 ${isVisible ? 'animate-fadeInRight stagger-3' : 'opacity-0'}`}>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex-1">
              <p className="text-xs font-medium text-black/40 mb-3">Comparaison directe</p>
              
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold mb-1">État React</p>
                  <div className="flex gap-2 text-xs">
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded">Layout: Gardé</span>
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded">Template: Reset</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-xs font-semibold mb-1">Re-render</p>
                  <div className="flex gap-2 text-xs">
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded">Layout: Non</span>
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded">Template: Oui</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-xs font-semibold mb-1">useEffect</p>
                  <div className="flex gap-2 text-xs">
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded">Layout: 1×</span>
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded">Template: n×</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-xs font-semibold mb-1">DOM</p>
                  <div className="flex gap-2 text-xs">
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded">Layout: Gardé</span>
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded">Template: Recréé</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decision Helper */}
            <div className="p-3 border-2 border-dashed border-gray-200 rounded-xl">
              <p className="text-xs font-medium mb-2">Comment choisir ?</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                <strong>Layout</strong> = partage d'UI<br/>
                <strong>Template</strong> = reset par page
              </p>
            </div>
          </div>
        </div>

        {/* Bottom: Render Hierarchy */}
        <div className={`mt-4 p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 
          ${isVisible ? 'animate-fadeInUp stagger-4' : 'opacity-0'}`}>
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-black/40">Hiérarchie d'imbrication</p>
            <div className="flex items-center gap-2 text-xs font-mono">
              {[
                { name: 'layout', color: 'bg-black text-white', active: showLayout },
                { name: 'template', color: 'bg-gray-200', active: !showLayout },
                { name: 'error', color: 'bg-red-100' },
                { name: 'loading', color: 'bg-yellow-100' },
                { name: 'page', color: 'bg-green-100' }
              ].map((item, i, arr) => (
                <span key={i} className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded ${item.active ? 'ring-2 ring-black ring-offset-1' : ''} ${item.color}`}>
                    {item.name}
                  </span>
                  {i < arr.length - 1 && <Icons.arrowRight className="w-3 h-3 text-black/20" />}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
