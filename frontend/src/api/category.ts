import axios from "../utils/axiosConfig";
import type { Category } from "../types/category";

const CATEGORY_URL = "/categories";

export const fetchAllCategories = async (): Promise<Category[]> => {
  const { data } = await axios.get(CATEGORY_URL);
  return data;
};

export const fetchCategoryById = async (id: string): Promise<Category> => {
  const { data } = await axios.get(`${CATEGORY_URL}/${id}`);
  return data;
};

export const createCategory = async (payload: { name: string }): Promise<Category> => {
  const { data } = await axios.post(CATEGORY_URL, payload);
  return data;
};

export const updateCategory = async (id: string, payload: { name: string }): Promise<Category> => {
  const { data } = await axios.put(`${CATEGORY_URL}/${id}`, payload);
  return data;
};

export const deleteCategory = async (id: string): Promise<{ message: string }> => {
  const { data } = await axios.delete(`${CATEGORY_URL}/${id}`);
  return data;
};
