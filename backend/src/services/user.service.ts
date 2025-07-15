import { IUser, UserModel } from "../models/models.user";
import ApiError from "../utils/errors/ApiError";
import { IPrompt, PromptModel } from "../models/models.prompt";
import jwt from "jsonwebtoken";


export default class UserService {

  async register(userData: Omit<IUser, "_id">): Promise<{ token: string; user: IUser }> {
    const existing = await UserModel.findOne({ name: userData.name, phone: userData.phone });
    if (existing) {
      throw new ApiError(400, "User already exists with this name and phone number");
    }
  
    const newUser = new UserModel({
      _id: crypto.randomUUID(),
      ...userData,
    });
  
    await newUser.save();
  
    const token = jwt.sign({ userId: newUser._id },  process.env.JWT_SECRET!, { expiresIn: "7d" });
    return { token, user: newUser.toObject() };
  }
  

  async login(name: string, phone: string): Promise<{ token: string; user: IUser }> {
    const user = await UserModel.findOne({ name, phone });
    if (!user) {
      throw new ApiError(404, "User not found with this name and phone number");
    }

    const token = jwt.sign({ userId: user._id },  process.env.JWT_SECRET!, { expiresIn: "7d" });

    return { token, user: user.toObject() };
  }


  async getAllUsers(): Promise<IUser[]> {
    const users = await UserModel.find();
    return users.map(user => user.toObject());
  }

  async getUserById(id: string): Promise<IUser> {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new ApiError(404, "User not found.");
    }
    return user.toObject();
  }

  async updateUser(id: string, updates: Partial<IUser>): Promise<IUser> {
    const updatedUser = await UserModel.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedUser) {
      throw new ApiError(404, "User not found for update.");
    }
    return updatedUser.toObject();
  }

  async deleteUser(id: string): Promise<void> {
    const deleted = await UserModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new ApiError(404, "User not found for deletion.");
    }
  }

}
