'use client'

import { useEffect, useState } from 'react'
import { Icons } from './icons'

export function SlideIntro() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const topics = [
    { icon: Icons.folder, label: 'App Router', delay: 'stagger-1' },
    { icon: Icons.layout, label: 'Layouts & Templates', delay: 'stagger-2' },
    { icon: Icons.split, label: 'Parallel Routes', delay: 'stagger-3' },
    { icon: Icons.cornerDownRight, label: 'Intercepting Routes', delay: 'stagger-4' },
    { icon: Icons.loader, label: 'Loading & Error', delay: 'stagger-5' },
    { icon: Icons.server, label: 'Server Components', delay: 'stagger-6' },
    { icon: Icons.zap, label: 'Server Actions', delay: 'stagger-1' },
    { icon: Icons.shield, label: 'Middleware', delay: 'stagger-2' },
  ]

  return (
    <div className="slide">
      <div className="slide-content flex flex-col items-center justify-center text-center">
        {/* Badge */}
        <div className={`slide-badge ${isVisible ? 'animate-fadeInDown' : 'opacity-0'}`}>
          Veille Technologique 2024
        </div>

        {/* Title */}
        <h1 className={`text-hero mb-6 ${isVisible ? 'animate-fadeInUp stagger-1' : 'opacity-0'}`}>
          Next.js <span className="text-gray-300">Routing</span>
        </h1>

        {/* Subtitle */}
        <p className={`text-subtitle max-w-2xl mb-16 ${isVisible ? 'animate-fadeInUp stagger-2' : 'opacity-0'}`}>
          Maîtrisez l'architecture App Router de Next.js 14+<br />
          Patterns UI avancés et optimisation de la navigation
        </p>

        {/* Topics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full">
          {topics.map((topic) => {
            const IconComponent = topic.icon
            return (
              <div
                key={topic.label}
                className={`group p-5 rounded-2xl border border-gray-100 bg-gray-50/50 
                  hover:bg-white hover:border-gray-200 hover:shadow-xl hover:shadow-black/5
                  transition-all duration-300 flex flex-col items-center gap-4 ${
                  isVisible ? `animate-fadeInUp ${topic.delay}` : 'opacity-0'
                }`}
                data-hover
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center
                  group-hover:bg-black group-hover:border-black group-hover:text-white transition-all duration-300">
                  <IconComponent className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-black transition-colors">
                  {topic.label}
                </span>
              </div>
            )
          })}
        </div>

        {/* Instruction */}
        <div className={`mt-16 flex items-center gap-4 text-sm text-gray-400 ${isVisible ? 'animate-fadeIn stagger-6' : 'opacity-0'}`}>
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">←</kbd>
            <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">→</kbd>
          </div>
          <span>pour naviguer</span>
          <span className="w-px h-4 bg-gray-200" />
          <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">F</kbd>
          <span>plein écran</span>
        </div>
      </div>
    </div>
  )
}
