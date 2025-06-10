import { Router } from "express";
import {
  getAllProductCategories,
  getProductCategoryById,
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
} from "../controllers/productCategory.controller.js";

export const productCategoryRoute = Router();

productCategoryRoute.get("/", getAllProductCategories);
productCategoryRoute.get("/productAndCategory/:id", getProductCategoryById);
productCategoryRoute.post("/productAndCategory/create", createProductCategory);
productCategoryRoute.put(
  "/productAndCategory/update/:id",
  updateProductCategory
);
productCategoryRoute.delete(
  "/productAndCategory/delete/:id",
  deleteProductCategory
);
