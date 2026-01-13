import Link from 'next/link'
import { IconPhoto, IconCode } from '../components/icons'

// Simulated photos data
const photos = [
  { id: '1', title: 'Mountain Vista', category: 'Nature' },
  { id: '2', title: 'Urban Architecture', category: 'City' },
  { id: '3', title: 'Ocean Sunset', category: 'Nature' },
  { id: '4', title: 'Abstract Patterns', category: 'Art' },
  { id: '5', title: 'Forest Path', category: 'Nature' },
  { id: '6', title: 'City Lights', category: 'City' },
]

export default function PhotosPage() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-xs font-mono text-gray-600 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            Intercepting Routes Demo
          </div>
          <h1 className="text-4xl font-bold mb-4">Photo Gallery</h1>
          <p className="text-gray-600 max-w-2xl">
            Click on any photo to open it in a modal. The URL will change to /photos/[id],
            but the gallery remains visible behind the modal. This is the intercepting routes pattern.
          </p>
        </div>

        {/* Info Card */}
        <div className="card bg-black text-white mb-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/10 rounded-xl">
              <IconCode className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">How Intercepting Routes Work</h2>
              <p className="text-gray-400 text-sm mb-4">
                The (.)photo/[id] folder intercepts navigation to /photos/[id] when navigating 
                from this page. Direct URL access shows the full page instead.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-mono">
                  (.)photo/[id]
                </span>
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-mono">
                  Modal Overlay
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Photo Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {photos.map((photo) => (
            <Link
              key={photo.id}
              href={`/photos/${photo.id}`}
              className="group card-interactive overflow-hidden p-0"
            >
              {/* Image Placeholder */}
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <IconPhoto className="w-12 h-12 text-gray-300 group-hover:text-gray-400 transition-colors" />
                </div>
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
              </div>
              
              {/* Info */}
              <div className="p-4">
                <h3 className="font-semibold mb-1">{photo.title}</h3>
                <p className="text-sm text-gray-500">{photo.category}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* File Structure */}
        <div className="card">
          <h3 className="font-semibold mb-4">File Structure</h3>
          <pre className="text-xs font-mono text-gray-600 bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`app/
├── photos/
│   ├── page.tsx           # Gallery page (this page)
│   ├── [id]/
│   │   └── page.tsx       # Full photo page (direct access)
│   └── (.)photo/
│       └── [id]/
│           └── page.tsx   # Modal overlay (intercepted)`}
          </pre>
        </div>
      </div>
    </div>
  )
}
