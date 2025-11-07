import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-primary py-20 md:py-28">
      {/* Background radial gradient */}
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
            Sign up now and start your journey to becoming a stock market pro.
            No risks, all rewards. Your portfolio is waiting.
          </p>

          {/* Button */}
          <div className="mt-8">
            <motion.a
              href="/register"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-[hsl(var(--color-primary))] font-semibold shadow-lg hover:bg-white/90 transition-all"
            >
            <span className="text-[hsl(195,100%,55%)]">Start Trading for Free</span>
            <ArrowRight className="ml-2 text-[hsl(195,100%,55%)]" />
            </motion.a>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
