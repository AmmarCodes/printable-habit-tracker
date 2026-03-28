import { useState, useMemo, useEffect } from 'react';
import type { Habit, PageSize, Direction, Locale } from './types';
import { HabitForm } from './components/HabitForm';
import { DateRangePicker } from './components/DateRangePicker';
import { PageSettingsPanel } from './components/PageSettingsPanel';
import { DirectionToggle } from './components/DirectionToggle';
import { HabitTable } from './components/HabitTable';
import { PrintButton } from './components/PrintButton';
import { LocaleSelector } from './components/LocaleSelector';
import './index.css';

function App() {
  // Habits state
  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('habits');
    return saved ? JSON.parse(saved) : [];
  });

  // Date range state
  const today = new Date();
  const thirtyDaysLater = new Date(today);
  thirtyDaysLater.setDate(today.getDate() + 30);
  
  const [startDate, setStartDate] = useState<Date>(today);
  const [endDate, setEndDate] = useState<Date>(thirtyDaysLater);

  // Page settings state
  const [pageSize, setPageSize] = useState<PageSize>('A4');
  const [rowsPerPage, setRowsPerPage] = useState<number>(31);
  const [showCheckboxes, setShowCheckboxes] = useState<boolean>(true);

  // Direction state
  const [direction, setDirection] = useState<Direction>('ltr');

  // Locale state
  const [locale, setLocale] = useState<Locale>('en');

  // Persist habits to localStorage
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  // Generate date range
  const dates = useMemo(() => {
    const result: Date[] = [];
    const current = new Date(startDate);
    const end = new Date(endDate);
    
    while (current <= end) {
      result.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return result;
  }, [startDate, endDate]);

  // Page size dimensions
  const pageDimensions: Record<PageSize, string> = {
    'Letter': '8.5in 11in',
    'A4': '210mm 297mm',
    'A5': '148mm 210mm',
    'Legal': '8.5in 14in'
  };

  // Handlers
  const handleAddHabit = (name: string) => {
    const id = crypto.randomUUID();
    setHabits(prev => [...prev, { id, name }]);
  };

  const handleRemoveHabit = (id: string) => {
    setHabits(prev => prev.filter(h => h.id !== id));
  };

  const handleReorderHabits = (reorderedHabits: Habit[]) => {
    setHabits(reorderedHabits);
  };

  const handleToggleDirection = () => {
    setDirection(prev => prev === 'ltr' ? 'rtl' : 'ltr');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Print styles for dynamic page size */}
      <style>{`
        @media print {
          @page {
            size: ${pageDimensions[pageSize]};
            margin: 10mm;
          }
        }
      `}</style>
      
      {/* Main content */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <header className="mb-8 no-print flex items-center gap-3">
          <img src="/favicon.svg" alt="Logo" className="w-14 h-14" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Printable Habits Tracker</h1>
            <p className="text-gray-600 mt-1">Define your habits, set your date range, and print a clean tracker.</p>
          </div>
        </header>

        {/* Controls - hidden in print */}
        <div className="space-y-6 no-print">
          {/* Habit Form */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Habits</h2>
            <HabitForm 
              habits={habits}
              onAdd={handleAddHabit}
              onRemove={handleRemoveHabit}
              onReorder={handleReorderHabits}
            />
          </section>

          {/* Settings Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Date Range */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Date Range</h2>
              <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
              />
            </section>

            {/* Page Settings */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Page Settings</h2>
              <PageSettingsPanel
                pageSize={pageSize}
                rowsPerPage={rowsPerPage}
                showCheckboxes={showCheckboxes}
                onPageSizeChange={setPageSize}
                onRowsPerPageChange={setRowsPerPage}
                onShowCheckboxesChange={setShowCheckboxes}
              />
            </section>

            {/* Direction & Print */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Layout & Print</h2>
              <div className="space-y-4">
                <LocaleSelector locale={locale} onChange={setLocale} />
                <DirectionToggle direction={direction} onToggle={handleToggleDirection} />
                <PrintButton />
              </div>
            </section>
          </div>
        </div>

        {/* Habit Table */}
        <section className="mt-8">
          <HabitTable
            habits={habits}
            dates={dates}
            rowsPerPage={rowsPerPage}
            showCheckboxes={showCheckboxes}
            direction={direction}
            locale={locale}
          />
        </section>
      </div>
    </div>
  );
}

export default App;