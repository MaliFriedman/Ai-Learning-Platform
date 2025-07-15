
import mongoose from "mongoose";

export function isValidCategoryName(name: any): boolean {
    return typeof name === "string" && name.trim().length >= 2;
  }
  
  export const isValidMongoId = (id: string): boolean => {
    return mongoose.Types.ObjectId.isValid(id);
  };