"use client"

import { useState } from "react"
import { updateProfile } from "@/actions/user.profile.actions"
import { toast } from "sonner"

export function ProfileForm({ user }: { user: { name: string | null, email: string | null } }) {
  const [isPending, setIsPending] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)
    const formData = new FormData(e.currentTarget)
    
    // Validate password match
    const newPass = formData.get("newPassword") as string
    const confirmPass = formData.get("confirmPassword") as string
    if (newPass && newPass !== confirmPass) {
      toast.error("New passwords do not match.")
      setIsPending(false)
      return
    }

    const res = await updateProfile(formData)
    if (res.error) toast.error(res.error)
    else {
      toast.success(res.success)
      const form = e.target as HTMLFormElement
      // Reset only the password fields
      const cp = form.elements.namedItem("currentPassword") as HTMLInputElement
      const np = form.elements.namedItem("newPassword") as HTMLInputElement
      const cnp = form.elements.namedItem("confirmPassword") as HTMLInputElement
      if (cp) cp.value = ""
      if (np) np.value = ""
      if (cnp) cnp.value = ""
    }
    setIsPending(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-12 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* General Settings */}
      <section>
        <div className="mb-6">
          <h3 className="text-sm font-body font-semibold text-[#1A1918] uppercase tracking-[0.1em]">Personal Information</h3>
          <p className="mt-1 text-xs text-[#9C9690] font-body">
             Manage your public profile and registered email.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="name" className="text-[10px] font-body font-medium uppercase tracking-[0.1em] text-[#9C9690]">Full Name</label>
            <input
              type="text" name="name" id="name" required
              defaultValue={user.name || ""}
              className="luxury-input-field"
            />
          </div>
 
          <div className="space-y-2">
            <label htmlFor="email" className="text-[10px] font-body font-medium uppercase tracking-[0.1em] text-[#9C9690]">Email Address</label>
            <input
              type="email" name="email" id="email" required
              defaultValue={user.email || ""}
              className="luxury-input-field"
            />
          </div>
        </div>
      </section>
 
      {/* Security */}
      <section className="pt-8 border-t border-[#E8E0D5]">
        <div className="mb-6">
          <h3 className="text-sm font-body font-semibold text-[#1A1918] uppercase tracking-[0.1em]">Security & Password</h3>
          <p className="mt-1 text-xs text-[#9C9690] font-body">
             Leave password fields blank if you don't wish to change them.
          </p>
        </div>
 
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2 max-w-md">
            <label htmlFor="currentPassword" className="text-[10px] font-body font-medium uppercase tracking-[0.1em] text-[#9C9690]">Current Password</label>
            <input
              type="password" name="currentPassword" id="currentPassword"
              placeholder="••••••••"
              className="luxury-input-field"
            />
          </div>
 
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="newPassword" className="text-[10px] font-body font-medium uppercase tracking-[0.1em] text-[#9C9690]">New Password</label>
              <input
                type="password" name="newPassword" id="newPassword"
                className="luxury-input-field"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-[10px] font-body font-medium uppercase tracking-[0.1em] text-[#9C9690]">Confirm New Password</label>
              <input
                type="password" name="confirmPassword" id="confirmPassword"
                className="luxury-input-field"
              />
            </div>
          </div>
        </div>
      </section>
 
      <div className="flex justify-end pt-8 border-t border-[#E8E0D5]">
        <button
          type="submit"
          disabled={isPending}
          className="bg-[#1A1918] text-white px-12 py-4 text-[11px] font-body tracking-[0.2em] uppercase rounded-full shadow-xl shadow-black/10 hover:bg-[#B8935A] transition-all duration-500 disabled:opacity-50"
        >
          {isPending ? "Updating..." : "Save Changes"}
        </button>
      </div>
    </form>
  )
}
