'use client'

import { useEffect, useState } from 'react'
import { Icons } from './icons'
import { SyntaxHighlighter } from './syntax-highlighter'

export function SlideInterceptingRoutes() {
  const [isVisible, setIsVisible] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const conventions = [
    { pattern: '(.)', desc: 'Même niveau', example: 'photos/(.)photo/[id]', match: '../photo/[id]' },
    { pattern: '(..)', desc: '1 niveau parent', example: 'feed/(..)photo/[id]', match: '../photo/[id]' },
    { pattern: '(..)(..)', desc: '2 niveaux parent', example: 'app/a/b/(..)(..)c', match: '../../c' },
    { pattern: '(...)', desc: 'Depuis app/', example: '(...)auth/login', match: 'app/auth/login' },
  ]

  return (
    <div className="slide">
      <div className="slide-content flex flex-col h-full py-6">
        {/* Compact Header */}
        <div className="mb-4">
          <div className={`slide-badge mb-1 ${isVisible ? 'animate-fadeInDown' : 'opacity-0'}`}>
            06 — Intercepting Routes
          </div>
          <h2 className={`text-2xl font-bold tracking-tight ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
            Interception de Routes <span className="font-mono text-lg bg-gray-100 px-2 py-0.5 rounded">(.)</span>
          </h2>
        </div>

        {/* Main 3-Column Layout */}
        <div className="flex gap-4 flex-1">
          {/* Left: Concept + Conventions */}
          <div className={`w-1/4 flex flex-col gap-3 ${isVisible ? 'animate-fadeInLeft stagger-1' : 'opacity-0'}`}>
            {/* What is it */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-xs font-semibold mb-2 flex items-center gap-1.5">
                <Icons.lightbulb className="w-3.5 h-3.5" /> Qu'est-ce que c'est ?
              </p>
              <p className="text-xs text-black/60 leading-relaxed">
                Affiche une route dans un <strong>modal/overlay</strong> tout en changeant l'URL. Le contexte actuel est préservé.
              </p>
              <div className="mt-2 p-2 bg-black text-white rounded text-xs">
                Comme Instagram ou Facebook!
              </div>
            </div>

            {/* Conventions */}
            <div className="p-4 bg-white border border-gray-200 rounded-xl flex-1">
              <p className="text-xs font-medium text-black/40 mb-2">Conventions de nommage</p>
              <div className="space-y-2">
                {conventions.map((c, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded font-bold">{c.pattern}</span>
                    <span className="text-black/60">{c.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Behavior */}
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-xs font-medium text-blue-700 mb-2">2 comportements</p>
              <div className="space-y-1.5 text-xs text-blue-600/80">
                <div className="flex items-center gap-2">
                  <Icons.zap className="w-3 h-3" />
                  <span><strong>Soft nav</strong> → Modal</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icons.link className="w-3 h-3" />
                  <span><strong>Direct URL</strong> → Page full</span>
                </div>
              </div>
            </div>
          </div>

          {/* Center: Interactive Demo */}
          <div className={`flex-1 flex flex-col gap-3 ${isVisible ? 'animate-fadeIn stagger-2' : 'opacity-0'}`}>
            {/* Browser Demo */}
            <div className="browser flex-1 relative flex flex-col">
              <div className="browser-header">
                <div className="browser-dots">
                  <div className="code-dot red" />
                  <div className="code-dot yellow" />
                  <div className="code-dot green" />
                </div>
                <div className="browser-url text-xs">
                  {showModal ? 'localhost:3000/photos/1' : 'localhost:3000/photos'}
                </div>
              </div>
              <div className="browser-body !p-4 flex-1 relative">
                {/* Photo Grid */}
                <p className="text-xs text-gray-400 mb-2">Galerie photos</p>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
                    <div
                      key={id}
                      className="aspect-square bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-all flex items-center justify-center"
                      onClick={() => setShowModal(true)}
                      data-hover
                    >
                      <Icons.image className="w-4 h-4 text-gray-400" />
                    </div>
                  ))}
                </div>

                {/* Modal Overlay */}
                {showModal && (
                  <div 
                    className="absolute inset-0 bg-black/60 flex items-center justify-center animate-fadeIn p-4"
                    onClick={() => setShowModal(false)}
                  >
                    <div 
                      className="bg-white rounded-xl p-4 w-3/4 animate-scaleIn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-medium text-sm">Photo #1</span>
                        <button 
                          onClick={() => setShowModal(false)}
                          data-hover
                          className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs hover:bg-gray-200"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                        <Icons.image className="w-8 h-8 text-gray-300" />
                      </div>
                      <div className="mt-2 p-2 bg-green-50 rounded text-xs text-green-700 text-center">
                        URL changée → Contexte préservé!
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <p className="text-xs text-center text-black/40">
              Cliquez une photo pour voir l'interception en action
            </p>
          </div>

          {/* Right: File Structure + Code */}
          <div className={`w-1/3 flex flex-col gap-3 ${isVisible ? 'animate-fadeInRight stagger-3' : 'opacity-0'}`}>
            {/* File Structure */}
            <div className="code-window flex-1 flex flex-col">
              <div className="code-header py-2">
                <div className="code-dot red" />
                <div className="code-dot yellow" />
                <div className="code-dot green" />
                <span className="code-title text-xs">Structure Modal Photo</span>
              </div>
              <div className="code-body !p-3 flex-1">
                <pre className="text-xs leading-relaxed">
                  <span className="text-gray-400">app/</span>{`\n`}<span className="text-gray-400">├──</span> <span className="text-emerald-400">layout.tsx</span>{`\n`}<span className="text-gray-400">│</span>   <span className="text-green-500 italic">{/* Contient {'{modal}'} slot */}</span>{`\n`}<span className="text-gray-400">│</span>{`\n`}<span className="text-gray-400">├──</span> <span className="text-purple-400 font-bold">@modal/</span>{`\n`}<span className="text-gray-400">│   ├──</span> <span className="text-orange-400">default.tsx</span>     <span className="text-green-500 italic">{/* return null */}</span>{`\n`}<span className="text-gray-400">│   └──</span> <span className="text-amber-400 font-bold">(.)photos/</span>{`\n`}<span className="text-gray-400">│       └──</span> <span className="text-cyan-400">[id]/</span>{`\n`}<span className="text-gray-400">│           └──</span> <span className="text-sky-400">page.tsx</span> <span className="text-green-500 italic">{/* Modal! */}</span>{`\n`}<span className="text-gray-400">│</span>{`\n`}<span className="text-gray-400">└──</span> <span className="text-purple-400">photos/</span>{`\n`}<span className="text-gray-400">    ├──</span> <span className="text-sky-400">page.tsx</span>        <span className="text-green-500 italic">{/* Grille */}</span>{`\n`}<span className="text-gray-400">    └──</span> <span className="text-cyan-400">[id]/</span>{`\n`}<span className="text-gray-400">        └──</span> <span className="text-sky-400">page.tsx</span>    <span className="text-green-500 italic">{/* Page full */}</span>
                </pre>
              </div>
            </div>

            {/* Layout Code */}
            <div className="code-window">
              <div className="code-header py-2">
                <div className="code-dot red" />
                <div className="code-dot yellow" />
                <div className="code-dot green" />
                <span className="code-title text-xs">layout.tsx</span>
              </div>
              <div className="code-body !p-3">
                <SyntaxHighlighter code={`export default function Layout({\n  children,\n  modal  // @modal slot\n}) {\n  return (\n    <>\n      {children}\n      {modal} {/* Overlay quand actif */}\n    </>\n  )\n}`} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Key Insight */}
        <div className={`mt-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100 
          ${isVisible ? 'animate-fadeInUp stagger-4' : 'opacity-0'}`}>
          <div className="flex items-center gap-3">
            <Icons.lightbulb className="w-5 h-5 text-purple-600" />
            <p className="text-xs">
              <strong>Pourquoi c'est puissant :</strong> L'utilisateur peut partager l'URL de la photo, et le destinataire verra la page complète. Mais depuis la grille, c'est un modal fluide. Meilleure UX + SEO.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
