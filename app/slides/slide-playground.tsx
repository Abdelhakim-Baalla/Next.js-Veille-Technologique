'use client'

import { useEffect, useState, useRef } from 'react'
import { Icons } from './icons'
import { SyntaxHighlighter } from './syntax-highlighter'

// Confetti Component
function Confetti({ active }: { active: boolean }) {
  if (!active) return null
  const colors = ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6']
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-10px',
            width: '10px',
            height: '10px',
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  )
}

// Achievement Toast
function AchievementToast({ achievement, onClose }: { achievement: { icon: string; title: string; desc: string } | null; onClose: () => void }) {
  useEffect(() => {
    if (achievement) {
      const timer = setTimeout(onClose, 4000)
      return () => clearTimeout(timer)
    }
  }, [achievement, onClose])
  
  if (!achievement) return null
  return (
    <div className="fixed top-4 right-4 z-50 animate-slideInRight">
      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl shadow-2xl">
        <div className="text-3xl">{achievement.icon}</div>
        <div>
          <div className="font-bold text-sm">🏆 Achievement Unlocked!</div>
          <div className="font-black">{achievement.title}</div>
          <div className="text-xs text-white/80">{achievement.desc}</div>
        </div>
      </div>
    </div>
  )
}

// Mini Code Editor
function CodeSandbox({ onClose }: { onClose: () => void }) {
  const [code, setCode] = useState(`// Essaie d'écrire une page Next.js
export default function Page() {
  return (
    <div>
      Hello Next.js!
    </div>
  )
}`)
  const [errors, setErrors] = useState<string[]>([])
  const [hints, setHints] = useState<string[]>([])

  const validateCode = (input: string) => {
    const newErrors: string[] = []
    const newHints: string[] = []
    
    if (!input.includes('export default')) newErrors.push('❌ Missing "export default"')
    if (input.includes('useState') && !input.includes('"use client"')) newErrors.push('❌ useState needs "use client"')
    if (input.includes('useEffect') && !input.includes('"use client"')) newErrors.push('❌ useEffect needs "use client"')
    if (input.includes('<html>') && !input.includes('<body>')) newErrors.push('❌ <html> needs <body>')
    
    if (input.includes('export default function')) newHints.push('✅ Correct export syntax!')
    if (input.includes('"use client"')) newHints.push('✅ Client Component detected')
    if (input.includes('"use server"')) newHints.push('✅ Server Action detected')
    if (input.includes('async function')) newHints.push('💡 Async functions work great in Server Components')
    
    setErrors(newErrors)
    setHints(newHints)
  }

  useEffect(() => { validateCode(code) }, [code])

  const exercises = [
    { title: 'Page basique', code: `export default function Page() {\n  return <h1>Hello</h1>\n}` },
    { title: 'Client Component', code: `"use client"\n\nimport { useState } from 'react'\n\nexport default function Counter() {\n  const [count, setCount] = useState(0)\n  return <button onClick={() => setCount(c => c + 1)}>{count}</button>\n}` },
    { title: 'Layout', code: `export default function Layout({ children }) {\n  return (\n    <html>\n      <body>{children}</body>\n    </html>\n  )\n}` },
    { title: 'Server Action', code: `"use server"\n\nexport async function createUser(formData) {\n  const name = formData.get('name')\n  await db.user.create({ data: { name } })\n}` },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <Icons.code className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold">Code Sandbox</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg"><Icons.x className="w-5 h-5" /></button>
        </div>
        <div className="flex">
          <div className="w-48 border-r p-3 bg-gray-50">
            <div className="text-xs font-medium text-black/40 mb-2">EXERCICES</div>
            {exercises.map((ex, i) => (
              <button key={i} onClick={() => setCode(ex.code)} className="w-full text-left p-2 text-sm rounded-lg hover:bg-white mb-1 transition-all">
                {ex.title}
              </button>
            ))}
          </div>
          <div className="flex-1 flex flex-col">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 p-4 font-mono text-sm bg-gray-900 text-green-400 resize-none focus:outline-none min-h-[300px]"
              spellCheck={false}
            />
            <div className="p-3 bg-gray-100 border-t max-h-32 overflow-auto">
              {errors.map((e, i) => <div key={i} className="text-xs text-red-600 mb-1">{e}</div>)}
              {hints.map((h, i) => <div key={i} className="text-xs text-green-600 mb-1">{h}</div>)}
              {errors.length === 0 && hints.length === 0 && <div className="text-xs text-black/40">Écris du code pour voir les validations...</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SlidePlayground() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeGame, setActiveGame] = useState<'menu' | 'quiz' | 'match' | 'debug' | 'flashcards' | 'speed' | 'random' | 'sandbox'>('menu')
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
  
  // New features
  const [darkMode, setDarkMode] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [achievements, setAchievements] = useState<string[]>([])
  const [currentAchievement, setCurrentAchievement] = useState<{ icon: string; title: string; desc: string } | null>(null)
  const [totalScore, setTotalScore] = useState(0)
  const [randomChallenges, setRandomChallenges] = useState<Array<{ type: string; question: string; options?: string[]; correct?: number }>>([])
  const [randomIndex, setRandomIndex] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Classmate spinner system
  const allClassmates = [
    'Abdelhaq El Ghandor', 'Abdelillah Essemlali', 'Addar Abdellah', 'Ayoub Labit',
    'Hamza Jaafar', 'Hamza Elboukri', 'Isam Chajia', 'Keltoum Malouki',
    'Lahmidi Abderrahmane', 'Eddahmani Mohamed', 'Mohamed Follane', 'Mokhtari Mohamed',
    'Mustapha Boukadia', 'Driss Nafiaa', 'Smail Najim', 'Solayman Jaafar',
    'Yassine Hassani', 'Zakaria El Ouannasse'
  ]
  const [availableClassmates, setAvailableClassmates] = useState<string[]>([...allClassmates])
  const [spinnerActive, setSpinnerActive] = useState(false)
  const [spinnerName, setSpinnerName] = useState('')
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
  const [showSpinnerResult, setShowSpinnerResult] = useState(false)

  const allAchievements = [
    { id: 'first_quiz', icon: '🎯', title: 'Premier Quiz', desc: 'Complète ton premier quiz' },
    { id: 'perfect_score', icon: '💯', title: 'Score Parfait', desc: '100% de bonnes réponses' },
    { id: 'speed_demon', icon: '⚡', title: 'Speed Demon', desc: 'Termine Speed Type en 30s' },
    { id: 'streak_5', icon: '🔥', title: 'En Feu!', desc: '5 bonnes réponses de suite' },
    { id: 'streak_10', icon: '🌟', title: 'Inarrêtable', desc: '10 bonnes réponses de suite' },
    { id: 'match_master', icon: '🔗', title: 'Match Master', desc: 'Complete Speed Match' },
    { id: 'debugger', icon: '🐛', title: 'Bug Hunter', desc: 'Trouve 10 bugs' },
    { id: 'scholar', icon: '📚', title: 'Érudit', desc: 'Révise toutes les flashcards' },
    { id: 'random_warrior', icon: '🎲', title: 'Random Warrior', desc: 'Complete le mode aléatoire' },
    { id: 'dark_side', icon: '🌙', title: 'Dark Side', desc: 'Active le mode sombre' },
  ]

  const unlockAchievement = (id: string) => {
    if (!achievements.includes(id)) {
      setAchievements(prev => [...prev, id])
      const ach = allAchievements.find(a => a.id === id)
      if (ach) setCurrentAchievement(ach)
    }
  }

  useEffect(() => { setIsVisible(true) }, [])
  
  useEffect(() => {
    if (activeGame === 'speed' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [activeGame, timeLeft])

  // Check achievements
  useEffect(() => {
    if (streak >= 5 && !achievements.includes('streak_5')) unlockAchievement('streak_5')
    if (streak >= 10 && !achievements.includes('streak_10')) unlockAchievement('streak_10')
  }, [streak])

  useEffect(() => {
    if (darkMode && !achievements.includes('dark_side')) unlockAchievement('dark_side')
  }, [darkMode])

  // Music control
  const toggleMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('https://assets.mixkit.co/music/preview/mixkit-sleepy-cat-135.mp3')
      audioRef.current.loop = true
      audioRef.current.volume = 0.1
    }
    if (musicPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setMusicPlaying(!musicPlaying)
  }

  // Generate random challenges
  const startRandomMode = () => {
    const challenges: Array<{ type: string; question: string; options?: string[]; correct?: number }> = []
    // Add 5 random quiz questions
    const shuffledQuiz = [...quizQuestions].sort(() => Math.random() - 0.5).slice(0, 5)
    shuffledQuiz.forEach(q => challenges.push({ type: 'quiz', question: q.question, options: q.options, correct: q.correct }))
    // Add 3 random debug challenges  
    const shuffledDebug = [...debugChallenges].sort(() => Math.random() - 0.5).slice(0, 3)
    shuffledDebug.forEach(d => challenges.push({ type: 'debug', question: d.error }))
    // Shuffle all challenges
    challenges.sort(() => Math.random() - 0.5)
    setRandomChallenges(challenges)
    setRandomIndex(0)
    setActiveGame('random')
  }

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

  // Use a stable initial order for SSR, shuffle only on client
  const [shuffledRight, setShuffledRight] = useState(() => [...matchPairs])
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
    setShuffledRight([...matchPairs].sort(() => Math.random() - 0.5))
  }, [])

  const handleQuizAnswer = (i: number) => { 
    setSelectedAnswer(i); setQuizAnswered(true)
    if (i === quizQuestions[currentQuiz].correct) {
      setQuizScore(s => s + 1)
      setStreak(s => { const newStreak = s + 1; if (newStreak > bestStreak) setBestStreak(newStreak); return newStreak })
    } else {
      setStreak(0)
    }
  }
  const nextQuiz = () => { 
    if (currentQuiz < quizQuestions.length - 1) { 
      setCurrentQuiz(c => c + 1)
      setQuizAnswered(false)
      setSelectedAnswer(null)
      setSelectedStudent(null)
      setShowSpinnerResult(false)
    } 
  }
  
  // Spinner function for selecting classmates
  const spinForStudent = () => {
    if (availableClassmates.length === 0 || spinnerActive) return
    
    setSpinnerActive(true)
    setShowSpinnerResult(false)
    setSelectedStudent(null)
    
    let iterations = 0
    const maxIterations = 25 + Math.floor(Math.random() * 15) // 25-40 iterations
    const baseSpeed = 50
    
    const spin = () => {
      const randomIdx = Math.floor(Math.random() * availableClassmates.length)
      setSpinnerName(availableClassmates[randomIdx])
      iterations++
      
      if (iterations < maxIterations) {
        // Speed decreases as we approach the end (slower at the end for dramatic effect)
        const speed = baseSpeed + Math.pow(iterations / maxIterations, 2) * 200
        setTimeout(spin, speed)
      } else {
        // Final selection
        const finalIdx = Math.floor(Math.random() * availableClassmates.length)
        const selected = availableClassmates[finalIdx]
        setSpinnerName(selected)
        setSelectedStudent(selected)
        setShowSpinnerResult(true)
        setSpinnerActive(false)
        
        // Remove from available list
        setAvailableClassmates(prev => prev.filter(name => name !== selected))
      }
    }
    
    spin()
  }

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
  const resetGame = () => { 
    setActiveGame('menu'); setQuizScore(0); setCurrentQuiz(0); setQuizAnswered(false); setSelectedAnswer(null); setCurrentCard(0); setFlipped(false); setMatchedPairs([]); setSelectedMatch(null); setDebugStep(0); setShowDebugAnswer(false); setStreak(0); setTimeLeft(30); setSpeedRound(0); setSpeedScore(0); setRandomIndex(0); setShowConfetti(false)
    // Reset spinner states
    setSelectedStudent(null); setShowSpinnerResult(false); setSpinnerName(''); setAvailableClassmates([...allClassmates])
  }

  // Check quiz completion for achievements and confetti
  const handleQuizComplete = () => {
    unlockAchievement('first_quiz')
    setTotalScore(s => s + quizScore)
    if (quizScore === quizQuestions.length) {
      unlockAchievement('perfect_score')
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
    } else if (quizScore >= quizQuestions.length * 0.8) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
    }
  }

  const games = [
    { id: 'quiz', icon: Icons.target, title: 'Quiz Master', desc: '20 questions', color: 'bg-gradient-to-br from-purple-500 to-purple-600', badge: 'Popular' },
    { id: 'match', icon: Icons.link, title: 'Speed Match', desc: '12 paires', color: 'bg-gradient-to-br from-orange-500 to-orange-600', badge: null },
    { id: 'debug', icon: Icons.code, title: 'Debug Challenge', desc: '10 bugs', color: 'bg-gradient-to-br from-pink-500 to-pink-600', badge: null },
    { id: 'flashcards', icon: Icons.layers, title: 'Flashcards', desc: '18 cartes', color: 'bg-gradient-to-br from-cyan-500 to-blue-600', badge: null },
    { id: 'speed', icon: Icons.terminal, title: 'Speed Type', desc: '30s chrono', color: 'bg-gradient-to-br from-green-500 to-emerald-600', badge: null },
    { id: 'random', icon: Icons.shuffle, title: 'Défi Aléatoire', desc: 'Mix!', color: 'bg-gradient-to-br from-yellow-500 to-orange-500', badge: null },
    { id: 'sandbox', icon: Icons.code, title: 'Code Sandbox', desc: 'Pratique!', color: 'bg-gradient-to-br from-gray-700 to-gray-900', badge: null },
  ]

  return (
    <div className={`slide transition-all duration-500 ${darkMode ? 'bg-gray-900' : ''}`}>
      <Confetti active={showConfetti} />
      <AchievementToast achievement={currentAchievement} onClose={() => setCurrentAchievement(null)} />
      {activeGame === 'sandbox' && <CodeSandbox onClose={resetGame} />}

      <div className={`slide-content flex flex-col h-full py-6 ${darkMode ? 'text-white' : ''}`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className={`slide-badge mb-2 ${isVisible ? 'animate-fadeInDown' : 'opacity-0'}`}>14 — Zone Interactive</div>
            <h2 className={`text-3xl font-bold tracking-tight ${darkMode ? 'text-white' : ''} ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
              {activeGame === 'menu' ? 'Mini-jeux & Quiz' : activeGame === 'quiz' ? 'Quiz Master' : activeGame === 'match' ? 'Speed Match' : activeGame === 'debug' ? 'Debug Challenge' : activeGame === 'speed' ? 'Speed Type' : activeGame === 'random' ? 'Défi Aléatoire' : activeGame === 'sandbox' ? 'Code Sandbox' : 'Flashcards'}
            </h2>
            {activeGame === 'quiz' && streak > 1 && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full animate-pulse">
                <Icons.zap className="w-3 h-3" /> {streak}x Streak!
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {/* Music Toggle */}
            <button onClick={toggleMusic} data-hover className={`p-2 rounded-lg border transition-all hover:scale-110 ${musicPlaying ? 'bg-green-100 border-green-400 text-green-600' : 'bg-gray-50 border-gray-200 hover:border-black'}`}>
              {musicPlaying ? <Icons.volumeX className="w-4 h-4" /> : <Icons.volume2 className="w-4 h-4" />}
            </button>
            {/* Dark Mode Toggle */}
            <button onClick={() => { setDarkMode(!darkMode); if (!darkMode) unlockAchievement('dark_side') }} data-hover className={`p-2 rounded-lg border transition-all hover:scale-110 ${darkMode ? 'bg-gray-700 border-gray-600 text-yellow-400' : 'bg-gray-50 border-gray-200 hover:border-black'}`}>
              {darkMode ? <Icons.sun className="w-4 h-4" /> : <Icons.moon className="w-4 h-4" />}
            </button>
            {/* Achievements */}
            <div className={`flex items-center gap-1 px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-yellow-50 border-yellow-200'}`}>
              <Icons.award className="w-4 h-4 text-yellow-500" />
              <span className="text-xs font-bold">{achievements.length}/10</span>
            </div>
            {activeGame !== 'menu' && (
              <button onClick={resetGame} data-hover className={`flex items-center gap-2 px-3 py-1.5 text-xs border rounded-lg transition-all hover:scale-105 ${darkMode ? 'border-gray-600 hover:border-white' : 'border-gray-200 hover:border-black'}`}>
                <Icons.arrowLeft className="w-3 h-3" /> Retour
              </button>
            )}
          </div>
        </div>

        {activeGame === 'menu' && (
          <div className="flex-1 grid grid-cols-7 gap-3">
            {games.map((g, i) => {
              const Icon = g.icon
              return (
                <button key={g.id} onClick={() => g.id === 'random' ? startRandomMode() : setActiveGame(g.id as typeof activeGame)} data-hover
                  className={`group relative flex flex-col items-center justify-center p-4 rounded-xl border transition-all hover:shadow-lg hover:scale-[1.02] ${darkMode ? 'bg-gray-800 border-gray-700 hover:border-white' : 'bg-gray-50 border-gray-200 hover:border-black'} ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}
                  style={{ animationDelay: `${i * 80}ms` }}>
                  {g.badge && (
                    <div className={`absolute -top-2 -right-2 px-2 py-0.5 text-[10px] font-bold text-white rounded-full ${g.badge === 'New' ? 'bg-green-500' : g.badge === 'Hot' ? 'bg-orange-500' : 'bg-purple-500'} animate-pulse`}>
                      {g.badge}
                    </div>
                  )}
                  <div className={`w-10 h-10 rounded-xl ${g.color} flex items-center justify-center mb-2 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-xs mb-0.5">{g.title}</h3>
                  <p className={`text-[10px] text-center ${darkMode ? 'text-gray-400' : 'text-black/40'}`}>{g.desc}</p>
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
                <div className="px-2 py-1 bg-blue-100 text-blue-700 text-[10px] rounded-full font-medium">👥 {availableClassmates.length} restants</div>
              </div>
            </div>
            {currentQuiz < quizQuestions.length && (
              <div className="flex-1 flex gap-4">
                {/* Student Spinner Panel - Minimal Dark Theme */}
                <div className="w-52 flex flex-col gap-2">
                  <div className={`p-4 rounded-2xl transition-all duration-300 ${showSpinnerResult ? 'bg-black' : 'bg-gray-900'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">Répondant</span>
                      <span className="text-[10px] text-gray-600 font-mono">{availableClassmates.length} restants</span>
                    </div>
                    
                    {/* Spinner Display - Sleek Dark */}
                    <div className={`relative h-20 mb-4 rounded-xl overflow-hidden flex items-center justify-center border ${spinnerActive ? 'border-white/30' : showSpinnerResult ? 'border-white' : 'border-gray-700'}`}>
                      {spinnerActive && (
                        <div className="absolute inset-0">
                          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                        </div>
                      )}
                      {showSpinnerResult && (
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                      )}
                      <div className="relative z-10 text-center">
                        {spinnerActive ? (
                          <span className="font-bold text-white text-base animate-pulse">{spinnerName}</span>
                        ) : showSpinnerResult && selectedStudent ? (
                          <div>
                            <span className="block text-white font-black text-lg">{selectedStudent.split(' ')[0]}</span>
                            <span className="text-[10px] text-gray-400">{selectedStudent.split(' ')[1]}</span>
                          </div>
                        ) : (
                          <span className="text-gray-500 text-sm">Appuie pour sélectionner</span>
                        )}
                      </div>
                    </div>
                    
                    {/* Spin Button - Minimal */}
                    <button 
                      onClick={spinForStudent} 
                      disabled={spinnerActive || availableClassmates.length === 0 || showSpinnerResult}
                      data-hover
                      className={`w-full p-3 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                        spinnerActive ? 'bg-white/10 text-white cursor-wait' : 
                        showSpinnerResult ? 'bg-white text-black' :
                        availableClassmates.length === 0 ? 'bg-gray-800 text-gray-600 cursor-not-allowed' :
                        'bg-white text-black hover:bg-gray-100'
                      }`}
                    >
                      {spinnerActive ? (
                        <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sélection...</>
                      ) : showSpinnerResult ? (
                        <><Icons.check className="w-4 h-4" /> {selectedStudent?.split(' ')[0]} répond</>
                      ) : availableClassmates.length === 0 ? (
                        <>Terminé</>
                      ) : (
                        <><Icons.shuffle className="w-4 h-4" /> Spin</>
                      )}
                    </button>
                  </div>
                  
                  {/* Participants List - Compact */}
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <div className="flex flex-wrap gap-1">
                      {availableClassmates.slice(0, 6).map((name, i) => (
                        <span key={i} className="px-2 py-0.5 bg-white rounded text-[9px] border border-gray-200 text-gray-600">{name.split(' ')[0]}</span>
                      ))}
                      {availableClassmates.length > 6 && (
                        <span className="px-2 py-0.5 bg-black text-white rounded text-[9px]">+{availableClassmates.length - 6}</span>
                      )}
                    </div>
                  </div>
                </div>

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
                        <button onClick={() => { handleQuizComplete(); resetGame() }} data-hover className="mt-3 px-4 py-2 bg-white/20 rounded-lg text-sm hover:bg-white/30 transition-all">
                          Retour au menu
                        </button>
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
                <div className="bg-gray-900 rounded-xl p-4 mb-4"><SyntaxHighlighter code={debugChallenges[debugStep].code} /></div>
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

        {/* Random Challenge Mode */}
        {activeGame === 'random' && (
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-1">{randomChallenges.map((_, i) => <div key={i} className={`w-4 h-1.5 rounded-full transition-all ${i < randomIndex ? 'bg-green-500' : i === randomIndex ? 'bg-orange-500 w-6' : 'bg-gray-200'}`} />)}</div>
              <div className="flex items-center gap-3">
                <div className={`px-2 py-1 text-[10px] rounded-full font-medium ${randomChallenges[randomIndex]?.type === 'quiz' ? 'bg-purple-100 text-purple-700' : randomChallenges[randomIndex]?.type === 'debug' ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700'}`}>
                  {randomChallenges[randomIndex]?.type?.toUpperCase()}
                </div>
                <div className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full font-mono">{randomIndex + 1}/{randomChallenges.length}</div>
              </div>
            </div>
            
            {randomIndex < randomChallenges.length && (
              <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-lg p-6 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl border-2 border-orange-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center animate-bounce">
                      <Icons.shuffle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Défi #{randomIndex + 1}</h4>
                      <p className="text-xs text-black/50">{randomChallenges[randomIndex]?.type === 'quiz' ? 'Question Quiz' : randomChallenges[randomIndex]?.type === 'debug' ? 'Trouve le bug' : 'Connaissance'}</p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white rounded-xl mb-4">
                    <p className="font-medium text-lg">{randomChallenges[randomIndex]?.question}</p>
                  </div>
                  
                  {randomChallenges[randomIndex]?.options ? (
                    <div className="space-y-2">
                      {randomChallenges[randomIndex].options.map((o: string, i: number) => (
                        <button key={i} data-hover
                          className="w-full p-3 bg-white rounded-lg text-left text-sm border-2 border-gray-100 hover:border-orange-400 hover:bg-orange-50 transition-all flex items-center gap-3"
                          onClick={() => {
                            if (i === randomChallenges[randomIndex].correct) {
                              setTotalScore(s => s + 10)
                              if (randomIndex < randomChallenges.length - 1) {
                                setRandomIndex(i => i + 1)
                              } else {
                                unlockAchievement('random_warrior')
                                setShowConfetti(true)
                                setTimeout(() => { setShowConfetti(false); resetGame() }, 3000)
                              }
                            }
                          }}>
                          <span className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center text-xs font-bold text-orange-600">{String.fromCharCode(65 + i)}</span>
                          <span>{o}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <button data-hover
                      className="w-full p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold hover:scale-[1.02] transition-transform"
                      onClick={() => {
                        setTotalScore(s => s + 5)
                        if (randomIndex < randomChallenges.length - 1) {
                          setRandomIndex(i => i + 1)
                        } else {
                          unlockAchievement('random_warrior')
                          setShowConfetti(true)
                          setTimeout(() => { setShowConfetti(false); resetGame() }, 3000)
                        }
                      }}>
                      Suivant <Icons.arrowRight className="w-5 h-5 inline ml-2" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <div className={`mt-4 p-3 rounded-lg border flex items-center justify-between ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-100'} ${isVisible ? 'animate-fadeInUp stagger-3' : 'opacity-0'}`}>
          <div className={`flex items-center gap-2 text-xs ${darkMode ? 'text-gray-400' : 'text-black/40'}`}><Icons.lightbulb className="w-3 h-3" /><span>Pratique régulière = maîtrise</span></div>
          <div className={`flex items-center gap-4 text-xs ${darkMode ? 'text-gray-400' : 'text-black/40'}`}>
            <span>🏆 {achievements.length} badges</span>
            <span>⚡ Score: {totalScore}</span>
            {bestStreak > 0 && <span className="text-orange-500 font-medium">🔥 Best: {bestStreak}x</span>}
          </div>
        </div>
      </div>
    </div>
  )
}
