import { Request, Response, NextFunction } from "express";
import SubCategoryService from "../services/subCategory.service";

const subCategoryService = new SubCategoryService();

export const createSubCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await subCategoryService.createSubCategory(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const getAllSubCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await subCategoryService.getAllSubCategories();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getSubCategoryById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await subCategoryService.getSubCategoryById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const updateSubCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await subCategoryService.updateSubCategory(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const deleteSubCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await subCategoryService.deleteSubCategory(req.params.id);
    res.status(200).json({ message: "Sub category deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export const getSubCategoriesByCategoryId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await subCategoryService.getSubCategoriesByCategoryId(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
