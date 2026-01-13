'use client'

import { useEffect } from 'react'
import { IconWarning, IconRefresh, IconHome } from '../../components/icons'
import Link from 'next/link'

export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="py-20 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-6 text-center">
        <div className="card p-12">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-red-50 flex items-center justify-center">
            <IconWarning className="w-8 h-8 text-red-500" />
          </div>

          <h1 className="text-2xl font-bold mb-3">Something went wrong</h1>
          <p className="text-gray-600 mb-8">
            An error occurred in the marketing section.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={reset}
              className="btn-primary inline-flex items-center justify-center gap-2 interactive"
            >
              <IconRefresh className="w-4 h-4" />
              Try Again
            </button>
            <Link href="/" className="btn-secondary inline-flex items-center justify-center gap-2 interactive">
              <IconHome className="w-4 h-4" />
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
