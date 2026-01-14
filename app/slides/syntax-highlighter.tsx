'use client'

import React from 'react'

interface SyntaxHighlighterProps {
  code: string
  language?: 'tsx' | 'typescript' | 'javascript' | 'jsx'
  className?: string
}

export function SyntaxHighlighter({ code, className = '' }: SyntaxHighlighterProps) {
  const highlightCode = (code: string): React.ReactNode[] => {
    const lines = code.split('\n')
    
    return lines.map((line, lineIndex) => {
      const tokens = tokenizeLine(line)
      return (
        <div key={lineIndex}>
          {tokens.map((token, tokenIndex) => (
            <span key={tokenIndex} className={token.className}>
              {token.content}
            </span>
          ))}
          {lineIndex < lines.length - 1 && '\n'}
        </div>
      )
    })
  }

  return (
    <pre className={`text-xs leading-relaxed ${className}`}>
      <code>{highlightCode(code)}</code>
    </pre>
  )
}

interface Token {
  content: string
  className: string
}

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = []
  let remaining = line

  // Patterns pour la tokenization
  const patterns: { regex: RegExp; className: string }[] = [
    // Comments - // et /* */
    { regex: /^(\/\/.*$)/, className: 'text-green-500' },
    { regex: /^(\/\*[\s\S]*?\*\/)/, className: 'text-green-500' },
    { regex: /^(\{\/\*[\s\S]*?\*\/\})/, className: 'text-green-500' },
    
    // Strings - single, double, template literals
    { regex: /^("(?:[^"\\]|\\.)*")/, className: 'text-amber-400' },
    { regex: /^('(?:[^'\\]|\\.)*')/, className: 'text-amber-400' },
    { regex: /^(`(?:[^`\\]|\\.)*`)/, className: 'text-amber-400' },
    
    // JSX attributes values
    { regex: /^(=\{[^}]+\})/, className: 'text-sky-400' },
    
    // Keywords
    { regex: /^(import|export|from|default|async|await|return|const|let|var|function|if|else|for|while|try|catch|throw|new|typeof|instanceof|class|extends|implements|interface|type|enum|namespace|module|declare|public|private|protected|readonly|static|abstract|as|is|keyof|infer|never|unknown|any|void|null|undefined)\b/, className: 'text-purple-400 font-medium' },
    
    // React/Next.js specific
    { regex: /^('use client'|'use server'|"use client"|"use server")/, className: 'text-rose-400 font-semibold' },
    
    // Types
    { regex: /^(React|ReactNode|NextRequest|NextResponse|FormData|Error|Promise|string|number|boolean|object|Array|Map|Set)\b/, className: 'text-cyan-400' },
    
    // Function calls & definitions
    { regex: /^([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/, className: 'text-yellow-300' },
    
    // JSX tags
    { regex: /^(<\/?)([A-Z][a-zA-Z0-9]*|[a-z][a-zA-Z0-9-]*)/, className: 'text-sky-400' },
    { regex: /^(\/>|>|<)/, className: 'text-gray-400' },
    
    // JSX attribute names
    { regex: /^(\s)([a-zA-Z_][a-zA-Z0-9_-]*)(?==)/, className: 'text-orange-300' },
    
    // Numbers
    { regex: /^(\d+\.?\d*)/, className: 'text-orange-400' },
    
    // Arrow functions
    { regex: /^(=>)/, className: 'text-purple-400' },
    
    // Operators
    { regex: /^([+\-*/%=<>!&|^~?:]+)/, className: 'text-gray-400' },
    
    // Brackets & Punctuation
    { regex: /^([{}[\](),;.])/, className: 'text-gray-400' },
    
    // Variables/Identifiers
    { regex: /^([a-zA-Z_$][a-zA-Z0-9_$]*)/, className: 'text-gray-200' },
    
    // Whitespace
    { regex: /^(\s+)/, className: '' },
  ]

  while (remaining.length > 0) {
    let matched = false
    
    // Check for comment at start or after whitespace
    if (remaining.trimStart().startsWith('//')) {
      const leadingWhitespace = remaining.match(/^(\s*)/)?.[0] || ''
      const comment = remaining.slice(leadingWhitespace.length)
      if (leadingWhitespace) {
        tokens.push({ content: leadingWhitespace, className: '' })
      }
      tokens.push({ content: comment, className: 'text-green-500 italic' })
      break
    }

    // Check for JSX comment {/* */}
    const jsxCommentMatch = remaining.match(/^\{\/\*.*?\*\/\}/)
    if (jsxCommentMatch) {
      tokens.push({ content: jsxCommentMatch[0], className: 'text-green-500 italic' })
      remaining = remaining.slice(jsxCommentMatch[0].length)
      continue
    }

    for (const pattern of patterns) {
      const match = remaining.match(pattern.regex)
      if (match) {
        // Special handling for function calls
        if (pattern.className === 'text-yellow-300' && match[1]) {
          tokens.push({ content: match[1], className: 'text-yellow-300' })
          tokens.push({ content: '(', className: 'text-gray-400' })
          remaining = remaining.slice(match[0].length)
        }
        // Special handling for JSX tags
        else if (pattern.className === 'text-sky-400' && match[1] && match[2]) {
          tokens.push({ content: match[1], className: 'text-gray-400' })
          const isComponent = /^[A-Z]/.test(match[2])
          tokens.push({ content: match[2], className: isComponent ? 'text-emerald-400 font-medium' : 'text-sky-400' })
          remaining = remaining.slice(match[0].length)
        }
        // Special handling for attribute names
        else if (pattern.className === 'text-orange-300' && match[1] && match[2]) {
          tokens.push({ content: match[1], className: '' })
          tokens.push({ content: match[2], className: 'text-orange-300' })
          remaining = remaining.slice(match[0].length)
        }
        else {
          tokens.push({ content: match[0], className: pattern.className })
          remaining = remaining.slice(match[0].length)
        }
        matched = true
        break
      }
    }
    
    if (!matched) {
      // Default: push single character
      tokens.push({ content: remaining[0], className: 'text-gray-200' })
      remaining = remaining.slice(1)
    }
  }

  return tokens
}

// Simple inline code highlighter for quick use
export function highlightCode(code: string): JSX.Element {
  return <SyntaxHighlighter code={code} />
}
