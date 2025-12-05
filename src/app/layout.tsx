import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import ConditionalHeader from "@/features/auth/components/ConditionalHeader";
import ConditionalBottomNav from "@/features/navigation/components/ConditionalBottomNav";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FlowSpend - Track Your Money, Control Your Flow",
  description:
    "Track your expenses, analyze spending patterns, and make smarter financial decisions with FlowSpend. Beautiful, mobile-first expense tracking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <body className={`${inter.variable} font-sans antialiased`}>
          <ConditionalHeader />
          <main>{children}</main>
          <ConditionalBottomNav />
          <Toaster position="top-right" richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
