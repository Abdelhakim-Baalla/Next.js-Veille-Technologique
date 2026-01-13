export default function MarketingPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      <div className="space-y-12">
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold tracking-tight gradient-text-strong">
            Marketing
          </h1>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
            Cette page démontre l'organisation avec un layout dédié
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="glass-strong p-8 rounded-xl border border-border card-hover">
            <h3 className="text-xl font-bold mb-4">Organisation</h3>
            <p className="text-foreground/60">
              Les layouts permettent d'organiser le code de manière logique
            </p>
          </div>

          <div className="glass-strong p-8 rounded-xl border border-border card-hover">
            <h3 className="text-xl font-bold mb-4">Layouts</h3>
            <p className="text-foreground/60">
              Chaque section peut avoir son propre layout partagé
            </p>
          </div>

          <div className="glass-strong p-8 rounded-xl border border-border card-hover">
            <h3 className="text-xl font-bold mb-4">Séparation</h3>
            <p className="text-foreground/60">
              Séparation logique entre différentes sections de l'application
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
