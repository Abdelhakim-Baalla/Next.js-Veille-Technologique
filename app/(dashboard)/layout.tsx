import { IconChart, IconUsers, IconFolder, IconMail } from '../components/icons'
import Link from 'next/link'

interface DashboardLayoutProps {
  children: React.ReactNode
  analytics: React.ReactNode
  team: React.ReactNode
}

const sidebarItems = [
  { icon: IconChart, label: 'Analytics', href: '/dashboard' },
  { icon: IconUsers, label: 'Team', href: '/dashboard' },
  { icon: IconFolder, label: 'Photos', href: '/photos' },
  { icon: IconMail, label: 'Contact', href: '/dashboard/contact' },
]

export default function DashboardLayout({
  children,
  analytics,
  team,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen pt-24">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 fixed left-0 top-24 bottom-0 border-r border-gray-200 bg-white/50 backdrop-blur-sm">
          <div className="p-6">
            <div className="mb-8">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Navigation
              </h2>
              <nav className="space-y-1">
                {sidebarItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2.5 text-gray-600 rounded-lg hover:bg-gray-100 hover:text-black transition-colors interactive"
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Route Info */}
            <div className="p-4 bg-gray-50 rounded-xl">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Layout Info
              </h3>
              <div className="space-y-2 text-xs font-mono text-gray-600">
                <p>Route Group: (dashboard)</p>
                <p>Slots: @analytics, @team</p>
                <p>Type: Parallel Routes</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          <div className="p-6 lg:p-8">
            {/* Page Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-xs font-mono text-gray-600 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                (dashboard)/layout.tsx
              </div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-gray-600 mt-2">
                Demonstrating Parallel Routes with @analytics and @team slots
              </p>
            </div>

            {/* Parallel Routes Grid */}
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              {/* Analytics Slot */}
              <div className="card">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-xs font-mono text-gray-500">@analytics/page.tsx</span>
                </div>
                {analytics}
              </div>

              {/* Team Slot */}
              <div className="card">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <span className="text-xs font-mono text-gray-500">@team/page.tsx</span>
                </div>
                {team}
              </div>
            </div>

            {/* Main Content */}
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
