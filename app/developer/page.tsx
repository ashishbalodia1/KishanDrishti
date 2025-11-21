"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function DeveloperPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push("/auth?role=developer")
      return
    }

    if (session.user.role !== "developer") {
      router.push("/")
    }
  }, [session, status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session || session.user.role !== "developer") {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Developer Portal</h1>
            <p className="text-sm text-muted-foreground">API Documentation & Future Goals</p>
          </div>
          <div className="text-sm text-muted-foreground">
            Welcome, {session.user.name || session.user.email}
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Future Goals Section */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🚀</span>
              <h2 className="text-xl font-bold">Future Development Goals</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-primary text-lg">•</span>
                <div>
                  <h4 className="font-semibold">Public API Development</h4>
                  <p className="text-sm text-muted-foreground">RESTful APIs for sensor data ingestion, crop analytics, and weather integration</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary text-lg">•</span>
                <div>
                  <h4 className="font-semibold">SDK & Documentation</h4>
                  <p className="text-sm text-muted-foreground">Language-specific SDKs (Python, JavaScript) with comprehensive documentation</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary text-lg">•</span>
                <div>
                  <h4 className="font-semibold">Plugin Architecture</h4>
                  <p className="text-sm text-muted-foreground">Extensible system for custom analytics models and third-party integrations</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary text-lg">•</span>
                <div>
                  <h4 className="font-semibold">Machine Learning Models</h4>
                  <p className="text-sm text-muted-foreground">Open-source ML models for crop disease detection and yield prediction</p>
                </div>
              </div>
            </div>
          </div>

          {/* Roadmap Timeline */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">📅</span>
              <h2 className="text-xl font-bold">Development Roadmap</h2>
            </div>
            <div className="space-y-4">
              <div className="border-l-2 border-primary pl-4">
                <h4 className="font-semibold">Q1 2026 - API Foundation</h4>
                <p className="text-sm text-muted-foreground">Core API endpoints, authentication, and rate limiting</p>
              </div>
              <div className="border-l-2 border-secondary pl-4">
                <h4 className="font-semibold">Q2 2026 - Developer Tools</h4>
                <p className="text-sm text-muted-foreground">SDKs, CLI tools, and interactive API documentation</p>
              </div>
              <div className="border-l-2 border-accent pl-4">
                <h4 className="font-semibold">Q3 2026 - ML Platform</h4>
                <p className="text-sm text-muted-foreground">Model marketplace and training infrastructure</p>
              </div>
            </div>
          </div>

          {/* Developer Resources */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🛠️</span>
              <h2 className="text-xl font-bold">Developer Resources</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">📖 Documentation</h4>
                <p className="text-sm text-muted-foreground">Coming soon: API reference, guides, and tutorials</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">🔐 API Keys</h4>
                <p className="text-sm text-muted-foreground">Developer authentication and access management</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">📊 Status Dashboard</h4>
                <p className="text-sm text-muted-foreground">Real-time API status and performance metrics</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">💬 Community</h4>
                <p className="text-sm text-muted-foreground">Developer forums and support channels</p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-br from-primary/10 to-transparent border border-border rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Interested in Contributing?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              We're building the future of agricultural technology. Join us in making farming smarter and more sustainable.
            </p>
            <div className="flex gap-3 justify-center">
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition">
                Join Waitlist
              </button>
              <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition">
                GitHub Repository
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
