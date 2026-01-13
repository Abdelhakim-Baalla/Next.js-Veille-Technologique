'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-md">
        <h2 className="text-2xl font-medium text-foreground">
          Une erreur s'est produite
        </h2>
        <p className="text-foreground/60">
          {error.message || 'Une erreur inattendue est survenue'}
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 border border-border rounded-lg hover:bg-accent transition-colors"
        >
          Réessayer
        </button>
      </div>
    </div>
  )
}
