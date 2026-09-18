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
    <div className="bg-white border border-slate-200/90 rounded-2xl p-8 shadow-sm">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 uppercase">
          Designer&apos;s Watch
        </h2>
        <p className="mt-2 text-sm text-slate-600 font-medium">
          Sign in to your account
        </p>
      </div>

      {registered && (
        <div className="mb-6 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800 text-center border border-emerald-200 font-medium">
          Account created successfully. Please sign in.
        </div>
      )}

      <form action={formAction} className="space-y-6">
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
            Email address
          </label>
          <div className="mt-1.5">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full appearance-none rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 placeholder-slate-400 shadow-xs focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 sm:text-sm font-medium transition-all"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
            Password
          </label>
          <div className="mt-1.5">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="block w-full appearance-none rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 placeholder-slate-400 shadow-xs focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 sm:text-sm font-medium transition-all"
            />
          </div>
        </div>

        {errorMessage && (
          <div className="text-rose-600 text-sm font-semibold bg-rose-50 border border-rose-200 rounded-lg p-3">{errorMessage}</div>
        )}

        <div>
          <button
            type="submit"
            aria-disabled={isPending}
            disabled={isPending}
            className="flex w-full justify-center rounded-lg bg-slate-950 py-2.5 px-4 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:opacity-50 transition-colors"
          >
            {isPending ? "Signing in..." : "Sign in"}
          </button>
        </div>
      </form>
      
      <div className="mt-6 text-center text-sm">
        <span className="text-slate-500 font-medium">Don&apos;t have an account? </span>
        <Link href={`/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="font-semibold text-slate-900 hover:underline">
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
