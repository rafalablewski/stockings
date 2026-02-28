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

  // Close on route change (link click)
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
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 44,
          height: 44,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          marginLeft: -8,
        }}
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
          style={{ transition: 'transform 0.2s' }}
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
        <div
          onClick={close}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            zIndex: 90,
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
          }}
        />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal={open}
        aria-label="Navigation menu"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: 'min(300px, calc(100vw - 56px))',
          background: 'rgba(10,10,10,0.98)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderLeft: '1px solid rgba(255,255,255,0.06)',
          zIndex: 100,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          paddingTop: 'max(72px, calc(env(safe-area-inset-top) + 56px))',
          paddingBottom: 'max(24px, env(safe-area-inset-bottom))',
          paddingLeft: 'max(20px, env(safe-area-inset-left))',
          paddingRight: 'max(20px, env(safe-area-inset-right))',
        }}
      >
        {/* Toolbar badges (PinStatus, AiToggle, Notes) — only visible on mobile */}
        {children && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              paddingBottom: 16,
              marginBottom: 8,
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {children}
          </div>
        )}

        {items.map((item) =>
          item.children ? (
            <div key={item.label} style={{ marginBottom: 4 }}>
              {/* Section header (expandable) */}
              <button
                type="button"
                onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '14px 0',
                  background: 'none',
                  border: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  cursor: 'pointer',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                }}
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
                  style={{
                    transition: 'transform 0.2s',
                    transform: expanded === item.label ? 'rotate(180deg)' : 'rotate(0)',
                    opacity: 0.4,
                  }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Children */}
              <div
                style={{
                  maxHeight: expanded === item.label ? `${item.children.length * 52}px` : '0px',
                  overflow: 'hidden',
                  transition: 'max-height 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={close}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      fontSize: 13,
                      color: 'rgba(255,255,255,0.6)',
                      textDecoration: 'none',
                      minHeight: 44,
                      borderBottom: '1px solid rgba(255,255,255,0.02)',
                    }}
                  >
                    <span>{child.label}</span>
                    {child.meta && (
                      <span style={{ fontSize: 9, fontFamily: 'monospace', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>
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
              style={{
                display: 'block',
                padding: '14px 0',
                fontSize: 14,
                fontWeight: 500,
                color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                minHeight: 44,
                letterSpacing: '0.02em',
              }}
            >
              {item.label}
            </Link>
          )
        )}
      </div>
    </>
  );
}
