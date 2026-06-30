"use client";

import { Menu } from "lucide-react";
import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import Logo from "@/components/layout/Logo";

const LandingHeader = () => {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <Logo href="/" />

          {/* available links  */}
          <ul className="absolute left-1/2 hidden -translate-x-1/2 transform items-center space-x-8 md:flex">
            <li className="">
              <Link
                href="#features"
                className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
              >
                Features
              </Link>
            </li>

            <li className="">
              <Link
                href="#how-it-works"
                className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
              >
                How It Works
              </Link>
            </li>
          </ul>

          {/* CTA - buttons */}
          <div className="z-10 hidden items-center gap-3 md:flex">
            <Link
              href="/login"
              className="text-sm font-medium text-slate-700 transition-colors hover:text-slate-900"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="cursor-pointer rounded-full bg-slate-800 px-6 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-slate-900 hover:shadow-xl"
            >
              Try for free
            </Link>
          </div>

          {/* mobile menu */}
          <div className="z-10 md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className="p-2 text-slate-700 transition-colors hover:text-slate-900"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="text-left">
                    <Logo />
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-8 flex flex-col space-y-2">
                  <SheetClose asChild>
                    <Link
                      href="#features"
                      className="py-2 text-base font-medium text-slate-700 transition-colors hover:text-slate-900"
                    >
                      Features
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link
                      href="#how-it-works"
                      className="py-2 text-base font-medium text-slate-700 transition-colors hover:text-slate-900"
                    >
                      How It Works
                    </Link>
                  </SheetClose>

                  <div className="mt-6 flex flex-col gap-2 border-t border-slate-200 pt-6">
                    <SheetClose asChild>
                      <Link
                        href="/login"
                        className="w-full py-2 text-center text-sm font-medium text-slate-700 hover:text-slate-900"
                      >
                        Sign in
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/signup"
                        className="w-full cursor-pointer rounded-full bg-slate-800 px-6 py-2 text-center text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-slate-900 hover:shadow-xl"
                      >
                        Try for free
                      </Link>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default LandingHeader;
