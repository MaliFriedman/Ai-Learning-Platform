import { Schema, model ,Types} from "mongoose";

export interface ISubCategory {
  _id?: Types.ObjectId;
  name: string;
  category_id: string;
}

const subCategorySchema = new Schema<ISubCategory>({
  // _id: { type: String, required: true },
  name: { type: String, required: true },
  category_id: { type: String, required: true, ref: "Category" },
});

export const SubCategoryModel = model<ISubCategory>("SubCategory", subCategorySchema);
