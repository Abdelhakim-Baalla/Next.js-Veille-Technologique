'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const router = useRouter()
  const [id, setId] = useState<string | null>(null)

  useEffect(() => {
    params.then((p) => setId(p.id))
  }, [params])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        router.back()
      }
    }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [router])

  if (!id) return null

  const photoUrl = `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200`
  const photoMap: Record<string, string> = {
    '1': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
    '2': 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200',
    '3': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200',
    '4': 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200',
    '5': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
    '6': 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200',
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={() => router.back()}
    >
      <div
        className="relative max-w-4xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => router.back()}
          className="absolute -top-12 right-0 text-foreground/70 hover:text-foreground transition-colors"
        >
          ✕ Fermer
        </button>
        <div className="glass rounded-lg border border-border overflow-hidden">
          <img
            src={photoMap[id] || photoUrl}
            alt={`Photo ${id}`}
            className="w-full h-auto"
          />
        </div>
        <p className="text-center mt-4 text-foreground/60">
          Intercepting Route - La galerie reste visible en arrière-plan
        </p>
      </div>
    </div>
  )
}
