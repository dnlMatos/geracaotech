import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

export const userRoute = Router();

userRoute.get("/", getAllUsers);
userRoute.get("user/:id", getUserById);
userRoute.post("/create", createUser);
userRoute.put("/update/:id", updateUser);
userRoute.delete("/delete/:id", deleteUser);
