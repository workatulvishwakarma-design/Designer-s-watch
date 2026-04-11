import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!slug) return notFound()

  try {
    const page = await prisma.page.findUnique({
      where: { slug }
    })

    if (!page || !page.isActive) {
      return notFound()
    }

    return (
      <div className="bg-background min-h-screen pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <header className="mb-16 text-center">
             <h1 className="text-4xl md:text-5xl font-playfair font-light mb-6 text-primaryText uppercase tracking-widest">
               {page.title}
             </h1>
             <div className="w-24 h-[1px] bg-gold mx-auto" />
          </header>

          <article 
            className="prose prose-stone dark:prose-invert max-w-none font-body text-lightText leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>
      </div>
    )
  } catch (error) {
    console.error("Dynamic Page Error:", error)
    return notFound()
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = await prisma.page.findUnique({
    where: { slug }
  })

  if (!page) return {}

  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription,
  }
}
