import { ShieldCheck, Users } from "lucide-react"
import { Badge } from "@/components/admin/Badge"

export default function AdminStaffPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white uppercase">Staff & Roles</h2>
        <p className="text-xs text-gray-500 mt-1">Manage team members, permissions, and access control for the control center.</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-black dark:bg-white rounded-lg">
            <ShieldCheck className="w-4 h-4 text-white dark:text-black" />
          </div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white">Current Roles</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-950 rounded-2xl border border-gray-100 dark:border-zinc-800">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black text-sm font-bold">A</div>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">Super Administrator</p>
                <p className="text-[10px] text-gray-500">Full system access</p>
              </div>
            </div>
            <Badge variant="success">Active</Badge>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-16 text-center">
        <Users className="w-10 h-10 text-gray-300 mx-auto mb-4" />
        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-2">Team Management</h3>
        <p className="text-xs text-gray-500 max-w-md mx-auto">
          Multi-role staff management with granular permissions will be available in a future update.
        </p>
      </div>
    </div>
  )
}
