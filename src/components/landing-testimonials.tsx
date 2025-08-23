
"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "Sarah J.",
    title: "Aspiring Investor",
    quote: "StockPilot gave me the confidence to start investing in the real market. The realistic simulation is fantastic!",
    avatar: "https://placehold.co/100x100.png",
    initials: "SJ"
  },
  {
    name: "Mike T.",
    title: "Finance Student",
    quote: "An essential tool for any finance student. It makes learning about the market interactive and fun.",
    avatar: "https://placehold.co/100x100.png",
    initials: "MT"
  },
  {
    name: "Priya K.",
    title: "Hobbyist Trader",
    quote: "I've tried a few virtual trading apps, and StockPilot is by far the most user-friendly and beautifully designed.",
    avatar: "https://placehold.co/100x100.png",
    initials: "PK"
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
}

export function LandingTestimonials() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
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
        <motion.div
          className="grid gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.name} variants={itemVariants}>
              <Card className="h-full">
                <CardContent className="pt-6">
                  <blockquote className="space-y-4">
                    <p className="italic text-foreground/90">
                      “{testimonial.quote}”
                    </p>
                    <footer className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint="person" />
                        <AvatarFallback>{testimonial.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.title}
                        </p>
                      </div>
                    </footer>
                  </blockquote>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
