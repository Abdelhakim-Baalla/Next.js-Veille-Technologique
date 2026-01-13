import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-light text-foreground">404</h1>
        <h2 className="text-2xl font-light text-foreground/70">
          Page introuvable
        </h2>
        <p className="text-foreground/50 max-w-md mx-auto">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="inline-block mt-8 px-6 py-3 border border-border rounded-lg hover:bg-accent transition-colors"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}
