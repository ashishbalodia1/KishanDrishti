"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import MobileView from "@/components/mobile/mobile-view"
import WebView from "@/components/web/web-view"
import EntryModal from "@/components/entry-modal"

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showEntry, setShowEntry] = useState(true)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (!mounted) return null

  const handleSelect = (role: "user" | "admin" | "developer") => {
    if (role === "user") {
      setShowEntry(false)
      return
    }

    if (role === "admin") {
      router.push("/admin")
      return
    }

    if (role === "developer") {
      router.push("/developer")
      return
    }
  }

  return (
    <>
      {showEntry && <EntryModal onSelect={handleSelect} />}
      {!showEntry && (isMobile ? <MobileView /> : <WebView />)}
    </>
  )
}
