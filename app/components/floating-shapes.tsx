'use client'

import { useEffect, useState } from 'react'

interface Shape {
  id: number
  type: 'circle' | 'square'
  size: number
  x: number
  y: number
  duration: number
  delay: number
}

interface Particle {
  id: number
  size: number
  x: number
  y: number
  duration: number
  opacity: number
}

export function FloatingShapes() {
  const [shapes, setShapes] = useState<Shape[]>([])
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    // Generate floating shapes
    const generatedShapes: Shape[] = [
      { id: 1, type: 'circle', size: 120, x: 10, y: 15, duration: 8, delay: 0 },
      { id: 2, type: 'square', size: 80, x: 85, y: 25, duration: 7, delay: 1 },
      { id: 3, type: 'circle', size: 200, x: 75, y: 70, duration: 10, delay: 2 },
      { id: 4, type: 'square', size: 100, x: 20, y: 80, duration: 6, delay: 3 },
      { id: 5, type: 'circle', size: 60, x: 50, y: 10, duration: 9, delay: 4 },
      { id: 6, type: 'square', size: 140, x: 90, y: 85, duration: 8, delay: 5 },
    ]
    setShapes(generatedShapes)

    // Generate particles
    const generatedParticles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 15 + 10,
      opacity: Math.random() * 0.2 + 0.1,
    }))
    setParticles(generatedParticles)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating Shapes */}
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className="floating-shape animate-float"
          style={{
            width: shape.size,
            height: shape.size,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            borderRadius: shape.type === 'circle' ? '50%' : '30%',
            animationDuration: `${shape.duration}s`,
            animationDelay: `${shape.delay}s`,
          }}
        />
      ))}

      {/* Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="fixed rounded-full bg-black"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity,
            animation: `floatParticle ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.id * 0.5}s`,
          }}
        />
      ))}

      {/* Gradient Orbs */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.02]"
        style={{
          background: 'radial-gradient(circle, #000 0%, transparent 70%)',
          left: '-200px',
          top: '-200px',
        }}
      />
      <div 
        className="absolute w-[800px] h-[800px] rounded-full opacity-[0.015]"
        style={{
          background: 'radial-gradient(circle, #000 0%, transparent 70%)',
          right: '-300px',
          bottom: '-300px',
        }}
      />
    </div>
  )
}
