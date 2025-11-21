"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Props = {
  role: "user" | "admin" | "developer"
  onSwitchToSignup: () => void
}

export default function LoginForm({ role, onSwitchToSignup }: Props) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const getRoleLabel = () => {
    if (role === "user") return "Farmer"
    if (role === "admin") return "Admin"
    return "Developer"
  }

  const getRedirectPath = () => {
    if (role === "user") return "/"
    if (role === "admin") return "/admin"
    return "/developer"
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid email or password")
        setLoading(false)
        return
      }

      // Redirect based on role
      router.push(getRedirectPath())
      router.refresh()
    } catch (err) {
      setError("Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  const getDemoCredentials = () => {
    if (role === "user") return { email: "farmer@demo.com", password: "demo123" }
    if (role === "admin") return { email: "admin@demo.com", password: "admin123" }
    return { email: "dev@demo.com", password: "dev123" }
  }

  const handleDemoLogin = () => {
    const demo = getDemoCredentials()
    setEmail(demo.email)
    setPassword(demo.password)
  }

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-card border border-border rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">
            {role === "user" ? "🌾" : role === "admin" ? "🏛️" : "🛠️"}
          </span>
        </div>
        <h2 className="text-2xl font-bold">Login as {getRoleLabel()}</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Enter your credentials to access your account
        </p>
      </div>

      {/* Demo credentials helper */}
      <div className="mb-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
        <p className="text-xs font-semibold text-primary mb-2">🎯 Demo Credentials:</p>
        <div className="space-y-1 text-xs text-muted-foreground">
          <p>Email: {getDemoCredentials().email}</p>
          <p>Password: {getDemoCredentials().password}</p>
        </div>
        <button
          type="button"
          onClick={handleDemoLogin}
          className="mt-2 text-xs text-primary hover:underline font-medium"
        >
          Use demo credentials
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            className="h-11"
          />
        </div>

        {error && (
          <div className="p-3 text-sm bg-destructive/10 text-destructive border border-destructive/20 rounded-md flex items-center gap-2">
            <span>❌</span>
            <span>{error}</span>
          </div>
        )}

        <Button type="submit" className="w-full h-11 text-base" disabled={loading}>
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin">⏳</span>
              Logging in...
            </span>
          ) : (
            "Login"
          )}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-muted-foreground">Don't have an account? </span>
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="text-primary hover:underline font-semibold"
        >
          Sign up
        </button>
      </div>
    </div>
  )
}
