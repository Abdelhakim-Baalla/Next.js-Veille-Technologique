export default function Slide2() {
  return (
    <div className="space-y-8 animate-slide-up">
      <div className="text-center space-y-4">
        <div className="inline-block px-6 py-3 bg-purple-500/20 text-purple-400 rounded-full text-sm font-semibold">
          Objectifs
        </div>
        <h2 className="text-6xl font-bold gradient-text">Objectifs de la Veille</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {[
          {
            icon: '📐',
            title: 'Architecture App Router',
            desc: 'Comprendre layout.tsx, template.tsx, page.tsx',
            color: 'from-blue-500/20 to-cyan-500/20',
          },
          {
            icon: '🎯',
            title: 'Patterns UI Avancés',
            desc: 'Parallel Routes et Intercepting Routes',
            color: 'from-purple-500/20 to-pink-500/20',
          },
          {
            icon: '⚡',
            title: 'Gestion Granulaire',
            desc: 'États de chargement et d\'erreur',
            color: 'from-yellow-500/20 to-orange-500/20',
          },
          {
            icon: '🚀',
            title: 'Optimisation',
            desc: 'Server Actions et Middleware',
            color: 'from-green-500/20 to-emerald-500/20',
          },
          {
            icon: '🔄',
            title: 'Server vs Client',
            desc: 'Distinguer les composants',
            color: 'from-indigo-500/20 to-blue-500/20',
          },
        ].map((obj, idx) => (
          <div
            key={idx}
            className={`glass-strong p-8 rounded-2xl border border-border card-hover bg-gradient-to-br ${obj.color} animate-fade-in`}
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className="text-5xl mb-4">{obj.icon}</div>
            <h3 className="text-2xl font-bold mb-2">{obj.title}</h3>
            <p className="text-foreground/70">{obj.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
