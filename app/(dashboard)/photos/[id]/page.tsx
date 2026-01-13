import { notFound } from 'next/navigation'
import Link from 'next/link'

async function getPhoto(id: string) {
  // Simuler un fetch de données
  await new Promise((resolve) => setTimeout(resolve, 500))
  
  const photos: Record<string, { id: string; title: string; url: string; description: string }> = {
    '1': {
      id: '1',
      title: 'Photo 1',
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
      description: 'Une magnifique vue panoramique',
    },
    '2': {
      id: '2',
      title: 'Photo 2',
      url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200',
      description: 'Paysage naturel époustouflant',
    },
    '3': {
      id: '3',
      title: 'Photo 3',
      url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200',
      description: 'Scène urbaine moderne',
    },
    '4': {
      id: '4',
      title: 'Photo 4',
      url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200',
      description: 'Architecture contemporaine',
    },
    '5': {
      id: '5',
      title: 'Photo 5',
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
      description: 'Nature sauvage',
    },
    '6': {
      id: '6',
      title: 'Photo 6',
      url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200',
      description: 'Horizon infini',
    },
  }

  const photo = photos[id]
  if (!photo) notFound()
  
  return photo
}

export default async function PhotoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const photo = await getPhoto(id)

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard/photos"
        className="inline-flex items-center text-foreground/70 hover:text-foreground transition-colors"
      >
        ← Retour à la galerie
      </Link>

      <div className="glass p-8 rounded-lg border border-border">
        <h1 className="text-3xl font-light mb-4">{photo.title}</h1>
        <p className="text-foreground/60 mb-6">{photo.description}</p>
        <div className="relative aspect-video bg-accent rounded-lg overflow-hidden">
          <img
            src={photo.url}
            alt={photo.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}
