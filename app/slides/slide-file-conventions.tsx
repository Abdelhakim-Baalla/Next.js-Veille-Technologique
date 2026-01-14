'use client'

import { useEffect, useState } from 'react'
import { Icons } from './icons'

export function SlideFileConventions() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFile, setActiveFile] = useState<string>('layout.tsx')

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const files = [
    {
      name: 'layout.tsx',
      icon: Icons.layout,
      color: 'bg-blue-500',
      shortDesc: 'UI partagée persistante',
      keyPoint: 'Persiste entre navigations — état conservé',
      code: `export default function Layout({ children }) {
  return (
    <section>
      <nav>Sidebar</nav>
      <main>{children}</main>
    </section>
  )
}`,
      tips: ['Obligatoire dans app/', 'Reçoit { children }', 'Ne re-render pas'],
    },
    {
      name: 'page.tsx',
      icon: Icons.file,
      color: 'bg-green-500',
      shortDesc: 'Rend la route accessible',
      keyPoint: 'Sans page.tsx = route non publique',
      code: `export default async function Page({ 
  params, 
  searchParams 
}) {
  const data = await fetchData()
  return <div>{data.title}</div>
}`,
      tips: ['Export default requis', 'Peut être async', 'Reçoit params/searchParams'],
    },
    {
      name: 'template.tsx',
      icon: Icons.copy,
      color: 'bg-purple-500',
      shortDesc: 'Nouvelle instance par navigation',
      keyPoint: 'État réinitialisé + useEffect re-exécuté',
      code: `'use client'
export default function Template({ children }) {
  useEffect(() => {
    analytics.track('page_view') // Chaque nav!
  }, [])
  return <div className="animate-in">{children}</div>
}`,
      tips: ['Animations d\'entrée', 'Page view tracking', 'État frais'],
    },
    {
      name: 'loading.tsx',
      icon: Icons.loader,
      color: 'bg-yellow-500',
      shortDesc: 'UI pendant le chargement',
      keyPoint: 'Suspense automatique = streaming SSR',
      code: `export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded" />
      <div className="h-4 bg-gray-200 rounded mt-2" />
    </div>
  )
}`,
      tips: ['Affiché instantanément', 'React Suspense', 'Personnalisable'],
    },
    {
      name: 'error.tsx',
      icon: Icons.alertTriangle,
      color: 'bg-red-500',
      shortDesc: 'Error Boundary',
      keyPoint: '"use client" obligatoire + reset()',
      code: `'use client'
export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Erreur: {error.message}</h2>
      <button onClick={() => reset()}>
        Réessayer
      </button>
    </div>
  )
}`,
      tips: ['Doit être Client', 'Reçoit reset()', 'Isolé par segment'],
    },
    {
      name: 'not-found.tsx',
      icon: Icons.search,
      color: 'bg-gray-500',
      shortDesc: '404 personnalisé',
      keyPoint: 'Déclenché par notFound() ou URL invalide',
      code: `export default function NotFound() {
  return (
    <div>
      <h2>404 - Non trouvé</h2>
      <Link href="/">Retour</Link>
    </div>
  )
}`,
      tips: ['HTTP 404 auto', 'Server Component', 'Par segment'],
    },
  ]

  const activeFileData = files.find(f => f.name === activeFile)!

  return (
    <div className="slide">
      <div className="slide-content flex flex-col h-full py-6">
        {/* Compact Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className={`slide-badge mb-1 ${isVisible ? 'animate-fadeInDown' : 'opacity-0'}`}>
              02 — Conventions
            </div>
            <h2 className={`text-2xl font-bold tracking-tight ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
              Fichiers Spéciaux Next.js
            </h2>
          </div>
        </div>

        {/* Main Content - Horizontal File Tabs + Details */}
        <div className="flex flex-col flex-1 gap-4">
          {/* File Tabs */}
          <div className={`flex gap-2 ${isVisible ? 'animate-fadeInUp stagger-1' : 'opacity-0'}`}>
            {files.map((file) => {
              const FileIcon = file.icon
              const isActive = activeFile === file.name
              return (
                <button
                  key={file.name}
                  onClick={() => setActiveFile(file.name)}
                  data-hover
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200
                    ${isActive 
                      ? 'bg-black text-white border-black' 
                      : 'bg-white text-black/60 border-black/10 hover:border-black/30'}`}
                >
                  <FileIcon className="w-4 h-4" />
                  <span className="text-xs font-medium font-mono">{file.name}</span>
                </button>
              )
            })}
          </div>

          {/* Active File Details - 2 Column Layout */}
          <div className={`flex gap-4 flex-1 ${isVisible ? 'animate-fadeIn stagger-2' : 'opacity-0'}`}>
            {/* Left: Description + Tips */}
            <div className="w-1/3 flex flex-col gap-3">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-8 h-8 rounded-lg ${activeFileData.color} flex items-center justify-center`}>
                    {(() => { const Icon = activeFileData.icon; return <Icon className="w-4 h-4 text-white" /> })()}
                  </div>
                  <div>
                    <p className="font-semibold text-sm font-mono">{activeFileData.name}</p>
                    <p className="text-xs text-black/40">{activeFileData.shortDesc}</p>
                  </div>
                </div>

                {/* Key Point Highlight */}
                <div className="p-3 bg-black text-white rounded-lg mb-3">
                  <p className="text-xs font-medium flex items-center gap-2">
                    <Icons.lightbulb className="w-3.5 h-3.5 flex-shrink-0" />
                    {activeFileData.keyPoint}
                  </p>
                </div>

                {/* Tips */}
                <div className="space-y-1.5">
                  {activeFileData.tips.map((tip, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-black/60">
                      <Icons.check className="w-3 h-3 text-green-500 flex-shrink-0" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Code */}
            <div className="flex-1 flex flex-col">
              <div className="code-window flex-1 flex flex-col">
                <div className="code-header py-2">
                  <div className="code-dot red" />
                  <div className="code-dot yellow" />
                  <div className="code-dot green" />
                  <span className="code-title text-xs">app/{activeFileData.name}</span>
                </div>
                <div className="code-body flex-1 !p-4">
                  <pre className="text-xs leading-relaxed">{activeFileData.code}</pre>
                </div>
              </div>
            </div>
          </div>

          {/* Component Hierarchy Diagram */}
          <div className={`p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 
            ${isVisible ? 'animate-fadeInUp stagger-3' : 'opacity-0'}`}>
            <p className="text-xs font-medium text-black/40 mb-3">Hiérarchie de rendu (ordre d'imbrication)</p>
            <div className="flex items-center gap-3 text-xs font-mono">
              {['layout.tsx', '→', 'template.tsx', '→', 'error.tsx', '→', 'loading.tsx', '→', 'not-found.tsx', '→', 'page.tsx'].map((item, i) => (
                item === '→' 
                  ? <Icons.arrowRight key={i} className="w-3 h-3 text-black/20" />
                  : <span key={i} className={`px-2 py-1 rounded ${activeFile === item ? 'bg-black text-white' : 'bg-gray-100'}`}>
                      {item.replace('.tsx', '')}
                    </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
