import { Schema, model } from "mongoose";

export interface ICategory {
  _id: string;
  name: string;
}

const categorySchema = new Schema<ICategory>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
});

export const CategoryModel = model<ICategory>("Category", categorySchema);
