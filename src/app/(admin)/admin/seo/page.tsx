import { prisma } from "@/lib/db"
import { Search, Globe } from "lucide-react"

export default async function AdminSeoPage() {
  const settings = await prisma.storeSettings.findUnique({
    where: { id: "singleton" }
  })

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white uppercase">SEO Manager</h2>
        <p className="text-xs text-gray-500 mt-1">Optimize your boutique's search engine presence and discoverability.</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-8 shadow-sm space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-black dark:bg-white rounded-lg">
            <Globe className="w-4 h-4 text-white dark:text-black" />
          </div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white">Current SEO Configuration</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Default Meta Title</p>
            <p className="text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-zinc-950 p-4 rounded-xl border border-gray-100 dark:border-zinc-800">
              {settings?.defaultSeoTitle || "Not configured"}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Default Meta Description</p>
            <p className="text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-zinc-950 p-4 rounded-xl border border-gray-100 dark:border-zinc-800">
              {settings?.defaultSeoDescription || "Not configured"}
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 dark:border-zinc-800">
          <p className="text-xs text-gray-500">
            <Search className="w-3.5 h-3.5 inline mr-1" />
            To update global SEO settings, visit the <a href="/admin/settings" className="text-black dark:text-white font-semibold underline">System Registry</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
