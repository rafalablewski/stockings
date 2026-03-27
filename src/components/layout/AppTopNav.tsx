'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect, useCallback } from 'react';
import MobileNav from '@/components/shared/MobileNav';
import PinStatus from '@/components/shared/PinStatus';
import AiToggle from '@/components/shared/AiToggle';
import NotesPanel from '@/components/shared/NotesPanel';
import NotificationBell from '@/components/shared/NotificationBell';

const audits = [
  { slug: 'comprehensive-code-audit', label: 'Code Audit v1.0' },
] as const;

const hooks = [
  { slug: 'code-review', label: 'Code Review', severity: 'pre+post' },
  { slug: 'claude-md-management', label: 'CLAUDE.md Management', severity: 'post' },
  { slug: 'code-simplifier', label: 'Code Simplifier', severity: 'post' },
  { slug: 'agent-impact-detector', label: 'Agent Impact Detector', severity: 'post' },
  { slug: 'methodology-sync-checker', label: 'Methodology Sync', severity: 'post' },
] as const;

const docs = [
  { slug: 'documentation', label: 'Documentation', href: '/docs' },
  { slug: 'firecrawl', label: 'Firecrawl', href: '/docs/firecrawl' },
] as const;

export const mobileNavItems = [
  { label: 'Research', href: '/research' },
  {
    label: 'Docs',
    children: docs.map((d) => ({ label: d.label, href: d.href })),
  },
  {
    label: 'Hooks',
    children: [
      ...hooks.map((h) => ({ label: h.label, href: `/hooks#${h.slug}`, meta: h.severity })),
      { label: 'View all hooks', href: '/hooks' },
    ],
  },
  {
    label: 'Engineers',
    children: [
      { label: 'Dashboard', href: '/engineers' },
      { label: 'Room', href: '/engineers/room' },
      { label: 'Prompt Database', href: '/engineers/prompts' },
    ],
  },
  {
    label: 'Intelligence',
    children: [
      { label: 'Press Intelligence', href: '/press-intelligence' },
      { label: 'SEC Intelligence', href: '/sec-intelligence' },
    ],
  },
  {
    label: 'Audit',
    children: audits.map((a) => ({ label: a.label, href: `/audit/${a.slug}` })),
  },
];

type MenuId = 'docs' | 'hooks' | 'engineers' | 'intel' | 'audit';

