import {getDatabase} from '../index';
import {AppSettings} from '@/types';

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'auto',
  fontSize: 17,
  fontFamily: 'System',
  editorMode: 'rich',
  autosave: true,
  autosaveInterval: 2000,
  notifications: false,
  biometricLock: false,
  showWordCount: true,
  showCharCount: false,
};

export const getSetting = (key: string): string | null => {
  const db = getDatabase();
  const result = db.execute('SELECT value FROM settings WHERE key = ?', [key]);

  if (!result.rows || result.rows.length === 0) {
    return null;
  }

  return result.rows.item(0).value;
};

export const setSetting = (key: string, value: string): void => {
  const db = getDatabase();
  const now = Date.now();

  db.execute(
    'INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES (?, ?, ?)',
    [key, value, now],
  );
};

export const getAllSettings = (): AppSettings => {
  const db = getDatabase();
  const result = db.execute('SELECT key, value FROM settings');

  const settings: any = {...DEFAULT_SETTINGS};

  if (result.rows) {
    for (let i = 0; i < result.rows.length; i++) {
      const row = result.rows.item(i);
      try {
        settings[row.key] = JSON.parse(row.value);
      } catch {
        settings[row.key] = row.value;
      }
    }
  }

  return settings;
};

export const saveSettings = (settings: Partial<AppSettings>): void => {
  Object.entries(settings).forEach(([key, value]) => {
    setSetting(key, JSON.stringify(value));
  });
};

export const resetSettings = (): void => {
  const db = getDatabase();
  db.execute('DELETE FROM settings');
  saveSettings(DEFAULT_SETTINGS);
};
