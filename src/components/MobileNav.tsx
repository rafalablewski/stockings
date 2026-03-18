"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const mobileItems = [
  { href: "/", icon: "show_chart", label: "Market" },
  { href: "/research", icon: "search", label: "Search" },
  { href: "/ai", icon: "swap_horiz", label: "Trade" },
  { href: "/alerts", icon: "notifications", label: "Alerts" },
  { href: "/terminal", icon: "terminal", label: "Terminal" },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 w-full z-50 flex justify-around h-16 bg-background border-t border-outline-variant/15">
      {mobileItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={
              isActive
                ? "flex flex-col items-center text-primary bg-surface-container-low pt-2 pb-1 flex-1"
                : "flex flex-col items-center text-on-surface-variant pt-2 pb-1 hover:bg-surface-variant flex-1"
            }
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="font-label text-[10px] font-bold tracking-tighter uppercase">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
