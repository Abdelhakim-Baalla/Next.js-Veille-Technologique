export default function Slide6() {
  return (
    <div className="space-y-8 animate-slide-up">
      <div className="text-center space-y-4">
        <div className="inline-block px-6 py-3 bg-pink-500/20 text-pink-400 rounded-full text-sm font-semibold">
          Concept 4
        </div>
        <h2 className="text-6xl font-bold gradient-text">Intercepting Routes</h2>
        <p className="text-2xl text-foreground/60 font-light">
          Modales sans perdre le contexte
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="glass-strong p-8 rounded-2xl border border-border">
          <div className="font-mono text-sm text-primary mb-4">Syntaxe</div>
          <div className="space-y-3">
            <div>
              <code className="px-3 py-1 bg-accent rounded text-sm">(.)</code>
              <span className="ml-3 text-foreground/70">Même niveau</span>
            </div>
            <div>
              <code className="px-3 py-1 bg-accent rounded text-sm">(..)</code>
              <span className="ml-3 text-foreground/70">Un niveau au-dessus</span>
            </div>
            <div>
              <code className="px-3 py-1 bg-accent rounded text-sm">(...)</code>
              <span className="ml-3 text-foreground/70">Depuis la racine</span>
            </div>
          </div>
        </div>

        <div className="glass-strong p-8 rounded-2xl border border-border">
          <div className="font-mono text-sm text-primary mb-4">Exemple</div>
          <div className="space-y-3 text-sm">
            <div>
              <div className="text-foreground/60 mb-1">Route normale</div>
              <code className="block px-3 py-2 bg-accent rounded">
                photos/[id]/page.tsx
              </code>
            </div>
            <div className="text-center text-2xl">↓</div>
            <div>
              <div className="text-foreground/60 mb-1">Intercepting</div>
              <code className="block px-3 py-2 bg-pink-500/20 text-pink-400 rounded">
                (.)photo/[id]/page.tsx
              </code>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 glass-strong p-8 rounded-2xl border border-border">
        <div className="flex items-start gap-6">
          <div className="text-5xl">🎯</div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-3">Cas d'usage</h3>
            <ul className="space-y-2 text-foreground/70">
              <li className="flex items-center gap-2">
                <span className="text-primary">•</span>
                Prévisualisation d'images (Instagram, Twitter)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">•</span>
                Modales de détails sans perdre la liste
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">•</span>
                Navigation fluide avec contexte préservé
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
