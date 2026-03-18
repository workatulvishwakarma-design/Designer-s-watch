"use client"

import { useActionState } from "react"
import { authenticate } from "@/actions/auth.actions"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function LoginFormInner() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/account/profile"
  const registered = searchParams.get("registered")

  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  )

  return (
    <div className="bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-2xl p-8 shadow-sm">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-light tracking-tight text-gray-900 dark:text-gray-100 uppercase">
          Designer&apos;s Watch
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Sign in to your account
        </p>
      </div>

      {registered && (
        <div className="mb-6 rounded-lg bg-green-50 dark:bg-green-900/20 p-3 text-sm text-green-700 dark:text-green-400 text-center border border-green-200 dark:border-green-800">
          Account created successfully. Please sign in.
        </div>
      )}

      <form action={formAction} className="space-y-6">
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full appearance-none rounded-md border border-gray-300 dark:border-zinc-700 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm dark:bg-zinc-800 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="block w-full appearance-none rounded-md border border-gray-300 dark:border-zinc-700 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm dark:bg-zinc-800 dark:text-white"
            />
          </div>
        </div>

        {errorMessage && (
          <div className="text-red-500 text-sm font-medium">{errorMessage}</div>
        )}

        <div>
          <button
            type="submit"
            aria-disabled={isPending}
            disabled={isPending}
            className="flex w-full justify-center rounded-md border border-transparent bg-black dark:bg-white py-2 px-4 text-sm font-medium text-white dark:text-black shadow-sm hover:bg-zinc-800 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50"
          >
            {isPending ? "Signing in..." : "Sign in"}
          </button>
        </div>
      </form>
      
      <div className="mt-6 text-center text-sm">
        <span className="text-gray-500">Don&apos;t have an account? </span>
        <Link href={`/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="font-medium text-black dark:text-white hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  )
}

export default function LoginForm() {
  return (
    <Suspense fallback={<div className="animate-pulse bg-gray-200 dark:bg-zinc-800 rounded-2xl h-96" />}>
      <LoginFormInner />
    </Suspense>
  )
}
