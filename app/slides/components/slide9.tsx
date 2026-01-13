export default function Slide9() {
  return (
    <div className="space-y-8 animate-slide-up">
      <div className="text-center space-y-4">
        <div className="inline-block px-6 py-3 bg-indigo-500/20 text-indigo-400 rounded-full text-sm font-semibold">
          Comparaison
        </div>
        <h2 className="text-6xl font-bold gradient-text">Server vs Client</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="glass-strong p-8 rounded-2xl border-2 border-green-500/30">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-4 h-4 rounded-full bg-green-500 glow"></div>
            <h3 className="text-3xl font-bold">Server Components</h3>
          </div>
          <ul className="space-y-3 text-foreground/70">
            {[
              '✓ Rendu sur le serveur',
              '✓ Accès direct aux données',
              '✓ Pas de JavaScript client',
              '✓ Meilleures performances',
              '✗ Pas d\'état local',
              '✗ Pas d\'event handlers',
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-strong p-8 rounded-2xl border-2 border-blue-500/30">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-4 h-4 rounded-full bg-blue-500 glow"></div>
            <h3 className="text-3xl font-bold">Client Components</h3>
          </div>
          <ul className="space-y-3 text-foreground/70">
            {[
              '✓ Directive "use client"',
              '✓ Interactivité complète',
              '✓ Hooks React',
              '✓ Event listeners',
              '✗ JavaScript envoyé',
              '✗ Pas d\'accès direct DB',
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 text-center">
        <div className="glass-strong p-8 rounded-2xl border border-border inline-block">
          <div className="text-5xl mb-4">🎓</div>
          <h3 className="text-3xl font-bold mb-2">Merci pour votre attention !</h3>
          <p className="text-xl text-foreground/60">
            Questions ?
          </p>
        </div>
      </div>
    </div>
  )
}
