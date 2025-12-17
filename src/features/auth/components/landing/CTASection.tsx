"use client";

import { motion, useInView } from "framer-motion";

import { SignInButton } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0%" });

  return (
    <motion.section
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
          Ready to take control?
        </h2>

        <p className="text-xl text-slate-300 mb-10 max-w-lg mx-auto">
          Join thousands of users who are already managing their finances
          smarter with FlowSpend.
        </p>

        <SignInButton mode="redirect">
          <button className="cursor-pointer bg-white hover:bg-slate-100 text-slate-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 mx-auto shadow-lg hover:shadow-xl">
            <span>Get started for free</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </SignInButton>
      </motion.div>
    </motion.section>
  );
};

export default CTASection;
