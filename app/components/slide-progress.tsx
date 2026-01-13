'use client'

interface SlideProgressProps {
  current: number
  total: number
}

export function SlideProgress({ current, total }: SlideProgressProps) {
  const progress = ((current + 1) / total) * 100

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-100">
      <div
        className="h-full bg-black transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
