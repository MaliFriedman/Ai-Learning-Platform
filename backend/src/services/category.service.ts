import { ICategory, CategoryModel } from "../models/models.category";
import ApiError from "../utils/errors/ApiError";

export default class CategoryService {

  async createCategory(categoryData: ICategory): Promise<ICategory> {
    const existing = await CategoryModel.findOne({ name: categoryData.name });
    if (existing) {
      throw new ApiError(400, "Category with this name already exists.");
    }

    const newCategory = new CategoryModel(categoryData);
    await newCategory.save();
    return newCategory.toObject();
  }

  async getAllCategories(): Promise<ICategory[]> {
    const categories = await CategoryModel.find();
    return categories.map(category => category.toObject());
  }

  async getCategoryById(id: string): Promise<ICategory> {
    const category = await CategoryModel.findById(id);
    if (!category) {
      throw new ApiError(404, "Category not found.");
    }
    return category.toObject();
  }

  async updateCategory(id: string, updates: Partial<ICategory>): Promise<ICategory> {
    const updatedCategory = await CategoryModel.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedCategory) {
      throw new ApiError(404, "Category not found for update.");
    }
    return updatedCategory.toObject();
  }

  async deleteCategory(id: string): Promise<void> {
    const deleted = await CategoryModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new ApiError(404, "Category not found for deletion.");
    }
  }



}
