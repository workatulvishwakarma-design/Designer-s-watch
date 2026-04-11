"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import { OrderStatus } from "@prisma/client"
import { notifyOrderShipped, notifyOrderDelivered } from "@/lib/notifications"

export async function updateOrderStatus(orderId: string, newStatus: OrderStatus, internalNotes?: string) {
  const session = await auth()
  if (!session || (session.user as any)?.role !== "ADMIN") return { error: "Unauthorized" }

  try {
    const updated = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: newStatus,
        ...(internalNotes !== undefined && { internalNotes }),
      },
    })
    
    // Auto-append tracking event on massive state shift
    await prisma.orderTrackingEvent.create({
      data: {
        orderId,
        status: newStatus,
        description: `Order status changed to ${newStatus}`,
      }
    })

    revalidatePath("/admin/orders")
    revalidatePath(`/admin/orders/${orderId}`)
    revalidatePath("/admin/dashboard")
    revalidatePath("/admin/analytics")

    // Trigger SMS notifications for key status changes
    if (newStatus === "SHIPPED") {
      notifyOrderShipped(orderId).catch(e => console.error("[SMS] Ship notify error:", e))
    } else if (newStatus === "DELIVERED") {
      notifyOrderDelivered(orderId).catch(e => console.error("[SMS] Deliver notify error:", e))
    }

    return { success: "Order status updated successfully." }
  } catch (error) {
    return { error: "Failed to update order status." }
  }
}

const trackingSchema = z.object({
  status: z.nativeEnum(OrderStatus),
  description: z.string().optional().nullable(),
})

export async function appendTrackingEvent(orderId: string, formData: FormData) {
  const session = await auth()
  if (!session || (session.user as any)?.role !== "ADMIN") return { error: "Unauthorized" }

  const parsed = trackingSchema.safeParse({
    status: formData.get("status"),
    description: formData.get("description"),
  })

  if (!parsed.success) return { error: parsed.error.issues[0].message }

  try {
    await prisma.orderTrackingEvent.create({
      data: {
        orderId,
        ...parsed.data,
      }
    })
    revalidatePath(`/admin/orders/${orderId}`)
    return { success: "Tracking event added." }
  } catch (e) {
    return { error: "Database error appending event." }
  }
}
