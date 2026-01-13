import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="glass-strong sticky top-0 z-50 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold gradient-text">Next.js Routing Masterclass</h1>
            <div className="flex gap-4">
              <Link
                href="/presentation"
                className="text-foreground/70 hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-accent/50"
              >
                Présentation
              </Link>
              <Link
                href="/marketing"
                className="text-foreground/70 hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-accent/50"
              >
                Marketing
              </Link>
              <Link
                href="/dashboard"
                className="text-foreground/70 hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-accent/50"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="space-y-12 animate-fade-in">
          <div className="text-center space-y-6">
            <h2 className="text-6xl md:text-7xl font-light tracking-tight">
              Concepts Avancés
              <span className="block mt-2 gradient-text">du Routage Next.js 15</span>
            </h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
              Démonstration complète et pédagogique des fonctionnalités de routage
            </p>
            <div className="flex gap-4 justify-center pt-6">
              <Link
                href="/presentation"
                className="px-8 py-4 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-all glow hover:glow-strong font-medium"
              >
                Voir la Présentation
              </Link>
              <Link
                href="/dashboard"
                className="px-8 py-4 border border-border rounded-lg hover:bg-accent/50 transition-all font-medium"
              >
                Explorer la Démo
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            <Link
              href="/marketing"
              className="glass-strong p-8 rounded-xl border border-border card-hover group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  📁
                </div>
                <h3 className="text-2xl font-semibold">Route Groups</h3>
              </div>
              <p className="text-foreground/60 leading-relaxed">
                Organisation du code avec des groupes de routes sans affecter l'URL. 
                Parfait pour séparer les sections marketing et dashboard.
              </p>
              <div className="mt-4 text-primary text-sm font-medium">
                Explorer →
              </div>
            </Link>

            <Link
              href="/dashboard"
              className="glass-strong p-8 rounded-xl border border-border card-hover group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  ⚡
                </div>
                <h3 className="text-2xl font-semibold">Parallel Routes</h3>
              </div>
              <p className="text-foreground/60 leading-relaxed">
                Rendu simultané de plusieurs routes avec des slots (@analytics, @team). 
                Chaque slot charge indépendamment avec son propre loading.
              </p>
              <div className="mt-4 text-primary text-sm font-medium">
                Explorer →
              </div>
            </Link>

            <Link
              href="/dashboard/photos"
              className="glass-strong p-8 rounded-xl border border-border card-hover group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  🎯
                </div>
                <h3 className="text-2xl font-semibold">Intercepting Routes</h3>
              </div>
              <p className="text-foreground/60 leading-relaxed">
                Modales de prévisualisation sans perdre le contexte. 
                La galerie reste visible en arrière-plan lors de la navigation.
              </p>
              <div className="mt-4 text-primary text-sm font-medium">
                Explorer →
              </div>
            </Link>

            <Link
              href="/dashboard"
              className="glass-strong p-8 rounded-xl border border-border card-hover group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  🔄
                </div>
                <h3 className="text-2xl font-semibold">Streaming & Error Boundaries</h3>
              </div>
              <p className="text-foreground/60 leading-relaxed">
                Chargement progressif avec Skeleton Screens et gestion d'erreurs granulaires. 
                Chaque segment a son propre loading.tsx et error.tsx.
              </p>
              <div className="mt-4 text-primary text-sm font-medium">
                Explorer →
              </div>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            {[
              { label: 'Route Groups', value: '2' },
              { label: 'Parallel Slots', value: '2' },
              { label: 'Intercepting Routes', value: '1' },
              { label: 'Server Actions', value: '1' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="glass p-6 rounded-xl border border-border text-center"
              >
                <div className="text-4xl font-light mb-2 gradient-text">{stat.value}</div>
                <div className="text-sm text-foreground/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
