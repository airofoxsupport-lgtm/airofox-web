import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileCTA from "@/components/shared/StickyMobileCTA";
import ToastProvider from "@/components/shared/Toast";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // optional but useful
});

export const metadata: Metadata = {
  title: "AiroFox - Fast & Reliable Home Services",
  description: "Fast & Reliable Home Services",
  icons: {
    icon: '/logo.jpeg',
    apple: '/logo.jpeg',
  }
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
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Script
          id="theme-initializer"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `
          }}
        />
        <Header />
        {children}
        <StickyMobileCTA />
        <ToastProvider />
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
