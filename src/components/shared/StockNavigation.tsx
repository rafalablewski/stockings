'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

// ============================================================================
// TYPES
// ============================================================================

export interface Tab {
  id: string;
  label: string;
  type: 'tracking' | 'projection';
  group?: string;
}

interface StockNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  stockGroupName: string; // e.g. "ASTS Analysis"
}

// ============================================================================
// TabPanel — wraps each tab's content with proper ARIA attributes
// ============================================================================

export function TabPanel({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div role="tabpanel" id={`tabpanel-${id}`} aria-labelledby={`tab-${id}`} tabIndex={0}>
      {children}
    </div>
  );
}

// ============================================================================
// Chevron icon for dropdown triggers
// ============================================================================

function DropdownChevron({ open }: { open: boolean }) {
  return (
    <span className={`nav-dropdown-chevron ${open ? 'open' : ''}`} aria-hidden="true">
      <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  );
}

// ============================================================================
// Projection icon — non-color indicator for projection tabs (accessibility)
// ============================================================================

function ProjectionIcon() {
  return (
    <span className="tab-type-badge" aria-hidden="true">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M1 9L5 1L9 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  );
}

// ============================================================================
// StockNavigation — shared nav bar + dropdown for all stock pages
// ============================================================================

export default function StockNavigation({ tabs, activeTab, onTabChange, stockGroupName }: StockNavigationProps) {
  const [analysisDropdownOpen, setAnalysisDropdownOpen] = useState(false);
  const [aiDropdownOpen, setAiDropdownOpen] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const analysisTriggerId = 'nav-trigger-analysis';
  const aiTriggerId = 'nav-trigger-ai';

  // Derived tab groups
  const ungroupedTabs = tabs.filter(t => !t.group);
  const analysisTabs = tabs.filter(t => t.group === stockGroupName);
  const aiTabs = tabs.filter(t => t.group === 'AI');

  const isAnalysisActive = analysisTabs.some(t => activeTab === t.id);
  const isAiActive = aiTabs.some(t => activeTab === t.id);

  // Build flat list of all navigable tabs for keyboard nav (roving tabindex)
  const getAllNavigableTabs = useCallback((): string[] => {
    const ids: string[] = [];
    // Overview (first ungrouped)
    if (ungroupedTabs.length > 0) ids.push(ungroupedTabs[0].id);
    // Analysis trigger
    ids.push(analysisTriggerId);
    // If analysis dropdown open, add its items
    if (analysisDropdownOpen) {
      analysisTabs.forEach(t => ids.push(t.id));
    }
    // Remaining ungrouped
    ungroupedTabs.slice(1).forEach(t => ids.push(t.id));
    // AI trigger
    ids.push(aiTriggerId);
    // If AI dropdown open, add its items
    if (aiDropdownOpen) {
      aiTabs.forEach(t => ids.push(t.id));
    }
    return ids;
  }, [ungroupedTabs, analysisTabs, aiTabs, analysisDropdownOpen, aiDropdownOpen]);

  // Close dropdowns on outside click
  useEffect(() => {
    if (!analysisDropdownOpen && !aiDropdownOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        navRef.current && !navRef.current.contains(target) &&
        dropdownRef.current && !dropdownRef.current.contains(target)
      ) {
        setAnalysisDropdownOpen(false);
        setAiDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [analysisDropdownOpen, aiDropdownOpen]);

  // Keyboard navigation handler — roving tabindex + arrow keys
  const handleKeyDown = useCallback((e: React.KeyboardEvent, currentId: string) => {
    const allIds = getAllNavigableTabs();
    const currentIndex = allIds.indexOf(currentId);
    if (currentIndex === -1) return;

    let nextIndex: number | null = null;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        nextIndex = (currentIndex + 1) % allIds.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        nextIndex = (currentIndex - 1 + allIds.length) % allIds.length;
        break;
      case 'Home':
        e.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        nextIndex = allIds.length - 1;
        break;
      case 'Escape':
        if (analysisDropdownOpen || aiDropdownOpen) {
          e.preventDefault();
          // Remember which trigger to focus
          const focusTriggerId = analysisDropdownOpen ? analysisTriggerId : aiTriggerId;
          setAnalysisDropdownOpen(false);
          setAiDropdownOpen(false);
          // Return focus to trigger
          setTimeout(() => document.getElementById(focusTriggerId)?.focus(), 0);
        }
        return;
    }

    if (nextIndex !== null) {
      const nextId = allIds[nextIndex];
      // If it's a trigger, just focus it
      if (nextId === analysisTriggerId || nextId === aiTriggerId) {
        document.getElementById(nextId)?.focus();
      } else {
        // It's a real tab — select it and focus
        onTabChange(nextId);
        setTimeout(() => document.getElementById(`tab-${nextId}`)?.focus(), 0);
      }
    }
  }, [getAllNavigableTabs, analysisDropdownOpen, aiDropdownOpen, onTabChange]);

  // Helper: is this the currently active tab for roving tabindex?
  const getTabIndex = (tabId: string): number => {
    if (tabId === activeTab) return 0;
    // If active tab is inside a group but dropdown is closed, make Overview focusable
    if (tabId === ungroupedTabs[0]?.id) {
      const activeInAnalysis = analysisTabs.some(t => t.id === activeTab) && !analysisDropdownOpen;
      const activeInAi = aiTabs.some(t => t.id === activeTab) && !aiDropdownOpen;
      if (activeInAnalysis || activeInAi) return 0;
    }
    return -1;
  };

  const getTriggerTabIndex = (triggerId: string): number => {
    if (triggerId === analysisTriggerId && isAnalysisActive && !analysisDropdownOpen) return 0;
    if (triggerId === aiTriggerId && isAiActive && !aiDropdownOpen) return 0;
    // If no regular tab has tabIndex=0, first trigger should be focusable
    return -1;
  };

  return (
    <>
      {/* Navigation Tab Bar */}
      <nav className="nav" role="tablist" aria-label="Stock analysis sections" ref={navRef}>
        {/* Overview tab (first ungrouped) */}
        {ungroupedTabs.slice(0, 1).map(t => (
          <button
            key={t.id}
            id={`tab-${t.id}`}
            role="tab"
            aria-selected={activeTab === t.id}
            aria-controls={`tabpanel-${t.id}`}
            tabIndex={getTabIndex(t.id)}
            className={`nav-btn ${activeTab === t.id ? 'active' : ''} tab-${t.type}`}
            onClick={() => onTabChange(t.id)}
            onKeyDown={(e) => handleKeyDown(e, t.id)}
          >
            {t.type === 'projection' && <ProjectionIcon />}
            {t.label}
          </button>
        ))}

        {/* Stock-specific analysis dropdown trigger */}
        <button
          id={analysisTriggerId}
          aria-expanded={analysisDropdownOpen}
          aria-haspopup="true"
          tabIndex={getTriggerTabIndex(analysisTriggerId)}
          className={`nav-btn nav-dropdown-trigger ${isAnalysisActive ? 'active' : ''} ${analysisDropdownOpen ? 'open' : ''}`}
          onClick={() => { setAnalysisDropdownOpen(!analysisDropdownOpen); setAiDropdownOpen(false); }}
          onKeyDown={(e) => handleKeyDown(e, analysisTriggerId)}
        >
          {stockGroupName} <DropdownChevron open={analysisDropdownOpen} />
        </button>

        {/* Remaining ungrouped tabs */}
        {ungroupedTabs.slice(1).map(t => (
          <button
            key={t.id}
            id={`tab-${t.id}`}
            role="tab"
            aria-selected={activeTab === t.id}
            aria-controls={`tabpanel-${t.id}`}
            tabIndex={getTabIndex(t.id)}
            className={`nav-btn ${activeTab === t.id ? 'active' : ''} tab-${t.type}`}
            onClick={() => onTabChange(t.id)}
            onKeyDown={(e) => handleKeyDown(e, t.id)}
          >
            {t.type === 'projection' && <ProjectionIcon />}
            {t.label}
          </button>
        ))}

        {/* AI hub dropdown trigger */}
        <button
          id={aiTriggerId}
          aria-expanded={aiDropdownOpen}
          aria-haspopup="true"
          tabIndex={getTriggerTabIndex(aiTriggerId)}
          className={`nav-btn nav-dropdown-trigger ${isAiActive ? 'active' : ''} ${aiDropdownOpen ? 'open' : ''}`}
          onClick={() => { setAiDropdownOpen(!aiDropdownOpen); setAnalysisDropdownOpen(false); }}
          onKeyDown={(e) => handleKeyDown(e, aiTriggerId)}
        >
          AI <DropdownChevron open={aiDropdownOpen} />
        </button>
      </nav>

      {/* Dropdown sub-nav — collapses to 0 height when closed */}
      <div
        ref={dropdownRef}
        className={`nav-dropdown-space ${analysisDropdownOpen || aiDropdownOpen ? 'open' : ''}`}
      >
        {analysisDropdownOpen && (
          <div className="nav-dropdown-menu" role="group" aria-label={`${stockGroupName} tabs`}>
            {analysisTabs.map(t => (
              <button
                key={t.id}
                id={`tab-${t.id}`}
                role="tab"
                aria-selected={activeTab === t.id}
                aria-controls={`tabpanel-${t.id}`}
                tabIndex={getTabIndex(t.id)}
                className={`nav-dropdown-item ${activeTab === t.id ? 'active' : ''} tab-${t.type}`}
                onClick={() => onTabChange(t.id)}
                onKeyDown={(e) => handleKeyDown(e, t.id)}
              >
                {t.type === 'projection' && <ProjectionIcon />}
                {t.label}
              </button>
            ))}
          </div>
        )}
        {aiDropdownOpen && (
          <div className="nav-dropdown-menu" role="group" aria-label="AI tabs">
            {aiTabs.map(t => (
              <button
                key={t.id}
                id={`tab-${t.id}`}
                role="tab"
                aria-selected={activeTab === t.id}
                aria-controls={`tabpanel-${t.id}`}
                tabIndex={getTabIndex(t.id)}
                className={`nav-dropdown-item ${activeTab === t.id ? 'active' : ''} tab-${t.type}`}
                onClick={() => onTabChange(t.id)}
                onKeyDown={(e) => handleKeyDown(e, t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
