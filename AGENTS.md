# AGENTS.md

Project-specific guidelines for Printable Habits Tracker.

## Build/Lint/Test Commands

```bash
# Development
npm run dev          # Start Vite dev server (localhost:5173)

# Production
npm run build        # TypeScript check + Vite build (outputs to dist/)

# Preview
npm run preview      # Preview production build locally
```

**Note:** No test framework configured. No ESLint/Prettier configured. TypeScript strict mode catches many issues.

## Tech Stack

- **Vite** - Build tool and dev server
- **React 19** - UI framework (functional components, hooks)
- **TypeScript 6** - Type safety (strict mode enabled)
- **Tailwind CSS 4** - Utility-first styling

## Code Style Guidelines

### Imports

Order imports as follows:

1. React imports
2. Type imports (use `import type`)
3. External libraries
4. Internal components/modules
5. CSS imports

```typescript
// 1. React
import { useState, useMemo, useEffect } from 'react';

// 2. Types
import type { Habit, PageSize, Direction } from './types';

// 3. External libraries
import { formatDate } from './utils/date';

// 4. Internal modules
import { HabitForm } from './components/HabitForm';

// 5. CSS
import './index.css';
```

### Components

- Use functional components with explicit props interfaces
- Define props interface above the component with `Props` suffix
- Export components as named exports
- Keep components in `src/components/` directory

```typescript
// Good
interface HabitFormProps {
  habits: Habit[];
  onAdd: (name: string) => void;
  onRemove: (id: string) => void;
}

export function HabitForm({ habits, onAdd, onRemove }: HabitFormProps) {
  // ...
}
```

### Types

- Centralize shared types in `src/types.ts`
- Use `interface` for object shapes
- Use `type` for unions, aliases, and utility types
- Export all types from the types file

```typescript
// src/types.ts
export interface Habit {
  id: string;
  name: string;
  isEmpty?: boolean;
}

export type PageSize = 'Letter' | 'A4' | 'A5' | 'Legal';
export type Direction = 'ltr' | 'rtl';
```

### Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Components | PascalCase | `HabitForm`, `DateRangePicker` |
| Functions | camelCase | `handleAddHabit`, `formatDate` |
| Constants | UPPER_SNAKE_CASE | `ARABIC_DAYS`, `PAGE_SIZES` |
| Props interfaces | PascalCase + Props | `HabitFormProps` |
| Files | PascalCase.tsx | `HabitForm.tsx` |

### Styling

- Use Tailwind utility classes exclusively
- No CSS modules or styled-components
- Use `className` for styling, inline `style` only for dynamic values
- Print styles defined in `src/index.css` under `@media print`

```typescript
// Good - Tailwind utilities
<div className="bg-white rounded-lg shadow-sm p-6">

// Good - Dynamic inline styles for runtime values
<style>{`@page { size: ${pageDimensions[pageSize]}; }`}</style>
```

### State Management

- Use `useState` for local component state
- Use `useEffect` for side effects (localStorage persistence)
- Use `useMemo` for derived/expensive computations
- Persist to `localStorage` under single `appState` key

```typescript
// State with type annotation
const [habits, setHabits] = useState<Habit[]>([]);
const [pageSize, setPageSize] = useState<PageSize>('A4');

// Effect for persistence
useEffect(() => {
  localStorage.setItem('appState', JSON.stringify({ habits, pageSize }));
}, [habits, pageSize]);
```

### Error Handling

- Use try-catch for JSON parsing and localStorage operations
- Provide graceful fallbacks for parse failures
- Log errors to console for debugging

```typescript
const savedState = (() => {
  try {
    const saved = localStorage.getItem('appState');
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Failed to load saved state:', e);
  }
  return null;
})();
```

### File Structure

```
src/
├── App.tsx           # Main app component
├── main.tsx          # Entry point
├── index.css         # Global styles + Tailwind
├── types.ts          # Shared TypeScript types
├── vite-env.d.ts     # Vite type declarations
└── components/
    ├── HabitForm.tsx
    ├── HabitTable.tsx
    ├── DateRangePicker.tsx
    └── ...
```

## TypeScript Configuration

Strict mode enabled with additional checks:

- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `noFallthroughCasesInSwitch: true`

Run `npm run build` to type-check before committing.

## Common Patterns

### Props with Callbacks

```typescript
interface DatePickerProps {
  startDate: Date;
  onStartDateChange: (date: Date) => void;
}
```

### Event Handlers

```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // ...
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};
```

### Conditional Rendering

```typescript
// Early return for empty state
if (habits.length === 0) {
  return <EmptyState />;
}

// Ternary for simple conditions
{showCheckboxes ? <Checkbox /> : null}
```

## Print Optimization

This is a print-focused app. Key considerations:

1. Use `.no-print` class to hide UI elements in print mode
2. Use `@media print` in `index.css` for print-specific styles
3. Tables use `break-before: page` for proper pagination
4. Dynamic `@page` size set via inline styles based on user selection