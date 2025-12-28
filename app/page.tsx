import { WebsiteBuilderForm } from "@/components/website-builder-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">Website Builder</h1>
          <p className="text-lg text-muted-foreground">
            Configure your website template, language, domain, and SEO settings
          </p>
        </div>
        <WebsiteBuilderForm />
      </div>
    </main>
  )
}
