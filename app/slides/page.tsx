'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { SlideIntro } from './slide-intro'
import { SlideSommaire } from './slide-sommaire'
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

const slides = [
  { id: 0, component: SlideIntro },
  { id: 1, component: SlideSommaire },
  { id: 2, component: SlideAppRouter },
  { id: 3, component: SlideFileConventions },
  { id: 4, component: SlideLayoutTemplate },
  { id: 5, component: SlideRouteGroups },
  { id: 6, component: SlideParallelRoutes },
  { id: 7, component: SlideInterceptingRoutes },
  { id: 8, component: SlideLoadingStates },
  { id: 9, component: SlideErrorHandling },
  { id: 10, component: SlideServerClient },
  { id: 11, component: SlideServerActions },
  { id: 12, component: SlideMiddleware },
  { id: 13, component: SlideConclusion },
]

// Enhanced Custom Cursor with trail effect
function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const trailsRef = useRef<HTMLDivElement[]>([])
  
  useEffect(() => {
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    if (!cursor || !cursorDot) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    const trails: { x: number; y: number }[] = []
    
    for (let i = 0; i < 5; i++) {
      trails.push({ x: 0, y: 0 })
    }

    const move = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursorDot.style.left = mouseX + 'px'
      cursorDot.style.top = mouseY + 'px'
    }

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.12
      cursorY += (mouseY - cursorY) * 0.12
      cursor.style.left = cursorX + 'px'
      cursor.style.top = cursorY + 'px'
      
      // Update trails
      trails.forEach((trail, i) => {
        const delay = (i + 1) * 0.05
        trail.x += (mouseX - trail.x) * (0.15 - delay)
        trail.y += (mouseY - trail.y) * (0.15 - delay)
        if (trailsRef.current[i]) {
          trailsRef.current[i].style.left = trail.x + 'px'
          trailsRef.current[i].style.top = trail.y + 'px'
        }
      })
      
      requestAnimationFrame(animate)
    }

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-hover]') || target.closest('button') || target.closest('a')) {
        cursor.classList.add('cursor-hover')
        cursorDot.classList.add('scale-0')
      }
    }

    const handleUnhover = () => {
      cursor.classList.remove('cursor-hover')
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
      {/* Trail particles */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          ref={el => { if (el) trailsRef.current[i] = el }}
          className="fixed w-1 h-1 bg-black/20 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
          style={{ opacity: 0.3 - i * 0.05 }}
        />
      ))}
      <div 
        ref={cursorRef}
        className="cursor-ring fixed w-10 h-10 border-2 border-black rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference bg-white/5"
      />
      <div 
        ref={cursorDotRef}
        className="fixed w-1.5 h-1.5 bg-black rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-150"
      />
    </>
  )
}

// Enhanced Floating Geometric Shapes with parallax
function Shapes() {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) * 0.02
      const y = (e.clientY - window.innerHeight / 2) * 0.02
      setOffset({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Large circle - top right with parallax */}
      <div 
        className="shape-float absolute -top-32 -right-32 w-[500px] h-[500px] border border-black/[0.03] rounded-full"
        style={{ transform: `translate(${offset.x * 2}px, ${offset.y * 2}px)` }}
      />
      
      {/* Medium circle - bottom left */}
      <div 
        className="shape-float-reverse absolute -bottom-40 -left-40 w-[400px] h-[400px] border border-black/[0.04] rounded-full"
        style={{ transform: `translate(${-offset.x * 1.5}px, ${-offset.y * 1.5}px)`, animationDelay: '-2s' }}
      />
      
      {/* Square with rotation - top left */}
      <div 
        className="shape-rotate absolute top-20 left-[10%] w-20 h-20 border border-black/[0.05]"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      />
      
      {/* Small circle - center right */}
      <div 
        className="shape-float absolute top-1/3 right-[15%] w-12 h-12 border border-black/[0.06] rounded-full"
        style={{ transform: `translate(${offset.x * 3}px, ${offset.y * 3}px)`, animationDelay: '-4s' }}
      />
      
      {/* Diamond shape - bottom right */}
      <div 
        className="shape-rotate-slow absolute bottom-[20%] right-[25%] w-16 h-16 border border-black/[0.04]"
        style={{ transform: `rotate(45deg) translate(${offset.x * 2}px, ${offset.y * 2}px)` }}
      />
      
      {/* Tiny circles cluster */}
      <div className="absolute top-[40%] left-[20%] space-y-4">
        <div className="shape-pulse w-2 h-2 bg-black/[0.08] rounded-full" />
        <div className="shape-pulse w-3 h-3 bg-black/[0.06] rounded-full ml-4" style={{ animationDelay: '-1s' }} />
        <div className="shape-pulse w-2 h-2 bg-black/[0.07] rounded-full" style={{ animationDelay: '-2s' }} />
      </div>
      
      {/* Line accents */}
      <div className="absolute top-1/4 right-1/4 w-32 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent shape-fade" />
      <div className="absolute bottom-1/3 left-1/3 w-48 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent shape-fade" style={{ animationDelay: '-3s' }} />
      
      {/* Dot grid pattern */}
      <div className="absolute top-[15%] right-[10%] grid grid-cols-3 gap-3 opacity-30">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="w-1 h-1 bg-black/20 rounded-full shape-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
        ))}
      </div>
    </div>
  )
}

