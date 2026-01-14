'use client'

import { useEffect, useState } from 'react'
import { Icons } from './icons'
import { SyntaxHighlighter } from './syntax-highlighter'

export function SlideMiddleware() {
  const [isVisible, setIsVisible] = useState(false)
  const [requestPath, setRequestPath] = useState('/dashboard')

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const getMiddlewareResult = (path: string) => {
    if (path.startsWith('/admin')) {
      return { action: 'redirect', to: '/login', color: 'red', reason: 'Non authentifié' }
    }
    if (path.startsWith('/api/')) {
      return { action: 'headers', to: path, color: 'purple', reason: 'CORS ajoutés' }
    }
    if (path === '/old-page') {
      return { action: 'rewrite', to: '/new-page', color: 'yellow', reason: 'URL mappée' }
    }
    return { action: 'next()', to: path, color: 'green', reason: 'Continue' }
  }

  const result = getMiddlewareResult(requestPath)

  return (
    <div className="slide">
      <div className="slide-content flex flex-col h-full py-6">
        {/* Compact Header */}
        <div className="mb-4">
          <div className={`slide-badge mb-1 ${isVisible ? 'animate-fadeInDown' : 'opacity-0'}`}>
            11 — Middleware
          </div>
          <h2 className={`text-2xl font-bold tracking-tight ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
            Middleware Next.js <span className="font-mono text-lg bg-gray-100 px-2 py-0.5 rounded">Edge</span>
          </h2>
        </div>

        {/* Main 3-Column Layout */}
        <div className="flex gap-4 flex-1">
          {/* Left: Concept + Edge Runtime */}
          <div className={`w-1/4 flex flex-col gap-3 ${isVisible ? 'animate-fadeInLeft stagger-1' : 'opacity-0'}`}>
            {/* Concept */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-xs font-semibold mb-2 flex items-center gap-1.5">
                <Icons.shield className="w-3.5 h-3.5" /> Qu'est-ce que c'est ?
              </p>
              <p className="text-xs text-black/60 leading-relaxed">
                Code qui s'exécute <strong>avant chaque requête</strong>. Parfait pour l'auth, redirections, A/B testing.
              </p>
            </div>

            {/* Edge Runtime */}
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex-1">
              <p className="text-xs font-semibold text-blue-700 mb-2 flex items-center gap-1.5">
                <Icons.zap className="w-3.5 h-3.5" /> Edge Runtime
              </p>
              <p className="text-xs text-blue-600/80 mb-2">
                Ultra-rapide mais limité (pas de Node.js APIs)
              </p>
              <div className="space-y-1">
                <div className="flex flex-wrap gap-1">
                  {['fetch', 'crypto', 'Headers'].map(a => (
                    <span key={a} className="px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-[10px]">✓ {a}</span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {['fs', 'path', 'child_process'].map(a => (
                    <span key={a} className="px-1.5 py-0.5 bg-red-100 text-red-700 rounded text-[10px] line-through">✗ {a}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Use Cases */}
            <div className="p-4 bg-black text-white rounded-xl">
              <p className="text-xs font-medium mb-2">Cas d'usage</p>
              <div className="space-y-1.5">
                {['Auth & protection routes', 'Redirections/rewrites', 'A/B testing', 'Geolocation routing', 'Rate limiting'].map((c, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-white/80">
                    <Icons.check className="w-3 h-3 text-green-400" />
                    <span>{c}</span>
                  </div>
                ))}
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
                <span className="code-title text-xs">middleware.ts (racine du projet)</span>
              </div>
              <div className="code-body !p-4 flex-1">
                <SyntaxHighlighter code={`import { NextResponse } from 'next/server'\nimport type { NextRequest } from 'next/server'\n\nexport function middleware(request: NextRequest) {\n  const { pathname } = request.nextUrl\n  \n  // 🔐 Protection authentification\n  if (pathname.startsWith('/admin')) {\n    const token = request.cookies.get('auth')\n    if (!token) {\n      return NextResponse.redirect(new URL('/login', request.url))\n    }\n  }\n  \n  // 🔄 Rewrite (URL interne différente)\n  if (pathname === '/old-page') {\n    return NextResponse.rewrite(new URL('/new-page', request.url))\n  }\n  \n  // 📝 Ajouter des headers (CORS, etc.)\n  const response = NextResponse.next()\n  response.headers.set('x-custom-header', 'value')\n  return response\n}\n\n// Routes sur lesquelles le middleware s'applique\nexport const config = {\n  matcher: ['/admin/:path*', '/api/:path*', '/old-page']\n}`} />
              </div>
            </div>
          </div>

          {/* Right: Interactive Demo */}
          <div className={`w-1/3 flex flex-col gap-3 ${isVisible ? 'animate-fadeInRight stagger-3' : 'opacity-0'}`}>
            {/* Path Selector */}
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-xs font-medium text-black/40 mb-2">Testez une URL</p>
              <div className="flex flex-wrap gap-1.5">
                {['/dashboard', '/admin/users', '/api/data', '/old-page'].map((path) => (
                  <button
                    key={path}
                    onClick={() => setRequestPath(path)}
                    data-hover
                    className={`px-2 py-1 rounded text-xs font-mono transition-all ${
                      requestPath === path ? 'bg-black text-white' : 'bg-white border border-gray-200'
                    }`}
                  >
                    {path}
                  </button>
                ))}
              </div>
            </div>

            {/* Flow Visualization */}
            <div className="browser flex-1 flex flex-col">
              <div className="browser-header">
                <div className="browser-dots">
                  <div className="code-dot red" />
                  <div className="code-dot yellow" />
                  <div className="code-dot green" />
                </div>
                <div className="browser-url text-xs">localhost:3000{requestPath}</div>
              </div>
              <div className="browser-body !p-4 flex-1">
                <div className="space-y-3">
                  {/* Request */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Icons.arrowRight className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs font-medium">Requête</p>
                      <p className="text-xs text-gray-400 font-mono">{requestPath}</p>
                    </div>
                  </div>

                  {/* Middleware */}
                  <div className="border-l-2 border-dashed border-gray-200 ml-4 pl-4 py-2">
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <Icons.settings className="w-3 h-3 animate-spin" style={{ animationDuration: '3s' }} /> 
                      middleware.ts
                    </p>
                  </div>

                  {/* Result */}
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center
                      ${result.color === 'red' ? 'bg-red-100' : ''}
                      ${result.color === 'yellow' ? 'bg-yellow-100' : ''}
                      ${result.color === 'purple' ? 'bg-purple-100' : ''}
                      ${result.color === 'green' ? 'bg-green-100' : ''}`}
                    >
                      {result.action === 'redirect' && <Icons.cornerDownRight className="w-4 h-4 text-red-600" />}
                      {result.action === 'rewrite' && <Icons.refresh className="w-4 h-4 text-yellow-600" />}
                      {result.action === 'headers' && <Icons.code className="w-4 h-4 text-purple-600" />}
                      {result.action === 'next()' && <Icons.check className="w-4 h-4 text-green-600" />}
                    </div>
                    <div>
                      <p className="text-xs font-medium font-mono">{result.action}</p>
                      <p className="text-xs text-gray-400">{result.reason}</p>
                      {result.action !== 'next()' && result.to !== requestPath && (
                        <p className="text-xs text-gray-300 font-mono">→ {result.to}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Matcher Info */}
            <div className="p-3 border-2 border-dashed border-gray-200 rounded-xl">
              <p className="text-xs font-medium mb-1 flex items-center gap-1.5">
                <Icons.target className="w-3.5 h-3.5" /> config.matcher
              </p>
              <p className="text-xs text-black/50 font-mono">
                Définit quelles routes déclenchent le middleware
              </p>
            </div>
          </div>
        </div>

        {/* Bottom: Key Insight */}
        <div className={`mt-4 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100 
          ${isVisible ? 'animate-fadeInUp stagger-4' : 'opacity-0'}`}>
          <div className="flex items-center gap-3">
            <Icons.lightbulb className="w-5 h-5 text-blue-600" />
            <p className="text-xs">
              <strong>Placement :</strong> Le fichier middleware.ts doit être à la racine du projet (même niveau que app/). Il s'exécute sur l'Edge, proche de l'utilisateur, pour une latence minimale.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
