# DESIGN: Printable Habits Tracker

## Problem Statement

Build a single-page printable habits tracker where users define habits, set a date range, and generate a clean table for printing. Supports RTL languages via a direction toggle. Table design is minimal, modern, and grayscale.

## Constraints

- **Print-first** — layout must work cleanly on A4/Letter/A5 paper
- **No backend** — pure client-side, no accounts or sync
- **RTL support** — toggle flips date column position
- **Simplicity** — single page, minimal dependencies
- **Grayscale only** — no color in the table, minimal and modern aesthetic

## Tech Stack

- **Vite + React + TypeScript**
- **Tailwind CSS** — print-friendly utility styling
- **@hello-pangea/dnd** — drag-and-drop habit reordering

## Components

### 1. HabitForm
- Text input + "Add" button
- Draggable habit chips with delete (×) buttons
- State: `habits: { id: string; name: string }[]`

### 2. DateRangePicker
- Two `<input type="date">` fields
- Defaults: today → today + 30 days

### 3. PageSettings
- **Page size selector**: Letter (8.5×11"), A4 (210×297mm), A5 (148×210mm), Legal (8.5×14")
- Sets CSS `@page { size: <width> <height> }` via injected print stylesheet
- **Rows per page input**: Number field (default: 31, i.e. one month)
- When rows-per-page is set, table splits into logical pages for preview
- In print mode, CSS `page-break-after: auto` on row groups handles pagination
- **Show checkboxes toggle**: Toggle to show/hide empty printable checkboxes (☐) in habit cells
  - When enabled: each cell renders an empty checkbox square for manual checking on paper
  - When disabled: cells are blank

### 4. DirectionToggle
- Button toggles `direction: 'ltr' | 'rtl'`
- Sets `dir` attribute on table wrapper

### 5. HabitTable
- **Header**: Day number + date + habit names
- **Body**: One row per day, cells per habit
- `dir="rtl"` naturally flips column order — date moves right
- **Grayscale design**: borders use `gray-300`/`gray-400`, header row uses `gray-100` background, text in `gray-800`/`gray-600`
- **Minimal style**: thin 1px borders, no heavy fills, generous padding, clean sans-serif font
- Row striping with `gray-50` alternating (subtle, print-friendly)
- Habit header cells: uppercase, small font, letter-spacing for modern feel
- **Checkbox cells**: when enabled, render a small empty square (☐) centered in each cell using CSS `border: 1px solid gray-400; width: 14px; height: 14px;`

### 6. PrintButton
- Calls `window.print()`
- Hidden via `@media print`

## Print Mode Behavior

- **Visible**: Only `HabitTable`
- **Hidden**: `HabitForm`, `DateRangePicker`, `PageSettings`, `DirectionToggle`, `PrintButton`
- `@media print` rules:
  - `body { margin: 0; padding: 0; }`
  - Table fills page width
  - `@page { size: <selected>; margin: 10mm; }`
  - `break-inside: avoid` on rows
  - All colors forced to grayscale (`color-adjust: exact; -webkit-print-color-adjust: exact;` for row striping)

## Data Flow

```
Add/remove habits  →  habits[]           →  Table columns
Reorder habits     →  habits[] reordered →  Column order
Set dates          →  startDate/endDate   →  Row count
Set page size      →  pageSize           →  @page CSS rule
Set rows/page      →  rowsPerPage        →  Page break intervals
Toggle checkboxes  →  showCheckboxes     →  Cell content (☐ or blank)
Toggle direction   →  direction           →  dir attribute
```

## Direction Toggle

| Mode | Date column | `dir` |
|------|------------|-------|
| LTR | Left | `dir="ltr"` |
| RTL | Right | `dir="rtl"` |

No conditional rendering — `dir="rtl"` on the container naturally flips column order.

## Table Visual Design (Grayscale)

```
┌──────────────────────────────────────────────┐
│  #   DATE       HABIT 1   HABIT 2   HABIT 3 │  ← gray-100 bg, uppercase
│──────────────────────────────────────────────│
│  1   Mon 01      ☐         ☐         ☐      │  ← white
│  2   Tue 02      ☐         ☐         ☐      │  ← gray-50 striped
│  3   Wed 03      ☐         ☐         ☐      │  ← white
│  ...                                          │
└──────────────────────────────────────────────┘
  Border: gray-300, 1px solid
  Text: gray-800 (headers), gray-600 (body)
  Font: system sans-serif, 12px body, 11px headers
  Checkboxes: 14×14px empty squares, gray-400 border
```

## Error Handling

- Empty habits → "Add habits to get started" message
- Invalid range (end < start) → inline error
- Range > 365 days → warning about print practicality
- Duplicate names → allowed (user's choice)
- Rows per page < 1 or > 100 → clamp to valid range

## Open Questions

1. Persist habits to `localStorage` for refresh survival?
2. Show page break lines in screen preview or only in print?
