"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FS</span>
              </div>
              <span className="text-lg font-semibold text-slate-900">
                FlowSpend
              </span>
            </div>

            <p className="text-sm text-slate-600">
              Track your money, control your flow.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-slate-900">Product</h4>

            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link
                  href="#features"
                  className="hover:text-slate-900 transition-colors"
                >
                  Features
                </Link>
              </li>

              <li>
                <Link
                  href="#how-it-works"
                  className="hover:text-slate-900 transition-colors"
                >
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-slate-900">Company</h4>

            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link
                  href="#"
                  className="hover:text-slate-900 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-slate-900 transition-colors"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-slate-900 transition-colors"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-slate-900">Support</h4>

            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link
                  href="#"
                  className="hover:text-slate-900 transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-slate-900 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 text-center text-sm text-slate-600">
          <p>© {new Date().getFullYear()} FlowSpend. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
