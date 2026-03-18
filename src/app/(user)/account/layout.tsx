import { auth, signOut } from "@/lib/auth"
import { redirect } from "next/navigation"
import { AccountNav } from "@/components/user/AccountNav"

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }

  const handleSignOut = async () => {
    "use server"
    await signOut()
  }

  return (
    <div className="min-h-screen bg-background font-body pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <header className="mb-12">
            <h1 className="text-4xl font-display text-primaryText uppercase tracking-[0.2em] relative inline-block">
            My Account
            <div className="absolute -bottom-4 left-0 w-12 h-0.5 bg-[#B8935A]" />
            </h1>
        </header>
 
        <div className="flex flex-col lg:flex-row gap-12 mt-8">
          {/* Sidebar Navigation */}
          <AccountNav signOutAction={handleSignOut} />
 
          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            <div className="bg-white border border-[#E8E0D5] rounded-2xl p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.03)] min-h-[500px]">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
