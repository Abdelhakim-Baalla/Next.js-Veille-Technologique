import Link from 'next/link'
import { IconArrowRight, IconCode, IconLayers, IconRoute, IconShield } from './components/icons'

const features = [
  {
    icon: IconLayers,
    title: 'Nested Layouts',
    description: 'Hierarchical layout system with layout.tsx, template.tsx, and page.tsx',
    href: '/dashboard',
  },
  {
    icon: IconRoute,
    title: 'Parallel Routes',
    description: 'Render multiple pages simultaneously with @slots',
    href: '/dashboard',
  },
  {
    icon: IconCode,
    title: 'Intercepting Routes',
    description: 'Modal patterns with (.)photo/[id] conventions',
    href: '/photos',
  },
  {
    icon: IconShield,
    title: 'Middleware',
    description: 'Route protection and authentication flows',
    href: '/dashboard/contact',
  },
]

const concepts = [
  { label: 'Route Groups', code: '(marketing)' },
  { label: 'Dynamic Routes', code: '[id]' },
  { label: 'Parallel Routes', code: '@analytics' },
  { label: 'Intercepting', code: '(.)photo' },
  { label: 'Loading UI', code: 'loading.tsx' },
  { label: 'Error Handling', code: 'error.tsx' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Hero Section */}
        <section className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-600 mb-8 animate-fadeInUp opacity-0 stagger-1">
            <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
            Next.js 15 App Router
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fadeInUp opacity-0 stagger-2">
            Routing
            <br />
            <span className="text-gray-400">Masterclass</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 animate-fadeInUp opacity-0 stagger-3">
            A comprehensive demonstration of advanced routing patterns, 
            from nested layouts to parallel routes and intercepting modals.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 animate-fadeInUp opacity-0 stagger-4">
            <Link href="/dashboard" className="btn-primary inline-flex items-center gap-2 interactive">
              Explore Dashboard
              <IconArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/photos" className="btn-secondary interactive">
              View Photos
            </Link>
          </div>
        </section>

        {/* Concepts Grid */}
        <section className="mb-24">
          <div className="flex flex-wrap justify-center gap-3 animate-fadeInUp opacity-0 stagger-5">
            {concepts.map((concept) => (
              <div
                key={concept.label}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full hover:border-black transition-colors"
              >
                <span className="text-sm text-gray-600">{concept.label}</span>
                <code className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded">
                  {concept.code}
                </code>
              </div>
            ))}
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Routing Patterns</h2>
            <p className="text-gray-600">
              Interactive demonstrations of each routing concept
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Link
                key={feature.title}
                href={feature.href}
                className="card-interactive group animate-fadeInUp opacity-0"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-100 rounded-xl group-hover:bg-black group-hover:text-white transition-colors">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                  <IconArrowRight className="w-5 h-5 text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Architecture Preview */}
        <section className="mb-24">
          <div className="card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="text-sm text-gray-400 ml-4 font-mono">app/</span>
            </div>
            
            <pre className="text-sm font-mono text-gray-700 overflow-x-auto">
              <code>{`app/
├── layout.tsx          # Root Layout (required)
├── template.tsx        # Page transitions
├── page.tsx            # Home page
├── loading.tsx         # Loading UI
├── error.tsx           # Error boundary
├── not-found.tsx       # 404 page
│
├── (dashboard)/        # Route Group
│   ├── layout.tsx      # Dashboard layout
│   ├── page.tsx        # /dashboard
│   ├── @analytics/     # Parallel Route slot
│   └── @team/          # Parallel Route slot
│
├── (marketing)/        # Route Group
│   └── marketing/
│
└── photos/
    ├── [id]/           # Dynamic Route
    └── (.)photo/[id]/  # Intercepting Route`}</code>
            </pre>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="card bg-black text-white p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to explore?</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Navigate through the application to see each routing pattern in action.
            </p>
            <Link 
              href="/dashboard" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-colors interactive"
            >
              Start Exploring
              <IconArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
