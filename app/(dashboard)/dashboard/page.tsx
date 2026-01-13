import Link from 'next/link'
import { IconArrowRight, IconCode } from '../../components/icons'

export default function DashboardPage() {
  return (
    <div>
      {/* Info Card */}
      <div className="card bg-black text-white mb-8">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/10 rounded-xl">
            <IconCode className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Parallel Routes in Action</h2>
            <p className="text-gray-400 text-sm mb-4">
              The analytics and team components above are rendered simultaneously using parallel routes.
              Each slot (@analytics, @team) can have its own loading and error states.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-mono">
                @analytics
              </span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-mono">
                @team
              </span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-mono">
                children
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Architecture Explanation */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <h3 className="font-semibold mb-3">File Structure</h3>
          <pre className="text-xs font-mono text-gray-600 bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`(dashboard)/
├── layout.tsx      # Receives slots as props
├── page.tsx        # children prop
├── @analytics/
│   ├── page.tsx    # analytics prop
│   └── loading.tsx
└── @team/
    ├── page.tsx    # team prop
    └── loading.tsx`}
          </pre>
        </div>

        <div className="card">
          <h3 className="font-semibold mb-3">Layout Props</h3>
          <pre className="text-xs font-mono text-gray-600 bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`interface LayoutProps {
  children: React.ReactNode
  analytics: React.ReactNode
  team: React.ReactNode
}

export default function Layout({
  children,
  analytics,
  team
}: LayoutProps) {
  return (...)
}`}
          </pre>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-wrap gap-4">
        <Link
          href="/photos"
          className="btn-secondary inline-flex items-center gap-2 interactive"
        >
          Explore Photos
          <IconArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/dashboard/contact"
          className="btn-secondary inline-flex items-center gap-2 interactive"
        >
          Contact Form
          <IconArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
