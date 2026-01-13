import Link from 'next/link'

async function getPhotos() {
  // Simuler un fetch de données
  await new Promise((resolve) => setTimeout(resolve, 800))
  return [
    { id: '1', title: 'Photo 1', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800' },
    { id: '2', title: 'Photo 2', url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800' },
    { id: '3', title: 'Photo 3', url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800' },
    { id: '4', title: 'Photo 4', url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800' },
    { id: '5', title: 'Photo 5', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800' },
    { id: '6', title: 'Photo 6', url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800' },
  ]
}

export default async function PhotosPage() {
  const photos = await getPhotos()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-light mb-4">Galerie Photos</h1>
        <p className="text-foreground/60 text-lg">
          Cliquez sur une photo pour la prévisualiser (Intercepting Route)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <Link
            key={photo.id}
            href={`/dashboard/photos/${photo.id}`}
            className="group relative overflow-hidden rounded-lg border border-border hover:border-foreground/20 transition-colors"
          >
            <div className="aspect-square bg-accent relative">
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </div>
            <div className="p-4">
              <h3 className="font-medium">{photo.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
