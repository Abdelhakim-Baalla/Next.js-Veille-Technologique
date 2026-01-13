'use client'

import { useState } from 'react'
import { IconArrowLeft, IconArrowRight } from './icons'

interface Slide {
  id: number
  title: string
}

interface SlideNavigationProps {
  currentSlide: number
  totalSlides: number
  onPrev: () => void
  onNext: () => void
  onGoTo: (index: number) => void
  slides: Slide[]
}

export function SlideNavigation({
  currentSlide,
  totalSlides,
  onPrev,
  onNext,
  onGoTo,
  slides,
}: SlideNavigationProps) {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <>
      {/* Bottom Navigation */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-4 px-6 py-3 bg-white border border-gray-200 rounded-full shadow-lg">
          {/* Prev Button */}
          <button
            onClick={onPrev}
            disabled={currentSlide === 0}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all interactive"
          >
            <IconArrowLeft className="w-5 h-5" />
          </button>

          {/* Slide Counter */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="px-4 py-1 font-mono text-sm hover:bg-gray-100 rounded-lg transition-colors interactive"
          >
            <span className="font-bold">{currentSlide + 1}</span>
            <span className="text-gray-400"> / {totalSlides}</span>
          </button>

          {/* Next Button */}
          <button
            onClick={onNext}
            disabled={currentSlide === totalSlides - 1}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all interactive"
          >
            <IconArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Slide Menu */}
      {showMenu && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm animate-fadeIn"
          onClick={() => setShowMenu(false)}
        >
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[80vh] overflow-y-auto bg-white rounded-3xl p-8 shadow-2xl animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6">Table des matières</h2>
            <div className="grid gap-2">
              {slides.map((slide) => (
                <button
                  key={slide.id}
                  onClick={() => {
                    onGoTo(slide.id)
                    setShowMenu(false)
                  }}
                  className={`flex items-center gap-4 p-4 rounded-xl text-left transition-all interactive ${
                    slide.id === currentSlide
                      ? 'bg-black text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    slide.id === currentSlide
                      ? 'bg-white text-black'
                      : 'bg-gray-100'
                  }`}>
                    {slide.id + 1}
                  </span>
                  <span className="font-medium">{slide.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Keyboard Hints */}
      <div className="fixed bottom-8 right-8 z-50 hidden lg:flex items-center gap-2 text-xs text-gray-400">
        <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-200 font-mono">←</kbd>
        <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-200 font-mono">→</kbd>
        <span>pour naviguer</span>
      </div>
    </>
  )
}
