// Core domain types for JournalMark

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  tags: string[];
  mood?: string;
  weather?: string;
  location?: string;
  favorite: boolean;
  archived: boolean;
  templateId?: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  createdAt: number;
  entryCount: number;
}

export interface Template {
  id: string;
  name: string;
  content: string;
  description?: string;
  icon?: string;
  createdAt: number;
  usageCount: number;
}

export interface ExportFormat {
  type: 'markdown' | 'pdf' | 'json' | 'txt';
  entries: JournalEntry[];
  includeTags: boolean;
  includeMetadata: boolean;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'auto';
  fontSize: number;
  fontFamily: string;
  editorMode: 'rich' | 'markdown' | 'split';
  autosave: boolean;
  autosaveInterval: number;
  notifications: boolean;
  notificationTime?: string;
  biometricLock: boolean;
  showWordCount: boolean;
  showCharCount: boolean;
  defaultTemplate?: string;
}

export interface NotificationSettings {
  enabled: boolean;
  dailyReminder: boolean;
  reminderTime: string;
  weeklyReview: boolean;
}

export interface IAPProduct {
  productId: string;
  title: string;
  description: string;
  price: string;
  type: 'consumable' | 'non-consumable' | 'subscription';
}

export interface UserPreferences {
  isPro: boolean;
  purchasedProducts: string[];
  lastBackup?: number;
  totalEntries: number;
  streakDays: number;
  lastEntryDate?: number;
}

// UI Component Props Types

export type AnimationConfig = {
  duration: number;
  easing: string;
  stiffness?: number;
  damping?: number;
};

export type GestureType =
  | 'tap'
  | 'doubleTap'
  | 'longPress'
  | 'pan'
  | 'pinch'
  | 'fling'
  | 'drag'
  | 'hover'
  | 'scroll'
  | 'edgeSwipe'
  | 'pressAndHold';

export type PropType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'color'
  | 'length'
  | 'angle'
  | 'opacity'
  | 'icon'
  | 'imageUri'
  | 'enum';
