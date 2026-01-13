'use client'

import { useEffect, useState } from 'react'

export function SlideIntro() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="h-full flex flex-col items-center justify-center px-8 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 border-2 border-black/5 rounded-full animate-float" />
        <div className="absolute bottom-32 right-32 w-48 h-48 border-2 border-black/5 rounded-3xl rotate-12 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/4 right-1/4 w-32 h-32 border-2 border-black/5 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl">
        {/* Badge */}
        <div 
          className={`inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
          <span className="text-sm font-medium">Veille Technologique</span>
        </div>

        {/* Title */}
        <h1 
          className={`text-6xl md:text-8xl font-bold tracking-tight mb-6 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Next.js
          <span className="block text-gray-300">Routing</span>
        </h1>

        {/* Subtitle */}
        <p 
          className={`text-xl md:text-2xl text-gray-600 mb-12 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Maîtriser l'App Router de A à Z
        </p>

        {/* Topics Preview */}
        <div 
          className={`flex flex-wrap justify-center gap-3 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            'App Router',
            'Layouts',
            'Parallel Routes',
            'Intercepting Routes',
            'Loading UI',
            'Error Handling',
            'Server Actions',
            'Middleware',
          ].map((topic, i) => (
            <span
              key={topic}
              className="px-4 py-2 border border-gray-200 rounded-full text-sm font-medium hover:border-black hover:bg-black hover:text-white transition-all cursor-default"
              style={{ animationDelay: `${0.4 + i * 0.05}s` }}
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Version Badge */}
      <div 
        className={`absolute bottom-24 left-1/2 -translate-x-1/2 transition-all duration-700 delay-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex items-center gap-3 px-4 py-2 bg-black text-white rounded-full text-sm">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.251 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.572 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" />
          </svg>
          <span className="font-semibold">Next.js 15</span>
        </div>
      </div>
    </div>
  )
}
