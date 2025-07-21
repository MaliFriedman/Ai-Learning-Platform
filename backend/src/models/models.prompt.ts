import { Schema, model, Types } from "mongoose";


export interface IPrompt {
  // _id?: Types.ObjectId;
  user_id: string;
  category_id: string;
  sub_category_id: string;
  prompt: string;
  response: string;
  created_at: Date;
}

const promptSchema = new Schema<IPrompt>({
  // _id: { type: String, required: true },
  user_id: { type: String, required: true, ref: "User" },
  category_id: { type: String, required: true, ref: "Category" },
  sub_category_id: { type: String, required: true, ref: "SubCategory" },
  prompt: { type: String, required: true },
  response: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
},
{
  toJSON: {
    transform: (_doc, ret: Partial<IPrompt> & { __v?: number }) => {
      delete ret.__v;
      return ret;
    },
  },
}
);

export const PromptModel = model<IPrompt>("Prompt", promptSchema);
