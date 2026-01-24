"use client";

import { SignInButton, SignedOut } from "@clerk/nextjs";
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
import Logo from "@/components/Logo";

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
          <div className="z-10 hidden items-center md:flex">
            <SignedOut>
              <SignInButton mode="redirect">
                <button className="cursor-pointer rounded-full bg-slate-800 px-6 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-slate-900 hover:shadow-xl">
                  Try for free
                </button>
              </SignInButton>
            </SignedOut>
          </div>

          {/* mobile menu */}
          <div className="z-10 md:hidden">
            <SignedOut>
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

                    <div className="mt-6 border-t border-slate-200 pt-6">
                      <SignInButton mode="redirect">
                        <button className="w-full cursor-pointer rounded-full bg-slate-800 px-6 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-slate-900 hover:shadow-xl">
                          Try for free
                        </button>
                      </SignInButton>
                    </div>
                  </div>
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
