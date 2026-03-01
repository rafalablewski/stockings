# Stock Page Tab Navigation — Comprehensive Fix Plan

## Overview

This plan addresses every issue identified in the UX/UI, accessibility, styling, and architecture review of the stock page tab navigation. Changes are organized into 7 phases, ordered by dependency (foundational changes first).

---

## Phase 1: Extract Shared `<StockNavigation>` Component

**Problem:** The tab navigation JSX, state management, and rendering logic is copy-pasted identically across three files (ASTS.tsx:985-1054, BMNR.tsx:1048-1117, CRCL.tsx:3450-3518). Only the tab definitions array and the stock-specific group name (`"ASTS Analysis"`, `"BMNR Analysis"`, `"CRCL Analysis"`) differ. Any fix applied later in this plan would need to be repeated 3 times without this extraction.

**Solution:** Create `src/components/shared/StockNavigation.tsx`

### New component interface:

```tsx
interface Tab {
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
```

### Implementation details:

1. **Create `src/components/shared/StockNavigation.tsx`** containing:
   - The `<nav className="nav">` element and all its children
   - The `<div className="nav-dropdown-space">` element and all its children
   - Internal state for `analysisDropdownOpen` and `aiDropdownOpen` (these are nav-local state, not needed by parent)
   - All the tab filtering/rendering logic currently duplicated

2. **Update ASTS.tsx** (~lines 985-1054):
   - Remove the inline `<nav>` block and `<div className="nav-dropdown-space">` block
   - Remove `analysisDropdownOpen` and `aiDropdownOpen` state declarations
   - Replace with: `<StockNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} stockGroupName="ASTS Analysis" />`

3. **Update BMNR.tsx** (~lines 1048-1117):
   - Same removal and replacement with `stockGroupName="BMNR Analysis"`

4. **Update CRCL.tsx** (~lines 3450-3518):
   - Same removal and replacement with `stockGroupName="CRCL Analysis"`

**Files changed:**
- `src/components/shared/StockNavigation.tsx` (new)
- `src/components/stocks/ASTS.tsx`
- `src/components/stocks/BMNR.tsx`
- `src/components/stocks/CRCL.tsx`

---

## Phase 2: Add Full ARIA Roles & Attributes

**Problem:** The navigation uses plain `<button>` elements with no semantic relationship to the content panels they control. Screen readers see a list of generic buttons. There are no `role="tablist"`, `role="tab"`, `aria-selected`, `role="tabpanel"`, `aria-controls`, or `aria-labelledby` attributes.

**Solution:** Add complete WAI-ARIA Tabs pattern to `StockNavigation.tsx` (the newly extracted component).

### Changes to `StockNavigation.tsx`:

1. **`<nav>` element:**
   - Add `role="tablist"`
   - Add `aria-label="Stock analysis sections"`

2. **Each tab `<button>` (both main nav-btn and dropdown items):**
   - Add `role="tab"`
   - Add `aria-selected={activeTab === t.id}`
   - Add `aria-controls={`tabpanel-${t.id}`}`
   - Add `id={`tab-${t.id}`}`

3. **Dropdown trigger buttons:**
   - Add `aria-expanded={dropdownOpen}`
   - Add `aria-haspopup="true"`
   - Change the `↕` character to a proper chevron (addressed in Phase 5 below, but the ARIA goes in now)

4. **Dropdown menus (`nav-dropdown-menu`):**
   - Add `role="group"`
   - Add `aria-label` matching the group name (e.g., `aria-label="ASTS Analysis tabs"`)

### Changes to each stock component (ASTS.tsx, BMNR.tsx, CRCL.tsx):

5. **Wrap each tab content panel** in a container with:
   - `role="tabpanel"`
   - `id={`tabpanel-${activeTab}`}`
   - `aria-labelledby={`tab-${activeTab}`}`
   - `tabIndex={0}` (to make the panel focusable for keyboard users who Tab past the tab bar)

   This means changing the pattern from:
   ```tsx
   {activeTab === 'overview' && <OverviewTab ... />}
   ```
   to:
   ```tsx
   {activeTab === 'overview' && (
     <div role="tabpanel" id="tabpanel-overview" aria-labelledby="tab-overview" tabIndex={0}>
       <OverviewTab ... />
     </div>
   )}
   ```

   Since there are ~15-18 of these per stock file, create a small helper wrapper:
   ```tsx
   // In StockNavigation.tsx, export a helper:
   export function TabPanel({ id, children }: { id: string; children: React.ReactNode }) {
     return (
       <div role="tabpanel" id={`tabpanel-${id}`} aria-labelledby={`tab-${id}`} tabIndex={0}>
         {children}
       </div>
     );
   }
   ```

   Then in each stock component:
   ```tsx
   {activeTab === 'overview' && <TabPanel id="overview"><OverviewTab ... /></TabPanel>}
   ```

