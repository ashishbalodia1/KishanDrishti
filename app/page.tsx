"use client"

import { useState, useEffect } from "react"
import MobileView from "@/components/mobile/mobile-view"
import WebView from "@/components/web/web-view"
import EntryModal from "@/components/entry-modal"

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showEntry, setShowEntry] = useState(true)

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

  const handleUserSelect = () => {
    setShowEntry(false)
  }

  return (
    <>
      {showEntry && <EntryModal onSelectUser={handleUserSelect} />}
      {!showEntry && (isMobile ? <MobileView /> : <WebView />)}
    </>
  )
}
