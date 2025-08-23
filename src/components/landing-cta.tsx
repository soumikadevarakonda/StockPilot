
"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LandingCTA() {
  return (
    <section className="relative overflow-hidden bg-primary py-20 md:py-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(40%_128px_at_50%_100%,hsl(var(--primary)_/_0.3),transparent)]"></div>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
            Ready to Take Flight?
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Sign up now and start your journey to becoming a stock market pro. No risks, all rewards. Your portfolio is waiting.
          </p>
          <div className="mt-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" variant="secondary" asChild className="shadow-lg">
                <Link href="/login">
                  Start Trading for Free <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