**Files changed:**
- `src/components/shared/StockNavigation.tsx`
- `src/components/stocks/ASTS.tsx`
- `src/components/stocks/BMNR.tsx`
- `src/components/stocks/CRCL.tsx`

---

## Phase 3: Add Keyboard Navigation

**Problem:** Users must Tab through 11+ buttons to reach tabs on the right side. The WAI-ARIA Tabs pattern requires arrow key navigation between tabs, plus Home/End support.

**Solution:** Add a `useTabKeyboardNav` hook or inline `onKeyDown` handler in `StockNavigation.tsx`.

### Implementation:

1. **Add `onKeyDown` handler to each button with `role="tab"`:**

   ```tsx
   const handleTabKeyDown = (e: React.KeyboardEvent, tabId: string) => {
     const visibleTabs = getVisibleTabs(); // all tabs currently shown in the main bar + open dropdown
     const currentIndex = visibleTabs.findIndex(t => t.id === tabId);

     let nextIndex: number | null = null;

     switch (e.key) {
       case 'ArrowRight':
       case 'ArrowDown':
         e.preventDefault();
         nextIndex = (currentIndex + 1) % visibleTabs.length;
         break;
       case 'ArrowLeft':
       case 'ArrowUp':
         e.preventDefault();
         nextIndex = (currentIndex - 1 + visibleTabs.length) % visibleTabs.length;
         break;
       case 'Home':
         e.preventDefault();
         nextIndex = 0;
         break;
       case 'End':
         e.preventDefault();
         nextIndex = visibleTabs.length - 1;
         break;
     }

     if (nextIndex !== null) {
       const nextTab = visibleTabs[nextIndex];
       onTabChange(nextTab.id);
       // Focus the next tab button
       document.getElementById(`tab-${nextTab.id}`)?.focus();
     }
   };
   ```

2. **Set `tabIndex` properly on tab buttons:**
   - Active tab: `tabIndex={0}`
   - Inactive tabs: `tabIndex={-1}`
   - This implements "roving tabindex" — Tab key moves focus into the tab bar (landing on the active tab), then arrow keys move between tabs, and Tab again moves into the panel content.

3. **Dropdown trigger special handling:**
   - Arrow keys on the dropdown trigger should open the dropdown and move focus into its first item
   - Escape key when inside a dropdown should close it and return focus to the trigger

**Files changed:**
- `src/components/shared/StockNavigation.tsx`

---

## Phase 4: Add Focus-Visible Styles

**Problem:** No `:focus` or `:focus-visible` styles defined. Keyboard users get the browser default (or nothing after CSS reset). The existing styles only define `:hover`.

**Solution:** Add focus styles to `stock-model-styles.ts`.

### CSS additions (in `stock-model-styles.ts`):

```css
/* Focus styles for keyboard navigation */
.nav-btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  color: var(--text);
  background: var(--surface2);
}

.nav-btn.active:focus-visible {
  outline-color: var(--text);
}

.nav-dropdown-trigger:focus-visible {
  outline: 2px solid var(--violet);
  outline-offset: 2px;
}

.nav-dropdown-item:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: -2px;
  color: var(--text);
  background: var(--surface2);
}
```

This uses `:focus-visible` (not `:focus`) so mouse clicks don't show the focus ring — only keyboard navigation does.

**Files changed:**
- `src/components/stocks/stock-model-styles.ts` (after line ~256 for nav-btn, after ~338 for dropdown items)

---

## Phase 5: Fix Dropdown UX Issues

### 5a: Replace `↕` with proper chevron

**Problem:** The `↕` (up-down arrow) character suggests "sort" or "resize", not "expand/collapse". Screen readers may read it as "up down arrow" which is confusing.

**Solution:** Replace `↕` with a CSS-rotatable chevron SVG in `StockNavigation.tsx`:

```tsx
<span
  className={`nav-dropdown-chevron ${isOpen ? 'open' : ''}`}
  aria-hidden="true"
>
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
</span>
```

Add CSS in `stock-model-styles.ts`:
```css
.nav-dropdown-chevron {
  display: inline-flex;
  transition: transform 0.2s ease;
}
.nav-dropdown-chevron.open {
  transform: rotate(180deg);
}
```

### 5b: Add visual state indicator to dropdown trigger

**Problem:** The dropdown trigger doesn't visually change when opened (only when a child tab is selected via `.active`). Users can't tell if it's expanded or collapsed.

**Solution:** Add an `.open` class to the trigger button when its dropdown is expanded:

```tsx
className={`nav-btn nav-dropdown-trigger ${isActive ? 'active' : ''} ${isOpen ? 'open' : ''}`}
```

Add CSS:
```css
.nav-dropdown-trigger.open {
  background: var(--surface2);
  color: var(--text);
  border-color: var(--violet);
}
```