// Particles background
function Particles() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([])
  
  useEffect(() => {
    const newParticles = [...Array(30)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 10,
    }))
    setParticles(newParticles)
  }, [])
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle absolute rounded-full bg-black/[0.08]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function SlidesPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [transitionState, setTransitionState] = useState<'idle' | 'exit' | 'enter'>('idle')
  const [transitionDirection, setTransitionDirection] = useState<'next' | 'prev'>('next')
  const [showControls, setShowControls] = useState(true)

  const goToSlide = useCallback((index: number, direction: 'next' | 'prev' = 'next') => {
    if (index >= 0 && index < slides.length && transitionState === 'idle') {
      setTransitionDirection(direction)
      setTransitionState('exit')
      
      setTimeout(() => {
        setCurrentSlide(index)
        setTransitionState('enter')
        
        setTimeout(() => {
          setTransitionState('idle')
        }, 600)
      }, 400)
    }
  }, [transitionState])

  const nextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      goToSlide(currentSlide + 1, 'next')
    }
  }, [currentSlide, goToSlide])

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1, 'prev')
    }
  }, [currentSlide, goToSlide])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [])

  // Auto-hide controls
  useEffect(() => {
    let timeout: NodeJS.Timeout
    
    const handleMouseMove = () => {
      setShowControls(true)
      clearTimeout(timeout)
      if (isFullscreen) {
        timeout = setTimeout(() => setShowControls(false), 3000)
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(timeout)
    }
  }, [isFullscreen])

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
      } else if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false)
        }
      }
    }

    const handleFullscreenChange = () => {
      const isFs = !!document.fullscreenElement
      setIsFullscreen(isFs)
      if (!isFs) setShowControls(true)
    }

    window.addEventListener('keydown', handleKeyDown)
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [nextSlide, prevSlide, toggleFullscreen, isFullscreen])

  const CurrentSlideComponent = slides[currentSlide].component
  const progress = ((currentSlide + 1) / slides.length) * 100

  // Transition classes
  const getTransitionClass = () => {
    if (transitionState === 'exit') {
      return transitionDirection === 'next' 
        ? 'slide-exit-left' 
        : 'slide-exit-right'
    }
    if (transitionState === 'enter') {
      return transitionDirection === 'next'
        ? 'slide-enter-right'
        : 'slide-enter-left'
    }
    return 'slide-idle'
  }

  return (
    <div className="h-screen w-screen bg-white overflow-hidden cursor-none select-none">
      <Cursor />
      <Particles />
      <Shapes />

      {/* Progress Bar - Always visible but minimal in fullscreen */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isFullscreen ? 'h-0.5 opacity-50' : 'h-1'
      }`}>
        <div className="h-full bg-gray-100">
          <div 
            className="h-full bg-black transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Slide Content with advanced transitions */}
      <div className={`h-full ${getTransitionClass()}`}>
        <CurrentSlideComponent />
      </div>

      {/* Bottom Controls - Hidden in fullscreen unless mouse moves */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ${
        isFullscreen && !showControls ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}>
        {/* Gradient fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
        
        <div className="relative flex items-center justify-center pb-8 pt-16">
          {/* Dots navigation */}
          <div className="flex items-center gap-1">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index, index > currentSlide ? 'next' : 'prev')}
                data-hover
                className={`transition-all duration-500 rounded-full ${
                  index === currentSlide 
                    ? 'w-8 h-2 bg-black' 
                    : index < currentSlide
                    ? 'w-2 h-2 bg-black/40 hover:bg-black/60'
                    : 'w-2 h-2 bg-black/20 hover:bg-black/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Slide number - Minimal, corner positioned */}
      <div className={`fixed bottom-8 left-8 z-50 transition-all duration-500 ${
        isFullscreen && !showControls ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'
      }`}>
        <div className="font-mono text-xs text-black/30">
          <span className="text-black/60 text-sm">{String(currentSlide + 1).padStart(2, '0')}</span>
          <span className="mx-1">/</span>
          <span>{String(slides.length).padStart(2, '0')}</span>
        </div>
      </div>

      {/* Click zones for navigation - At bottom only to avoid blocking interactive elements */}
      <button
        onClick={prevSlide}
        className="fixed left-0 bottom-0 w-1/4 h-20 z-40 opacity-0 cursor-none"
        disabled={currentSlide === 0}
        aria-label="Slide précédente"
      />
      <button
        onClick={nextSlide}
        className="fixed right-0 bottom-0 w-1/4 h-20 z-40 opacity-0 cursor-none"
        disabled={currentSlide === slides.length - 1}
        aria-label="Slide suivante"
      />

      {/* Touch swipe indicator - Only on first load */}
      {currentSlide === 0 && transitionState === 'idle' && (
        <div className="fixed bottom-32 left-1/2 -translate-x-1/2 z-50 animate-bounce-subtle">
          <div className="flex items-center gap-2 text-black/20 text-xs">
            <span className="w-6 h-px bg-black/20" />
            <span>swipe</span>
            <span className="w-6 h-px bg-black/20" />
          </div>
        </div>
      )}
    </div>
  )
}
