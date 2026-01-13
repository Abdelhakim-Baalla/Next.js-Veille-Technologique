import Link from 'next/link'
import { IconArrowRight, IconLayers, IconRoute, IconCode, IconShield } from '../../components/icons'

const features = [
  {
    icon: IconLayers,
    title: 'Nested Layouts',
    description: 'Create shared layouts that persist across routes. Each segment can have its own layout.',
  },
  {
    icon: IconRoute,
    title: 'Parallel Routes',
    description: 'Render multiple pages in the same layout simultaneously using @slots.',
  },
  {
    icon: IconCode,
    title: 'Intercepting Routes',
    description: 'Show modals and overlays while preserving the underlying page context.',
  },
  {
    icon: IconShield,
    title: 'Middleware',
    description: 'Protect routes and handle authentication at the edge before rendering.',
  },
]

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {/* Marketing Header */}
      <div className="pt-28 pb-16 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-xs font-mono text-gray-600 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            (marketing)/layout.tsx
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            App Router Features
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Explore the powerful routing capabilities of Next.js 15.
            This layout wraps all marketing pages.
          </p>
        </div>
      </div>

      {/* Feature Pills */}
      <div className="py-8 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap gap-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full hover:border-black transition-colors"
              >
                <feature.icon className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium">{feature.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Children */}
      {children}

      {/* Marketing Footer */}
      <footer className="py-12 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-gray-600 text-sm">
                Part of the (marketing) route group
              </p>
            </div>
            <Link
              href="/dashboard"
              className="btn-primary inline-flex items-center gap-2 interactive"
            >
              Go to Dashboard
              <IconArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
