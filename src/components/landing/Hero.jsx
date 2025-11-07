import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroImage from "../../assets/landing-page.jpg";

export default function Hero() {
  return (
    <section className="relative pt-20 md:pt-28 overflow-hidden">
      {/* solid base color behind everything */}
      <div className="absolute inset-0 -z-20 bg-[hsl(220,10%,10%)]" />

      {/* background grid pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      {/* blur glow */}
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-3xl" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-8 md:grid-cols-2">
          {/* Left content */}
          <motion.div
            className="space-y-6 text-[hsl(var(--foreground))]"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
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
              <a
                href="/login"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 font-medium hover:bg-primary/90 transition-all"
              >
                <span className="text-[hsl(var(--emphasis))]">Get Started</span>
                <ArrowRight className="ml-2 text-[hsl(var(--emphasis))]" />
              </a>
            </div>
          </motion.div>

          {/* Right content (Image) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <img
              src={heroImage}
              alt="StockPilot Dashboard"
              width="600"
              height="400"
              className="rounded-lg shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
