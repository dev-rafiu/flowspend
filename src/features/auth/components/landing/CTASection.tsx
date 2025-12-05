"use client";

import { SignInButton } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
          Ready to Take Control?
        </h2>

        <p className="text-xl text-slate-300 mb-10 max-w-lg mx-auto">
          Join thousands of users who are already managing their finances
          smarter with FlowSpend.
        </p>

        <SignInButton mode="redirect">
          <button className="cursor-pointer bg-white hover:bg-slate-100 text-slate-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 mx-auto shadow-lg hover:shadow-xl">
            <span>Get Started Free</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </SignInButton>
      </div>
    </section>
  );
};

export default CTASection;
