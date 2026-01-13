import { ContactForm } from './contact-form'
import { IconMail, IconCode } from '../../../components/icons'

export default function ContactPage() {
  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-xs font-mono text-gray-600 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
          Server Action Demo
        </div>
        <h1 className="text-2xl font-bold mb-2">Contact Form</h1>
        <p className="text-gray-600">
          This form demonstrates Server Actions with form validation and revalidation.
        </p>
      </div>

      {/* Form Card */}
      <div className="card mb-8">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
          <div className="p-2 bg-gray-100 rounded-lg">
            <IconMail className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-semibold">Send a Message</h2>
            <p className="text-sm text-gray-500">Protected by middleware authentication</p>
          </div>
        </div>

        <ContactForm />
      </div>

      {/* Code Example */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <IconCode className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold">Server Action Code</h3>
        </div>
        <pre className="text-xs font-mono text-gray-600 bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`'use server'

import { revalidatePath } from 'next/cache'

export async function submitContactForm(
  prevState: FormState,
  formData: FormData
) {
  const name = formData.get('name')
  const email = formData.get('email')
  
  // Validate and process...
  
  // Revalidate cached data
  revalidatePath('/dashboard/contact')
  
  return { success: true, message: '...' }
}`}
        </pre>
      </div>
    </div>
  )
}
