'use client'

import { useEffect, useState } from 'react'

export function SlideIntro() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="slide">
      <div className="slide-content flex flex-col items-center justify-center h-full">
        {/* Minimal Hero - Just the title */}
        <div className="flex flex-col items-center justify-center flex-1">
          {/* Decorative line */}
          <div className={`w-px h-20 bg-gradient-to-b from-transparent via-black/20 to-black/40 mb-12 ${isVisible ? 'animate-scaleIn' : 'opacity-0'}`} />
          
          {/* Main Title */}
          <h1 className={`text-[8rem] md:text-[12rem] font-bold tracking-tighter leading-none ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <span className="block text-black">Next.js</span>
          </h1>
          
          <h2 className={`text-[4rem] md:text-[6rem] font-light tracking-tight text-black/30 -mt-4 ${isVisible ? 'animate-fadeInUp stagger-1' : 'opacity-0'}`}>
            Routing
          </h2>

          {/* Decorative line */}
          <div className={`w-px h-20 bg-gradient-to-t from-transparent via-black/20 to-black/40 mt-12 ${isVisible ? 'animate-scaleIn stagger-2' : 'opacity-0'}`} />
        </div>

        {/* Footer info */}
        <div className={`flex items-center justify-between w-full max-w-4xl mt-auto pb-4 ${isVisible ? 'animate-fadeIn stagger-3' : 'opacity-0'}`}>
          <span className="text-xs text-black/30 tracking-widest uppercase">Veille Technologique</span>
          <span className="text-xs text-black/30">2024</span>
        </div>
      </div>
    </div>
  )
}
