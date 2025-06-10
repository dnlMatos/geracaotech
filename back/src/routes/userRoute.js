import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} from "../controllers/user.controller.js";

export const userRoute = Router();

userRoute.get("/", getAllUsers);
userRoute.post("/login", loginUser);
userRoute.get("user/:id", getUserById);
userRoute.post("/create", createUser);
userRoute.put("/update/:id", updateUser);
userRoute.delete("/delete/:id", deleteUser);
