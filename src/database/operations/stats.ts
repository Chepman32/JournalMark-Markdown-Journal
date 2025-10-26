import {getDatabase} from '../index';
import {UserPreferences} from '@/types';

export const getUserStats = (): UserPreferences => {
  const db = getDatabase();
  const result = db.execute('SELECT * FROM user_stats WHERE id = 1');

  if (!result.rows || result.rows.length === 0) {
    return {
      isPro: false,
      purchasedProducts: [],
      totalEntries: 0,
      streakDays: 0,
    };
  }

  const row = result.rows.item(0);
  return {
    isPro: row.is_pro === 1,
    purchasedProducts: [], // This would be loaded from persistent storage
    totalEntries: row.total_entries || 0,
    streakDays: row.streak_days || 0,
    lastEntryDate: row.last_entry_date,
    lastBackup: undefined, // Implement backup functionality separately
  };
};

export const updateUserStats = (stats: Partial<UserPreferences>): void => {
  const db = getDatabase();
  const fields: string[] = ['updated_at = ?'];
  const values: any[] = [Date.now()];

  if (stats.isPro !== undefined) {
    fields.push('is_pro = ?');
    values.push(stats.isPro ? 1 : 0);
  }

  if (stats.totalEntries !== undefined) {
    fields.push('total_entries = ?');
    values.push(stats.totalEntries);
  }

  if (stats.streakDays !== undefined) {
    fields.push('streak_days = ?');
    values.push(stats.streakDays);
  }

  if (stats.lastEntryDate !== undefined) {
    fields.push('last_entry_date = ?');
    values.push(stats.lastEntryDate);
  }

  db.execute(`UPDATE user_stats SET ${fields.join(', ')} WHERE id = 1`, values);
};

export const incrementTotalEntries = (): void => {
  const db = getDatabase();
  db.execute('UPDATE user_stats SET total_entries = total_entries + 1, updated_at = ? WHERE id = 1', [Date.now()]);
};

export const updateStreak = (): void => {
  const db = getDatabase();
  const stats = getUserStats();

  const now = Date.now();
  const oneDayMs = 24 * 60 * 60 * 1000;

  if (!stats.lastEntryDate) {
    // First entry
    updateUserStats({streakDays: 1, lastEntryDate: now});
    return;
  }

  const daysSinceLastEntry = Math.floor((now - stats.lastEntryDate) / oneDayMs);

  if (daysSinceLastEntry === 0) {
    // Same day, no change
    return;
  } else if (daysSinceLastEntry === 1) {
    // Consecutive day
    updateUserStats({
      streakDays: stats.streakDays + 1,
      lastEntryDate: now,
    });
  } else {
    // Streak broken
    updateUserStats({
      streakDays: 1,
      lastEntryDate: now,
    });
  }
};

export const getEntryCountByMonth = (year: number, month: number): number => {
  const db = getDatabase();
  const startOfMonth = new Date(year, month, 1).getTime();
  const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59, 999).getTime();

  const result = db.execute(
    'SELECT COUNT(*) as count FROM entries WHERE created_at BETWEEN ? AND ?',
    [startOfMonth, endOfMonth],
  );

  return result.rows ? result.rows.item(0).count : 0;
};

export const getTotalWordCount = (): number => {
  const db = getDatabase();
  const result = db.execute('SELECT content FROM entries');

  let totalWords = 0;
  if (result.rows) {
    for (let i = 0; i < result.rows.length; i++) {
      const content = result.rows.item(i).content;
      totalWords += countWords(content);
    }
  }

  return totalWords;
};

const countWords = (text: string): number => {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};
