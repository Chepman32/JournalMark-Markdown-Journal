import {create} from 'zustand';
import {AppSettings, UserPreferences} from '@/types';
import * as db from '@/database';

interface SettingsState {
  settings: AppSettings;
  userPreferences: UserPreferences;
  isLoading: boolean;

  // Actions
  loadSettings: () => void;
  updateSettings: (updates: Partial<AppSettings>) => void;
  resetSettings: () => void;
  loadUserPreferences: () => void;
  updateUserPreferences: (updates: Partial<UserPreferences>) => void;
  setPro: (isPro: boolean) => void;
}

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

export const useSettingsStore = create<SettingsState>((set, get) => ({
  settings: DEFAULT_SETTINGS,
  userPreferences: {
    isPro: false,
    purchasedProducts: [],
    totalEntries: 0,
    streakDays: 0,
  },
  isLoading: false,

  loadSettings: () => {
    set({isLoading: true});
    try {
      const settings = db.getAllSettings();
      set({settings, isLoading: false});
    } catch (error) {
      console.error('Failed to load settings:', error);
      set({settings: DEFAULT_SETTINGS, isLoading: false});
    }
  },

  updateSettings: (updates) => {
    try {
      db.saveSettings(updates);
      set(state => ({settings: {...state.settings, ...updates}}));
    } catch (error) {
      console.error('Failed to update settings:', error);
    }
  },

  resetSettings: () => {
    try {
      db.resetSettings();
      set({settings: DEFAULT_SETTINGS});
    } catch (error) {
      console.error('Failed to reset settings:', error);
    }
  },

  loadUserPreferences: () => {
    try {
      const userPreferences = db.getUserStats();
      set({userPreferences});
    } catch (error) {
      console.error('Failed to load user preferences:', error);
    }
  },

  updateUserPreferences: (updates) => {
    try {
      db.updateUserStats(updates);
      set(state => ({userPreferences: {...state.userPreferences, ...updates}}));
    } catch (error) {
      console.error('Failed to update user preferences:', error);
    }
  },

  setPro: (isPro) => {
    get().updateUserPreferences({isPro});
  },
}));
