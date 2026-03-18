import { Upload, Search } from "lucide-react"

export default function AdminMediaPage() {
  // Mock grid for skeleton demonstration
  const mockImages = Array.from({ length: 14 }).map((_, i) => `https://picsum.photos/seed/${100 + i}/400/400`)

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-xl font-medium leading-6 text-gray-900 dark:text-gray-100">Media Library</h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            A centralized place to manage all product images, banners, and brand assets.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button className="flex items-center justify-center rounded-md bg-black dark:bg-white px-3 py-2 text-sm font-semibold text-white dark:text-black shadow-sm hover:bg-zinc-800">
            <Upload className="-ml-0.5 mr-1.5 h-4 w-4" />
            Upload Assets
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex bg-white dark:bg-zinc-900 p-2 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm shrink-0">
        <div className="relative flex-grow">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 dark:text-white dark:bg-zinc-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-zinc-700 sm:text-sm sm:leading-6"
            placeholder="Search by filename..."
          />
        </div>
      </div>

      {/* Grid container taking remaining height */}
      <div className="flex-1 overflow-y-auto min-h-0 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
           {mockImages.map((url, idx) => (
             <div key={idx} className="group relative aspect-square rounded-lg border border-gray-200 dark:border-zinc-800 overflow-hidden bg-gray-50 dark:bg-zinc-950 hover:ring-2 hover:ring-black dark:hover:ring-white transition-all cursor-pointer">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                 <img src={url} alt="Media Asset" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                 <div className="absolute inset-x-0 bottom-0 bg-black/60 px-2 py-1 text-xs text-white truncate opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                   IMG_{1045 + idx}.jpg
                 </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  )
}
