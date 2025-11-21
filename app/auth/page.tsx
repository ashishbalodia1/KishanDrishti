"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import LoginForm from "@/components/auth/login-form"
import SignupForm from "@/components/auth/signup-form"

function AuthContent() {
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

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    }>
      <AuthContent />
    </Suspense>
  )
}

export const dynamic = 'force-dynamic'
