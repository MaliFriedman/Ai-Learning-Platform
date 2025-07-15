import { Request, Response, NextFunction } from "express";
import PromptService from "../services/prompt.service";

const promptService = new PromptService();

export const createPrompt = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newPrompt = await promptService.createPrompt(req.body);
    res.status(201).json(newPrompt);
  } catch (err) {
    next(err);
  }
};

export const getAllPrompts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const prompts = await promptService.getAllPrompts();
    res.json(prompts);
  } catch (err) {
    next(err);
  }
};

export const getPromptById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const prompt = await promptService.getPromptById(req.params.id);
    res.json(prompt);
  } catch (err) {
    next(err);
  }
};

export const getPromptsByUserId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const prompts = await promptService.getPromptsByUserId(req.params.userId);
    res.json(prompts);
  } catch (err) {
    next(err);
  }
};

export const getPromptsByCategoryId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const prompts = await promptService.getPromptsByCategoryId(req.params.categoryId);
    res.json(prompts);
  } catch (err) {
    next(err);
  }
};

export const getPromptsBySubCategoryId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const prompts = await promptService.getPromptsBySubCategoryId(req.params.subCategoryId);
    res.json(prompts);
  } catch (err) {
    next(err);
  }
};

export const updatePrompt = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await promptService.updatePrompt(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deletePrompt = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await promptService.deletePrompt(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const regeneratePrompt = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const regenerated = await promptService.regeneratePrompt(req.params.id);
    res.json(regenerated);
  } catch (err) {
    next(err);
  }
};
