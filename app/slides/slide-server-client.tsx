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
      <div className="slide-content">
        {/* Header */}
        <div className="slide-header">
          <div className={`slide-badge ${isVisible ? 'animate-fadeInDown' : 'opacity-0'}`}>
            09 — Composants
          </div>
          <h2 className={`text-display mb-4 ${isVisible ? 'animate-fadeInUp stagger-1' : 'opacity-0'}`}>
            Server vs Client Components
          </h2>
          <p className={`text-subtitle max-w-3xl ${isVisible ? 'animate-fadeInUp stagger-2' : 'opacity-0'}`}>
            Comprenez quand utiliser <span className="code-inline">'use client'</span> et comment 
            optimiser le rendu hybride de Next.js pour des performances maximales.
          </p>
        </div>

        {/* Tab Selector */}
        <div className={`flex justify-center mb-8 ${isVisible ? 'animate-fadeInUp stagger-3' : 'opacity-0'}`}>
          <div className="inline-flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setActiveTab('server')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === 'server' 
                  ? 'bg-white shadow-sm' 
                  : 'hover:bg-gray-200'
              }`}
              data-hover="true"
            >
              <Icons.server className="w-4 h-4" /> Server Components
            </button>
            <button
              onClick={() => setActiveTab('client')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === 'client' 
                  ? 'bg-white shadow-sm' 
                  : 'hover:bg-gray-200'
              }`}
              data-hover="true"
            >
              <Icons.monitor className="w-4 h-4" /> Client Components
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {activeTab === 'server' ? (
            <>
              {/* Server Component */}
              <div className={`${isVisible ? 'animate-fadeInLeft stagger-4' : 'opacity-0'}`}>
                <h3 className="text-title mb-4">Server Component (Par défaut)</h3>
                
                <div className="code-window mb-4">
                  <div className="code-header">
                    <div className="code-dot red" />
                    <div className="code-dot yellow" />
                    <div className="code-dot green" />
                    <span className="code-title">app/users/page.tsx</span>
                  </div>
                  <div className="code-body">
                    <pre>{`// Pas de directive = Server Component
// ✅ Exécuté sur le serveur uniquement

import { db } from '@/lib/db'

async function getUsers() {
  // Accès direct à la base de données !
  return await db.user.findMany()
}

export default async function UsersPage() {
  // Pas besoin d'API routes
  const users = await getUsers()
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}`}</pre>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-xl border border-green-200">
                    <h4 className="font-medium text-sm text-green-800 mb-2">✅ Ce que vous POUVEZ faire</h4>
                    <ul className="text-xs text-green-700 space-y-1">
                      <li>• Accès direct base de données (Prisma, etc.)</li>
                      <li>• Lecture de fichiers (fs.readFile)</li>
                      <li>• Appels API avec secrets</li>
                      <li>• Async/await directement dans le composant</li>
                      <li>• Importer des dépendances lourdes (sans impact bundle)</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-red-50 rounded-xl border border-red-200">
                    <h4 className="font-medium text-sm text-red-800 mb-2">❌ Ce que vous NE POUVEZ PAS faire</h4>
                    <ul className="text-xs text-red-700 space-y-1">
                      <li>• useState, useEffect, useRef</li>
                      <li>• onClick, onChange, onSubmit</li>
                      <li>• APIs navigateur (localStorage, window)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Avantages */}
              <div className={`${isVisible ? 'animate-fadeInRight stagger-5' : 'opacity-0'}`}>
                <h3 className="text-title mb-4">Pourquoi Server Components ?</h3>
                
                <div className="space-y-4">
                  <div className="p-4 border-2 border-gray-200 rounded-xl hover:border-black transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <Icons.package className="w-6 h-6" />
                      <h4 className="font-medium">Bundle Size Réduit</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      Le code et les dépendances restent sur le serveur. 
                      Le client ne reçoit que le HTML/CSS.
                    </p>
                  </div>

                  <div className="p-4 border-2 border-gray-200 rounded-xl hover:border-black transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <Icons.lock className="w-6 h-6" />
                      <h4 className="font-medium">Sécurité</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      Clés API, tokens, et logique sensible ne quittent jamais le serveur.
                    </p>
                  </div>

                  <div className="p-4 border-2 border-gray-200 rounded-xl hover:border-black transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <Icons.zap className="w-6 h-6" />
                      <h4 className="font-medium">Performance</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      Fetching proche de la source de données. 
                      Pas de waterfalls client.
                    </p>
                  </div>

                  <div className="p-4 border-2 border-gray-200 rounded-xl hover:border-black transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <Icons.target className="w-6 h-6" />
                      <h4 className="font-medium">SEO</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      HTML complet envoyé au crawlers. 
                      Pas besoin d'hydratation pour le contenu.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Client Component */}
              <div className={`${isVisible ? 'animate-fadeInLeft' : 'opacity-0'}`}>
                <h3 className="text-title mb-4">Client Component</h3>
                
                <div className="code-window mb-4">
                  <div className="code-header">
                    <div className="code-dot red" />
                    <div className="code-dot yellow" />
                    <div className="code-dot green" />
                    <span className="code-title">components/counter.tsx</span>
                  </div>
                  <div className="code-body">
                    <pre>{`'use client' // ← Directive obligatoire !

import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Compteur: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>
        +1
      </button>
    </div>
  )
}

// ⚠️ Tout ce fichier est envoyé au client
// ⚠️ Les imports deviennent partie du bundle`}</pre>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                    <h4 className="font-medium text-sm text-blue-800 mb-2 flex items-center gap-2">
                      <Icons.target className="w-4 h-4" /> Quand utiliser 'use client' ?
                    </h4>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>• Interactivité (clics, formulaires, modals)</li>
                      <li>• Hooks React (useState, useEffect, useContext)</li>
                      <li>• APIs navigateur (localStorage, géolocalisation)</li>
                      <li>• Librairies client (charts, animations, drag-drop)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Pattern Composition */}
              <div className={`${isVisible ? 'animate-fadeInRight' : 'opacity-0'}`}>
                <h3 className="text-title mb-4">Pattern : Composition</h3>
                
                <div className="code-window mb-4">
                  <div className="code-header">
                    <div className="code-dot red" />
                    <div className="code-dot yellow" />
                    <div className="code-dot green" />
                    <span className="code-title">app/dashboard/page.tsx</span>
                  </div>
                  <div className="code-body">
                    <pre>{`// Server Component (pas de 'use client')
import { db } from '@/lib/db'
import { InteractiveChart } from './chart'

export default async function Dashboard() {
  // Fetch côté serveur
  const data = await db.analytics.get()
  
  return (
    <div>
      {/* HTML statique */}
      <h1>Dashboard</h1>
      
      {/* Passer data au client */}
      <InteractiveChart data={data} />
    </div>
  )
}`}</pre>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-medium text-sm mb-3">📊 La frontière Server/Client</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <span>Server → fetch, DB access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full" />
                      <span>Client → interactivité, hooks</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full" />
                      <span>Props → sérializables uniquement</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
