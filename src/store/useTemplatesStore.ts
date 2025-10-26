import {create} from 'zustand';
import {Template} from '@/types';
import * as db from '@/database';

interface TemplatesState {
  templates: Template[];
  isLoading: boolean;
  error: string | null;

  // Actions
  loadTemplates: () => void;
  createTemplate: (name: string, content: string, description?: string, icon?: string) => Template;
  updateTemplate: (id: string, updates: Partial<Template>) => void;
  deleteTemplate: (id: string) => void;
  useTemplate: (id: string) => void;
}

export const useTemplatesStore = create<TemplatesState>((set, get) => ({
  templates: [],
  isLoading: false,
  error: null,

  loadTemplates: () => {
    set({isLoading: true, error: null});
    try {
      const templates = db.getAllTemplates();
      set({templates, isLoading: false});
    } catch (error) {
      set({error: (error as Error).message, isLoading: false});
    }
  },

  createTemplate: (name, content, description, icon) => {
    try {
      const newTemplate = db.createTemplate(name, content, description, icon);
      set(state => ({templates: [...state.templates, newTemplate]}));
      return newTemplate;
    } catch (error) {
      set({error: (error as Error).message});
      throw error;
    }
  },

  updateTemplate: (id, updates) => {
    try {
      db.updateTemplate(id, updates);
      set(state => ({
        templates: state.templates.map(template =>
          template.id === id ? {...template, ...updates} : template,
        ),
      }));
    } catch (error) {
      set({error: (error as Error).message});
    }
  },

  deleteTemplate: (id) => {
    try {
      db.deleteTemplate(id);
      set(state => ({templates: state.templates.filter(template => template.id !== id)}));
    } catch (error) {
      set({error: (error as Error).message});
    }
  },

  useTemplate: (id) => {
    try {
      db.incrementTemplateUsage(id);
      set(state => ({
        templates: state.templates.map(template =>
          template.id === id ? {...template, usageCount: template.usageCount + 1} : template,
        ),
      }));
    } catch (error) {
      set({error: (error as Error).message});
    }
  },
}));
