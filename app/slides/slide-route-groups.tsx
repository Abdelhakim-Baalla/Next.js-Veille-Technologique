'use client'

import { useEffect, useState } from 'react'
import { Icons } from './icons'
import { SyntaxHighlighter } from './syntax-highlighter'

export function SlideRouteGroups() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const groups = [
    { name: '(marketing)', color: 'bg-blue-500', routes: ['/', '/about', '/pricing'], layoutType: 'Header public' },
    { name: '(dashboard)', color: 'bg-purple-500', routes: ['/dashboard', '/settings', '/analytics'], layoutType: 'Sidebar admin' },
    { name: '(auth)', color: 'bg-green-500', routes: ['/login', '/register'], layoutType: 'Centré minimal' },
  ]

  return (
    <div className="slide">
      <div className="slide-content flex flex-col h-full py-6">
        {/* Compact Header */}
        <div className="mb-4">
          <div className={`slide-badge mb-1 ${isVisible ? 'animate-fadeInDown' : 'opacity-0'}`}>
            04 — Organisation
          </div>
          <h2 className={`text-2xl font-bold tracking-tight ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
            Route Groups <span className="font-mono text-lg bg-gray-100 px-2 py-0.5 rounded">(folder)</span>
          </h2>
        </div>

        {/* Main 3-Column Layout */}
        <div className="flex gap-4 flex-1">
          {/* Left: The Problem / Solution */}
          <div className={`w-1/4 flex flex-col gap-3 ${isVisible ? 'animate-fadeInLeft stagger-1' : 'opacity-0'}`}>
            {/* Problem */}
            <div className="p-4 bg-red-50 rounded-xl border border-red-100 flex-1">
              <p className="text-xs font-semibold text-red-600 mb-2 flex items-center gap-1.5">
                <Icons.alertTriangle className="w-3.5 h-3.5" /> Le Problème
              </p>
              <div className="space-y-2 text-xs text-red-700/80">
                <p>Dans l'App Router, la structure des dossiers = structure des URLs</p>
                <div className="p-2 bg-red-100 rounded font-mono text-xs">
                  app/admin/dashboard/page.tsx<br/>
                  → URL: /admin/dashboard
                </div>
                <p>Mais parfois on veut organiser sans affecter l'URL...</p>
              </div>
            </div>

            {/* Solution */}
            <div className="p-4 bg-green-50 rounded-xl border border-green-100 flex-1">
              <p className="text-xs font-semibold text-green-600 mb-2 flex items-center gap-1.5">
                <Icons.check className="w-3.5 h-3.5" /> La Solution
              </p>
              <div className="space-y-2 text-xs text-green-700/80">
                <p>Les parenthèses créent un "groupe invisible"</p>
                <div className="p-2 bg-green-100 rounded font-mono text-xs">
                  app/(admin)/dashboard/page.tsx<br/>
                  → URL: /dashboard <span className="opacity-50">(sans admin!)</span>
                </div>
                <p>Le groupe n'apparaît jamais dans l'URL.</p>
              </div>
            </div>
          </div>

          {/* Center: File Structure */}
          <div className={`flex-1 ${isVisible ? 'animate-fadeIn stagger-2' : 'opacity-0'}`}>
            <div className="code-window h-full flex flex-col">
              <div className="code-header py-2">
                <div className="code-dot red" />
                <div className="code-dot yellow" />
                <div className="code-dot green" />
                <span className="code-title text-xs">Structure de dossiers avec groupes</span>
              </div>
              <div className="code-body flex-1 !p-4">
                <pre className="text-xs leading-relaxed">
                  <span className="text-gray-400">app/</span>{`\n`}<span className="text-gray-400">├──</span> <span className="text-blue-400 font-bold">(marketing)/</span>          <span className="text-green-500 italic">← Groupe invisible</span>{`\n`}<span className="text-gray-400">│   ├──</span> <span className="text-emerald-400">layout.tsx</span>        <span className="text-green-500 italic">← Layout header public</span>{`\n`}<span className="text-gray-400">│   ├──</span> <span className="text-sky-400">page.tsx</span>          <span className="text-amber-400">→ /</span>{`\n`}<span className="text-gray-400">│   ├──</span> <span className="text-purple-400">about/</span><span className="text-sky-400">page.tsx</span>    <span className="text-amber-400">→ /about</span>{`\n`}<span className="text-gray-400">│   └──</span> <span className="text-purple-400">pricing/</span><span className="text-sky-400">page.tsx</span>  <span className="text-amber-400">→ /pricing</span>{`\n`}<span className="text-gray-400">│</span>{`\n`}<span className="text-gray-400">├──</span> <span className="text-purple-400 font-bold">(dashboard)/</span>          <span className="text-green-500 italic">← Layout différent!</span>{`\n`}<span className="text-gray-400">│   ├──</span> <span className="text-emerald-400">layout.tsx</span>        <span className="text-green-500 italic">← Layout sidebar</span>{`\n`}<span className="text-gray-400">│   ├──</span> <span className="text-sky-400">page.tsx</span>          <span className="text-amber-400">→ /dashboard</span>{`\n`}<span className="text-gray-400">│   ├──</span> <span className="text-purple-400">settings/</span><span className="text-sky-400">page.tsx</span> <span className="text-amber-400">→ /settings</span>{`\n`}<span className="text-gray-400">│   └──</span> <span className="text-cyan-400">@analytics/</span>       <span className="text-green-500 italic">← Parallel route</span>{`\n`}<span className="text-gray-400">│       └──</span> <span className="text-sky-400">page.tsx</span>{`\n`}<span className="text-gray-400">│</span>{`\n`}<span className="text-gray-400">└──</span> <span className="text-green-400 font-bold">(auth)/</span>                <span className="text-green-500 italic">← Layout centré</span>{`\n`}<span className="text-gray-400">    ├──</span> <span className="text-emerald-400">layout.tsx</span>        <span className="text-green-500 italic">← Layout minimal</span>{`\n`}<span className="text-gray-400">    ├──</span> <span className="text-purple-400">login/</span><span className="text-sky-400">page.tsx</span>    <span className="text-amber-400">→ /login</span>{`\n`}<span className="text-gray-400">    └──</span> <span className="text-purple-400">register/</span><span className="text-sky-400">page.tsx</span> <span className="text-amber-400">→ /register</span>
                </pre>
              </div>
            </div>
          </div>

          {/* Right: Benefits + Groups Visual */}
          <div className={`w-1/4 flex flex-col gap-3 ${isVisible ? 'animate-fadeInRight stagger-3' : 'opacity-0'}`}>
            {/* Groups Visual */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-xs font-medium text-black/40 mb-3">Groupes et leurs layouts</p>
              <div className="space-y-2">
                {groups.map(group => (
                  <div key={group.name} className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${group.color}`} />
                    <span className="text-xs font-mono flex-1">{group.name}</span>
                    <span className="text-xs text-black/40">{group.layoutType}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="p-4 bg-black text-white rounded-xl flex-1">
              <p className="text-xs font-medium mb-3 flex items-center gap-2">
                <Icons.lightbulb className="w-3.5 h-3.5" /> Pourquoi utiliser ?
              </p>
              <div className="space-y-2">
                {[
                  'Organisation par équipe/feature',
                  'Layouts différents par section',
                  'URLs propres sans bruit',
                  'Séparer public/privé',
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-white/80">
                    <Icons.check className="w-3 h-3 text-green-400" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Warning */}
            <div className="p-3 bg-yellow-50 rounded-xl border border-yellow-200">
              <p className="text-xs text-yellow-800 flex items-start gap-2">
                <Icons.alertTriangle className="w-3.5 h-3.5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Attention :</strong> Deux groupes ne peuvent pas avoir le même URL final.
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom: URL Resolution Examples */}
        <div className={`mt-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 
          ${isVisible ? 'animate-fadeInUp stagger-4' : 'opacity-0'}`}>
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-black/40">Résolution des URLs</p>
            <div className="flex gap-4 text-xs font-mono">
              {[
                { path: '(marketing)/about/page.tsx', url: '/about' },
                { path: '(dashboard)/settings/page.tsx', url: '/settings' },
                { path: '(auth)/login/page.tsx', url: '/login' },
              ].map((example, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-black/40">{example.path}</span>
                  <Icons.arrowRight className="w-3 h-3 text-black/20" />
                  <span className="px-2 py-0.5 bg-black text-white rounded">{example.url}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
