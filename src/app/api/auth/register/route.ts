import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"
import { z } from "zod"

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = registerSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data provided." }, { status: 400 })
    }

    const { email, password, name } = parsed.data

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ error: "Email already in use." }, { status: 400 })
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
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Failed to create account." }, { status: 500 })
  }
}
