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
import { authenticateToken } from "../middlewares/auth.middleware";


const router = Router();

router.post("/", authenticateToken, isAdmin, validateCreateSubCategory, createSubCategory);
router.get("/", authenticateToken, getAllSubCategories);

router.get("/category/:id", authenticateToken, validateObjectIdParam, getSubCategoriesByCategoryId);

router.get("/:id", authenticateToken, validateObjectIdParam, getSubCategoryById);
router.put("/:id", authenticateToken, isAdmin, validateObjectIdParam, validateCreateSubCategory, updateSubCategory);
router.delete("/:id", authenticateToken, isAdmin, validateObjectIdParam, deleteSubCategory);

export default router;
