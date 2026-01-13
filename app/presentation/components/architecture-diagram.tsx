'use client'

export default function ArchitectureDiagram() {
  return (
    <div className="glass-strong p-8 rounded-2xl border border-border">
      <div className="space-y-6 font-mono text-sm">
        {/* Root */}
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary glow"></div>
          <span className="text-foreground/90 font-semibold">app/</span>
        </div>

        {/* Indentation */}
        <div className="ml-6 space-y-4 border-l border-border/30 pl-6">
          {/* Root files */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-foreground/70">
              <span>├─</span>
              <span className="text-green-400">layout.tsx</span>
              <span className="text-foreground/50">(Root Layout)</span>
            </div>
            <div className="flex items-center gap-2 text-foreground/70">
              <span>├─</span>
              <span className="text-green-400">template.tsx</span>
              <span className="text-foreground/50">(Transitions)</span>
            </div>
            <div className="flex items-center gap-2 text-foreground/70">
              <span>├─</span>
              <span className="text-green-400">page.tsx</span>
              <span className="text-foreground/50">(Homepage)</span>
            </div>
            <div className="flex items-center gap-2 text-foreground/70">
              <span>├─</span>
              <span className="text-yellow-400">loading.tsx</span>
              <span className="text-foreground/50">(Global Loading)</span>
            </div>
            <div className="flex items-center gap-2 text-foreground/70">
              <span>├─</span>
              <span className="text-red-400">error.tsx</span>
              <span className="text-foreground/50">(Error Boundary)</span>
            </div>
          </div>

          {/* Route Groups */}
          <div className="space-y-2 pt-4">
            <div className="flex items-center gap-2 text-foreground/70">
              <span>├─</span>
              <span className="text-primary font-semibold">(marketing)/</span>
              <span className="text-foreground/50">(Route Group)</span>
            </div>
            <div className="ml-6 space-y-1 border-l border-border/30 pl-4">
              <div className="flex items-center gap-2 text-foreground/60">
                <span>├─</span>
                <span className="text-green-400">layout.tsx</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/60">
                <span>└─</span>
                <span className="text-green-400">page.tsx</span>
                <span className="text-foreground/50">→ /marketing</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-foreground/70">
              <span>├─</span>
              <span className="text-primary font-semibold">(dashboard)/</span>
              <span className="text-foreground/50">(Route Group)</span>
            </div>
            <div className="ml-6 space-y-2 border-l border-border/30 pl-4">
              <div className="flex items-center gap-2 text-foreground/60">
                <span>├─</span>
                <span className="text-green-400">layout.tsx</span>
                <span className="text-foreground/50">(Parallel Routes)</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/60">
                <span>├─</span>
                <span className="text-green-400">page.tsx</span>
                <span className="text-foreground/50">→ /dashboard</span>
              </div>
              
              {/* Parallel Routes */}
              <div className="space-y-1 pt-2">
                <div className="flex items-center gap-2 text-purple-400">
                  <span>├─</span>
                  <span className="font-semibold">@analytics/</span>
                  <span className="text-foreground/50">(Parallel Slot)</span>
                </div>
                <div className="ml-4 space-y-1 border-l border-purple-500/30 pl-3">
                  <div className="flex items-center gap-2 text-foreground/60">
                    <span>├─</span>
                    <span className="text-green-400">page.tsx</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground/60">
                    <span>└─</span>
                    <span className="text-yellow-400">loading.tsx</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-purple-400">
                  <span>├─</span>
                  <span className="font-semibold">@team/</span>
                  <span className="text-foreground/50">(Parallel Slot)</span>
                </div>
                <div className="ml-4 space-y-1 border-l border-purple-500/30 pl-3">
                  <div className="flex items-center gap-2 text-foreground/60">
                    <span>├─</span>
                    <span className="text-green-400">page.tsx</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground/60">
                    <span>└─</span>
                    <span className="text-yellow-400">loading.tsx</span>
                  </div>
                </div>
              </div>

              {/* Intercepting Route */}
              <div className="space-y-1 pt-2">
                <div className="flex items-center gap-2 text-cyan-400">
                  <span>├─</span>
                  <span className="font-semibold">photos/</span>
                </div>
                <div className="ml-4 space-y-2 border-l border-cyan-500/30 pl-3">
                  <div className="flex items-center gap-2 text-foreground/60">
                    <span>├─</span>
                    <span className="text-green-400">page.tsx</span>
                    <span className="text-foreground/50">→ /dashboard/photos</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground/60">
                    <span>├─</span>
                    <span className="text-green-400">[id]/page.tsx</span>
                    <span className="text-foreground/50">→ /dashboard/photos/:id</span>
                  </div>
                  <div className="flex items-center gap-2 text-cyan-400">
                    <span>└─</span>
                    <span className="font-semibold">(.)photo/[id]/</span>
                    <span className="text-foreground/50">(Intercepting Route)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 pt-6 border-t border-border/30 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-green-400">●</span>
          <span className="text-foreground/60">Page/Layout</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-yellow-400">●</span>
          <span className="text-foreground/60">Loading</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-red-400">●</span>
          <span className="text-foreground/60">Error</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-purple-400">●</span>
          <span className="text-foreground/60">Parallel Slot</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-cyan-400">●</span>
          <span className="text-foreground/60">Intercepting</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-primary">●</span>
          <span className="text-foreground/60">Route Group</span>
        </div>
      </div>
    </div>
  )
}
