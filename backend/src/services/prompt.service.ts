import { IPrompt, PromptModel } from "../models/models.prompt";
import ApiError from "../utils/errors/ApiError";

export default class PromptService {

  async createPrompt(data: IPrompt): Promise<IPrompt> {
    const newPrompt = new PromptModel(data);
    await newPrompt.save();
    return newPrompt.toObject();
  }

  async getAllPrompts(): Promise<IPrompt[]> {
    const prompts = await PromptModel.find();
    return prompts.map(prompt => prompt.toObject());
  }

  async getPromptById(id: string): Promise<IPrompt> {
    const prompt = await PromptModel.findById(id);
    if (!prompt) {
      throw new ApiError(404, "Prompt not found.");
    }
    return prompt.toObject();
  }

  async updatePrompt(id: string, updates: Partial<IPrompt>): Promise<IPrompt> {
    const updated = await PromptModel.findByIdAndUpdate(id, updates, { new: true });
    if (!updated) {
      throw new ApiError(404, "Prompt not found for update.");
    }
    return updated.toObject();
  }

  async deletePrompt(id: string): Promise<void> {
    const deleted = await PromptModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new ApiError(404, "Prompt not found for deletion.");
    }
  }
}
