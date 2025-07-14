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
});

export const UserModel = model<IUser>("User", userSchema);
