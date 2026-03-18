import { prisma } from "@/lib/db"
import { Badge } from "@/components/admin/Badge"
import { Layout, Edit3, Eye, ToggleLeft as Toggle } from "lucide-react"

export default async function AdminContentPage() {
  const blocks = await prisma.contentBlock.findMany({
    orderBy: { sectionId: "asc" }
  })

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white uppercase">Experience hall</h2>
        <p className="text-xs text-gray-500 mt-1">Directly control the visual narratives and structural sections of the boutique.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blocks.map((block) => (
          <div key={block.id} className="group bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
            {/* Visual Decoration */}
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <Layout className="w-12 h-12" />
            </div>

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <Badge variant="neutral" className="font-mono text-[9px] px-2 py-0.5 uppercase tracking-wider">
                  {block.sectionId}
                </Badge>
                <div className={`h-2 w-2 rounded-full ${block.isActive ? "bg-green-500" : "bg-gray-300"} animate-pulse`} />
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest truncate">
                  {block.title || "Untitled Section"}
                </h3>
                <p className="text-[10px] text-gray-500 uppercase mt-1">Secondary: {block.subtitle || "None"}</p>
              </div>

              {block.mediaUrl && (
                <div className="h-32 rounded-2xl overflow-hidden bg-gray-50 dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800">
                  <img src={block.mediaUrl} alt={block.title || ""} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
              )}

              <div className="pt-4 border-t border-gray-50 dark:border-zinc-800 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 hover:text-black dark:hover:text-white transition-all">
                       <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 hover:text-black dark:hover:text-white transition-all">
                       <Toggle className="w-4 h-4" />
                    </button>
                 </div>
                 <button className="flex items-center gap-2 px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg hover:opacity-90 transition-all">
                    <Edit3 className="w-3.5 h-3.5" /> Curate Section
                 </button>
              </div>
            </div>
          </div>
        ))}

        {/* Create Placeholder */}
        <button className="group border-2 border-dashed border-gray-200 dark:border-zinc-800 rounded-3xl p-8 hover:border-black dark:hover:border-white transition-all flex flex-col items-center justify-center gap-3 min-h-[300px]">
           <div className="w-12 h-12 rounded-full bg-gray-50 dark:bg-zinc-900 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Edit3 className="w-5 h-5 text-gray-400 group-hover:text-black dark:group-hover:text-white" />
           </div>
           <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-black dark:group-hover:text-white">Register New Content Block</p>
        </button>
      </div>
    </div>
  )
}
