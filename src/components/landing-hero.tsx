
"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export function LandingHero() {
  return (
    <section className="relative pt-24 md:pt-32">
       <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
       <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-3xl"></div>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Master the Market, Risk-Free
            </h1>
            <p className="text-lg text-muted-foreground">
              StockPilot is your ultimate virtual trading playground. Hone your
              investment strategies, compete with friends, and learn the ropes
              of the stock market without spending a dime.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/dashboard">
                  Get Started <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Image
              src="https://placehold.co/600x400.png"
              alt="StockPilot Dashboard"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl"
              data-ai-hint="investment portfolio app"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
