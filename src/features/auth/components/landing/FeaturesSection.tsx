"use client";

import {
  TrendingUp,
  Shield,
  Smartphone,
  BarChart3,
  Zap,
  CheckCircle2,
} from "lucide-react";

const FeaturesSection = () => {
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
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 space-y-4">
            Everything You Need
          </h2>

          <p className="text-lg text-slate-600 max-w-lg mx-auto">
            Powerful features designed to help you understand and manage your
            finances better.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-200"
              >
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-slate-700" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
