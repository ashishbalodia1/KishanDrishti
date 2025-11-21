"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

type Props = {
  onSelectUser: () => void
}

export default function EntryModal({ onSelectUser }: Props) {
  const router = useRouter()

  const handleSelect = (role: "user" | "admin" | "developer") => {
    if (role === "user") {
      onSelectUser()
    } else {
      router.push(`/auth?role=${role}`)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg p-8 w-[92%] max-w-3xl text-center shadow-lg">
        <h1 className="text-3xl font-bold mb-3">Welcome to Kishan Drishti</h1>
        <p className="text-muted-foreground mb-8">Choose your entry point to get started</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* User/Public Option */}
          <div className="flex flex-col items-center gap-4 p-6 bg-gradient-to-br from-primary/10 to-transparent border border-border rounded-lg hover:shadow-md transition-all">
            <div className="text-5xl mb-2">👥</div>
            <h3 className="text-lg font-semibold">Public User</h3>
            <p className="text-sm text-muted-foreground text-center">
              Access community feed, farming insights, and public resources
            </p>
            <Button 
              className="mt-auto w-full" 
              onClick={() => handleSelect("user")}
            >
              Enter as User
            </Button>
          </div>

          {/* Admin/Department Option */}
          <div className="flex flex-col items-center gap-4 p-6 bg-gradient-to-br from-secondary/20 to-transparent border border-border rounded-lg hover:shadow-md transition-all">
            <div className="text-5xl mb-2">🏛️</div>
            <h3 className="text-lg font-semibold">Admin Panel</h3>
            <p className="text-sm text-muted-foreground text-center">
              Department dashboard, analytics, and administrative tools
            </p>
            <Button 
              variant="secondary" 
              className="mt-auto w-full" 
              onClick={() => handleSelect("admin")}
            >
              Enter as Admin
            </Button>
          </div>

          {/* Developer Option */}
          <div className="flex flex-col items-center gap-4 p-6 bg-gradient-to-br from-accent/20 to-transparent border border-border rounded-lg hover:shadow-md transition-all">
            <div className="text-5xl mb-2">🛠️</div>
            <h3 className="text-lg font-semibold">Developer</h3>
            <p className="text-sm text-muted-foreground text-center">
              API documentation, roadmap, and future development goals
            </p>
            <Button 
              variant="outline" 
              className="mt-auto w-full" 
              onClick={() => handleSelect("developer")}
            >
              Enter as Developer
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
