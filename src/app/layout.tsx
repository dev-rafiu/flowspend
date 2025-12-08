import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import ConditionalHeader from "@/features/auth/components/ConditionalHeader";
import ConditionalBottomNav from "@/features/navigation/components/ConditionalBottomNav";
import ConditionalSidebar from "@/features/navigation/components/ConditionalSidebar";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://flowspend.vercel.app"),
  title: "FlowSpend - Track Your Money, Control Your Flow",
  description:
    "Track your expenses, analyze spending patterns, and make smarter financial decisions with FlowSpend",

  openGraph: {
    title: "FlowSpend - Track Your Money, Control Your Flow",
    description:
      "Track your expenses, analyze spending patterns, and make smarter financial decisions with FlowSpend",
    url: "https://flowspend.vercel.app",
    siteName: "FlowSpend",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1170,
        height: 780,
        alt: "FlowSpend",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "FlowSpend - Track Your Money, Control Your Flow",
    description:
      "Track your expenses, analyze spending patterns, and make smarter financial decisions with FlowSpend.",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ClerkProvider>
          <div className="dashboard-grid-container relative">
            <ConditionalSidebar />
            <ConditionalHeader />
            <main className="dashboard-main px-2 h-screen overflow-y-auto">
              <div className="h-full p-4 pr-0">{children}</div>
            </main>
            <ConditionalBottomNav />
          </div>
          <Toaster position="top-right" richColors />
        </ClerkProvider>
      </body>
    </html>
  );
}
