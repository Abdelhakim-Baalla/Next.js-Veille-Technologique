'use client'

import { useActionState } from 'react'
import { submitContactForm } from '../../../actions'
import { IconSpinner, IconCheck } from '../../../components/icons'

const initialState = {
  success: false,
  message: '',
  errors: {},
}

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState)

  if (state.success) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-50 flex items-center justify-center">
          <IconCheck className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Message Sent</h3>
        <p className="text-gray-600 text-sm">{state.message}</p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-5">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your name"
          className={`input ${state.errors?.name ? 'border-red-300 focus:border-red-500' : ''}`}
          disabled={isPending}
        />
        {state.errors?.name && (
          <p className="text-red-500 text-xs mt-1.5">{state.errors.name}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="you@example.com"
          className={`input ${state.errors?.email ? 'border-red-300 focus:border-red-500' : ''}`}
          disabled={isPending}
        />
        {state.errors?.email && (
          <p className="text-red-500 text-xs mt-1.5">{state.errors.email}</p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Your message..."
          rows={4}
          className={`input resize-none ${state.errors?.message ? 'border-red-300 focus:border-red-500' : ''}`}
          disabled={isPending}
        />
        {state.errors?.message && (
          <p className="text-red-500 text-xs mt-1.5">{state.errors.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending}
        className="btn-primary w-full flex items-center justify-center gap-2 interactive"
      >
        {isPending ? (
          <>
            <IconSpinner className="w-4 h-4" />
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>

      {/* Error Message */}
      {state.message && !state.success && (
        <p className="text-red-500 text-sm text-center">{state.message}</p>
      )}
    </form>
  )
}
