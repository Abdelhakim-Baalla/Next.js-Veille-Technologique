export default function Slide7() {
  return (
    <div className="space-y-8 animate-slide-up">
      <div className="text-center space-y-4">
        <div className="inline-block px-6 py-3 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-semibold">
          Concept 5
        </div>
        <h2 className="text-6xl font-bold gradient-text">Streaming & Loading</h2>
        <p className="text-2xl text-foreground/60 font-light">
          Chargement progressif avec Skeleton Screens
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="glass-strong p-8 rounded-2xl border border-border">
          <div className="font-mono text-sm text-primary mb-4">loading.tsx</div>
          <pre className="bg-accent p-4 rounded-lg text-sm overflow-x-auto">
{`export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-accent 
           rounded w-1/2 mb-4" />
      <div className="h-4 bg-accent 
           rounded w-full" />
    </div>
  )
}`}
          </pre>
        </div>

        <div className="glass-strong p-8 rounded-2xl border border-border">
          <div className="font-mono text-sm text-primary mb-4">Avantages</div>
          <div className="space-y-4">
            {[
              { icon: '⚡', text: 'Feedback visuel immédiat' },
              { icon: '📊', text: 'Streaming progressif' },
              { icon: '🎨', text: 'Skeleton Screens animés' },
              { icon: '🔄', text: 'Chargement granulaire' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-foreground/70">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 glass-strong p-8 rounded-2xl border border-border">
        <div className="flex items-center gap-6">
          <div className="text-5xl">🔄</div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">Error Boundaries</h3>
            <p className="text-foreground/70 mb-4">
              Gestion d'erreurs granulaires avec error.tsx
            </p>
            <div className="flex gap-4">
              <div className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm font-mono">
                error.tsx
              </div>
              <div className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm font-mono">
                reset()
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
