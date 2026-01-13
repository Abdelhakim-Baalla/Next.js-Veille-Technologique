export default function Slide1() {
  return (
    <div className="text-center space-y-12 animate-slide-up">
      <div className="space-y-6">
        <div className="inline-block px-6 py-3 bg-primary/20 text-primary rounded-full text-sm font-semibold mb-4">
          Veille Technologique
        </div>
        <h1 className="text-7xl md:text-8xl font-bold gradient-text leading-tight">
          Next.js 15
          <span className="block mt-4 text-6xl md:text-7xl font-light">
            Routing Masterclass
          </span>
        </h1>
        <p className="text-2xl md:text-3xl text-foreground/60 font-light max-w-3xl mx-auto">
          Maîtrisez l'architecture de routage la plus avancée
        </p>
      </div>

      <div className="flex items-center justify-center gap-8 mt-16">
        <div className="glass-strong p-6 rounded-2xl border border-border/50 min-w-[200px]">
          <div className="text-4xl mb-2">📐</div>
          <div className="text-sm text-foreground/60">App Router</div>
        </div>
        <div className="glass-strong p-6 rounded-2xl border border-border/50 min-w-[200px]">
          <div className="text-4xl mb-2">⚡</div>
          <div className="text-sm text-foreground/60">Parallel Routes</div>
        </div>
        <div className="glass-strong p-6 rounded-2xl border border-border/50 min-w-[200px]">
          <div className="text-4xl mb-2">🎯</div>
          <div className="text-sm text-foreground/60">Intercepting</div>
        </div>
      </div>
    </div>
  )
}
