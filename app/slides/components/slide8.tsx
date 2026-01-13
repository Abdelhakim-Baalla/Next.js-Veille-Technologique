export default function Slide8() {
  return (
    <div className="space-y-8 animate-slide-up">
      <div className="text-center space-y-4">
        <div className="inline-block px-6 py-3 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
          Concept 6
        </div>
        <h2 className="text-6xl font-bold gradient-text">Server Actions</h2>
        <p className="text-2xl text-foreground/60 font-light">
          Actions côté serveur avec revalidation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="glass-strong p-8 rounded-2xl border border-border">
          <div className="font-mono text-sm text-primary mb-4">Syntaxe</div>
          <pre className="bg-accent p-4 rounded-lg text-sm overflow-x-auto">
{`'use server'

export async function 
  submitForm(data) {
  // Traitement...
  revalidatePath('/dashboard')
  return { success: true }
}`}
          </pre>
        </div>

        <div className="glass-strong p-8 rounded-2xl border border-border">
          <div className="font-mono text-sm text-primary mb-4">Utilisation</div>
          <pre className="bg-accent p-4 rounded-lg text-sm overflow-x-auto">
{`'use client'

import { useTransition } 
  from 'react'

const [isPending, 
  startTransition] = 
  useTransition()

startTransition(async () => {
  await submitForm(data)
})`}
          </pre>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-8">
        {[
          { icon: '🔒', text: 'Type-safe' },
          { icon: '⚡', text: 'Pas d\'API Routes' },
          { icon: '🔄', text: 'Revalidation cache' },
        ].map((item, idx) => (
          <div
            key={idx}
            className="glass p-6 rounded-xl text-center card-hover"
          >
            <div className="text-4xl mb-2">{item.icon}</div>
            <div className="text-sm font-medium">{item.text}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
