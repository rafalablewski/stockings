"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", icon: "dashboard", label: "Overview" },
  { href: "/research", icon: "analytics", label: "Research" },
  { href: "/ai", icon: "psychology", label: "AI" },
  { href: "/model", icon: "query_stats", label: "Model" },
  { href: "/monte-carlo", icon: "casino", label: "Monte Carlo" },
  { href: "/comps", icon: "compare_arrows", label: "Comps" },
  { href: "/capital", icon: "account_balance", label: "Capital" },
  { href: "/financials", icon: "description", label: "Financials" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 overflow-y-auto bg-surface-container-lowest w-72 h-full hidden md:block pt-14 border-r border-outline-variant/15">
      <div className="p-4 border-b border-outline-variant/10">
        <h2 className="font-label text-xs uppercase tracking-widest text-primary font-bold">
          Analytics Engine
        </h2>
      </div>
      <nav className="flex flex-col gap-1 p-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                isActive
                  ? "flex items-center gap-3 px-4 py-3 bg-surface-container-low text-primary border-l-4 border-primary font-label text-xs uppercase tracking-widest"
                  : "flex items-center gap-3 px-4 py-3 text-on-surface-variant opacity-70 hover:bg-surface-variant hover:opacity-100 font-label text-xs uppercase tracking-widest transition-colors"
              }
            >
              <span className="material-symbols-outlined text-sm">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
