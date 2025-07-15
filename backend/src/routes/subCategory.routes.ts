import { Router } from "express";
import {
  createSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  getSubCategoriesByCategoryId,
  updateSubCategory,
} from "../controllers/subCategory.controller";
import { isAdmin } from "../middlewares/admin.middleware";
import { validateCreateSubCategory } from "../middlewares/subCategory.middleware";
import { validateObjectIdParam } from "../middlewares//common.middleware";


const router = Router();

router.post("/", isAdmin, validateCreateSubCategory, createSubCategory);
router.get("/", getAllSubCategories);

router.get("/category/:categoryId", validateObjectIdParam, getSubCategoriesByCategoryId);

router.get("/:id", validateObjectIdParam, getSubCategoryById);
router.put("/:id", isAdmin, validateObjectIdParam, validateCreateSubCategory, updateSubCategory);
router.delete("/:id", isAdmin, validateObjectIdParam, deleteSubCategory);

export default router;
