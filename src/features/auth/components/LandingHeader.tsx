"use client";

import { SignInButton, SignedOut } from "@clerk/nextjs";
import { ArrowRight, Menu } from "lucide-react";
import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const LandingHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* logo - left */}
          <Link href="/" className="flex items-center space-x-2 z-10">
            <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FS</span>
            </div>
            <span className="text-xl font-semibold text-slate-900">
              FlowSpend
            </span>
          </Link>

          {/* available links  */}
          <ul className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <li>
              <Link
                href="#features"
                className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium"
              >
                Features
              </Link>
            </li>

            <li>
              <Link
                href="#how-it-works"
                className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium"
              >
                How It Works
              </Link>
            </li>
          </ul>

          {/* CTA - buttons */}
          <div className="hidden md:flex items-center space-x-3 z-10">
            <SignedOut>
              <SignInButton mode="redirect">
                <button className="cursor-pointer px-4 py-2 rounded-lg bg-white border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 text-sm font-medium transition-all duration-200">
                  Sign In
                </button>
              </SignInButton>

              <SignInButton mode="redirect">
                <button className="cursor-pointer px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-sm font-semibold transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg">
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </SignInButton>
            </SignedOut>
          </div>

          {/* mobile menu */}
          <div className="md:hidden z-10">
            <SignedOut>
              <Sheet>
                <SheetTrigger asChild>
                  <button
                    className="p-2 text-slate-700 hover:text-slate-900 transition-colors"
                    aria-label="Open menu"
                  >
                    <Menu className="w-6 h-6" />
                  </button>
                </SheetTrigger>

                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle className="text-left flex items-center space-x-2">
                      <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">FS</span>
                      </div>
                      <span className="text-xl font-semibold text-slate-900">
                        FlowSpend
                      </span>
                    </SheetTitle>
                  </SheetHeader>

                  <nav className="flex flex-col space-y-2 mt-8">
                    <SheetClose asChild>
                      <Link
                        href="#features"
                        className="text-slate-700 hover:text-slate-900 transition-colors text-base font-medium py-2"
                      >
                        Features
                      </Link>
                    </SheetClose>

                    <SheetClose asChild>
                      <Link
                        href="#how-it-works"
                        className="text-slate-700 hover:text-slate-900 transition-colors text-base font-medium py-2"
                      >
                        How It Works
                      </Link>
                    </SheetClose>

                    <div className="mt-6 pt-6 border-t border-slate-200 space-y-4">
                      <SignInButton mode="redirect">
                        <button className="w-full bg-white border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 text-center">
                          Sign In
                        </button>
                      </SignInButton>

                      <SignInButton mode="redirect">
                        <button className="w-full bg-slate-800 hover:bg-slate-900 text-white px-4 py-3 rounded-lg text-base font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg">
                          <span>Get Started</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </SignInButton>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </SignedOut>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default LandingHeader;
