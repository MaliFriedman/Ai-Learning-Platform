import { Schema, model } from "mongoose";

export interface IUser {
  _id: string;
  name: string;
  phone: string;
}

const userSchema = new Schema<IUser>({
  _id: { type: String, required: true }, 
  name: { type: String, required: true },
  phone: { type: String, required: true },
},

  {
    _id: false,
    toJSON: {
      transform: (_doc, ret: Partial<IUser> & { __v?: number }) => {
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const UserModel = model<IUser>("User", userSchema);
