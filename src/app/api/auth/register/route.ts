import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"
import { z } from "zod"

const registerSchema = z.object({
  email: z.string().trim().email("Please provide a valid email address.").transform(v => v.toLowerCase()),
  password: z.string().min(6, "Password must be at least 6 characters long."),
  name: z.string().trim().min(1, "Please provide your full name."),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = registerSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid data provided." }, { status: 400 })
    }

    const { email, password, name } = parsed.data

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ error: "An account with this email already exists. Please sign in instead." }, { status: 400 })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    // Using CUSTOMER as default for standard signups
    const user = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
        role: "CUSTOMER", 
      },
    })

    return NextResponse.json({ user: { id: user.id, email: user.email } }, { status: 201 })
  } catch (error: any) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: error?.message || "Failed to create account. Please try again." }, { status: 500 })
  }
}
