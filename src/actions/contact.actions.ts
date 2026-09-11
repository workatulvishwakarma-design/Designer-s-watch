"use server"

import { prisma } from "@/lib/db"
import { z } from "zod"
import { revalidatePath } from "next/cache"

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional().nullable(),
  subject: z.string().optional().nullable(),
  message: z.string().min(1, "Message is required"),
})

export async function submitContactQuery(formData: FormData) {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || null,
    subject: formData.get("subject") || null,
    message: formData.get("message"),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message || "Invalid form data" }
  }

  const { name, email, phone, subject, message } = parsed.data

  // Combine enquiry type into subject if present
  const enquiryType = formData.get("enquiryType") as string | null
  const finalSubject = subject 
    ? `${enquiryType ? `[${enquiryType}] ` : ''}${subject}`
    : enquiryType || "Website Inquiry"

  try {
    await prisma.contactQuery.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? String(phone).trim() : null,
        subject: finalSubject.trim(),
        message: message.trim(),
        status: "PENDING",
      }
    })

    try {
      revalidatePath("/admin/messages")
    } catch {
      // Revalidation error should not fail submission
    }

    return { success: "Message sent successfully!" }
  } catch (error: any) {
    console.error("Contact form error:", error)
    return { error: error?.message || "Failed to send message. Please try again later." }
  }
}

export async function subscribeNewsletter(email: string) {
  const emailSchema = z.string().email("Please enter a valid email address.")
  const parsed = emailSchema.safeParse(email)

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message || "Invalid email address" }
  }

  const cleanEmail = parsed.data.trim().toLowerCase()

  try {
    // Check if recently subscribed
    const existing = await prisma.contactQuery.findFirst({
      where: {
        email: cleanEmail,
        subject: { contains: "Newsletter" }
      }
    })

    if (existing) {
      return { success: "You are already subscribed to Stay in Time updates!" }
    }

    await prisma.contactQuery.create({
      data: {
        name: "Stay in Time Subscriber",
        email: cleanEmail,
        phone: null,
        subject: "Newsletter Subscription (Stay in Time)",
        message: "Customer subscribed to Stay in Time updates, new arrivals, limited editions and brand stories.",
        status: "PENDING",
      }
    })

    try {
      revalidatePath("/admin/messages")
    } catch {
      // safe
    }

    return { success: "Thank you for subscribing to Stay in Time!" }
  } catch (error: any) {
    console.error("Newsletter subscription error:", error)
    return { error: error?.message || "Unable to subscribe. Please try again." }
  }
}

