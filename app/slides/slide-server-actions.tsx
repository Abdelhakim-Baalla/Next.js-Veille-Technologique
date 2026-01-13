'use client'

import { useEffect, useState } from 'react'

export function SlideServerActions() {
  const [isVisible, setIsVisible] = useState(false)
  const [formState, setFormState] = useState<'idle' | 'pending' | 'success'>('idle')
  const [activeTab, setActiveTab] = useState<'form' | 'inline' | 'revalidate'>('form')

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSubmit = () => {
    setFormState('pending')
    setTimeout(() => {
      setFormState('success')
      setTimeout(() => setFormState('idle'), 2000)
    }, 1500)
  }

  const codeExamples = {
    form: {
      title: 'Server Action dans un formulaire',
      code: `// app/actions.ts
'use server'

export async function createUser(formData: FormData) {
  const name = formData.get('name')
  const email = formData.get('email')
  
  // ✅ Exécuté sur le serveur uniquement
  await db.users.create({ 
    data: { name, email } 
  })
  
  // Revalider le cache
  revalidatePath('/users')
}

// app/users/page.tsx
import { createUser } from '@/app/actions'

export default function UsersPage() {
  return (
    <form action={createUser}>
      <input name="name" />
      <input name="email" />
      <button type="submit">
        Créer
      </button>
    </form>
  )
}`
    },
    inline: {
      title: 'Action inline',
      code: `// app/posts/page.tsx

export default function PostsPage() {
  async function likePost(formData: FormData) {
    'use server' // 👈 Inline dans le composant
    
    const postId = formData.get('postId')
    
    await db.posts.update({
      where: { id: postId },
      data: { 
        likes: { increment: 1 } 
      }
    })
    
    revalidatePath('/posts')
  }
  
  return (
    <form action={likePost}>
      <input type="hidden" name="postId" value="123" />
      <button>❤️ Like</button>
    </form>
  )
}`
    },
    revalidate: {
      title: 'Revalidation & Redirect',
      code: `// app/actions.ts
'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

export async function updateProfile(formData: FormData) {
  const userId = formData.get('userId')
  
  await db.users.update({
    where: { id: userId },
    data: {
      name: formData.get('name'),
      bio: formData.get('bio')
    }
  })
  
  // Option 1: Revalider un path spécifique
  revalidatePath('/profile')
  
  // Option 2: Revalider par tag
  revalidateTag('user-data')
  
  // Option 3: Rediriger après succès
  redirect('/profile/success')
}`
    }
  }

  return (
    <div className="h-full flex items-center justify-center px-8 py-20">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className={`mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white rounded-full text-xs font-mono mb-4">
            11 / Server Actions
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Server Actions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl">
            Mutations de données sans API routes - directement dans vos composants
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Interactive Demo */}
          <div className={`transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="bg-gray-100 rounded-2xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-gray-500 font-mono">
                  localhost:3000/users/new
                </div>
              </div>

              <div className="bg-white rounded-xl p-6">
                <h3 className="font-semibold mb-4">Créer un utilisateur</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Nom</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
                      disabled={formState !== 'idle'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Email</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
                      disabled={formState !== 'idle'}
                    />
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={formState !== 'idle'}
                    className={`w-full py-3 rounded-lg text-sm font-medium transition-all ${
                      formState === 'idle'
                        ? 'bg-black text-white hover:bg-gray-800'
                        : formState === 'pending'
                        ? 'bg-gray-300 text-gray-500'
                        : 'bg-green-500 text-white'
                    }`}
                  >
                    {formState === 'idle' && 'Créer utilisateur'}
                    {formState === 'pending' && (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                        Création en cours...
                      </span>
                    )}
                    {formState === 'success' && '✓ Utilisateur créé!'}
                  </button>
                </div>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-green-50 rounded-xl">
                <div className="text-xl mb-1">🔒</div>
                <h4 className="font-semibold text-sm mb-1">Sécurisé</h4>
                <p className="text-xs text-gray-600">Le code reste sur le serveur</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <div className="text-xl mb-1">⚡</div>
                <h4 className="font-semibold text-sm mb-1">Progressif</h4>
                <p className="text-xs text-gray-600">Fonctionne sans JavaScript</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl">
                <div className="text-xl mb-1">🔄</div>
                <h4 className="font-semibold text-sm mb-1">Revalidation</h4>
                <p className="text-xs text-gray-600">Mise à jour du cache intégrée</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-xl">
                <div className="text-xl mb-1">📝</div>
                <h4 className="font-semibold text-sm mb-1">FormData</h4>
                <p className="text-xs text-gray-600">API native du navigateur</p>
              </div>
            </div>
          </div>

          {/* Code Examples */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            {/* Tabs */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {(['form', 'inline', 'revalidate'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab
                      ? 'bg-black text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {tab === 'form' ? 'Formulaire' : tab === 'inline' ? 'Inline' : 'Revalidation'}
                </button>
              ))}
            </div>

            <div className="bg-gray-900 rounded-2xl p-6 h-[400px] overflow-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-gray-400 text-sm font-mono">
                  {codeExamples[activeTab].title}
                </span>
              </div>
              
              <pre className="text-xs font-mono text-gray-100 overflow-x-auto whitespace-pre-wrap">
                <code>{codeExamples[activeTab].code}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Important Note */}
        <div className={`mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-sm text-yellow-800">
            <strong>💡 'use server'</strong> - Cette directive marque une fonction comme Server Action. Elle peut être utilisée en haut d'un fichier (toutes les fonctions sont des actions) ou inline dans une fonction async.
          </p>
        </div>
      </div>
    </div>
  )
}
