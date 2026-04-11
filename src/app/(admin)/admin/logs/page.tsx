import { prisma } from "@/lib/db"
import { LogsClient } from "./LogsClient"

export default async function AdminLogsPage() {
  const logs = await prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 200
  })

  const mappedLogs = logs.map(log => ({
    id: log.id,
    adminName: log.adminName || "System",
    action: log.action,
    entityType: log.entityType,
    entityId: log.entityId,
    details: log.details,
    createdAt: log.createdAt.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    time: log.createdAt.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
  }))

  return <LogsClient logs={mappedLogs} />
}
