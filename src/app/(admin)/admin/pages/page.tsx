import { prisma } from "@/lib/db"
import { Badge } from "@/components/admin/Badge"
import { FileText, Plus, Edit, Trash2, Globe } from "lucide-react"
import Link from "next/link"

export default async function AdminPagesPage() {
  const pages = await prisma.page.findMany({
    orderBy: { createdAt: "desc" }
  })

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white uppercase">Library of Leaves</h2>
          <p className="text-xs text-gray-500 mt-1">Manage static legal documents, boutique information, and service policies.</p>
        </div>
        <Link 
          href="/admin/pages/new"
          className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-xl hover:opacity-90 transition-all"
        >
          <Plus className="w-4 h-4" /> Add Page
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {pages.map((page) => (
          <div key={page.id} className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between hover:shadow-lg transition-all">
            <div className="flex items-center gap-6">
               <div className="p-4 bg-gray-50 dark:bg-zinc-800 rounded-2xl group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6 text-gray-400" />
               </div>
               <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest">{page.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                     <Globe className="w-3 h-3 text-gray-400" />
                     <p className="text-[10px] text-gray-500 lowercase">/{page.slug}</p>
                  </div>
               </div>
            </div>

            <div className="flex items-center gap-6 mt-6 md:mt-0">
               <div className="flex gap-2">
                  <Badge variant={page.isActive ? "success" : "neutral"}>
                    {page.isActive ? "Live" : "Draft"}
                  </Badge>
                  {page.seoTitle && <Badge variant="neutral" className="border-blue-100 text-blue-600 dark:text-blue-400">SEO+</Badge>}
               </div>
               <div className="h-8 w-[1px] bg-gray-100 dark:bg-zinc-800" />
               <div className="flex items-center gap-2">
                  <button className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 hover:text-black dark:hover:text-white transition-all">
                     <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-400 hover:text-red-600 transition-all">
                     <Trash2 className="w-4 h-4" />
                  </button>
               </div>
            </div>
          </div>
        ))}

        {pages.length === 0 && (
          <div className="py-20 text-center border-2 border-dashed border-gray-200 dark:border-zinc-800 rounded-3xl">
            <FileText className="w-10 h-10 text-gray-300 mx-auto mb-4" />
            <p className="text-sm font-medium text-gray-500">The library shelves are currently empty.</p>
          </div>
        )}
      </div>
    </div>
  )
}
