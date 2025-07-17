import React, { useState } from 'react';
import dayjs from 'dayjs';
import type { JournalEntry, MoodOption } from '../types';
import { MOOD_OPTIONS } from '../types';

interface EntryDisplayProps {
  entries: JournalEntry[];
  onEdit: (entry: JournalEntry) => void;
  onDelete: (entryId: string) => void;
}

interface EditFormProps {
  entry: JournalEntry;
  onSave: (entry: JournalEntry) => void;
  onCancel: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ entry, onSave, onCancel }) => {
  const [mood, setMood] = useState<MoodOption>(entry.mood);
  const [note, setNote] = useState(entry.note);

  const handleSave = () => {
    onSave({
      ...entry,
      mood,
      note,
      timestamp: Date.now(),
    });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Change mood
        </label>
        <div className="flex flex-wrap gap-2">
          {MOOD_OPTIONS.map((moodOption) => (
            <button
              key={moodOption.value}
              onClick={() => setMood(moodOption)}
              className={`
                p-2 rounded-lg border transition-all duration-200
                ${
                  mood.value === moodOption.value
                    ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
                }
              `}
              title={moodOption.label}
            >
              <span className="text-lg" role="img" aria-hidden="true">
                {moodOption.emoji}
              </span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Edit note
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          placeholder="Your thoughts..."
        />
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export const EntryDisplay: React.FC<EntryDisplayProps> = ({
  entries,
  onEdit,
  onDelete,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleEdit = (entry: JournalEntry) => {
    onEdit(entry);
    setEditingId(null);
  };

  const handleDelete = (entryId: string) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      onDelete(entryId);
    }
  };

  if (entries.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">📖</div>
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
          No entries yet
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Start by recording your first mood entry above!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Past Entries
      </h2>
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
        >
          {editingId === entry.id ? (
            <EditForm
              entry={entry}
              onSave={handleEdit}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl" role="img" aria-label={entry.mood.label}>
                    {entry.mood.emoji}
                  </span>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      {dayjs(entry.date).format('MMMM D, YYYY')}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {entry.mood.label}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingId(entry.id)}
                    className="p-2 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                    aria-label="Edit entry"
                    title="Edit entry"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                    aria-label="Delete entry"
                    title="Delete entry"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              {entry.note && (
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {entry.note}
                </p>
              )}
              <div className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                {dayjs(entry.timestamp).format('h:mm A')}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}; 