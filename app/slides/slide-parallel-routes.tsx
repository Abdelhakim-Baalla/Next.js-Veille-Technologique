'use client'

import { useEffect, useState } from 'react'
import { Icons } from './icons'

export function SlideParallelRoutes() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSlot, setActiveSlot] = useState<string>('team')

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="slide">
      <div className="slide-content">
        {/* Header */}
        <div className="slide-header">
          <div className={`slide-badge ${isVisible ? 'animate-fadeInDown' : 'opacity-0'}`}>
            05 — Parallel Routes
          </div>
          <h2 className={`text-display mb-4 ${isVisible ? 'animate-fadeInUp stagger-1' : 'opacity-0'}`}>
            Routes Parallèles <span className="code-inline">@folder</span>
          </h2>
          <p className={`text-subtitle max-w-3xl ${isVisible ? 'animate-fadeInUp stagger-2' : 'opacity-0'}`}>
            Affichez plusieurs pages simultanément dans le même layout. 
            Chaque "slot" peut avoir son propre loading, error, et navigation indépendants.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Structure & Code */}
          <div className={`space-y-4 ${isVisible ? 'animate-fadeInLeft stagger-3' : 'opacity-0'}`}>
            <div className="code-window">
              <div className="code-header">
                <div className="code-dot red" />
                <div className="code-dot yellow" />
                <div className="code-dot green" />
                <span className="code-title">Structure de dossiers</span>
              </div>
              <div className="code-body">
                <pre>{`app/dashboard/
├── layout.tsx        ← Reçoit les slots
├── page.tsx          → children
├── @team/
│   ├── page.tsx      → Slot team
│   ├── loading.tsx   → Loading indépendant
│   └── error.tsx     → Error indépendant
├── @analytics/
│   ├── page.tsx      → Slot analytics
│   └── loading.tsx   → Loading indépendant
└── @notifications/
    └── page.tsx      → Slot notifications`}</pre>
              </div>
            </div>

            <div className="code-window">
              <div className="code-header">
                <div className="code-dot red" />
                <div className="code-dot yellow" />
                <div className="code-dot green" />
                <span className="code-title">dashboard/layout.tsx</span>
              </div>
              <div className="code-body">
                <pre>{`export default function DashboardLayout({
  children,      // page.tsx
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
    <div className="grid grid-cols-12 gap-4">
      <aside className="col-span-3">{team}</aside>
      <main className="col-span-6">{children}</main>
      <div className="col-span-3">
        {analytics}
        {notifications}
      </div>
    </div>
  )
}`}</pre>
              </div>
            </div>
          </div>

          {/* Visual Demo */}
          <div className={`${isVisible ? 'animate-fadeInRight stagger-4' : 'opacity-0'}`}>
            <div className="browser">
              <div className="browser-header">
                <div className="browser-dots">
                  <div className="code-dot red" />
                  <div className="code-dot yellow" />
                  <div className="code-dot green" />
                </div>
                <div className="browser-url">localhost:3000/dashboard</div>
              </div>
              <div className="browser-body !p-4">
                <div className="grid grid-cols-12 gap-3 min-h-[280px]">
                  {/* Team Slot */}
                  <div 
                    className={`col-span-3 p-3 rounded-xl border-2 transition-all cursor-pointer ${
                      activeSlot === 'team' 
                        ? 'border-black bg-gray-50' 
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                    onClick={() => setActiveSlot('team')}
                    data-hover="true"
                  >
                    <div className="text-xs font-mono text-gray-500 mb-2">@team</div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                      <div className="h-3 bg-gray-200 rounded w-2/3" />
                    </div>
                  </div>

                  {/* Main Content */}
                  <div 
                    className={`col-span-6 p-3 rounded-xl border-2 transition-all cursor-pointer ${
                      activeSlot === 'children' 
                        ? 'border-black bg-gray-50' 
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                    onClick={() => setActiveSlot('children')}
                    data-hover="true"
                  >
                    <div className="text-xs font-mono text-gray-500 mb-2">children (page.tsx)</div>
                    <div className="h-20 bg-gray-100 rounded-lg flex items-center justify-center text-sm text-gray-400">
                      Contenu principal
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="col-span-3 space-y-3">
                    <div 
                      className={`p-3 rounded-xl border-2 transition-all cursor-pointer ${
                        activeSlot === 'analytics' 
                          ? 'border-black bg-gray-50' 
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                      onClick={() => setActiveSlot('analytics')}
                      data-hover="true"
                    >
                      <div className="text-xs font-mono text-gray-500 mb-2">@analytics</div>
                      <div className="h-8 bg-gray-200 rounded" />
                    </div>
                    <div 
                      className={`p-3 rounded-xl border-2 transition-all cursor-pointer ${
                        activeSlot === 'notifications' 
                          ? 'border-black bg-gray-50' 
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                      onClick={() => setActiveSlot('notifications')}
                      data-hover="true"
                    >
                      <div className="text-xs font-mono text-gray-500 mb-2">@notifications</div>
                      <div className="h-8 bg-gray-200 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-lg mb-1">⚡</div>
                <h4 className="font-medium text-sm mb-1">Chargement Indépendant</h4>
                <p className="text-xs text-gray-500">Chaque slot a son propre loading.tsx</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-lg mb-1">🛡️</div>
                <h4 className="font-medium text-sm mb-1">Erreurs Isolées</h4>
                <p className="text-xs text-gray-500">Une erreur n'affecte pas les autres slots</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-lg mb-1">🔄</div>
                <h4 className="font-medium text-sm mb-1">Navigation Partielle</h4>
                <p className="text-xs text-gray-500">Un slot peut naviguer sans affecter les autres</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-lg mb-1">📋</div>
                <h4 className="font-medium text-sm mb-1">default.tsx</h4>
                <p className="text-xs text-gray-500">Fallback quand aucune route ne match</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
