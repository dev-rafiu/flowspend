"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const HowItWorksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0%" });

  const steps = [
    {
      step: "01",
      title: "Sign Up Free",
      description:
        "Create your account in seconds. No credit card required. Start tracking immediately.",
    },
    {
      step: "02",
      title: "Add Transactions",
      description:
        "Record your income and expenses with our simple, mobile-friendly interface.",
    },
    {
      step: "03",
      title: "Analyze & Grow",
      description:
        "View insights, track trends, and make informed financial decisions.",
    },
  ];

  return (
    <motion.section ref={ref} id="how-it-works" className="px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto max-w-7xl"
      >
        <motion.header className="mb-16 space-y-4 text-center">
          <h2 className="space-y-4 text-4xl font-bold text-slate-900 sm:text-5xl">
            How it works
          </h2>

          <p className="mx-auto max-w-80 text-lg text-slate-600">
            Get started in minutes and take control of your finances today.
          </p>
        </motion.header>

        <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((item, index) => (
            <li key={index} className="text-center">
              <span className="mb-4 text-6xl font-bold text-slate-200">
                {item.step}
              </span>
              <h3 className="mb-3 text-2xl font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="leading-relaxed text-slate-600">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.section>
  );
};

export default HowItWorksSection;
