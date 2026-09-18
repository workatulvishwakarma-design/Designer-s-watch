export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="admin-shell flex min-h-screen items-center justify-center bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {children}
      </div>
    </div>
  )
}
