import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { ProfileForm } from "@/components/user/ProfileForm"
import { redirect } from "next/navigation"

export default async function ProfilePage() {
  const session = await auth()
  if (!session || !session.user?.id) return redirect("/login")

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true }
  })

  if (!user) return redirect("/login")

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:tracking-tight">
          Profile Settings
        </h2>
      </div>

      <ProfileForm user={user} />
    </div>
  )
}
