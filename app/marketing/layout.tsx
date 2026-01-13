export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <nav className="glass sticky top-0 z-50 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-medium">Marketing</h1>
            <a
              href="/"
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              Accueil
            </a>
          </div>
        </div>
      </nav>
      {children}
    </div>
  )
}
