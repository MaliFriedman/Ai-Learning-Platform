import axios from "../utils/axiosConfig";
import type { SubCategory } from "../types/subCategory";

const SUBCATEGORY_URL = "/sub-categories";

export const fetchAllSubCategories = async (): Promise<SubCategory[]> => {
  const { data } = await axios.get(SUBCATEGORY_URL);
  return data;
};

export const fetchSubCategoryById = async (id: string): Promise<SubCategory> => {
  const { data } = await axios.get(`${SUBCATEGORY_URL}/${id}`);
  return data;
};

export const fetchSubCategoriesByCategoryId = async (category_id: string): Promise<SubCategory[]> => {
  const { data } = await axios.get(`${SUBCATEGORY_URL}/category/${category_id}`);
  console.log("🔥 response from API:", data.data);

  return data;
};

export const createSubCategory = async (payload: { name: string; category_id: string }): Promise<SubCategory> => {
  const { data } = await axios.post(SUBCATEGORY_URL, payload);
  return data;
};

export const updateSubCategory = async (
  id: string,
  payload: { name: string; category_id: string }
): Promise<SubCategory> => {
  const { data } = await axios.put(`${SUBCATEGORY_URL}/${id}`, payload);
  return data;
};

export const deleteSubCategory = async (id: string): Promise<{ message: string }> => {
  const { data } = await axios.delete(`${SUBCATEGORY_URL}/${id}`);
  return data;
};
