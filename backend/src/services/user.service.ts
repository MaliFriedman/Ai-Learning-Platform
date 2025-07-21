import { IUser, UserModel } from "../models/models.user";
import ApiError from "../utils/errors/ApiError";
import { IPrompt, PromptModel } from "../models/models.prompt";
import jwt from "jsonwebtoken";


export default class UserService {

  async register(userData: { id: string; name: string; phone: string }): Promise<{ token: string; user: any }> {

    const existing = await UserModel.findOne({ _id: userData.id, phone: userData.phone });
    if (existing) {
      throw new ApiError(400, "User already exists with this name and phone number");
    }

    const newUser = new UserModel({
      _id: userData.id,
      name: userData.name,
      phone: userData.phone,
    });


    await newUser.save();

    const token = jwt.sign(
      {
        userId: newUser._id,
        name: newUser.name,
        phone: newUser.phone,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

        const isAdmin =
      newUser.name === process.env.ADMIN_NAME &&
      newUser.phone === process.env.ADMIN_PHONE;
    return {
      token,
      user: {
        ...newUser.toObject(),
        isAdmin
      }
    };
  }


  async login(name: string, phone: string): Promise<{ token: string; user: any }> {
    const user = await UserModel.findOne({ name, phone });
    if (!user) {
      throw new ApiError(404, "User not found with this name and phone number");
    }

    const isAdmin =
      user.name === process.env.ADMIN_NAME &&
      user.phone === process.env.ADMIN_PHONE;
    const token = jwt.sign(
      {
        userId: user._id,
        name: user.name,
        phone: user.phone,
        isAdmin,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

return {
      token,
      user: {
        ...user.toObject(),
        isAdmin
      }
    };  }


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
