'use client'

import { useEffect, useState } from 'react'
import { Icons } from './icons'

export function SlideParallelRoutes() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSlot, setActiveSlot] = useState<string>('team')

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const slots = [
    { id: 'team', name: '@team', desc: 'Liste équipe', color: 'border-blue-500 bg-blue-50' },
    { id: 'analytics', name: '@analytics', desc: 'Graphiques', color: 'border-purple-500 bg-purple-50' },
    { id: 'notifications', name: '@notifications', desc: 'Alertes', color: 'border-green-500 bg-green-50' },
  ]

  return (
    <div className="slide">
      <div className="slide-content flex flex-col h-full py-6">
        {/* Compact Header */}
        <div className="mb-4">
          <div className={`slide-badge mb-1 ${isVisible ? 'animate-fadeInDown' : 'opacity-0'}`}>
            05 — Parallel Routes
          </div>
          <h2 className={`text-2xl font-bold tracking-tight ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
            Routes Parallèles <span className="font-mono text-lg bg-gray-100 px-2 py-0.5 rounded">@folder</span>
          </h2>
        </div>

        {/* Main 3-Column Layout */}
        <div className="flex gap-4 flex-1">
          {/* Left: Concept Explanation */}
          <div className={`w-1/4 flex flex-col gap-3 ${isVisible ? 'animate-fadeInLeft stagger-1' : 'opacity-0'}`}>
            {/* What is it */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex-1">
              <p className="text-xs font-semibold mb-2 flex items-center gap-1.5">
                <Icons.lightbulb className="w-3.5 h-3.5" /> Qu'est-ce que c'est ?
              </p>
              <p className="text-xs text-black/60 leading-relaxed">
                Les <strong>Parallel Routes</strong> permettent d'afficher <strong>plusieurs pages simultanément</strong> dans le même layout.
              </p>
              <div className="mt-3 p-2 bg-black text-white rounded text-xs font-mono">
                @folder → slot injecté
              </div>
            </div>

            {/* Key Benefits */}
            <div className="p-4 bg-black text-white rounded-xl">
              <p className="text-xs font-medium mb-2 flex items-center gap-2">
                <Icons.zap className="w-3.5 h-3.5" /> Avantages clés
              </p>
              <div className="space-y-1.5">
                {[
                  'Loading indépendant par slot',
                  'Erreurs isolées',
                  'Navigation partielle',
                  'Streaming SSR optimisé',
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-white/80">
                    <Icons.check className="w-3 h-3 text-green-400" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* default.tsx Note */}
            <div className="p-3 border-2 border-dashed border-gray-200 rounded-xl">
              <p className="text-xs font-medium mb-1 flex items-center gap-1.5">
                <Icons.file className="w-3.5 h-3.5" /> default.tsx
              </p>
              <p className="text-xs text-black/50">
                Fallback affiché quand un slot n'a pas de contenu pour la route courante.
              </p>
            </div>
          </div>

          {/* Center: Code + Visual */}
          <div className={`flex-1 flex flex-col gap-3 ${isVisible ? 'animate-fadeIn stagger-2' : 'opacity-0'}`}>
            {/* Code Window */}
            <div className="code-window flex-1 flex flex-col">
              <div className="code-header py-2">
                <div className="code-dot red" />
                <div className="code-dot yellow" />
                <div className="code-dot green" />
                <span className="code-title text-xs">app/dashboard/layout.tsx</span>
              </div>
              <div className="code-body !p-4 flex-1">
                <pre className="text-xs leading-relaxed">{`// Les slots sont reçus comme props du layout
export default function DashboardLayout({
  children,      // page.tsx (slot implicite)
  team,          // @team/page.tsx
  analytics,     // @analytics/page.tsx
  notifications, // @notifications/page.tsx
}: {
  children: React.ReactNode
  team: React.ReactNode
  analytics: React.ReactNode
  notifications: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-12 gap-4 h-full">
      <aside className="col-span-3">{team}</aside>
      <main className="col-span-6">{children}</main>
      <div className="col-span-3 space-y-4">
        {analytics}
        {notifications}
      </div>
    </div>
  )
}`}</pre>
              </div>
            </div>

            {/* Visual Dashboard Demo */}
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-xs font-medium text-black/40 mb-2">Rendu visuel (dashboard)</p>
              <div className="flex gap-2 h-20">
                <div 
                  onClick={() => setActiveSlot('team')}
                  data-hover
                  className={`w-1/4 p-2 rounded-lg border-2 cursor-pointer transition-all
                    ${activeSlot === 'team' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
                >
                  <p className="text-xs font-mono text-black/40">@team</p>
                </div>
                <div 
                  onClick={() => setActiveSlot('children')}
                  data-hover
                  className={`flex-1 p-2 rounded-lg border-2 cursor-pointer transition-all
                    ${activeSlot === 'children' ? 'border-black bg-gray-100' : 'border-gray-200 bg-white'}`}
                >
                  <p className="text-xs font-mono text-black/40">children</p>
                </div>
                <div className="w-1/4 space-y-2">
                  <div 
                    onClick={() => setActiveSlot('analytics')}
                    data-hover
                    className={`p-2 rounded-lg border-2 cursor-pointer transition-all h-9
                      ${activeSlot === 'analytics' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 bg-white'}`}
                  >
                    <p className="text-xs font-mono text-black/40">@analytics</p>
                  </div>
                  <div 
                    onClick={() => setActiveSlot('notifications')}
                    data-hover
                    className={`p-2 rounded-lg border-2 cursor-pointer transition-all h-9
                      ${activeSlot === 'notifications' ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white'}`}
                  >
                    <p className="text-xs font-mono text-black/40">@notifications</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: File Structure */}
          <div className={`w-1/4 ${isVisible ? 'animate-fadeInRight stagger-3' : 'opacity-0'}`}>
            <div className="code-window h-full flex flex-col">
              <div className="code-header py-2">
                <div className="code-dot red" />
                <div className="code-dot yellow" />
                <div className="code-dot green" />
                <span className="code-title text-xs">Structure</span>
              </div>
              <div className="code-body !p-3 flex-1">
                <pre className="text-xs leading-relaxed">{`app/dashboard/
├── layout.tsx
├── page.tsx
│
├── @team/
│   ├── page.tsx
│   ├── loading.tsx
│   └── error.tsx
│
├── @analytics/
│   ├── page.tsx
│   ├── loading.tsx
│   └── default.tsx
│
└── @notifications/
    ├── page.tsx
    └── default.tsx`}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Key Insight */}
        <div className={`mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100 
          ${isVisible ? 'animate-fadeInUp stagger-4' : 'opacity-0'}`}>
          <div className="flex items-center gap-3">
            <Icons.lightbulb className="w-5 h-5 text-blue-600" />
            <p className="text-xs">
              <strong>Cas d'usage réel :</strong> Dashboard avec sidebar (équipe), contenu principal, et widgets latéraux — chacun peut charger et échouer indépendamment. Parfait pour les interfaces complexes multi-panneaux.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
