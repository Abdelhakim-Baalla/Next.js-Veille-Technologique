'use client'

import { useEffect, useState } from 'react'
import { Icons } from './icons'

export function SlidePlayground() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeGame, setActiveGame] = useState<'menu' | 'quiz' | 'match' | 'debug' | 'flashcards'>('menu')
  const [quizScore, setQuizScore] = useState(0)
  const [currentQuiz, setCurrentQuiz] = useState(0)
  const [quizAnswered, setQuizAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [currentCard, setCurrentCard] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [matchedPairs, setMatchedPairs] = useState<number[]>([])
  const [selectedMatch, setSelectedMatch] = useState<{ side: 'left' | 'right', index: number } | null>(null)
  const [debugStep, setDebugStep] = useState(0)
  const [showDebugAnswer, setShowDebugAnswer] = useState(false)

  useEffect(() => { setIsVisible(true) }, [])

  const quizQuestions = [
    { question: "Quel fichier définit l'UI partagée entre plusieurs routes ?", options: ['page.tsx', 'layout.tsx', 'template.tsx', 'route.tsx'], correct: 1 },
    { question: "Comment créer une route group sans affecter l'URL ?", options: ['[folder]', '@folder', '(folder)', '_folder'], correct: 2 },
    { question: "Où doit se trouver le fichier middleware.ts ?", options: ['Dans app/', 'Dans src/', 'À la racine du projet', 'Dans pages/'], correct: 2 },
    { question: "Quel est le rendu par défaut dans App Router ?", options: ['Client Components', 'Server Components', 'Static', 'Hybrid'], correct: 1 },
    { question: "Comment intercepter une route pour une modal ?", options: ['@folder', '(.)folder', '[...folder]', '[[folder]]'], correct: 1 },
    { question: "Quelle directive marque un Client Component ?", options: ['"use server"', '"use client"', '"use strict"', '"use component"'], correct: 1 },
    { question: "Quel fichier gère les états de chargement ?", options: ['loading.tsx', 'loader.tsx', 'pending.tsx', 'suspense.tsx'], correct: 0 },
    { question: "Comment définir une route dynamique ?", options: ['(slug)', '@slug', '[slug]', '{slug}'], correct: 2 },
    { question: "Quelle convention pour les Parallel Routes ?", options: ['(folder)', '[folder]', '@folder', '_folder'], correct: 2 },
    { question: "Comment créer une route catch-all ?", options: ['[slug]', '[...slug]', '[[slug]]', '(...slug)'], correct: 1 },
    { question: "Quel fichier pour une page 404 ?", options: ['404.tsx', 'error.tsx', 'not-found.tsx', 'missing.tsx'], correct: 2 },
    { question: "Où s'exécute le middleware ?", options: ['Client', 'Node.js', 'Edge Runtime', 'Browser'], correct: 2 },
  ]

  const flashcards = [
    { front: 'layout.tsx', back: 'UI persistante partagée entre routes. Ne se re-render pas lors de la navigation.' },
    { front: 'template.tsx', back: 'Comme layout mais se recrée à chaque navigation. Pour animations enter/exit.' },
    { front: '"use client"', back: 'Directive Client Component. Permet useState, useEffect et interactivité.' },
    { front: '"use server"', back: 'Directive Server Actions. Mutations directes sans API routes.' },
    { front: '@folder', back: 'Parallel Routes. Plusieurs pages simultanées dans un layout.' },
    { front: '(.)folder', back: 'Interception route même niveau. Pour modals contextuelles.' },
    { front: '(folder)', back: 'Route Group. Organisation sans impact sur URL.' },
    { front: '[slug]', back: 'Segment dynamique. Capture valeur URL dans params.' },
    { front: '[...slug]', back: 'Catch-all. Capture tous segments restants en tableau.' },
    { front: 'loading.tsx', back: 'Suspense automatique. Streaming SSR supporté.' },
    { front: 'error.tsx', back: 'Error Boundary automatique. Doit être "use client".' },
    { front: 'middleware.ts', back: 'Code Edge à chaque requête. Auth, redirections, i18n.' },
  ]

  const matchPairs = [
    { left: 'page.tsx', right: 'Route principale' },
    { left: 'layout.tsx', right: 'UI partagée' },
    { left: 'loading.tsx', right: 'État chargement' },
    { left: 'error.tsx', right: 'Gestion erreurs' },
    { left: 'not-found.tsx', right: 'Page 404' },
    { left: '@folder', right: 'Parallel Routes' },
    { left: '(folder)', right: 'Route Group' },
    { left: '[slug]', right: 'Route dynamique' },
    { left: '(.)folder', right: 'Interception' },
    { left: 'middleware.ts', right: 'Edge Runtime' },
    { left: '"use client"', right: 'Client Component' },
    { left: '"use server"', right: 'Server Action' },
  ]

  const debugChallenges = [
    { code: 'export function Page() {\n  return <div>Home</div>\n}', error: 'Missing "default" export', fix: 'export default function Page()' },
    { code: 'export default function Layout({ children }) {\n  return <div>{children}</div>\n}', error: 'Missing <html> <body>', fix: 'Root layout needs <html> and <body>' },
    { code: '// app/middleware.ts\nexport function middleware() {}', error: 'Wrong location', fix: 'middleware.ts at project root' },
    { code: 'export default function Post({ slug }) {}', error: 'Wrong params access', fix: 'Use { params } then params.slug' },
    { code: 'import { useState } from "react"\nexport default function Page() {}', error: 'Hook in Server Component', fix: 'Add "use client" directive' },
    { code: '// error.tsx\nexport default function Error() {}', error: 'Missing "use client"', fix: 'error.tsx must be Client Component' },
    { code: 'async function submit() {\n  await db.query()\n}', error: 'DB in Client Component', fix: 'DB queries server-side only' },
    { code: '<Link href="/blog">\n  <a>Blog</a>\n</Link>', error: 'Nested anchor', fix: 'Link already renders <a>' },
    { code: '"use server"\nfunction submit() {\n  window.alert("Done")\n}', error: 'window in server', fix: 'No browser APIs in Server Actions' },
    { code: '// layout.tsx\nexport const revalidate = 60', error: 'Config in layout', fix: 'Route config in page.tsx only' },
  ]

  const [shuffledRight] = useState(() => [...matchPairs].sort(() => Math.random() - 0.5))

  const handleQuizAnswer = (i: number) => { setSelectedAnswer(i); setQuizAnswered(true); if (i === quizQuestions[currentQuiz].correct) setQuizScore(s => s + 1) }
  const nextQuiz = () => { if (currentQuiz < quizQuestions.length - 1) { setCurrentQuiz(c => c + 1); setQuizAnswered(false); setSelectedAnswer(null) } }
  const handleMatch = (side: 'left' | 'right', idx: number) => {
    if (matchedPairs.includes(idx)) return
    if (!selectedMatch) { setSelectedMatch({ side, index: idx }) }
    else if (selectedMatch.side !== side) {
      const lIdx = side === 'left' ? idx : selectedMatch.index
      const rIdx = side === 'right' ? idx : selectedMatch.index
      if (matchPairs[lIdx].left === shuffledRight[rIdx].left) setMatchedPairs(p => [...p, lIdx])
      setSelectedMatch(null)
    }
  }
  const resetGame = () => { setActiveGame('menu'); setQuizScore(0); setCurrentQuiz(0); setQuizAnswered(false); setSelectedAnswer(null); setCurrentCard(0); setFlipped(false); setMatchedPairs([]); setSelectedMatch(null); setDebugStep(0); setShowDebugAnswer(false) }

  const games = [
    { id: 'quiz', icon: Icons.target, title: 'Quiz Master', desc: '12 questions', color: 'bg-purple-500' },
    { id: 'match', icon: Icons.link, title: 'Speed Match', desc: '12 paires', color: 'bg-orange-500' },
    { id: 'debug', icon: Icons.code, title: 'Debug Challenge', desc: '10 erreurs', color: 'bg-pink-500' },
    { id: 'flashcards', icon: Icons.layers, title: 'Flashcards', desc: '12 cartes', color: 'bg-blue-500' },
  ]

  return (
    <div className="slide">
      <div className="slide-content flex flex-col h-full py-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className={`slide-badge mb-2 ${isVisible ? 'animate-fadeInDown' : 'opacity-0'}`}>14 — Zone Interactive</div>
            <h2 className={`text-3xl font-bold tracking-tight ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
              {activeGame === 'menu' ? 'Mini-jeux & Quiz' : activeGame === 'quiz' ? 'Quiz Master' : activeGame === 'match' ? 'Speed Match' : activeGame === 'debug' ? 'Debug Challenge' : 'Flashcards'}
            </h2>
          </div>
          {activeGame !== 'menu' && (
            <button onClick={resetGame} data-hover className="flex items-center gap-2 px-3 py-1.5 text-xs border border-gray-200 rounded-lg hover:border-black">
              <Icons.arrowLeft className="w-3 h-3" /> Retour
            </button>
          )}
        </div>

        {activeGame === 'menu' && (
          <div className="flex-1 grid grid-cols-4 gap-4">
            {games.map((g, i) => {
              const Icon = g.icon
              return (
                <button key={g.id} onClick={() => setActiveGame(g.id as typeof activeGame)} data-hover
                  className={`group flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-black transition-all ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}
                  style={{ animationDelay: `${i * 100}ms` }}>
                  <div className={`w-14 h-14 rounded-xl ${g.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-sm mb-1">{g.title}</h3>
                  <p className="text-xs text-black/40">{g.desc}</p>
                </button>
              )
            })}
          </div>
        )}

        {activeGame === 'quiz' && (
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-1">{quizQuestions.map((_, i) => <div key={i} className={`w-5 h-1.5 rounded-full ${i < currentQuiz ? 'bg-green-500' : i === currentQuiz ? 'bg-black' : 'bg-gray-200'}`} />)}</div>
              <div className="px-3 py-1 bg-black text-white text-xs rounded-full font-mono">{quizScore}/{quizQuestions.length}</div>
            </div>
            {currentQuiz < quizQuestions.length && (
              <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-lg p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center"><Icons.target className="w-4 h-4 text-white" /></div>
                    <span className="text-xs text-black/40">Question {currentQuiz + 1}/{quizQuestions.length}</span>
                  </div>
                  <h4 className="font-bold mb-4">{quizQuestions[currentQuiz].question}</h4>
                  <div className="space-y-2">
                    {quizQuestions[currentQuiz].options.map((o, i) => (
                      <button key={i} onClick={() => !quizAnswered && handleQuizAnswer(i)} disabled={quizAnswered} data-hover
                        className={`w-full p-3 rounded-lg text-left text-sm transition-all ${quizAnswered ? i === quizQuestions[currentQuiz].correct ? 'bg-green-100 border-2 border-green-400' : selectedAnswer === i ? 'bg-red-100 border-2 border-red-400' : 'bg-white border border-gray-200 opacity-50' : 'bg-white border border-gray-200 hover:border-black'}`}>
                        <span className="font-mono text-xs mr-2 text-black/40">{String.fromCharCode(65 + i)}.</span>{o}
                      </button>
                    ))}
                  </div>
                  {quizAnswered && currentQuiz < quizQuestions.length - 1 && <button onClick={nextQuiz} data-hover className="w-full mt-4 p-3 bg-black text-white rounded-lg font-medium">Suivant</button>}
                  {quizAnswered && currentQuiz === quizQuestions.length - 1 && <div className="mt-4 p-4 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl text-center"><Icons.award className="w-8 h-8 mx-auto mb-2" /><p className="font-bold">Terminé ! Score: {quizScore}/{quizQuestions.length}</p></div>}
                </div>
              </div>
            )}
          </div>
        )}

        {activeGame === 'match' && (
          <div className="flex-1 grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-3"><div className="w-6 h-6 rounded bg-black flex items-center justify-center"><Icons.file className="w-3 h-3 text-white" /></div><span className="text-xs font-medium text-black/50">Fichiers</span></div>
              {matchPairs.map((p, i) => (
                <button key={i} onClick={() => handleMatch('left', i)} data-hover
                  className={`w-full p-3 rounded-lg font-mono text-sm text-left transition-all ${matchedPairs.includes(i) ? 'bg-green-100 border-2 border-green-400' : selectedMatch?.side === 'left' && selectedMatch?.index === i ? 'bg-black text-white border-2 border-black' : 'bg-gray-50 border border-gray-200 hover:border-black'}`}>
                  {p.left}
                </button>
              ))}
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-3"><div className="w-6 h-6 rounded bg-black flex items-center justify-center"><Icons.tag className="w-3 h-3 text-white" /></div><span className="text-xs font-medium text-black/50">Descriptions</span></div>
              {shuffledRight.map((p, i) => {
                const origIdx = matchPairs.findIndex(m => m.left === p.left)
                return (
                  <button key={i} onClick={() => handleMatch('right', i)} data-hover
                    className={`w-full p-3 rounded-lg text-sm text-left transition-all ${matchedPairs.includes(origIdx) ? 'bg-green-100 border-2 border-green-400' : selectedMatch?.side === 'right' && selectedMatch?.index === i ? 'bg-black text-white border-2 border-black' : 'bg-gray-50 border border-gray-200 hover:border-black'}`}>
                    {p.right}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {activeGame === 'debug' && (
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-1">{debugChallenges.map((_, i) => <div key={i} className={`w-5 h-1.5 rounded-full ${i < debugStep ? 'bg-green-500' : i === debugStep ? 'bg-black' : 'bg-gray-200'}`} />)}</div>
              <span className="text-xs text-black/40">{debugStep + 1}/{debugChallenges.length}</span>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full max-w-2xl">
                <div className="bg-gray-900 rounded-xl p-4 mb-4"><pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">{debugChallenges[debugStep].code}</pre></div>
                <div className="flex items-center gap-2 mb-4"><div className="w-6 h-6 rounded bg-red-100 flex items-center justify-center"><Icons.search className="w-3 h-3 text-red-600" /></div><span className="text-sm font-medium">Trouve l'erreur</span></div>
                {!showDebugAnswer ? (
                  <button onClick={() => setShowDebugAnswer(true)} data-hover className="w-full p-3 bg-yellow-100 text-yellow-800 rounded-lg text-sm font-medium hover:bg-yellow-200">Révéler</button>
                ) : (
                  <div className="space-y-3">
                    <div className="p-4 bg-red-50 rounded-lg border border-red-200"><div className="flex items-center gap-2 mb-1"><Icons.x className="w-4 h-4 text-red-500" /><span className="font-medium text-sm text-red-800">Erreur</span></div><p className="text-sm text-red-600">{debugChallenges[debugStep].error}</p></div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200"><div className="flex items-center gap-2 mb-1"><Icons.check className="w-4 h-4 text-green-500" /><span className="font-medium text-sm text-green-800">Fix</span></div><p className="text-sm text-green-600">{debugChallenges[debugStep].fix}</p></div>
                    {debugStep < debugChallenges.length - 1 && <button onClick={() => { setDebugStep(s => s + 1); setShowDebugAnswer(false) }} data-hover className="w-full p-3 bg-black text-white rounded-lg font-medium">Suivant</button>}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeGame === 'flashcards' && (
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-1">{flashcards.map((_, i) => <div key={i} className={`w-5 h-1.5 rounded-full ${i === currentCard ? 'bg-black' : 'bg-gray-200'}`} />)}</div>
              <span className="text-xs text-black/40">{currentCard + 1}/{flashcards.length}</span>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full max-w-md">
                <div onClick={() => setFlipped(!flipped)} data-hover className="relative h-56 cursor-pointer perspective-1000">
                  <div className={`absolute inset-0 transition-transform duration-500 transform-style-preserve-3d ${flipped ? 'rotate-y-180' : ''}`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 flex flex-col items-center justify-center backface-hidden">
                      <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4"><Icons.code className="w-6 h-6 text-white" /></div>
                      <div className="text-2xl font-mono font-bold text-white text-center">{flashcards[currentCard].front}</div>
                      <p className="text-white/60 text-xs mt-4">Cliquez pour révéler</p>
                    </div>
                    <div className="absolute inset-0 bg-white rounded-xl border-2 border-gray-200 p-6 flex items-center justify-center backface-hidden rotate-y-180">
                      <p className="text-sm text-center text-black/70 leading-relaxed">{flashcards[currentCard].back}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => { if (currentCard > 0) { setCurrentCard(c => c - 1); setFlipped(false) } }} disabled={currentCard === 0} data-hover className="flex-1 p-3 border border-gray-200 rounded-lg font-medium disabled:opacity-30 hover:border-black flex items-center justify-center gap-2"><Icons.arrowLeft className="w-4 h-4" /> Précédent</button>
                  <button onClick={() => { if (currentCard < flashcards.length - 1) { setCurrentCard(c => c + 1); setFlipped(false) } }} disabled={currentCard === flashcards.length - 1} data-hover className="flex-1 p-3 bg-black text-white rounded-lg font-medium disabled:opacity-30 flex items-center justify-center gap-2">Suivant <Icons.arrowRight className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={`mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-between ${isVisible ? 'animate-fadeInUp stagger-3' : 'opacity-0'}`}>
          <div className="flex items-center gap-2 text-xs text-black/40"><Icons.lightbulb className="w-3 h-3" /><span>Pratique régulière = maîtrise</span></div>
          <div className="flex items-center gap-4 text-xs text-black/40"><span>12 quiz</span><span>12 flashcards</span><span>12 match</span><span>10 debug</span></div>
        </div>
      </div>
    </div>
  )
}
