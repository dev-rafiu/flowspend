"use client";

import { motion, useInView } from "framer-motion";
import { SignInButton } from "@clerk/nextjs";
import { useRef } from "react";
import Image from "next/image";

const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0%" });

  return (
    <motion.section ref={ref} className="flex flex-col gap-14 px-4 py-16 pt-26">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center"
      >
        {/* tagline */}
        <div className="inline-flex items-center space-x-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
          <span>✨</span>
          <span>Track your money, control your flow</span>
        </div>

        {/* heading and description */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="max-w-xl text-3xl font-bold text-slate-700 sm:text-4xl lg:text-[3.5rem]">
            Take control of your financial flow
          </h1>

          <p className="mx-auto max-w-lg text-lg leading-8 text-slate-600 lg:leading-normal">
            FlowSpend helps you track expenses, analyze spending patterns, and
            make smarter financial decisions—all in one beautiful, mobile-first
            platform.
          </p>
        </div>

        <SignInButton mode="redirect">
          <button className="mx-auto cursor-pointer rounded-full bg-slate-800 px-8 py-3 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:bg-slate-900 hover:shadow-xl">
            Try for free
          </button>
        </SignInButton>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="relative mx-auto hidden h-80 w-240 rounded-lg border shadow-lg lg:block lg:h-140"
      >
        <Image
          src="/dashboard-mockup.webp"
          alt="Dashboard Mockup"
          className="h-full w-full object-contain"
          sizes=""
          fill
        />
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
