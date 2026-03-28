import type { PageSize } from '../types';

interface PageSettingsPanelProps {
  pageSize: PageSize;
  rowsPerPage: number;
  showCheckboxes: boolean;
  onPageSizeChange: (size: PageSize) => void;
  onRowsPerPageChange: (rows: number) => void;
  onShowCheckboxesChange: (show: boolean) => void;
}

const PAGE_SIZES: { value: PageSize; label: string; description: string }[] = [
  { value: 'Letter', label: 'Letter', description: '8.5" × 11"' },
  { value: 'A4', label: 'A4', description: '210mm × 297mm' },
  { value: 'A5', label: 'A5', description: '148mm × 210mm' },
  { value: 'Legal', label: 'Legal', description: '8.5" × 14"' },
];

export function PageSettingsPanel({
  pageSize,
  rowsPerPage,
  showCheckboxes,
  onPageSizeChange,
  onRowsPerPageChange,
  onShowCheckboxesChange,
}: PageSettingsPanelProps) {
  const handleRowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      // Clamp to valid range
      const clamped = Math.max(1, Math.min(100, value));
      onRowsPerPageChange(clamped);
    }
  };

  return (
    <div className="space-y-4">
      {/* Page Size */}
      <div>
        <label className="block text-sm text-gray-600 mb-2">Page Size</label>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(e.target.value as PageSize)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
        >
          {PAGE_SIZES.map((size) => (
            <option key={size.value} value={size.value}>
              {size.label} ({size.description})
            </option>
          ))}
        </select>
      </div>

      {/* Rows Per Page */}
      <div>
        <label className="block text-sm text-gray-600 mb-2">Rows Per Page</label>
        <input
          type="number"
          min="1"
          max="100"
          value={rowsPerPage}
          onChange={handleRowsChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
        />
        <p className="text-gray-500 text-xs mt-1">Default: 31 (one month)</p>
      </div>

      {/* Show Checkboxes */}
      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showCheckboxes}
            onChange={(e) => onShowCheckboxesChange(e.target.checked)}
            className="w-4 h-4 border-gray-300 rounded focus:ring-2 focus:ring-gray-400"
          />
          <span className="text-sm text-gray-700">Show Checkboxes</span>
        </label>
        <p className="text-gray-500 text-xs mt-1 ml-6">
          Empty boxes for manual checking
        </p>
      </div>
    </div>
  );
}