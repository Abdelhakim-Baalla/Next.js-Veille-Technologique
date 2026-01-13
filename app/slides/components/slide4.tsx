export default function Slide4() {
  return (
    <div className="space-y-8 animate-slide-up">
      <div className="text-center space-y-4">
        <div className="inline-block px-6 py-3 bg-purple-500/20 text-purple-400 rounded-full text-sm font-semibold">
          Concept 2
        </div>
        <h2 className="text-6xl font-bold gradient-text">Route Groups</h2>
        <p className="text-2xl text-foreground/60 font-light">
          Organisation sans affecter l'URL
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="glass-strong p-8 rounded-2xl border border-border">
          <div className="font-mono text-sm text-primary mb-4">Syntaxe</div>
          <div className="space-y-3 text-lg">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📁</span>
              <code className="px-3 py-1 bg-accent rounded">(marketing)/</code>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">📁</span>
              <code className="px-3 py-1 bg-accent rounded">(dashboard)/</code>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-border">
            <div className="text-sm text-foreground/60 mb-2">Les parenthèses</div>
            <div className="text-xl font-bold">n'apparaissent pas dans l'URL</div>
          </div>
        </div>

        <div className="glass-strong p-8 rounded-2xl border border-border">
          <div className="font-mono text-sm text-primary mb-4">Exemple</div>
          <div className="space-y-4">
            <div>
              <div className="text-sm text-foreground/60 mb-1">Structure</div>
              <code className="block px-4 py-2 bg-accent rounded text-sm">
                app/(dashboard)/page.tsx
              </code>
            </div>
            <div className="text-2xl text-center my-4">↓</div>
            <div>
              <div className="text-sm text-foreground/60 mb-1">URL</div>
              <code className="block px-4 py-2 bg-primary/20 text-primary rounded text-sm">
                /dashboard
              </code>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 glass-strong p-6 rounded-xl border border-border">
        <div className="flex items-center gap-4">
          <div className="text-4xl">✨</div>
          <div>
            <div className="font-semibold text-lg mb-1">Avantages</div>
            <div className="text-foreground/70">
              Organisation logique • Layouts différents • Séparation du code
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