function MenuChevron({ open }: { open: boolean }) {
  return (
    <svg
      width={10}
      height={6}
      viewBox="0 0 10 6"
      fill="none"
      className={`app-top-nav-chevron${open ? ' app-top-nav-chevron--open' : ''}`}
      aria-hidden
    >
      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AppTopNav() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null);
  const shellRef = useRef<HTMLDivElement>(null);

  const closeMenus = useCallback(() => setOpenMenu(null), []);

  const toggleMenu = useCallback((id: MenuId) => {
    setOpenMenu((prev) => (prev === id ? null : id));
  }, []);

  useEffect(() => {
    if (!openMenu) return;
    const onDocMouseDown = (e: MouseEvent) => {
      if (shellRef.current && !shellRef.current.contains(e.target as Node)) closeMenus();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenus();
    };
    document.addEventListener('mousedown', onDocMouseDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocMouseDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [openMenu, closeMenus]);

  useEffect(() => {
    closeMenus();
  }, [pathname, closeMenus]);

  const researchActive = pathname === '/research' || pathname.startsWith('/research/');

  return (
    <nav className="app-top-nav" aria-label="Primary">
      <div className="app-top-nav-inner">
        <div className="app-top-nav-left">
          <Link href="/" className="app-top-nav-brand">
            abison
          </Link>
          <div className="app-top-nav-utilities hidden md:flex">
            <PinStatus />
            <AiToggle />
            <NotificationBell />
            <NotesPanel />
          </div>
        </div>

        <div ref={shellRef} className="app-top-nav-menus hidden md:flex items-center">
          <Link
            href="/research"
            className={`app-top-nav-pill${researchActive ? ' app-top-nav-pill--active' : ''}`}
          >
            Research
          </Link>

          <div className="app-top-nav-menu-wrap">
            <button
              type="button"
              className={`app-top-nav-menu-trigger${openMenu === 'docs' ? ' app-top-nav-menu-trigger--open' : ''}`}
              aria-expanded={openMenu === 'docs'}
              aria-haspopup="true"
              aria-controls="app-menu-docs"
              onClick={() => toggleMenu('docs')}
            >
              Docs
              <MenuChevron open={openMenu === 'docs'} />
            </button>
            {openMenu === 'docs' && (
              <div id="app-menu-docs" role="menu" className="app-top-nav-dropdown">
                {docs.map((doc) => (
                  <Link
                    key={doc.slug}
                    href={doc.href}
                    role="menuitem"
                    className="app-top-nav-dropdown-link"
                    onClick={closeMenus}
                  >
                    {doc.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="app-top-nav-menu-wrap">
            <button
              type="button"
              className={`app-top-nav-menu-trigger${openMenu === 'hooks' ? ' app-top-nav-menu-trigger--open' : ''}`}
              aria-expanded={openMenu === 'hooks'}
              aria-haspopup="true"
              aria-controls="app-menu-hooks"
              onClick={() => toggleMenu('hooks')}
            >
              Hooks
              <MenuChevron open={openMenu === 'hooks'} />
            </button>
            {openMenu === 'hooks' && (
              <div id="app-menu-hooks" role="menu" className="app-top-nav-dropdown app-top-nav-dropdown--wide">
                {hooks.map((hook) => (
                  <Link
                    key={hook.slug}
                    href={`/hooks#${hook.slug}`}
                    role="menuitem"
                    className="app-top-nav-dropdown-row"
                    onClick={closeMenus}
                  >
                    <span className="app-top-nav-dropdown-row-label">{hook.label}</span>
                    <span className="app-top-nav-dropdown-row-meta">{hook.severity}</span>
                  </Link>
                ))}
                <div className="app-top-nav-dropdown-sep" />
                <Link href="/hooks" role="menuitem" className="app-top-nav-dropdown-footer" onClick={closeMenus}>
                  View all hooks →
                </Link>
              </div>
            )}
          </div>

          <div className="app-top-nav-menu-wrap">
            <button
              type="button"
              className={`app-top-nav-menu-trigger${openMenu === 'engineers' ? ' app-top-nav-menu-trigger--open' : ''}`}
              aria-expanded={openMenu === 'engineers'}
              aria-haspopup="true"
              aria-controls="app-menu-engineers"
              onClick={() => toggleMenu('engineers')}
            >
              Engineers
              <MenuChevron open={openMenu === 'engineers'} />
            </button>
            {openMenu === 'engineers' && (
              <div id="app-menu-engineers" role="menu" className="app-top-nav-dropdown">
                <Link href="/engineers" role="menuitem" className="app-top-nav-dropdown-link" onClick={closeMenus}>
                  Dashboard
                </Link>
                <Link href="/engineers/room" role="menuitem" className="app-top-nav-dropdown-link" onClick={closeMenus}>
                  Room
                </Link>
                <Link
                  href="/engineers/prompts"
                  role="menuitem"
                  className="app-top-nav-dropdown-link"
                  onClick={closeMenus}
                >
                  Prompt database
                </Link>
              </div>
            )}
          </div>

          <div className="app-top-nav-menu-wrap">
            <button
              type="button"
              className={`app-top-nav-menu-trigger${openMenu === 'intel' ? ' app-top-nav-menu-trigger--open' : ''}`}
              aria-expanded={openMenu === 'intel'}
              aria-haspopup="true"
              aria-controls="app-menu-intel"
              onClick={() => toggleMenu('intel')}
            >
              Intelligence
              <MenuChevron open={openMenu === 'intel'} />
            </button>
            {openMenu === 'intel' && (
              <div id="app-menu-intel" role="menu" className="app-top-nav-dropdown">
                <Link
                  href="/press-intelligence"
                  role="menuitem"
                  className="app-top-nav-dropdown-link"
                  onClick={closeMenus}
                >
                  Press intelligence
                </Link>
                <Link
                  href="/sec-intelligence"
                  role="menuitem"
                  className="app-top-nav-dropdown-link"
                  onClick={closeMenus}
                >
                  SEC intelligence
                </Link>
              </div>
            )}
          </div>

          <div className="app-top-nav-menu-wrap">
            <button
              type="button"
              className={`app-top-nav-menu-trigger${openMenu === 'audit' ? ' app-top-nav-menu-trigger--open' : ''}`}
              aria-expanded={openMenu === 'audit'}
              aria-haspopup="true"
              aria-controls="app-menu-audit"
              onClick={() => toggleMenu('audit')}
            >
              Audit
              <MenuChevron open={openMenu === 'audit'} />
            </button>
            {openMenu === 'audit' && (
              <div id="app-menu-audit" role="menu" className="app-top-nav-dropdown app-top-nav-dropdown--wide">
                {audits.map((audit) => (
                  <Link
                    key={audit.slug}
                    href={`/audit/${audit.slug}`}
                    role="menuitem"
                    className="app-top-nav-dropdown-link"
                    onClick={closeMenus}
                  >
                    {audit.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="app-top-nav-mobile md:hidden">
          <MobileNav items={mobileNavItems}>
            <PinStatus />
            <AiToggle />
            <NotificationBell />
            <NotesPanel />
          </MobileNav>
        </div>
      </div>
    </nav>
  );
}
