"use client"

import { Toaster as SonnerToaster } from "sonner"

export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      toastOptions={{
        className: "bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 text-gray-900 dark:text-gray-100 shadow-lg rounded-xl",
      }}
    />
  )
}
