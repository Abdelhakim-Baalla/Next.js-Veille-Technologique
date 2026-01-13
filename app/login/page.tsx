'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simuler une authentification
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Créer un cookie de session
    document.cookie = 'session=authenticated; path=/; max-age=3600'

    // Rediriger vers la page demandée ou dashboard
    const redirect = searchParams.get('redirect') || '/dashboard'
    router.push(redirect)
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="glass p-8 rounded-lg border border-border max-w-md w-full">
        <h1 className="text-3xl font-light mb-8 text-center">Connexion</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-2 text-foreground/70"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full px-4 py-3 bg-accent border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-foreground/20 text-foreground"
              placeholder="votre@email.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2 text-foreground/70"
            >
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              required
              className="w-full px-4 py-3 bg-accent border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-foreground/20 text-foreground"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-3 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
        <p className="mt-6 text-sm text-foreground/50 text-center">
          Utilisez n'importe quel email/mot de passe pour la démo
        </p>
      </div>
    </div>
  )
}
