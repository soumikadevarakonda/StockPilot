import React from "react";
import { Rocket } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[hsl(220,10%,10%)] border-t border-[hsl(217,32%,17%)]">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Rocket className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold text-[hsl(var(--foreground))]">
            StockPilot
          </span>
        </div>

        {/* Copyright */}
        <p className="text-sm text-muted-foreground">
          © 2025 StockPilot. All rights reserved.
        </p>

        {/* Tagline */}
        <div className="text-sm text-muted-foreground">
          Made with ❤️ for traders.
        </div>
      </div>
    </footer>
  );
}
