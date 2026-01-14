'use client'

import { useEffect, useState } from 'react'
import { Icons } from './icons'

export function SlideConclusion() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const skills = [
    { icon: Icons.folder, title: 'Créer des routes', level: 100 },
    { icon: Icons.layout, title: 'Gérer les layouts', level: 95 },
    { icon: Icons.split, title: 'Parallel Routes', level: 90 },
    { icon: Icons.loader, title: 'Loading/Error UI', level: 95 },
    { icon: Icons.zap, title: 'Server Actions', level: 85 },
  ]

  const bestPractices = [
    { icon: Icons.server, title: 'Server-first', desc: 'RSC par défaut' },
    { icon: Icons.box, title: 'Colocation', desc: 'Fichiers proches' },
    { icon: Icons.grid, title: 'Route Groups', desc: 'Organiser proprement' },
    { icon: Icons.loader, title: 'Granular Loading', desc: 'UX fluide' },
    { icon: Icons.alertTriangle, title: 'Error Boundaries', desc: 'Résilience' },
    { icon: Icons.activity, title: 'Streaming SSR', desc: 'Perf optimale' },
  ]

  const resources = [
    { icon: Icons.book, title: 'Documentation', url: 'nextjs.org/docs' },
    { icon: Icons.target, title: 'Learn Next.js', url: 'nextjs.org/learn' },
    { icon: Icons.code, title: 'GitHub Examples', url: 'github.com/vercel' },
  ]

  return (
    <div className="slide">
      <div className="slide-content flex flex-col h-full py-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className={`slide-badge mb-2 ${isVisible ? 'animate-fadeInDown' : 'opacity-0'}`}>
              13 — Conclusion
            </div>
            <h2 className={`text-3xl font-bold tracking-tight ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
              Récapitulatif & Ressources
            </h2>
          </div>
          <div className={`px-3 py-1.5 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-2 ${isVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
            <Icons.check className="w-3 h-3" />
            Complété
          </div>
        </div>

        {/* Main Content - 3 Columns */}
        <div className="grid grid-cols-3 gap-4 flex-1">
          {/* Left Column - Skills */}
          <div className={`flex flex-col ${isVisible ? 'animate-fadeInLeft stagger-1' : 'opacity-0'}`}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-purple-100 flex items-center justify-center">
                <Icons.award className="w-3 h-3 text-purple-600" />
              </div>
              <h3 className="font-semibold text-sm">Compétences acquises</h3>
            </div>

            <div className="space-y-3 flex-1">
              {skills.map((skill, i) => {
                const IconComponent = skill.icon
                return (
                  <div key={i} className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-black/5 flex items-center justify-center">
                          <IconComponent className="w-3 h-3 text-black/50" />
                        </div>
                        <span className="text-xs font-medium">{skill.title}</span>
                      </div>
                      <span className="text-[10px] font-mono text-black/40">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-black rounded-full transition-all duration-1000"
                        style={{ width: isVisible ? `${skill.level}%` : '0%', transitionDelay: `${i * 100}ms` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Global Score */}
            <div className="mt-3 p-4 bg-black text-white rounded-xl text-center">
              <div className="text-3xl font-bold">93%</div>
              <div className="text-xs text-white/50">Maîtrise globale</div>
            </div>
          </div>

          {/* Center Column - Best Practices */}
          <div className={`flex flex-col ${isVisible ? 'animate-fadeInUp stagger-2' : 'opacity-0'}`}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-green-100 flex items-center justify-center">
                <Icons.check className="w-3 h-3 text-green-600" />
              </div>
              <h3 className="font-semibold text-sm">Bonnes pratiques</h3>
            </div>

            <div className="grid grid-cols-2 gap-2 flex-1">
              {bestPractices.map((item, i) => {
                const IconComponent = item.icon
                return (
                  <div 
                    key={i} 
                    className="p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-300 transition-colors"
                    data-hover
                  >
                    <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center mb-2">
                      <IconComponent className="w-4 h-4 text-black/50" />
                    </div>
                    <h4 className="font-bold text-xs mb-0.5">{item.title}</h4>
                    <p className="text-[10px] text-black/40">{item.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column - Resources */}
          <div className={`flex flex-col ${isVisible ? 'animate-fadeInRight stagger-3' : 'opacity-0'}`}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-blue-100 flex items-center justify-center">
                <Icons.book className="w-3 h-3 text-blue-600" />
              </div>
              <h3 className="font-semibold text-sm">Ressources</h3>
            </div>

            <div className="space-y-2 flex-1">
              {resources.map((link, i) => {
                const IconComponent = link.icon
                return (
                  <a 
                    key={i}
                    href={`https://${link.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-black transition-all"
                    data-hover
                  >
                    <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-colors">
                      <IconComponent className="w-4 h-4 text-black/50 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-xs">{link.title}</h4>
                      <p className="text-[10px] text-black/40 truncate">{link.url}</p>
                    </div>
                    <Icons.arrowRight className="w-3 h-3 text-black/20 group-hover:text-black group-hover:translate-x-1 transition-all" />
                  </a>
                )
              })}
            </div>

            {/* Next Slide CTA */}
            <div className="mt-3 p-4 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <Icons.target className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Prêt à pratiquer ?</h4>
                  <p className="text-[10px] text-white/70">Quiz & mini-jeux</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/60">
                <Icons.arrowRight className="w-3 h-3" />
                <span>Slide suivante</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`mt-4 p-4 bg-gray-900 text-white rounded-xl flex items-center justify-between ${isVisible ? 'animate-fadeInUp stagger-4' : 'opacity-0'}`}>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Icons.check className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h4 className="font-bold">Merci pour votre attention !</h4>
              <p className="text-xs text-white/50">Des questions ? Let's discuss!</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs text-white/30">Next.js</div>
              <div className="font-bold">App Router</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
