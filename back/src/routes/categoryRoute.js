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
categoryRoute.post("/category/create", createCategory);
categoryRoute.put("/category/update/:id", updateCategory);
categoryRoute.delete("/category/delete/:id", deleteCategory);
