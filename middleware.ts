/**
 * MIDDLEWARE - Next.js 15
 * 
 * CONCEPT CLÉ : Middleware
 * 
 * Le Middleware s'exécute AVANT chaque requête et permet de :
 * - Protéger des routes (authentification)
 * - Rediriger des utilisateurs
 * - Modifier les headers
 * - Réécrire les URLs
 * 
 * CARACTÉRISTIQUES :
 * 1. S'exécute sur Edge Runtime (rapide, proche de l'utilisateur)
 * 2. S'exécute AVANT le rendu (pas d'accès aux composants React)
 * 3. Peut accéder aux cookies, headers, query params
 * 4. Peut rediriger ou réécrire les requêtes
 * 
 * EXÉCUTION :
 * - S'exécute pour chaque requête correspondant au matcher
 * - Peut être utilisé pour protéger des routes
 * - Peut être utilisé pour A/B testing, analytics, etc.
 * 
 * CONFIGURATION :
 * - matcher : Définit quelles routes déclenchent le middleware
 * - Patterns supportés : /dashboard/:path*, /api/:path*, etc.
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  /**
   * PROTECTION DES ROUTES DASHBOARD
   * 
   * Cette logique :
   * 1. Vérifie si la route commence par /dashboard
   * 2. Vérifie la présence d'un cookie de session
   * 3. Redirige vers /login si non authentifié
   * 4. Préserve l'URL de destination avec le paramètre redirect
   */
  if (pathname.startsWith('/dashboard')) {
    // Vérifier la présence du cookie de session
    const sessionCookie = request.cookies.get('session')
    
    // Si pas de session, rediriger vers la page de login
    if (!sessionCookie) {
      const loginUrl = new URL('/login', request.url)
      // Préserver l'URL de destination pour rediriger après login
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }
  
  // Si tout est OK, continuer la requête normalement
  return NextResponse.next()
}

/**
 * CONFIGURATION DU MIDDLEWARE
 * 
 * matcher : Définit les routes qui déclenchent le middleware
 * - /dashboard/:path* : Toutes les routes sous /dashboard
 * - Patterns supportés : *, ?, :param, etc.
 * 
 * EXEMPLE D'AUTRES USAGES :
 * - Analytics : Tracker les visites
 * - A/B Testing : Servir différentes versions
 * - Internationalisation : Rediriger selon la langue
 * - Rate Limiting : Limiter les requêtes
 */
export const config = {
  matcher: [
    '/dashboard/:path*', // Toutes les routes dashboard
    // '/api/:path*',    // Exemple : Protéger les API routes
  ],
}
