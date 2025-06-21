const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const checkUser = require("../middleware/checkUser");

// router.get("/product/:search", productController.search);
router.get("/", productController.listAll);
router.get("/product/:id", productController.getById);
router.post("/product/create", checkUser, productController.create);
router.put("/product/update/:id", checkUser, productController.update);
router.delete("/product/delete/:id", checkUser, productController.delete);

module.exports = router;
