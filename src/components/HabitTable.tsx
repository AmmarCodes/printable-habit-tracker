import type { Habit, Direction } from '../types';

interface HabitTableProps {
  habits: Habit[];
  dates: Date[];
  rowsPerPage: number;
  showCheckboxes: boolean;
  direction: Direction;
}

function formatDate(date: Date): string {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${days[date.getDay()]} ${months[date.getMonth()]} ${String(date.getDate()).padStart(2, '0')}`;
}

function formatDayNumber(_date: Date, index: number): string {
  return String(index + 1);
}

export function HabitTable({
  habits,
  dates,
  rowsPerPage,
  showCheckboxes,
  direction,
}: HabitTableProps) {
  if (habits.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
        Add habits to get started
      </div>
    );
  }

  // Split dates into pages based on rowsPerPage
  const pages: Date[][] = [];
  for (let i = 0; i < dates.length; i += rowsPerPage) {
    pages.push(dates.slice(i, i + rowsPerPage));
  }

  return (
    <div dir={direction} className="space-y-8">
      {pages.map((pageDates, pageIndex) => (
        <div
          key={pageIndex}
          className="print-table bg-white rounded-lg shadow-sm overflow-hidden"
        >
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-2 py-2 text-center text-xs font-semibold text-gray-800 uppercase tracking-wide w-px whitespace-nowrap">
                  #
                </th>
                <th className="border border-gray-300 px-2 py-2 text-left text-xs font-semibold text-gray-800 uppercase tracking-wide w-px whitespace-nowrap">
                  Date
                </th>
                {habits.map((habit) => (
                  <th
                    key={habit.id}
                    className="border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-800 uppercase tracking-wide"
                  >
                    {habit.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageDates.map((date, rowIndex) => {
                const globalIndex = pageIndex * rowsPerPage + rowIndex;
                const isStriped = rowIndex % 2 === 1;
                return (
                  <tr
                    key={date.toISOString()}
                    className={isStriped ? 'bg-gray-50' : 'bg-white'}
                  >
                    <td className="border border-gray-300 px-2 py-2 text-sm text-gray-600 text-center w-px whitespace-nowrap">
                      {formatDayNumber(date, globalIndex)}
                    </td>
                    <td className="border border-gray-300 px-2 py-2 text-sm text-gray-600 w-px whitespace-nowrap">
                      {formatDate(date)}
                    </td>
                    {habits.map((habit) => (
                      <td
                        key={habit.id}
                        className="border border-gray-300 px-3 py-2 text-center"
                      >
                        {showCheckboxes ? (
                          <span className="inline-block w-3.5 h-3.5 border border-gray-400 align-middle" />
                        ) : (
                          ''
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}