'use client'

import { useState, useEffect, useCallback } from 'react'
import { SlideIntro } from './slides/slide-intro'
import { SlideAppRouter } from './slides/slide-app-router'
import { SlideFileHierarchy } from './slides/slide-file-hierarchy'
import { SlideLayoutTemplate } from './slides/slide-layout-template'
import { SlidePageComponent } from './slides/slide-page-component'
import { SlideRouteGroups } from './slides/slide-route-groups'
import { SlideParallelRoutes } from './slides/slide-parallel-routes'
import { SlideInterceptingRoutes } from './slides/slide-intercepting-routes'
import { SlideLoadingStates } from './slides/slide-loading-states'
import { SlideErrorHandling } from './slides/slide-error-handling'
import { SlideServerClient } from './slides/slide-server-client'
import { SlideServerActions } from './slides/slide-server-actions'
import { SlideMiddleware } from './slides/slide-middleware'
import { SlideConclusion } from './slides/slide-conclusion'
import { SlideNavigation } from './components/slide-navigation'
import { SlideProgress } from './components/slide-progress'

const slides = [
  { id: 0, component: SlideIntro, title: 'Introduction' },
  { id: 1, component: SlideAppRouter, title: 'App Router' },
  { id: 2, component: SlideFileHierarchy, title: 'Hiérarchie des Fichiers' },
  { id: 3, component: SlideLayoutTemplate, title: 'Layout & Template' },
  { id: 4, component: SlidePageComponent, title: 'Page Component' },
  { id: 5, component: SlideRouteGroups, title: 'Route Groups' },
  { id: 6, component: SlideParallelRoutes, title: 'Parallel Routes' },
  { id: 7, component: SlideInterceptingRoutes, title: 'Intercepting Routes' },
  { id: 8, component: SlideLoadingStates, title: 'Loading States' },
  { id: 9, component: SlideErrorHandling, title: 'Error Handling' },
  { id: 10, component: SlideServerClient, title: 'Server vs Client' },
  { id: 11, component: SlideServerActions, title: 'Server Actions' },
  { id: 12, component: SlideMiddleware, title: 'Middleware' },
  { id: 13, component: SlideConclusion, title: 'Conclusion' },
]

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')
  const [isAnimating, setIsAnimating] = useState(false)

  const goToSlide = useCallback((index: number) => {
    if (isAnimating || index === currentSlide) return
    if (index < 0 || index >= slides.length) return
    
    setDirection(index > currentSlide ? 'next' : 'prev')
    setIsAnimating(true)
    setCurrentSlide(index)
    
    setTimeout(() => setIsAnimating(false), 500)
  }, [currentSlide, isAnimating])

  const nextSlide = useCallback(() => {
    goToSlide(currentSlide + 1)
  }, [currentSlide, goToSlide])

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide - 1)
  }, [currentSlide, goToSlide])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        nextSlide()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prevSlide()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide])

  const CurrentSlideComponent = slides[currentSlide].component

  return (
    <div className="h-screen w-screen overflow-hidden bg-white">
      {/* Progress Bar */}
      <SlideProgress current={currentSlide} total={slides.length} />

      {/* Slide Content */}
      <div className="h-full w-full relative">
        <div
          key={currentSlide}
          className={`absolute inset-0 transition-all duration-500 ease-out ${
            isAnimating
              ? direction === 'next'
                ? 'animate-slideInRight'
                : 'animate-slideInLeft'
              : ''
          }`}
        >
          <CurrentSlideComponent />
        </div>
      </div>

      {/* Navigation */}
      <SlideNavigation
        currentSlide={currentSlide}
        totalSlides={slides.length}
        onPrev={prevSlide}
        onNext={nextSlide}
        onGoTo={goToSlide}
        slides={slides}
      />
    </div>
  )
}
