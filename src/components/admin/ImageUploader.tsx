"use client"

import { useState } from "react"
import { Image as ImageIcon, UploadCloud, X } from "lucide-react"

interface ImageUploaderProps {
  images?: string[]
  maxImages?: number
  onImagesChange?: (urls: string[]) => void
}

export function ImageUploader({ images = [], maxImages = 5, onImagesChange }: ImageUploaderProps) {
  const [currentList, setCurrentList] = useState<string[]>(images)

  // Demo behavior to mimic upload
  const handleSimulateUpload = () => {
    if (currentList.length >= maxImages) return
    const mockUrl = `https://picsum.photos/seed/${Math.random()}/400/400`
    const newList = [...currentList, mockUrl]
    setCurrentList(newList)
    onImagesChange?.(newList)
  }

  const handleRemove = (index: number) => {
    const newList = currentList.filter((_, i) => i !== index)
    setCurrentList(newList)
    onImagesChange?.(newList)
  }

  return (
    <div className="space-y-4">
      {/* Upload Dropzone */}
      <div 
        onClick={handleSimulateUpload}
        className={`flex justify-center rounded-lg border border-dashed px-6 py-10 transition-colors cursor-pointer ${
          currentList.length >= maxImages
            ? "border-gray-200 bg-gray-50 dark:border-zinc-800 dark:bg-zinc-900/50 opacity-50 cursor-not-allowed"
            : "border-gray-300 dark:border-zinc-700 hover:border-black dark:hover:border-white hover:bg-gray-50 dark:hover:bg-zinc-900"
        }`}
      >
        <div className="text-center">
          <UploadCloud className="mx-auto h-12 w-12 text-gray-300 dark:text-zinc-600" aria-hidden="true" />
          <div className="mt-4 flex text-sm leading-6 text-gray-600 dark:text-gray-400">
            <span className="relative cursor-pointer rounded-md bg-transparent font-semibold text-black dark:text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2 hover:underline">
              <span>Upload a file</span>
            </span>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs leading-5 text-gray-500 dark:text-zinc-500">
            PNG, JPG, WEBP up to 5MB (Max {maxImages} images)
          </p>
        </div>
      </div>

      {/* Image Previews */}
      {currentList.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {currentList.map((url, i) => (
            <div key={i} className="group relative aspect-square rounded-lg border border-gray-200 dark:border-zinc-800 overflow-hidden bg-gray-50 dark:bg-zinc-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="Preview" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => handleRemove(i)}
                className="absolute right-1 top-1 rounded-full bg-white/80 p-1 text-gray-900 shadow-sm backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white dark:bg-zinc-900/80 dark:text-white dark:hover:bg-zinc-900"
              >
                <X className="h-4 w-4" />
              </button>
              {i === 0 && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1 text-center text-xs font-medium text-white backdrop-blur-sm">
                  Main Image
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
