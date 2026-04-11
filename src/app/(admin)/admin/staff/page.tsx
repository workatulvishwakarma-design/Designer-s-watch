import { prisma } from "@/lib/db"
import { StaffClient } from "./StaffClient"

export default async function AdminStaffPage() {
  const adminUsers = await prisma.user.findMany({
    where: { role: "ADMIN" },
    orderBy: { createdAt: "desc" },
  })

  const staff = adminUsers.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    createdAt: u.createdAt.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    orderCount: 0,
  }))

  const recentAudit = await prisma.auditLog.findMany({
    where: { entityType: "User", action: { startsWith: "STAFF" } },
    orderBy: { createdAt: "desc" },
    take: 10
  })

  const auditData = recentAudit.map(a => ({
    id: a.id,
    adminName: a.adminName,
    action: a.action,
    details: a.details,
    createdAt: a.createdAt.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
  }))

  return <StaffClient staff={staff} recentAudit={auditData} />
}
