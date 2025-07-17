import React from 'react';
import dayjs from 'dayjs';
import type { JournalEntry, MoodStats } from '../types';

interface StatsSummaryProps {
  entries: JournalEntry[];
}

export const StatsSummary: React.FC<StatsSummaryProps> = ({ entries }) => {
  // Calculate stats for the last 7 days
  const sevenDaysAgo = dayjs().subtract(7, 'days').startOf('day');
  const recentEntries = entries.filter(entry => 
    dayjs(entry.date).isAfter(sevenDaysAgo)
  );

  // Calculate mood stats
  const moodStats: MoodStats = recentEntries.reduce((acc, entry) => {
    const moodValue = entry.mood.value;
    if (!acc[moodValue]) {
      acc[moodValue] = {
        count: 0,
        emoji: entry.mood.emoji,
        label: entry.mood.label,
      };
    }
    acc[moodValue].count++;
    return acc;
  }, {} as MoodStats);

  const totalRecentEntries = recentEntries.length;
  const mostCommonMood = Object.entries(moodStats)
    .sort(([, a], [, b]) => b.count - a.count)[0];

  if (totalRecentEntries === 0) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          📊 Weekly Mood Stats
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          No entries this week yet. Start journaling to see your mood patterns!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        📊 This Week's Mood Stats
      </h3>
      
      {mostCommonMood && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl" role="img" aria-label={mostCommonMood[1].label}>
              {mostCommonMood[1].emoji}
            </span>
            <span className="text-gray-900 dark:text-gray-100 font-medium">
              Most common mood: {mostCommonMood[1].label}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            You felt {mostCommonMood[1].label.toLowerCase()} on{' '}
            {mostCommonMood[1].count} out of {totalRecentEntries} day
            {totalRecentEntries === 1 ? '' : 's'} this week
          </p>
        </div>
      )}

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Mood breakdown:
        </h4>
        {Object.entries(moodStats)
          .sort(([, a], [, b]) => b.count - a.count)
          .map(([moodValue, stats]) => {
            const percentage = Math.round((stats.count / totalRecentEntries) * 100);
            return (
              <div key={moodValue} className="flex items-center gap-3">
                <span className="text-lg" role="img" aria-label={stats.label}>
                  {stats.emoji}
                </span>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {stats.label}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {stats.count} day{stats.count === 1 ? '' : 's'} ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 dark:bg-blue-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-800">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Based on {totalRecentEntries} entr{totalRecentEntries === 1 ? 'y' : 'ies'} from the last 7 days
        </p>
      </div>
    </div>
  );
}; 