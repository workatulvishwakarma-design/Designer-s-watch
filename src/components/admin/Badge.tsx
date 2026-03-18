import React from "react"

type BadgeVariant = "success" | "warning" | "error" | "info" | "neutral"

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

export function Badge({ children, variant = "neutral", className = "" }: BadgeProps) {
  const baseClasses = "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset"
  
  const variants = {
    success: "bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20",
    warning: "bg-yellow-50 text-yellow-800 ring-yellow-600/20 dark:bg-yellow-500/10 dark:text-yellow-500 dark:ring-yellow-500/20",
    error: "bg-red-50 text-red-700 ring-red-600/10 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/20",
    info: "bg-blue-50 text-blue-700 ring-blue-700/10 dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-500/20",
    neutral: "bg-gray-50 text-gray-600 ring-gray-500/10 dark:bg-zinc-800 dark:text-gray-400 dark:ring-white/10"
  }

  return (
    <span className={`${baseClasses} ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
