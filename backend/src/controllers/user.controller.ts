import { Request, Response, NextFunction } from "express";
import UserService from "../services/user.service";

const userService = new UserService();

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.register(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, phone } = req.body;
    const result = await userService.login(name, phone);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await userService.updateUser(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};
