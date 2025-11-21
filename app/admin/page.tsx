import WebDashboard from "@/components/web/web-dashboard"

export const metadata = {
  title: "Admin Dashboard — Kishan Drishti",
  description: "Department administrative panel for Kishan Drishti",
}

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="px-8 py-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">Department Management & Analytics</p>
        </div>
      </div>
      <WebDashboard />
    </div>
  )
}
