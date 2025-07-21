import axios from "../utils/axiosConfig";
import type { Prompt } from "../types/prompt";

const PROMPT_URL = "/prompts";

export const fetchAllPrompts = async (): Promise<Prompt[]> => {
  const { data } = await axios.get(PROMPT_URL);
  return data;
};

export const fetchPromptById = async (id: string): Promise<Prompt> => {
  const { data } = await axios.get(`${PROMPT_URL}/${id}`);
  return data;
};

export const fetchPromptsByUserId = async (userId: string): Promise<Prompt[]> => {
  const { data } = await axios.get(`${PROMPT_URL}/user/${userId}`);
  return data;
};

export const fetchPromptsByCategoryId = async (categoryId: string): Promise<Prompt[]> => {
  const { data } = await axios.get(`${PROMPT_URL}/category/${categoryId}`);
  return data;
};

export const fetchPromptsBySubCategoryId = async (subCategoryId: string): Promise<Prompt[]> => {
  const { data } = await axios.get(`${PROMPT_URL}/subcategory/${subCategoryId}`);
  return data;
};

export const createPrompt = async (
  payload: { prompt: string; sub_category_id: string; category_id: string }
): Promise<Prompt> => {
  const { data } = await axios.post(PROMPT_URL, payload);
  return data;
};

export const updatePrompt = async (
  id: string,
  payload: { prompt: string; sub_category_id: string; category_id: string }
): Promise<Prompt> => {
  const { data } = await axios.put(`${PROMPT_URL}/${id}`, payload);
  return data;
};

export const deletePrompt = async (id: string): Promise<{ message: string }> => {
  const { data } = await axios.delete(`${PROMPT_URL}/${id}`);
  return data;
};

export const regeneratePrompt = async (id: string): Promise<Prompt> => {
  const { data } = await axios.post(`${PROMPT_URL}/${id}/regenerate`);
  return data;
};
export const fetchMyPrompts = async (): Promise<Prompt[]> => {
  const { data } = await axios.get(`${PROMPT_URL}/history`);
  return data;
};
