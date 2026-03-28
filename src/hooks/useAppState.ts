import { useState, useEffect, useCallback, useRef } from 'react';
import type { Habit, PageSize, Direction, Locale, DateFormat } from '../types';
import { formatDateLocal, parseDateLocal } from '../utils/date';

interface AppState {
  habits: Habit[];
  startDate: Date;
  endDate: Date;
  pageSize: PageSize;
  rowsPerPage: number;
  showCheckboxes: boolean;
  direction: Direction;
  locale: Locale;
  dateFormat: DateFormat;
}

const STORAGE_KEY = 'appState';
const DEBOUNCE_MS = 500;

// Default dates
function getDefaultDates() {
  const today = new Date();
  const thirtyDaysLater = new Date(today);
  thirtyDaysLater.setDate(today.getDate() + 30);
  return { today, thirtyDaysLater };
}

// Parse saved date strings
function parseDate(dateStr: string | null | undefined): Date | null {
  if (!dateStr) return null;
  const date = parseDateLocal(dateStr);
  return isNaN(date.getTime()) ? null : date;
}

// Migration: move old 'habits' key to new 'appState' key
function runMigration() {
  const oldHabits = localStorage.getItem('habits');
  if (oldHabits && !localStorage.getItem(STORAGE_KEY)) {
    try {
      const habits = JSON.parse(oldHabits);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ habits }));
      localStorage.removeItem('habits');
    } catch (e) {
      console.error('Failed to migrate old habits:', e);
    }
  }
}

// Run migration once on module load
runMigration();

function loadSavedState(): Partial<AppState> | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      const { today, thirtyDaysLater } = getDefaultDates();
      return {
        habits: parsed.habits || [],
        startDate: parseDate(parsed.startDate) || today,
        endDate: parseDate(parsed.endDate) || thirtyDaysLater,
        pageSize: parsed.pageSize || 'A4',
        rowsPerPage: parsed.rowsPerPage || 31,
        showCheckboxes: parsed.showCheckboxes ?? true,
        direction: parsed.direction || 'ltr',
        locale: parsed.locale || 'en',
        dateFormat: parsed.dateFormat || 'default',
      };
    }
  } catch (e) {
    console.error('Failed to load saved state:', e);
  }
  return null;
}

export function useAppState() {
  const savedState = loadSavedState();
  const { today, thirtyDaysLater } = getDefaultDates();

  // State
  const [habits, setHabits] = useState<Habit[]>(savedState?.habits || []);
  const [startDate, setStartDate] = useState<Date>(savedState?.startDate || today);
  const [endDate, setEndDate] = useState<Date>(savedState?.endDate || thirtyDaysLater);
  const [pageSize, setPageSize] = useState<PageSize>(savedState?.pageSize || 'A4');
  const [rowsPerPage, setRowsPerPage] = useState<number>(savedState?.rowsPerPage || 31);
  const [showCheckboxes, setShowCheckboxes] = useState<boolean>(savedState?.showCheckboxes ?? true);
  const [direction, setDirection] = useState<Direction>(savedState?.direction || 'ltr');
  const [locale, setLocale] = useState<Locale>(savedState?.locale || 'en');
  const [dateFormat, setDateFormat] = useState<DateFormat>(savedState?.dateFormat || 'default');

  // Debounced save to localStorage
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Clear pending save
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Debounce the save
    saveTimeoutRef.current = setTimeout(() => {
      const state = {
        habits,
        startDate: formatDateLocal(startDate),
        endDate: formatDateLocal(endDate),
        pageSize,
        rowsPerPage,
        showCheckboxes,
        direction,
        locale,
        dateFormat,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, DEBOUNCE_MS);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [habits, startDate, endDate, pageSize, rowsPerPage, showCheckboxes, direction, locale, dateFormat]);

  // Memoized handlers
  const handleAddHabit = useCallback((name: string) => {
    const id = crypto.randomUUID();
    setHabits(prev => [...prev, { id, name }]);
  }, []);

  const handleRemoveHabit = useCallback((id: string) => {
    setHabits(prev => prev.filter(h => h.id !== id));
  }, []);

  const handleReorderHabits = useCallback((reorderedHabits: Habit[]) => {
    setHabits(reorderedHabits);
  }, []);

  const handleToggleDirection = useCallback(() => {
    setDirection(prev => prev === 'ltr' ? 'rtl' : 'ltr');
  }, []);

  const handleSetStartDate = useCallback((date: Date) => {
    setStartDate(date);
  }, []);

  const handleSetEndDate = useCallback((date: Date) => {
    setEndDate(date);
  }, []);

  const handleSetPageSize = useCallback((size: PageSize) => {
    setPageSize(size);
  }, []);

  const handleSetRowsPerPage = useCallback((rows: number) => {
    setRowsPerPage(rows);
  }, []);

  const handleSetShowCheckboxes = useCallback((show: boolean) => {
    setShowCheckboxes(show);
  }, []);

  const handleSetLocale = useCallback((loc: Locale) => {
    setLocale(loc);
  }, []);

  const handleSetDateFormat = useCallback((format: DateFormat) => {
    setDateFormat(format);
  }, []);

  return {
    // State
    habits,
    startDate,
    endDate,
    pageSize,
    rowsPerPage,
    showCheckboxes,
    direction,
    locale,
    dateFormat,
    // Handlers
    handleAddHabit,
    handleRemoveHabit,
    handleReorderHabits,
    handleToggleDirection,
    handleSetStartDate,
    handleSetEndDate,
    handleSetPageSize,
    handleSetRowsPerPage,
    handleSetShowCheckboxes,
    handleSetLocale,
    handleSetDateFormat,
  };
}