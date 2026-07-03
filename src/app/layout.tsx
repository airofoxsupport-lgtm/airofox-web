import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileCTA from "@/components/shared/StickyMobileCTA";
import ToastProvider from "@/components/shared/Toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // optional but useful
});

export const metadata: Metadata = {
  title: "AiroFox - Fast & Reliable Home Services",
  description: "Fast & Reliable Home Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={inter.className}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <StickyMobileCTA />
        <ToastProvider />
        <Footer />
      </body>
    </html>
  );
}
