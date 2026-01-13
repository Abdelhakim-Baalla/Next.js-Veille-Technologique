'use client'

import Link from 'next/link'
import { IconHome, IconArrowLeft } from './components/icons'

export default function NotFound() {
  return (
    <div className="min-h-screen pt-28 pb-20 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-6 text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <span className="text-[150px] font-bold leading-none text-gray-100 select-none">
            404
          </span>
        </div>

        {/* Content */}
        <h1 className="text-3xl font-bold mb-4">Page not found</h1>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
          This is the custom not-found.tsx page in action.
        </p>

        {/* Code Example */}
        <div className="card p-4 mb-8 text-left">
          <code className="text-sm font-mono text-gray-600">
            <span className="text-gray-400">// app/not-found.tsx</span>
            <br />
            <span className="text-purple-600">export default</span> <span className="text-blue-600">function</span> NotFound() {'{'}
            <br />
            &nbsp;&nbsp;<span className="text-purple-600">return</span> {'<'}Page /{'>'};
            <br />
            {'}'}
          </code>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="btn-primary inline-flex items-center justify-center gap-2 interactive"
          >
            <IconHome className="w-4 h-4" />
            Back to Home
          </Link>
          <button
            onClick={() => history.back()}
            className="btn-secondary inline-flex items-center justify-center gap-2 interactive"
          >
            <IconArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}
