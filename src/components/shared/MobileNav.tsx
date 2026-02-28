'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string; meta?: string }[];
}

interface MobileNavProps {
  items: NavItem[];
  children?: React.ReactNode;
}

/**
 * MobileNav — Touch-friendly hamburger drawer for <768px.
 *
 * Renders a hamburger button that opens a full-height slide-over.
 * All nav items and their dropdowns are displayed as expandable sections.
 * Hidden on desktop via CSS (md:hidden).
 *
 * Stock-agnostic: receives items as props from layout.tsx,
 * so adding a new stock to stockList propagates automatically.
 */
export default function MobileNav({ items, children }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setExpanded(null);
  }, []);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handleKey);
    // Prevent body scroll when drawer open
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, close]);

  return (
    <>
      {/* Hamburger button — only visible on mobile via CSS */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        className="mobile-nav-toggle"
      >
        <svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.95)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {open ? (
            <>
              <line x1={18} y1={6} x2={6} y2={18} />
              <line x1={6} y1={6} x2={18} y2={18} />
            </>
          ) : (
            <>
              <line x1={3} y1={6} x2={21} y2={6} />
              <line x1={3} y1={12} x2={21} y2={12} />
              <line x1={3} y1={18} x2={21} y2={18} />
            </>
          )}
        </svg>
      </button>

      {/* Backdrop */}
      {open && (
        <div className="mobile-nav-backdrop" onClick={close} />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal={open}
        aria-label="Navigation menu"
        className={`mobile-nav-drawer${open ? ' mobile-nav-drawer--open' : ''}`}
      >
        {/* Toolbar badges (PinStatus, AiToggle, Notes) — only visible on mobile */}
        {children && (
          <div className="mobile-nav-badges">
            {children}
          </div>
        )}

        {items.map((item) =>
          item.children ? (
            <div key={item.label} className="mobile-nav-section">
              {/* Section header (expandable) */}
              <button
                type="button"
                onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                className="mobile-nav-section-header"
              >
                {item.label}
                <svg
                  width={14}
                  height={14}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`mobile-nav-chevron${expanded === item.label ? ' mobile-nav-chevron--expanded' : ''}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Children */}
              <div
                className="mobile-nav-children"
                style={{ maxHeight: expanded === item.label ? `${item.children.length * 52}px` : undefined }}
              >
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={close}
                    className="mobile-nav-child-link"
                  >
                    <span>{child.label}</span>
                    {child.meta && (
                      <span className="mobile-nav-child-meta">
                        {child.meta}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link
              key={item.label}
              href={item.href!}
              onClick={close}
              className="mobile-nav-top-link"
            >
              {item.label}
            </Link>
          )
        )}
      </div>
    </>
  );
}
