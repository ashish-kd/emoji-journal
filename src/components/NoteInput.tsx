import React from 'react';

interface NoteInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const NoteInput: React.FC<NoteInputProps> = ({
  value,
  onChange,
  disabled = false,
  placeholder = "What's on your mind today? (optional)",
}) => {
  return (
    <div className="w-full">
      <label 
        htmlFor="journal-note" 
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        Your thoughts
      </label>
      <textarea
        id="journal-note"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        rows={4}
        className={`
          w-full px-3 py-2 border rounded-lg resize-none
          text-gray-900 dark:text-gray-100
          bg-white dark:bg-gray-800
          border-gray-300 dark:border-gray-600
          placeholder-gray-500 dark:placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent
          transition-colors duration-200
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        aria-describedby="note-description"
      />
      <p id="note-description" className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        Share any thoughts, reflections, or what happened today
      </p>
    </div>
  );
}; 