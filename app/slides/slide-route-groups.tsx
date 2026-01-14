'use client'

import { useEffect, useState } from 'react'
import { Icons } from './icons'

export function SlideRouteGroups() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="slide">
      <div className="slide-content">
        {/* Header */}
        <div className="slide-header">
          <div className={`slide-badge ${isVisible ? 'animate-fadeInDown' : 'opacity-0'}`}>
            04 — Organisation
          </div>
          <h2 className={`text-display mb-4 ${isVisible ? 'animate-fadeInUp stagger-1' : 'opacity-0'}`}>
            Route Groups <span className="code-inline">(folder)</span>
          </h2>
          <p className={`text-subtitle max-w-3xl ${isVisible ? 'animate-fadeInUp stagger-2' : 'opacity-0'}`}>
            Organisez vos routes logiquement sans impacter la structure d'URL. 
            Les parenthèses <span className="code-inline">(nom)</span> créent un groupe qui n'apparaît pas dans le path.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Structure Example */}
          <div className={`${isVisible ? 'animate-fadeInLeft stagger-3' : 'opacity-0'}`}>
            <div className="code-window h-full">
              <div className="code-header">
                <div className="code-dot red" />
                <div className="code-dot yellow" />
                <div className="code-dot green" />
                <span className="code-title">Structure de dossiers</span>
              </div>
              <div className="code-body">
                <pre>{`app/
├── (marketing)/
│   ├── layout.tsx      ← Layout public
│   ├── page.tsx        → /
│   ├── about/
│   │   └── page.tsx    → /about
│   └── pricing/
│       └── page.tsx    → /pricing
│
├── (dashboard)/
│   ├── layout.tsx      ← Layout admin
│   ├── dashboard/
│   │   └── page.tsx    → /dashboard
│   ├── settings/
│   │   └── page.tsx    → /settings
│   └── analytics/
│       └── page.tsx    → /analytics
│
└── (auth)/
    ├── layout.tsx      ← Layout centré
    ├── login/
    │   └── page.tsx    → /login
    └── register/
        └── page.tsx    → /register`}</pre>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className={`space-y-4 ${isVisible ? 'animate-fadeInRight stagger-4' : 'opacity-0'}`}>
            <div className="card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Icons.folder className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Organisation Logique</h3>
                  <p className="text-sm text-gray-600">
                    Groupez les routes par fonctionnalité, équipe, ou domaine métier 
                    sans polluer vos URLs. Parfait pour les grandes applications.
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Icons.layout className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Layouts Multiples</h3>
                  <p className="text-sm text-gray-600">
                    Chaque groupe peut avoir son propre layout.tsx. Le marketing 
                    peut avoir un header simple, le dashboard une sidebar complète.
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Icons.link className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">URLs Propres</h3>
                  <p className="text-sm text-gray-600">
                    Le nom du groupe n'apparaît jamais dans l'URL. 
                    <span className="code-inline">(marketing)/about</span> → <span className="code-inline">/about</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 rounded-xl border-2 border-yellow-200 flex items-start gap-3">
              <Icons.alertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm">
                <span className="font-semibold">Attention :</span> Deux route groups 
                ne peuvent pas résoudre vers le même URL. Par exemple, 
                <span className="code-inline">(marketing)/about</span> et 
                <span className="code-inline">(shop)/about</span> créeront un conflit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
