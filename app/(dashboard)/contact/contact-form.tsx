'use client'

import { useState, useTransition } from 'react'
import { submitContactForm } from '@/app/actions'

export default function ContactForm() {
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<{ success: boolean; message?: string; error?: string } | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setResult(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    }

    startTransition(async () => {
      const response = await submitContactForm(data)
      setResult(response)
      
      if (response.success) {
        e.currentTarget.reset()
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium mb-2 text-foreground/70"
        >
          Nom
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          disabled={isPending}
          className="w-full px-4 py-3 bg-accent border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-foreground/20 text-foreground disabled:opacity-50"
          placeholder="Votre nom"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium mb-2 text-foreground/70"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          disabled={isPending}
          className="w-full px-4 py-3 bg-accent border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-foreground/20 text-foreground disabled:opacity-50"
          placeholder="votre@email.com"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium mb-2 text-foreground/70"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          disabled={isPending}
          rows={5}
          className="w-full px-4 py-3 bg-accent border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-foreground/20 text-foreground disabled:opacity-50 resize-none"
          placeholder="Votre message..."
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full px-6 py-3 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? 'Envoi en cours...' : 'Envoyer'}
      </button>

      {result && (
        <div
          className={`p-4 rounded-lg border ${
            result.success
              ? 'bg-green-500/10 border-green-500/30 text-green-400'
              : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}
        >
          {result.success ? result.message : result.error}
        </div>
      )}
    </form>
  )
}
