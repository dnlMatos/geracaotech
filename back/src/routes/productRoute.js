import { Router } from "express";
import {
  getAllProducts,
  // getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

export const productRoute = Router();

productRoute.get("/", getAllProducts);
// productRoute.get("/product/:id", getProductById);
productRoute.post("/product/create", createProduct);
productRoute.put("/product/update/:id", updateProduct);
productRoute.delete("/product/delete/:id", deleteProduct);
