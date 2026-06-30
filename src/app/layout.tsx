import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import ThemeProvider from "@/components/layout/ThemeProvider";
import { SidebarProvider } from "@/features/navigation/components/SidebarContext";
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
  metadataBase: new URL("https://claroo.vercel.app"),
  title: "Claroo - Track Your Money, Control Your Flow",
  description:
    "Track your expenses, analyze spending patterns, and make smarter financial decisions with Claroo",

  openGraph: {
    title: "Claroo - Track Your Money, Control Your Flow",
    description:
      "Track your expenses, analyze spending patterns, and make smarter financial decisions with Claroo",
    url: "https://claroo.vercel.app",
    siteName: "Claroo",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1170,
        height: 780,
        alt: "Claroo",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Claroo - Track Your Money, Control Your Flow",
    description:
      "Track your expenses, analyze spending patterns, and make smarter financial decisions with Claroo.",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <SidebarProvider>
            <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
              <ConditionalSidebar />
              <div className="flex min-w-0 flex-1 flex-col">
                <ConditionalHeader />
                <main className="flex-1">{children}</main>
              </div>
            </div>
            <ConditionalBottomNav />
          </SidebarProvider>
          <Toaster position="top-right" richColors theme="system" />
        </ThemeProvider>
      </body>
    </html>
  );
}
