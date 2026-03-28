import type { Direction } from '../types';

interface DirectionToggleProps {
  direction: Direction;
  onToggle: () => void;
}

export function DirectionToggle({ direction, onToggle }: DirectionToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {direction === 'ltr' ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        )}
      </svg>
      <span className="text-gray-700 font-medium">
        {direction === 'ltr' ? 'LTR (Left → Right)' : 'RTL (Right → Left)'}
      </span>
    </button>
  );
}