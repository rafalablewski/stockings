'use client';

import { useState, useCallback, useEffect } from 'react';

/**
 * Syncs the active tab with the URL hash so that:
 * - Browser back/forward navigates between tabs
 * - Links like /stocks/ASTS#model open the correct tab
 * - Page refresh preserves the active tab
 */
export function useHashTab(validIds: string[], defaultId: string = 'overview') {
  const [activeTab, setActiveTabState] = useState(() => {
    if (typeof window === 'undefined') return defaultId;
    const hash = window.location.hash.slice(1);
    return validIds.includes(hash) ? hash : defaultId;
  });

  const setActiveTab = useCallback((tabId: string) => {
    setActiveTabState(tabId);
    window.history.pushState(null, '', `#${tabId}`);
  }, []);

  // Listen for browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.slice(1);
      setActiveTabState(validIds.includes(hash) ? hash : defaultId);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [validIds, defaultId]);

  return [activeTab, setActiveTab] as const;
}
