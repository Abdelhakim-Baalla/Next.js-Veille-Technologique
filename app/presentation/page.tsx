/**
 * PAGE DE PRÉSENTATION PÉDAGOGIQUE
 * 
 * Cette page sert de support visuel pour expliquer les concepts avancés
 * du routage Next.js 15 à vos camarades de classe.
 * 
 * Objectifs pédagogiques :
 * 1. Maîtriser l'architecture App Router (layout.tsx, template.tsx, page.tsx)
 * 2. Comprendre les Parallel Routes et Intercepting Routes
 * 3. Gérer les états de chargement et d'erreur de manière granulaire
 * 4. Optimiser avec Server Actions et Middleware
 * 5. Distinguer Server vs Client Components
 */

import Link from 'next/link'
import ConceptCard from './components/concept-card'
import ArchitectureDiagram from './components/architecture-diagram'
import CodeExample from './components/code-example'

export default function PresentationPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="glass-strong sticky top-0 z-50 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold gradient-text">
              Next.js Routing Masterclass
            </h1>
            <div className="flex gap-4">
              <Link
                href="/"
                className="text-foreground/70 hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-accent/50"
              >
                Accueil
              </Link>
              <Link
                href="/dashboard"
                className="text-foreground/70 hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-accent/50"
              >
                Démo
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center space-y-8 mb-20 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-light tracking-tight">
              Next.js 15
              <span className="block mt-2 gradient-text">App Router</span>
            </h1>
            <p className="text-2xl text-foreground/60 max-w-3xl mx-auto font-light">
              Maîtrisez l'architecture de routage la plus avancée de Next.js
            </p>
          </div>
          
          <div className="flex gap-4 justify-center pt-8">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-all glow hover:glow-strong font-medium"
            >
              Explorer la Démo
            </Link>
            <Link
              href="#concepts"
              className="px-8 py-4 border border-border rounded-lg hover:bg-accent/50 transition-all font-medium"
            >
              Voir les Concepts
            </Link>
          </div>
        </section>

        {/* Objectifs de la Veille */}
        <section id="objectifs" className="mb-20 animate-slide-in">
          <h2 className="text-4xl font-light mb-8 text-center">Objectifs de la Veille</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Architecture App Router',
                description: 'Comprendre la hiérarchie layout.tsx, template.tsx, page.tsx',
                icon: '📐',
                color: 'from-blue-500/20 to-cyan-500/20',
              },
              {
                title: 'Patterns UI Avancés',
                description: 'Parallel Routes et Intercepting Routes',
                icon: '🎯',
                color: 'from-purple-500/20 to-pink-500/20',
              },
              {
                title: 'Gestion Granulaire',
                description: 'États de chargement et d\'erreur (loading.tsx, error.tsx)',
                icon: '⚡',
                color: 'from-yellow-500/20 to-orange-500/20',
              },
              {
                title: 'Optimisation Navigation',
                description: 'Server Actions et Middleware',
                icon: '🚀',
                color: 'from-green-500/20 to-emerald-500/20',
              },
              {
                title: 'Server vs Client',
                description: 'Distinguer les composants dans le contexte du routing',
                icon: '🔄',
                color: 'from-indigo-500/20 to-blue-500/20',
              },
            ].map((obj, idx) => (
              <div
                key={idx}
                className={`glass p-6 rounded-xl border border-border card-hover bg-gradient-to-br ${obj.color}`}
              >
                <div className="text-4xl mb-4">{obj.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{obj.title}</h3>
                <p className="text-foreground/60 text-sm">{obj.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Concepts Principaux */}
        <section id="concepts" className="mb-20 space-y-12">
          <h2 className="text-4xl font-light text-center mb-12">Concepts Clés</h2>
          
          <ConceptCard
            title="1. Architecture App Router"
            subtitle="La hiérarchie fondamentale"
            description="L'App Router de Next.js 15 utilise une structure de fichiers spécifique pour définir les routes et les layouts."
            details={[
              "layout.tsx : Définit le layout partagé pour un segment et ses enfants",
              "template.tsx : Similaire à layout mais recrée les composants à chaque navigation",
              "page.tsx : Composant unique qui rend la page pour cette route",
              "loading.tsx : UI de chargement pendant le streaming",
              "error.tsx : Error Boundary pour gérer les erreurs",
            ]}
            codeExample={`// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <nav>Navigation</nav>
      {children}
    </div>
  )
}`}
            demoLink="/dashboard"
          />

          <ConceptCard
            title="2. Route Groups"
            subtitle="Organisation sans affecter l'URL"
            description="Les Route Groups permettent d'organiser les routes en groupes logiques sans modifier l'URL."
            details={[
              "Syntaxe : (nom-du-groupe) avec parenthèses",
              "N'apparaît pas dans l'URL finale",
              "Permet d'avoir des layouts différents pour différentes sections",
              "Exemple : (marketing) et (dashboard)",
            ]}
            codeExample={`// Structure
app/
  (marketing)/
    layout.tsx    // Layout pour marketing
    page.tsx      // Accessible via /marketing
  (dashboard)/
    layout.tsx    // Layout pour dashboard
    page.tsx      // Accessible via /dashboard`}
            demoLink="/marketing"
            reverse
          />

          <ConceptCard
            title="3. Parallel Routes"
            subtitle="Rendu simultané de plusieurs routes"
            description="Les Parallel Routes permettent de rendre plusieurs pages en même temps dans le même layout."
            details={[
              "Syntaxe : @nom-du-slot pour créer un slot",
              "Chaque slot peut avoir son propre loading.tsx et error.tsx",
              "Rendu simultané et indépendant",
              "default.tsx pour gérer les cas où un slot n'existe pas",
            ]}
            codeExample={`// app/dashboard/layout.tsx
export default function Layout({
  children,
  analytics,  // Slot @analytics
  team,      // Slot @team
}: {
  children: React.ReactNode
  analytics: React.ReactNode
  team: React.ReactNode
}) {
  return (
    <>
      {children}
      {analytics}
      {team}
    </>
  )
}`}
            demoLink="/dashboard"
          />

          <ConceptCard
            title="4. Intercepting Routes"
            subtitle="Intercepter les routes pour des modales"
            description="Les Intercepting Routes permettent d'intercepter une route et d'afficher une modale tout en gardant le contexte."
            details={[
              "Syntaxe : (.) pour intercepter au même niveau",
              "Utile pour les modales et les prévisualisations",
              "La route originale reste accessible",
              "Parfait pour les UX modernes",
            ]}
            codeExample={`// Structure
app/
  photos/
    [id]/
      page.tsx           // Route normale
    (.)photo/            // Intercepting route
      [id]/
        page.tsx         // Modale`}
            demoLink="/dashboard/photos"
            reverse
          />

          <ConceptCard
            title="5. Streaming & Loading States"
            subtitle="Chargement progressif avec Skeleton Screens"
            description="Next.js 15 permet le streaming de données avec des états de chargement granulaires."
            details={[
              "loading.tsx : Affiche un UI pendant le chargement",
              "Skeleton Screens : Placeholders animés",
              "Streaming : Chargement progressif des données",
              "Meilleure UX avec feedback visuel immédiat",
            ]}
            codeExample={`// app/dashboard/loading.tsx
export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-accent rounded w-1/2 mb-4" />
      <div className="h-4 bg-accent rounded w-full" />
    </div>
  )
}`}
            demoLink="/dashboard"
          />

          <ConceptCard
            title="6. Error Boundaries"
            subtitle="Gestion d'erreurs granulaires"
            description="Les Error Boundaries permettent de gérer les erreurs de manière granulaire à chaque niveau de route."
            details={[
              "error.tsx : Client Component obligatoire",
              "Fonction reset() : Permet de réessayer",
              "Isolation : Erreur limitée au segment concerné",
              "Meilleure résilience de l'application",
            ]}
            codeExample={`// app/dashboard/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div>
      <h2>Une erreur est survenue</h2>
      <button onClick={reset}>Réessayer</button>
    </div>
  )
}`}
            demoLink="/dashboard"
            reverse
          />

          <ConceptCard
            title="7. Server Actions"
            subtitle="Actions côté serveur avec revalidation"
            description="Les Server Actions permettent d'exécuter du code côté serveur directement depuis les composants clients."
            details={[
              "Directive 'use server' : Marque une fonction comme Server Action",
              "Revalidation : revalidatePath() pour mettre à jour le cache",
              "Pas besoin d'API Routes",
              "Type-safe avec TypeScript",
            ]}
            codeExample={`// app/actions.ts
'use server'

import { revalidatePath } from 'next/cache'

export async function submitForm(data: FormData) {
  // Traitement...
  revalidatePath('/dashboard')
  return { success: true }
}`}
            demoLink="/dashboard/contact"
          />

          <ConceptCard
            title="8. Middleware"
            subtitle="Protection et redirection de routes"
            description="Le Middleware s'exécute avant chaque requête et permet de protéger des routes ou de rediriger."
            details={[
              "Exécution avant le rendu",
              "Accès aux cookies et headers",
              "Redirection conditionnelle",
              "Protection d'authentification",
            ]}
            codeExample={`// middleware.ts
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  if (!request.cookies.get('session')) {
    return NextResponse.redirect('/login')
  }
  return NextResponse.next()
}`}
            demoLink="/dashboard"
            reverse
          />
        </section>

        {/* Architecture Diagram */}
        <section className="mb-20">
          <h2 className="text-4xl font-light text-center mb-12">Architecture de l'Application</h2>
          <ArchitectureDiagram />
        </section>

        {/* Server vs Client Components */}
        <section className="mb-20">
          <h2 className="text-4xl font-light text-center mb-12">Server vs Client Components</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass-strong p-8 rounded-xl border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-green-500 glow"></div>
                <h3 className="text-2xl font-semibold">Server Components</h3>
              </div>
              <ul className="space-y-3 text-foreground/70">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Rendu sur le serveur (par défaut)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Accès direct aux données (fetch, DB)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Pas de JavaScript côté client</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Meilleures performances</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Pas d'état local, pas d'effets</span>
                </li>
              </ul>
            </div>

            <div className="glass-strong p-8 rounded-xl border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-blue-500 glow"></div>
                <h3 className="text-2xl font-semibold">Client Components</h3>
              </div>
              <ul className="space-y-3 text-foreground/70">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">✓</span>
                  <span>Directive 'use client' obligatoire</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">✓</span>
                  <span>Interactivité (onClick, useState, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">✓</span>
                  <span>Hooks React (useState, useEffect)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">✓</span>
                  <span>Event listeners et formulaires</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">✓</span>
                  <span>JavaScript envoyé au client</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center space-y-8 py-20">
          <h2 className="text-4xl font-light">Prêt à Explorer ?</h2>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
            Testez tous ces concepts en action dans notre application de démonstration
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/dashboard"
              className="inline-block px-12 py-4 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-all glow hover:glow-strong font-semibold text-lg"
            >
              Démarrer la Démonstration
            </Link>
            <a
              href="/PRESENTATION_GUIDE.md"
              target="_blank"
              className="inline-block px-12 py-4 border border-border rounded-lg hover:bg-accent/50 transition-all font-semibold text-lg"
            >
              📖 Guide Complet
            </a>
          </div>
          <p className="text-sm text-foreground/50 mt-8">
            Consultez le fichier <code className="px-2 py-1 bg-accent rounded text-xs">PRESENTATION_GUIDE.md</code> pour un guide détaillé de présentation
          </p>
        </section>
      </main>
    </div>
  )
}
