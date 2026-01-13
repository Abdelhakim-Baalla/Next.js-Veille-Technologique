'use server'

import { revalidatePath } from 'next/cache'

interface ContactFormState {
    success: boolean
    message: string
    errors?: {
        name?: string
        email?: string
        message?: string
    }
}

export async function submitContactForm(
    prevState: ContactFormState,
    formData: FormData
): Promise<ContactFormState> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const message = formData.get('message') as string

    // Validation
    const errors: ContactFormState['errors'] = {}

    if (!name || name.length < 2) {
        errors.name = 'Name must be at least 2 characters'
    }

    if (!email || !email.includes('@')) {
        errors.email = 'Please enter a valid email address'
    }

    if (!message || message.length < 10) {
        errors.message = 'Message must be at least 10 characters'
    }

    if (Object.keys(errors).length > 0) {
        return {
            success: false,
            message: 'Validation failed',
            errors,
        }
    }

    // Simulate saving to database
    console.log('Form submitted:', { name, email, message })

    // Revalidate the path to refresh any cached data
    revalidatePath('/dashboard/contact')

    return {
        success: true,
        message: 'Thank you for your message. We will get back to you soon.',
    }
}
