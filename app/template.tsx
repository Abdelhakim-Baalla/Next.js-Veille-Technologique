'use client'

import { useEffect } from 'react'

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Animation d'entrée pour les transitions de route
    document.body.style.opacity = '0'
    const timer = setTimeout(() => {
      document.body.style.transition = 'opacity 0.3s ease-in-out'
      document.body.style.opacity = '1'
    }, 10)
    
    return () => {
      clearTimeout(timer)
      document.body.style.opacity = '1'
    }
  }, [])

  return <>{children}</>
}
