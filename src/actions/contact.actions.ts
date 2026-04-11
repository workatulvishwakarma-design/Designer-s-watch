"use server"

import { prisma } from "@/lib/db"
import { z } from "zod"
import { revalidatePath } from "next/cache"

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional().nullable(),
  subject: z.string().optional().nullable(),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export async function submitContactQuery(formData: FormData) {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const { name, email, phone, subject, message } = parsed.data

  // Combine enquiry type into subject if present
  const enquiryType = formData.get("enquiryType") as string
  const finalSubject = subject 
    ? `${enquiryType ? `[${enquiryType}] ` : ''}${subject}`
    : enquiryType

  try {
    await prisma.contactQuery.create({
      data: {
        name,
        email,
        phone,
        subject: finalSubject,
        message,
        status: "PENDING",
      }
    })

    revalidatePath("/admin/messages")
    return { success: "Message sent successfully!" }
  } catch (error) {
    console.error("Contact form error:", error)
    return { error: "Failed to send message. Please try again later." }
  }
}
