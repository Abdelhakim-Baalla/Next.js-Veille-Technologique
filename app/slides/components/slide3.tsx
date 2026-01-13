export default function Slide3() {
  return (
    <div className="space-y-8 animate-slide-up">
      <div className="text-center space-y-4">
        <div className="inline-block px-6 py-3 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold">
          Concept 1
        </div>
        <h2 className="text-6xl font-bold gradient-text">Architecture App Router</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {[
          {
            file: 'layout.tsx',
            title: 'Layout',
            desc: 'Définit le layout partagé pour un segment et ses enfants',
            icon: '📋',
            color: 'border-blue-500/30 bg-blue-500/10',
          },
          {
            file: 'template.tsx',
            title: 'Template',
            desc: 'Recrée les composants à chaque navigation',
            icon: '🎨',
            color: 'border-purple-500/30 bg-purple-500/10',
          },
          {
            file: 'page.tsx',
            title: 'Page',
            desc: 'Composant unique qui rend la page pour cette route',
            icon: '📄',
            color: 'border-green-500/30 bg-green-500/10',
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className={`glass-strong p-8 rounded-2xl border-2 ${item.color} card-hover animate-scale-in`}
            style={{ animationDelay: `${idx * 0.15}s` }}
          >
            <div className="text-5xl mb-4">{item.icon}</div>
            <div className="font-mono text-sm text-primary mb-2">{item.file}</div>
            <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
            <p className="text-foreground/70 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 glass-strong p-6 rounded-xl border border-border">
        <div className="font-mono text-sm text-foreground/60 mb-2">Structure</div>
        <div className="text-lg font-semibold">
          app/ → layout.tsx → template.tsx → page.tsx
        </div>
      </div>
    </div>
  )
}
