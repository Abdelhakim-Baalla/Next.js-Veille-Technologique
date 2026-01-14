'use client'

import { useEffect, useState } from 'react'
import { Icons } from './icons'

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
    }, 1500)
  }

  return (
    <div className="slide">
      <div className="slide-content">
        {/* Header */}
        <div className="slide-header">
          <div className={`slide-badge ${isVisible ? 'animate-fadeInDown' : 'opacity-0'}`}>
            10 — Server Actions
          </div>
          <h2 className={`text-display mb-4 ${isVisible ? 'animate-fadeInUp stagger-1' : 'opacity-0'}`}>
            Server Actions <span className="code-inline">'use server'</span>
          </h2>
          <p className={`text-subtitle max-w-3xl ${isVisible ? 'animate-fadeInUp stagger-2' : 'opacity-0'}`}>
            Exécutez des fonctions côté serveur directement depuis vos composants.
            Mutations, formulaires, et revalidation — sans créer d'API routes !
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Syntaxe */}
          <div className={`${isVisible ? 'animate-fadeInLeft stagger-3' : 'opacity-0'}`}>
            <h3 className="text-title mb-4">Deux façons de définir</h3>
            
            <div className="code-window mb-4">
              <div className="code-header">
                <div className="code-dot red" />
                <div className="code-dot yellow" />
                <div className="code-dot green" />
                <span className="code-title">1. Dans le composant (Server)</span>
              </div>
              <div className="code-body">
                <pre>{`// app/contact/page.tsx (Server Component)

export default function ContactPage() {
  
  async function sendMessage(formData: FormData) {
    'use server' // ← Dans la fonction
    
    const email = formData.get('email')
    const message = formData.get('message')
    
    await db.message.create({
      data: { email, message }
    })
    
    revalidatePath('/messages')
  }

  return (
    <form action={sendMessage}>
      <input name="email" type="email" />
      <textarea name="message" />
      <button type="submit">Envoyer</button>
    </form>
  )
}`}</pre>
              </div>
            </div>

            <div className="code-window">
              <div className="code-header">
                <div className="code-dot red" />
                <div className="code-dot yellow" />
                <div className="code-dot green" />
                <span className="code-title">2. Fichier dédié</span>
              </div>
              <div className="code-body">
                <pre>{`// app/actions.ts
'use server' // ← Tout le fichier

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function createUser(formData: FormData) {
  const user = await db.user.create({
    data: {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
    }
  })
  
  revalidatePath('/users')
  return user
}

export async function deleteUser(id: string) {
  await db.user.delete({ where: { id } })
  revalidatePath('/users')
}`}</pre>
              </div>
            </div>
          </div>

          {/* Demo & Features */}
          <div className={`${isVisible ? 'animate-fadeInRight stagger-4' : 'opacity-0'}`}>
            <h3 className="text-title mb-4">Démo : Formulaire avec Server Action</h3>
            
            <div className="browser mb-4">
              <div className="browser-header">
                <div className="browser-dots">
                  <div className="code-dot red" />
                  <div className="code-dot yellow" />
                  <div className="code-dot green" />
                </div>
                <div className="browser-url">localhost:3000/contact</div>
              </div>
              <div className="browser-body !p-6">
                <form 
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault()
                    simulateSubmit()
                  }}
                >
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-black outline-none transition-colors"
                      placeholder="votre@email.com"
                      disabled={formState === 'loading'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Message</label>
                    <textarea 
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-black outline-none transition-colors resize-none"
                      rows={3}
                      placeholder="Votre message..."
                      disabled={formState === 'loading'}
                    />
                  </div>
                  <button 
                    type="submit"
                    className={`w-full py-3 rounded-xl font-medium transition-all ${
                      formState === 'success' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-black text-white hover:bg-gray-800'
                    }`}
                    disabled={formState === 'loading'}
                    data-hover="true"
                  >
                    {formState === 'idle' && 'Envoyer'}
                    {formState === 'loading' && (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        Envoi en cours...
                      </span>
                    )}
                    {formState === 'success' && '✓ Envoyé !'}
                  </button>
                </form>
              </div>
            </div>

            <h3 className="text-title mb-4">Fonctionnalités Clés</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-lg mb-2">🔄</div>
                <h4 className="font-medium text-sm mb-1">revalidatePath</h4>
                <p className="text-xs text-gray-500">Rafraîchit le cache d'une route</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-lg mb-2">🏷️</div>
                <h4 className="font-medium text-sm mb-1">revalidateTag</h4>
                <p className="text-xs text-gray-500">Invalide par tag de cache</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-lg mb-2">↩️</div>
                <h4 className="font-medium text-sm mb-1">redirect()</h4>
                <p className="text-xs text-gray-500">Redirection après mutation</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-lg mb-2">🍪</div>
                <h4 className="font-medium text-sm mb-1">cookies()</h4>
                <p className="text-xs text-gray-500">Lecture/écriture cookies</p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
              <p className="text-xs text-yellow-800">
                <strong>💡 Tip:</strong> useFormStatus et useFormState de React 
                permettent de gérer l'état pending et les erreurs côté client.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
