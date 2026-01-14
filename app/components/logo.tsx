'use client'

// Logo component for navigation
export function Logo() {
  return (
    <div className="relative w-10 h-10 group">
      {/* Outer glow on hover */}
      <div className="absolute inset-0 bg-black/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Main container */}
      <div className="relative w-10 h-10 bg-black rounded-xl flex items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(135deg, #333 0%, #000 50%, #333 100%)',
          }}
        />
        
        {/* Logo text */}
        <span className="relative text-white text-sm font-black tracking-tighter">
          N<span className="text-white/60">.</span>
        </span>
        
        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-2 h-2 bg-white/20 rounded-bl-lg" />
      </div>
    </div>
  )
}
