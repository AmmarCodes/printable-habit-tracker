import { formatDateLocal, parseDateLocal } from '../utils/date';

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
}

function formatDateForInput(date: Date): string {
  return formatDateLocal(date);
}

export function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: DateRangePickerProps) {
  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onStartDateChange(parseDateLocal(e.target.value));
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onEndDateChange(parseDateLocal(e.target.value));
  };

  const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const isInvalid = daysDiff < 0;
  const isLongRange = daysDiff > 365;

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm text-gray-600 mb-1">Start Date</label>
        <input
          type="date"
          value={formatDateForInput(startDate)}
          onChange={handleStartChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">End Date</label>
        <input
          type="date"
          value={formatDateForInput(endDate)}
          onChange={handleEndChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
        />
      </div>
      {isInvalid && (
        <p className="text-red-500 text-sm">End date must be after start date</p>
      )}
      {!isInvalid && !isLongRange && (
        <p className="text-gray-500 text-sm">{daysDiff + 1} days</p>
      )}
      {isLongRange && (
        <p className="text-amber-600 text-sm">
          Warning: {daysDiff + 1} days may be impractical for printing
        </p>
      )}
    </div>
  );
}