import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah J.",
    title: "Aspiring Investor",
    quote:
      "StockPilot gave me the confidence to start investing in the real market. The realistic simulation is fantastic!",
    avatar: "https://placehold.co/100x100.png",
    initials: "SJ",
  },
  {
    name: "Mike T.",
    title: "Finance Student",
    quote:
      "An essential tool for any finance student. It makes learning about the market interactive and fun.",
    avatar: "https://placehold.co/100x100.png",
    initials: "MT",
  },
  {
    name: "Priya K.",
    title: "Hobbyist Trader",
    quote:
      "I've tried a few virtual trading apps, and StockPilot is by far the most user-friendly and beautifully designed.",
    avatar: "https://placehold.co/100x100.png",
    initials: "PK",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-[hsl(220,10%,10%)]">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            What Our Users Say
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of traders who are leveling up their skills.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <motion.div
          className="grid gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((t) => (
            <motion.div key={t.name} variants={itemVariants}>
              <div className="h-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900 transition-all duration-300 hover:shadow-lg">
                <blockquote className="space-y-4">
                  <p className="italic text-foreground/90">“{t.quote}”</p>
                  <footer className="flex items-center gap-4">
                    {/* Avatar substitute */}
                    <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gray-200">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="h-full w-full object-cover"
                      />
                      {!t.avatar && (
                        <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
                          {t.initials}
                        </span>
                      )}
                    </div>

                    {/* Name and title */}
                    <div>
                      <p className="font-semibold">{t.name}</p>
                      <p className="text-sm text-muted-foreground">{t.title}</p>
                    </div>
                  </footer>
                </blockquote>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
