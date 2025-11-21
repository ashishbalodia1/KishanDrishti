"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import WebDashboard from "@/components/web/web-dashboard"

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || status === "loading") return

    if (!session) {
      router.push("/auth?role=admin")
      return
    }

    const userRole = (session.user as any)?.role
    if (userRole && userRole !== "admin") {
      router.push("/")
    }
  }, [session, status, router, mounted])

  if (!mounted || status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
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
          <div className="text-sm text-muted-foreground">
            Welcome, {session.user.name || session.user.email}
          </div>
        </div>
      </div>
      <WebDashboard />
    </div>
  )
}

export const dynamic = 'force-dynamic'
