'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
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
 * The backdrop + drawer are portaled to document.body so they escape the
 * nav bar's backdrop-filter stacking context (which would otherwise clip
 * fixed-position children to the 56px nav height).
 *
 * Stock-agnostic: receives items as props from layout.tsx,
 * so adding a new stock to stockList propagates automatically.
 */
export default function MobileNav({ items, children }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => {
    setOpen(false);
    setExpanded(null);
  }, []);

  // Close on Escape key + lock body scroll
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, close]);

  const drawer = (
    <>
      {/* Backdrop */}
      {open && (
        <div className="mobile-nav-backdrop" onClick={close} />
      )}

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal={open}
        aria-label="Navigation menu"
        className={`mobile-nav-drawer${open ? ' mobile-nav-drawer--open' : ''}`}
      >
        {/* Toolbar badges (PinStatus, AiToggle, Notes) */}
        {children && (
          <div className="mobile-nav-badges">
            {children}
          </div>
        )}

        {items.map((item) =>
          item.children ? (
            <div key={item.label} className="mobile-nav-section">
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

              <div
                className={`mobile-nav-children${expanded === item.label ? ' mobile-nav-children--expanded' : ''}`}
              >
                <div className="mobile-nav-children-inner">
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

  return (
    <>
      {/* Hamburger button — stays in the nav bar */}
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

      {/* Portal backdrop + drawer to body to escape nav's backdrop-filter stacking context */}
      {mounted && createPortal(drawer, document.body)}
    </>
  );
}
