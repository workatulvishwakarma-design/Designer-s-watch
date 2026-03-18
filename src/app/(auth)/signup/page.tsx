"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

function SignupFormInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/account/profile"
  const [error, setError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsPending(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email")
    const password = formData.get("password")
    const name = formData.get("name")

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      })

      if (response.ok) {
        router.push(`/login?registered=true&callbackUrl=${encodeURIComponent(callbackUrl)}`)
      } else {
        const data = await response.json()
        setError(data.error || "Something went wrong.")
      }
    } catch (err) {
      setError("Failed to connect to the server.")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-2xl p-8 shadow-sm">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-light tracking-tight text-gray-900 dark:text-gray-100 uppercase">
          Create Account
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Join Designer&apos;s Watch
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Full Name
          </label>
          <div className="mt-1">
            <input id="name" name="name" type="text" autoComplete="name" required
              className="block w-full appearance-none rounded-md border border-gray-300 dark:border-zinc-700 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm dark:bg-zinc-800 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email address
          </label>
          <div className="mt-1">
            <input id="email" name="email" type="email" autoComplete="email" required
              className="block w-full appearance-none rounded-md border border-gray-300 dark:border-zinc-700 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm dark:bg-zinc-800 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <div className="mt-1">
            <input id="password" name="password" type="password" autoComplete="new-password" required minLength={6}
              className="block w-full appearance-none rounded-md border border-gray-300 dark:border-zinc-700 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm dark:bg-zinc-800 dark:text-white"
            />
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm font-medium">{error}</div>
        )}

        <div>
          <button type="submit" disabled={isPending}
            className="flex w-full justify-center rounded-md border border-transparent bg-black dark:bg-white py-2 px-4 text-sm font-medium text-white dark:text-black shadow-sm hover:bg-zinc-800 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50"
          >
            {isPending ? "Creating account..." : "Sign up"}
          </button>
        </div>
      </form>
      
      <div className="mt-6 text-center text-sm">
        <span className="text-gray-500">Already have an account? </span>
        <Link href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="font-medium text-black dark:text-white hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  )
}

export default function SignupForm() {
  return (
    <Suspense fallback={<div className="animate-pulse bg-gray-200 dark:bg-zinc-800 rounded-2xl h-96" />}>
      <SignupFormInner />
    </Suspense>
  )
}
