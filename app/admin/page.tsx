"use client"

import { useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import WebDashboard from "@/components/web/web-dashboard"
import { Button } from "@/components/ui/button"

export default function AdminPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      window.location.href = "/auth?role=admin"
    },
  })
  const router = useRouter()

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-pulse">⏳</div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Department Management & Analytics</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {session.user?.name || session.user?.email}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
      <WebDashboard />
    </div>
  )
}
