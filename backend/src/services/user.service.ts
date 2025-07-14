import { IUser ,UserModel} from "../models/models.user";
import ApiError from "../utils/errors/ApiError";

export default class UserService {

  async createUser(userData: IUser): Promise<IUser> {
    const existing = await UserModel.findById(userData._id);
    if (existing) {
      throw new ApiError(400, "User with this ID already exists.");
    }
    const newUser = new UserModel(userData);
    await newUser.save();
    return newUser.toObject();
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
