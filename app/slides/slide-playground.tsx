'use client'

import { useEffect, useState } from 'react'
import { Icons } from './icons'

export function SlidePlayground() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeGame, setActiveGame] = useState<'menu' | 'quiz' | 'match' | 'debug' | 'flashcards' | 'speed'>('menu')
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
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [speedRound, setSpeedRound] = useState(0)
  const [speedScore, setSpeedScore] = useState(0)

  useEffect(() => { setIsVisible(true) }, [])
  
  useEffect(() => {
    if (activeGame === 'speed' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [activeGame, timeLeft])

  const speedChallenges = [
    { prompt: 'Fichier pour UI partagée', answer: 'layout.tsx' },
    { prompt: 'Directive Client Component', answer: '"use client"' },
    { prompt: 'Route dynamique avec slug', answer: '[slug]' },
    { prompt: 'Route group invisible', answer: '(folder)' },
    { prompt: 'Parallel Route slot', answer: '@folder' },
    { prompt: 'Catch-all segments', answer: '[...slug]' },
    { prompt: 'Fichier chargement', answer: 'loading.tsx' },
    { prompt: 'Fichier erreurs', answer: 'error.tsx' },
    { prompt: 'Page 404 custom', answer: 'not-found.tsx' },
    { prompt: 'API route handler', answer: 'route.ts' },
  ]

  const quizQuestions = [
    { question: "Quel fichier définit l'UI partagée entre plusieurs routes ?", options: ['page.tsx', 'layout.tsx', 'template.tsx', 'route.tsx'], correct: 1, explanation: "layout.tsx persiste entre les navigations ! Il wrap toutes les pages enfants et garde son état. Parfait pour navbars, sidebars, footers.", tip: "💡 Pense à une coquille d'œuf qui protège le contenu", category: "Fichiers" },
    { question: "Comment créer une route group sans affecter l'URL ?", options: ['[folder]', '@folder', '(folder)', '_folder'], correct: 2, explanation: "Les parenthèses (folder) créent un groupe logique invisible dans l'URL. Idéal pour organiser: (marketing), (dashboard), (auth).", tip: "💡 Les parenthèses = invisible dans l'URL", category: "Organisation" },
    { question: "Où doit se trouver le fichier middleware.ts ?", options: ['Dans app/', 'Dans src/', 'À la racine du projet', 'Dans pages/'], correct: 2, explanation: "Le middleware s'exécute AVANT chaque requête. À la racine pour intercepter TOUTES les routes. C'est le gardien de ton app !", tip: "💡 Middleware = Videur de boîte de nuit", category: "Middleware" },
    { question: "Quel est le rendu par défaut dans App Router ?", options: ['Client Components', 'Server Components', 'Static', 'Hybrid'], correct: 1, explanation: "Par défaut = Server Components ! Moins de JS envoyé au client, accès direct aux données, meilleur SEO. Revolution Next.js 13+", tip: "💡 Server = par défaut, Client = opt-in", category: "Rendu" },
    { question: "Comment intercepter une route pour une modal ?", options: ['@folder', '(.)folder', '[...folder]', '[[folder]]'], correct: 1, explanation: "(.) = même niveau, (..) = parent, (...) = racine. Affiche une modal tout en gardant l'URL de destination. UX Instagram-like !", tip: "💡 Le point compte les niveaux à remonter", category: "Avancé" },
    { question: "Quelle directive marque un Client Component ?", options: ['"use server"', '"use client"', '"use strict"', '"use component"'], correct: 1, explanation: '"use client" en haut du fichier active les hooks React (useState, useEffect). Le composant devient interactif côté navigateur.', tip: "💡 Besoin de useState ? → use client", category: "Rendu" },
    { question: "Quel fichier gère les états de chargement ?", options: ['loading.tsx', 'loader.tsx', 'pending.tsx', 'suspense.tsx'], correct: 0, explanation: "loading.tsx = Suspense automatique ! Next.js wrappe ta page avec <Suspense>. Streaming SSR activé automatiquement.", tip: "💡 Crée loading.tsx = UX instantanée", category: "Fichiers" },
    { question: "Comment définir une route dynamique ?", options: ['(slug)', '@slug', '[slug]', '{slug}'], correct: 2, explanation: "[slug] capture la valeur de l'URL. /blog/[slug] → params.slug. Fonctionne avec generateStaticParams pour SSG.", tip: "💡 Crochets = valeur dynamique", category: "Routes" },
    { question: "Quelle convention pour les Parallel Routes ?", options: ['(folder)', '[folder]', '@folder', '_folder'], correct: 2, explanation: "@folder crée un 'slot' nommé. Le layout reçoit @folder comme prop. Parfait pour dashboards multi-panneaux !", tip: "💡 @ = slot parallèle dans le layout", category: "Avancé" },
    { question: "Comment créer une route catch-all ?", options: ['[slug]', '[...slug]', '[[slug]]', '(...slug)'], correct: 1, explanation: "[...slug] capture TOUS les segments. /docs/[...slug] matche /docs/a/b/c → slug = ['a','b','c']. Idéal pour docs, breadcrumbs.", tip: "💡 ... = spread operator pour l'URL", category: "Routes" },
    { question: "Quel fichier pour une page 404 ?", options: ['404.tsx', 'error.tsx', 'not-found.tsx', 'missing.tsx'], correct: 2, explanation: "not-found.tsx + la fonction notFound() de next/navigation. Personnalise ton 404 par segment de route !", tip: "💡 Peut être dans n'importe quel dossier", category: "Fichiers" },
    { question: "Où s'exécute le middleware ?", options: ['Client', 'Node.js', 'Edge Runtime', 'Browser'], correct: 2, explanation: "Edge Runtime = proche de l'utilisateur, ultra-rapide (<50ms). Limitations: pas de Node.js APIs natives. Parfait pour auth, geo, A/B tests.", tip: "💡 Edge = CDN intelligent", category: "Middleware" },
    { question: "Quel hook pour accéder aux params dynamiques ?", options: ['useParams', 'useRouter', 'usePathname', 'useSearchParams'], correct: 0, explanation: "useParams() retourne les segments dynamiques: { slug: 'mon-article' }. Fonctionne uniquement dans les Client Components.", tip: "💡 useParams = [segments], useSearchParams = ?query", category: "Hooks" },
    { question: "Comment créer une API route dans App Router ?", options: ['api.tsx', 'route.tsx', 'handler.tsx', 'endpoint.tsx'], correct: 1, explanation: "route.ts/tsx avec export des méthodes HTTP: GET, POST, PUT, DELETE, PATCH. Remplace pages/api/. Même conventions de routing !", tip: "💡 route.ts = API, page.tsx = UI", category: "API" },
    { question: "Quelle méthode HTTP exporte route.tsx pour GET ?", options: ['getHandler', 'GET', 'get', 'handleGet'], correct: 1, explanation: "export async function GET(request) {}. Nommage en MAJUSCULES = standard HTTP. Next.js route automatiquement.", tip: "💡 Majuscules = méthodes HTTP standard", category: "API" },
    { question: "Comment rendre un segment optionnel ?", options: ['[slug]', '(slug)', '[[slug]]', '[...slug]'], correct: 2, explanation: "[[slug]] = optionnel. Matche /blog ET /blog/article. Combine avec catch-all: [[...slug]] pour maximum de flexibilité.", tip: "💡 Double crochets = optionnel", category: "Routes" },
    { question: "Quel composant pour la navigation ?", options: ['<Navigate>', '<Router>', '<Link>', '<Route>'], correct: 2, explanation: "<Link href='/page'> de next/link. Prefetch automatique, pas de refresh page, historique browser géré.", tip: "💡 Link = SPA navigation", category: "Navigation" },
    { question: "Comment prefetch une route ?", options: ['<Link prefetch>', '<Link preload>', 'router.prefetch()', 'Automatique'], correct: 3, explanation: "Next.js prefetch automatiquement les <Link> visibles dans le viewport ! En production seulement. Désactive avec prefetch={false}.", tip: "💡 Automatique = magie Next.js", category: "Performance" },
    { question: "Où placer les métadonnées SEO ?", options: ['head.tsx', 'meta.tsx', 'page.tsx export', 'seo.tsx'], correct: 2, explanation: "export const metadata = {} ou export async function generateMetadata(). Définition par route, merge automatique avec parents.", tip: "💡 Metadata API > Head component", category: "SEO" },
    { question: "Quel fichier pour les erreurs globales ?", options: ['error.tsx', 'global-error.tsx', 'catch.tsx', 'boundary.tsx'], correct: 1, explanation: "global-error.tsx catch les erreurs du ROOT layout. Doit inclure <html> et <body>. error.tsx pour les sous-routes.", tip: "💡 global-error = dernier filet de sécurité", category: "Fichiers" },
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
    { front: 'page.tsx', back: 'Point entrée route. Rendu côté serveur par défaut.' },
    { front: 'route.tsx', back: 'API Route handlers. Export GET, POST, PUT, DELETE.' },
    { front: 'not-found.tsx', back: 'Page 404 personnalisée. Appelée par notFound().' },
    { front: 'default.tsx', back: 'Fallback pour Parallel Routes non matchées.' },
    { front: 'useRouter()', back: 'Hook navigation programmatique. push, replace, back.' },
    { front: 'generateMetadata', back: 'Fonction async pour SEO dynamique par route.' },
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

  const handleQuizAnswer = (i: number) => { 
    setSelectedAnswer(i); setQuizAnswered(true)
    if (i === quizQuestions[currentQuiz].correct) {
      setQuizScore(s => s + 1)
      setStreak(s => { const newStreak = s + 1; if (newStreak > bestStreak) setBestStreak(newStreak); return newStreak })
    } else {
      setStreak(0)
    }
  }
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
  const resetGame = () => { setActiveGame('menu'); setQuizScore(0); setCurrentQuiz(0); setQuizAnswered(false); setSelectedAnswer(null); setCurrentCard(0); setFlipped(false); setMatchedPairs([]); setSelectedMatch(null); setDebugStep(0); setShowDebugAnswer(false); setStreak(0); setTimeLeft(30); setSpeedRound(0); setSpeedScore(0) }

  const games = [
    { id: 'quiz', icon: Icons.target, title: 'Quiz Master', desc: '20 questions + explications', color: 'bg-gradient-to-br from-purple-500 to-purple-600', badge: 'Popular' },
    { id: 'match', icon: Icons.link, title: 'Speed Match', desc: '12 paires à connecter', color: 'bg-gradient-to-br from-orange-500 to-orange-600', badge: null },
    { id: 'debug', icon: Icons.code, title: 'Debug Challenge', desc: '10 bugs à trouver', color: 'bg-gradient-to-br from-pink-500 to-pink-600', badge: null },
    { id: 'flashcards', icon: Icons.layers, title: 'Flashcards', desc: '18 cartes mémo', color: 'bg-gradient-to-br from-blue-500 to-blue-600', badge: null },
    { id: 'speed', icon: Icons.zap, title: 'Speed Type', desc: '30s chrono', color: 'bg-gradient-to-br from-green-500 to-emerald-600', badge: 'New' },
  ]

  return (
    <div className="slide">
      <div className="slide-content flex flex-col h-full py-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className={`slide-badge mb-2 ${isVisible ? 'animate-fadeInDown' : 'opacity-0'}`}>14 — Zone Interactive</div>
            <h2 className={`text-3xl font-bold tracking-tight ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
              {activeGame === 'menu' ? 'Mini-jeux & Quiz' : activeGame === 'quiz' ? 'Quiz Master' : activeGame === 'match' ? 'Speed Match' : activeGame === 'debug' ? 'Debug Challenge' : activeGame === 'speed' ? 'Speed Type' : 'Flashcards'}
            </h2>
            {activeGame === 'quiz' && streak > 1 && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full animate-pulse">
                <Icons.zap className="w-3 h-3" /> {streak}x Streak!
              </div>
            )}
          </div>
          {activeGame !== 'menu' && (
            <button onClick={resetGame} data-hover className="flex items-center gap-2 px-3 py-1.5 text-xs border border-gray-200 rounded-lg hover:border-black">
              <Icons.arrowLeft className="w-3 h-3" /> Retour
            </button>
          )}
        </div>

        {activeGame === 'menu' && (
          <div className="flex-1 grid grid-cols-5 gap-3">
            {games.map((g, i) => {
              const Icon = g.icon
              return (
                <button key={g.id} onClick={() => setActiveGame(g.id as typeof activeGame)} data-hover
                  className={`group relative flex flex-col items-center justify-center p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-black hover:shadow-lg transition-all ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}
                  style={{ animationDelay: `${i * 80}ms` }}>
                  {g.badge && (
                    <div className={`absolute -top-2 -right-2 px-2 py-0.5 text-[10px] font-bold text-white rounded-full ${g.badge === 'New' ? 'bg-green-500' : 'bg-purple-500'} animate-pulse`}>
                      {g.badge}
                    </div>
                  )}
                  <div className={`w-12 h-12 rounded-xl ${g.color} flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-sm mb-0.5">{g.title}</h3>
                  <p className="text-[10px] text-black/40 text-center">{g.desc}</p>
                </button>
              )
            })}
          </div>
        )}

        {activeGame === 'quiz' && (
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-1">{quizQuestions.map((_, i) => <div key={i} className={`w-4 h-1.5 rounded-full transition-all ${i < currentQuiz ? 'bg-green-500' : i === currentQuiz ? 'bg-black w-6' : 'bg-gray-200'}`} />)}</div>
              <div className="flex items-center gap-3">
                <div className="px-2 py-1 bg-purple-100 text-purple-700 text-[10px] rounded-full font-medium">{quizQuestions[currentQuiz]?.category}</div>
                <div className="px-3 py-1 bg-black text-white text-xs rounded-full font-mono">{quizScore}/{quizQuestions.length}</div>
              </div>
            </div>
            {currentQuiz < quizQuestions.length && (
              <div className="flex-1 flex gap-4">
                {/* Question Card */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-full max-w-md p-6 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"><Icons.target className="w-4 h-4 text-white" /></div>
                      <span className="text-xs text-black/40">Question {currentQuiz + 1}/{quizQuestions.length}</span>
                    </div>
                    <h4 className="font-bold mb-4 text-lg">{quizQuestions[currentQuiz].question}</h4>
                    <div className="space-y-2">
                      {quizQuestions[currentQuiz].options.map((o, i) => (
                        <button key={i} onClick={() => !quizAnswered && handleQuizAnswer(i)} disabled={quizAnswered} data-hover
                          className={`w-full p-3 rounded-lg text-left text-sm transition-all flex items-center gap-3 ${quizAnswered ? i === quizQuestions[currentQuiz].correct ? 'bg-green-100 border-2 border-green-400 scale-[1.02]' : selectedAnswer === i ? 'bg-red-100 border-2 border-red-400 scale-95 opacity-70' : 'bg-white border border-gray-200 opacity-40 scale-95' : 'bg-white border border-gray-200 hover:border-black hover:scale-[1.01]'}`}>
                          <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${quizAnswered && i === quizQuestions[currentQuiz].correct ? 'bg-green-500 text-white' : quizAnswered && selectedAnswer === i ? 'bg-red-500 text-white' : 'bg-gray-100 text-black/50'}`}>{String.fromCharCode(65 + i)}</span>
                          <span className="flex-1">{o}</span>
                          {quizAnswered && i === quizQuestions[currentQuiz].correct && <Icons.check className="w-5 h-5 text-green-500" />}
                          {quizAnswered && selectedAnswer === i && i !== quizQuestions[currentQuiz].correct && <Icons.x className="w-5 h-5 text-red-500" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Explanation Panel */}
                {quizAnswered && (
                  <div className="w-72 flex flex-col gap-3 animate-fadeInRight">
                    <div className={`p-4 rounded-xl border-2 ${selectedAnswer === quizQuestions[currentQuiz].correct ? 'bg-green-50 border-green-300' : 'bg-amber-50 border-amber-300'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        {selectedAnswer === quizQuestions[currentQuiz].correct ? (
                          <><div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center"><Icons.check className="w-4 h-4 text-white" /></div><span className="font-bold text-green-700">Correct !</span></>
                        ) : (
                          <><div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center"><Icons.lightbulb className="w-4 h-4 text-white" /></div><span className="font-bold text-amber-700">Pas tout à fait...</span></>
                        )}
                      </div>
                      <p className="text-sm text-black/70 leading-relaxed">{quizQuestions[currentQuiz].explanation}</p>
                    </div>
                    
                    <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                      <div className="flex items-start gap-2">
                        <span className="text-lg">{quizQuestions[currentQuiz].tip.split(' ')[0]}</span>
                        <p className="text-xs text-blue-700 font-medium leading-relaxed">{quizQuestions[currentQuiz].tip.substring(2)}</p>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-100 rounded-xl">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-black/40">Catégorie</span>
                        <span className="px-2 py-1 bg-white rounded-full font-medium">{quizQuestions[currentQuiz].category}</span>
                      </div>
                    </div>

                    {currentQuiz < quizQuestions.length - 1 ? (
                      <button onClick={nextQuiz} data-hover className="p-4 bg-black text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
                        Question suivante <Icons.arrowRight className="w-5 h-5" />
                      </button>
                    ) : (
                      <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl text-center">
                        <Icons.award className="w-10 h-10 mx-auto mb-2" />
                        <p className="font-bold text-lg">Quiz Terminé !</p>
                        <p className="text-white/80 text-sm">Score: {quizScore}/{quizQuestions.length} ({Math.round(quizScore/quizQuestions.length*100)}%)</p>
                        <div className="mt-2 flex gap-1 justify-center">{[...Array(5)].map((_, i) => <Icons.target key={i} className={`w-4 h-4 ${i < Math.round(quizScore/quizQuestions.length*5) ? 'text-yellow-300' : 'text-white/30'}`} />)}</div>
                      </div>
                    )}
                  </div>
                )}
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
              <div className="flex gap-1">{flashcards.map((_, i) => <div key={i} className={`w-4 h-1 rounded-full transition-all ${i === currentCard ? 'bg-black w-6' : i < currentCard ? 'bg-green-500' : 'bg-gray-200'}`} />)}</div>
              <div className="px-3 py-1 bg-black text-white text-xs rounded-full font-mono">{currentCard + 1}/{flashcards.length}</div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full max-w-lg">
                <div onClick={() => setFlipped(!flipped)} data-hover className="relative h-64 cursor-pointer group" style={{ perspective: '1000px' }}>
                  <div className={`relative w-full h-full transition-all duration-500 ${flipped ? '[transform:rotateY(180deg)]' : ''}`} style={{ transformStyle: 'preserve-3d' }}>
                    <div className="absolute inset-0 bg-black rounded-2xl p-8 flex flex-col items-center justify-center shadow-2xl" style={{ backfaceVisibility: 'hidden' }}>
                      <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6"><Icons.code className="w-8 h-8 text-white" /></div>
                      <div className="text-3xl font-mono font-bold text-white text-center mb-4">{flashcards[currentCard].front}</div>
                      <div className="flex items-center gap-2 text-white/40 text-xs"><Icons.refresh className="w-3 h-3" /><span>Cliquez pour révéler</span></div>
                    </div>
                    <div className="absolute inset-0 bg-white rounded-2xl border-2 border-black p-8 flex flex-col items-center justify-center shadow-2xl [transform:rotateY(180deg)]" style={{ backfaceVisibility: 'hidden' }}>
                      <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4"><Icons.check className="w-6 h-6 text-green-600" /></div>
                      <p className="text-base text-center text-black/80 leading-relaxed font-medium">{flashcards[currentCard].back}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-8">
                  <button onClick={() => { if (currentCard > 0) { setCurrentCard(c => c - 1); setFlipped(false) } }} disabled={currentCard === 0} data-hover className="flex-1 p-4 border-2 border-gray-200 rounded-xl font-semibold disabled:opacity-30 hover:border-black flex items-center justify-center gap-2 transition-all"><Icons.arrowLeft className="w-5 h-5" /> Précédent</button>
                  <button onClick={() => { if (currentCard < flashcards.length - 1) { setCurrentCard(c => c + 1); setFlipped(false) } }} disabled={currentCard === flashcards.length - 1} data-hover className="flex-1 p-4 bg-black text-white rounded-xl font-semibold disabled:opacity-30 flex items-center justify-center gap-2 hover:bg-gray-800 transition-all">Suivant <Icons.arrowRight className="w-5 h-5" /></button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeGame === 'speed' && (
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className={`px-4 py-2 rounded-xl font-mono font-bold text-lg ${timeLeft <= 10 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-gray-100 text-black'}`}>
                  <Icons.clock className="w-4 h-4 inline mr-2" />{timeLeft}s
                </div>
                <div className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg font-bold">Score: {speedScore}</div>
              </div>
              <div className="text-sm text-black/40">Round {speedRound + 1}/10</div>
            </div>
            
            {timeLeft > 0 && speedRound < speedChallenges.length ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-md text-center">
                  <div className="mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Icons.zap className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{speedChallenges[speedRound].prompt}</h3>
                    <p className="text-black/40 text-sm">Tape la bonne réponse !</p>
                  </div>
                  <input
                    type="text"
                    autoFocus
                    className="w-full p-4 text-center text-xl font-mono border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-all"
                    placeholder="Ta réponse..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const input = e.currentTarget
                        if (input.value.toLowerCase().trim() === speedChallenges[speedRound].answer.toLowerCase()) {
                          setSpeedScore(s => s + Math.ceil(timeLeft / 3))
                          input.value = ''
                          if (speedRound < speedChallenges.length - 1) setSpeedRound(r => r + 1)
                          else setTimeLeft(0)
                        } else {
                          input.classList.add('animate-shake', 'border-red-400')
                          setTimeout(() => input.classList.remove('animate-shake', 'border-red-400'), 500)
                        }
                      }
                    }}
                  />
                  <p className="mt-4 text-xs text-black/30">Appuie sur Entrée pour valider</p>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center p-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl text-white max-w-sm">
                  <Icons.award className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Temps écoulé !</h3>
                  <p className="text-4xl font-black mb-2">{speedScore} pts</p>
                  <p className="text-white/70">Tu as complété {speedRound} rounds</p>
                  <button onClick={() => { setTimeLeft(30); setSpeedRound(0); setSpeedScore(0) }} data-hover className="mt-4 px-6 py-3 bg-white text-green-600 rounded-xl font-bold hover:scale-105 transition-transform">
                    Rejouer
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className={`mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-between ${isVisible ? 'animate-fadeInUp stagger-3' : 'opacity-0'}`}>
          <div className="flex items-center gap-2 text-xs text-black/40"><Icons.lightbulb className="w-3 h-3" /><span>Pratique régulière = maîtrise</span></div>
          <div className="flex items-center gap-4 text-xs text-black/40">
            <span>20 quiz</span><span>18 flashcards</span><span>12 match</span><span>10 debug</span><span className="text-green-600 font-medium">+ Speed Type</span>
            {bestStreak > 0 && <span className="text-orange-500 font-medium">🔥 Best: {bestStreak}x</span>}
          </div>
        </div>
      </div>
    </div>
  )
}
