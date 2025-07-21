import { Router } from "express";
import {
  createPrompt,
  deletePrompt,
  getAllPrompts,
  getPromptById,
  getPromptsByCategoryId,
  getPromptsBySubCategoryId,
  getPromptsByUserId,
  updatePrompt,
  regeneratePrompt,
} from "../controllers/prompt.controller";
import { isAdmin ,authorizeUserOrAdmin} from "../middlewares/admin.middleware";
import { validateObjectIdParam } from "../middlewares//common.middleware";
import { validatePrompt } from "../middlewares/prompt.middleware";
import { validateId } from "../middlewares/validateUser.middleware";
import { authenticateToken } from "../middlewares/auth.middleware";



const router = Router();

router.post("/", authenticateToken, validatePrompt, createPrompt);
router.get("/", authenticateToken, isAdmin, getAllPrompts);

router.get("/history", authenticateToken, getPromptsByUserId);
router.get("/user/:userId", authenticateToken, validateId,authorizeUserOrAdmin, getPromptsByUserId);
router.get("/category/:categoryId", authenticateToken, isAdmin, validateObjectIdParam, getPromptsByCategoryId);
router.get("/subcategory/:subCategoryId", authenticateToken, isAdmin, validateObjectIdParam, getPromptsBySubCategoryId);

router.get("/:id", authenticateToken, validateObjectIdParam, getPromptById);
router.put("/:id", authenticateToken, validateObjectIdParam, validatePrompt, updatePrompt);
router.delete("/:id", authenticateToken, validateObjectIdParam, deletePrompt);
router.post("/:id/regenerate", authenticateToken, validateObjectIdParam, regeneratePrompt);

export default router;
