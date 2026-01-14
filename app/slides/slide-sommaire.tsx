'use client'

import { useEffect, useState } from 'react'
import { Icons } from './icons'

export function SlideSommaire() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const sections = [
    {
      number: '01',
      title: 'App Router',
      subtitle: 'La révolution du routing Next.js',
      description: 'Découvrez pourquoi Vercel a repensé entièrement le système de routing',
      icon: Icons.folder,
      color: 'from-black to-gray-800',
    },
    {
      number: '02',
      title: 'Conventions de fichiers',
      subtitle: 'page.tsx, layout.tsx, template.tsx...',
      description: 'Chaque fichier a un rôle précis dans la hiérarchie',
      icon: Icons.file,
      color: 'from-gray-800 to-gray-600',
    },
    {
      number: '03',
      title: 'Layouts & Templates',
      subtitle: 'Persistance vs Réinitialisation',
      description: 'Comprendre la différence fondamentale entre ces deux concepts',
      icon: Icons.layout,
      color: 'from-gray-700 to-gray-500',
    },
    {
      number: '04',
      title: 'Route Groups',
      subtitle: 'Organisation sans impact URL',
      description: 'Structurez votre code avec (parenthèses)',
      icon: Icons.folder,
      color: 'from-gray-600 to-gray-400',
    },
    {
      number: '05',
      title: 'Parallel Routes',
      subtitle: 'Slots @nommés',
      description: 'Affichez plusieurs pages simultanément dans un layout',
      icon: Icons.split,
      color: 'from-gray-500 to-gray-400',
    },
    {
      number: '06',
      title: 'Intercepting Routes',
      subtitle: 'Modals & Overlays',
      description: 'Interceptez les routes pour des UX avancées',
      icon: Icons.cornerDownRight,
      color: 'from-gray-400 to-gray-300',
    },
    {
      number: '07',
      title: 'Loading & Error',
      subtitle: 'États granulaires',
      description: 'Gérez chargement et erreurs au niveau du segment',
      icon: Icons.loader,
      color: 'from-gray-500 to-gray-400',
    },
    {
      number: '08',
      title: 'Server vs Client',
      subtitle: 'Components & Actions',
      description: 'Optimisez avec le rendu hybride et les Server Actions',
      icon: Icons.server,
      color: 'from-gray-600 to-gray-500',
    },
  ]

  return (
    <div className="slide">
      <div className="slide-content flex flex-col h-full py-8">
        {/* Header */}
        <div className={`flex items-center justify-between mb-8 ${isVisible ? 'animate-fadeInDown' : 'opacity-0'}`}>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Sommaire</h1>
            <p className="text-sm text-black/40 mt-1">Ce que vous allez maîtriser</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-black/30">
            <span className="w-2 h-2 rounded-full bg-black/20" />
            <span>8 concepts clés</span>
          </div>
        </div>

        {/* Grid Layout - 2 columns */}
        <div className="grid grid-cols-2 gap-3 flex-1">
          {sections.map((section, index) => {
            const IconComponent = section.icon
            const isHovered = hoveredIndex === index
            
            return (
              <div
                key={section.number}
                className={`group relative flex items-start gap-4 p-4 rounded-xl border border-black/5 
                  bg-gradient-to-br from-white to-gray-50/50
                  hover:border-black/20 hover:shadow-lg hover:shadow-black/5
                  transition-all duration-300 cursor-default
                  ${isVisible ? `animate-fadeInUp` : 'opacity-0'}`}
                style={{ animationDelay: `${index * 50}ms` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                data-hover
              >
                {/* Number */}
                <div className={`text-5xl font-bold bg-gradient-to-br ${section.color} bg-clip-text text-transparent
                  transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
                  {section.number}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm truncate">{section.title}</h3>
                    <IconComponent className={`w-3.5 h-3.5 text-black/30 transition-all duration-300
                      ${isHovered ? 'text-black scale-110' : ''}`} />
                  </div>
                  <p className="text-xs text-black/50 font-medium mb-1">{section.subtitle}</p>
                  <p className={`text-xs text-black/30 transition-all duration-300 line-clamp-2
                    ${isHovered ? 'text-black/50' : ''}`}>
                    {section.description}
                  </p>
                </div>

                {/* Hover indicator */}
                <div className={`absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-8 rounded-full bg-black/10
                  transition-all duration-300 ${isHovered ? 'bg-black h-12' : ''}`} />
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className={`flex items-center justify-center gap-8 mt-6 pt-4 border-t border-black/5 
          ${isVisible ? 'animate-fadeIn stagger-4' : 'opacity-0'}`}>
          <div className="flex items-center gap-2 text-xs text-black/30">
            <Icons.check className="w-3.5 h-3.5" />
            <span>Basé sur Next.js 14+</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-black/30">
            <Icons.code className="w-3.5 h-3.5" />
            <span>Exemples pratiques</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-black/30">
            <Icons.zap className="w-3.5 h-3.5" />
            <span>Best practices</span>
          </div>
        </div>
      </div>
    </div>
  )
}
