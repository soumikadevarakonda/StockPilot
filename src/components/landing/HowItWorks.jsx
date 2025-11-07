import React from "react";
import { motion } from "framer-motion";
import { UserPlus, IndianRupee, AreaChart } from "lucide-react";

const steps = [
  {
    icon: <UserPlus className="h-8 w-8" />,
    title: "Create an Account",
    description:
      "Sign up in seconds and start your trading journey with a virtual portfolio.",
  },
  {
    icon: <IndianRupee className="h-8 w-8" />,
    title: "Get Virtual Cash",
    description:
      "We'll fund your account with virtual money so you can start trading immediately.",
  },
  {
    icon: <AreaChart className="h-8 w-8" />,
    title: "Start Trading",
    description:
      "Buy and sell stocks with real-time data and see how your strategies perform.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function HowItWorks() {
  return (
    <section className="relative py-16 md:py-24 bg-[hsl(220,10%,10%)]">
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
            Get Started in 3 Easy Steps
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start your journey to becoming a trading pro today.
          </p>
        </motion.div>

        {/* Steps grid */}
        <motion.div
          className="grid gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center text-center"
              variants={itemVariants}
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                {step.icon}
              </div>
              <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
