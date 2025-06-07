import { Router } from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

export const categoryRoute = Router();

categoryRoute.get("/", getAllCategories);
categoryRoute.get("/category/:id", getCategoryById);
categoryRoute.post("/create", createCategory);
categoryRoute.put("/update/:id", updateCategory);
categoryRoute.delete("/delete/:id", deleteCategory);
