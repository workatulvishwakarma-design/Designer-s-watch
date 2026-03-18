import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { AddressBook } from "@/components/user/AddressBook"
import { redirect } from "next/navigation"

export default async function AddressesPage() {
  const session = await auth()
  if (!session || !session.user?.id) return redirect("/login")

  const addresses = await prisma.address.findMany({
    where: { userId: session.user.id },
    orderBy: [
      { isDefault: "desc" },
      { createdAt: "desc" }
    ]
  })

  return <AddressBook addresses={addresses} />
}
