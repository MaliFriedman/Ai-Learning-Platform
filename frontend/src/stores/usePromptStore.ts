import { create } from 'zustand';
import type { Prompt } from '../types/prompt';
import {
    fetchAllPrompts,
    fetchPromptById,
    fetchPromptsByUserId,
    fetchPromptsByCategoryId,
    fetchPromptsBySubCategoryId,
    createPrompt,
    updatePrompt,
    deletePrompt,
    regeneratePrompt,
} from '../api/prompts.api';

type PromptState = {
    prompts: Prompt[];
    loading: boolean;
    error: string | null;

    loadPrompts: () => Promise<void>;
    loadPromptById: (id: string) => Promise<Prompt | null>;
    loadPromptsByUserId: (userId: string) => Promise<void>;
    loadPromptsByCategoryId: (categoryId: string) => Promise<void>;
    loadPromptsBySubCategoryId: (subCategoryId: string) => Promise<void>;

    addPrompt: (prompt: string, subCategoryId: string, categoryId: string) => Promise<Prompt>;
    // updatePrompt: (id: string, prompt: string, subCategoryId?: string) => Promise<void>;
    updatePrompt: ( id: string, prompt: string, subCategoryId: string, categoryId: string) => Promise<void>;
    deletePrompt: (id: string) => Promise<void>;
    regeneratePrompt: (id: string) => Promise<void>;

    clearPrompts: () => void;
};

export const usePromptStore = create<PromptState>((set, get) => ({
    prompts: [],
    loading: false,
    error: null,

    loadPrompts: async () => {
        try {
            set({ loading: true, error: null });
            const data = await fetchAllPrompts();
            set({ prompts: data, loading: false });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },

    loadPromptById: async (id: string) => {
        try {
            set({ loading: true, error: null });
            const data = await fetchPromptById(id);
            set({ loading: false });
            return data;
        } catch (err: any) {
            set({ error: err.message, loading: false });
            return null;
        }
    },

    loadPromptsByUserId: async (userId: string) => {
        try {
            set({ loading: true, error: null });
            console.log('userId לפני השליחה ל־API:', userId);

            const data = await fetchPromptsByUserId(userId);
            set({ prompts: data, loading: false });
        } catch (err: any) {
            if (err.response?.status === 404) {
                set({ prompts: [], error: "No prompts found for this user.", loading: false });
            } else {
                set({ error: err.message || "An error occurred while loading prompts.", loading: false });
            }
        }
    },

    loadPromptsByCategoryId: async (categoryId: string) => {
        try {
            set({ loading: true, error: null });
            const data = await fetchPromptsByCategoryId(categoryId);
            set({ prompts: data, loading: false });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },

    loadPromptsBySubCategoryId: async (subCategoryId: string) => {
        try {
            set({ loading: true, error: null });
            const data = await fetchPromptsBySubCategoryId(subCategoryId);
            set({ prompts: data, loading: false });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },

    addPrompt: async (prompt: string, subCategoryId: string, categoryId: string) => {
        try {
            const createdPrompt = await createPrompt({
                prompt,
                sub_category_id: subCategoryId,
                category_id: categoryId,
            });
            await get().loadPrompts();
            return createdPrompt;
        } catch (err: any) {
            set({ error: err.message });
            throw err;
        }
    },

    // updatePrompt: async (id: string, prompt: string, subCategoryId?: string) => {
    //     try {
    //         await updatePrompt(id, { prompt, subCategoryId });
    //         await get().loadPrompts();
    //     } catch (err: any) {
    //         set({ error: err.message });
    //     }
    // },
    updatePrompt: async ( id: string, prompt: string, subCategoryId: string, categoryId: string) => {
        try {
            await updatePrompt(id, {
                prompt,
                sub_category_id: subCategoryId,
                category_id: categoryId,
            });
            await get().loadPrompts();
        } catch (err: any) {
            set({ error: err.message });
        }
    },

    deletePrompt: async (id: string) => {
        try {
            await deletePrompt(id);
            await get().loadPrompts();
        } catch (err: any) {
            set({ error: err.message });
        }
    },

    regeneratePrompt: async (id: string) => {
        try {
            await regeneratePrompt(id);
            await get().loadPrompts();
        } catch (err: any) {
            set({ error: err.message });
        }
    },

    clearPrompts: () => {
        set({ prompts: [] });
    }
}));
