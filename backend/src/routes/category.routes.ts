import { Router } from "express";
import { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } from "../controllers/category.controller";
import { validateCategoryCreation } from "../middlewares/validateCategory.middleware";
import { isAdmin } from "../middlewares/admin.middleware"; 
import { validateObjectIdParam } from "../middlewares//common.middleware";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authenticateToken, isAdmin, validateCategoryCreation, createCategory);

router.get("/", authenticateToken, getAllCategories);
router.get("/:id", authenticateToken, validateObjectIdParam, getCategoryById);

router.put("/:id", authenticateToken, isAdmin, validateObjectIdParam, updateCategory);
router.delete("/:id", authenticateToken, isAdmin, validateObjectIdParam, deleteCategory);

export default router;
