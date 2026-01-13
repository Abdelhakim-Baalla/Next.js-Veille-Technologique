import type { Metadata } from 'next'
import './globals.css'
import { CustomCursor } from './components/custom-cursor'
import { FloatingShapes } from './components/floating-shapes'
import { Navigation } from './components/navigation'

export const metadata: Metadata = {
  title: 'Next.js Routing Masterclass',
  description: 'A comprehensive demonstration of Next.js 15 App Router patterns and best practices',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <CustomCursor />
        <FloatingShapes />
        <Navigation />
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  )
}
