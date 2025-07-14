import { ISubCategory, SubCategoryModel } from "../models/models.subCategory";
import ApiError from "../utils/errors/ApiError";

export default class SubCategoryService {
  async createSubCategory(data: ISubCategory): Promise<ISubCategory> {
    const existing = await SubCategoryModel.findOne({ name: data.name });
    if (existing) {
      throw new ApiError(400, "SubCategory with this name already exists.");
    }

    const newSubCategory = new SubCategoryModel(data);
    await newSubCategory.save();
    return newSubCategory.toObject();
  }

  async getAllSubCategories(): Promise<ISubCategory[]> {
    const subCategories = await SubCategoryModel.find();
    return subCategories.map(sub => sub.toObject());
  }

  async getSubCategoryById(id: string): Promise<ISubCategory> {
    const subCategory = await SubCategoryModel.findById(id);
    if (!subCategory) {
      throw new ApiError(404, "SubCategory not found.");
    }
    return subCategory.toObject();
  }

  async updateSubCategory(id: string, updates: Partial<ISubCategory>): Promise<ISubCategory> {
    const updated = await SubCategoryModel.findByIdAndUpdate(id, updates, { new: true });
    if (!updated) {
      throw new ApiError(404, "SubCategory not found for update.");
    }
    return updated.toObject();
  }

  async deleteSubCategory(id: string): Promise<void> {
    const deleted = await SubCategoryModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new ApiError(404, "SubCategory not found for deletion.");
    }
  }
}
