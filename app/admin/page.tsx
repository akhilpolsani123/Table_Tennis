import { TipsManagement } from "@/components/admin/tips-management"
import { AdminStats } from "@/components/admin/admin-stats"

export default function AdminDashboard() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <AdminStats />

      <div className="mt-6">
        <TipsManagement />
      </div>
    </div>
  )
}

