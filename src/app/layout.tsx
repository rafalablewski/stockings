import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stockings | Investment Research",
  description: "Professional stock analysis and investment research platform",
};

function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">📈</span>
            <span className="text-xl font-bold gradient-text">Stockings</span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link
              href="/stocks"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Research
            </Link>
            <Link
              href="/stocks"
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
            >
              View Analysis
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl">📈</span>
            <span className="font-semibold">Stockings</span>
          </div>
          <p className="text-gray-500 text-sm">
            Investment research and analysis. Not financial advice.
          </p>
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Stockings Research
          </p>
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
      <body className="antialiased min-h-screen flex flex-col font-sans">
        <Navigation />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
