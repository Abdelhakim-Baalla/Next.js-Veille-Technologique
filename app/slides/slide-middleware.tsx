'use client'

import { useEffect, useState } from 'react'

export function SlideMiddleware() {
  const [isVisible, setIsVisible] = useState(false)
  const [requestPath, setRequestPath] = useState('/dashboard')
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const getMiddlewareResult = () => {
    if (requestPath.startsWith('/api')) {
      return { action: 'PASS', color: 'green', message: 'API Route - Continue' }
    }
    if (requestPath.startsWith('/dashboard') && !isAuthenticated) {
      return { action: 'REDIRECT', color: 'orange', message: 'Redirect → /login' }
    }
    if (requestPath === '/old-page') {
      return { action: 'REWRITE', color: 'blue', message: 'Rewrite → /new-page' }
    }
    return { action: 'NEXT', color: 'green', message: 'NextResponse.next()' }
  }

  const result = getMiddlewareResult()

  return (
    <div className="h-full flex items-center justify-center px-8 py-20">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className={`mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white rounded-full text-xs font-mono mb-4">
            12 / Middleware
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Middleware
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl">
            Interceptez et modifiez les requêtes avant qu'elles n'atteignent vos routes
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Interactive Demo */}
          <div className={`transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="bg-gray-100 rounded-2xl p-6 mb-4">
              <h3 className="font-semibold mb-4">Simulateur de Middleware</h3>
              
              {/* Request Path */}
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-2">Path de la requête</label>
                <div className="flex gap-2 flex-wrap">
                  {['/dashboard', '/api/users', '/old-page', '/about'].map((path) => (
                    <button
                      key={path}
                      onClick={() => setRequestPath(path)}
                      className={`px-3 py-2 rounded-lg text-sm font-mono transition-all ${
                        requestPath === path
                          ? 'bg-black text-white'
                          : 'bg-white hover:bg-gray-50'
                      }`}
                    >
                      {path}
                    </button>
                  ))}
                </div>
              </div>

              {/* Auth Toggle */}
              <div className="mb-6">
                <label className="flex items-center gap-3">
                  <button
                    onClick={() => setIsAuthenticated(!isAuthenticated)}
                    className={`w-12 h-6 rounded-full transition-all ${
                      isAuthenticated ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`block w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                      isAuthenticated ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                  <span className="text-sm">
                    {isAuthenticated ? 'Authentifié ✓' : 'Non authentifié'}
                  </span>
                </label>
              </div>

              {/* Flow Visualization */}
              <div className="bg-white rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2 mx-auto">
                      🌐
                    </div>
                    <div className="text-xs font-mono">{requestPath}</div>
                  </div>
                  
                  <div className="flex-1 px-4">
                    <div className="h-0.5 bg-gray-200 relative">
                      <div className={`absolute inset-y-0 left-0 bg-${result.color}-500 transition-all duration-500`} style={{ width: '100%' }} />
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 mx-auto ${
                      result.action === 'REDIRECT' ? 'bg-orange-100' :
                      result.action === 'REWRITE' ? 'bg-blue-100' : 'bg-green-100'
                    }`}>
                      {result.action === 'REDIRECT' ? '↩️' :
                       result.action === 'REWRITE' ? '🔄' : '✅'}
                    </div>
                    <div className={`text-xs font-mono ${
                      result.action === 'REDIRECT' ? 'text-orange-600' :
                      result.action === 'REWRITE' ? 'text-blue-600' : 'text-green-600'
                    }`}>
                      {result.message}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Use Cases */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-blue-50 rounded-xl">
                <div className="text-xl mb-1">🔐</div>
                <h4 className="font-semibold text-sm">Authentication</h4>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl">
                <div className="text-xl mb-1">🌍</div>
                <h4 className="font-semibold text-sm">i18n / Locale</h4>
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
                <div className="text-xl mb-1">📝</div>
                <h4 className="font-semibold text-sm">Logging</h4>
              </div>
              <div className="p-3 bg-orange-50 rounded-xl">
                <div className="text-xl mb-1">🚦</div>
                <h4 className="font-semibold text-sm">Rate Limiting</h4>
              </div>
            </div>
          </div>

          {/* Code Example */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="bg-gray-900 rounded-2xl p-6 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-gray-400 text-sm font-mono">middleware.ts</span>
              </div>
              
              <pre className="text-xs font-mono text-gray-100 overflow-x-auto">
{`// middleware.ts (à la racine du projet!)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // 🔐 Protection des routes dashboard
  if (pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('auth-token')
    
    if (!token) {
      return NextResponse.redirect(
        new URL('/login', request.url)
      )
    }
  }
  
  // 🔄 Réécriture d'URL (invisible pour l'user)
  if (pathname === '/old-page') {
    return NextResponse.rewrite(
      new URL('/new-page', request.url)
    )
  }
  
  // ✅ Continuer normalement
  return NextResponse.next()
}

// Configurer les routes concernées
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/old-page',
    // Exclure les fichiers statiques
    '/((?!_next/static|favicon.ico).*)',
  ],
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className={`mt-6 grid md:grid-cols-2 gap-4 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-sm text-red-800">
              <strong>⚠️ Emplacement:</strong> Le fichier <code className="bg-red-200 px-1 rounded">middleware.ts</code> doit être à la racine du projet (même niveau que app/)
            </p>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-sm text-blue-800">
              <strong>⚡ Edge Runtime:</strong> Le middleware s'exécute à la périphérie (Edge) pour une latence minimale
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
