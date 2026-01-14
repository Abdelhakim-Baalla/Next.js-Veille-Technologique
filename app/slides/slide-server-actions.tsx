'use client'

import { useEffect, useState } from 'react'
import { Icons } from './icons'
import { SyntaxHighlighter } from './syntax-highlighter'

export function SlideServerActions() {
  const [isVisible, setIsVisible] = useState(false)
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle')

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const simulateSubmit = () => {
    setFormState('loading')
    setTimeout(() => {
      setFormState('success')
      setTimeout(() => setFormState('idle'), 2000)
    }, 1200)
  }

  return (
    <div className="slide">
      <div className="slide-content flex flex-col h-full py-6">
        {/* Compact Header */}
        <div className="mb-4">
          <div className={`slide-badge mb-1 ${isVisible ? 'animate-fadeInDown' : 'opacity-0'}`}>
            10 — Server Actions
          </div>
          <h2 className={`text-2xl font-bold tracking-tight ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
            Server Actions <span className="font-mono text-lg bg-gray-100 px-2 py-0.5 rounded">"use server"</span>
          </h2>
        </div>

        {/* Main 3-Column Layout */}
        <div className="flex gap-4 flex-1">
          {/* Left: Concept + Benefits */}
          <div className={`w-1/4 flex flex-col gap-3 ${isVisible ? 'animate-fadeInLeft stagger-1' : 'opacity-0'}`}>
            {/* Concept */}
            <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
              <p className="text-xs font-semibold text-purple-700 mb-2 flex items-center gap-1.5">
                <Icons.server className="w-3.5 h-3.5" /> Qu'est-ce que c'est ?
              </p>
              <p className="text-xs text-purple-600/80 leading-relaxed">
                Des <strong>fonctions côté serveur</strong> appelables directement depuis vos composants. Plus besoin d'API routes pour les mutations !
              </p>
            </div>

            {/* Features */}
            <div className="p-4 bg-black text-white rounded-xl flex-1">
              <p className="text-xs font-medium mb-2 flex items-center gap-2">
                <Icons.zap className="w-3.5 h-3.5" /> Fonctions intégrées
              </p>
              <div className="space-y-2">
                {[
                  { name: 'revalidatePath()', desc: 'Rafraîchir route' },
                  { name: 'revalidateTag()', desc: 'Invalider cache' },
                  { name: 'redirect()', desc: 'Redirection' },
                  { name: 'cookies()', desc: 'Lire/écrire cookies' },
                ].map((f, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="font-mono text-white/90">{f.name}</span>
                    <span className="text-white/50">{f.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tip */}
            <div className="p-3 bg-yellow-50 rounded-xl border border-yellow-200">
              <p className="text-xs text-yellow-800 flex items-start gap-2">
                <Icons.lightbulb className="w-3.5 h-3.5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <span>useFormStatus et useFormState pour gérer pending/errors côté client.</span>
              </p>
            </div>
          </div>

          {/* Center: Code Examples */}
          <div className={`flex-1 flex flex-col gap-3 ${isVisible ? 'animate-fadeIn stagger-2' : 'opacity-0'}`}>
            {/* Two ways to define */}
            <div className="flex gap-3 flex-1">
              {/* Inline */}
              <div className="code-window flex-1 flex flex-col">
                <div className="code-header py-2">
                  <div className="code-dot red" />
                  <div className="code-dot yellow" />
                  <div className="code-dot green" />
                  <span className="code-title text-xs">1. Inline dans composant</span>
                </div>
                <div className="code-body !p-3 flex-1">
                  <SyntaxHighlighter code={`// app/contact/page.tsx (Server)\nexport default function Page() {\n  \n  async function submit(formData: FormData) {\n    'use server'  // ← Dans la fonction\n    \n    const email = formData.get('email')\n    await db.contact.create({ \n      data: { email } \n    })\n    revalidatePath('/contacts')\n  }\n\n  return (\n    <form action={submit}>\n      <input name="email" />\n      <button>Envoyer</button>\n    </form>\n  )\n}`} />
                </div>
              </div>

              {/* Separate file */}
              <div className="code-window flex-1 flex flex-col">
                <div className="code-header py-2">
                  <div className="code-dot red" />
                  <div className="code-dot yellow" />
                  <div className="code-dot green" />
                  <span className="code-title text-xs">2. Fichier dédié</span>
                </div>
                <div className="code-body !p-3 flex-1">
                  <SyntaxHighlighter code={`// app/actions.ts\n'use server'  // ← Tout le fichier\n\nimport { db } from '@/lib/db'\nimport { revalidatePath } from 'next/cache'\nimport { redirect } from 'next/navigation'\n\nexport async function createUser(formData: FormData) {\n  const user = await db.user.create({\n    data: {\n      name: formData.get('name'),\n      email: formData.get('email'),\n    }\n  })\n  \n  revalidatePath('/users')\n  redirect('/users/' + user.id)\n}`} />
                </div>
              </div>
            </div>

            {/* Demo Form */}
            <div className="browser">
              <div className="browser-header">
                <div className="browser-dots">
                  <div className="code-dot red" />
                  <div className="code-dot yellow" />
                  <div className="code-dot green" />
                </div>
                <div className="browser-url text-xs">localhost:3000/contact</div>
              </div>
              <div className="browser-body !p-4">
                <form 
                  className="flex gap-3"
                  onSubmit={(e) => { e.preventDefault(); simulateSubmit() }}
                >
                  <input 
                    type="email" 
                    className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-black outline-none transition-colors text-sm"
                    placeholder="votre@email.com"
                    disabled={formState === 'loading'}
                  />
                  <button 
                    type="submit"
                    data-hover
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all min-w-[100px] ${
                      formState === 'success' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-black text-white'
                    }`}
                    disabled={formState === 'loading'}
                  >
                    {formState === 'idle' && 'Envoyer'}
                    {formState === 'loading' && (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin rounded-full h-3 w-3 border-2 border-white border-t-transparent" />
                      </span>
                    )}
                    {formState === 'success' && <Icons.check className="w-4 h-4 mx-auto" />}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Right: Flow Diagram */}
          <div className={`w-1/4 flex flex-col gap-3 ${isVisible ? 'animate-fadeInRight stagger-3' : 'opacity-0'}`}>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex-1">
              <p className="text-xs font-medium text-black/40 mb-3">Flux d'exécution</p>
              <div className="space-y-2">
                {[
                  { step: '1', text: 'Formulaire submit', icon: Icons.zap },
                  { step: '2', text: 'POST automatique', icon: Icons.arrowRight },
                  { step: '3', text: 'Action exécutée serveur', icon: Icons.server },
                  { step: '4', text: 'Mutation DB', icon: Icons.layers },
                  { step: '5', text: 'revalidatePath()', icon: Icons.refresh },
                  { step: '6', text: 'UI mise à jour', icon: Icons.monitor },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[10px]">
                      {item.step}
                    </div>
                    <item.icon className="w-3 h-3 text-black/40" />
                    <span className="text-black/70">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Comparison */}
            <div className="p-3 bg-green-50 rounded-xl border border-green-100">
              <p className="text-xs font-semibold text-green-700 mb-2">vs API Routes traditionnelles</p>
              <div className="space-y-1 text-xs text-green-600/80">
                <p>✓ Pas de fetch() manuel</p>
                <p>✓ Type-safe end-to-end</p>
                <p>✓ Revalidation intégrée</p>
                <p>✓ Progressive enhancement</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Key Insight */}
        <div className={`mt-4 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100 
          ${isVisible ? 'animate-fadeInUp stagger-4' : 'opacity-0'}`}>
          <div className="flex items-center gap-3">
            <Icons.lightbulb className="w-5 h-5 text-purple-600" />
            <p className="text-xs">
              <strong>Progressive Enhancement :</strong> Les Server Actions fonctionnent même sans JavaScript activé ! Le formulaire fait un POST classique et Next.js gère le reste.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
