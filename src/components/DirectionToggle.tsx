import type { Direction } from "../types";

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
      <span className="text-gray-700 font-medium">
        {direction === "ltr" ? "Left → Right" : "Right → Left"}
      </span>
    </button>
  );
}

