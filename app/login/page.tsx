'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { IconArrowLeft, IconSpinner, IconShield } from '../components/icons'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login - set a cookie
    document.cookie = 'session=authenticated; path=/; max-age=3600'

    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    router.push('/dashboard/contact')
    router.refresh()
  }

  const handleDemoAccess = () => {
    document.cookie = 'session=authenticated; path=/; max-age=3600'
    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen pt-28 pb-20 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-6">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-8 interactive"
        >
          <IconArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Login Card */}
        <div className="card p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center">
              <IconShield className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Authentication Required</h1>
            <p className="text-gray-600 text-sm">
              This page demonstrates middleware route protection
            </p>
          </div>

          {/* Middleware Info */}
          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <p className="text-xs font-mono text-gray-600 mb-2">middleware.ts</p>
            <p className="text-sm text-gray-600">
              The contact form is protected. You were redirected here because
              no session cookie was found.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                defaultValue="demo@example.com"
                className="input"
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                defaultValue="••••••••"
                className="input"
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center gap-2 interactive"
            >
              {isLoading ? (
                <>
                  <IconSpinner className="w-4 h-4" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo Button */}
          <div className="text-center">
            <button
              onClick={handleDemoAccess}
              className="text-sm text-gray-500 hover:text-black transition-colors interactive"
            >
              Skip authentication for demo
            </button>
          </div>
        </div>

        {/* Code Example */}
        <div className="card mt-6">
          <p className="text-xs font-mono text-gray-500 mb-2">How it works:</p>
          <pre className="text-xs font-mono text-gray-600 bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`// middleware.ts
export function middleware(request) {
  const session = request.cookies
    .get('session')
  
  if (!session) {
    return NextResponse.redirect(
      new URL('/login', request.url)
    )
  }
}`}
          </pre>
        </div>
      </div>
    </div>
  )
}
