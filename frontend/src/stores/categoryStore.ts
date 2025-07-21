import { create } from 'zustand';
import {
  fetchAllCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} from '../api/category';
import type { Category } from '../types/category';

type CategoryState = {
  categories: Category[];
  loading: boolean;
  error: string | null;

  loadCategories: () => Promise<void>;
  addCategory: (name: string) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  updateCategory: (id: string, name: string) => Promise<void>;

  getCategoryById: (id: string) => Category | undefined;
  clearCategories: () => void;
};

export const useCategoryStore = create<CategoryState>((set, get) => ({
  categories: [],
  loading: false,
  error: null,

  loadCategories: async () => {
    try {
      set({ loading: true, error: null });
      const data = await fetchAllCategories();
      set({ categories: data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  addCategory: async (name) => {
    try {
      await createCategory({ name });
      await get().loadCategories();
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  deleteCategory: async (id) => {
    try {
      await deleteCategory(id);
      await get().loadCategories();
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  updateCategory: async (id, name) => {
    try {
      await updateCategory(id, { name });
      await get().loadCategories();
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  getCategoryById: (id) => {
    return get().categories.find((cat) => cat._id === id);
  },

  clearCategories: () => {
    set({ categories: [], error: null, loading: false });
  },
}));
