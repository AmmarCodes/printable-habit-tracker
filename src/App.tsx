import { useMemo } from 'react';
import type { PageSize } from './types';
import { useAppState } from './hooks/useAppState';
import { HabitForm } from './components/HabitForm';
import { DateRangePicker } from './components/DateRangePicker';
import { PageSettingsPanel } from './components/PageSettingsPanel';
import { DirectionToggle } from './components/DirectionToggle';
import { HabitTable } from './components/HabitTable';
import { PrintButton } from './components/PrintButton';
import { LocaleSelector } from './components/LocaleSelector';
import { DateFormatSelector } from './components/DateFormatSelector';
import './index.css';

// Page size dimensions for print CSS
const PAGE_DIMENSIONS: Record<PageSize, string> = {
  'Letter': '8.5in 11in',
  'A4': '210mm 297mm',
  'A5': '148mm 210mm',
  'Legal': '8.5in 14in'
};

function App() {
  const {
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
  } = useAppState();

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Print styles for dynamic page size */}
      <style>{`
        @media print {
          @page {
            size: ${PAGE_DIMENSIONS[pageSize]};
            margin: 10mm;
          }
        }
      `}</style>
      
      {/* Main content */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <header className="mb-8 no-print flex items-center gap-3">
          <img src="/favicon.svg" alt="Logo" className="w-14 h-14" />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800">Printable Habits Tracker</h1>
            <p className="text-gray-600 mt-1">Define your habits, set your date range, and print a clean tracker.</p>
          </div>
          <a
            href="https://github.com/ammaralk/printable-habits"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-700 transition-colors"
            title="View on GitHub"
            aria-label="View on GitHub"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
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
            {/* Date Settings */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Date Settings</h2>
              <div className="space-y-4">
                <DateRangePicker
                  startDate={startDate}
                  endDate={endDate}
                  onStartDateChange={handleSetStartDate}
                  onEndDateChange={handleSetEndDate}
                />
                <DateFormatSelector dateFormat={dateFormat} onChange={handleSetDateFormat} />
              </div>
            </section>

            {/* Page Settings */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Page Settings</h2>
              <PageSettingsPanel
                pageSize={pageSize}
                rowsPerPage={rowsPerPage}
                showCheckboxes={showCheckboxes}
                onPageSizeChange={handleSetPageSize}
                onRowsPerPageChange={handleSetRowsPerPage}
                onShowCheckboxesChange={handleSetShowCheckboxes}
              />
            </section>

            {/* Layout & Print */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Layout & Print</h2>
              <div className="space-y-4">
                <LocaleSelector locale={locale} onChange={handleSetLocale} />
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
            dateFormat={dateFormat}
          />
        </section>

        {/* Footer - hidden in print */}
        <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500 no-print">
          <p>
            Developed by{' '}
            <a
              href="https://github.com/ammaralk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Ammar Alakkad
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;