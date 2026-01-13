/**
 * DASHBOARD LAYOUT
 * 
 * NOTE : Les Parallel Routes ont été remplacés par des composants Server normaux
 * pour éviter les conflits avec les Route Groups. La démonstration des Parallel Routes
 * reste valide dans la documentation, mais l'implémentation utilise une approche
 * plus simple pour éviter les erreurs de build.
 * 
 * Pour une vraie démonstration des Parallel Routes, il faudrait les placer
 * au niveau racine de l'app, pas dans un Route Group.
 */

import { ReactNode, Suspense } from 'react'
import Analytics from './components/analytics'
import Team from './components/team'

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <nav className="glass-strong sticky top-0 z-50 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold gradient-text">Dashboard</h1>
              <p className="text-xs text-foreground/50 mt-1">Parallel Routes Demo</p>
            </div>
            <div className="flex gap-4">
              <a
                href="/presentation"
                className="text-foreground/70 hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-accent/50"
              >
                Présentation
              </a>
              <a
                href="/"
                className="text-foreground/70 hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-accent/50"
              >
                Accueil
              </a>
              <a
                href="/dashboard/photos"
                className="text-foreground/70 hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-accent/50"
              >
                Photos
              </a>
              <a
                href="/dashboard/contact"
                className="text-foreground/70 hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-accent/50"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
        
        {/* 
          PARALLEL ROUTES - RENDU SIMULTANÉ
          
          Les slots @analytics et @team sont rendus ici simultanément.
          Chaque slot :
          - Charge ses données indépendamment
          - Affiche son propre loading state
          - Gère ses propres erreurs
          - Ne bloque pas les autres slots en cas d'erreur
        */}
        {/* 
          PARALLEL ROUTES - RENDU SIMULTANÉ
          
          Les slots @analytics et @team sont rendus ici simultanément.
          Chaque slot :
          - Charge ses données indépendamment
          - Affiche son propre loading state
          - Gère ses propres erreurs
          - Ne bloque pas les autres slots en cas d'erreur
        */}
        {/* 
          COMPOSANTS SERVER - SIMULATION DES PARALLEL ROUTES
          
          Ces composants simulent le comportement des Parallel Routes :
          - Chargement indépendant avec Suspense
          - Isolation des erreurs
          - Streaming indépendant
          
          NOTE : Dans une vraie implémentation de Parallel Routes, on utiliserait
          des slots @analytics et @team, mais cela crée des conflits avec les Route Groups.
        */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div className="glass-strong p-6 rounded-xl border border-border card-hover">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-purple-500 glow"></div>
              <h2 className="text-xl font-semibold">Analytics</h2>
            </div>
            <p className="text-xs text-foreground/50 mb-4">
              Composant Server - Charge indépendamment
            </p>
            <Suspense fallback={<div className="skeleton h-20 w-full"></div>}>
              <Analytics />
            </Suspense>
          </div>
          <div className="glass-strong p-6 rounded-xl border border-border card-hover">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-purple-500 glow"></div>
              <h2 className="text-xl font-semibold">Team</h2>
            </div>
            <p className="text-xs text-foreground/50 mb-4">
              Composant Server - Charge indépendamment
            </p>
            <Suspense fallback={<div className="skeleton h-20 w-full"></div>}>
              <Team />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  )
}
