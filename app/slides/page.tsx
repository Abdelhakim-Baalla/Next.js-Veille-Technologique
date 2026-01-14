'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { SlideIntro } from './slide-intro'
import { SlideAppRouter } from './slide-app-router'
import { SlideFileConventions } from './slide-file-conventions'
import { SlideLayoutTemplate } from './slide-layout-template'
import { SlideRouteGroups } from './slide-route-groups'
import { SlideParallelRoutes } from './slide-parallel-routes'
import { SlideInterceptingRoutes } from './slide-intercepting-routes'
import { SlideLoadingStates } from './slide-loading-states'
import { SlideErrorHandling } from './slide-error-handling'
import { SlideServerClient } from './slide-server-client'
import { SlideServerActions } from './slide-server-actions'
import { SlideMiddleware } from './slide-middleware'
import { SlideConclusion } from './slide-conclusion'
import { Icons } from './icons'

const slides = [
  { id: 0, component: SlideIntro },
  { id: 1, component: SlideAppRouter },
  { id: 2, component: SlideFileConventions },
  { id: 3, component: SlideLayoutTemplate },
  { id: 4, component: SlideRouteGroups },
  { id: 5, component: SlideParallelRoutes },
  { id: 6, component: SlideInterceptingRoutes },
  { id: 7, component: SlideLoadingStates },
  { id: 8, component: SlideErrorHandling },
  { id: 9, component: SlideServerClient },
  { id: 10, component: SlideServerActions },
  { id: 11, component: SlideMiddleware },
  { id: 12, component: SlideConclusion },
]

// Custom Cursor Component
function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    if (!cursor || !cursorDot) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0

    const move = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursorDot.style.left = mouseX + 'px'
      cursorDot.style.top = mouseY + 'px'
    }

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.1
      cursorY += (mouseY - cursorY) * 0.1
      cursor.style.left = cursorX + 'px'
      cursor.style.top = cursorY + 'px'
      requestAnimationFrame(animate)
    }

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-hover]') || target.closest('button') || target.closest('a')) {
        cursor.classList.add('scale-150', 'opacity-50')
        cursorDot.classList.add('scale-0')
      }
    }

    const handleUnhover = () => {
      cursor.classList.remove('scale-150', 'opacity-50')
      cursorDot.classList.remove('scale-0')
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', handleHover)
    window.addEventListener('mouseout', handleUnhover)
    animate()

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', handleHover)
      window.removeEventListener('mouseout', handleUnhover)
    }
  }, [])

  return (
    <>
      <div 
        ref={cursorRef}
        className="fixed w-10 h-10 border-2 border-black rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 mix-blend-difference bg-white/10"
      />
      <div 
        ref={cursorDotRef}
        className="fixed w-2 h-2 bg-black rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-150"
      />
    </>
  )
}

// Floating Geometric Shapes
function Shapes() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Large circle top right */}
      <div className="absolute -top-20 -right-20 w-96 h-96 border border-gray-100 rounded-full animate-float-slow" />
      {/* Medium circle bottom left */}
      <div className="absolute -bottom-32 -left-32 w-80 h-80 border border-gray-100 rounded-full animate-float-medium" />
      {/* Small square top left */}
      <div className="absolute top-32 left-20 w-16 h-16 border border-gray-100 rotate-45 animate-float-fast" />
      {/* Tiny circle center right */}
      <div className="absolute top-1/2 right-20 w-8 h-8 border border-gray-200 rounded-full animate-float-medium" />
      {/* Line accent */}
      <div className="absolute top-40 right-1/3 w-32 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent animate-pulse" />
      <div className="absolute bottom-40 left-1/4 w-48 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent animate-pulse" style={{animationDelay: '1s'}} />
    </div>
  )
}

export default function SlidesPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < slides.length && !isTransitioning) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentSlide(index)
        setIsTransitioning(false)
      }, 200)
    }
  }, [isTransitioning])

  const nextSlide = useCallback(() => goToSlide(currentSlide + 1), [currentSlide, goToSlide])
  const prevSlide = useCallback(() => goToSlide(currentSlide - 1), [currentSlide, goToSlide])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault()
        nextSlide()
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        prevSlide()
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault()
        toggleFullscreen()
      }
    }

    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement)

    window.addEventListener('keydown', handleKeyDown)
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [nextSlide, prevSlide, toggleFullscreen])

  const CurrentSlideComponent = slides[currentSlide].component
  const progress = ((currentSlide + 1) / slides.length) * 100

  return (
    <div className="h-screen w-screen bg-white overflow-hidden cursor-none">
      <Cursor />
      <Shapes />

      {/* Progress Bar Top */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-100 z-50">
        <div 
          className="h-full bg-black transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Slide Content */}
      <div className={`h-full transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-98' : 'opacity-100 scale-100'}`}>
        <CurrentSlideComponent />
      </div>

      {/* Bottom Controls */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-white/90 backdrop-blur-xl rounded-full border border-gray-200 shadow-lg shadow-black/5">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              data-hover
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide 
                  ? 'w-8 h-2.5 bg-black' 
                  : index < currentSlide
                  ? 'w-2.5 h-2.5 bg-gray-400 hover:bg-gray-600'
                  : 'w-2.5 h-2.5 bg-gray-200 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Slide Counter - Left */}
      <div className="fixed bottom-8 left-8 z-50">
        <div className="flex items-center gap-3 px-5 py-3 bg-white/90 backdrop-blur-xl rounded-2xl border border-gray-200 shadow-lg shadow-black/5">
          <span className="text-2xl font-light tabular-nums">{String(currentSlide + 1).padStart(2, '0')}</span>
          <div className="w-8 h-px bg-gray-300" />
          <span className="text-sm text-gray-400 tabular-nums">{String(slides.length).padStart(2, '0')}</span>
        </div>
      </div>

      {/* Controls - Right */}
      <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3">
        {/* Keyboard hint */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-white/90 backdrop-blur-xl rounded-xl border border-gray-200 text-xs text-gray-400">
          <kbd className="px-2 py-1 bg-gray-100 rounded text-gray-600">←</kbd>
          <kbd className="px-2 py-1 bg-gray-100 rounded text-gray-600">→</kbd>
          <span>navigation</span>
        </div>
        
        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          data-hover
          className="p-3 bg-white/90 backdrop-blur-xl rounded-xl border border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all duration-300 shadow-lg shadow-black/5"
        >
          {isFullscreen ? <Icons.minimize className="w-5 h-5" /> : <Icons.maximize className="w-5 h-5" />}
        </button>
      </div>
    </div>
  )
}
