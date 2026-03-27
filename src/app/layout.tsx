import type { Metadata } from "next";
import PinGate from "@/components/PinGate";
import AppTopNav from "@/components/layout/AppTopNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "ABISON | Investment Research",
  description: "ABISON investment research - comprehensive stock analysis platform",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

function Footer() {
  return (
    <footer className="py-6 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-2 text-[11px] text-white/30">
          <span className="tracking-[0.15em]">abison</span>
          <span className="text-white/10">·</span>
          <span>Investment Research</span>
          <span className="text-white/10">·</span>
          <span>Not financial advice</span>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Outfit:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-black text-white">
        <PinGate>
          <AppTopNav />
          <main className="flex-1 pt-14">
            {children}
          </main>
          <Footer />
        </PinGate>
      </body>
    </html>
  );
}
