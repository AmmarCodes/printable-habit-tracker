import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { Habit } from '../types';

interface HabitFormProps {
  habits: Habit[];
  onAdd: (name: string) => void;
  onRemove: (id: string) => void;
  onReorder: (habits: Habit[]) => void;
}

export function HabitForm({ habits, onAdd, onRemove, onReorder }: HabitFormProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue('');
    }
  };

  const handleDragEnd = (result: { destination: { index: number } | null; source: { index: number } }) => {
    if (!result.destination) return;
    
    const items = Array.from(habits);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    onReorder(items);
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
          className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          Add
        </button>
      </form>

      {habits.length === 0 ? (
        <p className="text-gray-500 text-sm">Add habits to get started</p>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="habits">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex flex-wrap gap-2"
              >
                {habits.map((habit, index) => (
                  <Draggable key={habit.id} draggableId={habit.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 bg-white border rounded-full text-sm ${
                          snapshot.isDragging
                            ? 'border-gray-400 shadow-md'
                            : 'border-gray-300'
                        }`}
                      >
                        <span>{habit.name}</span>
                        <button
                          onClick={() => onRemove(habit.id)}
                          className="ml-1 w-4 h-4 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors"
                          aria-label={`Remove ${habit.name}`}
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
}