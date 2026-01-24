"use client";

import { motion, useInView } from "framer-motion";
import {
  TrendingUp,
  Shield,
  Smartphone,
  BarChart3,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { useRef } from "react";

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0%" });

  const features = [
    {
      icon: TrendingUp,
      title: "Track Every Transaction",
      description:
        "Monitor your income and expenses in real-time with an intuitive interface.",
    },
    {
      icon: BarChart3,
      title: "Visual Analytics",
      description:
        "Get insights into your spending patterns with beautiful charts and graphs.",
    },
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description:
        "Access your finances anywhere, anytime with our mobile-optimized experience.",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description:
        "Your financial data is encrypted and protected with enterprise-grade security.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Add transactions in seconds with our streamlined, efficient workflow.",
    },
    {
      icon: CheckCircle2,
      title: "Category Management",
      description:
        "Organize your expenses with custom categories and smart categorization.",
    },
  ];

  return (
    <motion.section ref={ref} id="features" className="bg-slate-50 px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto max-w-7xl"
      >
        <header className="mb-16 space-y-4 text-center">
          <h2 className="space-y-4 text-4xl font-bold text-slate-900 sm:text-5xl">
            Everything you need
          </h2>

          <p className="mx-auto max-w-lg text-lg text-slate-600">
            Powerful features designed to help you understand and manage your
            finances better.
          </p>
        </header>

        <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <li
                key={index}
                className="rounded-xl border border-slate-200 bg-white p-8 transition-all duration-200 hover:border-slate-300 hover:shadow-lg"
              >
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
                  <Icon className="h-6 w-6 text-slate-700" />
                </span>
                <h3 className="mb-2 text-xl font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="leading-relaxed text-slate-600">
                  {feature.description}
                </p>
              </li>
            );
          })}
        </ul>
      </motion.div>
    </motion.section>
  );
};

export default FeaturesSection;
