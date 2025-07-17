import type { JournalEntry } from '../types';
import { STORAGE_KEYS } from '../types';

// Load journal entries from localStorage
export const loadEntries = (): JournalEntry[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.ENTRIES);
    if (!stored) return [];
    
    const entries = JSON.parse(stored) as JournalEntry[];
    // Sort by date descending (newest first)
    return entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error loading entries from localStorage:', error);
    return [];
  }
};

// Save journal entries to localStorage
export const saveEntries = (entries: JournalEntry[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.ENTRIES, JSON.stringify(entries));
  } catch (error) {
    console.error('Error saving entries to localStorage:', error);
  }
};

// Add a new entry
export const addEntry = (entry: JournalEntry): JournalEntry[] => {
  const entries = loadEntries();
  const newEntries = [entry, ...entries];
  saveEntries(newEntries);
  return newEntries;
};

// Update an existing entry
export const updateEntry = (updatedEntry: JournalEntry): JournalEntry[] => {
  const entries = loadEntries();
  const newEntries = entries.map(entry => 
    entry.id === updatedEntry.id ? updatedEntry : entry
  );
  saveEntries(newEntries);
  return newEntries;
};

// Delete an entry
export const deleteEntry = (entryId: string): JournalEntry[] => {
  const entries = loadEntries();
  const newEntries = entries.filter(entry => entry.id !== entryId);
  saveEntries(newEntries);
  return newEntries;
};

// Check if an entry exists for today
export const hasEntryForDate = (date: string): boolean => {
  const entries = loadEntries();
  return entries.some(entry => entry.date === date);
};

// Get entry for a specific date
export const getEntryForDate = (date: string): JournalEntry | null => {
  const entries = loadEntries();
  return entries.find(entry => entry.date === date) || null;
}; 