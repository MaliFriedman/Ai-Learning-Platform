import { Schema, model, Types} from "mongoose";

export interface ICategory {
  _id?: Types.ObjectId;
  name: string;
}

const categorySchema = new Schema<ICategory>({
  // _id: { type: String, required: true },
  name: { type: String, required: true },
},
{
  toJSON: {
    transform: (_doc, ret: Partial<ICategory> & { __v?: number }) => {
      delete ret.__v;
      return ret;
    },
  },
}
);

export const CategoryModel = model<ICategory>("Category", categorySchema);
