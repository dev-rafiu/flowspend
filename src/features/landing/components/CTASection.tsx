"use client";

import { motion, useInView } from "framer-motion";

import { SignInButton } from "@clerk/nextjs";
import { useRef } from "react";

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0%" });

  return (
    <motion.section ref={ref} className="bg-slate-900 px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto max-w-4xl space-y-6 text-center"
      >
        <h2 className="text-4xl font-bold text-white sm:text-5xl">
          Ready to take control?
        </h2>

        <p className="mx-auto max-w-md text-xl text-slate-300">
          Join thousands of users who are already managing their finances
          smarter with FlowSpend.
        </p>

        <SignInButton mode="redirect">
          <button className="mx-auto cursor-pointer rounded-full bg-white px-8 py-3 text-base font-semibold text-slate-900 shadow-lg transition-all duration-200 hover:bg-slate-100 hover:shadow-xl">
            Try for free
          </button>
        </SignInButton>
      </motion.div>
    </motion.section>
  );
};

export default CTASection;
