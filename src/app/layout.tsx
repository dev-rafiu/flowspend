import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/app/components/Header";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Track your expenses and manage your finances",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${roboto.className} antialiased`}>
          <Header />

          <main className="container">{children}</main>

          <Toaster position="top-right" richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
