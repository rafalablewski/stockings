import type { Metadata } from "next";
import Link from "next/link";
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

function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link
            href="/"
            className="text-[14px] font-normal tracking-[0.2em] text-white/90 hover:text-white transition-colors"
          >
            abison
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/stocks"
              className="text-[13px] text-white/60 hover:text-white transition-colors"
            >
              Research
            </Link>
            <Link
              href="/#audit"
              className="text-[13px] text-white/60 hover:text-white transition-colors"
            >
              Audit
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </nav>
  );
}

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
      <body className="antialiased min-h-screen flex flex-col bg-black text-white">
        <Navigation />
        <main className="flex-1 pt-14">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
