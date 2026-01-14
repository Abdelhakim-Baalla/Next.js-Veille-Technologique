'use client'

import { useEffect, useState } from 'react'
import { Icons } from './icons'

export function SlideIntro() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    { icon: Icons.folder, label: 'File-based Routing' },
    { icon: Icons.layers, label: 'Nested Layouts' },
    { icon: Icons.server, label: 'Server Components' },
    { icon: Icons.zap, label: 'Server Actions' },
  ]

  return (
    <div className="slide">
      <div className="slide-content flex flex-col h-full py-6">
        {/* Header Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 bg-black text-white text-xs font-mono rounded-full ${isVisible ? 'animate-fadeInDown' : 'opacity-0'}`}>
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Next.js 15 — App Router
          </div>
          <div className={`flex items-center gap-2 text-xs text-black/40 ${isVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
            <Icons.clock className="w-3 h-3" />
            <span>~15 min</span>
          </div>
        </div>

        {/* Main Content - 3 Column Layout */}
        <div className="flex gap-6 flex-1">
          {/* Left Column - Title & Description */}
          <div className={`flex-1 flex flex-col justify-center ${isVisible ? 'animate-fadeInLeft' : 'opacity-0'}`}>
            <div className="mb-6">
              <h1 className="text-6xl font-black tracking-tighter leading-[0.9] mb-4">
                <span className="block text-black">Next.js</span>
                <span className="block text-black/30">Routing</span>
              </h1>
              <div className="flex items-center gap-3">
                <div className="h-1 w-16 bg-black rounded-full" />
                <span className="text-sm text-black/40 font-medium">Système de routage moderne</span>
              </div>
            </div>

            <p className="text-sm text-black/50 leading-relaxed max-w-sm mb-6">
              Maîtrisez le système de routing le plus puissant de l'écosystème React. 
              Architecture file-based, Server Components, et patterns avancés.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-2">
              {features.map((feature, i) => {
                const IconComponent = feature.icon
                return (
                  <div 
                    key={i}
                    className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-100"
                  >
                    <div className="w-6 h-6 rounded bg-black flex items-center justify-center">
                      <IconComponent className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-xs font-medium text-black/70">{feature.label}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Center Column - Visual Diagram */}
          <div className={`flex-1 flex items-center justify-center ${isVisible ? 'animate-fadeInUp stagger-1' : 'opacity-0'}`}>
            <div className="relative">
              {/* Central Logo */}
              <div className="w-32 h-32 rounded-2xl bg-black flex items-center justify-center shadow-2xl">
                <Icons.layers className="w-16 h-16 text-white" />
              </div>
              
              {/* Orbiting Elements */}
              <div className="absolute -top-6 -right-6 w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg animate-float-slow">
                <Icons.file className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-8 w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center shadow-lg animate-float-reverse">
                <Icons.server className="w-5 h-5 text-white" />
              </div>
              <div className="absolute top-1/2 -right-12 w-8 h-8 rounded-md bg-purple-500 flex items-center justify-center shadow-lg animate-pulse-slow">
                <Icons.zap className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -top-2 -left-10 w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center shadow-lg animate-float-slow" style={{ animationDelay: '1s' }}>
                <Icons.shield className="w-4 h-4 text-white" />
              </div>

              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
                <line x1="64" y1="0" x2="64" y2="-20" stroke="black" strokeWidth="1" strokeDasharray="4,4" opacity="0.2" />
                <line x1="128" y1="64" x2="148" y2="64" stroke="black" strokeWidth="1" strokeDasharray="4,4" opacity="0.2" />
                <line x1="64" y1="128" x2="64" y2="148" stroke="black" strokeWidth="1" strokeDasharray="4,4" opacity="0.2" />
                <line x1="0" y1="64" x2="-20" y2="64" stroke="black" strokeWidth="1" strokeDasharray="4,4" opacity="0.2" />
              </svg>
            </div>
          </div>

          {/* Right Column - CTA */}
          <div className={`w-64 flex flex-col justify-center ${isVisible ? 'animate-fadeInRight stagger-2' : 'opacity-0'}`}>
            {/* CTA Button */}
            <button
              onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))}
              data-hover
              className="group flex items-center justify-between w-full p-4 bg-black text-white rounded-xl hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-3">
                <Icons.play className="w-5 h-5" />
                <span className="font-semibold">Commencer</span>
              </div>
              <Icons.arrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Keyboard Hint */}
            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-black/30">
              <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-200 font-mono text-[10px]">→</kbd>
              <span>pour naviguer</span>
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}
