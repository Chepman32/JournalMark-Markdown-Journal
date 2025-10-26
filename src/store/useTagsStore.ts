import {create} from 'zustand';
import {Tag} from '@/types';
import * as db from '@/database';

interface TagsState {
  tags: Tag[];
  isLoading: boolean;
  error: string | null;

  // Actions
  loadTags: () => void;
  createTag: (name: string, color: string) => Tag;
  updateTag: (id: string, updates: {name?: string; color?: string}) => void;
  deleteTag: (id: string) => void;
  getTagByName: (name: string) => Tag | undefined;
}

export const useTagsStore = create<TagsState>((set, get) => ({
  tags: [],
  isLoading: false,
  error: null,

  loadTags: () => {
    set({isLoading: true, error: null});
    try {
      const tags = db.getTagsWithCounts();
      set({tags, isLoading: false});
    } catch (error) {
      set({error: (error as Error).message, isLoading: false});
    }
  },

  createTag: (name, color) => {
    try {
      const newTag = db.createTag(name, color);
      set(state => ({tags: [...state.tags, newTag]}));
      return newTag;
    } catch (error) {
      set({error: (error as Error).message});
      throw error;
    }
  },

  updateTag: (id, updates) => {
    try {
      db.updateTag(id, updates);
      set(state => ({
        tags: state.tags.map(tag => (tag.id === id ? {...tag, ...updates} : tag)),
      }));
    } catch (error) {
      set({error: (error as Error).message});
    }
  },

  deleteTag: (id) => {
    try {
      db.deleteTag(id);
      set(state => ({tags: state.tags.filter(tag => tag.id !== id)}));
    } catch (error) {
      set({error: (error as Error).message});
    }
  },

  getTagByName: (name) => {
    return get().tags.find(tag => tag.name.toLowerCase() === name.toLowerCase());
  },
}));
