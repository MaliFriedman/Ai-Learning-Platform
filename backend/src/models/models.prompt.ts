import { Schema, model } from "mongoose";

export interface IPrompt {
  _id: string;
  user_id: string;
  category_id: string;
  sub_category_id: string;
  prompt: string;
  response: string;
  created_at: Date;
}

const promptSchema = new Schema<IPrompt>({
  _id: { type: String, required: true },
  user_id: { type: String, required: true, ref: "User" },
  category_id: { type: String, required: true, ref: "Category" },
  sub_category_id: { type: String, required: true, ref: "SubCategory" },
  prompt: { type: String, required: true },
  response: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

export const PromptModel = model<IPrompt>("Prompt", promptSchema);
