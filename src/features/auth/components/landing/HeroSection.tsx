"use client";

import { SignInButton } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "1M+", label: "Transactions Tracked" },
    { value: "99.9%", label: "Uptime" },
  ];

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col gap-14">
      <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-6">
        {/* tagline */}
        <div className="inline-flex items-center space-x-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-medium">
          <span>✨</span>
          <span>Track your money, control your flow</span>
        </div>

        {/* heading and description */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl sm:text-4xl lg:text-[3.5rem] font-bold text-slate-700 max-w-xl">
            Take Control of Your Financial Flow
          </h1>

          <p className="text-lg text-slate-600 max-w-180 mx-auto leading-8 lg:leading-normal">
            FlowSpend helps you track expenses, analyze spending patterns, and
            make smarter financial decisions—all in one beautiful, mobile-first
            platform.
          </p>
        </div>

        <SignInButton mode="redirect">
          <button className="cursor-pointer bg-slate-800 hover:bg-slate-900 text-white px-8 py-4 rounded-lg text-base font-semibold transition-all duration-200 flex items-center justify-center space-x-2 mx-auto shadow-lg hover:shadow-xl">
            <span>Get Started Free</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </SignInButton>
      </div>

      {/* dashboard mockup */}
      <div className="bg-gray-100 mx-auto w-220 h-120 hidden md:block" />

      {/* stats */}
      <div className="mt-20 grid-cols-3 gap-8 max-w-2xl mx-auto hidden">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
              {stat.value}
            </div>
            <div className="text-sm text-slate-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
