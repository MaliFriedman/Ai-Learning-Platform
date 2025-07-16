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
import { isAdmin } from "../middlewares/admin.middleware";
import { validateObjectIdParam } from "../middlewares//common.middleware";
import { validatePrompt } from "../middlewares/prompt.middleware";
import { validateId } from "../middlewares/validateUser.middleware";


const router = Router();

router.post("/", validatePrompt, createPrompt);
router.get("/", getAllPrompts);
router.get("/:id", validateObjectIdParam, getPromptById);
router.get("/user/:userId", validateId, getPromptsByUserId);
router.get("/category/:categoryId", validateObjectIdParam, getPromptsByCategoryId);
router.get("/subcategory/:subCategoryId", validateObjectIdParam, getPromptsBySubCategoryId);
router.put("/:id", validateObjectIdParam, validatePrompt, updatePrompt);
router.delete("/:id", validateObjectIdParam, deletePrompt);
router.post("/:id/regenerate", validateObjectIdParam, regeneratePrompt);

export default router;
