'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';

/**
 * Syncs the active tab with the URL hash so that:
 * - Browser back/forward navigates between tabs
 * - Links like /research/ASTS#model open the correct tab
 * - Page refresh preserves the active tab
 */
export function useHashTab(validIds: string[], defaultId: string = 'overview') {
  const validIdSet = useMemo(() => new Set(validIds), [validIds]);

  const getTabFromHash = useCallback(() => {
    if (typeof window === 'undefined') return defaultId;
    const hash = window.location.hash.slice(1);
    return validIdSet.has(hash) ? hash : defaultId;
  }, [defaultId, validIdSet]);

  const [activeTab, setActiveTabState] = useState(getTabFromHash);

  const setActiveTab = useCallback((tabId: string) => {
    setActiveTabState(tabId);
    window.history.pushState(null, '', `#${tabId}`);
  }, []);

  // Listen for browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      setActiveTabState(getTabFromHash());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [getTabFromHash]);

  return [activeTab, setActiveTab] as const;
}
