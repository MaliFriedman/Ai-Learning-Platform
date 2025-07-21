import { Schema, model ,Types} from "mongoose";

export interface ISubCategory {
  _id?: Types.ObjectId;
  name: string;
  category_id: Types.ObjectId;
}

const subCategorySchema = new Schema<ISubCategory>({
  name: { type: String, required: true },
  category_id: { type: Schema.Types.ObjectId , required: true, ref: "Category" },
},
{
  toJSON: {
    transform: (_doc, ret: Partial<ISubCategory> & { __v?: number }) => {
      delete ret.__v;
      return ret;
    },
  },
}
);

export const SubCategoryModel = model<ISubCategory>("SubCategory", subCategorySchema);
