"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import LoginForm from "@/components/auth/login-form"
import SignupForm from "@/components/auth/signup-form"

export default function AuthPage() {
  const searchParams = useSearchParams()
  const role = (searchParams.get("role") as "user" | "admin" | "developer") || "user"
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {authMode === "login" ? (
          <LoginForm role={role} onSwitchToSignup={() => setAuthMode("signup")} />
        ) : (
          <SignupForm role={role} onSwitchToLogin={() => setAuthMode("login")} />
        )}

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition"
          >
            ← Back to home
          </a>
        </div>
      </div>
    </div>
  )
}
