import type { Metadata } from "next";
import Link from "next/link";
import { stockList } from "@/lib/stocks";
import PinStatus from "@/components/shared/PinStatus";
import AiToggle from "@/components/shared/AiToggle";
import NotesPanel from "@/components/shared/NotesPanel";
import MobileNav from "@/components/shared/MobileNav";
import PinGate from "@/components/PinGate";
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

const audits = [
  {
    slug: "comprehensive-code-audit",
    label: "Code Audit v1.0",
  },
];

const hooks = [
  {
    slug: "code-review",
    label: "Code Review",
    severity: "pre+post",
  },
  {
    slug: "claude-md-management",
    label: "CLAUDE.md Management",
    severity: "post",
  },
  {
    slug: "code-simplifier",
    label: "Code Simplifier",
    severity: "post",
  },
  {
    slug: "agent-impact-detector",
    label: "Agent Impact Detector",
    severity: "post",
  },
  {
    slug: "methodology-sync-checker",
    label: "Methodology Sync",
    severity: "post",
  },
];

// Build mobile nav items from the same data sources — stock-agnostic.
// When stockList or hooks or audits change, mobile nav updates automatically.
const mobileNavItems = [
  { label: 'Docs', href: '/docs' },
  {
    label: 'Hooks',
    children: [
      ...hooks.map((h) => ({ label: h.label, href: `/hooks#${h.slug}`, meta: h.severity })),
      { label: 'View all hooks', href: '/hooks' },
    ],
  },
  {
    label: 'Research',
    children: stockList.map((s) => ({ label: `${s.ticker} — ${s.name}`, href: `/stocks/${s.ticker}` })),
  },
  {
    label: 'Audit',
    children: audits.map((a) => ({ label: a.label, href: `/audit/${a.slug}` })),
  },
];

function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-[14px] font-light tracking-[0.5em] uppercase text-white/90 hover:text-white transition-colors"
            >
              a b i s o n
            </Link>
            {/* Desktop only — on mobile these live inside the hamburger drawer */}
            <div className="hidden md:flex items-center gap-3">
              <PinStatus />
              <AiToggle />
              <NotesPanel />
            </div>
          </div>

          {/* Desktop navigation — hidden on mobile */}
          <div className="hidden md:flex items-center gap-8">
            {/* Docs link */}
            <Link
              href="/docs"
              className="text-[13px] text-white/60 hover:text-white transition-colors"
            >
              Docs
            </Link>

            {/* Hooks dropdown */}
            <div className="relative group/hooks">
              <span className="text-[13px] text-white/60 group-hover/hooks:text-white transition-colors cursor-default select-none">
                Hooks
              </span>
              <div className="absolute top-full right-0 pt-3 hidden group-hover/hooks:block">
                <div className="bg-black/95 backdrop-blur-xl border border-white/[0.08] rounded-xl py-2 min-w-[260px] shadow-2xl">
                  {hooks.map((hook) => (
                    <Link
                      key={hook.slug}
                      href={`/hooks#${hook.slug}`}
                      className="flex items-center justify-between gap-3 px-4 py-2.5 hover:bg-white/[0.04] transition-colors"
                    >
                      <span className="text-[12px] text-white/80">
                        {hook.label}
                      </span>
                      <span className="text-[9px] font-mono text-white/25 uppercase">
                        {hook.severity}
                      </span>
                    </Link>
                  ))}
                  <div className="border-t border-white/[0.06] mt-1 pt-1">
                    <Link
                      href="/hooks"
                      className="block px-4 py-2.5 hover:bg-white/[0.04] transition-colors"
                    >
                      <span className="text-[11px] text-white/40">
                        View all hooks →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Research dropdown */}
            <div className="relative group/research">
              <span className="text-[13px] text-white/60 group-hover/research:text-white transition-colors cursor-default select-none">
                Research
              </span>
              <div className="absolute top-full right-0 pt-3 hidden group-hover/research:block">
                <div className="bg-black/95 backdrop-blur-xl border border-white/[0.08] rounded-xl py-2 min-w-[220px] shadow-2xl">
                  {stockList.map((stock) => (
                    <Link
                      key={stock.ticker}
                      href={`/stocks/${stock.ticker}`}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/[0.04] transition-colors"
                    >
                      <span className="text-[12px] font-mono font-medium text-white/80 w-10">
                        {stock.ticker}
                      </span>
                      <span className="text-[12px] text-white/40">
                        {stock.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Audit dropdown */}
            <div className="relative group/audit">
              <span className="text-[13px] text-white/60 group-hover/audit:text-white transition-colors cursor-default select-none">
                Audit
              </span>
              <div className="absolute top-full right-0 pt-3 hidden group-hover/audit:block">
                <div className="bg-black/95 backdrop-blur-xl border border-white/[0.08] rounded-xl py-2 min-w-[260px] shadow-2xl">
                  {audits.map((audit) => (
                    <Link
                      key={audit.slug}
                      href={`/audit/${audit.slug}`}
                      className="block px-4 py-2.5 hover:bg-white/[0.04] transition-colors"
                    >
                      <span className="text-[12px] text-white/80">
                        {audit.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile navigation — hamburger drawer, hidden on desktop */}
          <div className="md:hidden">
            <MobileNav items={mobileNavItems}>
              <PinStatus />
              <AiToggle />
              <NotesPanel />
            </MobileNav>
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-black text-white">
        <PinGate>
          <Navigation />
          <main className="flex-1 pt-14">
            {children}
          </main>
          <Footer />
        </PinGate>
      </body>
    </html>
  );
}
