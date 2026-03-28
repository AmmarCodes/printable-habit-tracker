import type { Locale } from '../types';

interface LocaleSelectorProps {
  locale: Locale;
  onChange: (locale: Locale) => void;
}

const LOCALES: { value: Locale; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'ar', label: 'العربية' },
];

export function LocaleSelector({ locale, onChange }: LocaleSelectorProps) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-2">Date Language</label>
      <select
        value={locale}
        onChange={(e) => onChange(e.target.value as Locale)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
      >
        {LOCALES.map((loc) => (
          <option key={loc.value} value={loc.value}>
            {loc.label}
          </option>
        ))}
      </select>
    </div>
  );
}