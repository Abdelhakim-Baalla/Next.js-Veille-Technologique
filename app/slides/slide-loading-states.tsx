'use client'

import { useEffect, useState } from 'react'
import { Icons } from './icons'
import { SyntaxHighlighter } from './syntax-highlighter'

export function SlideLoadingStates() {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setIsLoading((prev) => !prev)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="slide">
      <div className="slide-content flex flex-col h-full py-6">
        {/* Compact Header */}
        <div className="mb-4">
          <div className={`slide-badge mb-1 ${isVisible ? 'animate-fadeInDown' : 'opacity-0'}`}>
            07 — Loading States
          </div>
          <h2 className={`text-2xl font-bold tracking-tight ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
            États de Chargement <span className="font-mono text-lg bg-gray-100 px-2 py-0.5 rounded">loading.tsx</span>
          </h2>
        </div>

        {/* Main 3-Column Layout */}
        <div className="flex gap-4 flex-1">
          {/* Left: Concept + How it works */}
          <div className={`w-1/4 flex flex-col gap-3 ${isVisible ? 'animate-fadeInLeft stagger-1' : 'opacity-0'}`}>
            {/* What is it */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-xs font-semibold mb-2 flex items-center gap-1.5">
                <Icons.loader className="w-3.5 h-3.5" /> Comment ça marche ?
              </p>
              <div className="space-y-2 text-xs text-black/60">
                <div className="flex gap-2">
                  <span className="w-4 h-4 rounded-full bg-black text-white flex items-center justify-center text-[10px]">1</span>
                  <span>Next.js wraps page.tsx dans Suspense</span>
                </div>
                <div className="flex gap-2">
                  <span className="w-4 h-4 rounded-full bg-black text-white flex items-center justify-center text-[10px]">2</span>
                  <span>loading.tsx = fallback automatique</span>
                </div>
                <div className="flex gap-2">
                  <span className="w-4 h-4 rounded-full bg-black text-white flex items-center justify-center text-[10px]">3</span>
                  <span>Streaming SSR envoie HTML progressif</span>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="p-4 bg-black text-white rounded-xl flex-1">
              <p className="text-xs font-medium mb-2 flex items-center gap-2">
                <Icons.zap className="w-3.5 h-3.5" /> Pourquoi l'utiliser
              </p>
              <div className="space-y-1.5">
                {[
                  'UX instantanée (pas de blank screen)',
                  'Streaming SSR = TTFB rapide',
                  'SEO friendly',
                  'Automatic Suspense boundary',
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-white/80">
                    <Icons.check className="w-3 h-3 text-green-400" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Equivalent Code */}
            <div className="p-3 border-2 border-dashed border-gray-200 rounded-xl">
              <p className="text-xs font-mono text-black/40 mb-1">Équivalent React :</p>
              <SyntaxHighlighter code={`<Suspense fallback={<Loading/>}>\n  <Page />\n</Suspense>`} />
            </div>
          </div>

          {/* Center: Code + Demo */}
          <div className={`flex-1 flex flex-col gap-3 ${isVisible ? 'animate-fadeIn stagger-2' : 'opacity-0'}`}>
            {/* Code Window */}
            <div className="code-window flex-1 flex flex-col">
              <div className="code-header py-2">
                <div className="code-dot red" />
                <div className="code-dot yellow" />
                <div className="code-dot green" />
                <span className="code-title text-xs">app/dashboard/loading.tsx</span>
              </div>
              <div className="code-body !p-4 flex-1">
                <SyntaxHighlighter code={`// Affiché automatiquement pendant le chargement\nexport default function Loading() {\n  return (\n    <div className="animate-pulse space-y-4">\n      {/* Skeleton Header */}\n      <div className="h-8 bg-gray-200 rounded w-1/3" />\n      \n      {/* Skeleton Content */}\n      <div className="grid grid-cols-3 gap-4">\n        <div className="h-24 bg-gray-200 rounded-xl" />\n        <div className="h-24 bg-gray-200 rounded-xl" />\n        <div className="h-24 bg-gray-200 rounded-xl" />\n      </div>\n      \n      {/* Skeleton Table */}\n      <div className="space-y-2">\n        <div className="h-4 bg-gray-200 rounded w-full" />\n        <div className="h-4 bg-gray-200 rounded w-2/3" />\n      </div>\n    </div>\n  )\n}`} />
              </div>
            </div>

            {/* Live Demo */}
            <div className="browser">
              <div className="browser-header">
                <div className="browser-dots">
                  <div className="code-dot red" />
                  <div className="code-dot yellow" />
                  <div className="code-dot green" />
                </div>
                <div className="browser-url text-xs">localhost:3000/dashboard</div>
              </div>
              <div className="browser-body !p-3">
                {isLoading ? (
                  <div className="animate-pulse space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                    <div className="flex gap-2">
                      <div className="h-12 bg-gray-200 rounded flex-1" />
                      <div className="h-12 bg-gray-200 rounded flex-1" />
                      <div className="h-12 bg-gray-200 rounded flex-1" />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 animate-fadeIn">
                    <p className="text-xs font-medium">Dashboard</p>
                    <div className="flex gap-2">
                      <div className="h-12 bg-blue-100 rounded flex-1 flex items-center justify-center text-xs text-blue-600">Stats</div>
                      <div className="h-12 bg-green-100 rounded flex-1 flex items-center justify-center text-xs text-green-600">Users</div>
                      <div className="h-12 bg-purple-100 rounded flex-1 flex items-center justify-center text-xs text-purple-600">Revenue</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Advanced Suspense */}
          <div className={`w-1/3 flex flex-col gap-3 ${isVisible ? 'animate-fadeInRight stagger-3' : 'opacity-0'}`}>
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-xs font-semibold text-blue-700 mb-1">Suspense Granulaire</p>
              <p className="text-xs text-blue-600/80">
                Vous pouvez aussi utiliser Suspense manuellement pour un contrôle plus fin.
              </p>
            </div>

            <div className="code-window flex-1 flex flex-col">
              <div className="code-header py-2">
                <div className="code-dot red" />
                <div className="code-dot yellow" />
                <div className="code-dot green" />
                <span className="code-title text-xs">Chargement par composant</span>
              </div>
              <div className="code-body !p-3 flex-1">
                <SyntaxHighlighter code={`import { Suspense } from 'react'\n\nexport default function Page() {\n  return (\n    <div className="grid gap-4">\n      {/* Chaque section indépendante */}\n      <Suspense fallback={<ProfileSkeleton />}>\n        <UserProfile />\n      </Suspense>\n      \n      <Suspense fallback={<ChartSkeleton />}>\n        <Analytics />  {/* Peut être lent */}\n      </Suspense>\n      \n      <Suspense fallback={<TableSkeleton />}>\n        <DataTable />\n      </Suspense>\n    </div>\n  )\n}`} />
              </div>
            </div>

            {/* Visual diagram */}
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-xs font-medium text-black/40 mb-2">Streaming progressif</p>
              <div className="flex gap-1">
                {['Shell', 'Profile', 'Charts', 'Table'].map((part, i) => (
                  <div key={i} className="flex-1 h-6 bg-gray-200 rounded flex items-center justify-center text-[10px] font-medium" 
                    style={{ animationDelay: `${i * 0.3}s` }}>
                    {part}
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-black/40 mt-1 text-center">HTML envoyé progressivement →</p>
            </div>
          </div>
        </div>

        {/* Bottom: Key Insight */}
        <div className={`mt-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-100 
          ${isVisible ? 'animate-fadeInUp stagger-4' : 'opacity-0'}`}>
          <div className="flex items-center gap-3">
            <Icons.lightbulb className="w-5 h-5 text-yellow-600" />
            <p className="text-xs">
              <strong>Best Practice :</strong> Créez des skeletons qui ressemblent à votre contenu final. Ça réduit le "layout shift" et améliore la perception de vitesse (Perceived Performance).
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
