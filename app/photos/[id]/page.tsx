import Link from 'next/link'
import { notFound } from 'next/navigation'
import { IconArrowLeft, IconPhoto, IconCode } from '../../components/icons'

// Simulated photos data
const photos: Record<string, { title: string; category: string; description: string }> = {
  '1': { title: 'Mountain Vista', category: 'Nature', description: 'A breathtaking view of mountain peaks at sunrise' },
  '2': { title: 'Urban Architecture', category: 'City', description: 'Modern building facades in the city center' },
  '3': { title: 'Ocean Sunset', category: 'Nature', description: 'Golden hour over the Pacific coastline' },
  '4': { title: 'Abstract Patterns', category: 'Art', description: 'Geometric shapes and color gradients' },
  '5': { title: 'Forest Path', category: 'Nature', description: 'A winding trail through ancient redwoods' },
  '6': { title: 'City Lights', category: 'City', description: 'Nighttime skyline with urban illumination' },
}

interface PhotoPageProps {
  params: Promise<{ id: string }>
}

export default async function PhotoPage({ params }: PhotoPageProps) {
  const { id } = await params
  const photo = photos[id]

  if (!photo) {
    notFound()
  }

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Breadcrumb */}
        <Link
          href="/photos"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-8 interactive"
        >
          <IconArrowLeft className="w-4 h-4" />
          Back to Gallery
        </Link>

        {/* Info Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-mono mb-6 ml-4">
          Direct Access - Full Page View
        </div>

        {/* Photo Display */}
        <div className="card overflow-hidden p-0 mb-8">
          <div className="aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <IconPhoto className="w-24 h-24 text-gray-300" />
          </div>
          <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="badge">{photo.category}</span>
              <span className="text-sm text-gray-400">Photo #{id}</span>
            </div>
            <h1 className="text-3xl font-bold mb-4">{photo.title}</h1>
            <p className="text-gray-600">{photo.description}</p>
          </div>
        </div>

        {/* Explanation Card */}
        <div className="card bg-black text-white">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/10 rounded-xl">
              <IconCode className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Full Page View</h2>
              <p className="text-gray-400 text-sm mb-4">
                You're seeing the full page because you accessed this URL directly
                (or refreshed the page). When navigating from the gallery,
                the intercepting route (.)photo/[id] shows a modal instead.
              </p>
              <pre className="text-xs font-mono bg-white/10 p-3 rounded-lg overflow-x-auto">
{`// app/photos/[id]/page.tsx
// This renders for:
// - Direct URL access
// - Page refresh
// - Sharing links`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
