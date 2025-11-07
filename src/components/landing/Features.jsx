import React from "react";
import { motion } from "framer-motion";
import { BarChart, Briefcase, DollarSign, Target } from "lucide-react";

const features = [
  {
    icon: <Briefcase />,
    title: "Realistic Trading",
    description:
      "Experience real-time market data and execute trades just like you would in the real world.",
  },
  {
    icon: <BarChart />,
    title: "Portfolio Tracking",
    description:
      "Monitor your investments, track your performance, and analyze your allocation with powerful charts.",
  },
  {
    icon: <Target />,
    title: "Learn and Grow",
    description:
      "Experiment with different strategies and learn the ins and outs of the stock market, risk-free.",
  },
  {
    icon: <DollarSign />,
    title: "Completely Free",
    description:
      "Get full access to all features without any cost. Start your trading journey today.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
    },
  }),
};

export default function Features() {
  return (
    <section className="py-16 md:py-24 bg-[hsl(220,10%,10%)]">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header text */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Why You'll Love StockPilot
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to become a confident investor.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <div className="h-full transform rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-xl dark:border-gray-700 dark:bg-gray-900">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
