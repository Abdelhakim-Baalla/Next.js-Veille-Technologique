'use client'

// Logo component for navigation
export function Logo() {
  return (
    <div className="relative w-10 h-10 rounded-xl overflow-hidden interactive">
      {/* Animated border */}
      <div 
        className="absolute inset-0 rounded-xl"
        style={{
          background: 'conic-gradient(from 0deg, #000, #666, #000)',
          animation: 'borderRotate 4s linear infinite',
        }}
      />
      
      {/* Inner content */}
      <div className="absolute inset-[2px] bg-white rounded-[10px] flex items-center justify-center">
        <span className="text-sm font-bold tracking-tighter">NX</span>
      </div>
    </div>
  )
}
