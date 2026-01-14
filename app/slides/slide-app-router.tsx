'use client'

import { useEffect, useState } from 'react'
import { Icons } from './icons'

export function SlideAppRouter() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="slide">
      <div className="slide-content">
        {/* Header */}
        <div className="slide-header">
          <div className={`slide-badge ${isVisible ? 'animate-fadeInDown' : 'opacity-0'}`}>
            01 — Introduction
          </div>
          <h2 className={`text-display mb-4 ${isVisible ? 'animate-fadeInUp stagger-1' : 'opacity-0'}`}>
            Qu'est-ce que l'App Router ?
          </h2>
          <p className={`text-subtitle max-w-3xl ${isVisible ? 'animate-fadeInUp stagger-2' : 'opacity-0'}`}>
            Introduit dans Next.js 13, l'App Router est le nouveau système de routing basé sur 
            React Server Components. Il remplace progressivement le Pages Router et offre des 
            fonctionnalités avancées pour construire des applications modernes.
          </p>
        </div>

        {/* Comparison */}
        <div className="grid md:grid-cols-2 gap-8 relative">
          {/* Pages Router (Old) */}
          <div className={`card ${isVisible ? 'animate-fadeInLeft stagger-3' : 'opacity-0'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                <Icons.folder className="w-5 h-5 text-gray-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Pages Router</h3>
                <span className="text-xs text-red-500 font-medium">Legacy</span>
              </div>
            </div>

            <div className="code-window mb-6">
              <div className="code-header">
                <div className="code-dot red" />
                <div className="code-dot yellow" />
                <div className="code-dot green" />
                <span className="code-title">pages/</span>
              </div>
              <div className="code-body">
                <pre>{`pages/
├── _app.js        → Layout global
├── _document.js   → HTML document
├── index.js       → Route /
├── about.js       → Route /about
└── blog/
    ├── index.js   → Route /blog
    └── [slug].js  → Route /blog/:slug`}</pre>
              </div>
            </div>

            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-0.5">✗</span>
                <span>Layouts difficiles à partager entre routes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-0.5">✗</span>
                <span>Tout est Client Component par défaut</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-0.5">✗</span>
                <span>Data fetching complexe (getServerSideProps)</span>
              </li>
            </ul>
          </div>

          {/* App Router (New) */}
          <div className={`card !border-black ${isVisible ? 'animate-fadeInRight stagger-3' : 'opacity-0'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
                <Icons.zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">App Router</h3>
                <span className="text-label text-green-400">Recommandé</span>
              </div>
            </div>

            <div className="code-window mb-6">
              <div className="code-header">
                <div className="code-dot red" />
                <div className="code-dot yellow" />
                <div className="code-dot green" />
                <span className="code-title">app/</span>
              </div>
              <div className="code-body">
                <pre>{`app/
├── layout.tsx     → Layout racine
├── page.tsx       → Route /
├── loading.tsx    → État de chargement
├── error.tsx      → Gestion d'erreurs
└── blog/
    ├── layout.tsx → Layout imbriqué
    ├── page.tsx   → Route /blog
    └── [slug]/
        └── page.tsx → Route /blog/:slug`}</pre>
              </div>
            </div>

            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Layouts imbriqués et persistants</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Server Components par défaut (0 JS client)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Data fetching simplifié avec async/await</span>
              </li>
            </ul>
          </div>

          {/* VS Badge */}
          <div className="vs-badge hidden md:flex">VS</div>
        </div>
      </div>
    </div>
  )
}
