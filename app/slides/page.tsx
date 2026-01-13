'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Slide1 from './components/slide1'
import Slide2 from './components/slide2'
import Slide3 from './components/slide3'
import Slide4 from './components/slide4'
import Slide5 from './components/slide5'
import Slide6 from './components/slide6'
import Slide7 from './components/slide7'
import Slide8 from './components/slide8'
import Slide9 from './components/slide9'

const TOTAL_SLIDES = 9

export default function SlidesPage() {
  const [currentSlide, setCurrentSlide] = useState(1)
  const router = useRouter()

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        handleNext()
      } else if (e.key === 'ArrowLeft') {
        handlePrev()
      } else if (e.key === 'Escape') {
        router.push('/presentation')
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentSlide, router])

  const handleNext = () => {
    if (currentSlide < TOTAL_SLIDES) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const handlePrev = () => {
    if (currentSlide > 1) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const slides = [
    <Slide1 key="1" />,
    <Slide2 key="2" />,
    <Slide3 key="3" />,
    <Slide4 key="4" />,
    <Slide5 key="5" />,
    <Slide6 key="6" />,
    <Slide7 key="7" />,
    <Slide8 key="8" />,
    <Slide9 key="9" />,
  ]

  return (
    <div className="fixed inset-0 bg-background overflow-hidden">
      {/* Navigation Controls */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-4">
        <button
          onClick={() => router.push('/presentation')}
          className="glass-strong px-4 py-2 rounded-lg hover:bg-accent/50 transition-all text-sm font-medium"
        >
          ✕ Quitter
        </button>
        <div className="glass-strong px-4 py-2 rounded-lg text-sm font-medium">
          {currentSlide} / {TOTAL_SLIDES}
        </div>
      </div>

      {/* Slide Content */}
      <div className="h-full w-full flex items-center justify-center p-8">
        <div
          key={currentSlide}
          className="w-full max-w-6xl animate-scale-in"
        >
          {slides[currentSlide - 1]}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        disabled={currentSlide === 1}
        className="absolute left-8 top-1/2 -translate-y-1/2 glass-strong p-4 rounded-full hover:bg-accent/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
        aria-label="Slide précédent"
      >
        <svg
          className="w-6 h-6 group-hover:translate-x-[-2px] transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={handleNext}
        disabled={currentSlide === TOTAL_SLIDES}
        className="absolute right-8 top-1/2 -translate-y-1/2 glass-strong p-4 rounded-full hover:bg-accent/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
        aria-label="Slide suivant"
      >
        <svg
          className="w-6 h-6 group-hover:translate-x-[2px] transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent/30">
        <div
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
          style={{ width: `${(currentSlide / TOTAL_SLIDES) * 100}%` }}
        />
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {Array.from({ length: TOTAL_SLIDES }).map((_, idx) => (
          <button
            key={idx + 1}
            onClick={() => setCurrentSlide(idx + 1)}
            className={`h-2 rounded-full transition-all ${
              currentSlide === idx + 1
                ? 'w-8 bg-primary'
                : 'w-2 bg-foreground/30 hover:bg-foreground/50'
            }`}
            aria-label={`Aller au slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
