'use client'

import { useEffect, useState } from 'react'

export function SlideServerClient() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeComponent, setActiveComponent] = useState<'server' | 'client'>('server')

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="h-full flex items-center justify-center px-8 py-20">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className={`mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white rounded-full text-xs font-mono mb-4">
            10 / Server vs Client
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Server & Client Components
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl">
            Le modèle hybride de React - le meilleur des deux mondes
          </p>
        </div>

        {/* Toggle */}
        <div className={`flex justify-center mb-8 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="bg-gray-100 p-1 rounded-xl flex">
            <button
              onClick={() => setActiveComponent('server')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeComponent === 'server'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🖥️ Server Component
            </button>
            <button
              onClick={() => setActiveComponent('client')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeComponent === 'client'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              💻 Client Component
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Component Info */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            {activeComponent === 'server' ? (
              <div className="space-y-4">
                <div className="p-6 bg-blue-50 rounded-2xl border-2 border-blue-200">
                  <h3 className="text-2xl font-bold text-blue-900 mb-4">Server Component</h3>
                  <p className="text-gray-700 mb-4">
                    Par défaut dans Next.js 13+. Rendu sur le serveur, 0 JavaScript envoyé au client.
                  </p>
                  
                  <h4 className="font-semibold mb-2">✅ Peut faire:</h4>
                  <ul className="space-y-2 text-sm mb-4">
                    <li className="flex items-center gap-2 text-green-700">
                      <span className="w-5 h-5 bg-green-200 rounded-full flex items-center justify-center text-xs">✓</span>
                      Accéder directement à la base de données
                    </li>
                    <li className="flex items-center gap-2 text-green-700">
                      <span className="w-5 h-5 bg-green-200 rounded-full flex items-center justify-center text-xs">✓</span>
                      Utiliser des secrets / clés API
                    </li>
                    <li className="flex items-center gap-2 text-green-700">
                      <span className="w-5 h-5 bg-green-200 rounded-full flex items-center justify-center text-xs">✓</span>
                      Fetch data avec async/await
                    </li>
                    <li className="flex items-center gap-2 text-green-700">
                      <span className="w-5 h-5 bg-green-200 rounded-full flex items-center justify-center text-xs">✓</span>
                      Lire le système de fichiers
                    </li>
                  </ul>

                  <h4 className="font-semibold mb-2">❌ Ne peut PAS faire:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2 text-red-700">
                      <span className="w-5 h-5 bg-red-200 rounded-full flex items-center justify-center text-xs">✗</span>
                      useState, useEffect, useContext
                    </li>
                    <li className="flex items-center gap-2 text-red-700">
                      <span className="w-5 h-5 bg-red-200 rounded-full flex items-center justify-center text-xs">✗</span>
                      Event handlers (onClick, onChange)
                    </li>
                    <li className="flex items-center gap-2 text-red-700">
                      <span className="w-5 h-5 bg-red-200 rounded-full flex items-center justify-center text-xs">✗</span>
                      Browser APIs (window, localStorage)
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-6 bg-purple-50 rounded-2xl border-2 border-purple-200">
                  <h3 className="text-2xl font-bold text-purple-900 mb-4">Client Component</h3>
                  <p className="text-gray-700 mb-4">
                    Activé avec <code className="bg-purple-200 px-2 py-0.5 rounded">'use client'</code>. Pre-rendu sur serveur, puis hydraté côté client.
                  </p>
                  
                  <h4 className="font-semibold mb-2">✅ Peut faire:</h4>
                  <ul className="space-y-2 text-sm mb-4">
                    <li className="flex items-center gap-2 text-green-700">
                      <span className="w-5 h-5 bg-green-200 rounded-full flex items-center justify-center text-xs">✓</span>
                      useState, useEffect, useReducer
                    </li>
                    <li className="flex items-center gap-2 text-green-700">
                      <span className="w-5 h-5 bg-green-200 rounded-full flex items-center justify-center text-xs">✓</span>
                      Event handlers interactifs
                    </li>
                    <li className="flex items-center gap-2 text-green-700">
                      <span className="w-5 h-5 bg-green-200 rounded-full flex items-center justify-center text-xs">✓</span>
                      Browser APIs
                    </li>
                    <li className="flex items-center gap-2 text-green-700">
                      <span className="w-5 h-5 bg-green-200 rounded-full flex items-center justify-center text-xs">✓</span>
                      Animations, transitions
                    </li>
                  </ul>

                  <h4 className="font-semibold mb-2">⚠️ Attention:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2 text-orange-700">
                      <span className="w-5 h-5 bg-orange-200 rounded-full flex items-center justify-center text-xs">!</span>
                      JavaScript envoyé au client
                    </li>
                    <li className="flex items-center gap-2 text-orange-700">
                      <span className="w-5 h-5 bg-orange-200 rounded-full flex items-center justify-center text-xs">!</span>
                      Pas d'accès direct aux secrets
                    </li>
                    <li className="flex items-center gap-2 text-orange-700">
                      <span className="w-5 h-5 bg-orange-200 rounded-full flex items-center justify-center text-xs">!</span>
                      Hydration après le chargement
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Code Example */}
          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="bg-gray-900 rounded-2xl p-6 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className={`text-sm font-mono ${activeComponent === 'server' ? 'text-blue-400' : 'text-purple-400'}`}>
                  {activeComponent === 'server' ? 'server-component.tsx' : 'client-component.tsx'}
                </span>
              </div>
              
              {activeComponent === 'server' ? (
                <pre className="text-sm font-mono text-gray-100 overflow-x-auto">
{`// app/users/page.tsx
// ℹ️ Pas besoin de directive - Server par défaut!

import { db } from '@/lib/database'

export default async function UsersPage() {
  // ✅ Accès direct à la DB sur le serveur
  const users = await db.users.findMany()
  
  // ✅ Les secrets restent sur le serveur
  const apiKey = process.env.SECRET_API_KEY
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name}
        </li>
      ))}
    </ul>
  )
}

// 🎯 Zéro JavaScript pour ce composant
// envoyé au navigateur!`}
                </pre>
              ) : (
                <pre className="text-sm font-mono text-gray-100 overflow-x-auto">
{`// app/components/counter.tsx
'use client' // 👈 Directive obligatoire!

import { useState } from 'react'

export function Counter() {
  // ✅ Hooks React disponibles
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <p>Count: {count}</p>
      
      {/* ✅ Event handlers ok */}
      <button onClick={() => setCount(c => c + 1)}>
        Incrémenter
      </button>
    </div>
  )
}

// 📦 Ce composant + ses dépendances
// sont envoyés au client`}
                </pre>
              )}
            </div>
          </div>
        </div>

        {/* Pattern */}
        <div className={`mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h4 className="font-semibold mb-2">💡 Pattern recommandé</h4>
          <p className="text-sm text-gray-700">
            Gardez les Server Components en haut de l'arbre, passez les Client Components comme <code className="bg-gray-200 px-1 rounded">children</code> ou props pour minimiser le JavaScript client.
          </p>
        </div>
      </div>
    </div>
  )
}
