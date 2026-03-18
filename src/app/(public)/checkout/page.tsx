import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { redirect } from "next/navigation"
import { CheckoutForm } from "@/components/checkout/CheckoutForm"
import { ShieldCheck } from "lucide-react"

export default async function CheckoutPage() {
  const session = await auth()
  
  if (!session || !session.user?.id) {
    // We enforce login to checkout so we can track orders
    redirect("/login?callbackUrl=/checkout")
  }

  // Fetch user addresses for the selector
  const addresses = await prisma.address.findMany({
    where: { userId: session.user.id },
    orderBy: [
      { isDefault: "desc" },
      { createdAt: "desc" }
    ]
  })

  return (
    <div className="min-h-screen bg-[#FAF8F4] pt-32 pb-24">
       <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-display text-[#1A1918]">Secure Checkout</h1>
          <div className="flex items-center gap-2 mt-4 text-[#9C9690] font-body text-sm uppercase tracking-widest">
            <ShieldCheck size={16} className="text-[#B8935A]" />
            <span>Encrypted Connection</span>
          </div>
          <div className="w-12 h-0.5 bg-[#B8935A] mt-6" />
       </div>

       <CheckoutForm addresses={addresses} />
    </div>
  )
}
