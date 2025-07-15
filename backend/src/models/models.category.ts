import { Schema, model, Types} from "mongoose";

export interface ICategory {
  _id?: Types.ObjectId;
  name: string;
}

const categorySchema = new Schema<ICategory>({
  // _id: { type: String, required: true },
  name: { type: String, required: true },
});

export const CategoryModel = model<ICategory>("Category", categorySchema);
