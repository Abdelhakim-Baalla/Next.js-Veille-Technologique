import ContactForm from './contact-form'

async function getContactInfo() {
  // Simuler un fetch de données
  await new Promise((resolve) => setTimeout(resolve, 500))
  return {
    title: 'Contactez-nous',
    description: 'Utilisez ce formulaire pour nous envoyer un message',
  }
}

export default async function ContactPage() {
  const info = await getContactInfo()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-light mb-4">{info.title}</h1>
        <p className="text-foreground/60 text-lg">{info.description}</p>
      </div>

      <div className="glass p-8 rounded-lg border border-border max-w-2xl">
        <h2 className="text-2xl font-medium mb-6">Server Action Demo</h2>
        <p className="text-foreground/60 mb-6">
          Ce formulaire utilise une Server Action avec revalidation du cache
        </p>
        <ContactForm />
      </div>
    </div>
  )
}
