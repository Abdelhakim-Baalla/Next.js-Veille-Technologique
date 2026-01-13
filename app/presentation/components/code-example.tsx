'use client'

interface CodeExampleProps {
  code: string
}

export default function CodeExample({ code }: CodeExampleProps) {
  return (
    <div className="relative">
      <div className="absolute top-3 right-3 flex gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
        <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
      </div>
      <pre className="bg-[#1a1a1a] p-6 rounded-lg overflow-x-auto border border-border/50">
        <code className="text-sm text-foreground/90 font-mono leading-relaxed">
          {code}
        </code>
      </pre>
    </div>
  )
}
