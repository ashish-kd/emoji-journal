// Mood emoji options for the journal
export interface MoodOption {
  emoji: string;
  label: string;
  value: string;
}

// A single journal entry
export interface JournalEntry {
  id: string;
  date: string; // ISO date string (YYYY-MM-DD)
  mood: MoodOption;
  note: string;
  timestamp: number; // Unix timestamp for when entry was created/modified
}

// Theme options
export type Theme = 'light' | 'dark';

// Stats for mood tracking
export interface MoodStats {
  [moodValue: string]: {
    count: number;
    emoji: string;
    label: string;
  };
}

// Available mood options
export const MOOD_OPTIONS: MoodOption[] = [
  { emoji: '🤩', label: 'Ecstatic', value: 'ecstatic' },
  { emoji: '😄', label: 'Happy', value: 'happy' },
  { emoji: '😊', label: 'Content', value: 'content' },
  { emoji: '😌', label: 'Peaceful', value: 'peaceful' },
  { emoji: '😐', label: 'Neutral', value: 'neutral' },
  { emoji: '🤔', label: 'Thoughtful', value: 'thoughtful' },
  { emoji: '😴', label: 'Tired', value: 'tired' },
  { emoji: '😒', label: 'Bored', value: 'bored' },
  { emoji: '😟', label: 'Worried', value: 'worried' },
  { emoji: '😢', label: 'Sad', value: 'sad' },
  { emoji: '😭', label: 'Crying', value: 'crying' },
  { emoji: '😳', label: 'Shocked', value: 'shocked' },
  { emoji: '😤', label: 'Frustrated', value: 'frustrated' },
  { emoji: '🙃', label: 'Silly', value: 'silly' },
  { emoji: '🤯', label: 'Overwhelmed', value: 'overwhelmed' },
];

// Local storage keys
export const STORAGE_KEYS = {
  ENTRIES: 'journal-entries',
  THEME: 'journal-theme',
} as const; 