### 5c: Animate dropdown open/close

**Problem:** When opening one dropdown and implicitly closing another, the swap happens instantly with no visual feedback. Items just appear/disappear.

**Solution:** Add a subtle transition to dropdown content appearance:

```css
.nav-dropdown-menu {
  animation: fadeSlideIn 0.15s ease-out;
}

@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

Note: This animation will automatically respect `prefers-reduced-motion: reduce` because of the existing global rule at line 1155-1164 that sets `animation-duration: 0.01ms !important`.

### 5d: Close dropdown on outside click

**Problem:** Dropdowns only close when the trigger is clicked again or when the other dropdown is opened. Clicking elsewhere on the page leaves them open.

**Solution:** Add a `useEffect` in `StockNavigation.tsx` with a click-outside listener:

```tsx
useEffect(() => {
  if (!analysisDropdownOpen && !aiDropdownOpen) return;

  const handleClickOutside = (e: MouseEvent) => {
    if (navRef.current && !navRef.current.contains(e.target as Node) &&
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setAnalysisDropdownOpen(false);
      setAiDropdownOpen(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, [analysisDropdownOpen, aiDropdownOpen]);
```

Also add Escape key to close:
```tsx
// In the onKeyDown handler
case 'Escape':
  if (analysisDropdownOpen || aiDropdownOpen) {
    setAnalysisDropdownOpen(false);
    setAiDropdownOpen(false);
    // Return focus to the trigger that opened it
  }
  break;
```

**Files changed:**
- `src/components/shared/StockNavigation.tsx`
- `src/components/stocks/stock-model-styles.ts`

---

## Phase 6: Collapse Empty Dropdown Space

**Problem:** The `.nav-dropdown-space` is always rendered at 48px height, even when both dropdowns are closed. This wastes vertical space on every page view and shows a thin empty bar with a border-bottom.

**Solution:** Animate the height to 0 when both dropdowns are closed.

### CSS change in `stock-model-styles.ts`:

Replace the current `.nav-dropdown-space` styles (lines 301-313):

```css
/* Reserved space below nav for dropdown content */
.nav-dropdown-space {
  height: 0;
  padding: 0 64px;
  background: var(--bg);
  border-bottom: 1px solid transparent;
  display: flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;
  transition: height 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}
.nav-dropdown-space.open {
  height: 48px;
  background: var(--surface);
  border-bottom-color: var(--border);
}
```

### Responsive updates:

Update the mobile overrides at 768px (line ~843-848):
```css
.nav-dropdown-space {
  padding: 0 16px;
}
.nav-dropdown-space.open {
  height: 44px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
```

Update 480px (line ~1043-1046):
```css
.nav-dropdown-space {
  padding: 0 12px;
}
.nav-dropdown-space.open {
  height: 40px;
}
```

**Files changed:**
- `src/components/stocks/stock-model-styles.ts`

---

## Phase 7: Add Non-Color Tab Type Indicator

**Problem:** The mint vs accent vs violet left-border is the *only* way to distinguish tracking tabs from projection tabs. Users with color vision deficiency may not perceive this difference.

**Solution:** Add a subtle text prefix/icon as a secondary indicator.

### Approach:

Add a small label badge before the tab text for projection tabs only (tracking is the "default" so needs no extra marking):

In `StockNavigation.tsx`, modify the button rendering:

```tsx
<button
  key={t.id}
  className={`nav-btn ${activeTab === t.id ? 'active' : ''} tab-${t.type}`}
  ...
>
  {t.type === 'projection' && (
    <span className="tab-type-badge" aria-label="Projection model">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
        <path d="M1 9L5 1L9 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  )}
  {t.label}
</button>
```

Add CSS:
```css
.tab-type-badge {
  display: inline-flex;
  align-items: center;
  opacity: 0.5;
}
.nav-btn.active .tab-type-badge {
  opacity: 0.8;
}
```

This adds a tiny upward-triangle icon (suggesting "projection/forecast") before projection tabs. It's visible regardless of color vision and provides a shape-based differentiator alongside the color coding.

**Files changed:**
- `src/components/shared/StockNavigation.tsx`
- `src/components/stocks/stock-model-styles.ts`

---

## Phase 8: Fix High-DPI Border Bug

**Problem:** The Retina/high-DPI media query at line 1149-1151 sets `.nav-btn { border-width: 3px; }` which applies to ALL borders (top, right, bottom, left), not just the left indicator border. On non-Retina the button has `border: 1px solid transparent` with `border-left: 3px solid <color>`. On Retina, all 4 borders become 3px, creating a thick overall border that wasn't intended.

**Solution:** Change the high-DPI rule to target only the left border:

```css
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .card, .highlight {
    border-width: 0.5px;
  }
  .nav-btn {
    border-left-width: 3px;
  }
}
```

**Files changed:**
- `src/components/stocks/stock-model-styles.ts` (line 1150)

---

## Phase 9: Consistent Active State Styling

**Problem:** In the main nav, the active tab gets a solid background (`background: var(--accent)`, `color: var(--bg)`) — a strong, bold treatment. In the dropdown, the active item gets a dim background (`background: var(--accent-dim)`, `color: var(--accent)`) — a subtle treatment. This inconsistency creates confusion about which item is "more selected."

**Solution:** Make dropdown items use the same active style as main nav buttons, but slightly smaller to fit the dropdown's tighter visual space:

```css
.nav-dropdown-item.active {
  color: var(--bg);
  background: var(--accent);
  font-weight: 600;
}
.nav-dropdown-item.tab-tracking.active {
  background: var(--mint);
  color: var(--bg);
}
.nav-dropdown-item.tab-projection.active {
  background: var(--accent);
  color: var(--bg);
}
```

**Files changed:**
- `src/components/stocks/stock-model-styles.ts` (lines 336-339)

---

## Phase 10: URL Hash Routing for Tabs

**Problem:** Tab state is purely in React `useState`. This means:
- Browser back button doesn't work for tab navigation
- Can't share a link to a specific tab (e.g., `/stocks/ASTS#model`)
- Page refresh always resets to Overview
- For a research tool, this is a significant gap

**Solution:** Sync `activeTab` with the URL hash.

### Implementation in each stock component (ASTS.tsx, BMNR.tsx, CRCL.tsx):

Replace the simple `useState`:
```tsx
const [activeTab, setActiveTab] = useState('overview');
```

With hash-synced state:
```tsx
const getInitialTab = () => {
  if (typeof window === 'undefined') return 'overview';
  const hash = window.location.hash.slice(1); // remove '#'
  return tabs.some(t => t.id === hash) ? hash : 'overview';
};

const [activeTab, setActiveTabState] = useState(getInitialTab);

const setActiveTab = useCallback((tabId: string) => {
  setActiveTabState(tabId);
  window.history.pushState(null, '', `#${tabId}`);
}, []);

// Listen for browser back/forward navigation
useEffect(() => {
  const handlePopState = () => {
    const hash = window.location.hash.slice(1);
    if (tabs.some(t => t.id === hash)) {
      setActiveTabState(hash);
    } else {
      setActiveTabState('overview');
    }
  };
  window.addEventListener('popstate', handlePopState);
  return () => window.removeEventListener('popstate', handlePopState);
}, []);
```

Note: This uses `pushState` rather than directly setting `location.hash` to avoid a scroll-to-top jump. The `popstate` listener handles back/forward. Since Next.js doesn't use `useRouter` in these components currently (confirmed: no router imports exist), this vanilla approach is safe and won't conflict with Next.js routing.

Since this logic will be the same across all three stock components, extract it as a hook:

**Create `src/hooks/useHashTab.ts`:**
```tsx
export function useHashTab(validIds: string[], defaultId: string = 'overview') {
  // ... the logic above
  return [activeTab, setActiveTab] as const;
}
```

Then in each stock component:
```tsx
const [activeTab, setActiveTab] = useHashTab(tabs.map(t => t.id));
```

**Files changed:**
- `src/hooks/useHashTab.ts` (new)
- `src/components/stocks/ASTS.tsx`
- `src/components/stocks/BMNR.tsx`
- `src/components/stocks/CRCL.tsx`

---

## Summary: All Files Changed

| File | Phases | Type |
|------|--------|------|
| `src/components/shared/StockNavigation.tsx` | 1, 2, 3, 5a-d, 7 | **New** |
| `src/hooks/useHashTab.ts` | 10 | **New** |
| `src/components/stocks/stock-model-styles.ts` | 4, 5a-c, 6, 7, 8, 9 | Edit |
| `src/components/stocks/ASTS.tsx` | 1, 2, 10 | Edit |
| `src/components/stocks/BMNR.tsx` | 1, 2, 10 | Edit |
| `src/components/stocks/CRCL.tsx` | 1, 2, 10 | Edit |

## Execution Order

Phases should be executed in order because:
- Phase 1 (extract component) must come first — all subsequent changes target the extracted component
- Phase 2 (ARIA) must come before Phase 3 (keyboard nav) — keyboard nav depends on the IDs and roles
- Phases 4-9 are independent of each other but all depend on Phase 1
- Phase 10 (URL routing) is independent and can be done at any point after Phase 1

## What This Does NOT Change

- No changes to tab content/panels themselves
- No changes to the global Navigation component in `layout.tsx`
- No changes to the hero header or stats row
- No changes to the tab definitions arrays (those stay in each stock component)
- No new dependencies or packages
