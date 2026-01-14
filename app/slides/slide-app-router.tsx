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
      <div className="slide-content flex flex-col h-full py-6">
        {/* Compact Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className={`slide-badge mb-2 ${isVisible ? 'animate-fadeInDown' : 'opacity-0'}`}>
              01 — Fondamentaux
            </div>
            <h2 className={`text-3xl font-bold tracking-tight ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
              Pourquoi l'App Router ?
            </h2>
          </div>
          <div className={`px-3 py-1.5 bg-black text-white text-xs rounded-full ${isVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
            Next.js 13+
          </div>
        </div>

        {/* Main Content - 3 Column Grid */}
        <div className="grid grid-cols-3 gap-4 flex-1">
          {/* Left Column - The Problem */}
          <div className={`flex flex-col ${isVisible ? 'animate-fadeInLeft stagger-1' : 'opacity-0'}`}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-red-100 flex items-center justify-center">
                <Icons.x className="w-3 h-3 text-red-500" />
              </div>
              <h3 className="font-semibold text-sm">Le Problème</h3>
            </div>
            
            <div className="space-y-2 text-xs flex-1">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                <p className="font-medium text-black/70 mb-1">Pages Router (Legacy)</p>
                <p className="text-black/40 leading-relaxed">
                  Layouts difficiles à partager. Chaque navigation recharge toute la page. 
                  Pas de contrôle granulaire sur le chargement.
                </p>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                <p className="font-medium text-black/70 mb-1">Client-First</p>
                <p className="text-black/40 leading-relaxed">
                  Tout le JavaScript est envoyé au client. Bundle lourd. 
                  SEO compromis sans SSR explicite.
                </p>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                <p className="font-medium text-black/70 mb-1">Data Fetching</p>
                <p className="text-black/40 leading-relaxed">
                  getServerSideProps, getStaticProps... API confuse et limitée 
                  au niveau de la page uniquement.
                </p>
              </div>
            </div>
          </div>

          {/* Center Column - The Solution (Code) */}
          <div className={`flex flex-col ${isVisible ? 'animate-fadeInUp stagger-2' : 'opacity-0'}`}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-black flex items-center justify-center">
                <Icons.zap className="w-3 h-3 text-white" />
              </div>
              <h3 className="font-semibold text-sm">La Solution: App Router</h3>
            </div>

            <div className="code-window flex-1 flex flex-col">
              <div className="code-header py-2">
                <div className="code-dot red" />
                <div className="code-dot yellow" />
                <div className="code-dot green" />
                <span className="code-title text-xs">Structure app/</span>
              </div>
              <div className="code-body flex-1 !p-3">
                <pre className="text-[10px] leading-relaxed">{`app/
├── layout.tsx      ← Layout racine (RSC)
├── page.tsx        ← Route /
├── loading.tsx     ← Suspense automatique
├── error.tsx       ← Error Boundary
├── not-found.tsx   ← 404 personnalisé
│
├── blog/
│   ├── layout.tsx  ← Layout imbriqué
│   ├── page.tsx    ← /blog
│   └── [slug]/
│       ├── page.tsx    ← /blog/:slug
│       ├── loading.tsx ← Loading spécifique
│       └── error.tsx   ← Error spécifique
│
└── (marketing)/    ← Route Group
    ├── about/
    └── contact/`}</pre>
              </div>
            </div>
          </div>

          {/* Right Column - Benefits */}
          <div className={`flex flex-col ${isVisible ? 'animate-fadeInRight stagger-3' : 'opacity-0'}`}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-green-100 flex items-center justify-center">
                <Icons.check className="w-3 h-3 text-green-500" />
              </div>
              <h3 className="font-semibold text-sm">Les Bénéfices</h3>
            </div>

            <div className="space-y-2 flex-1">
              {[
                { 
                  title: 'Server Components', 
                  desc: '0 KB JavaScript client par défaut. Composants rendus côté serveur.',
                  icon: Icons.server 
                },
                { 
                  title: 'Layouts Persistants', 
                  desc: 'UI partagée entre routes sans re-render. État préservé.',
                  icon: Icons.layout 
                },
                { 
                  title: 'Streaming & Suspense', 
                  desc: 'Rendu progressif. loading.tsx = Suspense automatique.',
                  icon: Icons.loader 
                },
                { 
                  title: 'Colocation', 
                  desc: 'Composants, tests, styles au même endroit que la route.',
                  icon: Icons.folder 
                },
                { 
                  title: 'Parallel Routes', 
                  desc: '@slots pour afficher plusieurs pages simultanément.',
                  icon: Icons.split 
                },
              ].map((benefit, i) => {
                const IconComponent = benefit.icon
                return (
                  <div key={i} className="p-2.5 bg-green-50/50 rounded-lg border border-green-100 group hover:bg-green-50 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <IconComponent className="w-3 h-3 text-green-600" />
                      <p className="font-medium text-xs text-black/80">{benefit.title}</p>
                    </div>
                    <p className="text-[10px] text-black/40 leading-relaxed">{benefit.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom Key Insight */}
        <div className={`mt-4 p-3 bg-black text-white rounded-xl flex items-center gap-4 ${isVisible ? 'animate-fadeInUp stagger-4' : 'opacity-0'}`}>
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
            <Icons.lightbulb className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium mb-0.5">Point clé à retenir</p>
            <p className="text-xs text-white/60">
              L'App Router n'est pas juste un nouveau système de fichiers — c'est un changement de paradigme 
              vers le <span className="text-white font-medium">Server-First</span> avec React Server Components comme fondation.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
