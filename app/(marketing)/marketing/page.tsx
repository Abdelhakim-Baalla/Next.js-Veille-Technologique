import Link from 'next/link'
import { IconArrowRight, IconFolder } from '../../components/icons'

const routeGroupInfo = [
  {
    title: 'What are Route Groups?',
    description: 'Route Groups allow you to organize routes without affecting the URL structure. Folders wrapped in parentheses (like (marketing)) are excluded from the URL path.',
  },
  {
    title: 'Use Cases',
    description: 'Organize routes by feature, team, or purpose. Apply different layouts to different sections. Keep related files together without impacting URLs.',
  },
  {
    title: 'This Example',
    description: 'This page is inside (marketing)/marketing/page.tsx, but the URL is just /marketing. The route group folder is invisible to the router.',
  },
]

export default function MarketingPage() {
  return (
    <div className="py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Content Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {routeGroupInfo.map((item, index) => (
            <div
              key={item.title}
              className="card animate-fadeInUp opacity-0"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>
                <h3 className="font-semibold">{item.title}</h3>
              </div>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>

        {/* File Structure */}
        <div className="card mb-12">
          <div className="flex items-center gap-2 mb-4">
            <IconFolder className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold">File Structure</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-2">Physical Structure</p>
              <pre className="text-xs font-mono text-gray-600 bg-gray-50 p-4 rounded-lg">
{`app/
├── (marketing)/
│   └── marketing/
│       ├── layout.tsx
│       └── page.tsx
│
└── (dashboard)/
    └── dashboard/
        ├── layout.tsx
        └── page.tsx`}
              </pre>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">URL Routes</p>
              <pre className="text-xs font-mono text-gray-600 bg-gray-50 p-4 rounded-lg">
{`/marketing
  └── Uses (marketing) layout

/dashboard
  └── Uses (dashboard) layout

Note: Route group folders
are excluded from URLs`}
              </pre>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-4">
          <Link
            href="/dashboard"
            className="btn-primary inline-flex items-center gap-2 interactive"
          >
            Explore Dashboard
            <IconArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/photos"
            className="btn-secondary inline-flex items-center gap-2 interactive"
          >
            View Photo Gallery
            <IconArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
