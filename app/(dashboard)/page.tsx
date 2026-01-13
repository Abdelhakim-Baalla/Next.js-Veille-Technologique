export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-light mb-4">Dashboard</h1>
        <p className="text-foreground/70">
          Bienvenue sur le dashboard. Explorez les différentes sections :
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <a
          href="/dashboard/photos"
          className="glass p-6 rounded-lg border border-border hover:border-foreground/20 transition-colors"
        >
          <h2 className="text-2xl font-light mb-2">📸 Photos</h2>
          <p className="text-foreground/60">
            Démonstration des Intercepting Routes avec modales
          </p>
        </a>

        <a
          href="/dashboard/contact"
          className="glass p-6 rounded-lg border border-border hover:border-foreground/20 transition-colors"
        >
          <h2 className="text-2xl font-light mb-2">✉️ Contact</h2>
          <p className="text-foreground/60">
            Démonstration des Server Actions
          </p>
        </a>
      </div>
    </div>
  )
}
