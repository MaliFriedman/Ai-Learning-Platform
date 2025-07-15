import { Router } from "express";
import { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } from "../controllers/category.controller";
import { validateCategoryCreation } from "../middlewares/validateCategory.middleware";
import { isAdmin } from "../middlewares/admin.middleware"; 
import { validateObjectIdParam } from "../middlewares//common.middleware";

const router = Router();

router.post("/", isAdmin, validateCategoryCreation, createCategory);
router.get("/", getAllCategories);
router.get("/:id", validateObjectIdParam, getCategoryById);
router.put("/:id", isAdmin, validateObjectIdParam, updateCategory);
router.delete("/:id", isAdmin, validateObjectIdParam, deleteCategory);

export default router;
