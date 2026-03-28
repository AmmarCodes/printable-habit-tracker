import type { Habit, Direction, Locale, DateFormat } from "../types";

interface HabitTableProps {
  habits: Habit[];
  dates: Date[];
  rowsPerPage: number;
  showCheckboxes: boolean;
  direction: Direction;
  locale: Locale;
  dateFormat: DateFormat;
}

const ARABIC_DAYS = [
  "الأحد",
  "الإثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];
const ARABIC_MONTHS = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

const ENGLISH_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const ENGLISH_DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const ENGLISH_MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function formatDate(date: Date, locale: Locale, dateFormat: DateFormat): string {
  // ISO format - same for all locales
  if (dateFormat === 'iso') {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Day name only
  if (dateFormat === 'dayName') {
    if (locale === 'ar') {
      return ARABIC_DAYS[date.getDay()];
    }
    return ENGLISH_DAYS[date.getDay()];
  }

  // Default format
  if (locale === 'ar') {
    const dayName = ARABIC_DAYS[date.getDay()];
    const dayNum = String(date.getDate()).padStart(2, '0');
    const monthName = ARABIC_MONTHS[date.getMonth()];
    return `${dayName} ${dayNum} ${monthName}`;
  }

  return `${ENGLISH_DAYS_SHORT[date.getDay()]} ${ENGLISH_MONTHS_SHORT[date.getMonth()]} ${String(date.getDate()).padStart(2, '0')}`;
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
  locale,
  dateFormat,
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
          className="print-table bg-white shadow-sm overflow-hidden"
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
                    {habit.name || '\u00A0'}
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
                    className={isStriped ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="border border-gray-300 px-2 py-2 text-sm text-gray-600 text-center w-px whitespace-nowrap">
                      {formatDayNumber(date, globalIndex)}
                    </td>
                    <td className="border border-gray-300 px-2 py-2 text-sm text-gray-600 w-px whitespace-nowrap">
                      {formatDate(date, locale, dateFormat)}
                    </td>
                    {habits.map((habit) => (
                      <td
                        key={habit.id}
                        className="border border-gray-300 px-3 py-2 text-center"
                      >
                        {showCheckboxes ? (
                          <span className="inline-block w-3.5 h-3.5 border border-gray-400 align-middle" />
                        ) : (
                          ""
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

