'use client'

import { useEffect, useState } from 'react'
import { Icons } from './icons'

export function SlideIntro() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    { icon: Icons.folder, label: 'File-based', desc: 'Routes = Fichiers' },
    { icon: Icons.layers, label: 'Layouts', desc: 'UI partagée' },
    { icon: Icons.server, label: 'Server', desc: 'RSC natif' },
    { icon: Icons.zap, label: 'Actions', desc: 'Mutations' },
  ]

  return (
    <div className="slide bg-[#fafafa]">
      <div className="slide-content flex flex-col h-full py-8">
        {/* Minimal Header */}
        <div className={`flex items-center justify-between mb-12 ${isVisible ? 'animate-fadeInDown' : 'opacity-0'}`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">01</span>
            </div>
            <div className="h-px w-8 bg-black/20" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-black/40 font-medium">Introduction</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-black/30">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            Next.js 15
          </div>
        </div>

        {/* Main Content - Modern Layout */}
        <div className="flex-1 flex items-center">
          <div className="flex gap-16 w-full">
            {/* Left - Typography Hero */}
            <div className={`flex-1 ${isVisible ? 'animate-fadeInLeft' : 'opacity-0'}`}>
              <div className="mb-8">
                <p className="text-[10px] uppercase tracking-[0.3em] text-black/30 mb-4">Masterclass</p>
                <h1 className="text-7xl font-black tracking-[-0.04em] leading-[0.85]">
                  <span className="block">Next.js</span>
                  <span className="block text-black/20">App Router</span>
                </h1>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-black/10" />
                <span className="text-xs text-black/40">Le routing réinventé</span>
              </div>

              <p className="text-sm text-black/50 leading-relaxed max-w-md">
                Architecture file-based, Server Components natifs, 
                et les patterns les plus avancés de l'écosystème React.
              </p>
            </div>

            {/* Center - Geometric Visual */}
            <div className={`flex-1 flex items-center justify-center ${isVisible ? 'animate-fadeIn stagger-1' : 'opacity-0'}`}>
              <div className="relative">
                {/* Main geometric shape */}
                <div className="relative w-48 h-48">
                  {/* Outer ring */}
                  <div className="absolute inset-0 border-2 border-black/5 rounded-full" />
                  <div className="absolute inset-4 border border-black/10 rounded-full" />
                  <div className="absolute inset-8 border border-dashed border-black/10 rounded-full" />
                  
                  {/* Center block */}
                  <div className="absolute inset-12 bg-black rounded-2xl flex items-center justify-center shadow-2xl">
                    <div className="text-center">
                      <Icons.layers className="w-10 h-10 text-white mx-auto mb-1" />
                      <span className="text-[8px] uppercase tracking-widest text-white/50">Router</span>
                    </div>
                  </div>
                  
                  {/* Floating badges */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-white rounded-full shadow-lg border border-gray-100">
                    <span className="text-[10px] font-medium">page.tsx</span>
                  </div>
                  <div className="absolute top-1/2 -right-4 -translate-y-1/2 px-3 py-1.5 bg-white rounded-full shadow-lg border border-gray-100">
                    <span className="text-[10px] font-medium">layout.tsx</span>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-white rounded-full shadow-lg border border-gray-100">
                    <span className="text-[10px] font-medium">loading.tsx</span>
                  </div>
                  <div className="absolute top-1/2 -left-4 -translate-y-1/2 px-3 py-1.5 bg-white rounded-full shadow-lg border border-gray-100">
                    <span className="text-[10px] font-medium">error.tsx</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Features & CTA */}
            <div className={`w-72 ${isVisible ? 'animate-fadeInRight stagger-2' : 'opacity-0'}`}>
              {/* Features */}
              <div className="space-y-3 mb-8">
                {features.map((feature, i) => {
                  const IconComponent = feature.icon
                  return (
                    <div 
                      key={i}
                      className="flex items-center gap-4 p-3 bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
                    >
                      <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <span className="block text-sm font-semibold">{feature.label}</span>
                        <span className="text-[10px] text-black/40">{feature.desc}</span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))}
                data-hover
                className="group w-full p-4 bg-black text-white rounded-xl hover:shadow-xl transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <Icons.play className="w-4 h-4" />
                  </div>
                  <span className="font-semibold">Commencer</span>
                </div>
                <Icons.arrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Hint */}
              <div className="flex items-center justify-center gap-2 mt-4">
                <kbd className="px-2 py-1 bg-white rounded border border-gray-200 text-[10px] font-mono">→</kbd>
                <span className="text-[10px] text-black/30">pour naviguer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

