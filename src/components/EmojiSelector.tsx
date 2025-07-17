import React from 'react';
import type { MoodOption } from '../types';
import { MOOD_OPTIONS } from '../types';

interface EmojiSelectorProps {
  selectedMood: MoodOption | null;
  onMoodSelect: (mood: MoodOption) => void;
  disabled?: boolean;
}

export const EmojiSelector: React.FC<EmojiSelectorProps> = ({
  selectedMood,
  onMoodSelect,
  disabled = false,
}) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        How are you feeling today?
      </label>
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {MOOD_OPTIONS.map((mood) => (
          <button
            key={mood.value}
            onClick={() => onMoodSelect(mood)}
            disabled={disabled}
            className={`
              relative p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 
              focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
              hover:scale-105 active:scale-95
              ${
                selectedMood?.value === mood.value
                  ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
            aria-label={`Select ${mood.label} mood`}
            title={mood.label}
          >
            <span className="text-2xl sm:text-3xl block" role="img" aria-hidden="true">
              {mood.emoji}
            </span>
            <span className="text-xs text-gray-600 dark:text-gray-400 mt-1 block">
              {mood.label}
            </span>
            {selectedMood?.value === mood.value && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 dark:bg-blue-400 rounded-full">
                <span className="sr-only">Selected</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}; 