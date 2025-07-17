import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import { EmojiSelector } from './components/EmojiSelector';
import { NoteInput } from './components/NoteInput';
import { EntryDisplay } from './components/EntryDisplay';
import { StatsSummary } from './components/StatsSummary';
import type { JournalEntry, MoodOption } from './types';
import { loadEntries, addEntry, updateEntry, deleteEntry, hasEntryForDate } from './utils/storage';

const AppContent: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [selectedMood, setSelectedMood] = useState<MoodOption | null>(null);
  const [note, setNote] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const today = dayjs().format('YYYY-MM-DD');
  const hasEntryToday = hasEntryForDate(today);

  // Load entries on mount
  useEffect(() => {
    const savedEntries = loadEntries();
    setEntries(savedEntries);
    setIsLoading(false);
  }, []);

  const handleSaveEntry = () => {
    if (!selectedMood) return;

    const newEntry: JournalEntry = {
      id: `${today}-${Date.now()}`,
      date: today,
      mood: selectedMood,
      note: note.trim(),
      timestamp: Date.now(),
    };

    const updatedEntries = addEntry(newEntry);
    setEntries(updatedEntries);
    
    // Reset form
    setSelectedMood(null);
    setNote('');
  };

  const handleEditEntry = (updatedEntry: JournalEntry) => {
    const updatedEntries = updateEntry(updatedEntry);
    setEntries(updatedEntries);
  };

  const handleDeleteEntry = (entryId: string) => {
    const updatedEntries = deleteEntry(entryId);
    setEntries(updatedEntries);
  };

  const canSaveToday = selectedMood && !hasEntryToday;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">📝</div>
          <p className="text-gray-600 dark:text-gray-400">Loading your journal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              📝 Emoji Journal
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track your daily mood with emojis
            </p>
          </div>
          <ThemeToggle />
        </header>

        {/* Today's Entry Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl" role="img" aria-label="calendar">📅</span>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {dayjs().format('MMMM D, YYYY')}
            </h2>
            {hasEntryToday && (
              <span className="ml-auto px-3 py-1 text-sm bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full">
                ✓ Logged
              </span>
            )}
          </div>

          {hasEntryToday ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                Entry Complete!
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                You've already logged your mood for today. Check back tomorrow!
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                You can edit or view your entry in the list below.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <EmojiSelector
                selectedMood={selectedMood}
                onMoodSelect={setSelectedMood}
              />

              <NoteInput
                value={note}
                onChange={setNote}
              />

              <button
                onClick={handleSaveEntry}
                disabled={!canSaveToday}
                className={`
                  w-full py-3 px-6 rounded-lg font-medium transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-offset-2
                  ${canSaveToday
                    ? 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white focus:ring-blue-500 dark:focus:ring-blue-400 hover:scale-[1.02] active:scale-[0.98]'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                {!selectedMood ? 'Select a mood to save' : 'Save Today\'s Entry'}
              </button>
            </div>
          )}
        </div>

        {/* Stats Summary */}
        {entries.length > 0 && (
          <div className="mb-8">
            <StatsSummary entries={entries} />
          </div>
        )}

        {/* Past Entries */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <EntryDisplay
            entries={entries}
            onEdit={handleEditEntry}
            onDelete={handleDeleteEntry}
          />
        </div>

        {/* Footer */}
        <footer className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>Built with React, TypeScript & Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
