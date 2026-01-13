'use client'

import { useRouter } from 'next/navigation'
import { IconClose, IconPhoto } from '../../../components/icons'
import { use } from 'react'

// Simulated photos data
const photos: Record<string, { title: string; category: string; description: string }> = {
  '1': { title: 'Mountain Vista', category: 'Nature', description: 'A breathtaking view of mountain peaks at sunrise' },
  '2': { title: 'Urban Architecture', category: 'City', description: 'Modern building facades in the city center' },
  '3': { title: 'Ocean Sunset', category: 'Nature', description: 'Golden hour over the Pacific coastline' },
  '4': { title: 'Abstract Patterns', category: 'Art', description: 'Geometric shapes and color gradients' },
  '5': { title: 'Forest Path', category: 'Nature', description: 'A winding trail through ancient redwoods' },
  '6': { title: 'City Lights', category: 'City', description: 'Nighttime skyline with urban illumination' },
}

interface ModalPhotoPageProps {
  params: Promise<{ id: string }>
}

export default function ModalPhotoPage({ params }: ModalPhotoPageProps) {
  const router = useRouter()
  const { id } = use(params)
  const photo = photos[id]

  if (!photo) {
    return null
  }

  const handleClose = () => {
    router.back()
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={handleOverlayClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl animate-scaleIn">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors interactive"
        >
          <IconClose className="w-5 h-5" />
        </button>

        {/* Intercepting Route Badge */}
        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-orange-500 text-white rounded-full text-xs font-mono">
          Intercepted Route
        </div>

        {/* Image */}
        <div className="aspect-[16/10] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <IconPhoto className="w-20 h-20 text-gray-300" />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="badge">{photo.category}</span>
            <span className="text-sm text-gray-400">Photo #{id}</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">{photo.title}</h2>
          <p className="text-gray-600 mb-6">{photo.description}</p>

          {/* Explanation */}
          <div className="p-4 bg-gray-50 rounded-xl text-sm">
            <p className="font-mono text-gray-600">
              <span className="text-orange-600">(.)photo/[id]</span> intercepted this route.
              The gallery page remains visible behind this modal.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
