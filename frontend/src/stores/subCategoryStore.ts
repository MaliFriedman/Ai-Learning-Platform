import { create } from 'zustand';
import * as subCategoryApi from '../api/subCategory.api';
import type { SubCategory } from '../types/subCategory';

type SubCategoryState = {
  subCategories: SubCategory[];
  loading: boolean;
  error: string | null;

  loadSubCategories: () => Promise<void>;
  loadSubCategoriesByCategory: (categoryId: string) => Promise<void>;
  addSubCategory: (name: string, categoryId: string) => Promise<void>;
  deleteSubCategory: (id: string, categoryId?: string) => Promise<void>;
  updateSubCategory: (id: string, name: string, categoryId: string) => Promise<void>;
};

export const useSubCategoryStore = create<SubCategoryState>((set, get) => ({
  subCategories: [],
  loading: false,
  error: null,

  loadSubCategories: async () => {
    set({ loading: true, error: null, subCategories: [] });
    try {
      const data = await subCategoryApi.fetchAllSubCategories();
      set({ subCategories: data, loading: false });
    } catch (err: any) {
      set({ error: err.message || 'שגיאה בטעינת תתי-קטגוריות', loading: false });
    }
  },

  loadSubCategoriesByCategory: async (categoryId: string) => {
    set({ loading: true, error: null, subCategories: [] }); // ← מאפסים לפני טעינה
    try {
      const data = await subCategoryApi.fetchSubCategoriesByCategoryId(categoryId);
      set({ subCategories: data, loading: false });
    } catch (err: any) {
      set({ error: err.message || 'שגיאה בטעינת תתי-קטגוריות לפי קטגוריה', loading: false });
    }
  },

  addSubCategory: async (name: string, categoryId: string) => {
    set({ error: null });
    try {
      await subCategoryApi.createSubCategory({ name, category_id: categoryId });
      await get().loadSubCategoriesByCategory(categoryId);
    } catch (err: any) {
      set({ error: err.message || 'שגיאה בהוספת תת-קטגוריה' });
    }
  },

  deleteSubCategory: async (id: string, categoryId?: string) => {
    set({ error: null });
    try {
      await subCategoryApi.deleteSubCategory(id);
      if (categoryId) {
        await get().loadSubCategoriesByCategory(categoryId);
      } else {
        await get().loadSubCategories();
      }
    } catch (err: any) {
      set({ error: err.message || 'שגיאה במחיקת תת-קטגוריה' });
    }
  },

  updateSubCategory: async (id: string, name: string, categoryId: string) => {
    set({ error: null });
    try {
      await subCategoryApi.updateSubCategory(id, { name, category_id: categoryId });
      await get().loadSubCategoriesByCategory(categoryId);
    } catch (err: any) {
      set({ error: err.message || 'שגיאה בעדכון תת-קטגוריה' });
    }
  },
}));
