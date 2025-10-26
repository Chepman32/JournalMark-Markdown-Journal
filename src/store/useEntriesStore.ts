import {create} from 'zustand';
import {JournalEntry} from '@/types';
import * as db from '@/database';

interface EntriesState {
  entries: JournalEntry[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  filterTags: string[];
  showArchived: boolean;
  showFavorites: boolean;

  // Actions
  loadEntries: () => void;
  createEntry: (entry: Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt'>) => JournalEntry;
  updateEntry: (id: string, updates: Partial<JournalEntry>) => void;
  deleteEntry: (id: string) => void;
  toggleFavorite: (id: string) => void;
  toggleArchive: (id: string) => void;
  searchEntries: (query: string) => void;
  filterByTags: (tags: string[]) => void;
  setShowArchived: (show: boolean) => void;
  setShowFavorites: (show: boolean) => void;
  clearFilters: () => void;
}

export const useEntriesStore = create<EntriesState>((set, get) => ({
  entries: [],
  isLoading: false,
  error: null,
  searchQuery: '',
  filterTags: [],
  showArchived: false,
  showFavorites: false,

  loadEntries: () => {
    set({isLoading: true, error: null});
    try {
      const entries = db.getAllEntries({
        archived: get().showArchived ? undefined : false,
        favorite: get().showFavorites ? true : undefined,
      });
      set({entries, isLoading: false});
    } catch (error) {
      set({error: (error as Error).message, isLoading: false});
    }
  },

  createEntry: (entry) => {
    try {
      const newEntry = db.createEntry(entry);
      set(state => ({entries: [newEntry, ...state.entries]}));
      db.incrementTotalEntries();
      db.updateStreak();
      return newEntry;
    } catch (error) {
      set({error: (error as Error).message});
      throw error;
    }
  },

  updateEntry: (id, updates) => {
    try {
      db.updateEntry(id, updates);
      set(state => ({
        entries: state.entries.map(entry =>
          entry.id === id ? {...entry, ...updates, updatedAt: Date.now()} : entry,
        ),
      }));
    } catch (error) {
      set({error: (error as Error).message});
    }
  },

  deleteEntry: (id) => {
    try {
      db.deleteEntry(id);
      set(state => ({entries: state.entries.filter(entry => entry.id !== id)}));
    } catch (error) {
      set({error: (error as Error).message});
    }
  },

  toggleFavorite: (id) => {
    const entry = get().entries.find(e => e.id === id);
    if (entry) {
      get().updateEntry(id, {favorite: !entry.favorite});
    }
  },

  toggleArchive: (id) => {
    const entry = get().entries.find(e => e.id === id);
    if (entry) {
      get().updateEntry(id, {archived: !entry.archived});
    }
  },

  searchEntries: (query) => {
    set({searchQuery: query, isLoading: true});
    try {
      if (query.trim()) {
        const entries = db.searchEntries(query);
        set({entries, isLoading: false});
      } else {
        get().loadEntries();
      }
    } catch (error) {
      set({error: (error as Error).message, isLoading: false});
    }
  },

  filterByTags: (tags) => {
    set({filterTags: tags, isLoading: true});
    try {
      if (tags.length > 0) {
        // Get entries for the first tag (simplified, could be improved)
        const tagId = db.getAllTags().find(t => t.name === tags[0])?.id;
        if (tagId) {
          const entries = db.getEntriesByTag(tagId);
          set({entries, isLoading: false});
        }
      } else {
        get().loadEntries();
      }
    } catch (error) {
      set({error: (error as Error).message, isLoading: false});
    }
  },

  setShowArchived: (show) => {
    set({showArchived: show});
    get().loadEntries();
  },

  setShowFavorites: (show) => {
    set({showFavorites: show});
    get().loadEntries();
  },

  clearFilters: () => {
    set({searchQuery: '', filterTags: [], showArchived: false, showFavorites: false});
    get().loadEntries();
  },
}));
