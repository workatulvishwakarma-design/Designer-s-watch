"use server"

import { signIn } from "@/lib/auth"
import { AuthError } from "next-auth"

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const callbackUrl = (formData.get("callbackUrl") as string) || "/account/profile"
    const email = ((formData.get("email") as string) || "").trim().toLowerCase()
    const password = (formData.get("password") as string) || ""

    await signIn("credentials", { email, password, redirectTo: callbackUrl })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials."
        default:
          return "Something went wrong."
      }
    }
    throw error
  }
}
