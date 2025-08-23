
"use client"

import Link from "next/link"
import { Rocket } from "lucide-react"

export function LandingFooter() {
  return (
    <footer className="bg-muted">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row md:px-6">
        <div className="flex items-center gap-2">
          <Rocket className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold">StockPilot</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} StockPilot. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="#" className="text-sm hover:underline">
            Terms of Service
          </Link>
          <Link href="#" className="text-sm hover:underline">
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  )
}
