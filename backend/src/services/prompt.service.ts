import { IPrompt, PromptModel } from "../models/models.prompt";
import { CategoryModel } from "../models/models.category";
import { SubCategoryModel } from "../models/models.subCategory";
import ApiError from "../utils/errors/ApiError";
import openai from "../utils/openai";
import mongoose from "mongoose";

export default class PromptService {

    async createPrompt(data: IPrompt): Promise<IPrompt> {
        if (!data.prompt) {
            throw new ApiError(400, "Prompt text is required.");
        }

        const { categoryName, subCategoryName } = await this.getCategoryNames(data.category_id, data.sub_category_id);

        const generatedResponse = await this.generateAIResponse(data.prompt, categoryName, subCategoryName);

        const prompt = new PromptModel({
            ...data,
            response: generatedResponse,
            created_at: new Date(),
        });

        await prompt.save();
        return prompt.toObject();
    }


    async getAllPrompts(): Promise<IPrompt[]> {
        const prompts = await PromptModel.find();
        return prompts.map(p => p.toObject());
    }


    async getPromptById(id: string): Promise<IPrompt> {
        const prompt = await PromptModel.findById(id);
        if (!prompt) {
            throw new ApiError(404, "Prompt not found.");
        }
        return prompt.toObject();
    }

    async getPromptsByUserId(userId: string): Promise<IPrompt[]> {
        const prompts = await PromptModel.find({ user_id: userId });
        if (!prompts || prompts.length === 0) {
            throw new ApiError(404, "No prompts found for this user.");
        }
        return prompts.map(p => p.toObject());
    }

    async getPromptsByCategoryId(categoryId: string): Promise<IPrompt[]> {
        const prompts = await PromptModel.find({ category_id: categoryId });
        if (!prompts || prompts.length === 0) {
            throw new ApiError(404, "No prompts found for this category.");
        }
        return prompts.map(p => p.toObject());
    }

    async getPromptsBySubCategoryId(subCategoryId: string): Promise<IPrompt[]> {
        const prompts = await PromptModel.find({ sub_category_id: subCategoryId });
        if (!prompts || prompts.length === 0) {
            throw new ApiError(404, "No prompts found for this sub-category.");
        }
        return prompts.map(p => p.toObject());
    }

    async updatePrompt(id: string, updates: Partial<IPrompt>): Promise<IPrompt> {
        const updatedPrompt = await PromptModel.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedPrompt) {
            throw new ApiError(404, "Prompt not found for update.");
        }
        return updatedPrompt.toObject();
    }


    async deletePrompt(id: string): Promise<void> {

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ApiError(400, "Invalid prompt ID format.");
        }


        const deleted = await PromptModel.findByIdAndDelete(id);

        if (!deleted) {
            throw new ApiError(404, "Prompt not found for deletion.");
        }
    }

    async regeneratePrompt(id: string): Promise<IPrompt> {
        const existingPrompt = await PromptModel.findById(id);
        if (!existingPrompt) {
            throw new ApiError(404, "Prompt not found for regeneration.");
        }

        const { categoryName, subCategoryName } = await this.getCategoryNames(existingPrompt.category_id, existingPrompt.sub_category_id);

        const newResponse = await this.generateAIResponse(existingPrompt.prompt, categoryName, subCategoryName);

        existingPrompt.response = newResponse;
        existingPrompt.created_at = new Date();
        await existingPrompt.save();

        return existingPrompt.toObject();
    }



    private async generateAIResponse(promptText: string, categoryName?: string, subCategoryName?: string): Promise<string> {
        const contextIntro = `You are a learning assistant. The user wants to learn about ${categoryName || 'a topic'} → ${subCategoryName || ''}.`;
        const fullPrompt = `${contextIntro}\n\n${promptText}`;

        console.log("Sending prompt to OpenAI:", fullPrompt);
        try {
            const aiResponse = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: fullPrompt }],
            });

            const responseText = aiResponse.choices?.[0]?.message?.content;
            if (!responseText) {
                throw new ApiError(500, "Empty response from OpenAI.");
            }

            return responseText;

        } catch (error) {
            console.error("Error from OpenAI:", error);
            throw new ApiError(500, "Failed to generate AI response.");
        }
    }

    private async getCategoryNames(categoryId: string, subCategoryId: string): Promise<{ categoryName?: string, subCategoryName?: string }> {
        const [category, subCategory] = await Promise.all([
            CategoryModel.findById(categoryId),
            SubCategoryModel.findById(subCategoryId),
        ]);
        return {
            categoryName: category?.name,
            subCategoryName: subCategory?.name
        };
    }


}
