"use client";

const HowItWorksSection = () => {
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
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 space-y-4">
            How It Works
          </h2>
          <p className="text-lg text-slate-600 max-w-100 mx-auto">
            Get started in minutes and take control of your finances today.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((item, index) => (
            <div key={index} className="text-center">
              <div className="text-6xl font-bold text-slate-200 mb-4">
                {item.step}
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                {item.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
