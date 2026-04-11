"use client"

import { useState } from "react"
import { ShieldCheck, UserPlus, X, Eye, EyeOff } from "lucide-react"
import { createStaffUser } from "@/actions/admin.staff.actions"
import { toast } from "sonner"
import { Badge } from "@/components/admin/Badge"

interface StaffMember {
  id: string
  name: string | null
  email: string | null
  role: string
  createdAt: string
  orderCount: number
}

interface AuditEntry {
  id: string
  adminName: string
  action: string
  details: string | null
  createdAt: string
}

const PERMISSION_MATRIX = {
  "Super Administrator": ["Products", "Orders", "Customers", "Coupons", "Reviews", "Settings", "Staff", "Shipping", "Taxes", "Analytics", "Logs", "Content"],
  "Store Manager": ["Products", "Orders", "Customers", "Coupons", "Reviews", "Shipping"],
  "Content Editor": ["Products", "Content", "Reviews"],
  "Support Agent": ["Orders", "Customers", "Reviews"],
}

export function StaffClient({ staff, recentAudit }: { staff: StaffMember[]; recentAudit: AuditEntry[] }) {
  const [showInvite, setShowInvite] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPwd, setShowPwd] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const result = await createStaffUser(formData)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Staff member created successfully")
      setShowInvite(false)
    }
    setLoading(false)
  }

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white uppercase">Staff & Roles</h2>
          <p className="text-xs text-gray-500 mt-1">Manage team members, permissions, and access control.</p>
        </div>
        <button
          onClick={() => setShowInvite(true)}
          className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-5 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
        >
          <UserPlus className="w-4 h-4" /> Invite Staff
        </button>
      </div>

      {/* Invite Modal */}
      {showInvite && (
        <div className="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-950 rounded-2xl p-8 w-full max-w-md border border-gray-100 dark:border-zinc-800 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Invite Staff Member</h3>
              <button onClick={() => setShowInvite(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Full Name</label>
                <input name="name" required className="w-full rounded-xl border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 px-4 py-3 text-sm focus:ring-2 focus:ring-black transition-all" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Email Address</label>
                <input name="email" type="email" required className="w-full rounded-xl border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 px-4 py-3 text-sm focus:ring-2 focus:ring-black transition-all" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Password</label>
                <div className="relative">
                  <input name="password" type={showPwd ? "text" : "password"} required minLength={6} className="w-full rounded-xl border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 px-4 py-3 pr-12 text-sm focus:ring-2 focus:ring-black transition-all" />
                  <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded-xl text-xs font-bold uppercase tracking-widest disabled:opacity-50">
                {loading ? "Creating..." : "Create Staff Account"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Staff Members Table */}
      <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="px-8 py-5 border-b border-gray-100 dark:border-zinc-800">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-gray-400" /> Team Members ({staff.length})
          </h3>
        </div>
        <table className="min-w-full divide-y divide-gray-100 dark:divide-zinc-800">
          <thead className="bg-gray-50/50 dark:bg-zinc-950/50">
            <tr>
              <th className="px-8 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">Member</th>
              <th className="px-8 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">Role</th>
              <th className="px-8 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">Joined</th>
              <th className="px-8 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
            {staff.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black text-sm font-bold">
                      {(member.name || "?")[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{member.name || "Unnamed"}</p>
                      <p className="text-[11px] text-gray-500">{member.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
                    Super Administrator
                  </span>
                </td>
                <td className="px-8 py-5">
                  <span className="text-xs text-gray-500">{member.createdAt}</span>
                </td>
                <td className="px-8 py-5">
                  <Badge variant="success">Active</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Permissions Matrix */}
      <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-8 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-gray-400" /> Permissions Matrix
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100 dark:border-zinc-800">
                <th className="py-3 pr-6 text-left font-bold text-gray-400 uppercase tracking-widest text-[10px]">Role</th>
                {PERMISSION_MATRIX["Super Administrator"].map((perm) => (
                  <th key={perm} className="py-3 px-3 text-center font-bold text-gray-400 uppercase tracking-widest text-[9px]">{perm}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
              {Object.entries(PERMISSION_MATRIX).map(([role, perms]) => (
                <tr key={role} className="hover:bg-gray-50 dark:hover:bg-zinc-800/30 transition-colors">
                  <td className="py-3 pr-6 font-medium text-gray-900 dark:text-white whitespace-nowrap">{role}</td>
                  {PERMISSION_MATRIX["Super Administrator"].map((perm) => (
                    <td key={perm} className="py-3 px-3 text-center">
                      {perms.includes(perm) ? (
                        <span className="inline-block w-5 h-5 bg-green-100 dark:bg-green-900/20 text-green-600 rounded-full leading-5 text-[10px] font-bold">✓</span>
                      ) : (
                        <span className="inline-block w-5 h-5 bg-gray-50 dark:bg-zinc-800 text-gray-300 dark:text-zinc-600 rounded-full leading-5 text-[10px]">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Role Audit */}
      {recentAudit.length > 0 && (
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm">
          <div className="px-8 py-5 border-b border-gray-100 dark:border-zinc-800">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white">Recent Staff Changes</h3>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-zinc-800">
            {recentAudit.map((log) => (
              <div key={log.id} className="px-8 py-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-900 dark:text-white">{log.action}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">{log.details}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{log.createdAt}</p>
                  <p className="text-[10px] text-gray-400">{log.adminName}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
