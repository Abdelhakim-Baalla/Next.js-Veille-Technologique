'use client'

import { useState } from 'react'
import Link from 'next/link'
import CodeExample from './code-example'

interface ConceptCardProps {
  title: string
  subtitle: string
  description: string
  details: string[]
  codeExample: string
  demoLink: string
  reverse?: boolean
}

export default function ConceptCard({
  title,
  subtitle,
  description,
  details,
  codeExample,
  demoLink,
  reverse = false,
}: ConceptCardProps) {
  const [showCode, setShowCode] = useState(false)

  return (
    <div
      className={`glass-strong rounded-2xl border border-border overflow-hidden card-hover ${
        reverse ? 'lg:flex-row-reverse' : ''
      } lg:flex`}
    >
      <div className="flex-1 p-8 space-y-6">
        <div>
          <div className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-3">
            {subtitle}
          </div>
          <h3 className="text-3xl font-semibold mb-3">{title}</h3>
          <p className="text-foreground/70 text-lg leading-relaxed">{description}</p>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold text-foreground/90">Points clés :</h4>
          <ul className="space-y-2">
            {details.map((detail, idx) => (
              <li key={idx} className="flex items-start gap-2 text-foreground/60">
                <span className="text-primary mt-1.5">•</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            onClick={() => setShowCode(!showCode)}
            className="px-6 py-2.5 border border-border rounded-lg hover:bg-accent/50 transition-colors font-medium"
          >
            {showCode ? 'Masquer' : 'Voir'} le Code
          </button>
          <Link
            href={demoLink}
            className="px-6 py-2.5 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors font-medium"
          >
            Voir la Démo →
          </Link>
        </div>
      </div>

      {showCode && (
        <div className="flex-1 p-8 bg-accent/30 border-l border-border">
          <CodeExample code={codeExample} />
        </div>
      )}
    </div>
  )
}
