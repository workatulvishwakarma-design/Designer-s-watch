import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"

export async function createAuditLog(action: string, entityType: string, entityId: string, details?: string) {
  try {
    const session = await auth()
    const adminName = session?.user?.name || session?.user?.email || "Unknown Admin"

    await prisma.auditLog.create({
      data: {
        adminName,
        action,
        entityType,
        entityId,
        details
      }
    })
  } catch (error) {
    console.error("Audit Log Error:", error)
  }
}
