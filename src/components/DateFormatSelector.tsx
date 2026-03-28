import type { DateFormat } from '../types';

interface DateFormatSelectorProps {
  dateFormat: DateFormat;
  onChange: (format: DateFormat) => void;
}

const DATE_FORMATS: { value: DateFormat; label: string; example: string }[] = [
  { value: 'default', label: 'Default', example: 'Mon Jan 01' },
  { value: 'iso', label: 'ISO', example: '2024-01-01' },
  { value: 'dayName', label: 'Day Only', example: 'Monday' },
];

export function DateFormatSelector({ dateFormat, onChange }: DateFormatSelectorProps) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-2">Date Format</label>
      <select
        value={dateFormat}
        onChange={(e) => onChange(e.target.value as DateFormat)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent cursor-pointer"
      >
        {DATE_FORMATS.map((format) => (
          <option key={format.value} value={format.value}>
            {format.label} ({format.example})
          </option>
        ))}
      </select>
    </div>
  );
}