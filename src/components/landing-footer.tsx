
"use client"

import { Rocket } from "lucide-react"

export function LandingFooter() {
  return (
    <footer className="border-t">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row md:px-6">
        <div className="flex items-center gap-2">
          <Rocket className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold">StockPilot</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © 2025 StockPilot. All rights reserved.
        </p>
        <div className="text-sm text-muted-foreground">
          Made with ❤️ for traders.
        </div>
      </div>
    </footer>
  )
}
