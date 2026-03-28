import { useState } from 'react';
import type { Habit } from '../types';

interface HabitFormProps {
  habits: Habit[];
  onAdd: (name: string) => void;
  onRemove: (id: string) => void;
}

export function HabitForm({ habits, onAdd, onRemove }: HabitFormProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue('');
    }
  };

  const handleAddEmpty = () => {
    onAdd(''); // Empty habit name
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new habit..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors cursor-pointer"
        >
          Add
        </button>
        <button
          type="button"
          onClick={handleAddEmpty}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors cursor-pointer"
          title="Add empty column to fill in by hand"
        >
          Add Empty
        </button>
      </form>

      {habits.length === 0 ? (
        <p className="text-gray-500 text-sm">Add habits to get started</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {habits.map((habit) => (
            <div
              key={habit.id}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-300 rounded-full text-sm"
            >
              <span className={!habit.name ? 'text-gray-400 italic' : ''}>
                {habit.name || '(empty)'}
              </span>
              <button
                onClick={() => onRemove(habit.id)}
                className="ml-1 w-4 h-4 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
                aria-label={`Remove ${habit.name || 'empty habit'}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}