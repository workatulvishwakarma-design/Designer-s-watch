import { prisma } from "@/lib/db"
import { MessagesClient } from "./MessagesClient"

export default async function AdminMessagesPage() {
  const inquiries = await prisma.contactQuery.findMany({
    orderBy: { createdAt: "desc" }
  })

  const mappedData = inquiries.map(i => ({
    id: i.id,
    name: i.name,
    email: i.email,
    phone: i.phone,
    subject: i.subject,
    message: i.message,
    status: i.status,
    internalNote: i.internalNote,
    createdAt: i.createdAt.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    time: i.createdAt.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
  }))

  return <MessagesClient inquiries={mappedData} />
}
