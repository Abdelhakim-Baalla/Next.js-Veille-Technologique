'use client'

import { useEffect, useState } from 'react'
import { Icons } from './icons'

export function SlideMiddleware() {
  const [isVisible, setIsVisible] = useState(false)
  const [requestPath, setRequestPath] = useState('/dashboard')

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const getMiddlewareResult = (path: string) => {
    if (path.startsWith('/admin') && !path.includes('token')) {
      return { action: 'redirect', to: '/login', reason: 'Non authentifié' }
    }
    if (path.startsWith('/api/')) {
      return { action: 'header', to: path, reason: 'CORS headers ajoutés' }
    }
    if (path === '/old-page') {
      return { action: 'rewrite', to: '/new-page', reason: 'URL mise à jour' }
    }
    return { action: 'next', to: path, reason: 'Continuer' }
  }

  const result = getMiddlewareResult(requestPath)

  return (
    <div className="slide">
      <div className="slide-content">
        {/* Header */}
        <div className="slide-header">
          <div className={`slide-badge ${isVisible ? 'animate-fadeInDown' : 'opacity-0'}`}>
            11 — Middleware
          </div>
          <h2 className={`text-display mb-4 ${isVisible ? 'animate-fadeInUp stagger-1' : 'opacity-0'}`}>
            Middleware Next.js
          </h2>
          <p className={`text-subtitle max-w-3xl ${isVisible ? 'animate-fadeInUp stagger-2' : 'opacity-0'}`}>
            Interceptez et modifiez les requêtes avant qu'elles n'atteignent vos pages.
            Authentification, redirections, A/B testing, et plus encore.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Code */}
          <div className={`${isVisible ? 'animate-fadeInLeft stagger-3' : 'opacity-0'}`}>
            <h3 className="text-title mb-4">middleware.ts</h3>
            
            <div className="code-window mb-4">
              <div className="code-header">
                <div className="code-dot red" />
                <div className="code-dot yellow" />
                <div className="code-dot green" />
                <span className="code-title">middleware.ts (racine du projet)</span>
              </div>
              <div className="code-body">
                <pre>{`import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // 🔐 Protection authentification
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('auth')
    if (!token) {
      return NextResponse.redirect(
        new URL('/login', request.url)
      )
    }
  }
  
  // 🔄 Rewrite (URL interne différente)
  if (pathname === '/old-page') {
    return NextResponse.rewrite(
      new URL('/new-page', request.url)
    )
  }
  
  // 📝 Ajouter des headers
  const response = NextResponse.next()
  response.headers.set('x-custom', 'value')
  
  return response
}

// Configurer les routes matchées
export const config = {
  matcher: [
    '/admin/:path*',
    '/api/:path*',
    '/((?!_next/static|favicon.ico).*)',
  ],
}`}</pre>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <h4 className="font-medium text-sm mb-3">⚡ Edge Runtime</h4>
              <p className="text-xs text-gray-600 mb-3">
                Le middleware s'exécute sur l'Edge Runtime — 
                léger, rapide, limité (pas de Node.js APIs).
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">fetch</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">crypto</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Headers</span>
                <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs line-through">fs</span>
                <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs line-through">path</span>
              </div>
            </div>
          </div>

          {/* Demo Interactive */}
          <div className={`${isVisible ? 'animate-fadeInRight stagger-4' : 'opacity-0'}`}>
            <h3 className="text-title mb-4">Simulateur de Middleware</h3>
            
            <div className="space-y-3 mb-4">
              <p className="text-sm text-gray-600">Testez différentes URLs :</p>
              <div className="flex flex-wrap gap-2">
                {['/dashboard', '/admin/users', '/api/data', '/old-page'].map((path) => (
                  <button
                    key={path}
                    onClick={() => setRequestPath(path)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-mono transition-all ${
                      requestPath === path 
                        ? 'bg-black text-white' 
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    data-hover="true"
                  >
                    {path}
                  </button>
                ))}
              </div>
            </div>

            <div className="browser mb-4">
              <div className="browser-header">
                <div className="browser-dots">
                  <div className="code-dot red" />
                  <div className="code-dot yellow" />
                  <div className="code-dot green" />
                </div>
                <div className="browser-url">localhost:3000{requestPath}</div>
              </div>
              <div className="browser-body !p-0">
                {/* Flow visualization */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-lg">
                      📨
                    </div>
                    <div>
                      <div className="font-medium text-sm">Requête entrante</div>
                      <div className="text-xs text-gray-500 font-mono">{requestPath}</div>
                    </div>
                  </div>

                  <div className="border-l-2 border-gray-300 ml-5 pl-6 py-2">
                    <div className="text-xs text-gray-500">⚙️ Middleware s'exécute...</div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      result.action === 'redirect' ? 'bg-red-100' :
                      result.action === 'rewrite' ? 'bg-yellow-100' :
                      result.action === 'header' ? 'bg-purple-100' :
                      'bg-green-100'
                    }`}>
                      {result.action === 'redirect' && <Icons.cornerDownRight className="w-5 h-5 text-red-600" />}
                      {result.action === 'rewrite' && <Icons.refresh className="w-5 h-5 text-yellow-600" />}
                      {result.action === 'header' && <Icons.code className="w-5 h-5 text-purple-600" />}
                      {result.action === 'next' && <Icons.check className="w-5 h-5 text-green-600" />}
                    </div>
                    <div>
                      <div className="font-medium text-sm capitalize">{result.action}</div>
                      <div className="text-xs text-gray-500">{result.reason}</div>
                      {result.action !== 'next' && (
                        <div className="text-xs text-gray-400 font-mono">→ {result.to}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-title mb-4">Cas d'usage</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center mb-2">
                  <Icons.lock className="w-4 h-4" />
                </div>
                <h4 className="font-medium text-sm">Auth</h4>
                <p className="text-xs text-gray-500">Protection des routes</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center mb-2">
                  <Icons.globe className="w-4 h-4" />
                </div>
                <h4 className="font-medium text-sm">i18n</h4>
                <p className="text-xs text-gray-500">Détection de langue</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center mb-2">
                  <Icons.terminal className="w-4 h-4" />
                </div>
                <h4 className="font-medium text-sm">A/B Test</h4>
                <p className="text-xs text-gray-500">Feature flags</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center mb-2">
                  <Icons.activity className="w-4 h-4" />
                </div>
                <h4 className="font-medium text-sm">Analytics</h4>
                <p className="text-xs text-gray-500">Tracking précoce</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
