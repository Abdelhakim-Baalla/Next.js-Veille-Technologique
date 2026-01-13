export default function Slide5() {
  return (
    <div className="space-y-8 animate-slide-up">
      <div className="text-center space-y-4">
        <div className="inline-block px-6 py-3 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-semibold">
          Concept 3
        </div>
        <h2 className="text-6xl font-bold gradient-text">Parallel Routes</h2>
        <p className="text-2xl text-foreground/60 font-light">
          Rendu simultané de plusieurs routes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="glass-strong p-8 rounded-2xl border border-border">
          <div className="font-mono text-sm text-primary mb-4">Syntaxe</div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">@</span>
              <code className="px-3 py-1 bg-accent rounded text-lg">@analytics</code>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-3xl">@</span>
              <code className="px-3 py-1 bg-accent rounded text-lg">@team</code>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-border">
            <div className="text-sm text-foreground/60">Chaque slot charge</div>
            <div className="text-xl font-bold text-primary">indépendamment</div>
          </div>
        </div>

        <div className="glass-strong p-8 rounded-2xl border border-border">
          <div className="font-mono text-sm text-primary mb-4">Layout</div>
          <pre className="bg-accent p-4 rounded-lg text-sm overflow-x-auto">
{`export default function Layout({
  children,
  analytics,
  team,
}) {
  return (
    <>
      {children}
      {analytics}
      {team}
    </>
  )
}`}
          </pre>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-8">
        {[
          { icon: '⚡', text: 'Rendu simultané' },
          { icon: '🛡️', text: 'Isolation erreurs' },
          { icon: '📊', text: 'Streaming indépendant' },
        ].map((item, idx) => (
          <div
            key={idx}
            className="glass p-6 rounded-xl text-center card-hover"
          >
            <div className="text-4xl mb-2">{item.icon}</div>
            <div className="text-sm font-medium">{item.text}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
