export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <nav className="glass-strong sticky top-0 z-50 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold gradient-text">Marketing</h1>
            <div className="flex gap-4">
              <a
                href="/"
                className="text-foreground/70 hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-accent/50"
              >
                Accueil
              </a>
              <a
                href="/slides"
                className="text-foreground/70 hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-accent/50"
              >
                Slides
              </a>
            </div>
          </div>
        </div>
      </nav>
      {children}
    </div>
  )
}
