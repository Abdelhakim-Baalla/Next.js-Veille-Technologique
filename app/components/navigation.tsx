'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from './logo'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/marketing', label: 'Marketing' },
  { href: '/photos', label: 'Photos' },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="glass mx-4 mt-4 rounded-2xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 interactive">
              <Logo />
              <span className="font-semibold text-lg tracking-tight">
                Routing Masterclass
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== '/' && pathname.startsWith(item.href))
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 interactive ${
                      isActive
                        ? 'bg-black text-white'
                        : 'text-gray-600 hover:text-black hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>

            {/* Route Indicator */}
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <code className="text-xs font-mono text-gray-600">
                  {pathname}
                </code>
              </div>

              {/* Mobile Menu Button */}
              <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors interactive">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
