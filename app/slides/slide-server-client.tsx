'use client'

import { useEffect, useState } from 'react'
import { Icons } from './icons'

export function SlideServerClient() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState<'server' | 'client'>('server')

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="slide">
      <div className="slide-content flex flex-col h-full py-6">
        {/* Compact Header + Tab Toggle */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className={`slide-badge mb-1 ${isVisible ? 'animate-fadeInDown' : 'opacity-0'}`}>
              09 — Composants
            </div>
            <h2 className={`text-2xl font-bold tracking-tight ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
              Server vs Client Components
            </h2>
          </div>
          {/* Toggle */}
          <div className={`flex bg-gray-100 rounded-lg p-1 ${isVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
            <button
              onClick={() => setActiveTab('server')}
              data-hover
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all
                ${activeTab === 'server' ? 'bg-white shadow-sm' : ''}`}
            >
              <Icons.server className="w-3.5 h-3.5" /> Server
            </button>
            <button
              onClick={() => setActiveTab('client')}
              data-hover
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all
                ${activeTab === 'client' ? 'bg-white shadow-sm' : ''}`}
            >
              <Icons.monitor className="w-3.5 h-3.5" /> Client
            </button>
          </div>
        </div>

        {/* Main 3-Column Layout */}
        <div className="flex gap-4 flex-1">
          {activeTab === 'server' ? (
            <>
              {/* Left: Key Info */}
              <div className={`w-1/4 flex flex-col gap-3 ${isVisible ? 'animate-fadeInLeft stagger-1' : 'opacity-0'}`}>
                <div className="p-4 bg-green-50 rounded-xl border border-green-100 flex-1">
                  <p className="text-xs font-semibold text-green-700 mb-2 flex items-center gap-1.5">
                    <Icons.server className="w-3.5 h-3.5" /> Server Component
                  </p>
                  <p className="text-xs text-green-600/80 mb-3">
                    <strong>Par défaut</strong> dans l'App Router. Aucune directive nécessaire.
                  </p>
                  <div className="space-y-1.5">
                    {['Fetch data directement', 'Accès DB/filesystem', 'Secrets sécurisés', 'async/await natif'].map((b, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-green-700">
                        <Icons.check className="w-3 h-3" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                  <p className="text-xs font-semibold text-red-700 mb-2">❌ Interdit</p>
                  <div className="space-y-1 text-xs text-red-600/80">
                    <p>• useState, useEffect</p>
                    <p>• onClick, onChange</p>
                    <p>• window, localStorage</p>
                  </div>
                </div>
              </div>

              {/* Center: Code */}
              <div className={`flex-1 flex flex-col ${isVisible ? 'animate-fadeIn stagger-2' : 'opacity-0'}`}>
                <div className="code-window flex-1 flex flex-col">
                  <div className="code-header py-2">
                    <div className="code-dot red" />
                    <div className="code-dot yellow" />
                    <div className="code-dot green" />
                    <span className="code-title text-xs">app/users/page.tsx (Server Component)</span>
                  </div>
                  <div className="code-body !p-4 flex-1">
                    <pre className="text-xs leading-relaxed">{`// Pas de directive = Server Component par défaut
import { db } from '@/lib/db'

// Accès direct à la base de données !
async function getUsers() {
  return await db.user.findMany({
    select: { id: true, name: true, email: true }
  })
}

export default async function UsersPage() {
  // Pas besoin d'API route, pas de useEffect
  const users = await getUsers()
  
  return (
    <div>
      <h1>Utilisateurs ({users.length})</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}`}</pre>
                  </div>
                </div>
              </div>

              {/* Right: Benefits */}
              <div className={`w-1/4 flex flex-col gap-2 ${isVisible ? 'animate-fadeInRight stagger-3' : 'opacity-0'}`}>
                {[
                  { icon: Icons.package, title: 'Bundle Réduit', desc: 'Code reste serveur' },
                  { icon: Icons.lock, title: 'Sécurité', desc: 'Secrets jamais exposés' },
                  { icon: Icons.zap, title: 'Performance', desc: 'Fetch proche DB' },
                  { icon: Icons.target, title: 'SEO', desc: 'HTML complet' },
                ].map((item, i) => (
                  <div key={i} className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold">{item.title}</p>
                      <p className="text-xs text-black/40">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Left: Key Info */}
              <div className={`w-1/4 flex flex-col gap-3 ${isVisible ? 'animate-fadeInLeft' : 'opacity-0'}`}>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex-1">
                  <p className="text-xs font-semibold text-blue-700 mb-2 flex items-center gap-1.5">
                    <Icons.monitor className="w-3.5 h-3.5" /> Client Component
                  </p>
                  <p className="text-xs text-blue-600/80 mb-3">
                    Ajoutez <strong>"use client"</strong> en haut du fichier.
                  </p>
                  <div className="space-y-1.5">
                    {['Interactivité (clicks)', 'useState, useEffect', 'APIs navigateur', 'Libs tierces (charts)'].map((b, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-blue-700">
                        <Icons.check className="w-3 h-3" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                  <p className="text-xs font-semibold text-yellow-700 mb-2 flex items-center gap-1.5">
                    <Icons.alertTriangle className="w-3.5 h-3.5" /> Attention
                  </p>
                  <p className="text-xs text-yellow-600/80">
                    Tout le fichier + imports sont envoyés au client bundle!
                  </p>
                </div>
              </div>

              {/* Center: Code */}
              <div className={`flex-1 flex flex-col gap-3 ${isVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
                <div className="code-window flex-1 flex flex-col">
                  <div className="code-header py-2">
                    <div className="code-dot red" />
                    <div className="code-dot yellow" />
                    <div className="code-dot green" />
                    <span className="code-title text-xs">components/counter.tsx</span>
                  </div>
                  <div className="code-body !p-4 flex-1">
                    <pre className="text-xs leading-relaxed">{`'use client'  // ← Directive obligatoire !

import { useState } from 'react'

export function Counter() {
  // useState = interactivité = Client Component
  const [count, setCount] = useState(0)

  return (
    <div className="p-4 bg-gray-50 rounded-xl">
      <p className="text-2xl font-bold">{count}</p>
      <button 
        onClick={() => setCount(c => c + 1)}
        className="mt-2 px-4 py-2 bg-black text-white rounded-lg"
      >
        +1
      </button>
    </div>
  )
}

// Ce code est dans le bundle client JS`}</pre>
                  </div>
                </div>
              </div>

              {/* Right: Composition Pattern */}
              <div className={`w-1/3 flex flex-col gap-3 ${isVisible ? 'animate-fadeInRight' : 'opacity-0'}`}>
                <div className="p-3 bg-purple-50 rounded-xl border border-purple-100">
                  <p className="text-xs font-semibold text-purple-700 mb-1">Pattern Composition</p>
                  <p className="text-xs text-purple-600/80">
                    Server fetch data → passe au Client Component
                  </p>
                </div>
                <div className="code-window flex-1 flex flex-col">
                  <div className="code-header py-2">
                    <div className="code-dot red" />
                    <div className="code-dot yellow" />
                    <div className="code-dot green" />
                    <span className="code-title text-xs">Composition hybride</span>
                  </div>
                  <div className="code-body !p-3 flex-1">
                    <pre className="text-xs leading-relaxed">{`// page.tsx (Server)
import { db } from '@/lib/db'
import { Chart } from './chart'

export default async function Page() {
  // Fetch côté serveur
  const data = await db.analytics.get()
  
  return (
    <div>
      <h1>Dashboard</h1>
      {/* Pass data au Client */}
      <Chart data={data} />
    </div>
  )
}

// chart.tsx (Client)
'use client'
export function Chart({ data }) {
  // Interactivité avec data pré-fetché
}`}</pre>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Bottom: Key Insight */}
        <div className={`mt-4 p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100 
          ${isVisible ? 'animate-fadeInUp stagger-4' : 'opacity-0'}`}>
          <div className="flex items-center gap-3">
            <Icons.lightbulb className="w-5 h-5 text-blue-600" />
            <p className="text-xs">
              <strong>Règle d'or :</strong> Commencez toujours par Server Components. Ajoutez "use client" uniquement quand vous avez besoin d'interactivité. Gardez les Client Components le plus bas possible dans l'arbre.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
