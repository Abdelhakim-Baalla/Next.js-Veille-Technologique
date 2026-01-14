import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Next.js Routing — Veille Technologique',
  description: 'Présentation complète du système de routing Next.js App Router',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen antialiased bg-white">
        {children}
      </body>
    </html>
  )
}
