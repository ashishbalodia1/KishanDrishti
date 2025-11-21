import type React from "react"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import AuthProvider from "@/components/auth/auth-provider"
import FloatingChatbot from "@/components/floating-chatbot"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata = {
  title: 'Kishan Drishti',
  description: 'Advanced Agricultural Technology Platform for Smart Farming',
  generator: 'v0.app'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <div className="min-h-screen bg-background text-foreground">
          <AuthProvider>
            <ThemeProvider>
              {children}
              <FloatingChatbot />
            </ThemeProvider>
          </AuthProvider>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
